---
title: "Leveraging Spock Spring Module in Grails Unit Tests"
date: 2017-10-05
slug: leveraging-spock-spring-module-in-grails-unit-tests
source: medium
mediumId: "e839340de272"
---Ted Vinke has shown how you can use detached Spock mocks in Grails integration tests but you can also leverage Spock Spring module and use…

* * *

### Leveraging Spock Spring Module in Grails Unit Tests

[Ted Vinke](https://tedvinke.wordpress.com) has shown [how you can use detached Spock mocks in Grails integration tests](https://tedvinke.wordpress.com/2017/07/14/grails-3-3-integration-testing-with-spock-mocks/) but you can also leverage Spock Spring module and use detached mocks within Grails Unit Tests.

Spock Spring module does not like mix-and-matching the Spock version so be sure you always declare both dependencies in `build.gradle` file:

dependencies {  
    String spockVersion = '1.1-groovy-2.4'  
    testCompile "org.spockframework:spock-core:${spockVersion}"  
    testCompile "org.spockframework:spock-spring:${spockVersion}**"  
**}

In any Grails Unit test you can easily add another beans using `[doWithSpring](https://testing.grails.org/latest/guide/index.html#_dowithspring)` method where you can do [whatever you can do within](https://docs.grails.org/latest/guide/spring.html) `[resources.groovy](https://docs.grails.org/latest/guide/spring.html)` [file](https://docs.grails.org/latest/guide/spring.html):

@Override Closure doWithSpring() {{ ->  
    helloService(HelloService)  
}}

On the other hand [Spock Spring module](http://spockframework.org/spock/docs/1.1-rc-3/modules.html#_spring_module) allows to [declare mock, spy or stub beans using XML](http://spockframework.org/spock/docs/1.1-rc-3/modules.html#_xml):

```
<?xml version="1.0" encoding="UTF-8"?><beans xmlns="http://www.springframework.org/schema/beans"       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"       xmlns:spock="http://www.spockframework.org/spring">  <spock:mock id="helloService" class="helloService"/></beans>
```

It is known that whatever is possible within XML definition it is possible also using BeanBuilder and `resources.groovy` so you can easily write following:

@Override Closure doWithSpring() {{ ->  
    xmlns spock: '[http://www.spockframework.org/spring](http://www.spockframework.org/spring)'  
      
    spock.mock(id: 'helloService', class: HelloService.name)  
}}

The benefit of using Spock Spring module is that the mock will be automatically autowired to any service which requires it. The mocks can be also autowired back to the specification if `AutowiredTest` trait is implemented but as Grails unit tests are not Spring unit tests the mocks must be attached and detached from the specification manually.

import grails.testing.spring.AutowiredTest  
import org.spockframework.mock.MockUtil  
import org.springframework.beans.factory.annotation.Autowired

class HelloServiceSpec extends Specification   
    implements AutowiredTest, ServiceUnitTest<GreetingService> {

    @Override Closure doWithSpring() {{ ->  
        xmlns spock: 'http://www.spockframework.org/spring'

        spock.mock(id: 'helloService', class: HelloService.name)  
    }}

    @Autowired HelloService helloService

    void 'say hello'() {  
        given:  
            MockUtil mockUtil = new MockUtil()  
            mockUtil.attachMock(helloService, this)  
        when:  
            String message = service.greet()  
        then:  
            message == 'World'  
            1 \* helloService.sayHello() >> 'World'  
        cleanup:  
            mockUtil.detachMock(helloService)  
    }  
}

Attaching mocks manually is not very practical and can be easily simplified with Spock extension. Since Spock 1.2 you can use `@AutoAttach` annotation.

import grails.testing.spring.AutowiredTest  
import org.spockframework.mock.MockUtil  
import org.springframework.beans.factory.annotation.Autowired

class HelloServiceSpec extends Specification   
    implements AutowiredTest, ServiceUnitTest<GreetingService> {

    @Override Closure doWithSpring() {{ ->  
        xmlns spock: 'http://www.spockframework.org/spring'

        spock.mock(id: 'helloService', class: HelloService.name)  
    }}

    @Autowired @AutoAttach HelloService helloService

    void 'say hello'() {  
        when:  
            String message = service.greet()  
        then:  
            message == 'World'  
            1 \* helloService.sayHello() >> 'World'  
    }  
}

The example is too trivial to fully show the benefit of using declarative Spring mock beans in favour of manual binding but with services with many dependencies it definitely produces clearer code then manual binding.

* * *


