---
title: "My Very First Telegraphic Application"
date: 2026-02-15
tags: ["openclaw", "pikarama", "ai", "telegraphic", "development"]
source: substack
---

![Hotel room conversation](/images/blog/pikarama-chat.png)

**Vlad 22:25**
> What would you need if I would like you to create app in GitHub private repository and deploy it to vercel free plan over night?

This is how it all started. Just an innocent question sent from a bed when I was not able to fall asleep in a hotel room in Paris after my arrival. Maybe you also know how difficult it is to get some good rest in a new place.

**Jean 22:25**
> For a GitHub private repo + Vercel deployment, I'd need:
> 
> **GitHub** - already set up, I can create private repos via gh.
> 
> **Vercel** - I need one of:
> 1. Vercel CLI token - vercel login and give me the token, or generate one at vercel.com/account/tokens
> 2. Or connect the repo to Vercel via their GitHub integration (you do this once in Vercel dashboard → Import Project → pick the repo, then every push to main auto-deploys)
> 
> Option 2 is simpler - I create the repo, push code, you link it to Vercel in 30 seconds, and from there every commit I push deploys automatically. No token needed on my side.
> 
> What I'd need from you:
> - What the app should do (the brief)
> - Vercel account connected to GitHub (one-time setup if not already done)
> - Any preferences: framework (Next.js? plain React? SvelteKit?), domain, etc.
> 
> That's it. What do you have in mind?

My children are like ice and fire. One says white and the other says black. Choosing a movie for a night or a meal for lunch is sometimes almost impossible. That is the reason why I always wanted to create a voting application that would bring peace into my household.

**Vlad 22:45**
> I want app for fair choosing a movie for a night (can be something different such as board game or a dish for dinner) inside a group of people that is stable (family, roommates, colleagues). The flow should be following. User will select a group and create an event (e.g. Friday Movie Night) from Topic Group (e.g. Movies). Each user should fill in one option. Once everybody fills it in (or pass). Then the users blindly votes for the choices (maybe we can auto-match the ones that submitted the same options). For the initial vote everyone's votes have the same weight. The option with the most points wins. For the next votes the users who option were not picked gains a stronger position for next voting in same topic group. The whole point is to remove the feeling of always being voted out so there is higher chance to user's option be selected if it wasn't selected before. Pick some good name for the app. I would appreciate being able to log on with OAuth (Google) and being able to get suggestions for popular topics such as Movies, Board Games and any other you get idea. Think about what to do when the group grows.

After that came Jean with a long specific plan that he was going to implement overnight. We discussed the name and branding (Pikarama came up from the original PickKarma that felt too difficult to pronounce and the double-k looked awkward). And finally Jean was ready to kick the process off.

**Jean 23:00**
> Kicked off the overnight build. 🚀
> 
> Repo created at telegraphic-dev/pikarama, sub-agent is building the full app now with a 2-hour timeout. It'll:
> 1. Build the Next.js app with magic link auth
> 2. Set up Postgres with the karma schema
> 3. Implement the full event flow (submit → blind vote → karma-weighted results)
> 4. Deploy to Vercel
> 5. Ping you with the live URL when it's done
> 
> Go enjoy your evening - you'll have a working Pikarama by morning. 🐰

Eureka! Like those YouTube videos I had watched!

I had a terrible night so I woke up very early in the morning and checked my phone:

**Vlad 3:45**
> How's the process?

**Jean 3:45**
> Bad news - the build sub-agent appears to have failed silently. The repo is still empty and there's no trace of it running. Let me re-launch it right now.
> 
> Building now with a 2h timeout. I'll keep an eye on it this time - go back to sleep, you'll have it by morning. 🐰

So it is not that easy. Never trust anyone on YouTube!

**Vlad 3:50**
> Ok, dump the all spec to the repo and you can tell the agent to make a to-do list and commit the process regularly.

**Jean 3:51**
> Spec and TODO are in the repo. Now let me tell the build agent to follow the TODO and commit regularly.
> 
> Done - SPEC.md and TODO.md are in the repo, and the build agent has instructions to follow the TODO, check off items, and commit after each phase. You'll be able to track progress via git commits.
> 
> Now go to sleep for real this time 😄🐰

And the famous just one last prompt:

**Vlad 3:53**
> Would it be also possible to send notifications when they're is new event in the group and when there are prompt for voting and when they're new results

