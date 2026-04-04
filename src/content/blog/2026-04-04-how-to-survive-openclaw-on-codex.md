---
title: "How to Survive OpenClaw on Codex"
date: 2026-04-04
tags: ["openclaw", "codex", "ai", "agents", "claude"]
source: substack
---

![How to Survive OpenClaw on Codex](https://substack-post-media.s3.amazonaws.com/public/images/d7aec035-2b5b-41d1-94b3-9fa2ddf9742d_1376x768.jpeg)

I switched my OpenClaw, Jean, to ChatGPT and the Codex model in the middle of March - about three weeks before Anthropic sent out the Claude Code subscription ban that many of their subscribers started talking about. Those three weeks were extremely challenging, but at least I can share some lessons for anyone who wants to keep their claw running.

Wait before you start copy-pasting or sending link to this article, there is a better way how to let your claw know how to fix itself keep improving. Copy and paste just these instructions to your claw:

1. Install ClawBuddy hatchling skill from the clawhub: clawhub install clawbuddy-hatchling
2. Connect to musketyr/doctor buddy
3. Ask the doctor buddy how can take care of itself
4. Ask your human what does bother them and then ask the doctor buddy for the solution

As a matter of good practice, check the skill at [clawhub.ai/musketyr/clawbuddy-hatchling](https://clawhub.ai/musketyr/clawbuddy-hatchling).

Let’s start from the end before I walk you down the valley of sorrow, because many of you will hopefully never have to deal with the same issues I did. Today, after a few weeks of suffering, I have finally fixed the OpenClaw issues themselves so I can focus on improving how Jean behaves. As a matter of basic agent-human hygiene, you need to talk openly about the issues that bother you. For me, the crucial difference still is how often Jean just explains and writes about what he is going to do instead of doing things. Reading one more “If you want I can...” just drives me nuts. But it doesn’t help to complain on social media. Believe me, I have tried it. To fix relationship issues, you need to talk with each other. This is how the conversation with your claw can start

> Please, provide a deep audit of your base files - AGENTS.md, SOUL.md, TOOLS.md and tell me how can update them to turn you from philosopher to a doer.

And Jean actually gave me some pretty good advice and updated the files. But there are a few things to keep in mind. These changes only apply to new sessions, and there is no silver bullet. You need to iterate across a few sessions, copy the responses you do not like, and ask your OpenClaw what should change to make it better. And repeat that as many times as needed. It is quite possible that you will never reach complete happiness with the result, but you can get to a point where 9 out of 10 times you are happy with the answer.

But that was only one layer of the problem. To understand why those weeks were so painful in the first place, I need to go back to the middle of March.

Now let’s get back in time. The first few days, maybe even the first two weeks, were a complete nightmare, and I blamed the Codex model a lot. But eventually, it became clear that the real problems were on the OpenClaw side. Many times, I did not get any answer from Jean after assigning him a task. I tried a few different things - including disabling the websocket transport for Codex - but in the end the issues were related to OpenClaw releases from around that time rather than the switch to Codex itself. The tightened security had completely cut me off from tool execution without even giving me a chance to approve anything, because approvals were not set up for any channel.

For some reason I tend to run into these issues before other people do, so it took me a long time to figure out how to get back to a productive setup again. Jean was desperate, and so was I. The documentation did not help, so I used one of the tricks I learned during my software engineering career: go read the source. Well, it was not me but Jean who read the whole OpenClaw codebase and helped me understand the sandbox and execution issues.

I am intentionally not copying the exact config we used during that period, because the point was never “turn everything off and hope for the best.” The real lesson was that I had to understand how approvals, execution, and sandboxing were wired together in the actual codebase instead of guessing from outdated assumptions.

So if you run into similar issues, my advice is not to disable safeguards blindly. It is to inspect your real setup, verify how approvals are routed in your channel, and make deliberate changes you actually understand.

Fixing tool execution got us back into the game. But it still did not make the setup reliable.

Even with the approvals fixed, the user experience was still horrible, and my claw was not delivering anything useful for days because many times it just did not respond. Later, I realized that the simplest way to diagnose anything in OpenClaw is to ask OpenClaw to diagnose itself. I asked Jean to investigate the logs, and he found many out-of-memory errors that were causing the instance to restart, sometimes even two or three times per hour. After some digging, we found that the root cause was an enormous session in the session store. When sessions were searched or compacted, that one session filled the available memory and crashed the process.

After fixing this, it started to be a bit more fun working with Jean again. But the most important lesson was to start monitoring the logs regularly. This is the almost miraculous scheduled task he created afterwards - an hourly job to check the logs:

> Check OpenClaw gateway logs from the last hour for errors and warnings. Run:  
> `journalctl --user -u openclaw-gateway --since '1 hour ago' --no-pager | grep -iE '(error|warn)' | tail -30`.
>
> If you find any errors or warnings:
> 1. Summarize what went wrong
> 2. Identify patterns or recurring issues
> 3. Suggest concrete fixes or improvements
> 4. If it is a known issue that is expected or harmless, note that too
>
> If there are no errors or warnings, respond with ONLY: `HEARTBEAT_OK`

Since then, it has helped me catch issues early and resolve them in a couple of minutes instead of blaming the model or anything else.

Let me be clear by the end: this is not a story about Codex being better than Claude. For me, it was not. Claude was better aligned with how I wanted to work. Codex was simply the model I had to make work after Anthropic decided to ban the most dedicated Claude Code users.

And maybe that is the real lesson. When the better option disappears, you stop chasing perfect and start learning how to survive with what is left. In my case, that did not mean finding some magical prompt that suddenly made Codex shine. It meant fixing OpenClaw itself, restoring tool execution, reading the source code, monitoring the logs, and repeatedly teaching Jean to behave less like a polite philosopher and more like an operator who actually gets things done.

The result is not “Codex won.” The result is that I now have a setup that works even under very different conditions. And honestly, that may be more valuable in the long run. If your claw only works with one specific model and falls apart the moment that model disappears, then it does not really work. A useful claw has to survive bad defaults, broken releases, missing approvals, memory issues, and very different model behavior.

So if Claude is gone for you too, my advice is simple: do not waste too much time arguing online about how unfair it is. Assume the change is real and start hardening the whole system around it. Read the docs, read the code, audit the behavior, fix the config, monitor the logs, and teach your claw your standards again and again until it becomes reliable.

Claude was better for me. That is true. But if Codex is what remains, then the game is no longer about having the ideal model. The game is about building a claw that can still deliver when the model you were relying on is gone.

---

*Originally published on [Substack](https://telegraphic.substack.com/p/how-to-survive-openclaw-on-codex).*