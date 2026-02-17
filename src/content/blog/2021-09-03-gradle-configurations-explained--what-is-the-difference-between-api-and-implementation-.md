---
title: "Gradle Configurations Explained: What is the difference between API and Implementation?"
date: 2021-09-03
slug: gradle-configurations-explained--what-is-the-difference-between-api-and-implementation-
source: medium
mediumId: "4b9608dd5e35"
---Introduction

* * *

### Gradle Configurations Explained: What is the difference between API and Implementation?

![](https://cdn-images-1.medium.com/max/800/1*3XXgSsTSLeISibFIncchVA.png)

Available configurations when java-library plugin is applied to gradle. Source: [Gradle Java Library Plugin](https://docs.gradle.org/current/userguide/java_library_plugin.html)

### Introduction

Gradle dependencies are grouped into sets called **configurations**. Different configurations are used for building classpath for the major two tasks — **compile classpath** is used for **compilation** and **runtime classpath** is used for **running** the application. The usage of the new configurations — **api**, **implementation,** and **runtimeOnly** is still a bit of a mystery for many developers, so let’s explain it on a very trivial example.

### TL;DR

In case of exposing dependencies to the consumers, you need to focus on the pink boxes. Configurations included in **_apiElements_ are exposed to the consumers for their compile classpath**. Analogously, configurations included in **_runtimeElements_ are exposed to the consumers for their runtime classpath**. Therefore

*   **api** configuration is **used for compile and runtime classpaths** and it is also **exposed to the consumers for their compile and runtime classpaths**
*   **implementation** configuration is **used for compile and runtime classpath** but it is **only exposed to the consumers for their runtime classpath**
*   **runtimeOnly** configuration is only **used for the runtime classpath** and it is also **exposed to the consumers for their runtime classpath**
*   **compileOnly** configuration is only **used for the compile classpath** and it is not exposed to any consumer
*   **compileOnlyApi** configuration is only **used for the compile classpath** and it is also **exposed to the consumers for their compile classpath when Gradle metadata is consumed**

### Christmas Dinner (Application Project)

![](https://cdn-images-1.medium.com/max/800/1*bTmJcMC-SPKrL3DvRyu6Pw.jpeg)

There are some similarities between cooking and programming so let's make a traditional Czech Christmas dinner — potato salad with something deep-fried and breaded, originally a fish. If it were a Java project then it could be described as a following set of dependencies.

plugins **{**    id **'application'  
}  
  
**dependencies **{**    api project(**':dish'**)  
    api project(**':cutlery'**)  
    api project(**':potato-salad'**)  
    api project(**':breaded-dish'**)  
  
    implementation project(**':potato-salad-with-ham'**)  
    implementation project(**':breaded-carp'**)  
  
    runtimeOnly project(**':plate'**)  
**}  
  
**mainClassName = **'christmas\_dinner.ChristmasDinner'**

The traditional Christmas **dish** consists of a **potato salad** and some **breaded dishes**. These two dishes are **generic** ones and we will have to search for specific recipes. Therefore these can be analogous to the project's **API** and therefore they are declared as **api** configuration.

The **potato salad with ham** and **breaded carp** are these particular recipes being used for the dinner this year but can be easily altered with, for example, light wiener potato salad and wienerschnitzel. We won't announce these to your guests. Similar to this, we use **implementation** configuration in Gradle **to hide the internals of our project**. Typically, if some classes from a library are only used within the method body then we can use **implementation** configuration. They are required to compile the project but they are not exposed for the compilation to the depending projects.

The last group contains resources that **are only required for serving** the dish. You won't drop the dishes directly on the table so you need the **plate**. Analogously, there are **the dependencies that are only used in runtime** when serving the application to either run it or to enhance it. Typical examples could be the server implementation and the management library.

Here is a pseudocode for serving the dish:

![](https://cdn-images-1.medium.com/max/800/1*97jrSkzTtAc6Rx6gewh1ZQ.png)

In the following example, you can see that you cannot use any of dependencies on the **runtime** classpath in your code:

![](https://cdn-images-1.medium.com/max/800/1*nQrR01r_HiJ0a3keS30d8Q.png)

`Plate` cannot be reached because it has been declared as **runtimeOnly** dependency as well as`Onion` which is part of the **implementation** configuration of **the potato salad with ham**. Pictures like this feel counter-intuitive and may scare you as it looks like dependencies in the **implementation** configuration has not been taken into an account and it may look like `Plate` and `Onion` will be missing from the final distribution but as we see in section **Shopping List (Runtime Classpath),** all the necessary dependencies will be present in the runtime classpath.

You can also test it by executing the application:

```
./gradlew :christmas-dinner:run

# result:

Serving:
[plate with potato salad with ham, breaded carp]
Cutlery:
[fork, knife]
```

You can see all the runtime dependencies such as **plate**, **fork** and **knife** are present and found while running the application.

### Potato Salad with Ham (Library Project)

In the end-projects such as the application that are not used as a dependency to any other project, the way how configurations work is pretty clear. What is not so clear is how the different types of dependencies behave transitively. Let's dig deeper into one of the dishes — **the potato salad with ham**:

dependencies **{**    api project(**':dish'**)  
    api project(**':potato-salad'**)  
    api project(**':ham'**)  
  
    implementation project(**':boiled-potatoes'**)  
    implementation project(**':mayo'**)  
    implementation project(**':onion'**)  
    implementation project(**':pickles'**)  
    implementation project(**':peppers'**)  
    implementation project(**':bowl'**)  
    implementation project(**':cutting-board'**)  
    implementation project(**':vegetable-knife'**)  
    implementation project(**':potato-slicer'**)  
  
    runtimeOnly project(**':fork'**)  
**}**

We can adopt a different point of view here. The groups are now bit different

*   first group contains the ingredients that should **be exposed to the consumers** such as **the ham** and **potato salad**
*   second group contains **everything else required to prepare** the dish
*   the last group contains the kitchenware required **to serve** the dish

Similar to that, we add to **api** configuration **the dependencies that need to be visible to the consumer for the compilation**. Anything else required for compilation is added into **implementation** configuration. No worries as these dependencies will be also available in the runtime. At last, **runtimeOnly** configuration only contains dependencies required in runtime.

If we return to our example we can see that we can actually use `Ham` directly into our final recipe as we declared it as **api** dependency but we cannot use `Fork` which is **runtimeOnly** dependnecy.

![](https://cdn-images-1.medium.com/max/800/1*INf9bO-amXA48NfWFTvwtA.png)

If we remove the offending `Fork` and run the application again, we can see **ham** is now also on the plate.

```
Serving:
[plate with potato salad with ham, breaded carp, ham]
Cutlery:
[fork, knife]
```

### Shopping List (Runtime Classpath)

Let's imagine that the dinner should be served tonight in a brand new apartment. You want to be sure that you have everything ready for cooking as well as for serving the dish. You're planning to visit the department store nearby and you want to be sure that don't forget everything. This is how would the shopping list look like.

![](https://cdn-images-1.medium.com/max/800/1*5sEJ4UdU4zPag6LB4lBwlw.png)

You can see the shopping list contains everything regardless how deep we had declared the ingredients or kitchenwere.

You can see that the image refers to the **runtime classpath** of the application. If you use the **application** plugin that all the JARs listed above will be exported into the `lib` folder of the generated bundle. Regardless using **api**, **implementation** and **runtimeOnly** configurations, all the required runtime dependencies will be included.

If we compare the runtime classpath to the compile classpath then we can see that **only dependencies declared as _api_ are available in the consumer projects.**

![](https://cdn-images-1.medium.com/max/800/1*dKTptA34qhcANRoqIBvu8g.png)

You can see that none of projects declared as **implementation** or **runtimeOnly** are present on the compile classpath of the depending project.

### Summary

If you are creating Java library which then you should think twice which of your dependencies are required for the compilation of the depending projects. If any type is exposed publicly into the signature of your classes and interfaces then you need to declare it as **api**. The dependencies used internally within method bodes can be declared as **implementation**. The dependencies only required in runtime can be declared as **runtime**.

There is a Gradle Lint project which can help you decide the right configuration to be used:

[**GitHub - nebula-plugins/gradle-lint-plugin: A pluggable and configurable linter tool for…**](https://github.com/nebula-plugins/gradle-lint-plugin)

You can dig deeper into the Christmas Dinner example here:

[**GitHub - musketyr/christmas-dinner: Gradle Configurations Showcase**](https://github.com/musketyr/christmas-dinner)

Or inspect just the build scan:

[**Build scan | Gradle Cloud Services**](https://scans.gradle.com/s/q7ol2tszrw6uo)



