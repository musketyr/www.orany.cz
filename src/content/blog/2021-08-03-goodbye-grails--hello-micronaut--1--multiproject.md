---
title: "Goodbye Grails, Hello Micronaut #1: Multiproject"
date: 2021-08-03
slug: goodbye-grails--hello-micronaut--1--multiproject
source: medium
mediumId: "ffeaab056e28"
---This is the first post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your application…

* * *

### Goodbye Grails, Hello Micronaut #1: Multiproject

_This is the first post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your application to be based on Grails 4.x or later._

![](https://cdn-images-1.medium.com/max/800/1*IlyVfS6V05ZxtwIYpI804w.png)

In this series, we will migrate various parts of the Grails application one by one. To be able to achieve that, we need to be able to extract parts of the current Grails application into separate libraries. This is best handled by using Gradle's multiproject layout. We'll be using Kordamp Gradle Plugin to achieve an easy-to-change multiproject structure.

[**A collection of opinionated Gradle plugins**  
_It's expected of projects that make use of these plugins to follow a certain directory structure that enables them to…_kordamp.org](https://kordamp.org/kordamp-gradle-plugins/ "https://kordamp.org/kordamp-gradle-plugins/")[](https://kordamp.org/kordamp-gradle-plugins/)

First, move everything specific to your application into `apps/<your-app-name>`. We will use the name `hello` as a placeholder for your application's name in the following texts. So if your application is called `hello` then the new destination should be `apps/hello`. Do not move Gradle related files except the `build.gradle` file which will now take the name of the directory in which you have moved the file, e.g. `hello.gradle`. Grails Wrapper related files can be deleted.

This is how should the directory structure look like after moving the files:

Next, you need to create `setting.gradle` file which installs Kordamp Gradle Plugins

The `rootProject.name` should be composed of the original name of the application and the`-root` suffix to prevent name clash. Thanks to Kordamp Gradle Plugins, any directory within `apps` and `libs` will be now considered as a subproject automatically.

You will also need to create new`build.gradle` in the root directory. Replace the values in the following example with your own.

At last, explicitly declare the application class such as `hello.Application` in your Grails subproject `apps/hello/hello.gradle` because otherwise there will be a conflict in the Gradle plugins' configuration and that application won't start:

springBoot **{**    mainClassName = 'hello.Application'  
**}**

You can now run the application with the following command to verify that the application still works.

./gradlew bootRun

_In the next step, we will migrate Grails'_ [_configuration_](https://medium.com/p/6aaab659112a) _into Micronaut configuration objects._

#### Table of Contents

1.  Multiproject
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

[**GitHub — agorapulse/goodbye-grails-hello-micronaut: Goodbye Grails, Hello Micronaut**  
_This repository contains sources for the Grails to Micronaut guide. The repository shows the state of the application…_github.com](https://github.com/agorapulse/goodbye-grails-hello-micronaut "https://github.com/agorapulse/goodbye-grails-hello-micronaut")[](https://github.com/agorapulse/goodbye-grails-hello-micronaut)

By [Vladimír Oraný](https://medium.com/@musketyr) on [August 3, 2021](https://medium.com/p/ffeaab056e28).

[Canonical link](https://medium.com/@musketyr/goodbye-grails-hello-micronaut-1-multiproject-ffeaab056e28)

Exported from [Medium](https://medium.com) on February 15, 2026.