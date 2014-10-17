title=Everyday Gaelyk: Adding methods to groovlets and templates
date=2013-03-15
type=post
tags=blog,gaelyk 2.0, groovlets, templates
status=published
~~~~~~

Since [Gaelyk 2.0](/blog/2013/2013-03-16-everyday-gaelyk-living-on-the-edge-with-gaelyk-snapshots.html) is build on the top of [Groovy 2.1 branch](http://groovy.codehaus.org/Groovy+2.1+release+notes), 
you can use [extension modules](http://docs.codehaus.org/display/GROOVY/Creating+an+extension+module) to add useful methods to particular classes.
As all [groovlets](http://groovy.codehaus.org/Groovlets) and [templates](http://groovy.codehaus.org/Groovy+Templates) are basically scripts, 
all of them extend `groovy.lang.Script` class. 
Every method added to `groovy.lang.Script` will be available in your groovlets and templates as well as other scripts and can be easily used
nearly as easy as Grails tags.

<!--more-->

## Simple Method

If you create simple extension class like following

*Extension class*

    package cz.orany.vladimir.gaelyk
    
    class GroovyTemplatesExtensions {
    
        static String helloWorld(Script self) { "Hello World" }
    }

and register it in `org.codehaus.groovy.runtime.ExtensionModule` file in the `META-INF/services` directory

*Extension module descriptor*

    moduleName=gaelyk-scripts-module
    moduleVersion=1.0
    extensionClasses= cz.orany.vladimir.gaelyk.GroovyTemplatesExtension
    staticExtensionClasses=

you will be able to call the method from your template, e.g. `test.gtpl`

*Example template*

    <html>
       <head><title>Test hello</title></head>
       <body>${helloWorld()}</body>
    </html>

## Advanced tag-like method

Of course you can create more sofisticated methods which be close to [Grails tags](http://grails.org/doc/latest/guide/theWebLayer.html#6.3+Tag+Libraries).

*Secured 'tag'*

    <% secured { %>
         <p>This is only visible when the user is signed in</p>
    <% } %>


The usage is really simple, the implementation isn't difficult either. You basically write same code as you would write in the template:

*Method implementation*

    static void secured(Script self, Closure body) {
        self.with {
            if(users.userLoggedIn){
                body()
            }
        }
    }

The core trick is using the context of current script by calling `self.with` method. In that case you get simply access to all the bindings available
in the script itself.
