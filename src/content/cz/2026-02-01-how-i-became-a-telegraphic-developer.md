---
title: "Jak jsem se stal telegrafickým vývojářem"
date: 2026-02-01
tags: ["openclaw", "ai", "telegram", "telegraphic"]
source: substack
originalUrl: "https://telegraphic.substack.com/p/how-i-became-a-telegraphic-developer"
originalTitle: "How I Became a Telegraphic Developer"
---
V těchto dnech možná trávím mnohem více času na telefonu v Telegramu, než jsem býval dříve. Ale nepíšu ostatním lidem, píšu svému [OpenClaw](https://openclaw.ai/) botovi s názvem Jean. Minulý týden pro mě Jean vyvinul celou novou aplikaci pro hlasování na základě karmy s názvem [Pikarama](https://www.pikarama.com/). Řídil jsem, Jean implementoval vše.

Před dvěma měsíci jsem sledoval video na YouTube, které změnilo můj názor na vývoj softwaru.  [Alex Finn](https://www.youtube.com/@AlexFinnOfficial) nazval ClawdBot „nejvýkonnějším nástrojem AI, jaký jsem kdy použil“. Hodně jsem používal Claude Code a hodně mi chyběla autonomie. Mnoho dní jsem jen mačkal tlačítko Enter na klávesnici, abych posunul Clauda vpřed.

Nenechte se překvapit názvem ClawdBot, existuje trochu děsivý příběh o tom, proč a kolikrát byl nástroj přejmenován, než konečně přistál s OpenClaw.

Roztočil jsem instanci [Amazon AWS EC2](https://aws.amazon.com/ec2/) – protože jsem slyšel všechny příběhy o tom, jak ClawdBot převzal něčí počítač – spustil jsem instalační program a připojil ho k [Telegram](https://telegram.org/). Během 30 minut jsem měl agenta AI, který mohl číst mé zprávy, spouštět kód, načítat webové stránky a – což je nejdůležitější – pracovat, když spím, aby pro mě připravil něco skvělého.

Hledal jsem nějaké výzvy, které bych musel řešit, a ta první byla docela úzká. Nové nástroje AI usnadňují vytváření aplikací tak snadno, že když jsem se zeptal přítele, co by ho zvýšilo produktivitou, řekl, že by bylo skvělé, kdyby aplikace mohla reagovat na každou zmínku v [Slack](https://slack.com/) pomocí emoji a výsledek pak uložit do Apple Reminders. Během 24 hodin a několika opakováních testování se zrodil [Slack Mention Notifier](https://smn.orany.cz/) – od různých prototypů až po finální řešení s desktopovou aplikací běžící v režimu socket. To vše bez spouštění jakéhokoli IDE.

## Není to o technologii. Je to o rozhraní.

Tradiční vývoj vyžaduje:

- Notebook
- Tichý prostor
- Velké bloky času
- Přepnutí kontextu do "režimu kódování"

To vše je těžké sehnat, když máte denní práci a rodinu. A přesto chci stále vytvářet aplikace, protože přinášet něco užitečného a pomáhat ostatním je to, co miluji na práci vývojáře softwaru.

Na druhou stranu, telegrafický vývoj vyžaduje:

- Váš telefon
- 30 sekund
- Jasná myšlenka

AI zpracovává překlad od záměru k implementaci. Popisuješ, co chceš. Zjistí se jak.

Můj každodenní život teď vypadá spíše jako vedoucí produktu než jako vývojář. Používám aplikaci, všímám si toho, co je vypnuté, posílám zpětnou vazbu, popisuji, co chci dál – a opakuji. Ta smyčka zkoušet, reagovat, řídit je celá práce. Není divu, že si tolik vývojářů začalo říkat „tvůrci produktů“. To je přesně ten pocit.

To, co se liší od kódování vibrací, je to, že nejen nabádám a nemodlím se. Když AI narazí na zeď – záludný závod, špatně nakonfigurovaný tok OAuth, migrace databáze, která tak úplně nefunguje – mohu zasáhnout a odblokovat to. Vím, jak klást ty správné otázky, a když to mluví technicky, rozumím tomu, co říká. Tato zpětná vazba je rychlá, protože obě strany mluví stejným jazykem.

## Přestal jsem psát kód. Nepřestal jsem být inženýrem.

V tomto zpravodaji budu sdílet:

- Praktické návody: Jak nastavit svůj vlastní AI vývojový pracovní postup
- Skutečné příklady: Skutečné konverzace, které vytvořily skutečné funkce
- Získané poznatky: Co funguje, co ne a proč
- Krvácející hrana: Nové schopnosti, jakmile se objeví

Nejsem youtuber ani influencer. Jsem softwarový inženýr, který narazil na něco, co zásadně změnilo způsob mé práce.

Pokud jste si někdy přáli, abyste měli více času na vytváření věcí, přihlaste se. Pojďme na to společně přijít.

---

*Co bude dál: „ [Finding Jean the New Home](https://telegraphic.substack.com/p/finding-jean-a-new-home) “ – jak se Jean přesunul na větší server v Hetzneru.*

*Původně publikováno na [Substack](https://telegraphic.substack.com/p/how-i-became-a-telegraphic-developer).*
