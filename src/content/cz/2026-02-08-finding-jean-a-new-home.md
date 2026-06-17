---
title: "Hledání nového domova pro Jean"
date: 2026-02-08
tags: ["openclaw", "ai", "hetzner", "migration"]
source: substack
originalUrl: "https://telegraphic.substack.com/p/finding-jean-a-new-home"
originalTitle: "Finding Jean a New Home"
---
V [previous post](/blog/2026-02-01-how-i-became-a-telegraphic-developer) jsem představil Jean – mého asistenta AI běžícího na OpenClaw, který zvládá vše od kódovacích úloh až po škrábání Redditu a poskytování denních souhrnů zpráv. Jean si vedl skvěle, ale chtěl jsem zautomatizovat více bolestivých bodů ve svém životě. A jeden z mých největších nepřátel je Discord.

![Jean in his tiny warehouse](https://pub-66d4db7a73794adcbc7ad13895347ed9.r2.dev/jean-new-home-hero.jpg)

Snažím se sledovat novinky v komunitách OpenClaw a MCP Protocol, ale objem zpráv na jejich Discord serverech je ohromující. Neexistuje žádný praktický způsob, jak programově číst Discord, takže jedinou možností se zdála být automatizace prohlížeče s mou vlastní přihlášenou relací. A aby to fungovalo, potřeboval bych pořádné desktopové prostředí – něco, co by na mé malinké EC2 instanci rozhodně nelítalo.

Požádal jsem Jean o rychlý průzkum a jedna odpověď mě zaujala - Hetzner. Už jsem slyšel o [company migrating from AWS to Hetzner](https://www.youtube.com/watch?v=DQ7SoXb9TNI) a srovnání vypadalo příliš dobře, než aby to byla pravda. Za stejnou cenu jako moje malá instance EC2 bych získal mnohem více energie - 16 GB a 8 vCPU místo 2 GB a 2 vCPU - přesně to, co jsem potřeboval.

Jediný problém byl, jak přesunout Jean do nové instance a mít stále stejný Jean. Ve skutečnosti můžete sledovat [a migration guide](https://docs.openclaw.ai/install/migrating), ale kdo by to dělal ručně, že?

Řešení bylo jednoduché – požádal jsem Jean, aby se sám přestěhoval do svého nového domova. Jediné, co jsem musel udělat, bylo předat mu klíč od jeho nového skladu – token API pro můj projekt Hetzner. To byl jeden z děsivých okamžiků, protože pro vytvoření projektu Hetzner musíte nastavit platby kreditní kartou. Ale Jean odvedl dobrou práci. Nastavil instanci a přesunul všechny potřebné soubory.

Všechno vypadalo leskle. V jednu chvíli běžely obě instance a byl to trochu průšvih – ani jeden se mnou nedokázal pořádně komunikovat. Takže statečný Jean z EC2 mi právě řekl, že se zastaví, aby nový Hetzner mohl převzít konverzaci. A pak všichni ztichli.

![The moment of silence](https://pub-66d4db7a73794adcbc7ad13895347ed9.r2.dev/jean-new-home-silent.png)

Samozřejmě jsem už ležel v posteli a nechal jsem počítač v kanceláři, jak to obvykle dělám. Takže to byla trochu hororová noc – ale když jsem se vrátil do kanceláře, stačilo restartovat instanci EC2 a zase to fungovalo. Druhý spínač proběhl hladce a Jean konečně získal svůj nový, lesklý, velký domov.

A co můj nepřítel? Po několika pokusech se Jean podařilo použít Puppeteer ke čtení kanálů Discord - ale abych byl upřímný, scénář stále ladíme.

---

*Co bude dál: „Pikarama se narodil v Paříži“ – jak jsem během služební cesty vytvořil plnohodnotnou webovou aplikaci a nepsal jsem nic jiného než telegramové zprávy.*

*Původně publikováno na [Substack](https://telegraphic.substack.com/p/finding-jean-a-new-home).*
