---
title: "Groovy DSL Builders #4: The Disguise"
date: 2018-11-30T11:00:00Z
slug: groovy-dsl-builders--4--the-disguise
source: medium
mediumId: "1e2edc2311f8"
---In the previous post The Aid: Using the annotations for static compilation we improved our YUML DSL builder with own methods accepting…

* * *

### Groovy DSL Builders #4: The Disguise

In the previous post [The Aid: _Using the annotations for static compilation_](https://medium.com/p/df2e9a02557a) we improved our YUML DSL builder with own methods accepting closures and with fluent DSL based on command chains. We used `DelegatesTo` annotation to keep the code eligible for static compilation. In this part, we are going to separate the main three concerns of the DSL library.

![](https://cdn-images-1.medium.com/max/800/0*48-zVWszvxB502Mn.png)

YUML.me Diagram’s Diagram

* * *

At the moment, our objects are breaking the single responsibility principle as they are:

1.  Defining the data (aka code-as-data)
2.  Holding the data
3.  Exporting to desired format

As the complexity of the builder grows it is important to keep the code as clean as possible and try to separate these three concerns at least using interfaces. The DSL will remain visually the same:

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

But all the parts of the DSL will be provided by interfaces. I prefer to write interfaces in Java as they are more powerful than their Groovy 2.x counterpart. Here is the example of the builder's diagram definition interface:

**public interface** DiagramDefinition {  
  
    **static** From getFrom() {  
        **return** From.**_FROM_**;  
    }  
  
    // other keywords  
  
    **default** Note note(String text) {  
        **return** note(text, **null**);  
    }  
  
    Note note(String text, String color);  
  
    **default** TypeDefinition type(String name) {  
        **return** type(name, Closure.**_IDENTITY_**);  
    }  
  
    TypeDefinition type(  
        String name,   
        @DelegatesTo(  
            value = TypeDefinition.**class**,   
            strategy = Closure.**_DELEGATE\_FIRST_**        )  
        Closure builder  
    );  
  
    // other builder methods  
  
}

Data interface, on the other hand, is pretty simple:

**public interface** Diagram {  
  
    **static** Diagram build(  
        @DelegatesTo(  
            value = DiagramDefinition.**class**,   
            strategy = Closure.**_DELEGATE\_FIRST_**        )   
        Closure definition  
    ) {  
        **return** DefaultDiagramFactory._build_(definition);  
    }  
  
    Collection<? **extends** Note> getNotes();  
    Collection<? **extends** Type> getTypes();  
    Collection<? **extends** Relationship> getRelationships();  
  
}

As `Diagram` is the centrepiece of the DSL it still provides the `build` method but it delegates it to the other class `DefaultDiagramFactory`. This is also quite a common pattern to provide builder directly from the interface or class under construction.

As most of the helper DSL code now resides in `DiagramDefinition` interface's default methods, the original class is not much simpler:

@ToString  
@PackageScope  
@CompileStatic  
@EqualsAndHashCode  
**class** DefaultDiagram **implements** Diagram, DiagramDefinition {  
  
    **final** Collection<DefaultNote> **notes** \= **new** LinkedHashSet<>()  
    **final** Collection<DefaultRelationship> **relationships** \=        **new** LinkedHashSet<>()  
  
    **private final** Map<String, DefaultType> **typesMap** \=   
        \[:\].withDefault { key ->   
            **new** DefaultType(**this**, key.toString())   
        }  
  
    @Override  
    Collection<? **extends** Type> getTypes() {  
        **return typesMap**.values()  
    }  
  
    @Override  
    DefaultNote note(String text, String color) {  
        Note note = **new** DefaultNote(text, color)  
        **this**.**notes**.add(note)  
        **return** note  
    }  
  
    @Override  
    DefaultType type(  
        String name,   
        @DelegatesTo(  
            value = TypeDefinition,   
            strategy = Closure.**_DELEGATE\_FIRST_**        )   
        Closure builder  
    ) {  
        DefaultType type = **typesMap**\[name\]  
        type.with builder  
        **return** type  
    }  
  
    @Override  
    DefaultRelationship relationship(  
        String source,  
        RelationshipType relationshipType,  
        String destination,  
        @DelegatesTo(  
            value = RelationshipDefinition,  
            strategy = Closure.**_DELEGATE\_FIRST_**        )  
        Closure additionalProperties  
    ) {  
        DefaultRelationship relationship = **new** DefaultRelationship(  
            type(source, Closure.**_IDENTITY_**),   
            relationshipType,   
            type(destination, Closure.**_IDENTITY_**)  
        )  
        relationship.with additionalProperties  
        **this**.**relationships**.add(relationship)  
        **return** relationship  
    }  
  
}

In some of the future iterations, you may even make`Diagram` final immutable class.

Clearer separation also helps to extract the YUML exporter completely out of the `Diagaram` class:

**package** cz.orany.yuml.export;  
  
**import** cz.orany.yuml.model.Diagram;  
**import** cz.orany.yuml.model.Note;  
**import** cz.orany.yuml.model.Relationship;  
**import** cz.orany.yuml.model.Type;  
  
**import** java.io.PrintWriter;  
**import** java.io.StringWriter;  
**import** java.util.Map;  
  
**import static** java.util.function.Function._identity_;  
**import static** java.util.stream.Collectors._toMap_;  
  
**public class** YumlDiagramPrinter **implements** DiagramPrinter {  
  
    @Override **public** String print(Diagram diagram) {  
        StringWriter stringWriter = **new** StringWriter();  
        PrintWriter printWriter = **new** PrintWriter(stringWriter);  
  
        **for** (Note note : diagram.getNotes()) {  
            printWriter.println(print(note));  
        }  
  
        Map<String, Type> orphanTypes = diagram  
            .getTypes()  
            .stream()  
            .collect(_toMap_(Type::getName, _identity_()));  
  
        **for** (Relationship r : diagram.getRelationships()) {  
            orphanTypes.remove(r.getSource().getName());  
            orphanTypes.remove(r.getDestination().getName());  
  
            printWriter.println(print(r));  
        }  
  
        **for** (Type type : orphanTypes.values()) {  
            printWriter.println(print(type));  
        }  
  
        **return** stringWriter.toString();  
    }  
  
    // print parts  
}

You may notice there is also `DiagramPrinter` interface so in future the diagram model could be exported to different notation such as [Ecore](https://www.eclipse.org/ecoretools/overview.html).

* * *

The code is available on GitHub under `04-api` tag:

git clone https://github.com/musketyr/yuml-dsl-builder.git  
cd yuml-dsl-builder  
git checkout 04-api

* * *

Next post [The Desiccation: _Keeping the code DRY_](https://medium.com/p/afb47ebbf89d) will explain how to allow developers using your builder DSL to break large data definition into smaller parts.

* * *

### Contents

1.  [The Concept: _The core concept of builders_](https://medium.com/p/2d5a97fa0a51)
2.  [The Essence: _The closures’ basics_](https://medium.com/p/fda1f2ebe657)
3.  [The Aid: _Using the annotations for static compilation_](https://medium.com/p/df2e9a02557a)
4.  [**The Disguise: _Hiding the implementation of the builder API_**](https://medium.com/p/1e2edc2311f8)
5.  [The Desiccation: _Keeping the code DRY_](https://medium.com/p/afb47ebbf89d)
6.  [The Expectations: _The importance of handling closures’ owner properly_](https://medium.com/p/83ced4b8f2b)
7.  [The Extension: _Designing your builder DSL for extendability_](https://medium.com/p/d612fd261471)
8.  [The Resignation: _Rewriting the Groovy DSL builder into Java_](https://medium.com/p/99bd118538b4)
9.  [The Navigation: _Using the annotations for named parameters_](https://medium.com/p/d065f0253e98)
10.  [The Conclusion: _The checklist for Groovy DSL builders’ authors_](https://medium.com/p/9d2b961dbc55)

By [Vladimír Oraný](https://medium.com/@musketyr) on [November 30, 2018](https://medium.com/p/1e2edc2311f8).

[Canonical link](https://medium.com/@musketyr/groovy-dsl-builders-4-the-disguise-1e2edc2311f8)

Exported from [Medium](https://medium.com) on February 15, 2026.