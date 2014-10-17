title=Everyday Gaelyk: Save your query dsl for later use
date=2013-03-21
type=post
tags=blog,datastore, query dsl
status=published
~~~~~~

In [Gaelyk](http://gaelyk.appspot.com) you can already save [query created by query dsl](http://gaelyk.appspot.com/tutorial/app-engine-shortcuts#query) using `datastore.query{...}` and than excute it using [datastore prepare](https://developers.google.com/appengine/docs/java/datastore/queries#Retrieving_Results) function but this method only support a subset of dsl statements - namely 
`select`, `from`, `where`, `and` and `sort`. Corection using `as` or setting `limit` or `offset` is simply ignored.
In [Gaelyk 2.0](/blog/2013/2013-03-16-everyday-gaelyk-living-on-the-edge-with-gaelyk-snapshots.html) you can use `datastore.build{...}` method
to create instance of [QueryBuilder](http://gaelyk.appspot.com/api/groovyx/gaelyk/query/QueryBuilder.html).

<div class="alert">
  <p><strong>Warning!</strong> Thanks to <a href="http://docs.codehaus.org/display/GROOVY/Creating+an+extension+module">Groovy 2.0 
  extension modules</a> you can use helper method on any <code>DatastoreService</code> instance even outside groovlets or templates
  but you still have to assing the <code>DatastoreService</code> in <code>datastore</code> variable and call
  the methods on that variable to make query dsl transformation working.</p>
  <p>This is current limitation and should change in time of final Gaelyk 2.0 release.</p>
</div>

Let's show the difference between `datastore.query` and `datastore.build` methods:

*Query method example*

    Query query = datastore.query {
        from 'Comment' as Comment
        where author == 10
        sort by crate desc
        limit 10        
    }
    
    PreparedQuery pq = datastore.prepare query
    
    // The limit is gone! We need to set it again
    FetchOptions.Builder options = withLimit(10)
    
    // set the offset if there is page param specified
    if(params.page){
        options = options.offset((params.page as int) * 10)
    }
    
    def comments = pq.asList(options.build())
    
    // and we also get only entities not comments
    for(Entity e in entity){
        // which needs to be coerced manually
        Comment comment = e as Comment
        process comment
    }
    
When using `datastore.query` method a portion of query parameters where erased, expecially loosing coercion
is very confusing. On the other hand if you use `datastore.build` instead than all the information are kept.
    
*Build method example*

    QueryBuiler dsl = datastore.build {
        from 'Comment' as Comment
        where author == 10
        sort by crate desc
        limit 10
    }
    
    // set the offset if there is page param specified
    if(params.page){
        dsl.offset((params.page as int) * 10)
    }
    
    def comments = dsl.execute()
    
    // no need to coerce manually
    for(Comment in comments){
        process comment
    }




