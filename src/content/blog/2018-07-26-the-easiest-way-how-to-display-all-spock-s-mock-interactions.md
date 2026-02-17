---
title: "The Easiest Way How to Display All Spock's Mock Interactions"
date: 2018-07-26
slug: the-easiest-way-how-to-display-all-spock-s-mock-interactions
source: medium
mediumId: "becd8fc50a88"
---When I'm writing Spock's specifications for legacy code I usually want to see all the interactions with mock objects happening during the…

* * *

### The Easiest Way How to Display All Spock's Mock Interactions

When I'm writing [Spock's](http://spockframework.org/) specifications for legacy code I usually want to see all the interactions with mock objects happening during the test execution. I can use `0 * _` to verify no interactions happen but it will not print all the interactions but just the first unexpected one. For that reason, I've started to use a simple trick:

1.  Create a mock of some simple Java interface such as `Runnable`
2.  Verify the interface method was called e.g. `1 * runnable.run()` inside the `when:` block
3.  You can see all the unmatched interactions
4.  Add all the unmatched interactions you want to verify
5.  Delete the mock and the verification

Here is a complete example:

```groovy
import spock.lang.Specification

class MySpec extends Specification {

    Runnable runnable = Mock(Runnable)

    _// ... other mocks and setup_        void 'my test'() {
        when:
            _// my service call_        then:
            1 \* runnable.run()
    }

}
```


* * *


