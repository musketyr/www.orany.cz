---
title: "How to Efficiently Upgrade to Latest Version of Gradle"
date: 2019-12-10
slug: how-to-efficiently-upgrade-to-latest-version-of-gradle
source: medium
mediumId: "ada64f1f5097"
---Gradle is a great build tool which allows you to write versatile build code to achieve whatever you want. The biggest drawback for me is…

* * *

### How to Efficiently Upgrade to Latest Version of Gradle

[Gradle](https://gradle.org/) is a great build tool which allows you to write versatile build code to achieve whatever you want. The biggest drawback for me is the velocity of the Gradle releases and the corresponding breaking changes. You may say that one major release a year is ok but I currently manage tens of small open-sourced projects for me build script is something I should barely be touched except adding dependencies and new subprojects. So the need to upgrade happens only once in a couple of years and obviously not the only one as [most of the projects on GitHub are still using Gradle 4.x](https://github.com/search?l=Java+Properties&q=distributions%2Fgradle-4&type=Code):

![](https://cdn-images-1.medium.com/max/800/1*VshRGpt5h9LUUbF0nAM9og.png)

I usually face a storm of issues from the build when I try to get the latest possible Gradle version working. Jumping form a very old version to the newest one is obviously not a good way to go. It's always better to move stepwise so I took [GitHub Actions](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/about-github-actions) for a rescue.

### Stepwise Gradle Upgrade with Gradle Actions

Following steps could be achieved with any continuous integration tool but [GitHub Actions allow to run much more parallel jobs at once](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/about-github-actions#usage-limits) than other available CI servers I know (at least for free).

#### Setting up GitHub Action Workflow

The idea is to run your project against every possible minor version of Gradle between the one currently present in the project (`4.7`) and the latest one (`6.0.1` as a time of writing) to find you the which version still working with the current setup. You may argue that it would be enough to just use the major versions but there might be some consequences (e.g. upgrade of static analysis tools) which may also happen in minor versions.

We start with a workflow file located in `.github/workflows/gradle.yml`:

```yaml
name: Java CI

on: \[push, pull_request\]

jobs:
  build:

    strategy:
      fail-fast: false    # run all parallel jobs
      matrix:
        gradle:
```

          - 6.6.1         _\# latest version_          \- 6.5.1  
          - 6.4.1  
          - 6.3  
          - 6.2.2  
          - 6.1.1  
          - 6.0.1  
          - 5.6.4  
          - 5.5.1  
          - 5.4.1  
          - 5.3.1  
          - 5.2.1  
          - 5.1.1  
          - 4.10.3  
          - 4.9  
          - 4.8.1  
          - 4.7           # current version  
  
```groovy
    runs-on: ubuntu-latest

    env:
      GRADLE_OPTS: "-Xmx6g -Xms4g"

    steps:
      - uses: actions/checkout@v1

      - name: Set up JDK 1.8
        uses: actions/setup-java@v1
        with:
          java-version: 1.8
      - uses: eskatos/gradle-command-action@v1
        with:
          arguments: check
          gradle-version: ${{ matrix.gradle }}
```


The workflow checks out the code then it installs Java and it runs Gradle `check` task for all versions we are interested in. This may not fully guarantee that the other tasks such as deployment will work but it should detect most of the problems.

When all the jobs are finished in my project I have got the following results:

![](https://cdn-images-1.medium.com/max/800/1*F0DMHE9jbEBDSiVZILVdyQ.png)

The results show me that the latest version I can use is `4.10.3`. I suggest you to use [SDKMAN](https://sdkman.io/) to manage the local versions of frameworks so you can upgrade the Gradle wrapper by using the latest passing version and running the `wrapper` command.

sdk use gradle 4.10.3  
gradle wrapper

You should also remove the already passing version numbers from the matrix because they are no longer needed:

```yaml
name: Java CI

on: \[push, pull_request\]

jobs:
  build:

    strategy:
      fail-fast: false
      matrix:
        gradle:
```

          - 6.0.1  
          - 5.6.4  
          - 5.5.1  
          - 5.4.1  
          - 5.3.1  
          - 5.2.1  
          - 5.1.1  
          - 4.10.3        # newest passing version  
  
```groovy
    runs-on: ubuntu-latest

    env:
      GRADLE_OPTS: "-Xmx6g -Xms4g"

    steps:
      - uses: actions/checkout@v1

      - name: Set up JDK 1.8
        uses: actions/setup-java@v1
        with:
          java-version: 1.8
      - uses: eskatos/gradle-command-action@v1
        with:
          arguments: check
          gradle-version: ${{ matrix.gradle }}
```


Then commit the changes in case of that you will need to revert some changes.

#### Stepwise Migration

Now there's a time to fix the problem for the first failing version. You may get the good picture of what's wrong simply by expanding the outputs in the GitHub Actions console. Also, the deprecation notes from the last working version may help. If the logs are not descriptive enough you can always use [SDKMAN](https://sdkman.io/) once again to run the build locally against different version than the wrapper one.

sdk use gradle 5.1.1  
gradle check

I will summarize some changes that my project required in the next section but each project is quite unique so you will probably face a suite of very different issues depending on which features and plugins you are using.

You repeat the steps unless you reach only the currently latest released version

1.  fix the build problems for the current version
2.  push the changes to GitHub
3.  identity the new latest version which passes
4.  update the Gradle wrapper to the latest passing version
5.  remove the already passing version numbers from the workflow file
6.  push the changes to GitHub
7.  return to step 1 if required

Once you reach the latest version you can easily remove the `matrix` and `gradle-version` from the workflow file:

```yaml
name: Java CI

on:
  push:                       # run on push
  pull_request:               # run on PR

jobs:
  build:    runs-on: ubuntu-latest
    env:
      GRADLE_OPTS: "-Xmx6g -Xms4g
    steps:
    - uses: actions/checkout@v1

    - name: Set up JDK 1.8
      uses: actions/setup-java@v1
      with:
        java-version: 1.8
    - uses: eskatos/gradle-command-action@v1
      with:
        arguments: check --stacktrace
```


To be sure that you won't fall behind the Gradle releases I would suggest you create a separate workflow file `gradle-versions-watchdog.yml` which will be triggered regularly. `scheduled` configuration will run once a month which is useful for projects which barely changes but you still want to keep Gradle versions up to date as `rc` is the latest release candidate version which is currently available.

```yaml
name: Gradle RC Watchdog

on:
  schedule:
    - cron:  '0 0 1 \* \*'      \# run once a month

jobs:
  build:    runs-on: ubuntu-latest
    env:
      GRADLE_OPTS: "-Xmx6g -Xms4g
    steps:
    - uses: actions/checkout@v1

    - name: Set up JDK 1.8
      uses: actions/setup-java@v1
      with:
        java-version: 1.8
    - uses: eskatos/gradle-command-action@v1
      with:
        arguments: check --stacktrace
        gradle-version: rc
```


### The Story of One Upgrade

I have created this guide based on my experience of upgrading Gradle for [Micronaut Libraries project](https://github.com/agorapulse/micronaut-libraries). The build was pretty simple and consists of

*   running a static analysis using [CheckStyle](https://checkstyle.sourceforge.io/) and [CodeNarc](http://codenarc.sourceforge.net/)
*   running all tests with aggregated [JaCoCo](https://www.eclemma.org/jacoco/) coverage
*   publishing the coverage to [Coveralls.io](https://coveralls.io/github/agorapulse/micronaut-libraries)
*   generating the guide from [Asiidoctor](https://asciidoctor.org/) files
*   publishing the guide to [GitHub Pages](https://agorapulse.github.io/micronaut-libraries/)
*   publishing the artefacts to [Bintray](https://bintray.com/beta/#/agorapulse/libs/micronaut-aws-sdk)

These are pretty common tasks which you can find in most of the open-source projects. There is even a great bunch of plugins called [Kordamp](https://aalmiray.github.io/kordamp-gradle-plugins/) which simplifies most of the tasks mentioned. It also provides test aggregation task which wast the reason I have been doing the migration.

I was expecting a lot of problems with the incompatible plugins but I only had to give up on [JaCoCo Full Report Plugin](https://plugins.gradle.org/plugin/com.palantir.jacoco-full-report) which is no longer supported in Gradle 6. I was willing to sacrifice that one as I want to migrate to [Kordamp](https://aalmiray.github.io/kordamp-gradle-plugins/) once the upgrade is finished and it provides the same functionality.

So the first issue was pretty trivial to fix — since 5.x there are no special characters allowed in the project name so I had to fix these.

![](https://cdn-images-1.medium.com/max/1200/1*d5smlYbIGtWmKK6ETq3jrw.png)

Another issue was caused by the upgrade of [CheckStyle](https://checkstyle.sourceforge.io/) with breaking changes in the configuration file. And of course, fixing the new default checks such as parentheses around lambda parameters.

![](https://cdn-images-1.medium.com/max/1200/1*f_23E5G6aeYMKdYdIVjh4Q.png)

A different story is the changed dependency resolution mechanism. To make the story short — Gradle 5.x won't resolve the transitive dependencies correctly for libraries published with Gradle 4.x and older as they used to be published with a wrong Maven scope.

![](https://cdn-images-1.medium.com/max/1200/1*42A9DUxWb5zrhaM2P7bnsA.png)

The last step was to migrate the behaviour of the annotation processors. The annotation processors must be now declared is special configurations `annotationProcessor` and `testAnnotationProcessor`.

![](https://cdn-images-1.medium.com/max/1200/1*7J3NHinixfJiLsFw34Th2g.png)

This was the last step of the upgrade which were needed for the particular project. There are no significant notable improvements but on the other hand, there are significant losses in terms of functionality which is no longer supported and needs to be migrated such as publishing the code coverage.

### Summary

Keeping the build tool up to date is an unimportant task for many small projects. The gains are not obvious compared to the time which is spent on performing the upgrade and which can be spent on some more useful tasks. It can easily happen that you will have to sacrifice some of the functionality of your current build as there is also a lot of open-source plugins which failed to keep the pace with Gradle's release cycle.

I'm currently putting hope to the [Kordamp](https://aalmiray.github.io/kordamp-gradle-plugins/) plugin suite which eliminates part of the flexibility of Gradle but should builds which are easier to maintain and less vulnerable to break during the upgrades. I will summarize the migration in another post if I succeed.

#### **Revision History**

```groovy
2019–12–12: Suggested to create separate workflow file for regular Gradle RC checks.
```


* * *


