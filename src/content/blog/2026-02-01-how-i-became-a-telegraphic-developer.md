---
title: "How I Became a Telegraphic Developer"
date: 2026-02-01
tags: ["openclaw", "ai", "telegram", "telegraphic"]
source: substack
---

These days I may be spending much more time on my phone in Telegram than I used to before. But I'm not writing to the other people, I'm writing to my [OpenClaw](https://openclaw.ai/) bot called Jean. In the last week, Jean developed the whole new application for karma-based voting called [Pikarama](https://www.pikarama.com/) for me. I was driving, Jean implemented everything.

Two months ago, I watched a YouTube video that changed how I think about software development. [Alex Finn](https://www.youtube.com/@AlexFinnOfficial) called ClawdBot "the most powerful AI tool I've ever used." I had been using Claude Code extensively and was missing the autonomy a lot. Many days I was just pressing the enter button on my keyboard to move Claude forward.

Don't be surprised by the name ClawdBot, there is a bit scary story about why and how many times the tool has been renamed before finally landing with OpenClaw.

I spun up an [Amazon AWS EC2](https://aws.amazon.com/ec2/) instance - because I'd heard all the stories about ClawdBot taking over someone's computer - ran the installer, and connected it to [Telegram](https://telegram.org/). Within 30 minutes, I had an AI agent that could read my messages, execute code, fetch web pages, and - crucially - work while I sleep to prepare something cool for me.

I was looking for some challenges to tackle, and the first one was pretty niche. New AI tools make creating applications so easy that when I asked a friend what would make him more productive, he said it would be great if an application could react to every mention in [Slack](https://slack.com/) with an emoji and then save the result to Apple Reminders. Over 24 hours and a few iterations of testing, [Slack Mention Notifier](https://smn.orany.cz/) was born - going from various prototypes to a final solution with a desktop application running in socket mode. All of it without launching any IDE.

## It's not about the technology. It's about the interface.

Traditional development requires:

- A laptop
- A quiet space
- Large blocks of time
- Context switching into "coding mode"

All of these are hard to come by when you have a day job and a family. And yet I still want to create applications because delivering something useful and helping other people is what I love about being a software developer.

On the other hand, telegraphic development requires:

- Your phone
- 30 seconds
- A clear thought

The AI handles the translation from intent to implementation. You describe what you want. It figures out how.

My day-to-day now looks more like a product lead than a developer. I use the app, notice what's off, send feedback, describe what I want next - and repeat. That loop of try, react, steer is the whole job. No wonder so many developers started calling themselves "product builders." That's exactly what it feels like.

What makes this different from vibe coding is that I'm not just prompting and praying. When the AI hits a wall - a tricky race condition, a misconfigured OAuth flow, a database migration that doesn't quite work - I can step in and unblock it. I know how to ask the right questions, and when it talks back in technical terms, I understand what it's saying. That feedback loop is fast because both sides speak the same language.

## I stopped writing code. I didn't stop being an engineer.

In this newsletter, I'll share:

- Practical tutorials: How to set up your own AI development workflow
- Real examples: Actual conversations that built real features
- Lessons learned: What works, what doesn't, and why
- The bleeding edge: New capabilities as they emerge

I'm not a YouTuber or an influencer. I'm a software engineer who stumbled onto something that fundamentally changed how I work.

If you've ever wished you had more time to build things - subscribe. Let's figure this out together.

---

*What's next: "[Finding Jean the New Home](https://telegraphic.substack.com/p/finding-jean-a-new-home)" - how did Jean moved itself to the bigger server at Hetzner.*

*Originally published on [Substack](https://telegraphic.substack.com/p/how-i-became-a-telegraphic-developer).*
