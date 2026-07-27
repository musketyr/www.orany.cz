---
title: "Live Long and Prosper: Retiring Spock and Groovy From Our Monorepo"
date: 2026-07-27
tags: ["groovy", "java", "testing", "ai", "agents"]
source: manual
---

*The difficult part was never translating 2,000 tests. It was making the change reviewable.*

![](https://assets.compose.telegraphic.app/generated/cen-you-make-creatures-ambivalent-they-happy-say-1785137690418-dz5fit.jpg)

At Agorapulse we have a monorepo split by tribe and domain, with dozens of backend services. Most of them run on Micronaut. For a long time, the codebase was a mix of Java and Groovy.

Last year we moved all production code to Java. That part made sense. Builds became cleaner, compilation got faster, tooling improved, and we had one language to reason about.

But the tests stayed in Groovy.

More than 2,000 Spock specifications, spread across every tribe.

I like Spock. `given/when/then` reads well. It is expressive. This was not a story about a bad testing framework that needed to be purged from existence. The problem was much more boring: keeping a Groovy-only test layer meant keeping Groovy alive in every subproject forever. The plugin, compiler, classpath, IDE oddities, all of it, just for tests.

So the tests had to move to Java too.

I tried to make it happen for almost a year and got nowhere.

## The problem was the diff

A normal migration produces the worst possible pull request shape. You delete `FooSpec.groovy`, add `FooTest.java`, and Git shows two unrelated files.

Maybe the resulting Java test is correct. Maybe it lost an edge case. A reviewer cannot tell without reading both files from scratch and translating them in their head. Do that a few times and it is annoying. Do it 2,000 times and nobody will review it properly.

That was the blocker. Not writing Java. Reviewing it.

I did have one partial attempt early this year with OpenClaw. I added a custom HTML diff which put the old Groovy and new Java side by side. It helped a human check the translation, but then our third-party access was shut off and the experiment stopped.

Later I restarted with Fable 5. Then Fable 5 disappeared from the plan and I went back to Opus 4.8. The result was still good.

That was useful in its own right. The project had stopped depending on a particular model. The process was doing the heavy lifting.

## Javify first, rename later

The breakthrough was embarrassingly simple.

First, convert the test to Java while keeping its `.groovy` name and location.

The code gets explicit types, real `assert`s, JUnit 5 structure, and our own testing libraries: Gru for controller tests, Expectations for data-driven cases, Fixt for fixtures, and the usual Micronaut `MockBean` patterns. It is effectively Java, but Git still sees the same file. That means it can show a line-by-line diff.

A reviewer can see what happened to a Spock `where:` block. They can see how a Spock mock became Mockito. They can focus on the translation instead of playing spot-the-difference across two files.

Only after that review passes do we rename the file from `.groovy` to `.java` and move it from `src/**/groovy` to `src/**/java`.

That second pull request is boring. It should be. The content is identical, so the change is just a rename.

Splitting the cognitive work from the mechanical churn changed the project from something we kept postponing into a pipeline we could actually run.

## The agents became a team

This was also the first time I felt the multi-agent thing working as more than a nice demo.

It started with Jean-Vincent Drean. My Claude created migration pull requests and his Claude reviewed them. One agent wrote the change. Another, with its own context, checked it.

That matters. Having the same agent write and approve its own work is still mostly a diary with extra steps. Independent review makes a difference, especially when the work is repetitive enough to wear down human reviewers.

Then Florian Ernoult and I made it into a loop.

One Claude only filled the backlog. It walked the repository, found every remaining Spock specification, and turned the work into tickets and tasks. Flo and I each pointed our own Claudes at those tasks. The agents wrote migrations, reviewed them, watched the resulting pull requests, and fixed CI when it went red. We steered the work instead of typing every change ourselves.

That is the useful version of agentic development for me.

Not "AI helped write a test."

A process where agents can keep moving through a well-defined queue, challenge each other's work, and escalate the decisions that need an engineer.

## Java found things Groovy had forgiven

Of course, the migration was not completely mechanical. The stricter Java toolchain found a few things Groovy had been happy to let slide.

One test helper executed SQL scripts and quietly swallowed a checked exception under Groovy. Java refused to compile it. The fix itself was small, but it affected every backend that brought the helper in through `includeBuild`.

In another service, plugin ordering mattered. Micronaut plugins needed to be applied before a compatibility plugin, otherwise our shared Java configuration could not find the Java plugin at all. The old setup had hidden that dependency well enough until it became a hard failure.

We also found a cross-package `reset()` that was public by accident, plus an empty `thenThrow()` that error-prone correctly rejected. Tiny issues, but real ones.

The biggest suite has more than 500 integration tests. It ran close enough to Gradle's default 20-minute task timeout that CI load could kill it mid-run and report a changing set of failures. Raising the timeout to 45 minutes stopped the ghost failures.

None of this was caused by moving files around. The migration exposed problems that had already been there. Removing Groovy bought us a slightly stricter compiler and a few free bug reports.

SonarCloud provided the one false alarm worth mentioning. Its quality gate complained that coverage on new code was too low. Technically it was right that the files looked new: hundreds of `.groovy` files had become `.java` files. But there was no new logic and the tests had been covered before the rename.

A tool can measure the wrong thing perfectly. We overrode that gate deliberately, with reviewers looking at the actual change. The agents did not try to game coverage or make up a fix. They escalated it. Good.

## The actual lesson

I had spent a year thinking this was a test migration problem. It was a reviewability problem.

That is easy to miss. We often treat review as the last step after a change is designed and implemented. For large migrations, it has to shape the design from the beginning. If people cannot reliably see what changed, the change is not ready to scale.

The other lesson is that I am less interested in winning the model lottery now. OpenClaw, Fable 5, Opus 4.8: the tools changed while the workflow kept working. That is what I want to keep.

And independent agent review is not optional decoration. It is what made thousands of small, repetitive changes survivable without asking humans to rubber-stamp them.

We are still responsible for the result. We still need to understand the failures, make judgment calls, and own the merge. But the agents can do a lot of the walking.

Two thousand Spock specifications had been sitting there for a year because I could not see a responsible way to move them.

Now they are moving in small, reviewable pieces.

Live long and prosper, Spock and Groovy. You did your job. 🖖
