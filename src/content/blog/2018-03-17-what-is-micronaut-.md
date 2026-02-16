---
title: "What is Micronaut?"
date: 2018-03-17
slug: what-is-micronaut-
source: medium
mediumId: "37a6565f217d"
---Micronaut is a new full-stack framework build from the ground by the Grails team officially announced at Greach 2018. It focuses on…

* * *

### What is Micronaut?

[**Micronaut: A Modern Microservice Framework for the JVM**  
_A modern, JVM-based, full-stack framework for building modular, easily testable microservice applications._micronaut.io](http://micronaut.io/ "http://micronaut.io/")

[Micronaut](http://micronaut.io/) is a new full-stack framework build from the ground by the [Grails](https://grails.org/) team officially announced at [Greach 2018](http://2018.greachconf.com/). It focuses on modularity, minimal memory footprint and startup time which makes it a perfect solution for running on [AWS](https://hackernoon.com/tagged/aws) lambda or similar environments. Server written in [Java](https://hackernoon.com/tagged/java) requires less than one second to start with minimal JAR size of 8 MB. [Micronaut](http://micronaut.io/) supports Java, Groovy and Kotlin language.

> [](https://twitter.com/ObjectComputing/status/974689364700786688)

Key things about Micronaut

The main advantage of [Micronaut](http://micronaut.io/) is that there are no runtime penalty for holding metadata for configuration and dependency injection. You can think about [Micronaut](http://micronaut.io/) as Spring without any runtime reflection. Every information is handled at compile time using Groovy AST transformation or AST processors for Java and Kotlin. [Micronaut](http://micronaut.io/) uses internal dependency injection module inspired by Spring which leverages the official [JSR-330 Context and Dependency Injection annotations.](http://cdi-spec.org/)

[Micronaut](http://micronaut.io/) code looks very similar to [Spring Boot](https://projects.spring.io/spring-boot/) with [Spring Cloud](http://projects.spring.io/spring-cloud/) enabled. You can write HTTP servers and HTTP clients with seamless load balancing. There is out-of-box support for service discovery, Hystrix, trace logging, caching, fault tolerance and circuit breaker pattern. Reactive Streams support is integral part of the framework so your controllers and clients can use for example RxJava 2 objects for input and output such as `Single<MyObject>`.

_Controller Example_

@Controller("/") class HelloController {  
      
    @Get("/hello/{name}") String hello(String name) {  
        return "Hello $name"  
    }  
}

_Client Example_

@Client("/") interface HelloClient {  
    @Get('/hello/{name}') Single<String> hello(String name)  
}

_Fallback Client Example_

@Fallback class HelloFallbackClient {  
    Single<String> hello(String name) {  
        return Single.just("Hello fallback $name")  
    }  
}

Similar to [Spring Boot](https://projects.spring.io/spring-boot/) you can declare your own _auto-configurable_ beans using `@Requires` annotation. It also shares the configuration properties with [Spring Boot](https://projects.spring.io/spring-boot/). You can even use `SPRING_APPLICATION_JSON` environment property for backend compatibility. You can use environment-specific properties for example `application-aws.yml` for deployment to AWS.

[Micronaut](http://micronaut.io/) shares some of the parts with Grails — you will be able to use for example GORM from within your [Micronaut](http://micronaut.io/) microservice.

[Micronaut](http://micronaut.io/) is not available to public yet. The release is planned in Q2 2018 which means it will be probably released at [Gr8Conf EU](http://gr8conf.eu/), which will also host talks dedicated to this new framework. Companies interested to try [Micronaut](http://micronaut.io/) may ask [OCI](https://objectcomputing.com/) for beta access.

You can see more details about Micronaut in following slides by [Álvaro Sánchez-Mariscal](https://medium.com/u/d41273300566):

_Edit: First milestone of_ [_Micronaut_](http://micronaut.io/) _has been released at_ [_Gr8Conf EU_](http://gr8conf.eu/) _as expected. Visit_ [_the download section_](http://micronaut.io/download.html) _to get started. Preferred option is to use_ [_SDKMAN!_](https://medium.com/u/2818e79e6b9a)_:_

curl -s https://get.sdkman.io | bash  
source "$HOME/.sdkman/bin/sdkman-init.sh"  
sdk install micronaut  
mn -version

_The_ [_documentation_](https://docs.micronaut.io/latest/guide/index.html) _is already very comprehensive:_

[**Micronaut**  
_In addition, with Micronaut your application startup time and memory consumption is not bound to the size of your…_docs.micronaut.io](https://docs.micronaut.io/latest/guide/index.html "https://docs.micronaut.io/latest/guide/index.html")

_There are also_ [_several guides_](http://guides.micronaut.io/) _available already:_

[**Micronaut: A Modern Microservice Framework for the JVM**  
_A modern, JVM-based, full-stack framework for building modular, easily testable microservice applications._guides.micronaut.io](http://guides.micronaut.io/ "http://guides.micronaut.io/")

By [Vladimír Oraný](https://medium.com/@musketyr) on [March 17, 2018](https://medium.com/p/37a6565f217d).

[Canonical link](https://medium.com/@musketyr/what-is-micronaut-37a6565f217d)

Exported from [Medium](https://medium.com) on February 15, 2026.