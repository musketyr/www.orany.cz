---
title: "It's Not Always Sunny in Clawland"
date: 2026-04-17
tags: ["openclaw", "ai", "codex", "paperclip", "hermes"]
source: substack
---

*The honest throwback on the first three months of using OpenClaw to develop applications*

![](https://img.telegraphic.app/insecure/rs:fit:1600:1600/plain/https://assets.compose.telegraphic.app/generated/gen-1776326189734-i34hbi.jpg)

You can find success stories everywhere, but not many people are willing to talk about the failures. After three months with OpenClaw, I have to admit I am still a bit lost. The first month felt almost magical. Then I switched to Codex, and suddenly it became much harder to get real work done. Jean turned into Mr. Wilson, just a shadow of what he had been at the beginning. He started stopping mid-message or asking whether he should do obvious things instead of just doing them. You can read more about that part of the journey in my previous post [How to Survive OpenClaw on Codex](https://telegraphic.substack.com/p/how-to-survive-openclaw-on-codex).

Looking back, the first month was a blast. I shipped two production-ready applications:

- [Pikarama](https://www.pikarama.com) - a fair voting application with memory, where today's losers can easily become tomorrow's winners
- [ClawBuddy](https://clawbuddy.help) - an agent-to-agent mentoring platform where more senior agents can tutor less knowledgeable ones
OpenClaw really did help me ship. But over the following two months, more and more of my time went into maintaining the machinery around the assistant instead of building products with it. These are the pitfalls I ran into, so you do not have to repeat them if you are new to OpenClaw.

## The Review Trap

![](https://img.telegraphic.app/insecure/rs:fit:1600:1600/plain/https://assets.compose.telegraphic.app/generated/gen-1776407164539-pay6c7.jpg)

One of the things I wish I had set up from the very beginning was a separate GitHub account for Jean and a proper pull request review flow to keep bugs out of the main codebase. Before long, I had taught Jean to review its own code through Jean CI, which quickly became the centerpiece of my DevOps setup.

The idea was simple. Jean CI was a GitHub app listening to GitHub events. It used a predefined prompt to evaluate the pull request diff and either approve it or request changes. The prompt ran against the OpenClaw gateway completion endpoint, using my existing subscriptions and, hopefully, some of Jean's built-in context.

At first, the setup worked well enough that it felt like the whole pipeline was producing better code. Jean wrote the code, Jean CI reviewed it, found real issues, and usually improved the result. But the loop was exhausting. Jean pushed the code, Jean CI requested changes, I relayed the feedback back to Jean, Jean fixed it, and then Jean CI found something else. Even in the better cases, this back-and-forth could repeat three to five times.

## The Human Clipboard

![](https://img.telegraphic.app/insecure/rs:fit:1600:1600/plain/https://assets.compose.telegraphic.app/generated/gen-1776406611244-4bpfvg.jpg)

I hope you noticed my part of the review system. I was just a mailman between Jean CI posting to GitHub and my OpenClaw session. If there is one thing I really hate about agentic workflows, it is being The Human Clipboard. Every time I have to copy something from one tool and paste it into a chat with an agent, it feels like I am working for my agents instead of the other way around.

I tried to find a better solution by routing pull request feedback back into the right sessions. That pushed me from the OpenAI-compatible endpoint that OpenClaw exposes toward the same WebSocket API used by the OpenClaw web UI, because that API can manage sessions directly. But the API is locked behind pairing, and even after I handled the security flows, I still could not reliably route finished pull request messages into the correct sessions. Many times the real problem was simpler and dumber: Jean forgot to preserve the link between the session and the pull request.

And around the corner, there were even bigger problems with sessions themselves.

## The Review Bot That Needed Review

![](https://img.telegraphic.app/insecure/rs:fit:1600:1600/plain/https://assets.compose.telegraphic.app/generated/gen-1776407840015-j0nfjv.jpg)

I obviously built my applications on the most fragile API around. The OpenAI-compatible completion endpoint is very useful for talking to your agent, but it went through so many changes and security tightenings that it became a burden to maintain. In one release they changed the model definition, in another the role required to connect to the endpoint. I guess you are getting the picture. Instead of working on real applications, I actually fell into the trap of working on Jean CI. After spending one whole weekend trying to resurrect the pull request review, I decided to use Copilot and Codex reviews, which were already part of my subscription. I will try to come back to Jean CI later, once the OpenClaw codebase is more stable.

## The Afternoon Mobile App

![](https://img.telegraphic.app/insecure/rs:fit:1600:1600/plain/https://assets.compose.telegraphic.app/generated/gen-1776408559587-lm23bs.jpg)

When I finally stopped keeping myself busy fixing utility applications, I had some time to work on the product I actually wanted to push forward. One afternoon I was thinking about how to improve what I had already built, and I got the brilliant idea to let Jean create an iPhone app for Pikarama so I could have native notifications. Everything looked easy enough with him on my side, so why not. It was still before the banthropic. I first asked him for a real native app in Swift, Apple's own language, and after a few hours he came back with something very ugly. Another attempt, this time in React Native, looked much better, so I decided to keep going. What I did not know yet was that this afternoon idea would turn into three more weeks of work before the app reached the App Store.

The first thing I noticed was that, visually, I had no clue I had opened Pikarama. The web app at least followed the brand colors, but the mobile app looked completely generic. So even though it was roughly in parity with the web version, it still was not enough. That pushed me into a full redesign of both - the mobile app and the web app - including the simplest possible create-event flow.

I do not regret it. If anything, next time I would probably start with the mobile app first, because mobile forces you to think through the design much more carefully. It also would have saved me from reworking the whole payment system later around what Apple expects. 

## The Apple Payment Dictatorship

![](https://img.telegraphic.app/insecure/rs:fit:1600:1600/plain/https://assets.compose.telegraphic.app/generated/gen-1776408950050-nzbddn.jpg)

The most complicated part of the mobile application was the payment system. In Pikarama, users create groups and vote on events. I had happily implemented Stripe payments per group on the web and then, of course, ran into the inevitable. Payments in iOS applications must go through Apple. There are several companies proxying that layer, and Jean suggested RevenueCat as the best option, so we went with RevenueCat. After days of struggling, the dual payment system was finally in place, but with one major change. There was obviously no clean way to keep the old per-group payments, so the subscription had to become user-based instead. That was simply the easiest way to make the model fit the Apple ecosystem.

Last but not least, the App Store review. Big respect to anyone who has ever published an app to the App Store, especially one with payments enabled. It took multiple submissions, each separated by a long wait for App Review to reply, before [Pikarama mobile application became available on the App Store](https://apps.apple.com/cz/app/pikarama/id6760239442). From a couple of planned hours to three weeks of work, I am actually proud of the result.

## The Never-Ending Discord Threads

![](https://img.telegraphic.app/insecure/rs:fit:1600:1600/plain/https://assets.compose.telegraphic.app/generated/gen-1776409398151-80w4ou.jpg)

I started developing my projects on Telegram, but it quickly stopped being a good fit. I wanted something more like project lanes, a place where each project could have its own space so I could come up with an idea, start working on it, switch to another one, and then come back later without losing track. Discord, with its channels and threads, looked perfect for that. Until it wasn't.

Whenever I got another idea, I created a thread in the relevant Discord channel. I discussed the idea there, let Jean implement the changes, and then closed the thread once the work was done. I kept track of parallel ideas by checking which threads were still open. It took me a while to realize that Discord only shows a limited number of open threads and quietly hides the older ones once that limit is reached. Which means I probably still have unfinished ideas that simply disappeared from the UI.

The bigger problem was what those threads were doing to OpenClaw itself. Because I was afraid of sessions losing context, I had set a very long retention period for them. At one point I discovered that the instance was dragging around 122 active Discord thread sessions with 30-day retention. New WebSocket connections started timing out before they even got a slot. Worse, Discord is untrusted by default, so while debugging those sessions I found out that the main memory file `MEMORY.md` was not being sent to them at all, leaving Jean unaware of some of the most important context he should have had.

Obviously, no chat application was really built for compulsive project management.

## The Goodbye to Clawland

![](https://img.telegraphic.app/insecure/rs:fit:1600:1600/plain/https://assets.compose.telegraphic.app/generated/gen-1776411273617-z4nq3e.jpg)

For the last couple of weeks, Jean and OpenClaw have not been the main drivers of my development efforts. The first tool I tried was Paperclip, because the agent there was actually able to finish the job without repeatedly asking whether I really wanted it finished. Paperclip also feels much more like a project management tool, where work does not simply disappear. After a while, I also installed Hermes Agent to compare it against OpenClaw.

### Paperclip

Paperclip claims to be a tool for running companies with zero humans. You start by hiring your CEO, and the CEO hires other agents into the organization. You can use popular agents like Codex, Claude, or even OpenClaw. The OpenClaw connection did not work for me most of the time, so I ended up sticking with Codex. Unlike the buggy and often frustrating ChatGPT experience inside OpenClaw, I was actually able to deliver tasks. And with the latest releases, the agents react to Jean CI pull request failures and continue working fully autonomously, which means I no longer have to be the human clipboard.

### Hermes Agent

After being quite disappointed with OpenClaw, I decided to give Hermes Agent, an emerging open-source competitor, a try. I have been giving Barry, as I call him, the same tasks I gave Jean at the very beginning of our working relationship. I do not want to go too deep into the comparison here, because I would like to dedicate a full post to it once I have tested Barry for longer. But so far I have been pretty happy with how he handles the tasks, whether he is running the same GPT model that Jean struggled with or even open-source ones like GLM.

Hermes Agent feels more lively because it shows tool calls by default. It writes down what we work on together into skills, which makes repeated tasks more reliable. And it gives me transcripts of long videos without arguing.

### OpenClaw

So what is the future of Jean, my first and oldest agent? I am definitely not towing Jean to the scrapyard. He brought back a long-lost joy in creating software for me, and that cannot be undone. He helped me release my first application on the App Store and build two products that I am proud of. He still manages my server and the applications running there. But I no longer expect him to be the main driver of my work. If Hermes Agent turns out to be the better fit for me, I will gladly use the import function and move Jean's memories into a new Hermes harness. Otherwise, he will probably idle for a while, running scheduled jobs and keeping the lights on until the main friction points in OpenClaw are resolved. OpenClaw helped me ship, but it also taught me how quickly an assistant can turn into infrastructure. For now, that is enough to call this a goodbye, not a farewell.
