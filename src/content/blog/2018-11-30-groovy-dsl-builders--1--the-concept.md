---
title: "Groovy DSL Builders #1: The Concept"
date: 2018-11-30
slug: groovy-dsl-builders--1--the-concept
source: medium
mediumId: "2d5a97fa0a51"
---The builder pattern is used to create complex objects with constituent parts that must be created in the same order or using a specific…

* * *

### Groovy DSL Builders #1: The Concept

> The builder pattern is used to create complex objects with constituent parts that must be created in the same order or using a specific algorithm. An external class controls the construction algorithm. — The Gang of Four

Groovy is a language where domain-specific languages (DSL) are the first class citizens. There is a whole page in the documentation dedicated to writing DSL:

[**The Apache Groovy programming language - Domain-Specific Languages**  
_Groovy lets you omit parentheses around the arguments of a method call for top-level statements. "command chain"…_groovy-lang.org](http://groovy-lang.org/dsls.html "http://groovy-lang.org/dsls.html")[](http://groovy-lang.org/dsls.html)

Builder pattern has its special place among the other DSL approaches because of an ability to delegate closures to different objects which allows creating compact and easily readable code-as-data. Here is the example of one of the built-in builder `JsonBuilder` from the official documentation above:

```
StringWriter writer = new StringWriter()StreamingJsonBuilder builder = new StreamingJsonBuilder(writer)builder.records {  car {        name 'HSV Maloo'        make 'Holden'        year 2006        country 'Australia'        record {            type 'speed'            description 'production pickup truck with speed of 271kph'        }  }}String json = JsonOutput.prettyPrint(writer.toString())
```

There are many other builders present directly it the Groovy codebase which could be used as inspiration:

*   [MarkupBuilder](http://docs.groovy-lang.org/latest/html/api/groovy/xml/MarkupBuilder.html) can build XML or HTML content
*   [NodeBuilder](http://docs.groovy-lang.org/latest/html/api/groovy/util/NodeBuilder.html) can help you build any node-like structure
*   [ObjectGraphBuilder](http://docs.groovy-lang.org/latest/html/gapi/groovy/util/ObjectGraphBuilder.html) for creating interconnected objects
*   [FileTreeBuilder](http://docs.groovy-lang.org/2.5.4/html/gapi/index.html?groovy/util/FileTreeBuilder.html) to create nested directories structure

In this series, we are not going to use any of these as they are providing poor developer experience. I would like you to show how to step-by-step implement your own builder which will benefit from excellent IDE support as well as Groovy’s static compilation.

* * *

As an example, I’ve chosen to create DSL for [YUML.me](https://yuml.me) diagrams which help to create simple UML diagram online and which data model is relatively simple.

![](https://cdn-images-1.medium.com/max/800/0*48-zVWszvxB502Mn.png)

YUML.me Diagram’s Diagram

If we want to describe the Order’s example with plain old Groovy features we can just use language features such as map constructor:

Diagram diagram =  **new** Diagram()

diagram.notes.add(**new** Note(  
    **text**: **'You can stick notes on diagrams too!'**,  
    **color**: **'skyblue'  
**))

Type customer = **new** Type(**name**: **'Customer'**)  
Type order = **new** Type(**name**: **'Order'**)  
Type lineItem = **new** Type(**name**: **'LineItem'**)  
Type deliveryMethod = **new** Type(**name**: **'DeliveryMethod'**)  
Type product = **new** Type(**name**: **'Product'**)  
Type category = **new** Type(**name**: **'Category'**)  
Type nationalDeliveryMethod = **new** Type(**name**: **'National'**)  
Type internationalDeliveryMethod = **new** Type(**name**: **'International'**)

diagram.types.add(customer)  
diagram.types.add(order)  
diagram.types.add(lineItem)  
diagram.types.add(deliveryMethod)  
diagram.types.add(product)  
diagram.types.add(category)  
diagram.types.add(nationalDeliveryMethod)  
diagram.types.add(internationalDeliveryMethod)

diagram.relationships.add(**new** Relationship(  
    **source**: customer,  
    **sourceCardinality**: **'1'**,  
    **destinationTitle**: **'orders'**,  
    **destination**: order,  
    **destinationCardinality**: **'0..\*'**,  
    **type**: RelationshipType.**_AGGREGATION  
_**))

diagram.relationships.add(**new** Relationship(  
    **source**: order,  
    **sourceCardinality**: **'\*'**,  
    **destination**: lineItem,  
    **destinationCardinality**: **'\*'**,  
    **type**: RelationshipType.**_COMPOSITION  
_**))

diagram.relationships.add(**new** Relationship(  
    **source**: order,  
    **destination**: deliveryMethod,  
    **destinationCardinality**: **'1'  
**))

diagram.relationships.add(**new** Relationship(  
    **source**: order,  
    **sourceCardinality**: **'\*'**,  
    **destination**: product,  
    **destinationCardinality**: **'\*'  
**))

diagram.relationships.add(**new** Relationship(  
    **source**: category,  
    **destination**: product,  
    **bidirectional**: **true  
**))

diagram.relationships.add(**new** Relationship(  
    **source**: nationalDeliveryMethod,  
    **destination**: deliveryMethod,  
    **type**: RelationshipType.**_INHERITANCE  
_**))

diagram.relationships.add(**new** Relationship(  
    **source**: internationalDeliveryMethod,  
    **destination**: deliveryMethod,  
    **type**: RelationshipType.**_INHERITANCE  
_**))

You can see that it takes many lines of code to write just a very simple diagram. In particular, we need to take care of creating new objects and adding them into particular collections.

`Diagram` class and its companion in this example are a just plain old Groovy object which uses `toString` method to build the diagram:

@CompileStatic  
@EqualsAndHashCode  
**class** Diagram {  
  
    Collection<Note> **notes** \= **new** LinkedHashSet<>()  
    Collection<Type> **types** \= **new** LinkedHashSet<>()  
    Collection<Relationship> **relationships** \= **new** LinkedHashSet<>()  
  
    @Override  
    String toString() {  
        **assert types**        StringWriter stringWriter = **new** StringWriter()  
        PrintWriter printWriter = **new** PrintWriter(stringWriter)  
  
        **for** (Note note **in notes**) {  
            stringWriter.println(note)  
        }  
  
        Collection<Type> orphanTypes = **new** LinkedHashSet<>(**types**)  
  
        **for** (Relationship relationship **in relationships**) {  
            orphanTypes.remove(relationship.source)  
            orphanTypes.remove(relationship.destination)  
  
            printWriter.println(relationship)  
        }  
  
        **for** (Type type **in** orphanTypes) {  
            printWriter.println(type)  
        }  
  
        **return** stringWriter.toString()  
    }  
  
}

The produced YUML format is on the other hand very compact:

**\[note: You can stick notes on diagrams too!{bg:skyblue}\]  
\[Customer\]<>1-orders 0..\*>\[Order\]  
\[Order\]++\*-\*>\[LineItem\]  
\[Order\]-1>\[DeliveryMethod\]  
\[Order\]\*-\*>\[Product\]  
\[Category\]<->\[Product\]  
\[DeliveryMethod\]^\[National\]  
\[DeliveryMethod\]^\[International\]**

This will result in a very familiar graph to any YUML user:

![](https://cdn-images-1.medium.com/max/800/0*tIT3sfQS0F1ARrrQ.png)

Order’s Diagram

* * *

The code is available on GitHub under `01-simple` tag:

git clone https://github.com/musketyr/yuml-dsl-builder.git  
cd yuml-dsl-builder  
git checkout 01-simple

* * *

In the next post in this series [The Essence: _The closures’ basics_](https://medium.com/p/fda1f2ebe657) we will simplify the code using Closures.

* * *

### Contents

1.  [**The Concept: _The core concept of builders_**](https://medium.com/p/2d5a97fa0a51)
2.  [The Essence: _The closures' basics_](https://medium.com/p/fda1f2ebe657)
3.  [The Aid: _Using the annotations for static compilation_](https://medium.com/p/df2e9a02557a)
4.  [The Disguise: _Hiding the implementation of the builder API_](https://medium.com/p/1e2edc2311f8)
5.  [The Desiccation: _Keeping the code DRY_](https://medium.com/p/afb47ebbf89d)
6.  [The Expectations: _The importance of handling closures' owner properly_](https://medium.com/p/83ced4b8f2b)
7.  [The Extension: _Designing your builder DSL for extendability_](https://medium.com/p/d612fd261471)
8.  [The Resignation: _Rewriting the Groovy DSL builder into Java_](https://medium.com/p/99bd118538b4)
9.  [The Navigation: _Using the annotations for named parameters_](https://medium.com/p/d065f0253e98)
10.  [The Conclusion: _The checklist for Groovy DSL builders' authors_](https://medium.com/p/9d2b961dbc55)

By [Vladimír Oraný](https://medium.com/@musketyr) on [November 30, 2018](https://medium.com/p/2d5a97fa0a51).

[Canonical link](https://medium.com/@musketyr/groovy-dsl-builders-1-the-concept-2d5a97fa0a51)

Exported from [Medium](https://medium.com) on February 15, 2026.