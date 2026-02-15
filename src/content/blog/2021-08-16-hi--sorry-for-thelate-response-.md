---
title: "Hi, sorry for thelate response."
date: 2021-08-16
slug: hi--sorry-for-thelate-response-
source: medium
mediumId: "6d0d408d938b"
---You are right that Micronaut is missing some of the rapid application development features that let you create complete applications very…

* * *

Hi, sorry for thelate response. Please, pay attention that this series is about the migration of an existing Grails application into Micronaut one and I expect you already have your modern frontend created.

You are right that Micronaut is missing some of the rapid application development features that let you create complete applications very quickly but in a long term. all the magic makes the application more difficult to maintain.

If you are looking for a RAD tool based on Micronaut then take a look on MHipster:

[**JHipster Micronaut Blueprint 1.0 Release - Micronaut Framework**  
_We are very happy to announce the 1.0.0 release of the Micronaut Blueprint for JHipster (otherwise known as MHipster)…_micronaut.io](https://micronaut.io/2021/04/19/jhipster-micronaut-blueprint-1-0-release/ "https://micronaut.io/2021/04/19/jhipster-micronaut-blueprint-1-0-release/")[](https://micronaut.io/2021/04/19/jhipster-micronaut-blueprint-1-0-release/)

The performance wasn't the main reason for the migration. The initial impulse was that we were not able to share the code between our serverless functions and the main application. Even we have created a bridge library there was still some friction, especially on the configuration level. Grails 4 has removed some of the problems but other ones arisen so we decided to remove Grails completely. We are not there yet and this series has been written for my coworkers to help them migrate our applications gracefully.

Yet another reason was that using Grails keeps us a lot behind the newest versions of the libraries — Grails 4 still uses Micronaut 1.x and Groovy 2.x. Using the latest Micronaut and Groovy also allows use to use the latest versions of Java.

If you're looking for some performance comparison, just search for Spring Boot vs Micronaut articles.

By [Vladimír Oraný](https://medium.com/@musketyr) on [August 16, 2021](https://medium.com/p/6d0d408d938b).

[Canonical link](https://medium.com/@musketyr/hi-sorry-for-thelate-response-6d0d408d938b)

Exported from [Medium](https://medium.com) on February 15, 2026.