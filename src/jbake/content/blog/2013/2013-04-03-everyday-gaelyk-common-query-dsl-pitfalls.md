title=Everyday Gaelyk: Common Query DSL pitfalls
date=2013-04-03
type=post
tags=blog,gaelyk, datastore, query dsl
status=published
~~~~~~

[Gaelyk Query DSL](http://gaelyk.appspot.com/tutorial/app-engine-shortcuts#query) makes quering 
[Google App Engine Datastore](https://developers.google.com/appengine/docs/java/datastore/) a lot simpler but sometimes 
it isn't working as expected.

##Variable naming conflict

Some of problems origins from using the variable or property names which are already taken.
Names of the properties in where clause are converted to `String` automatically. What property we will be querying?

*Variable name conflict*


    def count = 123
    // a lot of code here so you've already forgotten you have such a variable

    def maxCount = 100

    datastore.execute {
        from Item
        where count <= maxCount
    }


This query will be translated as `123 <= 100` which probably isn't what you wanted.

##Binding variable name conflict

Previous example was quite obvious but what if we have following query:

*Binding variable name conflict*


    datastore.execute {
        from Item
        where users > 10
    }


Instead of getting result of items having more than ten users we get empty result set. It's
because `users` is Gaelyk's shortcut to [UserService](https://developers.google.com/appengine/docs/java/gettingstarted/usingusers)
so the where clause is translated to something like `UserService@xyz123 > 10` which obviously returns no results.

If you run into name conflict just use good old String as property name in the where clause such as `where 'users' > 10`.


##Entity pitfalls

`@Entity` annotation adds sevral useful methods to the POGO class such as `findAll` which resemble their 
[Grails counterparts](http://grails.org/doc/2.1.0/ref/Domain%20Classes/findAll.html). But don't get confused. The syntax of
using such methods differs slightly. `find`, `findAll` or `count` method are just shortcuts to Query DSL!

*Using findAll method*


    @Entity class Item {
        int count
    }

    Item.findAll { count == 10 }


The query listed above will return all the items since the condition is ignored
because the `where` keyword is missing.

*Using findAll method with where*


    @Entity class Item {
        int count
    }

    Item.findAll { where count == 10 }


We have added the `where` keyword to the `findAll` method but now we'll always get empty result because all field of `@Entity` class
are unindexed by default. You need to mark the field `@Indexed` to use it in queries.

*Using findAll method with where on indexed field*


    @Entity class Item {
        @Indexed int count
    }

    Item.findAll { where count == 10 }

##Summary

Using Query DSL you should basically always take care about two important things:

1. Property names are always converted to String, this is may make mess if the variable with the same name is already defined (even in Gaelyk shortcut bindings). Use String constants instead of property names in case of any possible name conflict.
2. All properties you're querying must be indexed. When using `@Entity` annotations all the properties are unindexed by default.



