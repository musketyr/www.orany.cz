---
title: "How to Deploy Java Application JAR to AWS Beanstalk with Gradle"
date: 2017-11-09
slug: how-to-deploy-java-application-jar-to-aws-beanstalk-with-gradle
source: medium
mediumId: "35343337febf"
---A long time ago, deploying WAR files to Tomcat was the only Java option for Elastic Beanstalk. Nowadays, you can run whatever application…

* * *

### How to Deploy Java Application JAR to AWS Beanstalk with Gradle

A long time ago, deploying WAR files to Tomcat was the only Java option for [Elastic Beanstalk](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html). Nowadays, you can run whatever application you want if you can wrap it into Docker. For Java applications this could be an overkill as running from a JAR is supported out of the box.

![](https://cdn-images-1.medium.com/max/800/1*ZG1kwDDzFAvm1BGrFKtgxQ.png)

There are plenty of JVM frameworks which supports running from a JAR. For example:

*   [Spring Boot](https://projects.spring.io/spring-boot/)
*   [Grails 3](https://grails.org/)
*   [Vert.x](http://vertx.io/)
*   [Ratpack](https://ratpack.io/)

There is also easy to use [Gradle Beanstalk Plugin](https://github.com/EvidentSolutions/gradle-beanstalk-plugin) which currently is a bit misleading as on the first sight it may look it is only capable of deploying WAR files. Here is an excerpt of configuration from the README:

```
plugins {    id "fi.evident.beanstalk" version "0.1.1"}beanstalk {    s3Endpoint = "s3-eu-west-1.amazonaws.com"    beanstalkEndpoint = "elasticbeanstalk.eu-west-1.amazonaws.com"    deployments {        // Example to deploy to the same env        staging {            war = tasks.war            application = 'my-app'            environment = 'my-app-staging'        }    }}
```

Luckily the `war` configuration property accepts anything you can pass to `Project.file(Object)` method. The actual behaviour depends on the platform which you have selected when you have created the environment (or the environment template).

Frameworks distributing applications as JAR usually already provides Gradle tasks for bundling applications to single archive such as `bootRepackage` or `shadowJar` so you can use them instead of `war` task:

```
staging {    war = tasks.shadowJar    application = 'my-app'    environment = 'my-app-staging'}
```

Now you can only run `deployStaging` to deploy your application to Beanstalk.

You may not see the result immediately after deployment as by default Beanstalk listens on port `5000`. You have to set the actual port as environment variable `PORT` in _Configuration / Software Configuration_. You can also add a [configuration file](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html) to your deployment so you don't have to update the port manually from the UI for each new environment. Create file `env.config` in directory `src/main/eb`:

option\_settings:  
  aws:elasticbeanstalk:application:environment:  
    PORT: 8080 # application port

Then you can create simple `Zip` task to create an application archive:

task beanstalkArchive(type: Zip, dependsOn: jar) {  
    from 'src/main/eb'  
    from tasks.shadowJar  
}

And update your deployment configuration:

```
staging {    war = tasks.
```

Another use case for deploying JAR inside ZIP archive could be that your application requires running the application with some flags. In that case, you have to create a file called `Procfile` inside `src/main/eb` directory containing the full `java` command with all argument:

web: java -jar application.jar -Dwhatever=anything

It is important to keep the name of the application `web` as you can actually run more than one application using `Procfile`. It also requires that your JAR file has immutable name which can be easily achieved setting the `archiveName` on the `Jar` task e.g.

shadowJar {  
    archiveName = 'application.jar'  
}

* * *

[**We’re Hiring**  
_Are you kick-ass fullstack or front-end dev that wants to work on AWS, Angular, Java or Groovy? You must contact us to join our dream team in Paris or Nantes_apply.workable.com](https://apply.workable.com/agorapulse/ "https://apply.workable.com/agorapulse/")[](https://apply.workable.com/agorapulse/)

By [Vladimír Oraný](https://medium.com/@musketyr) on [November 9, 2017](https://medium.com/p/35343337febf).

[Canonical link](https://medium.com/@musketyr/how-to-deploy-java-application-jar-to-aws-beanstalk-with-gradle-35343337febf)

Exported from [Medium](https://medium.com) on February 15, 2026.