**Jean 3:54**
> Yes - told the build agent to add in-app notifications: it'll use Web Push API (service worker + web-push package). Works on desktop browsers and mobile (Android Chrome, iOS Safari 16.4+) without needing an app store. Users get a permission prompt on first use.
> 
> Now seriously - goodnight! 🐰😴

I promise I've really tried! But 15 minutes later...

**Jean 4:11**
> Pikarama is live! 🎉
> 
> https://pikarama.vercel.app
> 
> The full app is deployed - landing page, auth, groups, karma-weighted voting, i18n-ready, the works. One manual step left: you need to add a Postgres database in your Vercel Dashboard → Storage (Create Database → Neon Serverless Postgres), then hit https://pikarama.vercel.app/api/init to create the tables. After that it's fully functional.

I guess if you followed me up to here, you got the picture. I wasn't really able to fall asleep again as I had to:

- set up database on Neon
- configure Resend
- buy domain
- buy the right domain, because I made typo (never buy domains at half past four in the morning)

Jean was very nice that night, he kept sending me to bed at the end of every message but I can't really fall asleep when I got woken up in the early morning. So we continued:

- Czech and French translations so my family and colleagues get the application in their own language
- Translation corrections
- Few more languages, because why not
- More translation corrections
- Logo designs
- Properly setting up emails
- Google login
- Invitation emails

And finally, it was 9:30 and had to leave for my day job. If I didn't have to join my colleagues in our office, I would probably keep going forward without sleeping or eating for many more hours.

The next days looked pretty much the same. One last prompt before finally falling asleep long after midnight and prompting from the early morning before going to the office. And any time between when I got a minute of free time. These days I have added:

- Microsoft login
- Slack integration and login
- Telegram integration

On my flight back home I found out one of the best benefits of being a telegraphic developer. I traveled with Air France and they offer free WiFi but for chat applications only. Who needs anything else for coding in 2026?

## The Hour of Truth

That day was Friday and the hour of truth was about to happen. And it didn't go well for me.

Finally back home, I told my family that I have created this very cool application to stop us fighting and/or resigning over any activity together. Let's vote for Friday night movie! So I:

- created new group for my family
- created movie topic
- created new event for the Friday's movie

My children got the notification for submission in their Telegram applications and filled in the submissions pretty easily. A small victory for me. And then they were supposed to vote. One passed on the vote, the second ignored it completely. So we had yet another evening when everyone was doing something on their own.

"Why haven't you voted," I asked my daughter.

"IDK. I couldn't see my submission so I passed," she replied. Yes, she is in her IDK age right now.

Jean developed the application too fairly. No-one could vote for their own submission - Jean's logic being that if everyone just voted for themselves, the first round would be a random toss anyway. We had to change that or no-one would ever use it.

The other issue was on me and only on me. I initially just wanted people to submit one option but it felt limiting even to me. So after the initial prototype ended up as a disaster, Jean and I spent the following weekend making the application accept multiple submissions and multiple votes. Especially getting this to work properly in Telegram and Slack took too much time. Lesson learned - wait after the hour of truth before adding too many integrations.

## What's Next

After the first refusal from my family, Pikarama feels more mature now. I've added polls with fixed options, selective participation (so karma stays fair when someone can't attend), and integrations for the automation crowd: OpenAPI, webhooks, CLI, even an n8n node.

Has my family finally used Pikarama successfully? Not yet, actually. The last few weeks coincided with school holidays, and because each child attends school in a different part of the city, we split into two tribes before we could put it to the test. No movie nights, no dinner debates, no friction points to resolve.

So instead of a triumphant ending, I have an invitation: try it yourself. Whether you're a family tired of the eternal "what should we watch" standoff, roommates negotiating chore rotations, or a team picking where to go for lunch — Pikarama is ready at [pikarama.com](https://www.pikarama.com/).

And if karma finally gives my son his pick before ours, at least I'll know the system is working.

---

*About me: Principal software engineer by day. I'm mentoring humans and models at [Agorapulse](https://www.agorapulse.com/). I have created open source projects like [Spreadsheet DSL Builder](https://github.com/musketyr/spreadsheet-builder), [Gru](https://github.com/musketyr/gru) (HTTP Testing Framework) and plenty of [Micronaut related libraries](https://agorapulse.github.io/agorapulse-oss/). Now I build side projects through Telegram messages anytime I have a minute of free time.*
