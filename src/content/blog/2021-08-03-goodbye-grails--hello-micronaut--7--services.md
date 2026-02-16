---
title: "Goodbye Grails, Hello Micronaut #7: Services"
date: 2021-08-03T15:00:00Z
slug: goodbye-grails--hello-micronaut--7--services
source: medium
mediumId: "f7d1ba4025f2"
---This is the seventh post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your…

* * *

### Goodbye Grails, Hello Micronaut #7: Services

_This is the seventh post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your application to be based on Grails 4.x or later._

![](https://cdn-images-1.medium.com/max/800/1*IlyVfS6V05ZxtwIYpI804w.png)

Within this series, we have already extracted the domain classes into a subproject. Now we can continue moving other services from the original Grails application. For a lack of good naming, let's call these simply `-core` libraries.

Let's create yet another directory `hello-core` within `libs` folder and add `hello-core.gradle` build file into it.

We will also have to move the dependencies from the original application. Once any extracted service cannot compile because of some missing dependencies, you need to move that one into `hello-core.gradle`.

From the Grails application project, you should be able to copy everything from

*   `src/main/groovy`
*   `grails-app/services`

directories into `src/main/groovy` of the new library.

Don't forget to add the new library as a dependency of the original application:

```
implementation project(':hello-core')
```

Micronaut beans prefer constructor injection instead of field-by-name injection in Grails.

Let's take a look at a simple Grails service here:

In this service, we are injecting `VehicleDataService` into `VehicleService` by name into a public property `vehicleDataService`. Naming is crucial for Grails.

We will move this class from `hello/grails-app/services` into `hello-core/src/main/groovy`.

![](https://cdn-images-1.medium.com/max/800/1*pnYYuEJvFXPbtIf3tCq31g.png)

Now, we need to convert it into Micronaut bean:

Micronaut declaration is more verbose but it's also more powerful. You need to annotate the class with `javax.inject.Singleton` annotation, declare the fields `private final` and initialize them in the constructor.

On the other hand, the name of the injected bean no longer matters and in general, the Micronaut dependency injection capabilities are more powerful than basic Grails one.

You need to update all the remaining injection points in the Grails application. This is similar to what we have done for the configuration objects. The only difference is the `@Inject` annotation before the field declaration.

#### Micronaut Grails Integration

As GORM is now called from Micronaut beans instead of Grails services and controllers, we need to let Micronaut know which packages should be scanned. Sadly, the default `GrailsApp` implementation does not propagate the packages into the Micronaut context but there is [Micronaut Grails](https://agorapulse.github.io/micronaut-grails/) library for a rescue:

[**Grails Integration for Micronaut**  
_import com.agorapulse.micronaut.grails.CompatibilityMode import…_agorapulse.github.io](https://agorapulse.github.io/micronaut-grails/ "https://agorapulse.github.io/micronaut-grails/")[](https://agorapulse.github.io/micronaut-grails/)

We need to add two more dependencies into the Grails application's build file `hello.gradle`:

implementation 'com.agorapulse:micronaut-grails:3.0.7'  
implementation 'com.agorapulse:micronaut-grails-web-boot:3.0.7'

We also need to **remove** the following line

compile "org.grails:grails-web-boot"

Next, let's make some updates to the `Application` class which launches the application.

The class now extends `MicronautGrailsAutoConfiguration` and uses `MicronautGrailsApp` for running the application.

We will also have to update the tests. If we want to keep using the mocked data services then we need to create a factory which will create the mocks.

Then we can get the mock injected into the specification using Spring's `Autowire` and Grail's `AutowiredTest`. Spock's `AutoAttach` annotation guarantees that the mock will be correctly attached to the specification.

#### Grails Plugins and the Other Missing Parts

Even this step looks pretty simple, it is usually one of the most difficult tasks. of the migration process. Your services usually use some Grails plugins and you need to find their Micronaut counterparts. You can find inspiration in the Micronaut Documentation, Agorapulse OSS Hub, or Awesome Micronaut catalog:

[**Docs - Micronaut Framework**  
_Access Micronaut framework documentation here._micronaut.io](https://micronaut.io/docs/ "https://micronaut.io/docs/")[](https://micronaut.io/docs/)

[**Agorapulse OSS Hub**  
_This page is a catalogue of all currently supported open-source libraries provided by Agorapulse. The major categories…_agorapulse.github.io](https://agorapulse.github.io/agorapulse-oss/ "https://agorapulse.github.io/agorapulse-oss/")[](https://agorapulse.github.io/agorapulse-oss/)

[**GitHub - JonasHavers/awesome-micronaut: A curated list of resources for the Micronaut JVM framework**  
_A hand-picked and curated list of resources for the Micronaut framework. Contributing Pull requests are highly…_github.com](https://github.com/JonasHavers/awesome-micronaut "https://github.com/JonasHavers/awesome-micronaut")[](https://github.com/JonasHavers/awesome-micronaut)

_In the next step, we will migrate the controllers themselves._

#### Table of Contents

1.  [Multiproject](https://medium.com/p/ffeaab056e28)
2.  [Configuration](https://medium.com/p/6aaab659112a)
3.  [Static Compilation](https://medium.com/p/a5a01bad2a06)
4.  [Datasets](https://medium.com/p/440c8b50fb56)
5.  [Marshalling](https://medium.com/p/7b69d9a132bc)
6.  [Domain Classes](https://medium.com/p/ad2d2782059f)
7.  Services
8.  [Controllers](https://medium.com/p/724e51ec3925/)
9.  [Micronaut Application](https://medium.com/p/c0d3956afe47)
10.  [Micronaut Data](https://medium.com/p/759c6c36bc7)

#### Sources & Discussion

[**GitHub — agorapulse/goodbye-grails-hello-micronaut: Goodbye Grails, Hello Micronaut**  
_This repository contains sources for the Grails to Micronaut guide. The repository shows the state of the application…_github.com](https://github.com/agorapulse/goodbye-grails-hello-micronaut "https://github.com/agorapulse/goodbye-grails-hello-micronaut")[](https://github.com/agorapulse/goodbye-grails-hello-micronaut)

By [Vladimír Oraný](https://medium.com/@musketyr) on [August 3, 2021](https://medium.com/p/f7d1ba4025f2).

[Canonical link](https://medium.com/@musketyr/goodbye-grails-hello-micronaut-7-services-f7d1ba4025f2)

Exported from [Medium](https://medium.com) on February 15, 2026.