---
title: "How to prepare test data in Micronaut with Dru"
date: 2018-05-31
slug: how-to-prepare-test-data-in-micronaut-with-dru
source: medium
mediumId: "9b6e6550f260"
---If you decide to use GORM with Micronaut you can easily use Dru to setup your test data.

* * *

### How to prepare test data in Micronaut with Dru

If you decide to use [GORM](http://gorm.grails.org/) with [Micronaut](http://micronaut.io/) you can easily use [Dru](https://agorapulse.github.io/dru/) to setup your test data.

Add following dependency to your `build.gradle` file:

String druVersion = **'0.3.1'  
**testCompile **"com.agorapulse:dru:**$druVersion**"  
**testCompile **"com.agorapulse:dru-client-gorm:**$druVersion**"**

You may also want to add additional data source parser such as `dru-parser-json`.

Let's imagine you have a simple domain `Greetings`:

**package** hello.world  
  
**import** grails.gorm.annotation.Entity  
  
@Entity  
**class** Greetings {  
  
    String **language**    String **greeting  
  
    static _constraints_** \= {  
        language **minSize**: 2, **maxSize**: 2  
        greeting **size**: 1..255  
    }  
}

And a GORM data service `GreetingsService`:

**package** hello.world  
  
**import** grails.gorm.services.Service  
  
  
@Service(Greetings)  
**interface** GreetingsService {  
  
    Greetings findByLanguage(String language)  
  
}

You can easily use these with Dru in your tests:

**package** hello.world  
  
**import** com.agorapulse.dru.Dru  
**import** grails.gorm.transactions.Rollback  
**import** io.micronaut.context.ApplicationContext  
**import** io.micronaut.runtime.server.EmbeddedServer  
**import** org.junit.Rule  
**import** spock.lang.AutoCleanup  
**import** spock.lang.Shared  
**import** spock.lang.Specification  
  
@Rollback  
**class** GreetingsSpec **extends** Specification {  
  
    @Shared @AutoCleanup  
    EmbeddedServer **server** \= ApplicationContext._run_(EmbeddedServer)  
  
    @Shared   
    GreetingsService **service** \= **server**.applicationContext  
                                     .getBean(GreetingsService)  
  
    **private static final** List<Map<String, String>> **_GREETINGS_** \= \[  
            \[**language**: **'dk'**, **greeting**: **'Hej Verden!'**\],  
            \[**language**: **'en'**, **greeting**: **'Hello World!'**\],  
            \[**language**: **'es'**, **greeting**: **'Hola Mundo!'**\],  
    \]  
  
    @Rule Dru **dru** \= Dru._plan_ {  
        from **'GREETINGS'**, {  
            map {  
                to Greetings  
            }  
        }  
    }  
  
    **void** setup() {  
        **dru**.load()  
    }  
  
    **void 'load with dru and fetch by gorm method'**() {  
        **expect**:  
            **dru**.findAllByType(Greetings).size() == 3  
            Greetings._findByLanguage_(**'dk'**)  
    }  
  
    **void 'load with dru and fetch by gorm service'**() {  
        **expect**:  
            **dru**.findAllByType(Greetings).size() == 3  
            **service**.findByLanguage(**'dk'**)  
    }  
}

The important part is `grails.gorm.transactions.Rollback` annotation applied to the test class which guarantees transaction present for every test call and also it also help to keep the database clean.

* * *


