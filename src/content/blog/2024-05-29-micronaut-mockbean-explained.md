---
title: "Micronaut MockBean Explained"
date: 2024-05-29
slug: micronaut-mockbean-explained
source: medium
mediumId: "ee0ad109cfb5"
---The@MockBean annotation in the Micronaut framework is used to create replacements for beans in tests. These tests must be annotated with…

* * *

### Micronaut MockBean Explained

![](https://cdn-images-1.medium.com/max/800/1*wh2KxcpWWyjU3BLE6IP2ig.png)

The`@MockBean` annotation in the Micronaut framework is used to create replacements for beans in tests. These tests must be annotated with `@MicronautTest`. There is often confusion about the roles of the method or field annotated with `@MockBean`.

![](https://cdn-images-1.medium.com/max/800/1*pUJ7Sk6zODcGiMc98G5JWg.png)

Each method or field specifies both the bean to be replaced and the new bean to be created:

*   The bean to be replaced is specified as the value of `@MockBean` and must be the implementation type of the bean, typically it is the one annotated with `@Singleton`.
*   The new bean is specified by the return type of the method or the type of the field.

Creating or replacing a named bean can be more complex:

![](https://cdn-images-1.medium.com/max/800/1*Qf7ePgQC4sSqldTqH8nQUg.png)

*   The `named` value inside the `@MockBean` annotation is used to replace the existing named bean.
*   The `@Named` annotation is used to name the newly created bean

The most complicated scenario is replacing a bean with a specified qualifier, such as `@Primary`, which is particularly challenging:

![](https://cdn-images-1.medium.com/max/800/1*hU7EGQ0NWYxedQzi5qkmog.png)

*   Use the `@Replace` annotation directly, specifying the qualifier and/or a factory bean.
*   Any qualifier added to the method will once again apply to the new bean.

By [Vladimír Oraný](https://medium.com/@musketyr) on [May 29, 2024](https://medium.com/p/ee0ad109cfb5).

[Canonical link](https://medium.com/@musketyr/micronaut-mockbean-explained-ee0ad109cfb5)

Exported from [Medium](https://medium.com) on February 15, 2026.