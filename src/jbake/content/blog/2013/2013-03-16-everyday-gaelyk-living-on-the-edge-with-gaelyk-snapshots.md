title=Everyday Gaelyk: Living on the edge with Gaelyk snapshots
date=2013-03-16
type=post
tags=blog,gaelyk 2.0, gradle
status=published
~~~~~~

I've setup [Gaelyk Continuous Integration Server](https://gaelyk.ci.cloudbees.com/) on [CloudBees](http://www.cloudbees.com) few months ago so each time
the change is pushed to Gaelyk repository and the tests are passing then the new JARs are pushed to the snapshot repository currently hosted at
[SonaType OSS](https://oss.sonatype.org/content/repositories/snapshots/). If you like living on the edge and using the latest features you can 
use these in your application.

<!--more-->

Updating [Gradle](http://www.gradle.org) build is pretty easy. Only thing you need to do is to declare
[SonaType snapshot repository](https://oss.sonatype.org/content/repositories/snapshots/) in `repositories` configuration closure

*Repositories configuration*

    repositories {
        ...
        mavenRepo url: 'https://oss.sonatype.org/content/repositories/snapshots/'
    }

and change the version of your [Gaelyk](http://gaelyk.appspot.com) dependency to the snapshot version, `2.0-SNAPSHOT` at the time of writing.

*Dependencies configuration*

    dependencies {
        ...
        compile 'org.gaelyk:gaelyk:2.0-SNAPSHOT'
    }
    
<span class="label">EDIT</span>
By default Gradle caches the snapshot versions. 
To disable caching for all snapshot versions add following to your `build.gradle` file:
    
*Disable snapshot versions caching*
    
    configurations.all {
        resolutionStrategy.cacheChangingModulesFor 0, 'seconds'
    }
    
If you haven't adopted Gradle for Gaelyk development, you can download latest snapshots from 
[Sonatype OSS Snapshot Repository](https://oss.sonatype.org/content/repositories/snapshots/org/gaelyk/gaelyk/2.0-SNAPSHOT/). Be sure you are using
the same [Groovy](http://groovy.codehaus.org/Download) 
and [GAE SDK](https://developers.google.com/appengine/downloads) version as listed in [common build configuration](https://raw.github.com/gaelyk/gaelyk/master/common.gradle).

Here you go, you're now using the latest version of [Gaelyk](http://gaelyk.appspot.com) available.


