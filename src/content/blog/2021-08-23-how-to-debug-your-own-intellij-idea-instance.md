---
title: "How to Debug Your Own IntelliJ IDEA Instance"
date: 2021-08-23
slug: how-to-debug-your-own-intellij-idea-instance
source: medium
mediumId: "7d7df185a48d"
---Some time ago, I have adopted CodeNarc IDEA plugin which helps to detect(and soon it will help fixing) Groovy code style violations.

* * *

### How to Debug Your Own IntelliJ IDEA Instance

Some time ago, I have adopted CodeNarc IDEA plugin which helps to detect(and soon it will help fixing) Groovy code style violations.

[**CodeNarc - IntelliJ IDEs Plugin | Marketplace**  
_CodeNarc analyzes Groovy code for defects, bad practices, inconsistencies, style issues and more._plugins.jetbrains.com](https://plugins.jetbrains.com/plugin/5925-codenarc "https://plugins.jetbrains.com/plugin/5925-codenarc")[](https://plugins.jetbrains.com/plugin/5925-codenarc)

I have a version of a plugin in the beta channel which works great but sometimes the plugin code throws a `StackOverflowError` that I am not able to emulate in the sandbox but that only occurs on my own IntelliJ IDEA instance. It has been also reported by my coworkers who help me with testing so I wanted to fix the issue before releasing the plugin to the general public. I need to be able to debug my own IntelliJ IDEA instance to get more details about the issue.

The first step is to launch the instance in debug mode. To do so, you need to edit the `idea.vmoptions` file using _Edit Custom VM Options…_ action:

![](https://cdn-images-1.medium.com/max/800/1*oTy30B4mYPkBXQW0oyHiSg.png)

Add the following option to the end of the file:

\-agentlib:jdwp=transport=dt\_socket,server=y,suspend=n,address=5005

![](https://cdn-images-1.medium.com/max/800/1*IPkizt8x8vYdpcPTyhC_iA.png)

Save the file and restart Intellij IDEA.

_If you fail to update the file for some reason and your IntelliJ instance won't start anymore then you can find the location of_ `_idea.vmoptions_` _in the_ [_IntelliJ configuration directory_](https://www.jetbrains.com/help/idea/directories-used-by-the-ide-to-store-settings-caches-plugins-and-logs.html#config-directory) _and edit it with another text editor._

**You cannot debug the instance from within the instance itself.** One of the options is to launch the sandboxed IDE from the plugin's project. If you are using Gradle to develop the plugin then you can run the following task:

./gradlew runIde

Other options are either downloading a different edition of the IDE (e.g. the community edition instead of ultimate) or launching the IDE with different configuration directories.

[**Changing IDE default directories used for config, plugins, and caches storage**  
_user profile drive runs out of space disk is slow and you want to use faster HDD or SSD for caches default user profile…_intellij-support.jetbrains.com](https://intellij-support.jetbrains.com/hc/en-us/articles/207240985 "https://intellij-support.jetbrains.com/hc/en-us/articles/207240985")[](https://intellij-support.jetbrains.com/hc/en-us/articles/207240985)

Once your regular IntelliJ IDEA instance has started then launch the other one, open the plugin's code and run _Attach to Process_ action:

![](https://cdn-images-1.medium.com/max/800/1*bSDPpI_TuasHPvsV8KLBrw.png)

You will see `idea` process ready to be attached:

![](https://cdn-images-1.medium.com/max/800/1*C61FY2Q91n3DfmjGzZ90MA.png)

You will see that the debugger is attached to your IDE now and you can start debugging your plugin.

![](https://cdn-images-1.medium.com/max/800/1*igIr9XzVSquG1MOtA0ddwQ.png)

Once you are finished, do not forget to remove the debugging configuration from the `idea.vmoptions` file.

_Many thanks to Yann Cébron, the developer advocate of IntelliJ Platform, for helping me setting up the process._

By [Vladimír Oraný](https://medium.com/@musketyr) on [August 23, 2021](https://medium.com/p/7d7df185a48d).

[Canonical link](https://medium.com/@musketyr/how-to-debug-your-own-intellij-idea-instance-7d7df185a48d)

Exported from [Medium](https://medium.com) on February 15, 2026.