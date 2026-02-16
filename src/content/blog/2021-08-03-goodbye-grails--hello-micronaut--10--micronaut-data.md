---
title: "Goodbye Grails, Hello Micronaut #10: Micronaut Data"
date: 2021-08-03T18:00:00Z
slug: goodbye-grails--hello-micronaut--10--micronaut-data
source: medium
mediumId: "759c6c36bc7"
---This is the tenth and the last post in a series that will guide you through the migration from Grails to Micronaut. This guide requires…

* * *

### Goodbye Grails, Hello Micronaut #10: Micronaut Data

_This is the tenth and the last post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your application to be based on Grails 4.x or later._

![](https://cdn-images-1.medium.com/max/800/1*IlyVfS6V05ZxtwIYpI804w.png)

So far, we have been using Micronaut with GORM entities. This combination is very suboptimal, but as the migration from GORM to Micronaut Data seems to be the most difficult part of the Grails to Micronaut migration, it is better to keep the migration of the data layer as the very last step.

[**Micronaut Data**  
_Data Repository Support for Micronaut Version: Micronaut Data is a database access toolkit that uses Ahead of Time…_micronaut-projects.github.io](https://micronaut-projects.github.io/micronaut-data/latest/guide/ "https://micronaut-projects.github.io/micronaut-data/latest/guide/")[](https://micronaut-projects.github.io/micronaut-data/latest/guide/)

Micronaut Data provides two implementations — Micronaut Data JPA and Micronaut Data JDBC. Let’s first explain these two, starting with the more lightweight one — Micronaut Data JDBC

#### Micronaut Data JDBC

Micronaut Data JDBC is a good fit for

*   write-only entities such as logs and metrics and other analytical data
*   very simple object models with zero or minimal associations
*   applications with limited concurrency

Micronaut Data JDBC’s `save` method always creates a new row in the database. There is no built-in equivalent of `saveOrUpdate` method so we always need to check whether the row in the database already exists to decide if we need to call `save` or `update` method. This makes it less attractive for the entities which often requires the existence check during the save or update. Also `udpate*` methods usually need to list all the properties to update.

On the other hand — being as close to the database as possible makes Micronaut Data JDBC a perfect choice for entities that leverage a lot of native SQL queries such as the analytical data mentioned above.

Micronaut Data JDBC implementation requires explicit joins for the associations. For example, if the `@Join` annotation is missing in the following example then the page's `author` field will be only populated with it's `id`

Micronaut Data JDBC implementation does not support optimistic locking so the only way how to guarantee to have data up to date is to use transactional read and writes.

In general, the use cases for Micronaut Data JDBC are very limited. Usually, you will migrate to Micronaut Data JPA implementation.

#### Micronaut Data JPA

Using Micronaut Data JPA you get as close to GORM as possible. Both frameworks are using Hibernate under the hood with all its pros and cons. You will get the most advanced object-relationship mapping available but you may still face the popular issues with unavailable sessions, lazy loading, and proxies.

Micronaut Data JPA is more powerful and a good fit if you require some advanced ORM features such as

*   lazy loading and proxying associations
*   dirty checking
*   first level caching and entity proxies
*   optimistic locking

#### Migrating GORM to Micronaut Data

Either you choose Micronaut Data JPA or Micronaut Data JDBC there is a generator library that can help us with the migration.

[**Grails Integration for Micronaut**  
agorapulse.github.io](https://agorapulse.github.io/micronaut-grails/#_gorm_to_micronaut_data_jpa_generator "https://agorapulse.github.io/micronaut-grails/#_gorm_to_micronaut_data_jpa_generator")[](https://agorapulse.github.io/micronaut-grails/#_gorm_to_micronaut_data_jpa_generator)

First of all, let's add a `-legacy` suffix to the data project's directory and its build file. For example, `hello-data` directory will become `hello-data-legacy` and `hello-data.gradle` will become `hello-data-legacy.gradle`. Don't forget to also update the new name of the project in the other build files.

Then we can add a new dependency into the build file `hello-data-legacy.gradle`:

We have added dependencies to the JPA generator and Testcontainers and we are also exporting the root of the project as a system property called `project.root`.

Now, we need the test configuration of the datasource in `hello-data-legacy/src/test/resources/application-test.yml`

And a test `MicronautGeneratorSpec` which will generate the migrated entity classes for us.

Once you run the test then new entity and repository classes are generated in `libs/hello-data` or similar.

The original domain class such as `Vehicle` should now have its JPA counterpart and a repository class:

Original Domain Class

Generated Entity

Generated Repository Interface

Please, review the generated code for TODOs and other missing parts as the generator is implemented on a best-effort possible but there might be still some corner cases that are not covered.

To enable the module, we need an appropriate build file `hello-data.gradle`:

And we also need to simplify the `convention.groovy` script otherwise it would be trying to apply GORM rules to the newly generated classes:

Once you are happy with new entities and repositories, add `@Ingore` annotation to the `MicronautGeneratorSpec` to ensure that the entities will not be overridden.

Next, we can proceed to the test data. Copy the whole test data directory using the similar way as we have renamed the data model project, for example, `hello-data-test-data` will be copied as`hello-data-legacy-test-data`.

Now, let's change the original `hello-data-test-data.gradle` build file to prepare test data using Micronaut JPA.

And we also need to create a new test configuration in `src/test/resources/application-test.yml`:

The change in the test that validates the data model is minimal. The specification class is now annotated with `MicronautTest`, it implements `ApplicationContextProvider` and injects the `ApplicationContext` and the repository class.

At this moment, we are having the new data model implemented with Micronaut Data instead of GORM. Next, we are going to remove the legacy GORM implementation completely and switch to the new data model.

Running GORM and Micronaut Data side by side is doable but doing so requires some additional hacks. Therefore, let's switch completely to the new data model. Delete the legacy data model and test data directories and replace the projects' dependencies with the new model ones. If you haven't done so, then also delete the old Grails application. Fix all the compilation errors. This may require making some minor updates in the entities or the repositories. Keep running the following command until you replace all the usages appropriately.

./gradlew classes testClasses

For the example project, you can check the changes [here](https://github.com/agorapulse/goodbye-grails-hello-micronaut/commit/3ce205e5ff1116c569fd582ed4c338cdd2ebaf5c).

* * *

This is the last post in the series. Your feedback is highly appreciated. Feel free to [join the discussion](https://github.com/agorapulse/goodbye-grails-hello-micronaut/discussions).

What next? So far the Micronaut version was limited by Grails so the next step should be upgrading the Micronaut version to the latest one but this is out of the scope of this series but you may find the following article helpful if you find yourself using libraries which were created for Micronaut 1.x.

[**How to Resolve Conflicts in Micronaut 1.x and 2.x Library Versions in Gradle**  
_Micronaut 2.x version has changed the Maven coordinates for many libraries that crate the Micronaut ecosystem. The…_medium.com](https://medium.com/agorapulse-stories/how-to-resolve-conflicts-in-micronaut-1-x-and-2-x-library-versions-in-gradle-b0b5992ce4ce "https://medium.com/agorapulse-stories/how-to-resolve-conflicts-in-micronaut-1-x-and-2-x-library-versions-in-gradle-b0b5992ce4ce")[](https://medium.com/agorapulse-stories/how-to-resolve-conflicts-in-micronaut-1-x-and-2-x-library-versions-in-gradle-b0b5992ce4ce)

#### Table of Contents

1.  [Multiproject](https://medium.com/p/ffeaab056e28)
2.  [Configuration](https://medium.com/p/6aaab659112a)
3.  [Static Compilation](https://medium.com/p/a5a01bad2a06)
4.  [Datasets](https://medium.com/p/440c8b50fb56)
5.  [Marshalling](https://medium.com/p/7b69d9a132bc)
6.  [Domain Classes](https://medium.com/p/ad2d2782059f)
7.  [Services](https://medium.com/p/f7d1ba4025f2)
8.  [Controllers](https://medium.com/p/724e51ec3925/)
9.  [Micronaut Application](https://medium.com/p/c0d3956afe47)
10.  Micronaut Data

#### Sources & Discussion

[**GitHub — agorapulse/goodbye-grails-hello-micronaut: Goodbye Grails, Hello Micronaut**  
_This repository contains sources for the Grails to Micronaut guide. The repository shows the state of the application…_github.com](https://github.com/agorapulse/goodbye-grails-hello-micronaut "https://github.com/agorapulse/goodbye-grails-hello-micronaut")[](https://github.com/agorapulse/goodbye-grails-hello-micronaut)

By [Vladimír Oraný](https://medium.com/@musketyr) on [August 3, 2021](https://medium.com/p/759c6c36bc7).

[Canonical link](https://medium.com/@musketyr/goodbye-grails-hello-micronaut-10-micronaut-data-759c6c36bc7)

Exported from [Medium](https://medium.com) on February 15, 2026.