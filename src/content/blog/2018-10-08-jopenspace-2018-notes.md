---
title: "jOpenSpace 2018 Notes"
date: 2018-10-08
slug: jopenspace-2018-notes
source: medium
mediumId: "5f6716aa053e"
---Last weekend I’ve spent in lovely Bohemian-Moravian Highlands attending jOpenSpace 2018 unconference. jOpenSpace was found by current…

* * *

### jOpenSpace 2018 Notes

![](https://cdn-images-1.medium.com/max/800/1*ig9ZYOfWMJpjPKvpjYqAKw.png)

Last weekend I’ve spent in lovely Bohemian-Moravian Highlands attending jOpenSpace 2018 unconference. jOpenSpace was found by current Chief Happiness Officer (CHO) [Michal Šrajer](https://medium.com/u/cb2f9d1f85f7) at [Avast](https://www.avast.com/) exactly 10 years ago to bring together Java enthusiasts but it is no longer dedicated to Java ecosystem only. The unconference consists of lightning talks every attendee must hold and optional workshops and discussion groups parallel to the main track. Summary of some of the most interesting topics follows.

[Michal Šrajer](https://medium.com/u/cb2f9d1f85f7) was also given the opportunity to speak during the very first keynote. He explained his journey becoming the CHO in his startup company Inmite which was later acquired by [Avast](https://www.avast.com/). They were three founders and Chief Executive Officer and Chief Financial Officer roles were already taken and Michal wanted to be also Chief of something and the choice was made to become the chief of Happiness. What started as a kind of a joke actually became his passion. The most interesting part of his talk was an introduction to the concept of [Teal Organisations](http://www.reinventingorganizationswiki.com/Teal_Organizations) — a concept introduced by Frédéric Laloux’s in the book [Reinventing Organisations](http://www.reinventingorganizations.com/).

> The Teal paradigm refers to the next stage in the evolution of human consciousness. When applied to organizations, this paradigm views the organization as an independent force with its own purpose, and not merely as a vehicle for achieving management’s objectives. Teal organizations are characterized by self-organization and self-management. The hierarchical “predict and control” pyramid of Orange is replaced with a decentralized structure consisting of small teams that take responsibility for their own governance and for how they interact with other parts of the organization. Assigned positions and job descriptions are replaced with a multiplicity of roles, often self-selected and fluid. People’s actions are guided not by orders from someone up the chain of command but by ‘listening’ to the organization’s purpose. Unlike the highly static nature of Amber, Orange and Green organizations, the organizational structure in Tealis characterized by rapid change and adaptation, as adjustments are continuously made to better serve the organization’s purpose.

> [http://www.reinventingorganizationswiki.com/Teal\_Organizations](http://www.reinventingorganizationswiki.com/Teal_Organizations)

[Roman Pichlik](https://medium.com/u/1e8822ced9d7) shared how [Zonky engineering](https://medium.com/u/6892f56fe693) team implemented [QA in production](https://martinfowler.com/articles/qa-in-production.html) concept. They are using tens of [Launch Darkly](https://launchdarkly.com/) feature flags to create fine-grained rules to either just a portion of the customers or to just the development team using IP rules. Once the feature is either accepted or rejected then the feature flag is removed from the code. Sounds like a perfect candidate for [Remember annotation](https://medium.com/agorapulse-stories/let-your-groovy-code-remember-your-sins-7faf4e53dd7c) if they were using Groovy.

[Martin Talpa](https://www.linkedin.com/in/martin-talpa-7378825/) introduced us into a history of how was created the computers’ user interface we all are using every day from [Memex](https://en.wikipedia.org/wiki/Memex) to the world wide web. The sparkle of [Memex](https://en.wikipedia.org/wiki/Memex) incepted ideas in other peoples’ mind which paved the road for [Tim Berners-Lee](https://en.wikipedia.org/wiki/Tim_Berners-Lee). It was interesting to see how many ideas and things were created too early such [Xerox Alto](https://en.wikipedia.org/wiki/Xerox_Alto) and never caught up. Martin also introduced us to [The Mother of All Demos](https://www.youtube.com/watch?v=yJDv-zdhzMY).

[Jan Šimonek](https://www.linkedin.com/in/jan-%C5%A1imonek-38406462/) introduces a concept of [The Test Driven Development Tournament](https://suitebot.disccon.com/). In a one day, several groups of people are trying to implement an algorithm. As the tournament is supposed to be fun it is usually a game algorithm and the teams are proving their algorithms against each other just a couple of times during the tournament day. Meanwhile, they can only develop against their tests. Sadly, the tournament resources are not public but I can imagine developing a similar game with [Micronaut](https://hackernoon.com/what-is-micronaut-37a6565f217d) where the individual solutions will be registered over service discovery such as [Consul](https://www.consul.io/). You can see the demo of the one round in SuiteBot 2018 challenge below:

[Jan Novotný](https://medium.com/u/b4b593a1efc5) shared various improvement developers can do to deliver better user experience during form validation. One of the interesting concepts was going beyond regular expression for email validation but using`MX` DNS records to figure out if email's domain really supports accepting emails and warn the users if the records are not found. He also emphasized that whenever we help the user to enter simpler format than expected (e.g. date, phone number, website address) we should always inform the user what will be the result (e.g. `https://www.example.com` instead of `example.com`).

[Martin Strejc](https://www.linkedin.com/in/martin-strejc-2b317116/) shared one of the team members typologies he learned from [Tomáš Busek](http://www.tomas-busek.cz/) — Chieftain and Shaman. Whereas the role of Chieftain is focused on material values and decision making, planning, judging and hunting, Shaman’s role cares about spiritual values. Shaman connects and reconnects people and organizes the rituals. An inspiring idea was that shamans held rituals not only for victory moments but also for the moments of failures.

There were many other interesting talks and an overall feeling is very positive and I can’t wait to implement at least some of the ideas introduced there.

* * *
By [Vladimír Oraný](https://medium.com/@musketyr) on [October 8, 2018](https://medium.com/p/5f6716aa053e).

[Canonical link](https://medium.com/@musketyr/jopenspace-2018-notes-5f6716aa053e)

Exported from [Medium](https://medium.com) on February 15, 2026.