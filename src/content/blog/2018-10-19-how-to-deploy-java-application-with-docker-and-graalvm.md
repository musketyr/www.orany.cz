---
title: "How to Deploy Java Application with Docker and GraalVM"
date: 2018-10-19
slug: how-to-deploy-java-application-with-docker-and-graalvm
source: medium
mediumId: "464629d95dbd"
---A couple of days ago, the base image for GraalVM has been released simplifying the way how to package GraalVM compatible application using…

* * *

![](https://cdn-images-1.medium.com/max/800/1*gPkdMKeuw5kVil0OQI5KNA.jpeg)

### How to Deploy Java Application with Docker and GraalVM

A couple of days ago, the [base image for GraalVM](https://hub.docker.com/r/oracle/graalvm-ce/) has been released simplifying the way how to package [GraalVM](https://www.graalvm.org/) compatible application using [Docker](https://www.docker.com/). I will use [Micronaut](http://micronaut.io/) application which supports [GraalVM](https://www.graalvm.org/) out of the box.

Creating a [GraalVM](https://www.graalvm.org/) compatible application with [Micronaut](http://micronaut.io/) is pretty simple:

\# install SDKMan!  
curl -s [https://get.sdkman.io](https://get.sdkman.io) | bash   
\# use SDKMan! right ahead  
source "$HOME/.sdkman/bin/sdkman-init.sh"   
\# install micronaut  
sdk install micronaut 1.0.0.RC2   
\# use the installed version  
sdk use micronaut 1.0.0.RC2 mn --version  
\# create a products application  
mn create-app --features graal-native-image products  
\# go to the application folder  
cd products   
\# create a product controller  
mn create-controller Product

The application only exposes endpoint `/product` which returns `200 OK` status. Now we can run `./gradlew assemble` to create the fat application JAR which can be used by the [Docker](https://www.docker.com/) file. Also [Micronaut](http://micronaut.io/) creates [GraalVM](https://www.graalvm.org/)'s reflection configuration file for us at `build/reflect.json`. If you're using other framework or no framework at all you will have to create the file yourself if required.

./gradlew assemble

It is important that [GraalVM](https://www.graalvm.org/) native image application is compiled on the same architecture. For that reason, it’s better if the application is compiled using [Docker](https://www.docker.com/) `RUN` command. Create `Dockerfile` with following content:

You can build and run the application using [Docker](https://www.docker.com/) using the following commands:

docker build --tag="products-with-graavm" .   
docker run -d -p 8080:8080 products-with-graavm  
\# now you should get OK from the running server  
curl -v [http://localhost:8080/product](http://localhost:8080/product)

* * *

[**We’re Hiring**  
_Are you kick-ass fullstack or front-end dev that wants to work on AWS, Angular, Java or Groovy? You must contact us to join our dream team in Paris or Nantes_apply.workable.com](https://apply.workable.com/agorapulse/ "https://apply.workable.com/agorapulse/")[](https://apply.workable.com/agorapulse/)

By [Vladimír Oraný](https://medium.com/@musketyr) on [October 19, 2018](https://medium.com/p/464629d95dbd).

[Canonical link](https://medium.com/@musketyr/how-to-deploy-java-application-with-docker-and-graalvm-464629d95dbd)

Exported from [Medium](https://medium.com) on February 15, 2026.