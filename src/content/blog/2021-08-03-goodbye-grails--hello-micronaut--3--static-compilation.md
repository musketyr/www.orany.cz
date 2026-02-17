---
title: "Goodbye Grails, Hello Micronaut #3: Static Compilation"
date: 2021-08-03T11:00:00Z
slug: goodbye-grails--hello-micronaut--3--static-compilation
source: medium
mediumId: "a5a01bad2a06"
---This is the third post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your application…

* * *

### Goodbye Grails, Hello Micronaut #3: Static Compilation

_This is the third post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your application to be based on Grails 4.x or later._

![](https://cdn-images-1.medium.com/max/800/1*IlyVfS6V05ZxtwIYpI804w.png)

Switching the frameworks is never easy, even for the ones which are very close to each other. As an extra layer of security to ensure the migration won't get wrong, let's adda static compilation of the application globally. This will also help us in the next steps to purify the domain model usage. The whole process has been already described in the following post so, please, take the detour and read that guide first.

```groovy
[How to Compile Groovy Statically by Default
```

[medium.com](https://medium.com/agorapulse-stories/how-to-compile-groovy-statically-by-default-980816119534)

As we would like to apply the static compilation for every application and library in the project, let's update our `settings.gradle` projects section as follows:

settings.gradle

These extra lines will ensure that every subproject in `apps` and `libs` directory will have `groovy` and `java-library` plugin applied.

Then let's configure the Enterprise Groovy dependency which will help us to apply the static compilation globally. Add the following lines into your `build.gradle` file:

build,.gradle

Create the configuration file mentioned above in `config/groovy/conventions.groovy` :

Now the easy part is over and one of the most difficult part is ahead.

If you have configured everything properly then you may be facing compilation issues when you run `./gradlew classes` command from the terminal. The drawback of using Enterprise Groovy is that the static compilation is not clear to the IDE so I would recommend adding `@CompileStatic` or `@GrailsCompileStatic` annotations to the classes which fail to compile to see the errors directly inside your IDE. You need to annotate the parts which cannot be compiled statically with `@CompileDynamic` but, please, keep the scope of dynamic compilation at the minimal level. As a reward, you will get an application that is less prone to errors and you can feel safer about all the refactoring.

_In the next step, we will prepare_ [_datasets_](https://medium.com/p/440c8b50fb56) _for your domain classes as the foundation for the tests we will write later to ensure the smooth migration._

#### Table of Contents

1.  [Multiproject](https://medium.com/p/ffeaab056e28)
2.  [Configuration](https://medium.com/p/6aaab659112a)
3.  Static Compilation
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



