---
title: "How to Set the Default Configuration Properties for a Micronaut Library"
date: 2020-02-10
slug: how-to-set-the-default-configuration-properties-for-a-micronaut-library
source: medium
mediumId: "8a7914ea2050"
---Micronaut is a very extensible framework which allows you to easily create new libraries. Generally speaking, you can create a set of…

* * *

### How to Set the Default Configuration Properties for a Micronaut Library

![](https://cdn-images-1.medium.com/max/800/1*5pI8Tg_Cgqrvu64xlSINSg.png)

[Micronaut](https://micronaut.io/) is a very extensible framework which allows you to easily create new libraries. Generally speaking, you can create a set of beans which will be injected into your application and ship them as a separate JAR. The problem may arise when you are also using configurations and you want to preset some default values. There is one recommended way — use default values in the configuration class. If you for any reason can't use this approach I will show you two other approaches — each of them must be used with caution.

### Setting Default Values in Configuration Object

Setting default values in the configuration class or interface is the recommended way. If you use [plain classes](https://docs.micronaut.io/latest/guide/index.html#configurationProperties) then you can simply set the default value as a default value of the fields.

```java
@ConfigurationProperties("simple.two")
public class SimpleConfigurationTwo {

    public String getFoo() {
        return foo;
    }

    public void setFoo(String foo) {
        this.foo = foo;
    }

    public String getBar() {
        return bar;
    }

    public void setBar(String bar) {
        this.bar = bar;
    }

    @NotBlank
    private String foo = "FOO2";
    private String bar;

}
```


There is a new option in Micronaut 1.3.x to create [immutable configurations](https://docs.micronaut.io/latest/guide/index.html#immutableConfig) using interfaces. In that case, you need to use `@Bindable` annotation to set the default values.

```java
@ConfigurationProperties("simple.one")
public interface SimpleConfigurationOne {

    @NotBlank
    @Bindable(defaultValue = "FOO1")
```

    String getFoo();  
  
    String getBar();  
  
}

You can override the defaults in your `application.yml` file:

```yaml
micronaut:
  application:
    name: simple-application
simple:
  one:
    foo: CHANGED\11
    bar: BAR_1
  two:
    bar: BAR_2
```


* * *

There are certain use cases in which you can’t set the default directly in the configuration class. One of the examples might be if you want to preconfigure a declarative HTTP. Then you have to preset the defaults using some another approach.

### Setting Default Values using Custom Property Source

When you create a new Micronaut application then a new file `Application` is created:

```java
public class Application {

    public static void main(String\[\] args) {
        Micronaut._run_(Application.class);
    }

}
```


There is usually no need to edit this file. But you can use it to customize the creation of the application context. For example, you can add another `PropertySource`:

```java
public class Application {

    public static void main(String\[\] args) {
```

        Micronaut._build_(args)  
         .propertySources(PropertySourceConfigurationOne._defaults_())  
```groovy
         .classes(Application.class)
```

         .start();  
    }  
}

The major drawback with this approach is that there is an additional nonstandard step required. There is a high probability that the library user will forget to configure the property source properly. To be sure that the property source is registered you can create a meaningless property which the only purpose is to guarantee the property source has been set up properly. Here's a complete example of such a configuration object.

```java
@ConfigurationProperties("sources.one")
public interface PropertySourceConfigurationOne {
```

  
    String getFoo();  
    String getBar();  
  
    _/\*\*  
     \* Not used at all.  
     \*  
     \* This is a signal property which verifies  
     \* that the defaults has been set properly.  
     \*  
     \* <code>  
     \* Micronaut.build(args)  
     \*     .propertySources(  
     \*         PropertySourceConfigurationOne.defaults()  
     \*     )  
     \*     .classes(Application.class)  
     \*     .start();  
     \* </code>  
     \*  
```groovy
     \*_ _@return_ _literally "cafebabe"
     \*/_    @NotBlank @MatchesPattern("cafebabe") String getCafebabe();

    static PropertySource defaults() {
```

        Map<String, Object> defaults = CollectionUtils._mapOf_(  
```groovy
            "sources.one.foo", "DEFAULT_FOO",
            "sources.one.bar", "DEFAULT_BAR",
            "sources.one.cafebabe", "cafebabe"        );
        return PropertySource._of_(
            "property-source-one",   // any unique name
```

            defaults,                // configuration defaults  
            -10000                   // priority  
        );  
    }  
```groovy
}
```


You can see that configuration property `sources.one.cafebabe` is only used to verify that the `defaults()` property source has been applied to the application context. Using any negative number lesser than `-1000` should move the property source down the evaluation stack so it will only be evaluated if the property is not specified elsewhere.

* * *

Another even tricker approach is to leave `application.yml` file for library configurations and always use environment-specific files such as `application-development.yml` or `application-production.yml`, system properties or environment variables to override the defaults.

### Setting Default Values in application.yml Files

The rule of thumb is that you should never create `application.yml` files in the libraries! When the application is processed by the Shadow JAR Gradle plugin you never know which `application.yml` file is chosen to be copied into the fat JAR.

The only acceptable (but still not preferred) situation is when you have full control of the library (i.e. internal library) and the application. Then you can merge the `application.yml` files by altering the Gradle configuration:

```groovy
shadowJar {    mergeServiceFiles()
```

    _// append application.yml files from the libraries_    append **'application.yml'  
```groovy
}
```


You must be also sure that the content of the files is wrapped into `---` part separators so each file will create a separate part of the YAML file:

\---  
```yaml
merge:
  one:
    foo: DEFAULT\11
    bar: DEFAULT\11
```

\---

The biggest drawback is that you will have to always use environment-specific files such as `application-development.yml` or similar to override the defaults:

\---  
```yaml
micronaut:
  application:
    name: sources-application
merge:
  one:
    foo: CHANGED\11
  two:
    bar: CHANGED\12
```

\---

In production, you will probably override the configuration properties using environment variables anyway.

* * *

Following repository contains examples of all three approaches:

```groovy
[agorapulse/micronaut-configuration-strategies
```

[github.com](https://github.com/agorapulse/micronaut-configration-strategies/)

* * *


