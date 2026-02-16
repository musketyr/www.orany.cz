---
title: "How to Manage Versions using Maven BOM, Gradle and GitHub"
date: 2019-12-03
slug: how-to-manage-versions-using-maven-bom--gradle-and-github
source: medium
mediumId: "b3fd94301655"
---I have noticed that many great frameworks such as Spring Boot, Grails or Micronaut are using Maven bill-of-material (BOM) to manage…

* * *

### How to Manage Versions using Maven BOM, Gradle and GitHub

![](https://cdn-images-1.medium.com/max/800/1*BmDgNb_oU-AWReh3KYqKxA.png)

I have noticed that many great frameworks such as Spring Boot, Grails or Micronaut are using [Maven bill-of-material (BOM)](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html) to manage versions of their dependencies aligned. Using BOM you can constraint the versions of transitive dependencies as well as it allows you to specify just the group and name of the module ane let the version be determined by BOM.

I wanted to bring the same smooth versions' management into our project so I've created a seed project to generate the BOM files easily. Although there is a `[java-platform](https://docs.gradle.org/current/userguide/java_platform_plugin.html)` [Gradle plugin](https://docs.gradle.org/current/userguide/java_platform_plugin.html) which is designed for generating BOM files I got inspired by [the approach taken by Micronaut team](https://github.com/micronaut-projects/micronaut-core/blob/master/bom/build.gradle) and created a project which generated the BOM from a simple properties file and publishes it into GitHub Maven repository using GitHub Actions.

[**musketyr/bom-seed**  
_You can fork this project to simply create your own BOM with automatic generation using GitHub Actions and publishing…_github.com](https://github.com/musketyr/bom-seed "https://github.com/musketyr/bom-seed")

#### Creating BOM

You can use the [seed project](https://github.com/musketyr/bom-seed) to easily create your own BOM file. The project follows very simple conventions:

![](https://cdn-images-1.medium.com/max/800/1*K_7286ZZaQeDBc7spe16hg.png)

1.  (optionally) declare versions placeholders such as `groovy.version` in file `src/main/versions/_versions.properties`
2.  declare desired module version in a file `src/main/versions/<groupId>.properties` (for example `src/main/versions/org.codehaus.groovy.properties`) either explicitly such as `groovy = 2.5.4` or using the placeholder defined before `groovy = groovy.version`
3.  create a release on GitHub or just push a tag to the repository to release a new version of the BOM

![](https://cdn-images-1.medium.com/max/800/1*t_JGaxIAWS12cJnK8G06Gg.png)

![](https://cdn-images-1.medium.com/max/800/1*A0cbJ3IZqKE-rjfpHr773A.png)

![](https://cdn-images-1.medium.com/max/800/1*eGszaJoITt3si3-8vtHARA.png)

Once the GitHub Action is triggered by the new tag and when it is finished then the BOM will be available at `https://maven.pkg.github.com/<your org>/<your repo>`.

![](https://cdn-images-1.medium.com/max/800/1*Z8_pXAWcpJ1rucx6PW04QA.png)

![](https://cdn-images-1.medium.com/max/800/1*7i6GHE2BxhxwVF6bZ5Bkdw.png)

![](https://cdn-images-1.medium.com/max/800/1*_7ANJDTuxzyHYrUFm8vDsg.png)

Please, follow [the documentation](https://github.com/musketyr/bom-seed/blob/master/README.adoc) for a further reference.

#### Using BOM

To use the generated BOM you have to add the following lines into your Gradle build:

repositories {  
    maven { url 'https://maven.pkg.github.com/<repo>/<org>' }  
}

dependencies {  
    compile platform('<your group id>:<your bom name>:<version>')  
    // some dependency declared in the BOM  
    compile 'org.codehaus.groovy:groovy'  
}

If you are still using an older version of Gradle you can also use the Spring dependency plugin:

depedencyManagement {  
    imports {  
        mavenBom '<your group id>:<your bom name>:<version>'  
    }  
}

* * *
By [Vladimír Oraný](https://medium.com/@musketyr) on [December 3, 2019](https://medium.com/p/b3fd94301655).

[Canonical link](https://medium.com/@musketyr/how-to-manage-versions-using-maven-bom-gradle-and-github-b3fd94301655)

Exported from [Medium](https://medium.com) on February 15, 2026.