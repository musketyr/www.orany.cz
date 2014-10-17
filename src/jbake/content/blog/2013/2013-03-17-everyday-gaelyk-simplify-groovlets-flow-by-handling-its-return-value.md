title=Everyday Gaelyk: Simplify flow in groovlets by handling their return values
date=2013-03-17
type=post
tags=blog, plugins, gaelyk 2.0, json, rest
status=published
~~~~~~

[Gaelyk plugin system](http://gaelyk.appspot.com/tutorial/plugins) 
allows you to define `after` hook which is called when [groovlet](http://gaelyk.appspot.com/tutorial/views-and-controllers#groovlets) 
execution is finished. Since [Gaelyk 2.0](/blog/2013/2013-03-16-everyday-gaelyk-living-on-the-edge-with-gaelyk-snapshots.html) the 
result returned from the groovlet is bound to the `after` closure so you can e.g. turn that result into the JSON response.

<!--more-->

Let say you have a groovlet serving some JSON content by id and you want to simplify it's flow.

*JSON groovlet, standard version*

     response.contentType = 'application/json'

     if(users.isUserLoggedIn){
         response.status = 401
         json(error: 'You must be logged in') 
     } else {
         // uses @Entity annotation
         Item item = Item.get(params.id as long)
         if(!item){
             response.status = 404
             json(error: 'Item not found')
         } else {
             json(id: item.id, title: item.title)
         }
     }

In fact, this example is pretty trivial but still it would be handy if we can cut off some unnecessary branching:

*JSON groovlet, version with plugin*

     // see following
     request.renderAsJson = true

     if(users.isUserLoggedIn){
         return [status: 401, error: 'You must be logged in'] 
     }

     // uses @Entity annotation
     Item item = Item.get(params.id as long)
     if(!item){
         return [status: 404, error: 'Item not found']
     }
     
     [id: item.id, title: item.title]

This can be actually quite simply accomplished by creating plugin which will render groovlet result as JSON.
You can follow [the guide on Gaelyk website](http://gaelyk.appspot.com/tutorial/plugins#anatomy).
Basically, you need a script containing the `after` handler:

*JSON renderer plugin*

    after {
        // render as json only when this attribute is set to groovy truth
        if(request.renderAsJson){
            // sets the json
	    response.contentType = 'application/json'
            // result is stored in 'result' closure variable
	    if(result instanceof Map && result?.status){
                // set the status from the status map value
	        response.status = result.remove('status') as int
	    }
            // render the result
	    JsonBuilder json = new JsonBuilder()
	    json result
	    json.writeTo(response.writer)
        }
    }

Save the script as `WEB-INF/plugins/jsonRenderer.groovy` and create another file `WEB-INF/plugins.groovy` with single line `install jsonRenderer`
and you can try it yourself in your Galeyk 2.0 application.


If you got another idea how to use result of groovlet exection in your application, please, leave a message under the post.



