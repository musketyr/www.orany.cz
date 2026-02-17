---
title: "Goodbye Grails, Hello Micronaut #9: Micronaut Application"
date: 2021-08-03T17:00:00Z
slug: goodbye-grails--hello-micronaut--9--micronaut-application
source: medium
mediumId: "c0d3956afe47"
---This is the ninth post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your application…

* * *

### Goodbye Grails, Hello Micronaut #9: Micronaut Application

_This is the ninth post in a series that will guide you through the migration from Grails to Micronaut. This guide requires your application to be based on Grails 4.x or later._

![](https://cdn-images-1.medium.com/max/800/1*IlyVfS6V05ZxtwIYpI804w.png)

In this stage, we should have all the necessary parts of the application migrated. Now the time has come to create the new Micronaut application.

Let's create a new project with `-mn` suffix such as `hello-mn` under `apps` subfolder with a build file `hello-mn.gradle` similar to the following one:

The subproject can contain a single class that will launch the application:

Pay attention to the package declaration, otherwise, the domain classes cannot be found.

If you want to run the application you can create a Docker Compose file for the database inside `hello-mn` directory:

_MariaDB is used in this example to increase the compatibility with the latest Apple Silicon chips._

And you will also need to create the basic configuration file in `src/main/resources/application.yml` file:

You can also create a class to preload some example data into the database:

The class implements `ApplicationEventListener<ApplicationStartupEvent>` to execute the code right after the application has started successfully.

When you run the docker compose file from the `hello-mn` directory:

docker compose up -d

Then you should be able to run the application from the root of the project:

```
./gradlew :hello-mn:run
```

When you query the server from either cURL or some HTTP client then you should get the default result:

```
curl http://localhost:8080/vehicle/1

# {"id":1,"name":"The Box","make":"Citroen","model":"Berlingo"}
```

* * *

Now the time has come to revisit the rest of the contents of the Grails application. We are now free to remove the controllers and their tests.

We usually still have the `application.groovy` file to be migrated into series of `application.yml`. Beware of `environment { ... }` blocks that are not supported in Micronaut — you need to migrate to separate `application-development.yml` and `application-production.yml` files.

Please, let us know which other parts have been left in the old Grails application and we try to cover them in apendicies.

_Although the Micronaut application is up and running there is the very last step_ [_to migrate the database implementation from GORM to Micronaut_](https://medium.com/p/759c6c36bc7/)_._

#### Table of Contents

1.  [Multiproject](https://medium.com/p/ffeaab056e28)
2.  [Configuration](https://medium.com/p/6aaab659112a)
3.  [Static Compilation](https://medium.com/p/a5a01bad2a06)
4.  [Datasets](https://medium.com/p/440c8b50fb56)
5.  [Marshalling](https://medium.com/p/7b69d9a132bc)
6.  [Domain Classes](https://medium.com/p/ad2d2782059f)
7.  [Services](https://medium.com/p/f7d1ba4025f2)
8.  [Controllers](https://medium.com/p/724e51ec3925/)
9.  Micronaut Application
10.  [Micronaut Data](https://medium.com/p/759c6c36bc7)

#### Sources & Discussion

```yaml
[GitHub — agorapulse/goodbye-grails-hello-micronaut: Goodbye Grails, Hello Micronaut
```

[github.com](https://github.com/agorapulse/goodbye-grails-hello-micronaut)



