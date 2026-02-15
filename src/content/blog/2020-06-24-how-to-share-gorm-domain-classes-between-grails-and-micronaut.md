---
title: "How to Share GORM Domain Classes between Grails and Micronaut"
date: 2020-06-24
slug: how-to-share-gorm-domain-classes-between-grails-and-micronaut
source: medium
mediumId: "a1b938e5adc4"
---Our architecture, originally built with Grails 3.3.x semi-monoliths, is currently leaning toward using more Micronaut functions in…

* * *

### How to Share GORM Domain Classes between Grails and Micronaut

![](https://cdn-images-1.medium.com/max/800/1*WAQ2fM6qbn2ltTcscvoOBg.png)

Our architecture, originally built with [Grails](https://grails.org/) 3.3.x semi-monoliths, is currently leaning toward using more [Micronaut](https://micronaut.io/) functions in situations where it makes much more sense such as jobs, queue consumers or AWS DynamoDB triggers. The biggest obstacle seems to be a handful of [GORM](https://gorm.grails.org/) domain classes which spreads across Grails application and which blocks extracting logic into Micronaut functions. Let's take a look at how to share domain classes between Grails and Micronaut applications.

In theory, [you can use GORM without Grails](https://gorm.grails.org/latest/hibernate/manual/index.html#outsideGrails). Actually Micronaut comes with [out-of-the-box support of GORM](https://micronaut-projects.github.io/micronaut-groovy/latest/guide/#gorm), so it seemed to be quite a simple task. Basically, you just copy & paste your domain class and add `@Entity` annotation. This works great for standalone applications and Micronaut but then you will have many difficulties including the domain classes into Grails. The only suitable way I have figured out is to let the library pretend to be a Grails plugin but without including unnecessary dependencies or using any Grails Gradle plugins.

#### Mimicking Grails Plugin

Luckily, to generate Grails plugin descriptor you only need to include Grails core dependency on the compile classpath and have any Groovy class with `GrailsPlugin` suffix. Add the following dependencies into your Gradle file:

dependencies **{**    _// GORM_    compile "org.grails:grails-datastore-gorm-hibernate5:$gormVersion"

    // more flexible binding support (known from controllers),   
    // but adds too many dependencies      
    // compile "org.grails:grails-web-databinding:$grailsVersion"

    _// required for Grails Plugin generation_    compileOnly "org.grails:grails-core:$grailsVersion"  
  
    _// required for Micronaut service generation, if present_    compileOnly "io.micronaut:micronaut-inject-groovy:$micronautVersion"  
  
    _// required for jackson ignores generation for Micronaut_    compileOnly 'com.fasterxml.jackson.core:jackson-databind:2.8.11.3'  
**}**

This is the example of Grails plugin descriptor with zero-runtime dependencies on Grails:

@CompileStatic  
class GormSharedDomainsGrailsPlugin {  
  
    String grailsVersion = '3.3.0 > \*'  
  
    String title = 'GORM Shared Domains Example'  
    String author = 'Vladimir Orany'  
    String authorEmail = 'vlad@agorapulse.com'  
    String description = 'Mimicking Grails Plugin'  
  
}

The descriptor generator adds artefacts based on the location of the classes source code. So we need to create convenient source location known from Grails. Add the following lines to build into your Gradle file:

sourceSets **{**    main **{**        groovy **{**            _// the source folder for the GORM domain classes_            srcDir 'grails-app/domain'  
            _// if you also want to include some services_            srcDir 'grails-app/services'  
        **}  
    }  
}**

Now you have two more source directories which correspond the Grails layout. All the domain classes must be placed into `grails-app/domain` source folder. They still have to be annotated with `grails.gorm.annotation.Entity`.

import grails.gorm.annotation.Entity  
  
@Entity  
class Person {  
  
    String firstName  
    String lastName  
    String email  
  
    static _constraints_ \= **{**        firstName maxSize: 256  
        lastName maxSize: 256  
        email maxSize: 256, nullable: true  
    **}  
  
**}

You should not use GORM static methods but rather utilise [GORM Data Services](http://gorm.grails.org/6.1.x/hibernate/manual/). If you want to use the very same service from Micronaut then annotate it also with `@Singleton`. You need to place the class inside `grails-app/services`

import grails.gorm.transactions.Transactional  
import groovy.transform.CompileStatic  
  
import javax.inject.Singleton  
  
@Transactional  
@CompileStatic  
@Singleton  
class PersonService {  
  
    Person create(String firstName, String lastName, String email) {  
        Person person = new Person(  
            firstName: firstName,   
            lastName: lastName,   
            email: email  
        )  
        person.save(true)  
        return person  
    }  
  
    List<Person> getAllPersons() {  
        Person._list_()  
    }  
  
}

You can check the generated `build/classes/main/META-INF/` directory if it contains the generated descriptor:

<plugin name='gormSharedDomains' version='SNAPSHOT' grailsVersion='3.3.0 &gt; \*'>  
  <type>com.example.GormSharedDomainsGrailsPlugin</type>  
  <grailsVersion>3.3.0 &gt; \*</grailsVersion>  
  <authorEmail>vlad@agorapulse.com</authorEmail>  
  <author>Vladimir Orany</author>  
  <name>gorm-shared-domains</name>  
  <description>Mimicking Grails Plugin</description>  
  <title>GORM Shared Domains Example</title>  
  <version />  
  <resources>  
    <resource>com.example.Person</resource>  
    <resource>com.example.PersonService</resource>  
  </resources>  
</plugin>

#### Grails Usage

With this setup, you can reuse the domain classes and services from Grails without any additional configuration:

class PersonController {  
  
    PersonService personService  
  
    def index() {  
        if (!personService.allPersons) {  
            personService.create(  
                'Vladimir',  
                'Orany',  
                'vlad@agorapulse.com'  
            )  
        }  
        render personService.allPersons as JSON  
    }  
  
}

#### Micronaut Usage

And from Micronaut as well:

@Controller('/')  
class PersonController {  
  
    private final PersonService personService  
  
    PersonController(PersonService personService) {  
        this.personService = personService  
    }  
  
    @Get('/')  
    List<Person> index() {  
        if (!personService.allPersons) {  
            personService.create(  
                'Vladimir',  
                'Orany',  
                'vlad@agorapulse.com'  
            )  
        }  
        return personService.allPersons  
    }  
  
}

To enable domain classes for Micronaut you will probably have to change the packages scanned by Micronaut during the startup:

class Application {  
  
    static void main(String\[\] args) {  
        Micronaut._build_(args)  
                 .packages('com.example')  
                 .mainClass(Application)  
                 .start()  
    }  
  
}

#### Example Project

You can check the complete example in the following repository:

[**musketyr/gorm-shared-domains**  
_Contribute to musketyr/gorm-shared-domains development by creating an account on GitHub._github.com](https://github.com/musketyr/gorm-shared-domains "https://github.com/musketyr/gorm-shared-domains")[](https://github.com/musketyr/gorm-shared-domains)

By [Vladimír Oraný](https://medium.com/@musketyr) on [June 24, 2020](https://medium.com/p/a1b938e5adc4).

[Canonical link](https://medium.com/@musketyr/how-to-share-gorm-domain-classes-between-grails-and-micronaut-a1b938e5adc4)

Exported from [Medium](https://medium.com) on February 15, 2026.