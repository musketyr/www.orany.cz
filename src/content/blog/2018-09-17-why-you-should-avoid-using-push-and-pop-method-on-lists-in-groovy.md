---
title: "Why you should avoid using push and pop method on lists in Groovy"
date: 2018-09-17
slug: why-you-should-avoid-using-push-and-pop-method-on-lists-in-groovy
source: medium
mediumId: "76f5e14bfc5b"
---For two days, I was trying to figure out what is wrong with our project after upgrading to Groovy 2.5. First of all, I've found that…

* * *

### Why you should avoid using push and pop method on lists in Groovy

For two days, I was trying to figure out what is wrong with our project after upgrading to Groovy 2.5. First of all, I've found that `java.util.Date` extension methods are no longer part of `groovy-all` but this was quite easy as this is mentioned in the release notes.

[**The Apache Groovy programming language - Groovy 2.5 release notes**  
_Groovy is well known for its extensible compilation process. The compiler supports a compile-time metaprogramming…_groovy-lang.org](http://groovy-lang.org/releasenotes/groovy-2.5.html "http://groovy-lang.org/releasenotes/groovy-2.5.html")

The other issue was much more cryptic to discover. After numerous hours I've found out that last item of the list in some method is not being removed. When I dig deeper I found a short note for a`pop` method:

![](https://cdn-images-1.medium.com/max/800/1*Dv2IpnARGmpeaAybXHbt6Q.png)

In other words, the following piece of code is no longer true after upgrading to Groovy 2.5. By the way, using `<<` instead of push is a quite common habit.

List<String> numbers = \['one', 'two', 'three'\]  
numbers << 'four'  
// do something  
String usedToBeLast = numbers.pop()

// passes until 2.5 upgrade  
assert numbers == \['one', 'two', 'three'\]

I would say using `pop` is quite common as there was no simple shortcut to remove the last element of the list. On the other hand, `push`,`add` and `<<` were used interchangeably as they were doing the same thing.

The only valid use case is to use `push` and `pop` in a symmetrical way:

List<String> numbers = \['one', 'two', 'three'\]  
numbers.push 'four'  
// do something  
String usedToBeLast = numbers.pop()

// always passes  
assert numbers == \['one', 'two', 'three'\]

* * *
By [Vladimír Oraný](https://medium.com/@musketyr) on [September 17, 2018](https://medium.com/p/76f5e14bfc5b).

[Canonical link](https://medium.com/@musketyr/why-you-should-avoid-using-push-and-pop-method-on-lists-in-groovy-76f5e14bfc5b)

Exported from [Medium](https://medium.com) on February 15, 2026.