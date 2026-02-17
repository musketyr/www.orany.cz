---
title: "How to Support Secured Connections inside Micronaut’s GraalVM"
date: 2019-10-16
slug: how-to-support-secured-connections-inside-micronaut-s-graalvm
source: medium
mediumId: "730800d2ed03"
---Micronaut has great out-of-box support for GraalVM. I've tried a simple task to create a Micronaut function to be handled by Amazon API…

* * *

### How to Support Secured Connections inside Micronaut’s GraalVM

![](https://cdn-images-1.medium.com/max/800/1*v3CgDzRaJZyJ8yR4yBqW_A.jpeg)

[Micronaut](https://micronaut.io) has great out-of-box support for GraalVM. I've tried a simple task to create a Micronaut function to be handled by Amazon API Gateway which connects to Amazon RDS PostgreSQL. The following command generates the skeleton of the function handling API Gateway Proxy using GraalVM:

mn create-app graalvm-function --features aws-api-gateway-graal

_See_ [_Custom GraalVM Native Runtimes_](https://micronaut-projects.github.io/micronaut-aws/latest/guide/#_custom_graalvm_native_runtimes) _for more information about API Gateway and GraalVM functions._

Next, we create a domain class, controller and repository using [Micronaut Data JDBC](https://micronaut-projects.github.io/micronaut-data/snapshot/guide/#jdbc). Feel free to copy from [Pet Clinic example](https://github.com/micronaut-projects/micronaut-data/tree/master/examples/example-jdbc). How to use [Micronaut Data JDBC](https://micronaut-projects.github.io/micronaut-data/snapshot/guide/#jdbc) goes beyond this post but there is one important part of the documentation which is [Going Native with GraalVM](https://micronaut-projects.github.io/micronaut-data/snapshot/guide/#graal). Please, follow the [Configuration for Postgres](https://micronaut-projects.github.io/micronaut-data/snapshot/guide/#_configuration_for_postgres) section.

Now we come to the part which is not included in any guide yet. If you deploy the function with `deploy.sh` command and test it either from the AWS Lambda or by setting up API Gateway endpoint and executing the HTTP command then you will get the following warning with exception:

WARNING: The sunec native library, required by the SunEC provider, could not be loaded. This library is usually shipped as part of the JDK and can be found under <JAVA\_HOME>/jre/lib/<platform>/libsunec.so. It is loaded at run time via System.loadLibrary("sunec"), the first time services from SunEC are accessed. To use this provider's services the java.library.path system property needs to be set accordingly to point to a location that contains libsunec.so. Note that if java.library.path is not set it defaults to the current working directory.

com.amazonaws.serverless.exceptions.ContainerInitializationException: Error starting Micronaut container: Bean definition \[javax.sql.DataSource\] could not be loaded: Error instantiating bean of type \[javax.sql.DataSource\]: sun.security.ec.ECKeyPairGenerator.isCurveSupported(\[B)Z \[symbol: Java\_sun\_security\_ec\_ECKeyPairGenerator\_isCurveSupported or Java\_sun\_security\_ec\_ECKeyPairGenerator\_isCurveSupported\_\_\_3B\]

The reason is that the function sets up a secured connection to the PostgreSQL inside the VPC using [SunEC](https://docs.oracle.com/javase/7/docs/technotes/guides/security/SunProviders.html#SunEC) library. The library is provided by `libsunec.so` file inside GraalVM distribution. There are two steps which need to be accomplished.

First, copy `libsunec.so` file into the deployment archive `function.zip`. In `Dockerfile` located in the root of the project replace the line `RUN zip -j function.zip bootstrap server` with following two lines:

**RUN** cp **/**usr**/**lib**/**graalvm**/**jre**/**lib**/**amd64**/**libsunec.so libsunec.so  
**RUN** zip **\-**j function.zip bootstrap server libsunec.so

Second, replace the last line of `bootstrap` script with following to let the application find `libsunec.so` library file:

./server -Djava.library.path=**$**(pwd)

If you now deploy the function and set up the data source properly in `application.yml` then you should be able to successfully connect to PostgreSQL RDS instance and make calls to your API.

* * *


