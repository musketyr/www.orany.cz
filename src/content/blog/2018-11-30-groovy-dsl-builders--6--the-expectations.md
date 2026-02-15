---
title: "Groovy DSL Builders #6: The Expectations"
date: 2018-11-30
slug: groovy-dsl-builders--6--the-expectations
source: medium
mediumId: "83ced4b8f2b"
---In the previous post The Desiccation: Keeping the code DRY we have described the optional closure parameter to allow developers to break…

* * *

### Groovy DSL Builders #6: The Expectations

In the previous post [The Desiccation: _Keeping the code DRY_](https://medium.com/p/afb47ebbf89d) we have explained why we should provide an optional closure parameter to allow developers to break big DSL definitions into smaller chunks. In this part, we take a look at the most common problem with any Groovy DSL which is mismatched expectation what scope uses nested closures.

![](https://cdn-images-1.medium.com/max/800/0*48-zVWszvxB502Mn.png)

YUML.me Diagram’s Diagram

* * *

There is actually yet another player than `delegate` in the game of closure's property and method resolution. It's called `owner` and it points to the object where the closure was defined. You need to pay attention to the `owner` as soon you start nesting closures more than one level.

Let's take a look at simple example. Current DSL also allows the following notation:

@CompileStatic  
**private static** Diagram buildDiagramWithInternalMethodCalls() {  
    Diagram._build_ {  
        note **'YUML Diagram Components'**        type **'Diagram'**, {  
            has _one_ to _many_ type **'Type'**            _// "notes" is defined in the owner_            has _zero_ to _many_ type _notes_            has _zero_ to _many_ type **'Relationship'**        }  
  
        type **'Relationship'**, {  
            has _one_ type **'Type'** called **'source'**            has _one_ type **'Type'** called **'destination'**            owns _one_ type **'RelationshipType'**        }  
    }  
}  
  
**private static** String getNotes() {  
    **return 'Note'  
**}

Using references to properties and methods from the outer scope such as the property`notes` is very natural but it may result in unexpected behaviour if you don't pay attention to what is the actual `owner` of the closure. Unless you handle the nested closures carefully then by default the `owner` of the nested closure passed into `type` method is actually the delegate of the surrounding closure which means `DefaultDiagram`in our situation. And `DefaultDiagram` already defines property `notes` even it is not visible through `DiagramDefinition` interface.

To work around this you need to forward the top level owner to any nested closure:

**public static** Diagram build(  
    @DelegatesTo(  
        value = cz.orany.yuml.model.dsl.DiagramDefinition.**class**,   
        strategy = Closure.**_DELEGATE\_FIRST_**    )  
    Closure d  
) {  
    DefaultDiagram diagram = **new** DefaultDiagram(d.getOwner());  
    DefaultGroovyMethods._with_(diagram, d);  
    **return** diagram;  
}

We keep the original owner and we will pass it to the any nested closure:

@ToString  
@PackageScope  
@CompileStatic  
@EqualsAndHashCode  
**class** DefaultDiagram **implements** Diagram, DiagramDefinition {

    **private final** Object **owner**;  
    **// other fields**

    DefaultDiagram(Object owner) {  
        **this**.**owner** \= owner  
    }  
  
    // other methods  
  
    @Override  
    DefaultType type(  
        String name,  
        @DelegatesTo(  
            value = TypeDefinition.**class**,   
            strategy = Closure.**_DELEGATE\_FIRST_**        )  
        @ClosureParams(  
            value = SimpleType.**class**,   
            options = **"cz.orany.yuml.model.dsl.TypeDefinition"**        )  
        Closure<? **extends** DiagramContentDefinition> builder  
    ) {  
        DefaultType type = **typesMap**\[name\]  
        withSameOwner type, builder  
        **return** type  
    }  
  
    **protected** <V, T> V withSameOwner(T self, Closure<V> closure) {  
        **final** Closure<V> clonedClosure = closure.rehydrate(  
            self,   
            **owner**,   
            closure.thisObject  
        )  
        clonedClosure.setResolveStrategy(Closure.**_DELEGATE\_FIRST_**);  
        clonedClosure.call(self)  
    }  
  
}

We can use method `rehydrate` which was created for very different reasons but it is very helpful to create a clone of the closure with a different `owner` than the original one. You can use it to change the `owner` of the nested closure calls. After this change, the original snippet would return expected results bypassing the `notes` property in `DefaultDiagram` and using `getNotes` method in the surrounding class.

* * *

The code is available on GitHub under `06-owner` tag:

git clone https://github.com/musketyr/yuml-dsl-builder.git  
cd yuml-dsl-builder  
git checkout 06-owner

* * *

In the next part [The Extension: _Designing your builder DSL for extendability_](https://medium.com/p/d612fd261471) we are going to provide extension points to our DSL to let developers provide extra functionality atop our basic DSL library.

* * *

### Contents

1.  [The Concept: _The core concept of builders_](https://medium.com/p/2d5a97fa0a51)
2.  [The Essence: _The closures’ basics_](https://medium.com/p/fda1f2ebe657)
3.  [The Aid: _Using the annotations for static compilation_](https://medium.com/p/df2e9a02557a)
4.  [The Disguise: _Hiding the implementation of the builder API_](https://medium.com/p/1e2edc2311f8)
5.  [The Desiccation: _Keeping the code DRY_](https://medium.com/p/afb47ebbf89d)
6.  [**The Expectations: _The importance of handling closures’ owner properly_**](https://medium.com/p/83ced4b8f2b)
7.  [The Extension: _Designing your builder DSL for extendability_](https://medium.com/p/d612fd261471)
8.  [The Resignation: _Rewriting the Groovy DSL builder into Java_](https://medium.com/p/99bd118538b4)
9.  [The Navigation: _Using the annotations for named parameters_](https://medium.com/p/d065f0253e98)
10.  [The Conclusion: _The checklist for Groovy DSL builders’ authors_](https://medium.com/p/9d2b961dbc55)

By [Vladimír Oraný](https://medium.com/@musketyr) on [November 30, 2018](https://medium.com/p/83ced4b8f2b).

[Canonical link](https://medium.com/@musketyr/groovy-dsl-builders-6-the-expectations-83ced4b8f2b)

Exported from [Medium](https://medium.com) on February 15, 2026.