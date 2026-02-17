---
title: "How to Run Your Java AWS API Gateway Lambda Projects Locally with Micronaut"
date: 2018-07-25
slug: how-to-run-your-java-aws-api-gateway-lambda-projects-locally-with-micronaut
source: medium
mediumId: "27aee7a89b1c"
---TL;DR: You can develop your lambda functions with Micronaut controllers and friends and then use ApiGatewayProxyHandler as your Lambda…

* * *

### How to Run Your Java AWS API Gateway Lambda Projects Locally with Micronaut

TL;DR: You can develop your lambda functions with [Micronaut](http://micronaut.io/) controllers and friends and then use `ApiGatewayProxyHandler` as your Lambda handler. If you deploy to AWS then the handler will convert the API Gateway Proxy request to [Micronaut](http://micronaut.io/)'s request, which will be processed in similar way how [Micronaut](http://micronaut.io/)’s Netty HTTP server processes requests and the response returned will be again converted from [Micronaut](http://micronaut.io/)’s response to API Gateway Proxy response. On the other hand, the Lambda projects will still be regular [Micronaut](http://micronaut.io/) projects so you will be able to run them with [Micronaut](http://micronaut.io/)’s Netty HTTP. You can for example create subproject `local-server` which will depend on every API Gateway Lambda Proxy subprojects written with [Micronaut](http://micronaut.io/) and if you run the Netty HTTP embedded server for `local-server` subproject then all the endpoint will be available locally. Please, read the documentation bellow for more information how to actually achieve this:

```groovy
[agorapulse/micronaut-libraries
```

[github.com](https://github.com/agorapulse/micronaut-libraries)

You can also start right ahead with the start project:

```groovy
[agorapulse/micronaut-aws-api-gateway-proxy-starter
```

[github.com](https://github.com/agorapulse/micronaut-aws-api-gateway-proxy-starter)

Now the long story. We have recently migrated part of our application [AWS API Gateway](https://aws.amazon.com/api-gateway/) with [Lambda Proxy Integration](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html). We adopted quite a trivial approach similar to servlet context where all resources under common starting path are handled by the same [AWS Lambda](https://aws.amazon.com/lambda/) function.

![](https://cdn-images-1.medium.com/max/800/1*ZYNOSq8eIqGydz4Jq2tHOg.png)

From the example above, everything starting with `/planet` is handled by `MicronautExamplePlanet` function and everything starting `/spacecraft` is handled by `MicronautExampleSpacecraft` function.

Soon we reached some issues with this _serverless_ approach. The major one is that we only can run the endpoints when they are deployed to the AWS which complicates the development cycle. Another one seems to be reinventing the wheel. For example, we basically need to create a poor man's URL router such as the following one:

```groovy
private final PlanetDBService planetDBService
```

  
**PlanetHandler() {  
```groovy
    this.planetDBService = new PlanetDBService()
}

@Override
```

APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent req, Context context) {  
    String star = req.pathParameters.**star  
  
```groovy
    if (req.httpMethod == 'GET' && req.path == '/planet/{star}') {
        return list(star)
    }

    if (req.path != '/planet/{star}/{name}') {
        return notFound(req.path)
    }
```

  
    String name = req.pathParameters.**name  
  
    switch** (req.httpMethod) {  
```groovy
        case 'DELETE':
            return delete(star, name)
        case 'GET':
            return show(star, name)
        case 'POST':
            return create(star, name)
    }

    return methodNotAllowed(req)
}
```


The code is also very uneasy to test as the handlers require zero-argument constructors.

First time I've seen the presentation about [Micronaut](http://micronaut.io/) I know it could be the answer. It provides minimal footprint suitable for Lambda functions, solid HTTP routing support and dependency injections which simplifies the testing a lot. With [Micronaut](http://micronaut.io/) I can rewrite the previous code as follows:

```groovy
@Controller
class PlanetController {

    private final PlanetDBService planetDBService    PlanetController(PlanetDBService planetDBService) {
        this.planetDBService = planetDBService
    }

    @Get('/{star}')
```

    List<Planet> list(String star) {  
```groovy
        return planetDBService.findAllByStar(star)
    }

    @Get('/{star}/{name}')
```

    Planet show(String star, String name) {  
```groovy
        return planetDBService.get(star, name)
    }

    @Post('/{star}/{name}') @Status(HttpStatus.\1)
```

    Planet save(String star, String name) {  
```groovy
        Planet planet = new Planet(star: star, name: name)
        planetDBService.save(planet)
        return planet
    }

    @Delete('/{star}/{name}') @Status(HttpStatus.\1)
```

    Planet delete(String star, String name) {  
        Planet planet = show(star, name)  
```groovy
        planetDBService.delete(planet)
        return planet
    }

}
```


But by default [Micronaut](http://micronaut.io/) comes only with Netty-based HTTP server. Luckily I was able to create an adapter for API Gateway Lambda Proxy functions which can be found on GitHub:

```groovy
[agorapulse/micronaut-libraries
```

[github.com](https://github.com/agorapulse/micronaut-libraries)

In the documentation, you can find how to configure your [Micronaut](http://micronaut.io/)'s projects to deploy to AWS using Gradle and also how to run them locally with [Micronaut](http://micronaut.io/)’s Netty HTTP server. As the lambda is pure [Micronaut](http://micronaut.io/)’s application you should see no difference but you may consider creating tests for both — lambda and netty servers. Feel free to [dive deep into the examples](https://github.com/agorapulse/micronaut-libraries/tree/master/examples) to see it action.

You are currently still responsible to create the exact same mapping (including keeping same path parameter names) in API Gateway console as shown in the first picture. Maybe some future version will be able to read the URL mappings and update the configuration for you.

As a side-product, there is a generic library to create your own [Micronaut](http://micronaut.io/)’s HTTP servers so maybe one of you can create [Java Servlet](https://www.oracle.com/technetwork/java/index-jsp-135475.html) bridge to be able to deploy for example to [Google's App Engine](https://cloud.google.com/appengine/).

* * *


