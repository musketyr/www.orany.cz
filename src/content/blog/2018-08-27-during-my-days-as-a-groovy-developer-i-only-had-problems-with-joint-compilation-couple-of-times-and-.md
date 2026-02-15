---
title: "During my days as a Groovy developer I only had problems with joint compilation couple of times and…"
date: 2018-08-27
slug: during-my-days-as-a-groovy-developer-i-only-had-problems-with-joint-compilation-couple-of-times-and-
source: medium
mediumId: "4e5c4be5e1de"
---On the other hand I can see where you are heading. I usually use just a one-way code dependencies — interfaces and enums and other API/core…

* * *

During my days as a Groovy developer I only had problems with joint compilation couple of times and I always found out that it was due putting Java source files in a wrong directory. Java sources needs to live alongside Groovy files in `src/main/groovy` not `src/main/java` or similar.

On the other hand I can see where you are heading. I usually use just a one-way code dependencies — interfaces and enums and other API/core code written in Java and an implementations and other logic in Groovy classes.

By [Vladimír Oraný](https://medium.com/@musketyr) on [August 27, 2018](https://medium.com/p/4e5c4be5e1de).

[Canonical link](https://medium.com/@musketyr/during-my-days-as-a-groovy-developer-i-only-had-problems-with-joint-compilation-couple-of-times-and-4e5c4be5e1de)

Exported from [Medium](https://medium.com) on February 15, 2026.