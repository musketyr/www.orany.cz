title=Everyday Gaelyk: Handling input parameters gracefully
date=2013-03-16
type=post
tags=blog, gaelyk 2.0, groovlets, templates, params
status=published
~~~~~~

The `params` object added to [groovlets](http://groovy.codehaus.org/Groovlets) and [templates](http://groovy.codehaus.org/Groovy+Templates) has one
very enpleasant feature that it either contains values of type `String` or `String[]` depending on how many parameters were submitted. In
[Gaelyk 2.0](/blog/2013/2013-03-16-everyday-gaelyk-living-on-the-edge-with-gaelyk-snapshots.html) is now handling parameters much easier.

<!--more-->

Prior Gaelyk 2.0 following unpleasant situation may occur:

*Problems with params prior Gaelyk 2.0*

    // query = ?tag=one&tag=two
    params.tag == ['one','two'] as String[]
    // this is ok
    params.tag.collect { it } == ['one', 'two']

    // query = ?tag=one
    params.tag == 'one'
    // oops, String.each iterates over characters
    params.tag.collect { it } == ['o', 'n', 'e']

    // query = ?limit=100
    params.limit == '100'
    params.limit as int == 100
    
    // query = ?limit=100&limit=200
    params.limit == ['100', '200'] as String[]
    try {
        params.limit as int
        assert false
    } catch(ClassCastException e) {
        // cannot cast String[] to int
        assert true
    }

These casts are now safe in Gaelyk 2.0.

*Safe parameters handling in Gaelyk 2.0*

    // query = ?tag=one&tag=two
    params.tag == ['one','two'] as String[]
    // this is ok
    params.tag.collect { it } == ['one', 'two']

    // query = ?tag=one
    params.tag == 'one'
    // oops, String.each iterates over characters
    params.tag.collect { it } == ['o', 'n', 'e']
    // use as String[] to ensure having String array
    (params.tag as String[]).collect { it } == ['one']

    // query = ?limit=100
    params.limit == '100'
    params.limit as int == 100
    
    // query = ?limit=100&limit=200
    params.limit == ['100', '200'] as String[]
    // first value is taken on cast to single value (not array or collection)
    params.limit as int == 100

Simply said use `as String[]` on values from `params` whenever you expect multiple values and `as <type supported by String.asType() or String>` if you expect single value.


