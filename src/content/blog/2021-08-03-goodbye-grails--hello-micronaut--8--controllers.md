---
title: "Goodbye Grails, Hello Micronaut #8: Controllers"
date: 2021-08-03T16:00:00Z
slug: goodbye-grails--hello-micronaut--8--controllers
source: medium
mediumId: "724e51ec3925"
---This is the eighth post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your…

* * *

### Goodbye Grails, Hello Micronaut #8: Controllers

_This is the eighth post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your application to be based on Grails 4.x or later._

![](https://cdn-images-1.medium.com/max/800/1*IlyVfS6V05ZxtwIYpI804w.png)

We have migrated the services into a separate library in the last step. In this part, we are going to migrate Grails controllers into their Micronaut counterparts.

Let's add declarative error handling into our existing Grails controller first.

The test should be still passing.

Let's create a new library `hello-api` in the `libs` directory with a build file similar to the following `hello-api.gradle` :

The build file contains all we need to create Micronaut controllers and test them. It is quite easy to rewrite the controllers after we have already switched to Jackson marshalling. The major difference is that we need to apply the HTTP mapping annotations.

Micronaut

The injection now happens in the constructor. As Micronaut is using Jackson for the marshalling, we remove the explicit usage of `objectMapper`. The `VehicleReponse` class can be copied from the existing Grails application as it is. Micronaut is returning `404 Not Found` for empty `Optional` so we can take advantage of that the repository interface now returns `Optional`.

There are only minor changes required in the specification. You can copy the original one from the Grails application and do the following changes:

*   remove all the traits such as `ControllerUnitTest`
*   annotate the class with `MicronautTest`
*   replace the `Gru` definition with just `@Inject Gru gru`
*   assign the `id` of the loaded entities as we are using POGO implementation of `Dru`

We also need to copy `MockDataServiceFactory` into the `hello-api` project. The fixture files such `vehicle.json` should be copied from the Grails applications `src/test/resources` folders to ensure the returned JSON remains unchanged.

#### Advanced Migration

Migrating controllers themselves is relatively easy. You may face another there are still some parts missing e.g. HTTP filters, Grails Security. You will have to find their counterparts in the [Micronaut Documentation](https://micronaut.io/docs/):

[**Docs - Micronaut Framework**  
[micronaut.io](https://micronaut.io/docs/)

_In the next part, we are going to create the new_ [_Micronaut application_](https://medium.com/p/c0d3956afe47)_._

#### Table of Contents

1.  [Multiproject](https://medium.com/p/ffeaab056e28)
2.  [Configuration](https://medium.com/p/6aaab659112a)
3.  [Static Compilation](https://medium.com/p/a5a01bad2a06)
4.  [Datasets](https://medium.com/p/440c8b50fb56)
5.  [Marshalling](https://medium.com/p/7b69d9a132bc)
6.  [Domain Classes](https://medium.com/p/ad2d2782059f)
7.  [Services](https://medium.com/p/f7d1ba4025f2)
8.  Controllers
9.  [Micronaut Application](https://medium.com/p/c0d3956afe47)
10.  [Micronaut Data](https://medium.com/p/759c6c36bc7)

#### Sources & Discussion

[**GitHub — agorapulse/goodbye-grails-hello-micronaut: Goodbye Grails, Hello Micronaut**  
[github.com](https://github.com/agorapulse/goodbye-grails-hello-micronaut)



