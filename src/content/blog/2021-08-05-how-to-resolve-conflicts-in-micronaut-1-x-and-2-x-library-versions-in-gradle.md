---
title: "How to Resolve Conflicts in Micronaut 1.x and 2.x Library Versions in Gradle"
date: 2021-08-05
slug: how-to-resolve-conflicts-in-micronaut-1-x-and-2-x-library-versions-in-gradle
source: medium
mediumId: "b0b5992ce4ce"
---Micronaut 2.x version has changed the Maven coordinates for many libraries that crate the Micronaut ecosystem. The complete list can be…

* * *

### How to Resolve Conflicts in Micronaut 1.x and 2.x Library Versions in Gradle

![](https://cdn-images-1.medium.com/max/800/1*bF9mY4L6LcCCk-EjeybYVg.png)

Micronaut 2.x version has changed the Maven coordinates for many libraries that crate the Micronaut ecosystem. The complete list can be found [here](https://docs.micronaut.io/2.0.0/guide/index.html#_new_group_ids):

[**Micronaut**  
[docs.micronaut.io](https://docs.micronaut.io/2.0.0/guide/index.html#_new_group_ids)

Although it makes no difference if the Micronaut version for all your application is aligned, it causes issues if you need to support both versions of the framework. If you are using Gradle you can benefit from [the advanced resolution rules](https://docs.gradle.org/current/userguide/resolution_rules.html) available:

[**Customizing resolution of a dependency directly**  
[docs.gradle.org](https://docs.gradle.org/current/userguide/resolution_rules.html)

Let's pretend that we are using library which transitively depends on Micronaut Views Handlebar and was created with Micronaut 1.x. In the project **using Micronaut 2.x or later**, you have to declare the following dependency mapping:

Because the resolution is only triggered when there is a conflict, you need to add the dependency to **the new coordinates** into the project's build file directly:

Now all the dependencies using the old coordinates are replaced with the new ones.



