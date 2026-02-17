---
title: "Groovy DSL Builders #8: The Resignation"
date: 2018-11-30T15:00:00Z
slug: groovy-dsl-builders--8--the-resignation
source: medium
mediumId: "99bd118538b4"
---In the previous post The Extension: Designing your builder DSL for extendability we provided an extension point to our builder DSL. In…

* * *

### Groovy DSL Builders #8: The Resignation

In the previous post [The Extension: _Designing your builder DSL for extendability_](https://medium.com/p/d612fd261471) we provided an extension point to our builder DSL. In this part, we are going to rewrite the API of the DSL to Java to reach a broader audience.

![](https://cdn-images-1.medium.com/max/800/0*48-zVWszvxB502Mn.png)

YUML.me Diagram’s Diagram

* * *

Groovy is a good citizen in a JVM country but still, the Java developer community is many times bigger than the Groovy one. Luckily it is quite easy to adapt the Groovy DSL builder to Java builder although Java code will be always be more verbose.

Java interface `Consumer` can act as a solid replacement of Groovy's `Closure`. Following example shows the DSL rewritten to Java using `Consumer` lambdas:

Diagram._create_(d -> {  
    d.note(**"You can stick notes on diagrams too!"**, **"skyblue"**);

    d.aggregation(**"Customer"**, **"Order"**, r -> {  
        r.source(**"1"**);  
        r.destination(**"0..\*"**, **"orders"**);  
    });

    d.composition(**"Order"**, **"LineItem"**, r -> {  
        r.source(**"\*"**);  
        r.destination(**"\*"**);  
    });

    d.association(**"Order"**, **"DeliveryMethod"**, r -> {  
        r.destination(**"1"**);  
    });

    d.association(**"Order"**, **"Product"**, r -> {  
        r.source(**"\*"**);  
        r.destination(**"\*"**);  
    });

    d.association(**"Category"**, **"Product"**, r -> {  
        r.bidirectional(**true**);  
    });

    d.type(**"National"**).inherits(**_from_**).type(**"DeliveryMethod"**);  
    d.type(**"International"**).inherits(**_from_**).type(**"DeliveryMethod"**);  
})

Builder interfaces are now having methods similar to the following one:

RelationshipDefinition relationship(  
    String source,  
    RelationshipType relationshipType,  
    String destination,  
    Consumer<RelationshipDefinition> additionalProperties  
);

We still want to support the old Groovy DSL we had before. Although we can simply use closures in place of `Consumer` or any other single abstract method type (SAM type) but we would lose the ability to specify the delegate.

I believe it is a good practise not to mix Java and Groovy parts of the DSL. As there are still lot of Java developers terrified by adding Groovy to the classpath we should ideally rewrite all parts to Java. Then we can provide the Groovy DSL as extension module in separate library. To keep the YUML example simple the extension module is still part of the same project.

We have already used extension modules for adding more functionality to the builder. Now we can use it to completely extract the methods using closures. Each of the methods using `Consumer` will have its counterpart in an extension class:

**public static** RelationshipDefinition relationship(  
    DiagramDefinition self,  
    String source,  
    RelationshipType relationshipType,  
    String destination,  
    @DelegatesTo(  
        value = RelationshipDefinition.**class**,  
        strategy = Closure.**_DELEGATE\_FIRST_**    )  
    @ClosureParams(  
        value = SimpleType.**class**,  
        options = **"cz.orany.yuml.model.dsl.RelationshipDefinition"**    )  
    Closure<? **extends** DiagramContentDefinition> additionalProperties  
) {  
    **return** self.relationship(  
        source,  
        relationshipType,  
        destination,  
        ConsumerWithDelegate._create_(additionalProperties)  
    );  
}

`ConsumerWithDelegate` class comes from [Groovy Closure Support library](https://github.com/jasanspace/groovy-closure-support) which I had developed to ease the development of the builder DSLs which are primarily written in Java but they provide the best developer experience in Groovy. `ConsumerWithDelegate` and its function counterpart `FunctionWithDelegate` also handles gracefully setting the proper `owner` of the closure as discussed previously in [The Expectations: _The importance of handling closures’ owner properly_](https://medium.com/p/83ced4b8f2b).

You also need to change the way how the keywords are introduced into the DSL. Previously the keywords have been provided as static getters on the interfaces but this won't be very practical from the Java code. The easiest possible solution is to extract all the keywords into a single holder class which we can import as static import.

**public class** DiagramKeywords {  
  
    **public static final** From **_from_** \= From.**_FROM_**;  
    **public static final** Integer **_zero_** \= 0;  
    **public static final** Integer **_one_** \= 1;  
    **public static final** String **_many_** \= **"\*"**;  
  
}

* * *

The code is available on GitHub under `08-java-dsl` tag:

git clone [https://github.com/musketyr/yuml-dsl-builder.git](https://github.com/musketyr/yuml-dsl-builder.git)  
cd yuml-dsl-builder  
git checkout 08-java-dsl

* * *

In the next part [The Navigation: _Using the annotations for named parameters_](https://medium.com/p/d065f0253e98) we take a look at the new feature in Groovy 2.5 which is the support for type checking of the named method parameters.

* * *

### Contents

1.  [The Concept: _The core concept of builders_](https://medium.com/p/2d5a97fa0a51)
2.  [The Essence: _The closures’ basics_](https://medium.com/p/fda1f2ebe657)
3.  [The Aid: _Using the annotations for static compilation_](https://medium.com/p/df2e9a02557a)
4.  [The Disguise: _Hiding the implementation of the builder API_](https://medium.com/p/1e2edc2311f8)
5.  [The Desiccation: _Keeping the code DRY_](https://medium.com/p/afb47ebbf89d)
6.  [The Expectations: _The importance of handling closures’ owner properly_](https://medium.com/p/83ced4b8f2b)
7.  [The Extension: _Designing your builder DSL for extendability_](https://medium.com/p/d612fd261471)
8.  [**The Resignation: _Rewriting the Groovy DSL builder into Java_**](https://medium.com/p/99bd118538b4)
9.  [The Navigation: _Using the annotations for named parameters_](https://medium.com/p/d065f0253e98)
10.  [The Conclusion: _The checklist for Groovy DSL builders’ authors_](https://medium.com/p/9d2b961dbc55)



