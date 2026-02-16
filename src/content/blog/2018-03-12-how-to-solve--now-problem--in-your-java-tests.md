---
title: "How to solve “now problem” in your Java tests"
date: 2018-03-12
slug: how-to-solve--now-problem--in-your-java-tests
source: medium
mediumId: "7c7f4a6d703c"
---I sincerely believe that every time you use new Date() or System.currentTimeMillis() in your code then a kitten is killed. Or a cute puppy…

* * *

### How to solve “now problem” in your Java tests

I sincerely believe that every time you use `new Date()` or `System.currentTimeMillis()` in your code then a kitten is killed. Or a cute puppy. You actually kill two of these if you use `new Date()` as it uses `System.currentTimeMillis()` internally. But how to determine `now` in your Java code in the way the test will be easily testable?

[Joda Time](http://www.joda.org/joda-time/) was an answer to half-baked `java.util.Date` and its siblings in JDK prior Java 8. It also became a blueprint for new `java.time` package which is much better than it's successors. But one important part has vanished. In [Joda Time](http://www.joda.org/joda-time/) every reference to `now` such as `Instant.now()` or `LocalDateTime.now()` goes through `DateTimeUtils.currentTimeMillis()` which returns a current time in milliseconds which can be (contrary to `System.currentTimeMillis()`) overridden in your tests using `DateTimeUtil.setCurrentTimeMillisFixed(long)`.

When I was trying to find out why this useful feature disappeared during the migration to JDK I've found an answer which more or less explains that static methods are evil and that's the reason why JDK implementation in `java.time` package relies on `Clock` object which can be passed to every `now(Clock)` method instead. So the idea is that any method dealing with temporal values should have an instance of `Clock` as a parameter. Nevertheless, this would look great written in any academic paper but in a day-to-day life, it makes the new `java.time` API useless for referring to the current time.

So what is the solution? If you were using [Joda Time](http://www.joda.org/joda-time/) already you should probably just stick with it. If you want to use Java 8 `java.time` API you end up with similar static holder such as following:

**class** Now {  
  
    **private static** ThreadLocal<Clock> _clock_ \=  
            ThreadLocal._withInitial_(Clock::_systemUTC_);  
  
    **public static void** setClock(Clock clock) {  
        Now._clock_.set(clock);  
    }  
  
    **public static** Instant instant() {  
        **return** Instant._now_(_clock_.get());  
    }  
  
    _// ...  
_}

Next time it would be great if JCP would take into account also the testability not just the pure academic point of view.

* * *
By [Vladimír Oraný](https://medium.com/@musketyr) on [March 12, 2018](https://medium.com/p/7c7f4a6d703c).

[Canonical link](https://medium.com/@musketyr/how-to-solve-now-problem-in-your-java-tests-7c7f4a6d703c)

Exported from [Medium](https://medium.com) on February 15, 2026.