title=Everyday Gaelyk: Solving java.lang.NoClassDefFoundError: com/google/appengine/api/search/AddResponse
date=2013-03-19
type=post
tags=blog, gaelyk 2.0, gaelyk, bugfix
status=published
~~~~~~

Today, [Google App Engine](https://developers.google.com/appengine/) Team said farewell to [deprecated classes](https://code.google.com/p/googleappengine/wiki/SdkForJavaReleaseNotes#Version_1.7.5_-_February_13,_2013) in [version 1.7.6](https://code.google.com/p/googleappengine/wiki/SdkForJavaReleaseNotes#Version_1.7.6_-_March_19,_2013) causing sevral sites crashed. Even
the application was deployed with older [SDK](https://developers.google.com/appengine/downloads#Google_App_Engine_SDK_for_Java) the `AddResponse`
class just disappeared. Yes, we all were warned in that release notes but who cares about the warnings. I wish they have mentioned
when the new version will be released too so we'll be extra careful today.

For [Gaelyk](http://gaelyk.appspot.com) users there are two choices to fix your application:

* Switch to [Gaelyk 2.0 snapshot](/blog/2013/2013-03-16-everyday-gaelyk-living-on-the-edge-with-gaelyk-snapshots.html) unless version 2.0 is finally out
* Build [Gaelyk 1.3 snapshot](https://github.com/mmigdol/gaelyk/tree/removeSearchFrom13) fixed by [Michael Migdol](https://github.com/mmigdol) and use it
  
Both solutions was discussed [in this thread](https://groups.google.com/forum/?hl=en&amp;fromgroups=#!topic/gaelyk/s2vNNVlv0ME).
If you use `GaelykCategory` class directly in your code, 1.3 snapshot is better option for you because the class is no longer present in the
code base of 2.0 snapshots. The category class was broken into serval separate extension modules.

If you're using plain Java in your Google App Engine application, just switch to latest 1.7.6 SDK and compliation errors will
guide you.



