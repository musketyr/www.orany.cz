---
title: "In that case, you are trying a wrong way."
date: 2018-09-14
slug: in-that-case--you-are-trying-a-wrong-way-
source: medium
mediumId: "8f0d6c2baa2"
---I guess you wanted to tell me something like: It is a good practice to keep the communication logic separated from your code as this is a…

* * *

In that case, you are trying a wrong way. Your responses are not helpful at all. It is a big difference if you say to a kid _OMG! You are still crossing street here??? You can be hit by a car! They are going so fast!_ or to explain what's wrong and give an advice _It is dangerous to cross here as the cars go very fast. There is a pedestrian crossing 50m away. Go there, push the button and wait for a green light. Make sure the cars really stop and then you can cross safely._ Just saying something is bad does not help anyone.

I guess you wanted to tell me something like: _It is a good practice to keep the communication logic separated from your code as this is a cross-cutting concern spanning multiple applications. You can use for example AWS API Gateway to separate it and keep your code clean of any HTTP interactions._

And then I can happily answer you: _Micronaut doesn't force you to use the HTTP server provided. The core of Micronaut is blazing-fast dependency injection container which can be used as well as for building functions for AWS Lambda. Then you can separate your communication logic in AWS API Gateway and keep your code free of any. I believe you would be able to integrate it into your BeAPI framework as well._

On the other hand in many use cases, people are not building new Netflix. I'm quite happy with hiding cross-cutting concerns into shared libraries hiding behind AOP for smaller projects.

Over and out, V

By [Vladimír Oraný](https://medium.com/@musketyr) on [September 14, 2018](https://medium.com/p/8f0d6c2baa2).

[Canonical link](https://medium.com/@musketyr/in-that-case-you-are-trying-a-wrong-way-8f0d6c2baa2)

Exported from [Medium](https://medium.com) on February 15, 2026.