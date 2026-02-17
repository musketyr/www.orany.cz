---
title: "How to Setup AWS DynamoDB Accelerator (DAX) with Micronaut"
date: 2019-02-20
slug: how-to-setup-aws-dynamodb-accelerator--dax--with-micronaut
source: medium
mediumId: "5b3ade1e3945"
---AWS DynamoDB Accelerator (DAX) is a fully managed, in-memory cache for DynamoDB. In Java, using DAX can be completely hidden from the…

* * *

### How to Setup AWS DynamoDB Accelerator (DAX) with Micronaut

![](https://cdn-images-1.medium.com/max/800/1*7Tgyt5SuRfwVyZy-9Qh9dA.jpeg)

AWS DynamoDB Accelerator (DAX) is a fully managed, in-memory cache for DynamoDB. In Java, using DAX can be completely hidden from the developer as DAX Java Client implements the same `AmazonDynamoDB` interface as the direct client. [Agorapulse Micronaut Libraries](https://agorapulse.github.io/micronaut-libraries/#_dynamodb) provides out-of-the-box support with a single configuration property switching between DAX and direct DynamoDB.

```groovy
[Agorapulse Micronaut Libraries
```

[agorapulse.github.io](https://agorapulse.github.io/micronaut-libraries/#_dynamodb)

#### Setting up the Cluster

There is excellent documentation which describes how to create a new DAX cluster. Please, follow the necessary steps to set up your own cluster first.

```groovy
[Creating a DAX Cluster - Amazon DynamoDB
```

[docs.aws.amazon.com](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.create-cluster.html)

DAX is only available inside VPC so using DAX automatically implies running your applications and functions inside very same VPC. You will also need to create DAX subnet which may only access the private subnets of your VPC.

Access control itself is based on IAM roles and policies. Pay attention to the roles your application or function is assuming. Follow the instruction in this article to set up the roles properly:

```groovy
[DAX Access Control - Amazon DynamoDB
```

[docs.aws.amazon.com](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.access-control.html)

This is the sample policy taken from the article above which allows running DAX command against given cluster:

```groovy
{
  "Version": "2012-10-17",
  "Statement": \[
    {
      "Action": \[
```

        "dax:\*"  
```groovy
      \],
      "Effect": "Allow",
      "Resource": \[
```

        "arn:aws:dax:us-west-2:123456789012:cache/DAXCluster01"  
      \]  
    }  
  \]  
```groovy
}
```


#### Writing Micronaut Function Working with DAX Cluster

We can create sample Micronaut function from the command line:

mn create-function dax-tester

Micronaut AWS library provides easy switching between DynamoDB and DAX with a single configuration property `aws.dax.endpoints` but first, we need to update `build.gradle` file to include the required libraries:

```groovy
dependencies _{_    compile 'com.agorapulse:micronaut-aws-sdk:1.0.4.1'    compile 'com.amazonaws:aws-java-sdk-dynamodb:1.11.500'    compile 'com.amazonaws:amazon-dax-client:1.0.202017.0'
_}_
```


With the dependencies in place, we can create a simple entity:

```java
@DynamoDBTable_(_tableName = "DaxTestEntity"_)
_public class DaxTestEntity _{_    @DynamoDBHashKey
    private String hashKey;

    @DynamoDBRangeKey
    private String range;

    public String getHashKey_() {_        return hashKey;
    _}_    public void setHashKey_(_String hashKey_) {_        this.hashKey = hashKey;
    _}_    public DaxTestEntity withHashKey_(_String hashKey_) {_        this.hashKey = hashKey;
        return this;
    _}_    public String getRange_() {_        return range;
    _}_    public void setRange_(_String range_) {_        this.range = range;
    _}_    public DaxTestEntity withRange_(_String range_) {_        this.range = range;
        return this;
    _}
}_
```


Micronaut AWS SDK integration provides [DynamoDB data services](https://agorapulse.github.io/micronaut-libraries/#_dynamodb_service) which simplify working with entities. Let's create one for the `DaxTestEntity` as well:

```java
@Service_(_DaxTestEntity.class_)
_public interface DaxTestEntityService _{_    DaxTestEntity save_(_DaxTestEntity entity_)_;
    DaxTestEntity load_(_String hashKey, String rangeKey_)_;

_}_
```


And finally, we can implement the simple function to test the working setup

```java
@FunctionBean_(_"dax-tester"_)
_public class DaxTesterFunction implements Supplier_<_String_\> {_    private final DaxTestEntityService testEntityService;

    public DaxTesterFunction_(_DaxTestEntityService service_) {_        this.testEntityService = service;
    _}_    @Override
    public String get_() {_        long start = System._currentTimeMillis__()_;


        DaxTestEntity entity = new DaxTestEntity_()_            .withHashKey_(_"hash"_)_            .withRange_(_"range"_)_;

        testEntityService.save_(_entity_)_;

        for _(_int i = 0; i < 1000 ; i++_) {_            _requireNonNull__(_testEntityService.load_(_"hash", "range"_))_;
        _}_        long finish = System._currentTimeMillis__()_;

        return "Loaded entity in " \+ _(_finish - start_)_ \+ " ms.";
    _}
}_
```


The test function will first save the entity and then it is loading it 1000 times. You can see there is nothing DAX specific in the sample code.

#### Deploying the Micronaut Function Working with DAX

To deploy the function we need to update at least the role in `build.gradle` to one with the proper roles — to access the VPC and DAX:

task deploy_(_    type: AWSLambdaMigrateFunctionTask,   
    dependsOn: shadowJar  
_) {  
    // ..._  
    role = _"_arn:aws:iam::$_{_aws.accountId_}_:role/lambda\_dax\_vpc_"  
    // ..._  
_}_

Once updated, you can deploy AWS with a single command (assuming you have your AWS credentials set up for the command line):

./gradew deploy

The function would not work after the first deployment yet. You need to log in to AWS console and add lambda function to the same VPC. To run against the cluster, you also need to set `AWS_DAX_ENDPOINT` environment variable otherwise the function will run against DynamoDB directly.

You can try yourself to run the function using any test payload. You can also try running with and without `AWS_DAX_ENDPOINT` variable to see the impact. With this sample project, I got about 5 seconds when the function was running directly and about 1 second when DAX was set up properly.

#### Sample Code

You can check the whole sample project on GitHub:

```groovy
[musketyr/dax-tester
```

[github.com](https://github.com/musketyr/dax-tester)

* * *


