---
title: "Groovy DSL Builders #2: The Essence"
date: 2018-11-30
slug: groovy-dsl-builders--2--the-essence
source: medium
mediumId: "fda1f2ebe657"
---In the first part of this series Groovy DSL Builders #1: The Concept we got familiar with the builder pattern and various builders…

* * *

### Groovy DSL Builders #2: The Essence

In the first part of this series [The Concept: _The core concept of builders_](https://medium.com/p/2d5a97fa0a51) we got familiar with the builder pattern and various builders provided by Groovy standard library. We also introduced our sample YUML builder library which is described by following object model:

![](https://cdn-images-1.medium.com/max/800/0*48-zVWszvxB502Mn.png)

YUML.me Diagram’s Diagram

This post is focused on closures in Groovy.

* * *

Closures are an essential part of any Groovy DSL builders. Contrary to their Java 8 lambda counterpart, they add another player into the game of method and property resolution, which is called a **_delegate_**.

The most common method which changes closure's delegate is the method `with` which can be used on any object and which allows you to call methods of given object directly from within the closure definition without the need to specify the caller subject. See the following example which benefits from calling `with` on the `Diagram` instance:

Diagram diagram =  **new** Diagram().with {  
    note(**'You can stick notes on diagrams too!'**,**'skyblue'**)  
  
    relationship(  
        type(**'Customer'**),   
        RelationshipType.**_AGGREGATION_**,   
        type(**'Order'**)  
    ).with {  
        sourceCardinality = **'1'**        destinationTitle = **'orders'**        destinationCardinality = **'0..\*'**    }  
  
    relationship(  
        type(**'Order'**),  
        RelationshipType.**_COMPOSITION_**,   
        type(**'LineItem'**)  
    ).with {  
        sourceCardinality = **'\*'**        destinationCardinality = **'\*'**    }  
  
    relationship(type(**'Order'**), type(**'DeliveryMethod'**)).with {  
        destinationCardinality = **'1'**    }  
  
    relationship(type(**'Order'**), type(**'Product'**)).with {  
        sourceCardinality = **'\*'**        destinationCardinality = **'\*'**    }  
  
    relationship(type(**'Category'**), type(**'Product'**)).with {  
        bidirectional = **true**    }  
  
    relationship(  
        type(**'National'**),   
        RelationshipType.**_INHERITANCE_**,   
        type(**'DeliveryMethod'**)  
    )

    relationship(  
        type(**'International'**),   
        RelationshipType.**_INHERITANCE_**,   
        type(**'DeliveryMethod'**)  
    )  
  
    it  
}

We have added some useful methods for building notes, types and relationships directly to `Diagram` class and we can call them simply using the `with` method call. There is one drawback that we need to return self (the parameter `it`) as a last line of the closure block. Since Groovy 2.5.x there is a method `tap` doing exactly what we want without the need of returning `it` but at the time of writing, the current version of [IntelliJ IDEA](https://www.jetbrains.com/idea/) didn't seem to fully support highlights for this method.

Here is the updated `Diagram` class which now manages more gracefully the `types` and `relationships` collections using the methods of similar name. This is a pretty common pattern in the Groovy builders' DSLs.

@CompileStatic  
@EqualsAndHashCode  
**class** Diagram {  
  
    Collection<Note> **notes** \= **new** LinkedHashSet<>()  
    Map<String, Type> **types** \= \[:\].withDefault { key ->   
        **new** Type(key.toString())   
    }

    Collection<Relationship> **relationships** \= **new** LinkedHashSet<>()  
  
    Note note(String text, String color = **null**) {  
        Note note = **new** Note(text, color)  
        **this**.**notes**.add(note)  
        **return** note  
    }  
  
    Type type(String name) {  
        **types**\[name\]  
    }  
  
    Relationship relationship(  
        Type source,   
        RelationshipType type = RelationshipType.**_ASSOCIATION_**,  
        Type destination  
    ) {  
        Relationship relationship = **new** Relationship(  
            source,  
            type,   
            destination  
         )  
        **this**.**relationships**.add(relationship)  
        **return** relationship  
    }  
  
    @Override  
    String toString() {  
        **// print diagram**  
    }  
  
}

Calling the method `type` or `relationship` will either find the existing object of given name or it will create a new one and return it.

* * *

The code is available on GitHub under `02-closures` tag:

git clone https://github.com/musketyr/yuml-dsl-builder.git  
cd yuml-dsl-builder  
git checkout 02-closures

* * *

We are going to implement our own closure handlers in the next part [The Aid: _Using the annotations for static compilation_](https://medium.com/p/df2e9a02557a)_._

* * *

### Contents

1.  [The Concept: _The core concept of builders_](https://medium.com/p/2d5a97fa0a51)
2.  **The Essence: _The closures’ basics_**
3.  [The Aid: _Using the annotations for static compilation_](https://medium.com/p/df2e9a02557a)
4.  [The Disguise: _Hiding the implementation of the builder API_](https://medium.com/p/1e2edc2311f8)
5.  [The Desiccation: _Keeping the code DRY_](https://medium.com/p/afb47ebbf89d)
6.  [The Expectations: _The importance of handling closures’ owner properly_](https://medium.com/p/83ced4b8f2b)
7.  [The Extension: _Designing your builder DSL for extendability_](https://medium.com/p/d612fd261471)
8.  [The Resignation: _Rewriting the Groovy DSL builder into Java_](https://medium.com/p/99bd118538b4)
9.  [The Navigation: _Using the annotations for named parameters_](https://medium.com/p/d065f0253e98)
10.  [The Conclusion: _The checklist for Groovy DSL builders’ authors_](https://medium.com/p/9d2b961dbc55)

By [Vladimír Oraný](https://medium.com/@musketyr) on [November 30, 2018](https://medium.com/p/fda1f2ebe657).

[Canonical link](https://medium.com/@musketyr/groovy-dsl-builders-2-the-essence-fda1f2ebe657)

Exported from [Medium](https://medium.com) on February 15, 2026.