---
title: "Code Smell: Variable Initialized inside If-Else Conditional Block"
date: 2019-07-08
slug: code-smell--variable-initialized-inside-if-else-conditional-block
source: medium
mediumId: "33e190ff0bbc"
---Time to time I find a code with the uninitialized variable declaration before if-else or if-elseif-else statements where the variable is…

* * *

### Code Smell: Variable Initialized Inside If-Else Conditional Block

![](https://cdn-images-1.medium.com/max/800/1*LuiPdfyG4_PHIJ-Hj4K_rA.png)

Time to time I find a code with the uninitialized variable declaration before if-else or if-elseif-else statements where the variable is initialized inside the conditional blocks. See the typical example with the full name:

Original Method

Quite often the conditional blocks are even larger giving the developer even less chance to understand what will be the value of the variable after evaluation. There is a very simple solution to this situation which is moving the code inside a separate method:

Extracted Method to Get the Full Name

As we call all the methods on the `Person` object the method should actually belong to the `Person` object:

Method Moved into Person Class

And last but not least as no code is executed after the return statement we can reduce the complexity even more:

Method Using Early Returns to Simplify Conditions

#### **References**

This topic, especially the last part, is obviously a part of [religious wars](https://hackerchick.com/religious-war-48293-single-vs-multiple/). The refactorings made above are based on [Martin Fowler's refactorings](https://refactoring.com/catalog/):

[**Replace Nested Conditional with Guard Clauses**  
_Edit description_refactoring.com](https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html "https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html")[](https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html)

[**Replace Temp with Query**  
_Edit description_refactoring.com](https://refactoring.com/catalog/replaceTempWithQuery.html "https://refactoring.com/catalog/replaceTempWithQuery.html")[](https://refactoring.com/catalog/replaceTempWithQuery.html)

You can also inspect a couple of related articles:

[**Local Variables Are Evil (or Just Irritating) - DZone**  
_Every now and then, I reread parts of Refactoring by Martin Fowler. The main reason is of course to look for…_dzone.com](https://dzone.com/articles/local-variables-are-evil-or "https://dzone.com/articles/local-variables-are-evil-or")[](https://dzone.com/articles/local-variables-are-evil-or)

[**Where did the notion of "one return only" come from?**  
_I often talk to programmers who say " Don't put multiple return statements in the same method." When I ask them to tell…_softwareengineering.stackexchange.com](https://softwareengineering.stackexchange.com/questions/118703/where-did-the-notion-of-one-return-only-come-from "https://softwareengineering.stackexchange.com/questions/118703/where-did-the-notion-of-one-return-only-come-from")[](https://softwareengineering.stackexchange.com/questions/118703/where-did-the-notion-of-one-return-only-come-from)

* * *

[**We’re Hiring**  
_Are you kick-ass fullstack or front-end dev that wants to work on AWS, Angular, Java or Groovy? You must contact us to join our dream team in Paris or Nantes_apply.workable.com](https://apply.workable.com/agorapulse/ "https://apply.workable.com/agorapulse/")[](https://apply.workable.com/agorapulse/)

By [Vladimír Oraný](https://medium.com/@musketyr) on [July 8, 2019](https://medium.com/p/33e190ff0bbc).

[Canonical link](https://medium.com/@musketyr/code-smell-variable-initialized-inside-if-else-conditional-block-33e190ff0bbc)

Exported from [Medium](https://medium.com) on February 15, 2026.