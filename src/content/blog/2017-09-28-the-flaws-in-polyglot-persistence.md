---
title: "The Flaws in Polyglot Persistence"
date: 2017-09-28
slug: the-flaws-in-polyglot-persistence
source: medium
mediumId: "b4c0686459d7"
---When your application adopts Polyglot Persistence it doesn't have to be bound to a single data store. It can store tree-like structures…

* * *

### The Flaws in Polyglot Persistence

When your application adopts [Polyglot Persistence](https://martinfowler.com/bliki/PolyglotPersistence.html) it doesn't have to be bound to a single data store. It can store tree-like structures with many nested entities easily in [document stores](https://en.wikipedia.org/wiki/Document-oriented_database) and push data with many writes in highly scalable systems such as [Cassandra](http://cassandra.apache.org/). This usually brings better developer experience as well as better performance. But there are always two sides of the coin. This article explains two major flaws with which led me to create [Data Reconstruction Utility (Dru)](https://agorapulse.github.io/dru/) tool.

One of the problems every project is facing is preparing test data. It is a challenge to prepare test data for a simple project but when the data spans multiple data stores it gets even more complicated. The two major issues I found can be described as **The Identity Flaw** and **The Self-Containment Flaw**.

#### The Identity Flaw

![](https://cdn-images-1.medium.com/max/800/1*5x3xugT8dEvpONmd2iyDKg.png)

Loosely related data stored in relational database and document store

Let's take a look at a simple example. An application stores orders in relational database and products in the document store. Order items are loosely related to products just by their id. The product id is generated automatically by the document store so we can't simply create a SQL dump. To prepare the complete test data for a single order having one order item pointing to one product we conceptually need to do following:

1.  save a product into the document store
2.  save an order into the relational database
3.  save an order item with new product id and new order id into the relation database

```groovy
One usually doesn't perform these steps at the low level but uses some framework instead but the steps would look pretty similar. Actually, I would say that _by choosing to use_ [_Polyglot Persistence_](https://martinfowler.com/bliki/PolyglotPersistence.html) _you force yourself into preparing the test data using your application logic_. Here is a pseudocode showing test order creation:

public Order populateAndSaveOrder() {
    Order order = new Order();
```

    order.addItem(buildOrderItem());  
    orderService.save(order);  
```groovy
    return order;
}

public OrderItem buildOrderItem() {
    OrderItem item = new OrderItem();
```

    item.setProductId(populateAndSaveProduct().getId());  
```groovy
    return item;
}

public Product populateAndSaveProduct() {
    Product product = new Product();
    product.setName("Java 9 Modules in a Year of Lunches");
```

    productService.save(product);  
```groovy
    return product;
}
```


Another horrible implication is that you have to keep your test data inside source files. The test data should be stored in a format which is easily editable and updatable.

#### The Self-Containment Flaw

Another problem which occurs even without using [Polyglot Persistence](https://martinfowler.com/bliki/PolyglotPersistence.html) is how to create the minimal dataset which will contain only relevant entities needed by a particular test.

There is an ultimate source of test data which is called _production database._ I believe there are some tools which allow you to extract just a related rows from a relational database. Anyway you can always do a full database dump and delete rows you don't need and all the relations will remain intact. But I am not aware of any tool to extract related data from multiple data stores. Except **_you own application_**.

For example, if your application is [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application) you are probably already generating JSON response similar to following one:

```json
{
  "id": 12345,
  "lines": \[
    {
      "id": 67890,
      "product": {
        "id": "xyz-abc-rur",
        "name": "Java 9 Modules in a Year of Lunches"      }
    }
```

  \]  
}

Wouldn't it be great if you can use such a snippet to prepare your test data?

#### The Data Reconstruction Utility

Simply said, [Data Reconstruction Utility (Dru)](https://agorapulse.github.io/dru/) is smart unmarshaller which respond the two problems mentioned above. It is able to read the response from the running application and save the data into the particular data stores while respecting the object identities. The Order and the Order Item will probably have id `1`and the Product will have some generated unique identifier string but the relations will be still kept.

Only thing [Dru](https://agorapulse.github.io/dru/) requires is to map the content of the JSON file

Dru dru = Dru._plan_ {  
```groovy
    from ('order.json') {
```

        map {  
            to (Order) {  
```groovy
                map ('lines') {
```

                    to (OrderLine) {  
```groovy
                        map ('product') {
                            to (productId: Product)
                        }
                    }
                }
            }
        }
    }
}
```


Once you load the test data file such as the JSON mentioned you can access the entities by their type or original identifiers.

String productId = dru.findByType(Order).lines\[0\].productId  
assert productId == dru.findByType(Product).id  
```groovy
assert productId == dru.findByTypeAndOriginalId('xyz-abc-rur').id
```


[Dru](https://agorapulse.github.io/dru/) currently reflects our technology stack so it is written in Java and Groovy and it initially supports GORM and Amazon DynamoDB. Test data can be specified as JSON or YAML files. Both new clients and parsers can be also developed easily.

Read [the full documentation](https://agorapulse.github.io/dru/) to get more information about Dru.

_Please, clap your 👏 if you find this article useful and help others find it._

* * *


