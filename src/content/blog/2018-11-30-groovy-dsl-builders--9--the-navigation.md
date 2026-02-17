---
title: "Groovy DSL Builders #9: The Navigation"
date: 2018-11-30T16:00:00Z
slug: groovy-dsl-builders--9--the-navigation
source: medium
mediumId: "d065f0253e98"
---In the previous post The Resignation: Rewriting the Groovy DSL builder into Java we migrated our Groovy DSL builder into Java. In this…

* * *

### Groovy DSL Builders #9: The Navigation

In the previous post [The Resignation: _Rewriting the Groovy DSL builder into Java_](https://medium.com/p/99bd118538b4) we migrated our Groovy DSL builder into Java. In this part we are going to declare some methods accepting named parameters in our DSL.

![](https://cdn-images-1.medium.com/max/800/0*48-zVWszvxB502Mn.png)

YUML.me Diagram’s Diagram

* * *

If you have read [Groovy Developer Manifesto](https://medium.com/agorapulse-stories/groovy-developer-manifest-bb9bdafa214f) you know I consider overusing maps in Groovy as one of the biggest developers' sins. On the other hand, I can see how appealing can named arguments be. Groovy 2.5 makes using `Map` arguments bit less painful with a set of `Named*` annotations.

First of all, let's summarise the situations in which it is meaningful to use `Map` to collect named arguments in your DSL.

1.  There are some fields marked `final` inside your definition objects and therefore the objects have no zero-args constructor. In that case, it may be useful to create a method with a signature `method(Map requiredArgs, Closure optionalProperties)`.
2.  There is a method with ambiguous and/or optional arguments

There is no relevant method which would benefit for the first use case in our YUML DSL but methods `source` and `destination` inside the`relationship` definition easily fits the second one. It might be more readable if we can specify `cardinality` or `title` as named parameters:

```groovy
aggregation('Customer', 'Order') {
    source cardinality: '1'    destination cardinality: '0..\*', title: 'orders'
}
```


Now let's take a look at how the new methods are implemented:

```groovy
public static RelationshipDefinition source(
```

    RelationshipDefinition self,  
```groovy
    @NamedParams({
        @NamedParam(value = \1, type = String.class),
        @NamedParam(value = \1, type = String.class)
    })
```

    Map<String, String> cardinalityAndTitle  
```groovy
) {
    return self.source(
        cardinalityAndTitle.get(\1),
        cardinalityAndTitle.get(\1)
    );
}

public static RelationshipDefinition destination(
```

    RelationshipDefinition self,  
```groovy
    @NamedParams({
        @NamedParam(value = \1, type = String.class),
        @NamedParam(value = \1, type = String.class)
    })
```

        Map<String, String> cardinalityAndTitle  
```groovy
) {
    return self.destination(
        cardinalityAndTitle.get(\1),
        cardinalityAndTitle.get(\1)
    );
}
```


New methods `source` and `destination` were added to the extension class. Although there is more annotations related to named arguments only `NamedParams` and `NamedParam` are the important ones. Annotations such as `NamedDelegate` or `NamedVariant` are just Groovy AST transformation helping to build the list of the named arguments. Using `NamedParams` will bring you additional static compilation checks as you can mark the parameter as required and since Groovy 2.5.5 you should be also able to also mark `NamedParams` not to accept any other keys then the declared ones. But still, for example at the time of writing IntelliJ IDEA doesn't seem to benefit from this feature so it won't give you the desired hints so using named arguments should still be considered as a tool of the last resort.

* * *

The code is available on GitHub under `09-named-parameters` tag:

git clone https://github.com/musketyr/yuml-dsl-builder.git  
cd yuml-dsl-builder  
git checkout 09-named-parameters

* * *

The last part of this series [The Conclusion: _The checklist for Groovy DSL builders’ authors_](https://medium.com/p/9d2b961dbc55) provides the check list for creators of the new Groovy builder DSL as well as for revisiting exiting ones.

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
```groovy
9.  [The Navigation: _Using the annotations for named parameters_](https://medium.com/p/d065f0253e98)
```

10.  [The Conclusion: _The checklist for Groovy DSL builders’ authors_](https://medium.com/p/9d2b961dbc55)



