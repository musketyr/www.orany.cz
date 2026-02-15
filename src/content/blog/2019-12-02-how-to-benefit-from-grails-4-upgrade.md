---
title: "How to Benefit from Grails 4 Upgrade"
date: 2019-12-02
slug: how-to-benefit-from-grails-4-upgrade
source: medium
mediumId: "e4f4aae4a9d"
---If you are not familiar with Micronaut then you may not understand how important the upgrade to Grails 4 is. But if you already discovered…

* * *

### How to Benefit from Grails 4 Upgrade

![](https://cdn-images-1.medium.com/max/800/1*O1LhM2SuzGfkvdmVBdFZ4A.png)

If you are not familiar with [Micronaut](https://micronaut.io/) then you may not understand how important the upgrade to Grails 4 is. But if you already discovered the productivity of [Micronaut](https://micronaut.io/) then you know there is a whole new world of tools and best practises to take advantage of. Let’s start with mentioning some of the issues which may occur during the upgrade and then I will share some of the ways how to benefit from having Micronaut parent context.

### Grails 4 Upgrade Gotchas

There are detailed upgrade notes for Grails and GORM which you should read first:

*   [Upgrading from Grails 3.3.x](http://docs.grails.org/4.0.1/guide/upgrading.html)
*   [GORM for Hibernate Upgrade Notes](http://gorm.grails.org/7.0.1/hibernate/manual/index.html#upgradeNotes)

Except these, I would like to mention some particular issues we were facing while upgrading our applications. This is not an exhausting list of all problem but I will try to keep it up to date if we face another issue:

#### Transactions Now Required for all Operations

This one is actually already mentioned in [GORM for Hibernate Upgrade Notes](http://gorm.grails.org/7.0.1/hibernate/manual/index.html#upgradeNotes). If you have any GORM operation happening outside of services annotated with `@Transactional` then you will see `TransactionRequiredException` start to pop up in your console.

There is quite a simple fix for this issue — just visit all your services which works with the database and annotate them with `@Transactional`.

If you have previously set Hibernate configurations such as `hibernate.hibernateDirtyChecking: true` or `hibernate.flush.mode: AUTO` you may consider finally fixing the causes for these overrides and remove the settings. Otherwise, you may face some [corner cases](https://github.com/grails/grails-core/issues/11376) where transactional behaviour can't be guaranteed or where a property update is not propagated to the database. In that case, you should edit your `application.yml` as follows:

\# XXX: only required if you have no choice to remove the overrides   
\# especially **hibernateDirtyChecking** seems to cause problems   
\# with propagating updates into the database  
#  
\# (see above)  
**hibernate**:  
    # ...    _\# To keep default behavior_    **hibernateDirtyChecking**: true    **flush**:  
        _\# To keep default bevahior after Grails 3.2.4+ upgrade_          
        **mode**: AUTO _#_ [_https://github.com/grails/grails-core/issues/11376_](https://github.com/grails/grails-core/issues/11376)    **allow\_update\_outside\_transaction**: true **grails**:  
    **gorm**:  
        **flushMode**: MANUAL

#### Empty Strings are Automatically Converted to Null

If you have `nullable` `String` properties which you set to empty string to avoid `null` then your code will break as empty strings will be set to `null` during the properties binding. You can revert to the old behaviour by using the following configuration:

**grails**:  
    **databinding**:  
        **convert-empty-strings-to-null**: false

#### Old Version of Micronaut and Missing Micronaut Dependencies' Versions

There is a limited number of Micronaut dependencies bundled in Grails BOM (bill-of-material — dependency versions' blueprint) but it points to the old version of Micronaut (`1.1.4` as a time of writing). If you want to take advantage of the latest version of Micronaut as well as being able to write Micronaut dependencies without version then you have to also add Micronaut BOM into your Gradle build.

dependencyManagement {  
    imports {  
        mavenBom "org.grails:grails-bom:$grailsVersion"  
    }  
    imports {  
        mavenBom "io.micronaut:micronaut-bom:$micronautVersion"  
    }  
    applyMavenExclusions false  
}

The Micronaut BOM should come after Grails BOM to override the versions from the Grails BOM.`micronautVersion` property is declared alongside `grailsVersion` in `gradle.properties`. We are currently running with the latest version `1.2.6` without any issues.

#### Closure DSL inside `application.groovy` Configuration File

There is one side effect caused by having Micronaut context initialised during the Grails application startup. Both Grails and Micronaut are independently reading the configuration files including the script called`application.groovy`. The problem is that Micronaut is adding `@CompileStatic` annotation and some AST transformation to be able to compile the script statically. Therefore if your `application.groovy` file contains references to the properties not known to Micronaut then the compilation fails and the application will not start. These could be `appName` and `appVersion` which are injected into script's binding by Grails automatically. You can replace these with calls to `Metadata` class such as `Metadata.current.getApplicationName()`.

The other source of compilation errors are closures referring to some DSL unknown to Micronaut, typically GORM default mappings:

grails.gorm.default.mapping = {   
    version false  
}

One way how to work around this issue is to move the closure definition into a method annotated with `@CompileDynamic`.

grails.gorm.default.mapping = defaultMapping()

@groovy.transform.CompileDynamic  
private static Closure defaultMapping() {  
    return {  
        version false  
    }  
}

#### Development Configuration File

A similar problem arises if you were used to placing your `application-development.yml` or similar to the root folder of the project. Micronaut is not recognizing the configuration files places outside source folders so you need to move the file into `grails-app/conf` or `src/main/resources`.

#### Controller Actions Returning “null”

Controller actions should always either return model or call `render`, `respond` or a similar method as the last line. Returning `null` might produce cast exceptions:

class AwesomeController {  
      
    def myAction(String q) {  
        // do some work 

        // this no longer work  
        // return null

        render status: HttpStatus.OK  
    }

}

#### Using Micronaut Beans

This is not an upgrade issue but just a remember-me note for further Micronaut integration. Grails 4 are still injecting the beans into the services by name. On the other hand, Micronaut names the beans usually with the fully qualified name of the class. You must annotate any bean you want to inject from Micronaut with `@Inject`.

class AwesomeController {  
      
    @Inject AwesomeMicronautService ams // any name

    SomeGrailsService someGrailsService // strict naming convetion

    // ...

}

As a side-effect, you can now name your services with any name as the injection happens by type.

#### Building the WAR

There were a `war` task for bundling the WAR for Tomcat deployments in Grails 3.x. Thanks to the upgraded Spring Boot plugin the bundling happens using a `bootWar` task so if your delivery pipeline relies on running `war` task explicitly then you need to update your build commands. Also, any Gradle customisation using the `war` task directly will stop working as the task is disabled by default:

war {  
    from('src/main/extra') {  
        into('extra')  
    }  
}

One way to fix it is to enable the `war` task again manually and disable the `bootWar` task.

war.enabled = true  
bootWar.enabled = false

Another way is to change your configuration to use `bootWar` instead:

bootWar {  
    from('src/main/extra') {  
        into('extra')  
    }  
}

### Taking Advantage of Micronaut in Grails 4

The upgrade itself is generally pretty smooth but you should not get satisfied by just the upgrade. You should consider some of the following steps to gain the most of the Micronaut integration into Grails 4.

#### Migrate from Grails Plugins to Micronaut Configurations

We in [Agorapulse](https://agorapulse.com) are continuously trying to migrate our internal and open-source plugins to Micronaut configurations. The reason is obvious — we want to share the code between the Grails applications and Micronaut functions. For example, we have migrated a [Facebook SDK plugin](http://Facebook%20SDK%20plugin) into Micronaut [Facebook SDK library](https://github.com/agorapulse/micronaut-facebook-sdk) and also [AWS SDK plugin](https://github.com/agorapulse/grails-aws-sdk) into [Micronaut AWS SDK library](https://github.com/agorapulse/micronaut-libraries).

Another opportunity is to migrate to libraries and capabilities provided by Micronaut

*   [Micronaut Redis](https://micronaut-projects.github.io/micronaut-redis/latest/guide/) can be a good replacement for [Grails Redis plugin](https://github.com/grails-plugins/grails-redis)
*   [Micronaut Data](https://micronaut-projects.github.io/micronaut-data/latest/guide/) can replace some simpler use cases of using either bare JDBC or GORM
*   [Micronaut declarative clients](https://docs.micronaut.io/1.3.0.M1/guide/index.html#clientAnnotation) instead of `RestBuilder`

Switching from plugins into configuration actually takes the most of the time we spent on the migration.

#### Prefer Micronaut Services to Grails Services

There are several reasons why you should prefer writing services as Micronaut services instead of Grails ones.

*   Micronaut services are avoiding reflection and should have a positive impact on startup time and reduced memory footprint
*   Micronaut context resolution provides much richer capabilities to create conditional beans
*   Micronaut provides support for configuration properties beans
*   Micronaut provides a reflection-free validation framework usable in any bean
*   Micronaut services' names do not have to end with `Service` suffix
*   You may extract the service code into a library shared with other Micronaut applications and functions

Also, if you migrate your services to Micronaut then it will easier for you to migrate your whole application to Micronaut if you find out that Grails framework no longer meets your needs. In a case of Grails plugins, it will allow you to migrate them to configurations.

* * *

[**We’re Hiring**  
_Are you kick-ass fullstack or front-end dev that wants to work on AWS, Angular, Java or Groovy? You must contact us to join our dream team in Paris or Nantes_apply.workable.com](https://apply.workable.com/agorapulse/ "https://apply.workable.com/agorapulse/")[](https://apply.workable.com/agorapulse/)

By [Vladimír Oraný](https://medium.com/@musketyr) on [December 2, 2019](https://medium.com/p/e4f4aae4a9d).

[Canonical link](https://medium.com/@musketyr/how-to-benefit-from-grails-4-upgrade-e4f4aae4a9d)

Exported from [Medium](https://medium.com) on February 15, 2026.