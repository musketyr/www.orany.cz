---
title: "Scaling up into the Cloud — Agorapulse Micronaut Journey"
date: 2025-01-07
slug: scaling-up-into-the-cloud---agorapulse-micronaut-journey
source: medium
mediumId: "c721a1018933"
---Agorapulse is the go-to social media management platform for ROI-drive marketing teams, empowering them to boost brand recognition…

* * *

### Scaling up into the Cloud — Agorapulse Micronaut Journey

[_Agorapulse_](https://www.agorapulse.com/) _is the go-to social media management platform for ROI-drive marketing teams, empowering them to boost brand recognition, generate leads, and track results. Our journey with_ [_Micronaut_](https://micronaut.io/) _started in 2018 when it was the only framework lightweight enough to run in_ [_AWS Lambda_](https://aws.amazon.com/pm/lambda/) _serverless environment. We trusted the team behind the framework as they already created the_ [_Grails framework_](https://grails.org) _we were using to build our applications. We expected they would provide the same amazing developer experience and they would be able to build the same open and friendly community that Grails have.The beginning of 2025 is an important milestone for our technology stack as we finally transitioned all of our applications from Grails to Micronaut, currently counting more than 100 of serverless functions and more than 50 server applications. Good interoperability between these two frameworks allowed us to slowly migrate step by step from Grails to Micronaut and finally to switch to the latest technologies available._

![](https://cdn-images-1.medium.com/max/800/1*fE1CvQJYOhRj6JOG4V3_TA.png)

Agorapulse’s start-up success was built upon Grails framework that allowed us to focus on our users and develop new features rapidly even with only a handful of developers. Sadly, with the rise of single page applications and cloud computing we reached the limits of the framework. The start up times became too long and the rapid application development features were less important as the frontend had to be developed separately anyway.

In early 2018, we started experimenting with the brand new AWS Lambda API Gateway service. The serverless was emerging but there was no Java framework capable of starting in a milliseconds so we stepped back to poor-man’s dependency injection — hand wiring the services by constructors in AWS Lambda handlers.

In March 2018, I was attending the Greach conference in Madrid, where [the new framework called Micronaut](https://www.youtube.com/watch?v=HTUumoh7lWE&list=PLXcHRe1w86Ec6siWdhE5yuKNrUGgf7oy-&index=6) was introduced by the creators of Grails, including the founder Graeme Rocher. It provided the base for everything we needed for our serverless API project and soon after, at the end of June 2018, we released our first functions based on Micronaut 1.0.0.M1.

[**Micronaut: The Missing Part**  
_With great expectations may come also great disappointments. When I have first seen Micronaut it looked like a silver…_musketyr.medium.com](https://musketyr.medium.com/micronaut-the-missing-part-a92e99bb6bdf "https://musketyr.medium.com/micronaut-the-missing-part-a92e99bb6bdf")[](https://musketyr.medium.com/micronaut-the-missing-part-a92e99bb6bdf)

In July 2019, [Grails 4 was released](https://grails.org/blog/2019-07-11.html) with out-of-the-box integration with Micronaut. This sparkled the new wave of innovations. Agorapulse was always giving back to the community and we already have many Grails plugins open-sourced. All of these were migrated to Micronaut and created the base of [our Micronaut OSS libraries](https://agorapulse.github.io/agorapulse-oss/#_micronaut_libraries), probably the largest collection of Micronaut 3rd-party libraries out there. The same process was happening behind the scenes. Many libraries were extracted from our applications and logic was shared between servers and serverless applications.

In the middle of 2021, the final decision was made to no longer invest into our Grails applications. I have written [a series of articles](https://medium.com/agorapulse-stories/goodbye-grails-hello-micronaut-0-introduction-ff7470cecf9d) that can help anyone perform the same migration as we were planning. Whereas all new development happened in Micronaut, it took yet another four years to finally decommission the last Grails application.

[**Goodbye Grails, Hello Micronaut #0: Introduction**  
_This is the introductory post in a series that will guide you through the migration from Grails to Micronaut. This…_medium.com](https://medium.com/agorapulse-stories/goodbye-grails-hello-micronaut-0-introduction-ff7470cecf9d "https://medium.com/agorapulse-stories/goodbye-grails-hello-micronaut-0-introduction-ff7470cecf9d")[](https://medium.com/agorapulse-stories/goodbye-grails-hello-micronaut-0-introduction-ff7470cecf9d)

Micronaut fully met our expectations. The framework is still very active, and many team members found its new home in [Oracle Labs GraalVM Team](https://labs.oracle.com/pls/apex/f?p=94065:12:105264827271971:47). This sends a strong message that the development will not be discontinued in the near future. There is also a friendly, vibrant community on [Discord](https://discord.com/invite/9xRFsHv98T). Although new competitors such as [Quarkus](https://quarkus.io/) emerged over the years and [Spring Framework](https://spring.io/) is steadily working on removing all the bottlenecks that led to Micronaut’s creation, Micronaut remains our number one framework as it doesn’t force us to learn new libraries as Quarkus does, and the performance improvements generally do not require additional work like [Spring Ahead-of-Time](https://docs.spring.io/spring-framework/reference/core/aot.html) optimizations.

By [Vladimír Oraný](https://medium.com/@musketyr) on [January 7, 2025](https://medium.com/p/c721a1018933).

[Canonical link](https://medium.com/@musketyr/scaling-up-into-the-cloud-agorapulse-micronaut-journey-c721a1018933)

Exported from [Medium](https://medium.com) on February 15, 2026.