title=Everyday Gaelyk: Handle long running datastore queries gracefully
date=2013-03-21
type=post
tags=blog,gaelyk 2.0, datastore, query dsl
status=published
~~~~~~

[Google App Engine](https://developers.google.com/appengine/)  is full of hidden traps. One of them is the need to restart long running queries when
the query expired causing following exception to be thrown:

`The requested query has expired. Please restart it with the last cursor to read more results`

In [Gaelyk 2.0](/blog/2013/2013-03-16-everyday-gaelyk-living-on-the-edge-with-gaelyk-snapshots.html)
you can now tell your [query](http://gaelyk.appspot.com/tutorial/app-engine-shortcuts#query) 
to restart automatically if this happen. Restarting happen under the hood so you can use `for` loops flawlessly.

To enable automatic restarting of queries add `restart automatically` statement to your query dsl.
Currenty, you can only use this option on `iterate` method, because it doesn't make much sense with `execute`
method.

*Simple restarting query*

    def comments = datastore.iterate {
        from Comment
        limit 50000
        restart automatically
    }
    
    for(comment in comments){
        // would throw exception randomly for long running queries
        process comment
    }


You can use `restart automatically` with `select all` and `select keys` query types. It also works with
coerced queries using `as Type` keyword e.g. `form 'Comment' as Comment`.



