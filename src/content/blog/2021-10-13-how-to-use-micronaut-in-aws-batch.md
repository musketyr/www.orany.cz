---
title: "How to use Micronaut in AWS Batch"
date: 2021-10-13
slug: how-to-use-micronaut-in-aws-batch
source: medium
mediumId: "4bf2a61107"
---AWS Batch is designed to run independent tasks called jobs. Usually, the jobs are scheduled but they can also react to a vast number of…

* * *

### How to use Micronaut in AWS Batch

[AWS Batch](https://aws.amazon.com/batch/) is designed to run independent tasks called jobs. Usually, the jobs are scheduled but they can also react to a vast number of events supported by [AWS EventBridge](https://aws.amazon.com/eventbridge/), including [SNS](https://aws.amazon.com/sns/), [SQS](https://aws.amazon.com/sqs/) and [Kinesis](https://aws.amazon.com/kinesis/). AWS Batch fills the gap between always-on [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) servers and [AWS Lambda](https://aws.amazon.com/lambda/) which can also react to various events but can only span up to 15 minutes. AWS Batch gives you more control over the computing environment and also the priorities of the jobs. AWS Batch jobs are defined by Docker containers which are run when a particular event occurs.

#### Creating the AWS Batch-ready Micronaut Application

As AWS Batch executes jobs by running Docker containers, [Micronaut Command Line Application applications](https://micronaut-projects.github.io/micronaut-picocli/latest/guide/) are best suited for this purpose. You can use the following steps to generate the command line application using [Micronaut Launch](https://launch.micronaut.io).

![](https://cdn-images-1.medium.com/max/800/1*-psiIKSMRNRowxXQBAkvEA.png)

As every invocation will be a “cold start” then we should also add GraalVM capabilities to the application.

![](https://cdn-images-1.medium.com/max/800/1*UHd3m-8dpI6U2t9rhwv5Mw.png)

There is a great option to share the application to GitHub with a single click.

![](https://cdn-images-1.medium.com/max/800/1*Vbh60fm74UqPIdZERiv2Vg.png)

![](https://cdn-images-1.medium.com/max/800/1*8lTct8XInDFlnl9SmqMoBg.png)

You can also [download the application package](https://launch.micronaut.io/create/cli/com.agorapulse.micronaut-aws-batch-demo?lang=JAVA&build=GRADLE&test=JUNIT&javaVersion=JDK_11&features=graalvm&features=github-workflow-graal-docker-registry) or use the Micornaut CLI to customize the generated application:

mn create-cli-app --build=gradle --jdk=11 --lang=java --test=junit --features=graalvm,github-workflow-graal-docker-registry com.agorapulse.micronaut-aws-batch-demo

The generated application contains a guide on how to set up the publishing to the [Amazon Elastic Container Registry](https://aws.amazon.com/ecr/). You will need your access key id and your secret access key alongside the name of the repository to push. Set these values as repository secrets.

![](https://cdn-images-1.medium.com/max/800/1*9QLyvxIRYx97RoZGw6yJfA.png)

![](https://cdn-images-1.medium.com/max/800/1*3_HWIMkfbMKHnFNDNU9LeQ.png)

You also need to create a repository for the project in Amazon ECR:

![](https://cdn-images-1.medium.com/max/800/1*c6-pxZ_GVxbB0IIrF_0n2w.png)

![](https://cdn-images-1.medium.com/max/800/1*6LeZ7Lb6yh6NLS_P8pqWmA.png)

Next time you push to the repository then the GraalVM-based application image should be pushed to Amazon ECR. You can try it with two simple changes in the generated application.

First, update the command class to show that you can inject any bean and that you can simply parse any command-line arguments:

You will also need to update the test:

Then update the `build.gradle` file to fix the issue with `libstdc` by using [distroless](https://github.com/GoogleContainerTools/distroless) base image. Add the following configuration to the end of the file:

dockerfileNative {  
    baseImage('gcr.io/distroless/cc-debian10')  
}

When you push the changes to GitHub then the container should be pushed to Amazon ECR from the GitHub workflow.

![](https://cdn-images-1.medium.com/max/800/1*ITcAFgNEW5z9X4SelC45vA.png)

You can verify it in the Amazon ECR:

![](https://cdn-images-1.medium.com/max/800/1*wEx-xqja2UEmWiArE7_dDA.png)

Once the container is present in ECR then we can focus on setting up AWS Batch.

#### Creating the Job Definition in AWS Batch

Setting up AWS Batch requires some work that will not be covered in this guide. Please, follow to official guide:

[**Setting Up with AWS Batch**  
_If you've already signed up for Amazon Web Services (AWS) and have been using Amazon Elastic Compute Cloud (Amazon EC2)…_docs.aws.amazon.com](https://docs.aws.amazon.com/batch/latest/userguide/get-set-up-for-aws-batch.html "https://docs.aws.amazon.com/batch/latest/userguide/get-set-up-for-aws-batch.html")[](https://docs.aws.amazon.com/batch/latest/userguide/get-set-up-for-aws-batch.html)

Once you have your _Compute environments_ and _Job queue_ ready then you can proceed to create a new _Job definition_:

![](https://cdn-images-1.medium.com/max/800/1*tk9XbKxx4qhPVitQxwE7VA.png)

Let's call the Job definition with the same name as the application:

![](https://cdn-images-1.medium.com/max/800/1*mjqgBLvI5Gc6zdxc9tGGvA.png)

Then clear the command arguments and point the job to the image we had published from in the previous section:

![](https://cdn-images-1.medium.com/max/800/1*pYMyEgyessrKFZHgNHIojA.png)

The rest of the settings can remain unchanged:

![](https://cdn-images-1.medium.com/max/800/1*dDQPm77MYJ2y9EfK-PsqoQ.png)

Now we have our _Job description_ ready.

![](https://cdn-images-1.medium.com/max/800/1*Hpa4NvehNAXawi2fZviFjA.png)

#### Triggering the Job

The job is usually triggered by [AWS EventBridge Events](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-events.html) (a preferred replacement of [CloudWatch Events](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html)). Let's create a periodic event that will trigger the job by creating a new rule:

![](https://cdn-images-1.medium.com/max/800/1*tuCTiD1NqtlFq6BLFr474Q.png)

Start with the name of the rule and optional description:

![](https://cdn-images-1.medium.com/max/800/1*wtP0gtBR9DC1ll2Jpzqayw.png)

Then define the event pattern or schedule. Select _Schedule_ for the periodic trigger. You can display the event sample.

![](https://cdn-images-1.medium.com/max/800/1*CWjgQnke9Fb6s-AnObi4CA.png)

Next, select the _Batch job queue_ as a target with the ARN of your queue and ARN of the _Job definition_ created in a previous section. Keep the job name same as the name of the rule.

![](https://cdn-images-1.medium.com/max/800/1*MXE5xjw1JvF-QMLfWiO62w.png)

For demo purposes, let's also use the payload of the event for the job execution. We can do it by expanding the _Configure input_ section and selecting the _Input transformer_.

The first text area declares the parameter by extracting data from the payload and the second one uses the object with `[ContainerOverrides](https://docs.aws.amazon.com/batch/latest/APIReference/API_ContainerOverrides.html)` to redefine the job's command parameters. See more details [here](https://aws.amazon.com/premiumsupport/knowledge-center/batch-parameters-trigger-cloudwatch/).

![](https://cdn-images-1.medium.com/max/800/1*MKo0zb3G9QaXU1rywo1zkg.png)

The rest of the settings can remain unchanged.

![](https://cdn-images-1.medium.com/max/800/1*9tGeS0lKw_utDqAKz_NvhQ.png)

Once the even rule is created and triggered then we can see the execution in the AWS Batch _Jobs_ view.

![](https://cdn-images-1.medium.com/max/800/1*ewOfDPo1hgcy5tp80x9eMw.png)

You can check the details of the execution:

![](https://cdn-images-1.medium.com/max/800/1*KLW0rxV9F4iwdvmTI5RWFA.png)

There is a link for the logs in CloudWatch. There you can see if everything works as expected:

![](https://cdn-images-1.medium.com/max/800/1*NEh9jMFUGSFASkycXkRZ8g.png)

The timestamp has been passed from the scheduled event and the injection happened as well so the log contains the line similar to this one:

Event sent at 2021-10-12T13:15:34Z to the environments \[ec2, cloud, cli\]

* * *

This is the end of this guide. You have an up-and-running Micronaut application in AWS Batch. You can check the sources of the sample application on GitHub:

[**GitHub - musketyr/micronaut-aws-batch-demo: Micronaut Micronaut -aws -batch -demo Application**  
_Workflow file: .github/workflows/graalvm.yml For pushes to the master branch, the workflow will: Setup the build…_github.com](https://github.com/musketyr/micronaut-aws-batch-demo "https://github.com/musketyr/micronaut-aws-batch-demo")[](https://github.com/musketyr/micronaut-aws-batch-demo)

By [Vladimír Oraný](https://medium.com/@musketyr) on [October 13, 2021](https://medium.com/p/4bf2a61107).

[Canonical link](https://medium.com/@musketyr/how-to-use-micronaut-in-aws-batch-4bf2a61107)

Exported from [Medium](https://medium.com) on February 15, 2026.