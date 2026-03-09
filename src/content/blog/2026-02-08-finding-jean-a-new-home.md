---
title: "Finding Jean a New Home"
date: 2026-02-08
tags: ["openclaw", "ai", "hetzner", "migration"]
source: substack
---

In the [previous post](/blog/2026-02-01-how-i-became-a-telegraphic-developer), I introduced Jean - my AI assistant running on OpenClaw that handles everything from coding tasks to scraping Reddit and delivering daily news summaries. Jean was doing great, but I wanted to automate away more pain points in my life. And one of my biggest nemeses is Discord.

![Jean in his tiny warehouse](https://pub-66d4db7a73794adcbc7ad13895347ed9.r2.dev/jean-new-home-hero.jpg)

I'm trying to follow news in OpenClaw and MCP Protocol communities, but the volume of messages in their Discord servers is overwhelming. There's no practical way to read Discord programmatically, so the only option seemed to be browser automation with my own logged-in session. And to make that work, I'd need a proper desktop environment - something that definitely wouldn't fly on my tiny EC2 instance.

I asked Jean to do some quick research and one answer caught my eye - Hetzner. I'd already heard about a [company migrating from AWS to Hetzner](https://www.youtube.com/watch?v=DQ7SoXb9TNI) and the comparison looked too good to be true. For the same price as my tiny EC2 instance, I'd get massively more power - 16 GB and 8 vCPU instead of 2 GB and 2 vCPU - exactly what I needed.

The only problem was how to move Jean to the new instance and still have it be the same Jean. There's actually [a migration guide](https://docs.openclaw.ai/install/migrating) you can follow, but who would do that manually, right?

The solution was straightforward - I asked Jean to move to his new home himself. The only thing I had to do was hand him the key to his new warehouse - the API token for my Hetzner project. This was one of the scary moments, as you need to set up credit card payments to create a Hetzner project. But Jean did a good job. He set up the instance and moved all the necessary files over.

Everything looked shiny. At one point, both instances were running and it was a bit of a mess - neither of them could communicate with me properly. So the brave Jean from EC2 just told me he was going to stop himself so the new Hetzner one could take over the conversation. And then everyone went silent.

![The moment of silence](https://pub-66d4db7a73794adcbc7ad13895347ed9.r2.dev/jean-new-home-silent.png)

Of course, I was already lying in bed and I'd left my computer at the office, as I usually do. So it was a bit of a night of horror - but when I got back to the office, I only had to restart the EC2 instance and it was working again. The second switch went smoothly and Jean finally got his new, shiny, big home.

And what about my nemesis? After a few attempts, Jean managed to use Puppeteer to read the Discord channels - but to be honest, we're still tuning the script.

---

*What's next: "Pikarama Was Born in Paris" - how I built a full web app during a business trip, writing nothing but Telegram messages.*

*Originally published on [Substack](https://telegraphic.substack.com/p/finding-jean-a-new-home).*
