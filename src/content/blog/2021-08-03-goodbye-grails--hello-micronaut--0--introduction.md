---
title: "Goodbye Grails, Hello Micronaut #0: Introduction"
date: 2021-08-03T08:00:00Z
slug: goodbye-grails--hello-micronaut--0--introduction
source: medium
mediumId: "ff7470cecf9d"
---This is the introductory post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your…

* * *

### Goodbye Grails, Hello Micronaut #0: Introduction

_This is the introductory post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your application to be based on Grails 4.x or later._

![](https://cdn-images-1.medium.com/max/800/1*IlyVfS6V05ZxtwIYpI804w.png)

Grails describes itself as a powerful Groovy-based web application framework for the JVM built on top of Spring Boot. Micronaut is a modern, JVM-based, full-stack framework for building modular, easily testable microservice and serverless applications. This is an introductory post in the series showing how to migrate from Grails to Micronaut.

I was sitting in the audience when the Grails team announced _something big_ at Greach 2018. Nearly twelve years after the initial release of Grails in 2006 there was something new that looked like a fresh version of Grails as if it was invented nowadays — cloud-enabled, Java and Kotlin friendly, focused on API endpoints and on serverless. And I am still keeping this point of view — seeing Micronaut as a successor of Grails. This series should help you move your application up to date with the latest trends.

After migration to Micronaut your application will be:

*   cloud-native
*   more lightweight
*   more language agnostic

Please, pay attention, that this guide is focused on modern JSON-serving applications that do not render pages server-side using GSPs but some separate articles may be published later.

This series is divided into smaller steps that guide you through the migration process. The order of the posts has been arranged carefully to minimize radical changes to keep your application working all the time.

In the first article called [Multiproject](https://medium.com/p/ffeaab056e28), you will make your application ready for extracting Micronaut-ready parts.

Next, you will make the first baby step by migrating the [Configuration](https://medium.com/p/6aaab659112a) into objects.

Adding [Static Compilation](https://medium.com/p/a5a01bad2a06) will create yet another safe point to prevent breaking the application.

Assuming the test coverage of your application is not ideal, you will create reusable [Datasets](https://medium.com/p/440c8b50fb56) for the tests we are going to create in the next steps.

In the fifth post called [Marshalling](https://medium.com/p/7b69d9a132bc), we stop relying on Grails JSON conversion but we're going to switch to Jackson one which is native to Micronaut.

The [Domain Classes](https://medium.com/p/ad2d2782059f) are the core objects of any Grails application. We will learn how to extract them into a separate library so we can later use them in the new Micronaut application.

Once the domain classes are extracted we can also move the [Services](https://medium.com/p/f7d1ba4025f2) and make them Micronaut beans which can be injected into Grails artifacts.

Next, we will create Micronaut's version of the Grails [Controllers](https://medium.com/p/724e51ec3925/).

And finally, we will glue all the pieces together into the new [Micronaut Application](https://medium.com/p/c0d3956afe47).

As the last step, we leave the Grails ecosystem completely by migrating from GORM to [Micronaut Data](https://medium.com/p/759c6c36bc7).

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
10.  [Micronaut Data](https://medium.com/p/759c6c36bc7)

#### Sources & Discussion

[**GitHub - agorapulse/goodbye-grails-hello-micronaut: Goodbye Grails, Hello Micronaut**  
_This repository contains sources for the Grails to Micronaut guide. The repository shows the state of the application…_github.com](https://github.com/agorapulse/goodbye-grails-hello-micronaut "https://github.com/agorapulse/goodbye-grails-hello-micronaut")

By [Vladimír Oraný](https://medium.com/@musketyr) on [August 3, 2021](https://medium.com/p/ff7470cecf9d).

[Canonical link](https://medium.com/@musketyr/goodbye-grails-hello-micronaut-0-introduction-ff7470cecf9d)

Exported from [Medium](https://medium.com) on February 15, 2026.