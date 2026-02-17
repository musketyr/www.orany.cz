---
title: "Testing Legacy API Endpoints with Gru"
date: 2017-08-24
slug: testing-legacy-api-endpoints-with-gru
source: medium
mediumId: "5b614db048bd"
---Gru is new HTTP testing framework written in Groovy. One of its goals is to provide simple tool to test existing API endpoints. Let's take…

* * *

### Testing Legacy API Endpoints with Gru

[Gru](https://agorapulse.github.io/gru/) is new HTTP testing framework written in [Groovy](http://groovy-lang.org/). One of its goals is to provide simple tool to test existing API endpoints. Let's take a look how would we test for example [List user repositories](https://developer.github.com/v3/repos/#list-user-repositories) on [GitHub](https://github.com/).

For our simple example we create sample [Gradle](https://gradle.org/) project. If you don't have Gradle installed yet then follow the instructions from [Gradle Installation page](https://gradle.org/install/).

Run following commands to create sample Groovy library project:

mkdir github-gru-test  
cd github-gru-test  
gradle init --type groovy-library

Edit `build.gradle` file in the project and add following two lines into dependencies block:

testCompile '**com.agorapulse:gru-http:0.1.3'  
**testCompile **'com.fasterxml.jackson.core:jackson-databind:2.9.0'**

[Gradle](https://gradle.org/) has already created sample test file for you at `src/test/groovy/LibraryTest.groovy` so we can just replace its content.

**import** com.agorapulse.gru.Gru  
**import** com.agorapulse.gru.http.Http  
**import** org.junit.Rule  
**import** spock.lang.Specification  
  
**class** LibraryTest **extends** Specification {  
  
    _// Gru rule for testing HTTP endpoints_    @Rule Gru<Http> **gru** \= Gru._equip_(Http._steal_(**this**))  
  
    **def "test github api"**() {  
        **expect**:  
            **gru**.test {  
                _// issues GET request on given URL_                get **'https://api.github.com/users/agorapulse/repos'**                expect {  
                    _// assert the responded file is similar  
                    // to given fixture file_                    json **'agorapulseRepositories.json'**                }  
            }  
    }  
}

Run the test from the command line

./gradlew test

The very first run will fail. If we open the test report we can see the reason:

New fixture files were created: LibraryTest/agorapulseRepositories.json. Please, run the test again to verify it is repeatable.

The file `src/test/resources/LibraryTest/agorapulseRepositories.json` was created for you based on the actual response from the endpoint. It contains multiple entries for every repository in [Agorapulse GitHub repository](https://github.com/agorapulse). This might be problem as the response may change when new repository is added or removed. Luckily, [Gru](https://agorapulse.github.io/gru/) uses [JsonUnit](https://github.com/lukas-krecan/JsonUnit) to verify JSON file similarity. [JsonUnit](https://github.com/lukas-krecan/JsonUnit) provides option to ignore items in array an to ignore the array order so we can remove most of the entries and only keep the record of [Gru GitHub Repository](https://github.com/agorapulse/gru):

\[  
  {  
    **"id"**: 100955538,  
    **"name"**: **"gru"**,  
    **"full\_name"**: **"agorapulse/gru"**,  
    **"owner"**: {  
      **"login"**: **"agorapulse"**,  
      **"id"**: 3104895,  
      **"avatar\_url"**: **"https://avatars1.githubusercontent.com/u/3104895?v=4"**,  
      **"gravatar\_id"**: **""**,  
      **"url"**: **"https://api.github.com/users/agorapulse"**,  
      **"html\_url"**: **"https://github.com/agorapulse"**,  
      **"followers\_url"**: **"https://api.github.com/users/agorapulse/followers"**,  
      **"following\_url"**: **"https://api.github.com/users/agorapulse/following{/other\_user}"**,  
      **"gists\_url"**: **"https://api.github.com/users/agorapulse/gists{/gist\_id}"**,  
      **"starred\_url"**: **"https://api.github.com/users/agorapulse/starred{/owner}{/repo}"**,  
      **"subscriptions\_url"**: **"https://api.github.com/users/agorapulse/subscriptions"**,  
      **"organizations\_url"**: **"https://api.github.com/users/agorapulse/orgs"**,  
      **"repos\_url"**: **"https://api.github.com/users/agorapulse/repos"**,  
      **"events\_url"**: **"https://api.github.com/users/agorapulse/events{/privacy}"**,  
      **"received\_events\_url"**: **"https://api.github.com/users/agorapulse/received\_events"**,  
      **"type"**: **"Organization"**,  
      **"site\_admin"**: **false**    },  
    **"private"**: **false**,  
    **"html\_url"**: **"https://github.com/agorapulse/gru"**,  
    **"description"**: **"Groovy Unit Testing"**,  
    **"fork"**: **false**,  
    **"url"**: **"https://api.github.com/repos/agorapulse/gru"**,  
    **"forks\_url"**: **"https://api.github.com/repos/agorapulse/gru/forks"**,  
    **"keys\_url"**: **"https://api.github.com/repos/agorapulse/gru/keys{/key\_id}"**,  
    **"collaborators\_url"**: **"https://api.github.com/repos/agorapulse/gru/collaborators{/collaborator}"**,  
    **"teams\_url"**: **"https://api.github.com/repos/agorapulse/gru/teams"**,  
    **"hooks\_url"**: **"https://api.github.com/repos/agorapulse/gru/hooks"**,  
    **"issue\_events\_url"**: **"https://api.github.com/repos/agorapulse/gru/issues/events{/number}"**,  
    **"events\_url"**: **"https://api.github.com/repos/agorapulse/gru/events"**,  
    **"assignees\_url"**: **"https://api.github.com/repos/agorapulse/gru/assignees{/user}"**,  
    **"branches\_url"**: **"https://api.github.com/repos/agorapulse/gru/branches{/branch}"**,  
    **"tags\_url"**: **"https://api.github.com/repos/agorapulse/gru/tags"**,  
    **"blobs\_url"**: **"https://api.github.com/repos/agorapulse/gru/git/blobs{/sha}"**,  
    **"git\_tags\_url"**: **"https://api.github.com/repos/agorapulse/gru/git/tags{/sha}"**,  
    **"git\_refs\_url"**: **"https://api.github.com/repos/agorapulse/gru/git/refs{/sha}"**,  
    **"trees\_url"**: **"https://api.github.com/repos/agorapulse/gru/git/trees{/sha}"**,  
    **"statuses\_url"**: **"https://api.github.com/repos/agorapulse/gru/statuses/{sha}"**,  
    **"languages\_url"**: **"https://api.github.com/repos/agorapulse/gru/languages"**,  
    **"stargazers\_url"**: **"https://api.github.com/repos/agorapulse/gru/stargazers"**,  
    **"contributors\_url"**: **"https://api.github.com/repos/agorapulse/gru/contributors"**,  
    **"subscribers\_url"**: **"https://api.github.com/repos/agorapulse/gru/subscribers"**,  
    **"subscription\_url"**: **"https://api.github.com/repos/agorapulse/gru/subscription"**,  
    **"commits\_url"**: **"https://api.github.com/repos/agorapulse/gru/commits{/sha}"**,  
    **"git\_commits\_url"**: **"https://api.github.com/repos/agorapulse/gru/git/commits{/sha}"**,  
    **"comments\_url"**: **"https://api.github.com/repos/agorapulse/gru/comments{/number}"**,  
    **"issue\_comment\_url"**: **"https://api.github.com/repos/agorapulse/gru/issues/comments{/number}"**,  
    **"contents\_url"**: **"https://api.github.com/repos/agorapulse/gru/contents/{+path}"**,  
    **"compare\_url"**: **"https://api.github.com/repos/agorapulse/gru/compare/{base}...{head}"**,  
    **"merges\_url"**: **"https://api.github.com/repos/agorapulse/gru/merges"**,  
    **"archive\_url"**: **"https://api.github.com/repos/agorapulse/gru/{archive\_format}{/ref}"**,  
    **"downloads\_url"**: **"https://api.github.com/repos/agorapulse/gru/downloads"**,  
    **"issues\_url"**: **"https://api.github.com/repos/agorapulse/gru/issues{/number}"**,  
    **"pulls\_url"**: **"https://api.github.com/repos/agorapulse/gru/pulls{/number}"**,  
    **"milestones\_url"**: **"https://api.github.com/repos/agorapulse/gru/milestones{/number}"**,  
    **"notifications\_url"**: **"https://api.github.com/repos/agorapulse/gru/notifications{?since,all,participating}"**,  
    **"labels\_url"**: **"https://api.github.com/repos/agorapulse/gru/labels{/name}"**,  
    **"releases\_url"**: **"https://api.github.com/repos/agorapulse/gru/releases{/id}"**,  
    **"deployments\_url"**: **"https://api.github.com/repos/agorapulse/gru/deployments"**,  
    **"created\_at"**: **"2017-08-21T13:33:26Z"**,  
    **"updated\_at"**: **"2017-08-22T12:05:59Z"**,  
    **"pushed\_at"**: **"2017-08-24T03:51:36Z"**,  
    **"git\_url"**: **"git://github.com/agorapulse/gru.git"**,  
    **"ssh\_url"**: **"git@github.com:agorapulse/gru.git"**,  
    **"clone\_url"**: **"https://github.com/agorapulse/gru.git"**,  
    **"svn\_url"**: **"https://github.com/agorapulse/gru"**,  
    **"homepage"**: **null**,  
    **"size"**: 332,  
    **"stargazers\_count"**: 0,  
    **"watchers\_count"**: 0,  
    **"language"**: **"Java"**,  
    **"has\_issues"**: **true**,  
    **"has\_projects"**: **true**,  
    **"has\_downloads"**: **true**,  
    **"has\_wiki"**: **true**,  
    **"has\_pages"**: **true**,  
    **"forks\_count"**: 0,  
    **"mirror\_url"**: **null**,  
    **"open\_issues\_count"**: 0,  
    **"forks"**: 0,  
    **"open\_issues"**: 0,  
    **"watchers"**: 0,  
    **"default\_branch"**: **"master"**  }  
\]

We need to update the test to use the additional [JsonUnit](https://github.com/lukas-krecan/JsonUnit) options:

_/\*  
 \* This Spock specification was generated by the Gradle 'init' task.  
 \*/  
  
  
_**import** com.agorapulse.gru.Gru  
**import** com.agorapulse.gru.http.Http  
**import** org.junit.Rule  
**import** spock.lang.Specification  
  
**class** LibraryTest **extends** Specification {  
  
    _// Gru rule for testing HTTP endpoints_    @Rule Gru<Http> **gru** \= Gru._equip_(Http._steal_(**this**))  
  
    **def "test github api"**() {  
        **expect**:  
            **gru**.test {  
                _// issues GET request on given URL_                get **'https://api.github.com/users/agorapulse/repos'**                expect {  
                    _// assert the responded file is similar   
                    // to fixture file_                    json **'agorapulseRepositories.json'**,  
                            **_IGNORING\_EXTRA\_ARRAY\_ITEMS_**,  
                            **_IGNORING\_ARRAY\_ORDER_**                }  
            }  
    }  
}

If we run `gradle test` again the test should be pass. But if you go to [Gru GitHub Repository](https://github.com/agorapulse/gru) and star the project and run `gradle test` again it will fail with following error.

Array "" has different content. Missing values ...

For example if you delete the `agorapulseRepositories.json` file, rerun the test and inspect the JSON returned you can see that the number of `stargazers_count` is different. For situations like this, [JsonUnit](https://github.com/lukas-krecan/JsonUnit) provides various placeholder which can be used instead of values which often changes and [Gru](https://agorapulse.github.io/gru/) adds [couple of more](https://agorapulse.github.io/gru/#_jsonunit_primer). Replace the content of `agorapulseRepositories.json` with following JSON array which is using the placeholder:

\[  
    {  
        **"id"**: 100955538,  
        **"name"**: **"gru"**,  
        **"full\_name"**: **"agorapulse/gru"**,  
        **"owner"**: {  
            **"login"**: **"agorapulse"**,  
            **"id"**: 3104895,  
            **"avatar\_url"**: **"https://avatars1.githubusercontent.com/u/3104895?v=4"**,  
            **"gravatar\_id"**: **""**,  
            **"url"**: **"https://api.github.com/users/agorapulse"**,  
            **"html\_url"**: **"https://github.com/agorapulse"**,  
            **"followers\_url"**: **"https://api.github.com/users/agorapulse/followers"**,  
            **"following\_url"**: **"https://api.github.com/users/agorapulse/following{/other\_user}"**,  
            **"gists\_url"**: **"https://api.github.com/users/agorapulse/gists{/gist\_id}"**,  
            **"starred\_url"**: **"https://api.github.com/users/agorapulse/starred{/owner}{/repo}"**,  
            **"subscriptions\_url"**: **"https://api.github.com/users/agorapulse/subscriptions"**,  
            **"organizations\_url"**: **"https://api.github.com/users/agorapulse/orgs"**,  
            **"repos\_url"**: **"https://api.github.com/users/agorapulse/repos"**,  
            **"events\_url"**: **"https://api.github.com/users/agorapulse/events{/privacy}"**,  
            **"received\_events\_url"**: **"https://api.github.com/users/agorapulse/received\_events"**,  
            **"type"**: **"Organization"**,  
            **"site\_admin"**: **false**        },  
        **"private"**: **false**,  
        **"html\_url"**: **"https://github.com/agorapulse/gru"**,  
        **"description"**: **"Groovy Unit Testing"**,  
        **"fork"**: **false**,  
        **"url"**: **"https://api.github.com/repos/agorapulse/gru"**,  
        **"forks\_url"**: **"https://api.github.com/repos/agorapulse/gru/forks"**,  
        **"keys\_url"**: **"https://api.github.com/repos/agorapulse/gru/keys{/key\_id}"**,  
        **"collaborators\_url"**: **"https://api.github.com/repos/agorapulse/gru/collaborators{/collaborator}"**,  
        **"teams\_url"**: **"https://api.github.com/repos/agorapulse/gru/teams"**,  
        **"hooks\_url"**: **"https://api.github.com/repos/agorapulse/gru/hooks"**,  
        **"issue\_events\_url"**: **"https://api.github.com/repos/agorapulse/gru/issues/events{/number}"**,  
        **"events\_url"**: **"https://api.github.com/repos/agorapulse/gru/events"**,  
        **"assignees\_url"**: **"https://api.github.com/repos/agorapulse/gru/assignees{/user}"**,  
        **"branches\_url"**: **"https://api.github.com/repos/agorapulse/gru/branches{/branch}"**,  
        **"tags\_url"**: **"https://api.github.com/repos/agorapulse/gru/tags"**,  
        **"blobs\_url"**: **"https://api.github.com/repos/agorapulse/gru/git/blobs{/sha}"**,  
        **"git\_tags\_url"**: **"https://api.github.com/repos/agorapulse/gru/git/tags{/sha}"**,  
        **"git\_refs\_url"**: **"https://api.github.com/repos/agorapulse/gru/git/refs{/sha}"**,  
        **"trees\_url"**: **"https://api.github.com/repos/agorapulse/gru/git/trees{/sha}"**,  
        **"statuses\_url"**: **"https://api.github.com/repos/agorapulse/gru/statuses/{sha}"**,  
        **"languages\_url"**: **"https://api.github.com/repos/agorapulse/gru/languages"**,  
        **"stargazers\_url"**: **"https://api.github.com/repos/agorapulse/gru/stargazers"**,  
        **"contributors\_url"**: **"https://api.github.com/repos/agorapulse/gru/contributors"**,  
        **"subscribers\_url"**: **"https://api.github.com/repos/agorapulse/gru/subscribers"**,  
        **"subscription\_url"**: **"https://api.github.com/repos/agorapulse/gru/subscription"**,  
        **"commits\_url"**: **"https://api.github.com/repos/agorapulse/gru/commits{/sha}"**,  
        **"git\_commits\_url"**: **"https://api.github.com/repos/agorapulse/gru/git/commits{/sha}"**,  
        **"comments\_url"**: **"https://api.github.com/repos/agorapulse/gru/comments{/number}"**,  
        **"issue\_comment\_url"**: **"https://api.github.com/repos/agorapulse/gru/issues/comments{/number}"**,  
        **"contents\_url"**: **"https://api.github.com/repos/agorapulse/gru/contents/{+path}"**,  
        **"compare\_url"**: **"https://api.github.com/repos/agorapulse/gru/compare/{base}...{head}"**,  
        **"merges\_url"**: **"https://api.github.com/repos/agorapulse/gru/merges"**,  
        **"archive\_url"**: **"https://api.github.com/repos/agorapulse/gru/{archive\_format}{/ref}"**,  
        **"downloads\_url"**: **"https://api.github.com/repos/agorapulse/gru/downloads"**,  
        **"issues\_url"**: **"https://api.github.com/repos/agorapulse/gru/issues{/number}"**,  
        **"pulls\_url"**: **"https://api.github.com/repos/agorapulse/gru/pulls{/number}"**,  
        **"milestones\_url"**: **"https://api.github.com/repos/agorapulse/gru/milestones{/number}"**,  
        **"notifications\_url"**: **"https://api.github.com/repos/agorapulse/gru/notifications{?since,all,participating}"**,  
        **"labels\_url"**: **"https://api.github.com/repos/agorapulse/gru/labels{/name}"**,  
        **"releases\_url"**: **"https://api.github.com/repos/agorapulse/gru/releases{/id}"**,  
        **"deployments\_url"**: **"https://api.github.com/repos/agorapulse/gru/deployments"**,  
        **"created\_at"**: **"2017-08-21T13:33:26Z"**,  
        **"updated\_at"**: **"${json-unit.matches:isoDate}"**,  
        **"pushed\_at"**: **"${json-unit.matches:isoDate}"**,  
        **"git\_url"**: **"git://github.com/agorapulse/gru.git"**,  
        **"ssh\_url"**: **"git@github.com:agorapulse/gru.git"**,  
        **"clone\_url"**: **"https://github.com/agorapulse/gru.git"**,  
        **"svn\_url"**: **"https://github.com/agorapulse/gru"**,  
        **"homepage"**: **null**,  
        **"size"**: **"${json-unit.any-number}"**,  
        **"stargazers\_count"**: **"${json-unit.any-number}"**,  
        **"watchers\_count"**: **"${json-unit.any-number}"**,  
        **"language"**: **"Java"**,  
        **"has\_issues"**: **true**,  
        **"has\_projects"**: **true**,  
        **"has\_downloads"**: **true**,  
        **"has\_wiki"**: **true**,  
        **"has\_pages"**: **true**,  
        **"forks\_count"**: **"${json-unit.any-number}"**,  
        **"mirror\_url"**: **null**,  
        **"open\_issues\_count"**: **"${json-unit.any-number}"**,  
        **"forks"**: **"${json-unit.any-number}"**,  
        **"open\_issues"**: **"${json-unit.any-number}"**,  
        **"watchers"**: **"${json-unit.any-number}"**,  
        **"default\_branch"**: **"master"**    }  
\]

Now the test is future proof. Any changes in watchers, stargazers or any pushes to the repository will not break the test.

For this example we've used existing public API endpoint but in your application you will test your own API. For example, [Gru](https://agorapulse.github.io/gru/) comes with out-of-box support for unit testing [Grails](https://grails.org/) controllers. Read the [documentation](https://agorapulse.github.io/gru/) to see more examples and [follow the project on GitHub](https://github.com/agorapulse/gru) to be notified about the latest changes.

* * *


