---
title: "How to Handle Changes in Gru's JSON Fixtures"
date: 2018-09-04
slug: how-to-handle-changes-in-gru-s-json-fixtures
source: medium
mediumId: "6592933fce25"
---It has been more than a year already since we open-sourced Gru — universal framework for testing HTTP interactions. Nowadays, many of our…

* * *

### How to Handle Changes in Gru's JSON Fixtures

It has been more than a year already since we open-sourced [Gru](https://agorapulse.github.io/gru/) — universal framework for testing HTTP interactions. Nowadays, many of our API endpoints are guarded by Gru test against unexpected changes. On the other hand, when we make an expected change then sometimes it is very laborious to reflect the change in the JSON fixtures. Luckily, today we have released version `0.6.5` which support automatic rewrite and merge of JSON fixtures.

Imagine you are having a simple endpoint returning information about natural satellites of a planet which used to return JSON matching the following content:

\[  
  {  
    **"id"**: 2,  
    **"name"**: **"Moon"**,  
    **"planet"**: **"Earth"**,  
    **"created"**: **"${json-unit.matches:isoDate}"**,  
    **"terraformed"**: **false**,  
    **"visited\_by"**: {  
      **"name"** : **"Eugene Cernan"**,  
      **"nickname"**: **"Gene"**    },  
    **"missed\_by"**: \[  
      {  
        **"name"** : **"Appolo 13"**      }  
    \]  
  }  
\]

You can notice `${json-unit.matches:isoDate}` placeholder which replaced the generated date which may be different every test execution.

Now, the API has changed to return slightly different JSON:

\[  
  {  
    **"id"**: 1,  
    **"name"**: **"Moon"**,  
    **"planet"**: **"Earth"**,  
    **"created"**: **"2013-12-04T16:04:48+0000"**,  
    **"colonised"**: **false**,  
    **"visited\_by"**: \[  
      {  
        **"name"**: **"Neil Armstrong"**,  
        **"nickname"**: **null**      }  
    \],  
    **"missed\_by"**: {  
      **"name"**: **"Appolo 13"**    }  
  }  
\]

Before version `0.6.5`, we used to update the fixtures using the following process:

1.  Delete the fixture file (assuming the JSON fixture file is managed by source control)
2.  Run the test to generate the new fixture file automatically
3.  Cherry-pick the desired changes using the source control compare dialog

![](https://cdn-images-1.medium.com/max/800/1*Gv1W5CygJk8rBYfau65XdA.png)

We usually used to keep the new file but cherry-pick all the JSON unit placeholders into the new file. After `0.6.5` release we only need to run the tests in _rewrite_ mode:

export COM\_AGORAPULSE\_GRU\_REWRITE=true  
./gradlew test  
unset COM\_AGORAPULSE\_GRU\_REWRITE

After running in rewrite mode the fixture file will be updated with a result of merging the old fixture file with a new response:

\[  
  {  
    **"id"**: 1,  
    **"name"**: **"Moon"**,  
    **"planet"**: **"Earth"**,  
    **"created"**: **"${json-unit.matches:isoDate}"**,  
    **"visited\_by"**: \[  
      {  
        **"name"**: **"Neil Armstrong"**,  
        **"nickname"**: **null**      }  
    \],  
    **"colonised"**: **false**,  
    **"missed\_by"**: {  
      **"name"**: **"Appolo 13"**    }  
  }  
\]

The rewrite process is smart enough, for example, to replace the `id` of the first satellite and also to keep the JSON unit placeholder as `created` property value. Also it ignores the files which don't need any change.

When the files get rewritten the tests fails forcing you to review the changes manually in case that human brain needs to be involved.

* * *

[**We’re Hiring**  
_Are you kick-ass fullstack or front-end dev that wants to work on AWS, Angular, Java or Groovy? You must contact us to join our dream team in Paris or Nantes_apply.workable.com](https://apply.workable.com/agorapulse/ "https://apply.workable.com/agorapulse/")[](https://apply.workable.com/agorapulse/)

By [Vladimír Oraný](https://medium.com/@musketyr) on [September 4, 2018](https://medium.com/p/6592933fce25).

[Canonical link](https://medium.com/@musketyr/how-to-handle-changes-in-grus-json-fixtures-6592933fce25)

Exported from [Medium](https://medium.com) on February 15, 2026.