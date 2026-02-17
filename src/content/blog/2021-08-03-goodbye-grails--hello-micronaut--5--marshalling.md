---
title: "Goodbye Grails, Hello Micronaut #5: Marshalling"
date: 2021-08-03T13:00:00Z
slug: goodbye-grails--hello-micronaut--5--marshalling
source: medium
mediumId: "7b69d9a132bc"
---This is the fifth post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your application…

* * *

### Goodbye Grails, Hello Micronaut #5: Marshalling

_This is the fifth post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your application to be based on Grails 4.x or later._

![](https://cdn-images-1.medium.com/max/800/1*IlyVfS6V05ZxtwIYpI804w.png)

Controllers are responsible for the communication with other applications, including your frontend. We need to ensure that your API won't change and the application will be able to consume the same inputs and produce the same outputs as before the migration. Gru testing framework is exactly the tool we are looking for. Gru evaluates the responses from the controllers and it supports Grails and Micronaut out of the box.

[**Gru - Groovy HTTP Testing Framework**  
agorapulse.github.io](https://agorapulse.github.io/gru/ "https://agorapulse.github.io/gru/")

You can add Gru into your project by providing the following dependency in your application's subproject Gradle file:

testCompile 'com.agorapulse:gru-grails:0.9.2'

Let's image a very simple controller which only renders a single entity.

We can write a simple test that will validate the JSON output of the controller.

We are using the dataset created in a previous step to load the test data to be rendered by the controller. The file `vehicle.json` is created automatically on the first run but you need to re-evaluate its contents to ensure there are no variable values such as timestamps. See [the reference documentation](https://agorapulse.github.io/gru/#json-payload) for advanced use cases such as ignoring timestamps.

Once the current output is covered with the tests, we can switch the internals to `ObjectMapper`.

In our case, the `VehicleResponse` looks like a bare `Vehicle` entity:

The point is to ensure no Grails-related marshalling is happening under the hood. This will help us to switch to Micronaut controllers later as well as to Micronaut Data.

The current tests will fail because of the missing `objectMapper` bean. Luckily, there is an easy fix using `doWithSpring` method where you can simply declare the `ObjcetMapper` bean.

_In the next step, we will extract_ [_the domain classes_](https://medium.com/p/ad2d2782059f) _into their own library._

#### Table of Contents

1.  [Multiproject](https://medium.com/p/ffeaab056e28)
2.  [Configuration](https://medium.com/p/6aaab659112a)
3.  [Static Compilation](https://medium.com/p/a5a01bad2a06)
4.  [Datasets](https://medium.com/p/440c8b50fb56)
5.  Marshalling
6.  [Domain Classes](https://medium.com/p/ad2d2782059f)
7.  [Services](https://medium.com/p/f7d1ba4025f2)
8.  [Controllers](https://medium.com/p/724e51ec3925/)
9.  [Micronaut Application](https://medium.com/p/c0d3956afe47)
10.  [Micronaut Data](https://medium.com/p/759c6c36bc7)

#### Sources & Discussion

[**GitHub — agorapulse/goodbye-grails-hello-micronaut: Goodbye Grails, Hello Micronaut**  
[github.com](https://github.com/agorapulse/goodbye-grails-hello-micronaut)



