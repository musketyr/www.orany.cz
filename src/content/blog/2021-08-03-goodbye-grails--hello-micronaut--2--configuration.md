---
title: "Goodbye Grails, Hello Micronaut #2: Configuration"
date: 2021-08-03T10:00:00Z
slug: goodbye-grails--hello-micronaut--2--configuration
source: medium
mediumId: "6aaab659112a"
---This is the second post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your…

* * *

### Goodbye Grails, Hello Micronaut #2: Configuration

_This is the second post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your application to be based on Grails 4.x or later._

![](https://cdn-images-1.medium.com/max/800/1*IlyVfS6V05ZxtwIYpI804w.png)

Let's start with a simple warmup session to migrate the way how the application configuration is accessed.

Grails allows you to access the configuration from the `GrailsApplication` object or using the static methods of the`Holders` class.

Grails 4.x is already based on Micronaut so you can take advantage of all Micronaut's features, including configuration properties objects. You can create a simple object to bind the configuration values:

This object can be injected into any Grails service. You need to annotate the field with `@Inject` annotation as automatic binding no longer works for Micronaut beans.

As a bonus, you can add additional validation to the configuration class and your service is now fully compile-static-ready.

_In the next step, you will learn_ [_how to add a static compilation_](https://medium.com/p/a5a01bad2a06) _globally into your Grails project._

#### Table of Contents

1.  [Multiproject](https://medium.com/p/ffeaab056e28)
2.  Configuration
3.  [Static Compilation](https://medium.com/p/a5a01bad2a06)
4.  [Datasets](https://medium.com/p/440c8b50fb56)
5.  [Marshalling](https://medium.com/p/7b69d9a132bc)
6.  [Domain Classes](https://medium.com/p/ad2d2782059f)
7.  [Services](https://medium.com/p/f7d1ba4025f2)
8.  [Controllers](https://medium.com/p/724e51ec3925/)
9.  [Micronaut Application](https://medium.com/p/c0d3956afe47)
10.  [Micronaut Data](https://medium.com/p/759c6c36bc7)

#### Sources & Discussion

```yaml
[GitHub — agorapulse/goodbye-grails-hello-micronaut: Goodbye Grails, Hello Micronaut
```

[github.com](https://github.com/agorapulse/goodbye-grails-hello-micronaut)



