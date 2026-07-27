---
title: "Live Long and Prosper: Retiring Spock and Groovy From Our Monorepo"
date: 2026-07-27
tags: ["groovy", "java", "testing", "ai", "agents"]
source: substack
canonicalUrl: "https://telegraphic.substack.com/p/live-long-and-prosper-retiring-spock"
---
*How an independent agent reviewer removed the bottleneck from a migration we had postponed for a year.*

![](https://substackcdn.com/image/fetch/$s_!H9ZR!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd956d68a-76c7-4e4a-bd2b-123b260e767b_976x1101.jpeg)

At Agorapulse, we have a monorepo split by tribe and domain, with dozens of backend services. Most of them run on Micronaut. For a long time, the codebase was a mix of Java and Groovy.

Last year we migrated all production code to Java. That made sense. Builds got cleaner, compilation got faster, tooling improved, and we had one language to reason about.

But the tests stayed in Groovy.

More than 2,000 Spock specifications, spread across every tribe.

I like Spock. `given/when/then` reads well. It is expressive. This was not a story about a bad testing framework that needed to be purged. Keeping a Groovy-only test layer just meant keeping Groovy alive in every subproject forever: the plugin, compiler, classpath, IDE oddities, all of it, just for tests.

So the tests had to move to Java too.

I tried to make that happen for almost a year and got nowhere.

## When human review was the bottleneck

A normal migration produces the worst possible pull request shape. You delete `FooSpec.groovy`, add `FooTest.java`, and Git shows two unrelated files.

Maybe the resulting Java test is correct. Maybe it lost an edge case. A human reviewer cannot tell without reading both files from scratch and translating them in their head. Do that a few times and it is annoying. Do it 2,000 times and nobody will review it properly.

I had a partial attempt early this year with OpenClaw. I built a custom HTML diff which put the old Groovy and the new Java side by side. It helped humans inspect the translation. It still left humans as the bottleneck.

The OpenClaw approach was working well, then Anthropic banned third-party usage and I had to stop it.

I started again when Fable 5 became available. That worked well too, until Fable 5 disappeared from the plan. Opus 4.8 was still good enough to keep the migration moving and finish the task.

## The reviewer did not have to be human

The breakthrough came with [Jean-Vincent Drean](https://www.linkedin.com/in/jvdrean/).

My Claude created the migration pull requests. Jean-Vincent’s Claude evaluated them independently. A fresh agent does not get tired after the hundredth Groovy-to-Java translation. It does not need the old and new file arranged side by side either. It can inspect both files, follow the surrounding code, and judge the actual result.

For these test migrations, the guardrails were straightforward:

- Does it compile?

- Do the tests still pass?

- Does coverage stay the same?

- Did static analysis find anything new?


The agents escalated pull requests that missed those standards. They cross-approved and merged the rest.

This removed the part that had made the work feel impossible. The production-code migration had been slowed by human review velocity. For the tests, an independent agent reviewer could apply the same standards repeatedly without losing attention.

## Turn it into a loop

Then yet another colleague stepped in. [Florian Ernoult](https://www.linkedin.com/in/floernoult/) and I took it further.

One Claude filled the backlog by walking the repository, finding every remaining Spock specification, and turning them into tasks. Flo and I sent our own Claudes into that queue. Agents migrated tests, reviewed each other, watched CI, and only pulled us in when something was genuinely interesting.

We left that loop running over the weekend. Nobody had to feed it, review routine migrations, or move tickets around. On Monday I could just come back and see how many Spock tests had disappeared from the backlog.

That is the useful part of multi-agent work for me: a queue of work, independent evaluation, clear guardrails, and humans dealing with exceptions instead of being the clipboard or the bottleneck.

## Java found things Groovy had forgiven

The stricter Java toolchain did uncover a few latent issues: a swallowed checked exception in a SQL helper, plugin ordering that had been hidden by the old setup, a visibility mistake, and a CI timeout that was producing ghost failures.

None of these were caused by the migration. They had already been there. Moving the tests to Java gave us a stricter compiler and a few free bug reports.

SonarCloud also briefly treated the renamed `.groovy` files as new code and complained about coverage. There was no new logic. The agents escalated the false signal instead of trying to game it, and we overrode the gate with our eyes open.

## Quota set the pace

There was still one limit: Claude Team quota.

I put a quota-checking skill in front of the loop so the agents could keep moving without consuming the capacity I needed for other work. Only tokens and quota set the pace.

The migration still took a few weeks. That is a perfectly good result for work that had looked impossible for more than a year. So it was finally time to say:

_Live long and prosper, Spock and Groovy. You did your job. 🖖_

* * *
