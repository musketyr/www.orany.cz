---
title: "Groovy Developer Manifesto"
date: 2018-07-27
slug: groovy-developer-manifesto
source: medium
mediumId: "bb9bdafa214f"
---Groovy is not an excuse to write sh\*\*\*ty code.

* * *

### Groovy Developer Manifesto

> Groovy is not an excuse to write sh\*\*\*ty code.

![](https://cdn-images-1.medium.com/max/800/0*vUV9AdRnYkOIO_oh.jpg)

As a Groovy Developer I hereby promise:

1.  I will write code in Java unless writing in Groovy would add some value; removing semicolon does not add value
2.  I will follow Effective Java rules even when I am writing Groovy code
3.  I will use `@CompileStatic` annotation by default unless I really need dynamic language features
4.  I will never ever use `def` keyword
5.  I will never use `Map` as an excuse not to create meaningful class
6.  I will use `@NamedParam`, `@NamedDelegate` and `@NamedVariant` instead of raw `Map` method parameters
7.  I will never use raw `Closure` without a type parameter
8.  I will use `@ClosureParams` for every `Closure` method parameter
9.  I will use `@DelegatesTo` for every `Closure` method parameter with altered delegate
10.  CodeNarc is my best friend forever

* * *

Do you have your own statement to add? Please, leave it in the comments. I may update the list in the future.

* * *

You can sign this manifest using the hand icon bellow.

* * *
By [Vladimír Oraný](https://medium.com/@musketyr) on [July 27, 2018](https://medium.com/p/bb9bdafa214f).

[Canonical link](https://medium.com/@musketyr/groovy-developer-manifest-bb9bdafa214f)

Exported from [Medium](https://medium.com) on February 15, 2026.