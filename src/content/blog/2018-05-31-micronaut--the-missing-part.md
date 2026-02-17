---
title: "Micronaut: The Missing Part"
date: 2018-05-31
slug: micronaut--the-missing-part
source: medium
mediumId: "a92e99bb6bdf"
---With great expectations may come also great disappointments. When I have first seen Micronaut it looked like a silver bullet for our…

* * *

### Micronaut: The Missing Part

With great expectations may come also great disappointments. When I have first seen [Micronaut](http://micronaut.io/) it looked like a silver bullet for our current issue:

> We have started developing endpoints using [AWS API Proxy](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-http.html) and [AWS Lambda](https://aws.amazon.com/lambda/) but as a serverless technology there is no easy way how to run the HTTP handler locally. API Proxy Requests needs to be handled on the low level.

[Micronaut](http://micronaut.io/) support [serverless functions](http://docs.micronaut.io/latest/guide/index.html#serverlessFunctions) out of the box but they are just pure functions without any notion of [AWS API Proxy](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-http.html).

Would be great if we can just define `HelloController` like following one:

@Controller(**"/hello"**)  
**class** HelloController {  
  
    @Get(**"/"**)  
    String index() {  
        **return "Hello World"**    }  
}

Then there would be a dispatcher which will read the [AWS API Proxy](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-http.html) request path, method and other request properties and execute the controller action but there would be an option to run the server locally using the default Micronaut's HTTP server.

For illustration, here is the example how would the Micronaut's Groovy function have to look like at the moment:

ApiProxyResponse `handle(ApiProxyRequest request, Context ctx) {       switch(request.`httpMethod) {  
        case 'GET':  
            if (request.path == '/hello') {  
                return new ApiProxyResponse(200, "hello")  
            }  
            break;  
        // other endpoints  
    }  
    return new ApiProxyResponse(405, "Not Supported")  
}

The disappointment is rather just a small one. Just having solid dependency injection may help a lot. But you can see there is definitely a room for improvement.



