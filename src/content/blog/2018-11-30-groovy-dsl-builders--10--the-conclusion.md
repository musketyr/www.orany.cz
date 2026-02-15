---
title: "Groovy DSL Builders #10: The Conclusion"
date: 2018-11-30
slug: groovy-dsl-builders--10--the-conclusion
source: medium
mediumId: "9d2b961dbc55"
---In the previous post The Navigation: Using the annotations for named parameters we have declared some methods accepting named parameters…

* * *

### Groovy DSL Builders #10: The Conclusion

In the previous post [The Navigation: _Using the annotations for named parameters_](https://medium.com/p/d065f0253e98) we have declared some methods accepting named parameters in our DSL. This final part provides a checklist for anyone who is going to write Groovy builder from a scratch as well as for developers who want to revisit existing ones.

![](https://cdn-images-1.medium.com/max/800/0*48-zVWszvxB502Mn.png)

YUML.me Diagram’s Diagram

* * *

Let's summarise what you should learn from this series into two checklists depending if you are creating new builder DSL or revisiting existing one:

### Checklist for creating new builder DSL

1.  As long as there is just a tiny option that Java developers would benefit from your builder DSL try to write your code in Java with Groovy-specific code inside extension classes. The extension classes can still be written in Java.
2.  Separate data and definition classes — at least use different interfaces for each situation.
3.  Use `Consumer` instead of `Closure` and then in the Groovy extension class declare shadow method accepting `Closure`. Alternatively, you can use `Function` to emphasise the expected content of the lambda code. Use `ConsumerWithDelegate` and `FunctionWithDelegate` from [Groovy Closure Support project](https://github.com/jasanspace/groovy-closure-support) to properly handle closures' owner.
4.  Any `Closure` parameter should be annotated with `DelegatesTo` and `ClosureParams`. Do not forget to set `strategy` of `DelegatesTo` annotation to `DELEGATE_FIRST`.
5.  Consider what is the best return type of the `Closure` parameters. Try to declare a common interface for the result of every possible statement expected inside the closure's body.
6.  Provide an extension point for your DSL
7.  Use named arguments only when there is no other option. Always annotate named arguments map with `NamedParams`. Methods with named arguments should only be defined in Groovy extension classes.

### Checklist for existing Groovy builder DSL

1.  Consider providing pure Java variant of your DSL
2.  Separate data and definition classes — at least use different interfaces for each situation.
3.  Ensure every `Closure` parameter is annotated with `DelegatesTo` and `ClosureParams`. Do not forget to set `strategy` of `DelegatesTo` annotation to `DELEGATE_FIRST`.
4.  Ensure top-level owner is propagated into any nested closures. You can use `GroovyClosure.cloneWithTopLevelOwner` method from [Groovy Closure Support project](https://github.com/jasanspace/groovy-closure-support) if you decide not to migrate to `Consumer` or `Function`.
5.  Consider what is the best return type of the `Closure` parameters. Try to declare a common interface for the result of every possible statement expected inside the closure's body.
6.  Provide an extension point for your DSL
7.  Use named arguments only when there is no other option. Always annotate named arguments map with `NamedParams`.

* * *

One general advice for both situations which didn't fit elsewhere:

**_Try to avoid method names which have a special meaning in Groovy. The most toxic in the terms of builder DSL is using the method_** `**_get_**` **_which is basically a shortcut to_** `**_propertyMissing_**` **_fallback. Especially if you haven't resolved the problem with_** `**_owner_**` **_this may result into cryptic exceptions._**

* * *

The whole YUML DSL code is available on GitHub:

git clone [https://github.com/musketyr/yuml-dsl-builder.git](https://github.com/musketyr/yuml-dsl-builder.git)

* * *

### Contents

1.  [The Concept: _The core concept of builders_](https://medium.com/p/2d5a97fa0a51)
2.  [The Essence: _The closures’ basics_](https://medium.com/p/fda1f2ebe657)
3.  [The Aid: _Using the annotations for static compilation_](https://medium.com/p/df2e9a02557a)
4.  [The Disguise: _Hiding the implementation of the builder API_](https://medium.com/p/1e2edc2311f8)
5.  [The Desiccation: _Keeping the code DRY_](https://medium.com/p/afb47ebbf89d)
6.  [The Expectations: _The importance of handling closures’ owner properly_](https://medium.com/p/83ced4b8f2b)
7.  [The Extension: _Designing your builder DSL for extendability_](https://medium.com/p/d612fd261471)
8.  [The Resignation: _Rewriting the Groovy DSL builder into Java_](https://medium.com/p/99bd118538b4)
9.  [The Navigation: _Using the annotations for named parameters_](https://medium.com/p/d065f0253e98)
10.  [**The Conclusion: _The checklist for Groovy DSL builders’ authors_**](https://medium.com/p/9d2b961dbc55)

By [Vladimír Oraný](https://medium.com/@musketyr) on [November 30, 2018](https://medium.com/p/9d2b961dbc55).

[Canonical link](https://medium.com/@musketyr/groovy-dsl-builders-10-the-conclusion-9d2b961dbc55)

Exported from [Medium](https://medium.com) on February 15, 2026.