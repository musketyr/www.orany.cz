---
title: "Goodbye Grails, Hello Micronaut #4: Datasets"
date: 2021-08-03
slug: goodbye-grails--hello-micronaut--4--datasets
source: medium
mediumId: "440c8b50fb56"
---This is the fourth post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your…

* * *

### Goodbye Grails, Hello Micronaut #4: Datasets

_This is the fourth post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your application to be based on Grails 4.x or later._

![](https://cdn-images-1.medium.com/max/800/1*IlyVfS6V05ZxtwIYpI804w.png)

We should cover the crucial parts of the application with tests as things can go wrong very easily during the migration. For the meaningful tests, we will need the meaningful data. In this post, we are going to use Dru framework for this purpose because it already supports Grails and GORM, and Micronaut Data out of the box.

[**Dru - Data Reconstruction Utility**  
agorapulse.github.io](https://agorapulse.github.io/dru/ "https://agorapulse.github.io/dru/")[](https://agorapulse.github.io/dru/)

Dru excels in creating the relationships between different entities but we won't get into too many details. You should rather use the documentation for the full reference.

Let's say we have a simple domain class in our codebase:

Vehicle.groovy

If you want to define the dataset for an entity then we usually choose from either a JSON or SQL file. You can use responses from your production or test environment using the JSON source or you can use simplified database dumps with the SQL source. To add Dru on your classpath update the application's Gradle file with the following dependencies:

The following snippet shows using the JSON fixture to load test data:

HelloDataSets.groovy

Given the class `HelloDataSet` being declared in `hello` package then the JSON file containing the test data for vehicles is located in `src/test/resources/hello/HelloDataSet/vehicles.json` file.

vehicles.json

The data set deserves its own specification as a lot of other tests will depend on the data being loaded properly:

HelloDataSetsSpec.groovy

Creating data sets will later help us to create tests for the controllers as well as migrating from GORM to Micronaut Data.

_In the next step, we will move towards_ [_decoupling the web layer from the domain layer_](https://medium.com/p/7b69d9a132bc) _by introducing Data Transfer Objects (DTOs) into the controllers._

#### Table of Contents

1.  [Multiproject](https://medium.com/p/ffeaab056e28)
2.  [Configuration](https://medium.com/p/6aaab659112a)
3.  [Static Compilation](https://medium.com/p/a5a01bad2a06)
4.  Datasets
5.  [Marshalling](https://medium.com/p/7b69d9a132bc)
6.  [Domain Classes](https://medium.com/p/ad2d2782059f)
7.  [Services](https://medium.com/p/f7d1ba4025f2)
8.  [Controllers](https://medium.com/p/724e51ec3925/)
9.  [Micronaut Application](https://medium.com/p/c0d3956afe47)
10.  [Micronaut Data](https://medium.com/p/759c6c36bc7)

#### Sources & Discussion

[**GitHub — agorapulse/goodbye-grails-hello-micronaut: Goodbye Grails, Hello Micronaut**  
_This repository contains sources for the Grails to Micronaut guide. The repository shows the state of the application…_github.com](https://github.com/agorapulse/goodbye-grails-hello-micronaut "https://github.com/agorapulse/goodbye-grails-hello-micronaut")[](https://github.com/agorapulse/goodbye-grails-hello-micronaut)

By [Vladimír Oraný](https://medium.com/@musketyr) on [August 3, 2021](https://medium.com/p/440c8b50fb56).

[Canonical link](https://medium.com/@musketyr/goodbye-grails-hello-micronaut-4-datasets-440c8b50fb56)

Exported from [Medium](https://medium.com) on February 15, 2026.