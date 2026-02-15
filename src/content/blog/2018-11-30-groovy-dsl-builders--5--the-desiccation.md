---
title: "Groovy DSL Builders #5: The Desiccation"
date: 2018-11-30
slug: groovy-dsl-builders--5--the-desiccation
source: medium
mediumId: "afb47ebbf89d"
---In the previous post The Disguise: Hiding the implementation of the builder API we have separated the three main concerns of our DSL…

* * *

### Groovy DSL Builders #5: The Desiccation

In the previous post [The Disguise: _Hiding the implementation of the builder API_](https://medium.com/p/1e2edc2311f8) we have separated the three main concerns of our DSL library — the definition, the data and the export process. In this part, we help developers using our DSL to extract part of the DSLs definitions into methods.

![](https://cdn-images-1.medium.com/max/800/0*48-zVWszvxB502Mn.png)

YUML.me Diagram’s Diagram

* * *

Using DSL has its benefits but also some drawbacks. One of them is that builders are de facto data as code so for example to represent large diagram we would need to write a lot of code. In these situations, it's very helpful if you can keep the code DRY and do not repeat yourself.

One of the popular refactoring to remove duplicates is extracting methods. Inside nested builders, this can be a problem as we need to access the object being configured. The solution is actually pretty simple, we can explicitly pass the definition object into the nested closure:

@CompileStatic  
**private static** Diagram buildDiagramDiagramUsingHelperMethods() {  
    Diagram._build_ { DiagramDefinition diagram ->  
        note **'YUML Diagram Components'**        _buildDiagramRelationships_(diagram)  
        _buildRelationshipRelationship_(diagram)  
    }  
}  
  
@CompileStatic  
**private static** DiagramContentDefinition buildDiagramRelationships(DiagramDefinition diagram) {  
    diagram.with {  
        type **'Diagram'** has _one_ to _many_ type **'Type'**        type **'Diagram'** has _zero_ to _many_ type **'Note'**        type **'Diagram'** has _zero_ to _many_ type **'Relationship'**    }  
}  
  
@CompileStatic  
**private static** DiagramContentDefinition buildRelationshipRelationship(DiagramDefinition diagram) {  
    diagram.with {  
        type **'Relationship'** has _one_ type **'Type'** called **'source'**        type **'Relationship'** has _one_ type **'Type'** called **'destination'**        type **'Relationship'** owns _one_ type **'RelationshipType'**    }  
}

In this trivial example, you can see that `DiagramDefinition` object is passed as a first optional argument of the builder closure so we can use it in a separate method. And we can use good old `with` method to continue using the DSL inside the method themselves.

We need to make a small update in the interfaces to let Groovy compiler know what are the expected closure parameters. Here's an example for the `type` method in `DiagramDefinition`:

TypeDefinition type(  
    String name,  
    @DelegatesTo(  
        value = TypeDefinition.**class**,   
        strategy = Closure.**_DELEGATE\_FIRST_**    )  
    @ClosureParams(  
        value = SimpleType.**class**,   
        options = **"cz.orany.yuml.model.dsl.TypeDefinition"**    )  
    Closure<? **extends** DiagramContentDefinition> builder  
);

`ClosureParams` annotation helps static compiler to determine the types of the closure parameters. Although it is not useful in our situation, you may also defined multiple expected parameters. As we still use the method `with` internally we don't need any further change in our code as this method already calls the closure with the self object as a single parameter.

You may also notice that we have added return type of the closure itself which acts as a soft safeguard to prevent having a semifinished fluent statement such as following:

type 'Order', {  
    has one  
}

In the example, `has one` would return `InheritanceBuilder` which does not implement `DiagramContentDefinition` interface and compilation error would rise during static compilation.

As I have written, this guard is soft as you can still write following piece of code:

type 'Order', {  
    has one  
    has many type 'Line'  
}

But still, it gives the developers better hint what is the expected content of the closure than just leaving the closure type parameter undefined.

* * *

The code is available on GitHub under `05-dry` tag:

git clone [https://github.com/musketyr/yuml-dsl-builder.git](https://github.com/musketyr/yuml-dsl-builder.git)  
cd yuml-dsl-builder  
git checkout 05-dry

* * *

In the next part [The Expectations: _The importance of handling closures’ owner properly_](https://medium.com/p/83ced4b8f2b) we take a look on one of the most common problem of builder DSL which is wrong expectations about the captured scope of the closures.

* * *

### Contents

1.  [The Concept: _The core concept of builders_](https://medium.com/p/2d5a97fa0a51)
2.  [The Essence: _The closures’ basics_](https://medium.com/p/fda1f2ebe657)
3.  [The Aid: _Using the annotations for static compilation_](https://medium.com/p/df2e9a02557a)
4.  [The Disguise: _Hiding the implementation of the builder API_](https://medium.com/p/1e2edc2311f8)
5.  [**The Desiccation: _Keeping the code DRY_**](https://medium.com/p/afb47ebbf89d)
6.  [The Expectations: _The importance of handling closures’ owner properly_](https://medium.com/p/83ced4b8f2b)
7.  [The Extension: _Designing your builder DSL for extendability_](https://medium.com/p/d612fd261471)
8.  [The Resignation: _Rewriting the Groovy DSL builder into Java_](https://medium.com/p/99bd118538b4)
9.  [The Navigation: _Using the annotations for named parameters_](https://medium.com/p/d065f0253e98)
10.  [The Conclusion: _The checklist for Groovy DSL builders’ authors_](https://medium.com/p/9d2b961dbc55)

By [Vladimír Oraný](https://medium.com/@musketyr) on [November 30, 2018](https://medium.com/p/afb47ebbf89d).

[Canonical link](https://medium.com/@musketyr/groovy-dsl-builders-5-the-desiccation-afb47ebbf89d)

Exported from [Medium](https://medium.com) on February 15, 2026.