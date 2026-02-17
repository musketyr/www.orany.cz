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
[refactoring.com](https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html)

[**Replace Temp with Query**  
[refactoring.com](https://refactoring.com/catalog/replaceTempWithQuery.html)

You can also inspect a couple of related articles:

[**Local Variables Are Evil (or Just Irritating) - DZone**  
[dzone.com](https://dzone.com/articles/local-variables-are-evil-or)

[**Where did the notion of "one return only" come from?**  
[softwareengineering.stackexchange.com](https://softwareengineering.stackexchange.com/questions/118703/where-did-the-notion-of-one-return-only-come-from)

* * *


