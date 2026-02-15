---
title: "How to Emulate Event Bus with Micronaut, API Gateway and SNS"
date: 2019-01-29
slug: how-to-emulate-event-bus-with-micronaut--api-gateway-and-sns
source: medium
mediumId: "7a6404461b44"
---It has been nearly two years since Benoit Hediard published an article on how to build a real-time web application with Angular, Ngrx and…

* * *

### How to Emulate Event Bus with Micronaut, API Gateway and SNS

![](https://cdn-images-1.medium.com/max/800/1*uEqo5FUV3fsApWsNeNVwXw.png)

It has been nearly two years since [Benoit Hediard](https://medium.com/u/368024b1dcc0) published [an article on how to build a real-time web application with Angular, Ngrx and Vert.x](https://medium.com/agorapulse-stories/building-a-realtime-web-app-with-angular-ngrx-and-vert-x-a5381c0397a1). My last post was about [creating WebSocket backed with Micronaut and API Gateway](https://medium.com/agorapulse-stories/how-to-create-websocket-backend-with-api-gateway-and-micronaut-20c6683f5916). Let’s combine these two approaches and replace the Vert.X part of the real-time web application example with AWS Lambda with Micronaut approach.

[**Building a real-time web app with Angular/Ngrx and Vert.x**  
_Welcome to the real-time web! It’s time to move on from traditional synchronous HTTP request/response architectures to…_medium.com](https://medium.com/agorapulse-stories/building-a-realtime-web-app-with-angular-ngrx-and-vert-x-a5381c0397a1 "https://medium.com/agorapulse-stories/building-a-realtime-web-app-with-angular-ngrx-and-vert-x-a5381c0397a1")[](https://medium.com/agorapulse-stories/building-a-realtime-web-app-with-angular-ngrx-and-vert-x-a5381c0397a1)

[**How to Create WebSocket Backend with API Gateway and Micronaut**  
_Since December 2018 you have a choice to create either REST or WebSocket API when you create new API using AWS API…_medium.com](https://medium.com/agorapulse-stories/how-to-create-websocket-backend-with-api-gateway-and-micronaut-20c6683f5916 "https://medium.com/agorapulse-stories/how-to-create-websocket-backend-with-api-gateway-and-micronaut-20c6683f5916")[](https://medium.com/agorapulse-stories/how-to-create-websocket-backend-with-api-gateway-and-micronaut-20c6683f5916)

_Please, get familiar with the two posts above before continuing reading as we are going to combine these two approaches together._

#### Using Pure WebSockets in the Client

The initial example was using SockJS to implement the event bus service. As API Gateway only supports WebSocket API without any fallback we need to rewrite the event bus service to use WebSockets only. The first piece of the puzzle is a simple wrapper around WebSocket which will publish incoming events and connection state. It will also handle the automatic reconnection.

There are two observable properties`messages` and `state` which helps clients to get notified about new incoming messages and about the current connection state. Method `send` allows sending the messages to the backend endpoint.

The changes in the event bus service are rather cosmetic. The biggest difference is that the reconnection is now handled in the `ObservableWebSocket` wrapper.

The service is using the subscription to the `state` to manage the connection state and `messages` observable handle incoming messages. The publishing methods are simply delegated to the `send` method of the wrapper.

#### Local Event Bus with `ApplicationEventPublisher`

The most trivial implementation of event bus in Micronaut can leverage the already present event mechanism. In this case, the incoming function just publishes the `WebSocketRequest` event using `ApplicationEventPublisher`.

@Inject @Field ApplicationEventPublisher **publisher  
  
**WebSocketResponse produce**(**WebSocketRequest event**) {  
    publisher**.publishEvent**(**event**)  
    return** WebSocketResponse.**OK  
}**

The event is propagated to all beans which implement`ApplicationEventListener<WebSocketRequest>`. We can create two such listeners:

*   `ConnectionManager` listens to connect and disconnect events and registers and unregister clients’ connection IDs in Redis. If an event with type `publish` arrives it simply forwards it to all connected clients.
*   `CounterService` intercepts `publish` events and increments, decrements and resets the counter stored also in Redis. It is able to respond to the`send` events with the address `counter::total` with the current counter's total.

This approach is rather simple yet it is not very scalable as with many connected clients it might take a significant amount of time to forward the actions to the all of them.

#### Using Simple Notification Service (SNS) as Event Bus

Simple Notification Service can act very nicely as an event bus for our purpose. With just a little adjustment we can decouple the incoming `WebSocketRequest` and the listeners.

We can create [SNS notification client](https://agorapulse.github.io/micronaut-libraries/#_publishing_with_notificationclient) which will publish the requests into a topic:

@CompileStatic  
@NotificationClient  
**interface** WebSocketRequestPublisher **{  
  
    void** publishEvent**(**WebSocketRequest request**)  
  
}**

Then we can use the client to publish incoming requests into the desired topic:

@Inject @Field WebSocketRequestPublisher **publisher  
  
**WebSocketResponse produce**_(_**WebSocketRequest event**_) {_    publisher**.publishEvent**_(_**event**_)_    return** WebSocketResponse.**_OK  
}_**

The topic is created automatically but we need to declare its name in the configuration `application.yml` file:

**aws**:  
    **sns**:  
        **topic**: WebSocketRequests

Then we need to create a function which will react on incoming SNS messages. We can keep the event driven mechanism or make a specific function for each responsibility.

@Inject @Field ApplicationEventPublisher **publisher  
**@Inject @Field ObjectMapper **mapper  
  
void** consume**(**SNSEvent event**) {**    event.records.each **{** record ->  
        **publisher**.publishEvent**(  
            mapper**.readValue**(**record.SNS.message, WebSocketRequest**)  
        )  
    }  
}**

`CounterService` and `ConnectionManager` reminds the same.

We need to deploy the code into two different functions so we need to update the generated `build.gradle` file:

task deployProducer**_(_    type**: AWSLambdaMigrateFunctionTask,  
    **dependsOn**: shadowJar  
**_) {_    functionName** \= **"EventBusProducer"  
    handler** \= **"lambda.eventbus.EventBusProducerFunction::produce"  
    role** \= **_"_arn:aws:iam::**$**_{_**aws.accountId**_}_:role/lambda\_ws\_sns_"_    runtime** \= com.amazonaws.services.lambda.model.Runtime.**_Java8_    zipFile** \= shadowJar.archivePath  
    **memorySize** \= 512  
    **timeout** \= 60  
**_}  
  
_**task deployConsumer**_(_    type**: AWSLambdaMigrateFunctionTask,  
    **dependsOn**: shadowJar  
**_) {_    functionName** \= **"EventBusConsumer"  
    handler** \= **"lambda.eventbus.EventBusConsumerFunction::consume"  
    role** \= **_"_arn:aws:iam::**$**_{_**aws.accountId**_}_:role/lambda\_ws\_sns_"_    runtime** \= com.amazonaws.services.lambda.model.Runtime.**_Java8_    zipFile** \= shadowJar.archivePath  
    **memorySize** \= 512  
    **timeout** \= 60  
**_}  
  
_**task deploy**_(_dependsOn**: **_\[_**deployProducer, deployConsumer**_\])_**

Ensure that the functions' role has access to the particular SNS topic.

The last step is to add the topic as the source for the `EventBusConsumer` lambda

![](https://cdn-images-1.medium.com/max/800/1*VWxk7RUyTuD9CtD_Va4AHw.png)

Once everything is deployed and configured you should see the same results as with using Micronaut's builtin event mechanism.

#### Summary

SNS topics can easily emulate event bus for your WebSocket backend. There are a couple of caveats compared to the original solution

1.  No fallback for WebSockets
2.  Potential latency caused by AWS Lambda cold starts

As the approach described in this blog post relies directly on WebSockets there is no fallback such as HTTP polling for browsers without WebSocket support. According to [Can I use website](https://caniuse.com/#feat=websockets) there is currently 92.52 % of users who are capable of using WebSockets. There is a high chance that the users without WebSocket support can't use your website anyway due to other constraints.

There is a common problem with AWS Lambda functions which is potentially slow cold start. Our current experience with running AWS Lambda functions with Micronaut is that with 1024 MB of memory the cold start is about 8 seconds but it happens just once or twice an hour. The average duration of the request is just about 40 ms. The latency between publishing and delivering the message is about 700 ~ 800 ms (including processing by API Gateway which usually consumes about ~ 700 ms even for the mock responses) which should be enough for most of the business use cases so if you are not developing an online shooter game you the latency shouldn't be a problem for you. Also, don't forget to minimize the delay time of your SNS topic.

* * *

[**We’re Hiring**  
_Are you kick-ass fullstack or front-end dev that wants to work on AWS, Angular, Java or Groovy? You must contact us to join our dream team in Paris or Nantes_apply.workable.com](https://apply.workable.com/agorapulse/ "https://apply.workable.com/agorapulse/")[](https://apply.workable.com/agorapulse/)

By [Vladimír Oraný](https://medium.com/@musketyr) on [January 29, 2019](https://medium.com/p/7a6404461b44).

[Canonical link](https://medium.com/@musketyr/how-to-emulate-event-bus-with-micronaut-api-gateway-and-sns-7a6404461b44)

Exported from [Medium](https://medium.com) on February 15, 2026.