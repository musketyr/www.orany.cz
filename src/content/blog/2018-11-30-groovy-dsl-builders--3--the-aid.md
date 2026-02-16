---
title: "Groovy DSL Builders #3: The Aid"
date: 2018-11-30T10:00:00Z
slug: groovy-dsl-builders--3--the-aid
source: medium
mediumId: "df2e9a02557a"
---In the previous part The Essence: The closures’ basics we have shown how to use built-in Groovy methods to create a prototype of our…

* * *

### Groovy DSL Builders #3: The Aid

In the previous part [The Essence: _The closures’ basics_](https://medium.com/p/fda1f2ebe657) we have shown how to use built-in Groovy methods to create a prototype of our builder DSL. In this post, we are going to implement our own closures' handlers which provides support for static compilation.

![](https://cdn-images-1.medium.com/max/800/0*48-zVWszvxB502Mn.png)

YUML.me Diagram’s Diagram

* * *

Why should we actually bother about static compilation in Groovy? First, it runs faster and gives you another level of confidence but the main reason is that as a simple rule of thumb:

> If the code can be compiled statically the IDE will understand your code and it will give you all the expected hints.

Although [Cédric Champeau](https://medium.com/u/d724076a0431) already implemented static compilation into Groovy language years ago, a lot of developers are ignoring this feature so far.

When developing DSL builders in Groovy there are three key parts which can increase the developers' experience when our method accepts `Closure`:

*   Using [@DelegatesTo](http://docs.groovy-lang.org/latest/html/api/groovy/lang/DelegatesTo.html) annotation to determine the type of the **_delegate_** and the delegation **_strategy_**.
*   Using [@ClosureParams](http://docs.groovy-lang.org/latest/html/gapi/groovy/transform/stc/ClosureParams.html) annotation to determine the type of closure parameters (will be discussed in [The Desiccation: _Keeping the code DRY_](https://medium.com/p/afb47ebbf89d))
*   Using the type parameter of [Closure](http://docs.groovy-lang.org/latest/html/api/groovy/lang/Closure.html) argument (will be discussed in [The Desiccation: _Keeping the code DRY_](https://medium.com/p/afb47ebbf89d))

Let's take a look on another iteration of our YUML DSL:

Diagram._build_ {  
    note(**'You can stick notes on diagrams too!'**, **'skyblue'**)  
  
    aggregation(**'Customer'**, **'Order'**) {  
        source **'1'**        destination **'0..\*'**, **'orders'**    }  
  
    composition(**'Order'**, **'LineItem'**) {  
        source **'\*'**        destination **'\*'**    }  
  
    association(**'Order'**, **'DeliveryMethod'**) {  
        destination **'1'**    }  
  
    association(**'Order'**, **'Product'**) {  
        source **'\*'**        destination **'\*'**    }  
  
    association(**'Category'**, **'Product'**) {  
        bidirectional **true**    }  
  
    type **'National'** inherits _from_ type **'DeliveryMethod'**    type**'International'** inherits _from_ type **'DeliveryMethod'  
**}

The latest iteration of the DSL uses two new features

1.  Tree-like structure builder DSL using Groovy closures
2.  Fluent DSL using [command chain expressions](http://docs.groovy-lang.org/docs/latest/html/documentation/core-domain-specific-languages.html#_command_chains)

Methods `note` and `relationship` are now accepting closures as the last argument which allows us to place them out of the method call brackets. The closure arguments are annotated with`DelegatesTo` annotation to give hints for the static compiler. They still use `with`method internally:

Relationship relationship(  
    String source,  
    RelationshipType relationshipType,  
    String destination,  
    @DelegatesTo(  
        value = Relationship,   
        strategy = Closure.**_DELEGATE\_FIRST_**    )  
    Closure additionalProperties = Closure.**_IDENTITY  
_**) {  
    Relationship relationship = **new** Relationship(  
        type(source),   
        relationshipType,   
        type(destination)  
    )  
    relationship.with additionalProperties  
    **this**.**relationships**.add(relationship)  
    **return** relationship  
}

> The common mistake is to forget setting `strategy` to `Closure.DELEGATE_FIRST` as the default `strategy` of the `DelegatesTo` annotation is `Closure.OWNER_FIRST`.

Fluent part of the DSL uses some helper objects to keep the rhythm method-parameter-method-parameter -\*. For example `Type` now provides method `inherits` which returns`InheritanceBuilder`

InheritanceBuilder inherits(From from) {  
    **return new** InheritanceBuilder(**diagram**, **this**)  
}

The `InheritanceBuilder` class is pretty simple:

@CompileStatic  
**class** InheritanceBuilder {  
  
    **private final** Type **source  
    private final** Diagram **diagram**    InheritanceBuilder(Diagram diagram, Type destination) {  
        **this**.**source** \= destination  
        **this**.**diagram** \= diagram  
    }  
  
    Relationship type(String destination) {  
        **return diagram**.inheritance(**source**.name, destination)  
    }  
}

These helper classes always needs to keep some back reference to help to build the desired object.

The last pieces of the puzzle are methods in the `Diagram` class which return the keywords such as `from`:

**static** From getFrom() {  
    **return** From.**_FROM  
_**}

* * *

The code is available on GitHub under `02-closures` tag:

git clone https://github.com/musketyr/yuml-dsl-builder.git  
cd yuml-dsl-builder  
git checkout 02-closures

In the next part [The Disguise: _Hiding the implementation of the builder API_](https://medium.com/p/1e2edc2311f8) we are going to make the design of our builder DSL cleaner by separating the data and the definition part of the library.

* * *

### Contents

1.  [The Concept: _The core concept of builders_](https://medium.com/p/2d5a97fa0a51)
2.  [The Essence: _The closures’ basics_](https://medium.com/p/fda1f2ebe657)
3.  [**The Aid: _Using the annotations for static compilation_**](https://medium.com/p/df2e9a02557a)
4.  [The Disguise: _Hiding the implementation of the builder API_](https://medium.com/p/1e2edc2311f8)
5.  [The Desiccation: _Keeping the code DRY_](https://medium.com/p/afb47ebbf89d)
6.  [The Expectations: _The importance of handling closures’ owner properly_](https://medium.com/p/83ced4b8f2b)
7.  [The Extension: _Designing your builder DSL for extendability_](https://medium.com/p/d612fd261471)
8.  [The Resignation: _Rewriting the Groovy DSL builder into Java_](https://medium.com/p/99bd118538b4)
9.  [The Navigation: _Using the annotations for named parameters_](https://medium.com/p/d065f0253e98)
10.  [The Conclusion: _The checklist for Groovy DSL builders’ authors_](https://medium.com/p/9d2b961dbc55)

By [Vladimír Oraný](https://medium.com/@musketyr) on [November 30, 2018](https://medium.com/p/df2e9a02557a).

[Canonical link](https://medium.com/@musketyr/groovy-dsl-builders-3-the-aid-df2e9a02557a)

Exported from [Medium](https://medium.com) on February 15, 2026.