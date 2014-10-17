title=Everyday Gaelyk: More readable routes with optional path parameters
date=2013-03-16
type=post
tags=blog,gaelyk 2.0, routes
status=published
~~~~~~

At the time of writing, the original [Gaelyk documentation](http://gaelyk.appspot.com/tutorial/url-routing) 
still contains the verbose way how to define following routes with optional path variables.
[Gaelyk 2.0](/blog/2013/2013-03-16-everyday-gaelyk-living-on-the-edge-with-gaelyk-snapshots.html) helps you
to get rid of lot of boilerplate routes definition.

<!--more-->

*Current approach to define optional path variables*

    get "/article/@year/@month/@day/@title", 
        forward: "/article.groovy?year=@year&month=@month&day=@day&title=@title"
    get "/article/@year/@month/@day",        
        forward: "/article.groovy?year=@year&month=@month&day=@day"
    get "/article/@year/@month",             
        forward: "/article.groovy?year=@year&month=@month"
    get "/article/@year",                    
        forward: "/article.groovy?year=@year"
    get "/article",                          
        forward: "/article.groovy"

### Defining Optional Path Variables in Gaelyk 2.0

As soon as Gaelyk 2.0 is released
you can save a lot of typing, because adding a question mark `?` at the end of path variable definition such as `@title`
has the same effect multiple declaring the multiple routes as described above.

*New way to define optional path variables*

    get "/article/@year?/@month?/@day?/@title?", forward: "/article.groovy"

If the path variable is present it is appended as `path_variable_name=@path_variable_name` to destination specified in `forward` or `redirect`
definition e.g. `/article/2013` is forwarded to `/article.groovy?year=2013`. 

### Handling trailing slashes

If the route defined ends with slash, all the routes matched must
ends with slash and vice versa, e.g. `/article/2013` will match the route above but `/article/2013/` won't because the route does not end
with slash.


### Mixing optional and required path variables

Of course there is no need to have all the parameters optional. For example, we can make `year` required:

*Mixed optional and required path variables*

    get "/article/@year/@month?/@day?/@title?", forward: "/article.groovy"


### Making Path Variables Sticky

Sometimes you want to have some path variable recognized even if the previous are mising. For example, you want to be able to specify paging using `@page`
path variable, which itself is optional as well the other path variables. You can do this by assigning the path variable unique prefix like `page-`
as in following examples. Take a note you can have multiple path variables with prefixes as long as the prefixes are unique. Also routes are 
handled as special type of regular expressions so you can use some features like `[io]n` to specify that the prefix might be either `in` or `on`.

*Sticky path variable*

    get "/article/@year?/@month?/@day?/@title?/page-@page?/[io]n-@tag", forward: "/article.groovy"

This route will match following situations and many others:

*Sticky path variable usage*

    /article/in-groovy               => /article.groovy?tag=groovy
    /article/page-1                  => /article.groovy?page=1
    /article/2013/page-2/on-groovy   => /article.groovy?year=2013&page=2&tag=groovy
    /article/2013/03/16              => /article.groovy?year=2013&month=03&day=16



