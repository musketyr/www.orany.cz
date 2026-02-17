---
title: "How to Create Library Suitable for Grails with Micronaut"
date: 2018-10-04
slug: how-to-create-library-suitable-for-grails-with-micronaut
source: medium
mediumId: "3485329fd7e6"
---We are slowly trying to introduce Micronaut into our code base and one of the first questions I asked myself was if there is any way how…

* * *

### How to Create a Library Suitable for Grails with Micronaut

![](https://cdn-images-1.medium.com/max/800/1*tj1zx5pAtTT7vXRPf66Z-w.png)

Configuration using GrailsMicronautBeanProcessor

We are slowly trying to introduce [Micronaut](http://micronaut.io/) into our code base and one of the first questions I asked myself was if there is any way how to share code between [Micronaut](http://micronaut.io/) microservices and [Grails](https://grails.org/) application.

To be more specific, the question is how to share bean definitions so the beans are automatically injected into both — [Micronaut](http://micronaut.io/) microservices and the [Grails](https://grails.org/) applications. There is an excellent blog post from [Hubert Klein Ikkink (aka Mr. Haki)](https://www.mrhaki.com/about/) showing [how to integrate Micronaut beans into Spring application](http://mrhaki.blogspot.com/2018/08/micronaut-mastery-use-micronaut-beans.html) but for [Grails](https://grails.org/) application, this is useless as [Grails](https://grails.org/) applications inject beans by names and [Micronaut's Spring integration](https://docs.micronaut.io/latest/guide/index.html#springBeans) uses fully qualified names of the type of the bean such as `foo.bar.MyService` for the name of the bean whereas [Grails](https://grails.org/) expects property name such as `myService`. Therefore beans injected using [Micronaut’s Spring integration](https://docs.micronaut.io/latest/guide/index.html#springBeans) will never be found by [Grails](https://grails.org/) autowiring mechanism.

[**Micronaut Mastery: Use Micronaut Beans In Spring Applications**  
[mrhaki.blogspot.com](http://mrhaki.blogspot.com/2018/08/micronaut-mastery-use-micronaut-beans.html)

To workaround this problem we have created another [Micronaut](http://micronaut.io/) library which can be used to inject [Micronaut](http://micronaut.io/) beans into [Grails](https://grails.org/)'s application context.

[**agorapulse/micronaut-libraries**  
[github.com](https://github.com/agorapulse/micronaut-libraries#micronaut-grails)

New `GrailsMicronautBeanProcessor` works in a similar way as original `MicronautBeanProcess` with the focus of the names of the injected beans:

package com.example.mn4grails

@Configuration  
**class** GrailsConfig {  
  
    @Bean  
    GrailsMicronautBeanProcessor widgetProcessor() {  
        GrailsMicronautBeanProcessor  
            ._builder_()  
            .addByType(Widget)  
            .addByType(**'someInterface'**, SomeInterface)  
            .addByStereotype(**'prototype'**, Prototype)  
            .addByName(**'gadget'**)            .build()  
    }  
  
}

**interface** SomeInterface { }  
  
@Singleton  
**class** SomeImplementation **implements** SomeInterface { }  
  
@Singleton  
**class** Widget {}  
  
@Singleton  
@Requires(notEnv = **'test'**)  
**class** TestWidget **extends** Widget { }  
  
  
**interface** Minion {}  
  
@Prototype  
**class** PrototypeBean {  
  
    **final** String **redisHost  
    final** Integer **redisPort  
    final** Integer **redisTimeout**    PrototypeBean(  
        @Value(**'${redis.host}'**) String redisHost,  
        @Value(**'${redis.port}'**) Integer redisPort,  
        @Value(**'${redis.timeout:10000}'**) Integer redisTimeout  
    ) {  
        **this**.**redisHost** \= redisHost  
        **this**.**redisPort** \= redisPort  
        **this**.**redisTimeout** \= redisTimeout  
    }  
}  
  
@Singleton  
@Named(**'gadget'**)  
**class** SomeGadget { }

If the name can be easily guessed, you don't have to specify it manually. You have to always narrow the micronaut bean qualification down to single bean otherwise the processor will throw an exception. `@Primary` annotation does not help here but using `@Requires` does.

Apart from guaranteeing the expected name `[GrailsMicronautBeanProcessor](https://github.com/agorapulse/micronaut-libraries/blob/master/micronaut-grails/src/main/groovy/com/agorapulse/micronaut/grails/GrailsMicronautBeanProcessor.java)` also helps with reusing existing properties. If your [Grails](https://grails.org/) application is already using for example [Grails Redis plugin](https://github.com/grails-plugins/grails-redis) you may already have [Redis](https://redis.io/) properties such as `grails.redis.host` set in your configuration file. `[GrailsMicronautBeanProcessor](https://github.com/agorapulse/micronaut-libraries/blob/master/micronaut-grails/src/main/groovy/com/agorapulse/micronaut/grails/GrailsMicronautBeanProcessor.java)` and its companion `[PropertyTranslatingCustomizer](https://github.com/agorapulse/micronaut-libraries/blob/master/micronaut-grails/src/main/groovy/com/agorapulse/micronaut/grails/PropertyTranslatingCustomizer.java)` will automatically strip the `grails.` prefix for you.

The last step to allow [Grails](https://grails.org/) (and other [Spring](https://spring.io/) application) to automatically load the [Micronaut](http://micronaut.io/) beans based on the configuration provided above is to add following lines into file `META-INF/spring.factories`:

**org.springframework.boot.autoconfigure.EnableAutoConfiguration**\=**com.example.mn4grails.GrailsConfig**

* * *


