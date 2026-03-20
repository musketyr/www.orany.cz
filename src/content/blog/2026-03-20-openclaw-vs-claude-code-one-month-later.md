---
title: "OpenClaw vs Claude Code: One Month Later"
date: 2026-03-20
tags: ["openclaw", "claude", "ai", "agents", "codex"]
source: substack
---

![OpenClaw vs Claude Code: One Month Later](https://substack-post-media.s3.amazonaws.com/public/images/0312fa2b-c14f-4e6e-a51b-939fce9c5c62_1584x672.jpeg)

I can’t believe it’s already been a month since I published the original [OpenClaw vs Claude Code](https://telegraphic.substack.com/p/openclaw-vs-claude-code). In AI development, everything moves ridiculously fast, so this is a good moment to summarize what has changed.

In a nutshell: after Anthropic’s subscription intervention and all the new focus on security, OpenClaw got a bit dumber and less autonomous. At the same time, Claude Code took the fairly successful route of copying OpenClaw features into the product, even if it sometimes feels like Anthropic doesn’t fully understand what made those features valuable in the first place.

I won’t repeat the previous article in full. Instead, let’s revisit the same six categories and focus only on what changed.

I will not repeat myself in detail here, but let’s just revisit the differences from the previous post:

1. Identity
2. Persistence
3. Presence
4. Proactivity
5. Practicality
6. Autonomy

I will only focus on what is different for each section which is mostly new features in Claude Code.

## Identity

### Claude Code

No real change here. It is still the same Claude as before: capable, polished, and very much tied to Anthropic’s own product boundaries.

### OpenClaw

This is where the biggest hidden change happened. Anthropic made it clear that using Claude subscription with OpenClaw violates their Terms of Service, so I switched the main brain to Codex. Technically the identity is still “my agent,” but in practice it no longer feels like the same one. The shell stayed the same, the personality did not. And that change matters more than any new feature checkbox.

If you want to keep using Claude with OpenClaw, then you need to use [Agent Communication Protocol](https://agentcommunicationprotocol.dev/introduction/welcome), and you can use the Claude model only for spawned processes.

## Persistence

### Claude Code

Just a few hours after I published the original comparison, Claude Code auto-memory was promoted to a stable feature. That alone says a lot. Persistence was one of the biggest weaknesses in the original product, and Anthropic clearly knows it.

I still haven’t tested it deeply enough to judge how useful it is in real life, so for now I’ll leave that as an open question.

### OpenClaw

The longer you use OpenClaw, the more memory it accumulates, and at some point that can become its own problem. If it starts to feel like your claw is forgetting things, the opposite may actually be happening: it may be carrying too much memory to use it well.

## Presence

### Claude Code

This is where things got a bit more interesting. Claude Code introduced several ways to connect to a running session from your phone:

- Remote Control
- Telegram Channel
- Discord Channel

That is a real improvement, but there is one big catch: you first need to start the session on your computer and explicitly enable the remote control or channel for that specific session. If you forget to do that, you cannot steer it later from your phone when you are away. This shot me in the leg a couple of times already. I wanted to test it on my way to the barber, but of course I forgot to run the command to start the remote session.

Anthropic also introduced Claude Coworker Dispatch, which lets you dispatch tasks to your own computer as long as Claude Desktop is running there.

### OpenClaw

In OpenClaw, the channel is not just a remote control for a session you already prepared. It is an entry point. You can start new sessions directly from Telegram or Discord, which makes the whole system feel actually present rather than conditionally available.

## Proactivity

### Claude Code

Claude Code introduced `/loop`, which does more or less what you would expect: it keeps iterating on the prompt until a condition is satisfied. A typical example would be: *Open the pull request, wait until all checks are green, and fix whatever fails on the way.*

You can also now run Scheduled Tasks from Claude Desktop, which moves it a bit closer to the OpenClaw model.

These are meaningful additions. They show that Anthropic understands the value of agents that do not just answer once, but keep working toward an outcome. At the same time, these still feel like explicit features you turn on for a specific task, not a generally proactive system.

### OpenClaw

OpenClaw still feels more naturally proactive because the whole setup is built around presence, memory, and background follow-through. It is not just about looping one prompt until success. It is about having an agent that can keep track of things over time and surface them back when needed.

## Practicality

### Claude Code

No meaningful change here. My main frustration with Claude Code practicality is still the same: too much approval friction and too much supervision for workflows that should feel delegated.

### OpenClaw

The OpenClaw I am using today feels much less practical than the one I was using a month ago. As the project hardens its security model, it is getting closer to the same approval-heavy experience that frustrates me in Claude Code. In theory, stricter command approvals should make the system safer. In practice, at least in my most common setup of Codex + Discord, it often just adds friction. And worse, it does not always fail transparently — sometimes I never get the approval request at all, and the agent simply dies in the middle of the job.

## Autonomy

### Claude Code

Claude Code is no longer just a reactive coding assistant. With `/loop`, scheduled tasks, and remote execution features, Anthropic is clearly pushing it toward autonomy. Still, this autonomy feels tightly boxed in. It can keep working on a task, but it does not yet feel like a truly independent operator in the same way OpenClaw once did.

### OpenClaw

This is where the downgrade hurts the most. After switching to the officially supported GPT Codex models, using OpenClaw often feels like switching from a senior developer to an intern. The old experience was not just about getting an answer, but about getting initiative. It would take the task, push it forward, and often overdeliver.

Now it much more often just summarizes the problem and asks whether it should actually do something. That may be safer and more correct in theory, but in practice it breaks the feeling of autonomy. And that is the whole point: an autonomous agent is not just an agent that can do things, but one that usually does not need to be pushed through every step.

## Conclusion

Over the last month, Claude Code did exactly what you would expect from a serious competitor: it started copying the most visible OpenClaw ideas, and in several cases it did it well. Memory, remote access, looping, scheduled tasks — the gap is clearly smaller than it was before.

But this update also made something else obvious. The most important part of OpenClaw was never the checklist of features. It was the feeling of having an agent with real initiative. And that is exactly the part that got weaker. OpenClaw is becoming safer, but also more approval-heavy, more limited, and less capable than it used to feel. Without Claude as the brain, it is still OpenClaw, but it is no longer quite the same creature.

---

*Originally published on [Substack](https://telegraphic.substack.com/p/openclaw-vs-claude-code-one-month).*