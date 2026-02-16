---
title: "How to Create WebSocket Backend with API Gateway and Micronaut"
date: 2019-01-22
slug: how-to-create-websocket-backend-with-api-gateway-and-micronaut
source: medium
mediumId: "20c6683f5916"
---Since December 2018 you have a choice to create either REST or WebSocket API when you create new API using AWS API Gateway.

* * *

### How to Create WebSocket Backend with API Gateway and Micronaut

**EDIT: After evaluating similar API in production I need to warn you that implementing the similar WebSocket event bus using API Gateway may cost you four digits number so use with caution.**

Since December 2018 you have a choice to create either REST or WebSocket API when you [create new API using AWS API Gateway](https://eu-west-1.console.aws.amazon.com/apigateway/home#/apis/create).

![](https://cdn-images-1.medium.com/max/800/1*IU7wfsowZ4_XD74Xmz0urA.png)

Once a new WebSocket API is created you need to declare new route handlers:

![](https://cdn-images-1.medium.com/max/800/1*-3_6uu7a2QLYt3u953N37Q.png)

There are three predefined routes keys `$connect`, `$disconnect` , `$default`. You can declare more routes if you need to. The route key is derived using the Route Selection Expression defined when the API was created but it can be changed later.

Obviously, we need to implement the Lambda function first. [Micronaut](http://micronaut.io/) provides great support for creating AWS Lambda functions. Make sure you have the latest [Micronaut CLI](http://micronaut.io/download.html) installed and run following command:

mn create-function mn-ws-echo

First of all, you need to open `build.gradle` file and add a new dependency on [AgoraPulse](https://medium.com/u/494db8002165) [Micronaut Libraries](https://agorapulse.github.io/micronaut-libraries/#_installation):

dependencies {    compile **'com.agorapulse:micronaut-aws-sdk:1.0.4.4'  
  
**    // .. rest of the default dependencies}

Once you have the dependency in place you can update the generated function bean class `MnWsEchoFunction`:

@FunctionBean**("mn-ws-echo")  
public class** MnWsEchoFunction   
        **extends** FunctionInitializer  
        **implements** Function**<**WebSocketRequest, WebSocketResponse**\> {  
  
    @Inject** MessageSenderFactory **factory**;    @Override  
    **public** WebSocketResponse apply**(**WebSocketRequest event**) {**        RequestContext ctx = event.getRequestContext**()**;  
        MessageSender sender = **factory**.create**(**ctx**)**;  
        String connectionId = ctx.getConnectionId**()**;  
  
        **switch (**ctx.getEventType**()) {  
            case CONNECT**:  
                // e.g. register new connection in cache  
                **break**;  
            **case MESSAGE**:  
                sender.send**(**connectionId, event.getBody**())**;  
                **break**;  
            **case DISCONNECT**:  
                // e.g unregister connection from cache  
                **break**;  
        **}  
  
        return** WebSocketResponse.**OK**;  
    **}  
  
}**

There is a couple of changes which needs to be done

1.  The function bean has to implement `Function<WebSocketRequest, WebSocketResponse>`
2.  The handler method has to return `WebSocketResponse.OK`
3.  There is `MessageSenderFactory` being injected which helps to create `MessageSender` instance which can send messages back to the connected client
4.  If the new event is `MESSAGE` we send the message back to the current client

Before we deploy the function we need to have the Lambda role ready which allows us to call the connection endpoint and reply to the messages.

First, we need to [create a policy](https://console.aws.amazon.com/iam/home?#/policies$new?step=edit) to execute the WebSocket API `@connections` endpoint:

![](https://cdn-images-1.medium.com/max/800/1*4qmpomcaGTIEah2wdpGvcA.png)

The policy can allow all execution API actions and should be restricted to the created API. Use your own **Api id** when creating the policy.

![](https://cdn-images-1.medium.com/max/800/1*UHAfDXScjqlMAQkQpInELQ.png)

Once the policy is created we can create the role for the Lambda function:

![](https://cdn-images-1.medium.com/max/800/1*Gwc8VX5W386CtBSkH4Otqw.png)

The role is using the policy created in the previous step and also `AWSLambdaBasicExecutionRole` policy. Update the role in the `build.gradle` file and you are ready for deployment. You may also need to increase the memory a bit.

task deploy**_(_/\* ... \*/_) {  
    // .._  
    role** \= **"arn:aws:iam::794392443626:role/mn-ws-echo-role    _// ..._    memorySize** \= 512    **_// ..._**  
**_}_**

Be sure you supply your AWS credentials [using the credentials file](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html). Then you can run Gradle `deploy`task to deploy the function:

./gradlew deploy

Now we can finally set up the route handlers for `$connect`, `$disconnect` and `$default` routes to `mn-ws-echo`:

![](https://cdn-images-1.medium.com/max/800/1*BzpYHedav6fTOwhR8J64xw.png)

Once set we can deploy the API using the dropdown _Actions_ button.

![](https://cdn-images-1.medium.com/max/800/1*VP1hP_aIPHS3wCiNoswa1A.png)

Select the new stage and call it `test`. When the stage is deployed you can see the **WebSocket URL** and **Connection URL** in the detail page**.**

![](https://cdn-images-1.medium.com/max/800/1*AuzS2gC3WQZKbA7EExH-oA.png)

You can use the WebSocket URL to test if everything is working as expected using this simple WebSocket tester:

[**WebSocket Test**  
output.jsbin.com](https://output.jsbin.com/fatenun "https://output.jsbin.com/fatenun")

Paste the WebSocket URL into endpoint input and click _Connect_. As soon as you see the text `CONNECTED` which may take a while you can write some text into the message text area and click _Send_. If everything was set up properly you should see the text starting with `SEND` followed by the same text starting with `MESSAGE`.

![](https://cdn-images-1.medium.com/max/800/1*DemwdGpEdhIXIrdirkELUw.png)

Please, read [WebSockets for API Gateway](https://agorapulse.github.io/micronaut-libraries/#_websockets_for_api_gateway) part of the documentation for further reference and use cases.

* * *
By [Vladimír Oraný](https://medium.com/@musketyr) on [January 22, 2019](https://medium.com/p/20c6683f5916).

[Canonical link](https://medium.com/@musketyr/how-to-create-websocket-backend-with-api-gateway-and-micronaut-20c6683f5916)

Exported from [Medium](https://medium.com) on February 15, 2026.