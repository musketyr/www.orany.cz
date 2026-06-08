---
title: "Personal Agents Made My AFOL Server Obsolete"
date: 2026-06-02
tags: ["ai", "agents", "product"]
source: substack
canonicalUrl: "https://telegraphic.substack.com/p/personal-agents-made-my-afol-server"
---
*Why you should expose your application to personal agents instead of trapping AI inside it*

## Letting Claude organize my LEGO collection

![](https://substackcdn.com/image/fetch/$s_!c_bP!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F23835aec-4bb0-4824-a1a2-3293f776775e_1376x768.jpeg)

Last autumn I was amazed by the power of Model Context Protocol servers. MCP was still a new Claude feature at the time, but it turned into a standard surprisingly fast. While other people were thinking about connecting ticketing systems and internal dashboards, I had a more important enterprise use case: my LEGO collection was a mess.

A few years ago I started collecting LEGO not only for fun, but also as a small investment. Some sets really do go up in price if you keep them sealed for a while. The problem was that I quickly lost track of what I had already bought. My source of truth was a Google Sheet with set numbers, purchase prices, and condition. No pictures. No titles. No current value. Just numbers staring back at me like a very colorful tax audit.

So I did what every reasonable adult fan of LEGO does when faced with a spreadsheet problem. I built a server.

Not a small script. Not a weekend utility. A proper server.

I had just finished reading Spring AI in Action. I was working with Claude Code a lot. I knew Java, Spring, Terraform, AWS, containers, load balancing, observability, proper networking, and all the grown-up engineering habits you collect after years of doing this for money. Claude understood this professional attitude immediately and helped me build exactly the kind of system I would build at work.

That was the first mistake.

The project became [Brick Directory](https://brick.directory/). It connected to BrickLink, BrickOwl, Brickset, Rebrickable, BrickEconomy, and several other AFOL sources. It had an MCP server. It had a web frontend. It had an internal chat. It had login. It had a database. It had vector search. It had all the usual pieces you add when you are technically capable and emotionally unsupervised.

And it worked.

I could open Claude, connect the MCP server, and say something like: “Find my Google Sheet called LEGO collection and synchronize it to Rebrickable.” Claude would read the sheet, resolve the set numbers, talk to the AFOL APIs, and suddenly my collection appeared in Rebrickable with real names and values. It felt like magic.

Then AWS sent me the bill.

At first it was hundreds of dollars. Me and Claude looked at the architecture and Claude, very politely, admitted that maybe the setup was a bit over-engineered for a side project. We removed some parts and got the cost down, but over time I still spent almost a thousand dollars. More than a very decent LEGO set. At least the LEGO set has minifigures.

I do not really regret it. It was a hands-on lab. I learned a lot. But it also made one thing painfully clear: I had built a whole product to give agents access to data that agents could have accessed directly if I had packaged the integration differently.

## The internal chat problem

Brick Directory has an internal chat, but that was never the main plan. The main feature was always the MCP server: Claude or another external agent should be able to connect to Brick Directory and use it as a tool. The chat was more of a playground for people who do not use ChatGPT, Claude, or a personal agent yet. A way to try the data from inside the app without setting anything up.

The chat knows the app. It knows the database. It can answer questions about sets, parts, minifigures, colors, inventories, and prices. That sounds great on paper.

But when I looked at the actual usage pattern, the story was pretty clear. There were hundreds of chat sessions with under a thousand messages total. Almost all sessions were tiny. Recent titles looked like “LEGO Set Details for Multiple Numbers”, “Star Wars Sets and Minifigures”, “Finding Expensive LEGO Sets”, or “LEGO Sets Suitable for 10-Year-Olds”.

That is useful. But it is not a relationship.

It is a lookup box.

And this is where internal agents usually disappoint me. They know a lot about the app, but they live inside the app’s walls. They often cannot browse the web. They do not know what I was doing yesterday. They do not know that my son likes Minecraft, that I prefer concise answers, that I use Claude Code or OpenClaw for development, or that I have a bad habit of over-engineering side projects when Java and AWS are nearby.

They also cannot easily ask follow-up questions and remember the answers for next time in a way that follows me across tools. Every product wants to have “AI chat” now, but most of these chats are just polite prisoners. They sit in one tab, with one database, burning the product owner’s tokens, waiting for the user to ask the right question.

Users are no longer trained that way.

They are used to ChatGPT, Claude, OpenClaw, Hermes, and similar personal agents. If the agent does not know something, it can search. If it needs context, it can ask. If the answer depends on a file, a browser tab, a repository, a calendar, or a previous conversation, the good personal agents can often reach it. And if they cannot reach it today, they can usually learn the missing preference and remember it tomorrow.

That is a much better starting point.

The personal agent already knows me. It only lacks your app.

So why are we spending so much effort building smaller, lonelier agents inside every app?

## Opening the app is usually better than trapping the agent

There are two ways to add AI to a product.

The first way is the fashionable one: build an internal agent. Add a chat panel. Connect it to your database. Pay for the model calls. Hope users ask good questions. Add guardrails. Add prompts. Add another prompt because the first prompt forgot who it was. Add a button that says “Ask AI” because that is what everyone else is doing.

The second way is less glamorous but much more powerful: expose your product to the agents users already trust.

That can be an MCP server. It can be a CLI. It can be an API with good OpenAPI docs. It can be a published skill. The shape matters less than the direction. Instead of saying “come into my app and talk to my captive assistant”, you say “bring your assistant here; I will give it safe tools.”

This changes the economics too.

With an internal chat, you burn your tokens every time somebody asks whether set 75192 is worth buying. If the feature gets popular, congratulations, your success is now a cost center. If you start limiting it, the feature becomes worse exactly when people start using it.

With external-agent access, the user usually brings the model bill. Claude, ChatGPT, OpenClaw, Hermes, Codex, whatever they use. Your job is not to operate a little AI casino inside your SaaS. Your job is to expose capabilities in a way the user’s agent can use safely.

That is a healthier boundary.

It also respects how people actually work. I do not want one agent in Brick Directory, another in GitHub, another in my note app, another in my bank, another in my grocery store, and another in my home automation system. That is not the future. That is Clippy with microservices.

I want one personal agent that can call the right tools when needed.

## From an expensive server to free skills

The funny part is that the useful core of Brick Directory, the part I originally wanted from the MCP server, can now be reproduced without running Brick Directory at all.

I generated AFOL skills instead.

There is a skill for Rebrickable. One for Brickset. One for BrickOwl. BrickLink and BrickEconomy can follow the same pattern. There is also an AFOL router skill that helps the agent decide which source to use. The repository contains OpenAPI references, small CLIs, read-only examples, credential checks, and safety rules for mutations like inventory or collection updates.

This is not as visually impressive as a hosted application with a chat panel. There is no dashboard to screenshot. No fancy internal assistant waving from the corner.

But for agents, it is much more useful.

My personal agent can load the AFOL skill, check which credentials are available, call the right CLI, and combine the result with everything else it already knows. It can help me compare a LEGO set with my son’s interests. It can search the web for missing context. It can read my spreadsheet. It can update a draft article about the whole thing. It can ask whether I want to mutate my collection before doing anything dangerous.

And I do not have to keep an AWS architecture alive just so an agent can look up a set number.

That is the part I wish more SaaS builders understood. AI integration does not always mean building an AI feature inside your product. Sometimes it means making your product legible to the agents that already exist.

Brick Directory’s internal chat has the app context, but it lacks my context. My personal agent has my context, but lacks Brick Directory’s data. The second problem is much easier to fix.

Give the personal agent a tool.

## Internal agents are not useless

To be fair, internal agents are not useless. There are places where they make sense.

If the user is anonymous, has no agent, and only needs a quick answer inside your product, an internal chat can help. If the task depends on private app state that you cannot expose safely, a built-in assistant may be the right interface. If you need a tightly controlled workflow, keeping the agent inside the product can reduce risk.

But I would not start there by default anymore.

Internal agents should be the fallback UI, not the main integration strategy.

The main strategy should be: make the application accessible to external agents in a safe, boring, well-documented way. Boring is good here. Boring means CLIs. MCP tools. OpenAPI schemas. Read-only operations by default. Explicit confirmation for writes. Small composable pieces.

This is not less ambitious. It is more ambitious because it accepts that your product is not the center of the user’s universe.

The user’s agent is.

## The app should become a tool

The biggest mental shift for me is this: in the agent era, your app is not always the destination. Sometimes it is just a tool.

That sounds insulting if you spent years thinking in terms of products, sessions, engagement, dashboards, and retention. But it is also freeing. Not every useful thing needs to become a place where users go and stay. Some useful things should become capabilities that users can call from wherever they already are.

Brick Directory taught me this the expensive way. I built a full application, paid the cloud bill, added an internal chat, and only later realized that the most valuable part was the interface between agents and AFOL data.

Now the same idea can live as skills. Free to run for me. Easy to install. Useful from OpenClaw, Hermes, Claude, ChatGPT, or whatever personal agent wins the next round of this very fast-moving game.

The internal chat knows Brick Directory.

My personal agent knows me.

I know which side I want to extend.

* * *
