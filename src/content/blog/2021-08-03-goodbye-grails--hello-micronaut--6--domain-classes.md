---
title: "Goodbye Grails, Hello Micronaut #6: Domain Classes"
date: 2021-08-03T14:00:00Z
slug: goodbye-grails--hello-micronaut--6--domain-classes
source: medium
mediumId: "ad2d2782059f"
---This is the sixth post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your application…

* * *

### Goodbye Grails, Hello Micronaut #6: Domain Classes

_This is the sixth post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your application to be based on Grails 4.x or later._

![](https://cdn-images-1.medium.com/max/800/1*IlyVfS6V05ZxtwIYpI804w.png)

Domain classes are usually the essential part of any Grails application, therefore the most difficult part to migrate. First of all, we need to migrate every database-related calls to use Data Services instead of any instance or static _magic_ methods and properties.

[**GORM for Hibernate**  
_A domain class can be created with the create-domain-class command if you are using Grails, or if you are not using…_gorm.grails.org](http://gorm.grails.org/7.0.x/hibernate/manual/index.html#dataServices "http://gorm.grails.org/7.0.x/hibernate/manual/index.html#dataServices")[](http://gorm.grails.org/7.0.x/hibernate/manual/index.html#dataServices)

We can very easily create the data service for the domain class `Vehicle` we were mentioning earlier:

This service was already used in the controller in the previous step.

### Finding GORM Method using VCS

The most difficult part is to find all usages of the GORM instance and static API.

First, find all the usages of the given entity. The easiest way is to commit all your work to the VCS and let your IDE do the difficult part of finding references. Select one of your entities and move into a different package. I'm usually simply adding `.legacy` at the end of the current package name so for example, the `Vehicle` domain class will in `hello` package any longer but it will be located in `hello.legacy`.

![](https://cdn-images-1.medium.com/max/800/1*uBxMmbO8zgoETj5g0bN-VA.png)

Don't forget to move the data service as well.

Now visit the list of the VCS-changed files. The list should show all the classes referring to the specific domain class.

![](https://cdn-images-1.medium.com/max/800/1*eMY6Mn3pMIK6B8iWOVU8tA.png)

Then you need to replace all the instance and static GORM method calls in these files. For example, change `Vehicle.get(id)` to `vehicleDataService.findById(id)`. You can either mock the `vehicleDataService` in your tests or you can use this article to use the real implementation against the test datastore:

[**How to Use GORM Data Services in Test**  
_GORM data services allows Grails developers to write clearer code without polluting the whole application with database…_medium.com](https://medium.com/agorapulse-stories/how-to-use-gorm-data-services-in-test-cf1839aca530 "https://medium.com/agorapulse-stories/how-to-use-gorm-data-services-in-test-cf1839aca530")[](https://medium.com/agorapulse-stories/how-to-use-gorm-data-services-in-test-cf1839aca530)

Let's summarise the steps required for each domain class:

1.  Commit all your changes into VCS
2.  Move the domain class into a different package such as `original.legacy`
3.  Create a data service for the given domain or move the existing one into the same package
4.  Review all VCS-changed files
5.  Replace GORM methods with data service calls
6.  Back to step 1 unless you migrate all the domain classes

### Finding GORM Methods at the Compile Time

Once you complete the steps above, there might still be some well-hidden calls to the GORM instance and static methods. You can use Groovy Code Check for GORM to find these statements:

compileOnly 'com.agorapulse:groovy-code-checks-gorm:0.9.0'

[**Groovy Code Checks**  
_This project contains additional code checkers for Groovy programming language._agorapulse.github.io](https://agorapulse.github.io/groovy-code-checks/#_gorm "https://agorapulse.github.io/groovy-code-checks/#_gorm")[](https://agorapulse.github.io/groovy-code-checks/#_gorm)

This library is very strict and it will create compilation failures wherever it finds any GORM-related method. This is very useful for indirect usages such as `user.vehicle.save()` where the GORM methods are not called directly on the entity object but a reference one.

Yet another set of compilation issues can be triggered by changing the `convention.groovy` Enterprise Groovy configuration file.

If you comment out or remove the checking extensions related to GORM then you should get compilation errors wherever you use any GORM magic.

### Extracting Domain Classes into a Library

Let's extract the domain classes into the separate subproject to allow modularization of the other parts of the application. There is a dedicated article that can help you achieve this:

[**How to Share GORM Domain Classes between Grails and Micronaut**  
_Our architecture, originally built with Grails 3.3.x semi-monoliths, is currently leaning toward using more Micronaut…_medium.com](https://medium.com/agorapulse-stories/how-to-share-gorm-domain-classes-between-grails-and-micronaut-a1b938e5adc4 "https://medium.com/agorapulse-stories/how-to-share-gorm-domain-classes-between-grails-and-micronaut-a1b938e5adc4")[](https://medium.com/agorapulse-stories/how-to-share-gorm-domain-classes-between-grails-and-micronaut-a1b938e5adc4)

If you have applied Kordamp layout you simply create a new folder under `libs` such as `hello-data` containing `hello-data.gradle` build file.

You will also need to declare Grails Central repository in the root `build.gradle` file for all projects:

allprojects {  
    repositories {  
        mavenCentral()  
        maven { url 'https://repo.grails.org/grails/core/' }  
    }  
}

And add two now properties into root `gradle.properties` file:

gorm.hibernate.version = 7.0.5  
micronautVersion = 1.3.7

We will also need a fake Grails plugin descriptor in `src/main/groovy` directory:

Next, create folders `grails-app/domains` and `grails-app/services` within the new data library.

Then add the new library as a dependency of your Grails application in `hello.gradle`:

implementation project(':hello-data')

If you are using IntelliJ IDEA you should be able to simply move the packages containing the domain entities into the new library. Select the original package and select _Refactor / Move Package or Directory …_ option from the top menu (default shortcut _F6_).

![](https://cdn-images-1.medium.com/max/800/1*gJif4kFHTv-nRSCl9rtJqg.png)

Then select _Move directory … to another source root_

![](https://cdn-images-1.medium.com/max/800/1*W24eL6xXqT_oTZGtYmzUEw.png)

And select `grails-app/domain` source folder as the destination:

![](https://cdn-images-1.medium.com/max/800/1*pLxyh80-PoEsN12zyGOuhQ.png)

Now revisit every domain in the new data library and add `grails.gorm.annotation.Entity` annotation.

Last but not least, move the related GORM data services into the `grails-app/services` folder so all the domain classes' related code is now within its own library.

### Extracting Test Data into Library

As a next step, you should create another library that will hold the test data to ensure you can use them from everywhere.

Create a new folder `hello-data-test-data` containing a new build file `hello-data-test-data.gradle`.

Move the test data classes such as `HelloDataSets`into `src/main/groovy`.

![](https://cdn-images-1.medium.com/max/800/1*T8fkrjsAkTqDg-225VU0jg.png)

Move the test data such as `vehicle.json` into `src/main/resources`.

![](https://cdn-images-1.medium.com/max/800/1*zCS-lOgMP-4GoajgQcdFWA.png)

Move the tests for the data sets such as `HelloDataSetsSpec` into `src/test/groovy` to keep the data sets properly tested.

![](https://cdn-images-1.medium.com/max/800/1*jyQ5KaKsTBlGZg4kKE3cNw.png)

Don't forget to add the dependency to the new test data library into your application's build file `hello.gradle`

testCompile project(':hello-data-test-data')

_Having the domain classes extracted, we can also_ [_extract the services into a separate library_](https://medium.com/p/f7d1ba4025f2) _in the next step._

#### Table of Contents

1.  [Multiproject](https://medium.com/p/ffeaab056e28)
2.  [Configuration](https://medium.com/p/6aaab659112a)
3.  [Static Compilation](https://medium.com/p/a5a01bad2a06)
4.  [Datasets](https://medium.com/p/440c8b50fb56)
5.  [Marshalling](https://medium.com/p/7b69d9a132bc)
6.  Domain Classes
7.  [Services](https://medium.com/p/f7d1ba4025f2)
8.  [Controllers](https://medium.com/p/724e51ec3925/)
9.  [Micronaut Application](https://medium.com/p/c0d3956afe47)
10.  [Micronaut Data](https://medium.com/p/759c6c36bc7)

#### Sources & Discussion

[**GitHub — agorapulse/goodbye-grails-hello-micronaut: Goodbye Grails, Hello Micronaut**  
_This repository contains sources for the Grails to Micronaut guide. The repository shows the state of the application…_github.com](https://github.com/agorapulse/goodbye-grails-hello-micronaut "https://github.com/agorapulse/goodbye-grails-hello-micronaut")[](https://github.com/agorapulse/goodbye-grails-hello-micronaut)

By [Vladimír Oraný](https://medium.com/@musketyr) on [August 3, 2021](https://medium.com/p/ad2d2782059f).

[Canonical link](https://medium.com/@musketyr/goodbye-grails-hello-micronaut-6-domain-classes-ad2d2782059f)

Exported from [Medium](https://medium.com) on February 15, 2026.