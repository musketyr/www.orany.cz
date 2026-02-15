---
title: "How to test Micronaut with Gru?"
date: 2018-05-30
slug: how-to-test-micronaut-with-gru-
source: medium
mediumId: "9ef8f8093ecb"
---My first question when I've seen new Micronaut framework in action was: “Can I still use Gru for testing Micronaut applications or has it…

* * *

### How to test Micronaut with Gru?

My first question when I've seen new [Micronaut](https://medium.com/@musketyr/what-is-micronaut-37a6565f217d) framework in action was: “Can I still use [Gru](https://agorapulse.github.io/gru/) for testing [Micronaut](https://medium.com/@musketyr/what-is-micronaut-37a6565f217d) applications or has it become obsolete?”. Luckily, tests in [Micronaut](https://medium.com/@musketyr/what-is-micronaut-37a6565f217d) are based on running the snappy embedded server so one can easily use the [Gru's Micronaut](https://agorapulse.github.io/gru/#_micronaut) client (`1.0.1` and newer)

Add following dependency to your `build.gradle` file:

testImplementation **"com.agorapulse:gru-micronaut:1.0.1"**

Let's imagine you have a simple controller `HelloController`:

@Controller(**"/hello"**)  
**class** HelloController {  
  
    @Get(**"/"**)  
    String index() {  
        **return "Hello World"**    }  
}

You are able to update the automatically generated specification file to use Gru.

If you are using Java:

@MicronautTest  
public class HelloControllerSpec {

    @Inject Gru gru

    @Test  
    public void testMicronautWithGru() throws Throwable {  
        gru.verify(test -> test  
            .get("/hello")  
            .expect(resp -> resp.text(inline('Hello World!')))  
        );  
    }  
}

If you are using Spock and Groovy:

* * *

@MicronautTest  
public class HelloControllerSpec extends Specification {

    @Inject Gru gru

    void 'test micronaut with Gru'() {  
        expect:  
            gru.test {  
                get '/hello'  
                expect {  
                    text inline('Hello World!')  
                }  
            }  
    }  
}

By [Vladimír Oraný](https://medium.com/@musketyr) on [May 30, 2018](https://medium.com/p/9ef8f8093ecb).

[Canonical link](https://medium.com/@musketyr/how-to-test-micronaut-with-gru-9ef8f8093ecb)

Exported from [Medium](https://medium.com) on February 15, 2026.