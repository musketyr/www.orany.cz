---
title: "Let Your Groovy Code Remember Your Sins"
date: 2018-06-14
slug: let-your-groovy-code-remember-your-sins
source: medium
mediumId: "7faf4e53dd7c"
---There are many situations when you write a code that makes you not particularly happy e.g. when you are under time pressure or it is…

* * *

### Let Your Groovy Code Remember Your Sins

There are many situations when you write a code that makes you not particularly happy e.g. when you are under time pressure or it is supposed to be just a temporary solution like migration of the database or a April prank. You can add a `TODO` to revisit the code later but you know you will very likely never do it. For these situations there is `[@Remember](https://github.com/agorapulse/remember)` annotation.

`[@Remember](https://github.com/agorapulse/remember)` is an annotation which helps you not to forget any temporary solution (aka hacks or quick wins) you have introduced into your code base. You specify the date in the future when you want to revisit the code, e.g. `@Remember('2018-04-02')`. After this date the code no longer compiles forcing you to re-evaluate if the code is still required or to find more permanent solution.

There is an extended notation for `[@Remember](https://github.com/agorapulse/remember)`:

```
import com.agorapulse.remember.Remember@Remember(    value = '2019',     description = 'This method should be already removed',     format = 'yyyy')   class Subject { }
```

You can modify the format of the date `value` by setting `format` property of the annotation. You can customise the message being shown by using `description` property.

`[@Remember](https://github.com/agorapulse/remember)` can be applied to any annotated element such as class, method or method parameter. You can add `[@Remember](https://github.com/agorapulse/remember)` annotation to you project using `jcenter`:

repositories { jcenter() }  
dependencies { compile 'com.agorapulse:remember:0.1' }

* * *

[**We’re Hiring**  
_Are you kick-ass fullstack or front-end dev that wants to work on AWS, Angular, Java or Groovy? You must contact us to join our dream team in Paris or Nantes_apply.workable.com](https://apply.workable.com/agorapulse/ "https://apply.workable.com/agorapulse/")[](https://apply.workable.com/agorapulse/)

By [Vladimír Oraný](https://medium.com/@musketyr) on [June 14, 2018](https://medium.com/p/7faf4e53dd7c).

[Canonical link](https://medium.com/@musketyr/let-your-groovy-code-remember-your-sins-7faf4e53dd7c)

Exported from [Medium](https://medium.com) on February 15, 2026.