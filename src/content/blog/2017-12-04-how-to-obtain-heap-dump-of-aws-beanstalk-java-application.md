---
title: "How to Obtain Heap Dump of AWS Beanstalk Java Application"
date: 2017-12-04
slug: how-to-obtain-heap-dump-of-aws-beanstalk-java-application
source: medium
mediumId: "15bd5aec757d"
---In one of the previous articles I've shown you how to deploy your JAR-based Java application to AWS Beanstalk. This could be the happy…

* * *

### How to Obtain Heap Dump of AWS Beanstalk Java Application

In one of the previous articles I've shown you [how to deploy your JAR-based Java application to AWS Beanstalk](https://medium.com/@musketyr/how-to-deploy-java-application-jar-to-aws-beanstalk-with-gradle-35343337febf). This could be the happy ending but in real world obstacles appear every day. One of them is greedy memory of Java application. Luckily it is pretty simple to get a heap dump of application running on AWS Beanstalk. Only thing you need is a SSH access.

Following script will SSH to the Beanstalk server and as a user `webapp` obtain the heap dump of the application and then download it to your current directory:

Once you have the heap dump downloaded you can use any memory analyser such a [VisualVM](https://visualvm.github.io/) to discover the problem.

* * *

[**We’re Hiring**  
_Are you kick-ass fullstack or front-end dev that wants to work on AWS, Angular, Java or Groovy? You must contact us to join our dream team in Paris or Nantes_apply.workable.com](https://apply.workable.com/agorapulse/ "https://apply.workable.com/agorapulse/")[](https://apply.workable.com/agorapulse/)

By [Vladimír Oraný](https://medium.com/@musketyr) on [December 4, 2017](https://medium.com/p/15bd5aec757d).

[Canonical link](https://medium.com/@musketyr/how-to-obtain-heap-dump-of-aws-beanstalk-java-application-15bd5aec757d)

Exported from [Medium](https://medium.com) on February 15, 2026.