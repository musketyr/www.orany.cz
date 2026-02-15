---
title: "Interesting that you're not the only one mentioning this."
date: 2018-07-27
slug: interesting-that-you-re-not-the-only-one-mentioning-this-
source: medium
mediumId: "d8c9d46b76bc"
---This one compiles event with @CompileStatic.

* * *

Interesting that you're not the only one mentioning this. But aren't most of the variables' declarations inside methods? This would break the rule completely. The problem is that for example `String` acts very weird in Groovy and also there is a big problem with reassignment. See for example this piece of code:

@groovy.transform.CompileStatic  
static String aMethod() {       
    def r = 'a string'       
    System.out.println "result is now ${r.getClass()}"       
    // code       
    r = \[trash: 'bin'\]       
    // code       
    System.out.println "result is now ${r.getClass()}"       
    return r   
}    
  
println "r: ${aMethod()}"​

This one compiles event with `@CompileStatic`.

See the full Twitter thread for more details.

> [](https://twitter.com/MeneDev/status/1022726364783435776)

By [Vladimír Oraný](https://medium.com/@musketyr) on [July 27, 2018](https://medium.com/p/d8c9d46b76bc).

[Canonical link](https://medium.com/@musketyr/interesting-that-youre-not-the-only-one-mentioning-this-d8c9d46b76bc)

Exported from [Medium](https://medium.com) on February 15, 2026.