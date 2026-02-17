---
title: "Testing Spring MVC Applications with Gru"
date: 2017-08-30
slug: testing-spring-mvc-applications-with-gru
source: medium
mediumId: "9867b28774c3"
---Gru is HTTP testing framework written in Groovy. Latest release of Gru added support for unit testing Spring web applications. Let's take a…

* * *

### Testing Spring MVC Applications with Gru

[Gru](https://agorapulse.github.io/gru/) is [HTTP testing](https://medium.com/@musketyr/testing-legacy-api-endpoints-with-gru-5b614db048bd) framework written in [Groovy](http://groovy-lang.org/). Latest release of [Gru](https://agorapulse.github.io/gru/) added support for unit testing [Spring](https://spring.io/) web applications. Let's take a look how easy it is to test REST endpoints created with [Spring Boot](https://projects.spring.io/spring-boot/).

New [Spring Boot](https://projects.spring.io/spring-boot/) application can be easily generated with [Spring Initializr](http://start.spring.io/) site.

![](https://cdn-images-1.medium.com/max/800/1*9Yex4VLyF42Qq2GDbWeM3Q.png)

Creating new Spring Boot project with Groovy and Gradle

Go to [http://start.spring.io/](http://start.spring.io/) and select **_Gradle Project_** with **_Groovy_**. From dependencies selection pick **_Web_** and then **_Generate Project_**. The downloaded archive file contains everything you get started. Extracted archive can be easily imported to you favourite IDE such as [IntelliJ IDEA](https://www.jetbrains.com/idea/).

First of all, we should add [Gru](https://agorapulse.github.io/gru/) by adding following lines into `build.gradle` file which can be found in the root directory of the generated project:

repositories {  
    jcenter()  
}  
  
dependencies {  
    String spockVersion = **'1.1-groovy-2.4'**    testCompile(**"org.spockframework:spock-spring:**$spockVersion**"**)  
    testCompile(**"org.spockframework:spock-core:**$spockVersion**"**)  
    testCompile **"com.agorapulse:gru-spring:0.2.0"  
**}

Then we can create very simple domain class and controller in `src/main/resources/com/example/demo`:

Moon Domain Class

`Moon` class just contains 4 properties which will be rendered as JSON.

Moon Controller

This controller will render instance of `Moon` when the name of the planet is `earth` and name of the moon is `moon` or throws `NotFoundException` otherwise which will produce HTTP status `NOT_FOUND(404)`.

With Gru it is very simple to test such behaviour. Let's create new tests in `src/test/groovy/com/example/demo`:

Moon Controller Gru Spec

Gru tests are very readable. For example method `show the moon` describes that if we issue GET request to the URL `/moon/earth/moon` you should get the JSON response similar to one described in `moonResponse.json` file. The file is created after first test run in `src/test/resources/com/example/demo/MoonControllerSpec` directory with content similar to following snippet

{  
    **"planet"**: **"Earth"**,  
    **"name"**: **"Moon"**,  
    **"created"**: 1504063858788,  
    **"url"**: **"https://en.wikipedia.org/wiki/Moon"  
**}

You can see `created` property is rendered as number of milliseconds from the epoch. This value is obviously going to change after each run causing the test to fail but we can use [one of the builtin placeholders offered by Gru](https://agorapulse.github.io/gru/#_jsonunit_primer).

{  
  **"planet"**: **"Earth"**,  
  **"name"**: **"Moon"**,  
  **"created"**: **"${json-unit.matches:positiveIntegerString}"**,  
  **"url"**: **"https://en.wikipedia.org/wiki/Moon"  
**}

When we run the specification again all tests should pass.

* * *

Gru Spring implementation is very lightweight. It only provides [common HTTP interactions](https://agorapulse.github.io/gru/#_common_interactions) and [leverages the rest of advanced settings back to MockMvc](https://agorapulse.github.io/gru/#_mockmvc_builders). Dive deep into [Gru documentation](https://agorapulse.github.io/gru/) and feel free to start experimenting with the project we have just created. If you haven't followed the steps then you can download the sample project from GitHub: [https://github.com/musketyr/gru-spring-demo](https://github.com/musketyr/gru-spring-demo).



