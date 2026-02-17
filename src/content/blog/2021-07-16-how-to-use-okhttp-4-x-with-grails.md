---
title: "How to Use OkHttp 4.x with Grails"
date: 2021-07-16
slug: how-to-use-okhttp-4-x-with-grails
source: medium
mediumId: "f6387fe4460e"
---OkHttp 4.x is a bit controversial evolution of the popular Java HTTP client. The version 4.x has been rewritten to Kotlin and it now…

* * *

### How to Use OkHttp 4.x with Grails

![](https://cdn-images-1.medium.com/max/800/1*WIBKkPXSDc2AdmXvmPB6Rg.png)

[OkHttp](https://square.github.io/okhttp/) 4.x is a bit controversial evolution of the popular Java HTTP client. The version 4.x has been rewritten to Kotlin and it now requires [Kotlin Stdlib](https://kotlinlang.org/api/latest/jvm/stdlib/) as a dependency.

If any library such as [Segment Analytics Java Client](https://github.com/segmentio/analytics-java) or [Recurly Java Client](https://github.com/recurly/recurly-client-java) depends on OkHttp 4.x you may get an exception similar to the following one when running Grails or probably any other older Spring Boot application:

\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
APPLICATION FAILED TO START  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

Description:

An attempt was made to call a method that does not exist. The attempt was made from the following location:

okio.Segment.writeTo(Segment.kt:169)

The following method did not exist:

kotlin.collections.ArraysKt.copyInto(\[B\[BIII)\[B

The issue is caused by the old version of the Kotlin libraries on the classpath. [Grails](https://grails.org) 4.x framework is still using [Spring Dependency Management Plugin](https://docs.spring.io/dependency-management-plugin/docs/current/reference/html/) under the hood with a couple of [Maven BOMs](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html#bill-of-materials-bom-poms) secretly added under the hood. One of them is an older version of [Spring Boot Dependencies BOM](https://search.maven.org/artifact/org.springframework.boot/spring-boot-dependencies/2.1.18.RELEASE/pom) which specifies the version of Kotlin libraries to `1.2.71` whereas OkHttp depends on `1.4.10` at the time of writing causing the binary incompatibility in the runtime.

Luckily, there is an easy solution to fix this. The Kotlin version is specified as `kotlin.version` property in the BOM and Spring Dependency Management Plugin supports overriding the properties in `gradle.properties` file so the only required change is to add the following line at the end of the file.

kotlin.version = 1.4.10

After this change the application should start as expected.



