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

[**Agorapulse Micronaut Libraries**  
_AWS SDK for Micronaut - integration for DynamoDB, Kinesis, Simple Storage Service (S3), Simple Email Service (SES)…_agorapulse.github.io](https://agorapulse.github.io/micronaut-libraries/#_dynamodb "https://agorapulse.github.io/micronaut-libraries/#_dynamodb")

#### Setting up the Cluster

There is excellent documentation which describes how to create a new DAX cluster. Please, follow the necessary steps to set up your own cluster first.

[**Creating a DAX Cluster - Amazon DynamoDB**  
_This section walks you through first-time setup and usage of DAX in your default Amazon VPC environment. You can create…_docs.aws.amazon.com](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.create-cluster.html "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.create-cluster.html")

DAX is only available inside VPC so using DAX automatically implies running your applications and functions inside very same VPC. You will also need to create DAX subnet which may only access the private subnets of your VPC.

Access control itself is based on IAM roles and policies. Pay attention to the roles your application or function is assuming. Follow the instruction in this article to set up the roles properly:

[**DAX Access Control - Amazon DynamoDB**  
_DAX is designed to work together with DynamoDB, to seamlessly add a caching layer to your applications. However, DAX…_docs.aws.amazon.com](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.access-control.html "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.access-control.html")

This is the sample policy taken from the article above which allows running DAX command against given cluster:

**{  
  "Version"**: **"2012-10-17"**,  
  **"Statement"**: **\[  
    {  
      "Action"**: **\[  
        "dax:\*"  
      \]**,  
      **"Effect"**: **"Allow"**,  
      **"Resource"**: **\[  
        "arn:aws:dax:us-west-2:123456789012:cache/DAXCluster01"  
      \]  
    }  
  \]  
}**

#### Writing Micronaut Function Working with DAX Cluster

We can create sample Micronaut function from the command line:

mn create-function dax-tester

Micronaut AWS library provides easy switching between DynamoDB and DAX with a single configuration property `aws.dax.endpoints` but first, we need to update `build.gradle` file to include the required libraries:

dependencies **_{_**    compile **'com.agorapulse:micronaut-aws-sdk:1.0.4.1'**    compile **'com.amazonaws:aws-java-sdk-dynamodb:1.11.500'**    compile **'com.amazonaws:amazon-dax-client:1.0.202017.0'  
_}_**

With the dependencies in place, we can create a simple entity:

@DynamoDBTable**_(_**tableName = **"DaxTestEntity"_)  
_public class** DaxTestEntity **_{_**    @DynamoDBHashKey  
    **private** String **hashKey**;  
  
    @DynamoDBRangeKey  
    **private** String **range**;  
  
    **public** String getHashKey**_() {_        return hashKey**;  
    **_}_    public void** setHashKey**_(_**String hashKey**_) {_        this**.**hashKey** \= hashKey;  
    **_}_    public** DaxTestEntity withHashKey**_(_**String hashKey**_) {_        this**.**hashKey** \= hashKey;  
        **return this**;  
    **_}_    public** String getRange**_() {_        return range**;  
    **_}_    public void** setRange**_(_**String range**_) {_        this**.**range** \= range;  
    **_}_    public** DaxTestEntity withRange**_(_**String range**_) {_        this**.**range** \= range;  
        **return this**;  
    **_}  
}_**

Micronaut AWS SDK integration provides [DynamoDB data services](https://agorapulse.github.io/micronaut-libraries/#_dynamodb_service) which simplify working with entities. Let's create one for the `DaxTestEntity` as well:

@Service**_(_**DaxTestEntity.**class_)  
_public interface** DaxTestEntityService **_{_**    DaxTestEntity save**_(_**DaxTestEntity entity**_)_**;  
    DaxTestEntity load**_(_**String hashKey, String rangeKey**_)_**;  
  
**_}_**

And finally, we can implement the simple function to test the working setup

@FunctionBean**_(_"dax-tester"_)  
_public class** DaxTesterFunction **implements** Supplier**_<_**String**_\> {_    private final** DaxTestEntityService **testEntityService**;  
  
    **public** DaxTesterFunction**_(_**DaxTestEntityService service**_) {_        this**.**testEntityService** \= service;  
    **_}_**    @Override  
    **public** String get**_() {_        long** start = System._currentTimeMillis_**_()_**;  
  
  
        DaxTestEntity entity = **new** DaxTestEntity**_()_**            .withHashKey**_(_"hash"_)_**            .withRange**_(_"range"_)_**;

        **testEntityService**.save**_(_**entity**_)_**;  
  
        **for _(_int** i = 0; i < 1000 ; i++**_) {_**            _requireNonNull_**_(_testEntityService**.load**_(_"hash"**, **"range"_))_**;  
        **_}_        long** finish = System._currentTimeMillis_**_()_**;  
  
        **return "Loaded entity in "** \+ **_(_**finish - start**_)_** \+ **" ms."**;  
    **_}  
}_**

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

[**musketyr/dax-tester**  
_Micronaut + AWS DynamoDB Accelerator (DAX) Example - musketyr/dax-tester_github.com](https://github.com/musketyr/dax-tester "https://github.com/musketyr/dax-tester")

* * *
By [Vladimír Oraný](https://medium.com/@musketyr) on [February 20, 2019](https://medium.com/p/5b3ade1e3945).

[Canonical link](https://medium.com/@musketyr/how-to-setup-aws-dynamodb-accelerator-dax-with-micronaut-5b3ade1e3945)

Exported from [Medium](https://medium.com) on February 15, 2026.