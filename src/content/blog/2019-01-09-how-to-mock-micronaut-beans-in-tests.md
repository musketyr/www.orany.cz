---
title: "How to Mock Micronaut Beans in Tests"
date: 2019-01-09
slug: how-to-mock-micronaut-beans-in-tests
source: medium
mediumId: "eaba6d20de70"
---There are several options how to mock beans in your tests.

* * *

### How to Mock Micronaut Beans in Tests

![](https://cdn-images-1.medium.com/max/800/1*W8ikW5OG4YNLLhMbYcsgzg.png)

There are several options how to mock beans in your tests.

*   If you have your own stub implementation [you can use](https://docs.micronaut.io/latest/guide/index.html#replaces) `[Replace](https://docs.micronaut.io/latest/guide/index.html#replaces)` [annotation as described in the official documentation](https://docs.micronaut.io/latest/guide/index.html#replaces)
*   If you want to use some mocking library you can [use Micronaut Test library](https://micronaut-projects.github.io/micronaut-test/latest/guide/index.html)
*   You can simply register the mock bean in the application context yourself

I prefer the last option as this is a very lightweight solution and you don't have to use any external library nor you don't have to write your own stubs.

Probably in every generated test you can find the following statement somewhere:

ApplicationContext._run_(EmbeddedServer)

This is actually a simplified version of building the application context which can be expanded to a couple of following lines:

ApplicationContext  
    ._build_()                    _// create the context builder_    .build()                    _// build the context_    .start()                    _// start the context_    .getBean(EmbeddedServer)    _// obtain the server bean_    .start()                    _// run the server_

Before starting the context you can easily register the mock bean:

ApplicationContext  
    ._build_()                    _// create the context builder_    .build()                    _// build the context_    .registerSingleton(OrganizationDataService, dataService)  
    .start()                    _// start the context_    .getBean(EmbeddedServer)    _// obtain the server bean_    .start()                    _// run the server_

When the context will be asked for `OrganizationDataService` bean then it will find it already present in the context and will not instantiate the regular bean you are trying to mock.

This solution might look ugly but in many situations, you don't need to start any bean such as `EmbeddedServer`. In that case, the solution will be much simpler:

ApplicationContext ctx = ApplicationContext._build_().build()    .registerSingleton(OrganizationDataService, dataService)  
    .start()UnderTestService uts = ctx.getBean(UnderTestService)

* * *

[**We’re Hiring**  
_Are you kick-ass fullstack or front-end dev that wants to work on AWS, Angular, Java or Groovy? You must contact us to join our dream team in Paris or Nantes_apply.workable.com](https://apply.workable.com/agorapulse/ "https://apply.workable.com/agorapulse/")[](https://apply.workable.com/agorapulse/)

By [Vladimír Oraný](https://medium.com/@musketyr) on [January 9, 2019](https://medium.com/p/eaba6d20de70).

[Canonical link](https://medium.com/@musketyr/how-to-mock-micronaut-beans-in-tests-eaba6d20de70)

Exported from [Medium](https://medium.com) on February 15, 2026.