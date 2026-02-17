---
title: "Four Phases to Accomplish before Open Sourcing Your Tool"
date: 2017-10-08
slug: four-phases-to-accomplish-before-open-sourcing-your-tool
source: medium
mediumId: "821d83e60a8d"
---We have recently open-sourced two testing support tools Data Reconstruction Utility (Dru) and Groovy HTTP Testing Framework (Gru). Each of…

* * *

### Four Phases to Accomplish before Open Sourcing Your Tool

We have recently open-sourced two testing support tools [Data Reconstruction Utility (Dru)](https://agorapulse.github.io/dru/) and [Groovy HTTP Testing Framework (Gru)](https://agorapulse.github.io/gru/). Each of the tools went through following 4 phases before becoming available to general public:

1.  Internal Incubation
2.  Extraction
3.  Documentation
4.  Reunion

I believe accomplishing all of these phases dramatically increase the usability of the tool immediately after first public release and it also helps your team to use the tool internally.

### 1\. Internal incubation

Barely any framework is created from scratch. At the beginning, there is a use case which needs to be covered. For example, before creating [Dru](https://agorapulse.github.io/dru/) we were lacking good support for creating real-life test data.

The Internal Incubation phase is not too different to any other day to day coding. You pick a problem and you're looking for a solution. If you feel that you are building a reusable piece of code which can be extracted to separate tool then it is good to start to concentrate new code within your code base inside the destination package from the beginning so you don’t have to change anything when the code gets extracted. For [Dru](https://agorapulse.github.io/dru/), I have picked `com.agorapulse.dru` package and start creating the core classes.

It is crucial that you have all the use cases covered with tests within your code base. I had a general test to prepare very complex data for many tests and two controller test which drive me through the implementation for about three weeks. The point is to keep the tool internally until you feel there are no more features to add.

### 2\. Extraction

Once you feel confident with the feature set you can move your tool to separate repository. Now you are facing another problem. Your tests are gone as they usually heavily rely on your internal code base. On the other hand, you can use many tools such as [Travis CI](https://travis-ci.org/), [Coveralls](https://coveralls.io/) and [Bintray](https://bintray.com/) for free once the code of the tool is open sourced.

Extraction phase for me usually consist from following steps:

1.  Create [Gradle multi-project](https://docs.gradle.org/4.1/userguide/multi_project_builds.html)
2.  Copy the original sources into particular subprojects
3.  Apply static analysis tools such as [Checkstyle](http://checkstyle.sourceforge.net/) and [Codenarc](http://codenarc.sourceforge.net/)
4.  Setup [Travis CI](https://travis-ci.org/) to run tests and static analysis continuously
5.  Setup [Coveralls](https://coveralls.io/)
6.  Try to achieve 100% line coverage

If you don't have static analysis enforced in the original internal repository the first amount of improvement comes with fixing the code style violation.

The most value is added by trying to achieve 100% coverage. You may not reach it but at least you will think about each line of the code if it makes sense. You may find a dead code which was introduced in the very beginning of the development process or a code which was put there _just to be sure_ for situations which never occur. You can also discover new bugs which were hidden when you were testing from a higher level of abstraction in your original code base. For example, with [Dru](https://agorapulse.github.io/dru/), I have discovered a bug in [DynamoDB mapper](https://agorapulse.github.io/dru/#_dynamodb) pagination which duplicated the limit item in a list. I haven't noticed it before as there were plenty of items in the list but when I have written more fine-grained test the problem becomes obvious.

### 3\. Documentation

I like to use [Asciidoctor](http://asciidoctor.org/) for the documentation not just because it is easy to write code samples there but primarily that it allows you to include existing files into documentation. You can include the sample code and tests directly into the documentation. I've started to implement a rule that every line of code in the documentation should be originated from a source file and should be properly tested.

In this phase, you are yourself becoming the user of your new tool. You have to create use cases simple enough to explain your tool usage bit by bit. And time to time you figure out that your own assumptions about your tool were wrong.

[Dru](https://agorapulse.github.io/dru/) has a [POJO](https://agorapulse.github.io/dru/#_pojo) client which can bind test data to any Plain Old Java Object structure. While documenting some of the simple features I discovered that it cannot bind any association-like structures (e.g. `Author` of the `Book` or `Set<Book>` inside `Library` class) unless you explicitly map which forces the user to explicitly map something which is already declared in the class metadata.

Another source of tool's improvements is documentation of exceptions and limitations. It didn't happen to me with [Dru](https://agorapulse.github.io/dru/) or [Gru](https://agorapulse.github.io/gru/) but I have already faced this many times before. Before you try to explain why something does not work it might be easier to either fix it or implement the missing expected feature.

### 4\. Internal Replacement

Once the _Extraction_ and _Documentation_ are finished the time has come to replace the original source code in your internal project with the library one. If you have followed the rule and already started to work in the destination package it then this phase should be rather simple.

1.  Delete the original code in seed codebase
2.  Publish the tool into local or snapshot repository
3.  Make the seed codebase using the published tool
4.  Rerun all the original tests

Some of the original tests may fail. If you are lucky the new failures are caused by fixing bugs which were hidden in the original sources but become more obvious in _Extraction_ and _Documentation_ phases. Like the issue with list pagination mentioned above. You may also find new bugs which were introduced. For example, [Dru POJO](https://agorapulse.github.io/dru/#_pojo) client was not handling primitive types properly as it started to evaluate them as entities but as the original code base, as well as the extracted one, were covered with tests properly it was very easy to fix.

#### 5\. Release

Once you finish all the previous phases you are more confident to release tool to everyone. You know that all the examples from the documentation are really working and code base is as compact as possible. You have created a tool which can help people without causing too much headache and which can grow easily as all the original use cases are covered by tests.

* * *


