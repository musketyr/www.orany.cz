---
title: "Groovy DSL Builders #7: The Extension"
date: 2018-11-30T14:00:00Z
slug: groovy-dsl-builders--7--the-extension
source: medium
mediumId: "d612fd261471"
---In the previous post The Expectations: The importance of handling closures’ owner properly we solved the problem with the scoping of…

* * *

### Groovy DSL Builders #7: The Extension

In the previous post [The Expectations: _The importance of handling closures’ owner properly_](https://medium.com/p/83ced4b8f2b) we solved the problem with the scoping of nested closures. In this post, we are going to provide an extension point to allow developers to create extra functionality atop the simple DSL library.

![](https://cdn-images-1.medium.com/max/800/0*48-zVWszvxB502Mn.png)

YUML.me Diagram’s Diagram

* * *

One of the key features of any software system is the ability to react to changes. Doesn't matter how much you try to anticipate every possible use case but you will definitely miss at least one. It is good to think about allowing the developers to extend your builder DSL.

In Groovy, the simplest possible way how to extend the DSL is to use [extensions modules](http://groovy-lang.org/metaprogramming.html#_extension_modules). If you expose a method which is generic enough to handle all of the possible scenarios then you open your DSL for developers who may have an idea how to create a simple shortcut to some more complex call.

Let's start simple. Following extension class helps you to add `stereotype` method besides the originally provided `type` method:

**public class** StereotypeExtensions {  
  
    **public static** TypeDefinition stereotype(  
        DiagramDefinition diagram,   
        String name  
    ) {  
        **return** diagram.type(**"<<"** \+ name + **">>"**);  
    }  
  
    **public static** RelationshipDefinition stereotype(  
        AggregationOrCompositionBuilder builder,   
        String name  
    ) {  
        **return** builder.type(**"<<"** \+ name + **">>"**);  
    }  
  
    **public static** RelationshipDefinition stereotype(  
        InheritanceBuilder builder,   
        String name  
    ) {  
        **return** builder.type(**"<<"** \+ name + **">>"**);  
    }  
  
}

To enable the class as extension module you need to create a file `META-INF/services/org.codehaus.groovy.runtime.ExtensionModule` with the following content:

**moduleName**\=**yuml-extra  
moduleVersion**\=**0.1.0  
extensionClasses**\=**cz.orany.yuml.stereotype.StereotypeExtensions  
staticExtensionClasses**\=

Then you are able to use the `stereotype` method within your DSL:

note **'YUML Diagram Components'  
**stereotype **'Diagram'** has _one_ to _many_ stereotype **'Type'  
**stereotype **'Diagram'** has _zero_ to _many_ stereotype **'Note'  
**stereotype **'Diagram'** has _zero_ to _many_ stereotype **'Relationship'  
  
**stereotype **'Relationship'** has _one_ stereotype **'Type'** called **'source'  
**stereotype **'Relationship'** has _one_ stereotype **'Type'** called **'destination'  
**stereotype **'Relationship'** owns _one_ stereotype **'RelationshipType'**

Which will produce the following output:

**\[note: YUML Diagram Components\]  
\[<<Type>>\]<>1..\*->\[<<Diagram>>\]  
\[<<Note>>\]<>0..\*->\[<<Diagram>>\]  
\[<<Relationship>>\]<>0..\*->\[<<Diagram>>\]  
\[<<Type>>\]<>source 1->\[<<Relationship>>\]  
\[<<Type>>\]<>destination 1->\[<<Relationship>>\]  
\[<<RelationshipType>>\]++1->\[<<Relationship>>\]**

But what if the new language feature goes beyond the current functionality. In that case, you should create a helper interface which will allow developers to plug into the build mechanism. I have simply called the interface `DiagramHelper`. The diagram will need to store the information provided by the helper in some generic storage such as a plain `Map<String, Object> metadata` map. Finally, you need to expose an extension point for the helpers.

Here are the pieces of code which handle the helpers:

@Override  
**public** <H **extends** DiagramHelper, R> H configure(  
    @DelegatesTo.Target(**"helper"**)  
    Class<H> helper,  
    @DelegatesTo(  
        value = DelegatesTo.Target.**class**,   
        target = **"helper"**,   
        strategy = Closure.**_DELEGATE\_FIRST_**,   
        genericTypeIndex = 0  
    )  
    @ClosureParams(FirstParam.FirstGenericType.**class**)  
    Closure<R> configuration  
) {  
    H helperInstance = (H) **helperMap**.computeIfAbsent(helper, {   
        helper.newInstance()  
    })  
    DefaultGroovyMethods._with_(helperInstance, configuration)  
    **return** helperInstance  
}  
  
**void** postprocess() {  
    **for** (DiagramHelper helper : **helperMap**.values()) {  
        **metadata**.putAll(helper.metadata)  
    }  
}

It's actually pretty easy to create such an extension point. In the example, you can see the different usage of `DelegatesTo` annotation, this time using the `Target` and `genericTypeIndex` to point to the generic type of the method. Method `postprocess` is called after the diagram is built, allowing the helpers to supply the metadata.

Now let's say we want to learn our YUML DSL to be able to also define the properties of the classes. This is a feature which is already present in YUML but we haven't implemented it directly to keep the example as trivial as possible. So the desired notation should look like on the following example:

note **'YUML Diagram Components'  
**type **'Diagram'**, {  
    has _one_ to _many_ type **'Type'**    has _zero_ to _many_ type _notes_    has _zero_ to _many_ type **'Relationship'  
**}  
  
type **'Relationship'**, {  
    has _one_ type **'Type'** called **'source'**    has _one_ type **'Type'** called **'destination'**    owns _one_ type **'RelationshipType'  
**}  
  
type **'Type'**, {  
    property **name**: **'string'  
**}

The new `property` method accepts a map having names of the properties as keys and types of the properties as values. To extend the DSL we need to create an yet another extension class:

@CompileStatic  
**class** PropertiesDiagramHelperExtensions {  
  
    **static** TypeDefinition property(  
        TypeDefinition typeDefinition,  
        String type,  
        String name  
    ) {  
        typeDefinition  
            .diagramDefinition  
            .configure(PropertiesDiagramHelper) {  
                it.addProperty(typeDefinition.name, type, name)  
            }  
        **return** typeDefinition  
    }  
  
    **static** TypeDefinition property(  
        TypeDefinition typeDefinition,  
        Map<String, String> properties  
    ) {  
        typeDefinition  
            .diagramDefinition  
            .configure(PropertiesDiagramHelper) {  
            it.addProperties(typeDefinition.name, properties)  
        }  
        **return** typeDefinition  
    }  
  
}

The extension class uses the extension point method `configure` to configure an instance of `PropertiesDiagramHelper` which will hold the properties for us and during the call to `postprocess` it will add the properties to the diagram as metadata. You may notice that the `TypeDefinition` now holds the reference to the `DiagramDefinition`. If you want to create extendible DSL it is very useful to provide references to objects which are logically one level up in the tree so the developers writing the extensions can traverse the tree more easily.

The extension would be useful without the component which understands the metadata. The `YumlPrinter` can get the information about the properties while printing the type:

**private** String print(Diagram diagram, Type type) {  
    Map<String, String> properties =   
        PropertiesDiagramHelper._getProperties_(diagram, type);  
  
    **if** (properties.isEmpty()) {  
        **return** String._format_(**"\[%s\]"**, type.getName());  
    }  
  
    String propertiesFormatted = properties  
        .entrySet()  
        .stream()  
        .map((e) -> e.getKey() + **":"** \+ e.getValue())  
        .collect(Collectors._joining_(**";"**));  
  
    **return** String._format_(  
        **"\[%s|%s\]"**,   
        type.getName(),   
        propertiesFormatted  
    );  
}

This would produce the expected output including the properties:

**\[note: YUML Diagram Components\]  
\[Type|name:string\]<>1..\*->\[Diagram\]  
\[Note\]<>0..\*->\[Diagram\]  
\[Relationship\]<>0..\*->\[Diagram\]  
\[Type|name:string\]<>source 1->\[Relationship\]  
\[Type|name:string\]<>destination 1->\[Relationship\]  
\[RelationshipType\]++1->\[Relationship\]**

* * *

The code is available on GitHub under `07-extensions` tag:

git clone [https://github.com/musketyr/yuml-dsl-builder.git](https://github.com/musketyr/yuml-dsl-builder.git)  
cd yuml-dsl-builder  
git checkout 07-extension

* * *

In the next part [The Resignation: _Rewriting the Groovy DSL builder into Java_](https://medium.com/p/99bd118538b4) we take a look what how to allow plain old Java developers to also use your DSL.

* * *

### Contents

1.  [The Concept: _The core concept of builders_](https://medium.com/p/2d5a97fa0a51)
2.  [The Essence: _The closures’ basics_](https://medium.com/p/fda1f2ebe657)
3.  [The Aid: _Using the annotations for static compilation_](https://medium.com/p/df2e9a02557a)
4.  [The Disguise: _Hiding the implementation of the builder API_](https://medium.com/p/1e2edc2311f8)
5.  [The Desiccation: _Keeping the code DRY_](https://medium.com/p/afb47ebbf89d)
6.  [The Expectations: _The importance of handling closures’ owner properly_](https://medium.com/p/83ced4b8f2b)
7.  [**The Extension: _Designing your builder DSL for extendability_**](https://medium.com/p/d612fd261471)
8.  [The Resignation: _Rewriting the Groovy DSL builder into Java_](https://medium.com/p/99bd118538b4)
9.  [The Navigation: _Using the annotations for named parameters_](https://medium.com/p/d065f0253e98)
10.  [The Conclusion: _The checklist for Groovy DSL builders’ authors_](https://medium.com/p/9d2b961dbc55)



