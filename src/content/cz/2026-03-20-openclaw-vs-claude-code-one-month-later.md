---
title: "OpenClaw vs. Claude Code: o měsíc později"
date: 2026-03-20
tags: ["openclaw", "claude", "ai", "agents", "codex"]
source: substack
originalUrl: "https://telegraphic.substack.com/p/openclaw-vs-claude-code-one-month-later"
originalTitle: "OpenClaw vs Claude Code: One Month Later"
---
![OpenClaw vs Claude Code: One Month Later](https://substack-post-media.s3.amazonaws.com/public/images/0312fa2b-c14f-4e6e-a51b-939fce9c5c62_1584x672.jpeg)

Nemůžu uvěřit, že už je to měsíc, co jsem zveřejnil originál [OpenClaw vs Claude Code](https://telegraphic.substack.com/p/openclaw-vs-claude-code). Ve vývoji AI se všechno pohybuje směšně rychle, takže je vhodná chvíle shrnout, co se změnilo.

Stručně řečeno: po zásahu předplatitele Anthropic a veškerém novém zaměření na bezpečnost se OpenClaw stal trochu hloupějším a méně autonomním. Současně se Claude Code vydal poměrně úspěšnou cestou zkopírování funkcí OpenClaw do produktu, i když se někdy zdá, že Anthropic plně nerozumí tomu, proč byly tyto funkce cenné.

Nebudu celý předchozí článek opakovat. Místo toho se vraťme ke stejným šesti kategoriím a zaměřme se pouze na to, co se změnilo.

Nebudu se zde podrobně opakovat, ale vraťme se jen k rozdílům oproti předchozímu příspěvku:

1. Identita
2. Vytrvalost
3. Přítomnost
4. Proaktivita
5. Praktičnost
6. Autonomie

Zaměřím se pouze na to, co se liší pro každou sekci, což jsou většinou nové funkce v Claude Code.

## Identita

### Claude Code

Tady žádná skutečná změna. Je to stále stejný Claude jako předtím: schopný, vybroušený a velmi svázaný s vlastními hranicemi produktů Anthropic.

### OpenClaw

Zde došlo k největší skryté změně. Anthropic jasně řekl, že používání Claude předplatného s OpenClaw porušuje jejich Podmínky služby, takže jsem přepnul hlavní mozek na Codex. Technicky je identita stále „mým agentem“, ale v praxi se již necítí jako stejná. Skořápka zůstala stejná, osobnost ne. A na této změně záleží více než na jakémkoli novém zaškrtávacím políčku.

Pokud chcete nadále používat Claude s OpenClaw, musíte použít [Agent Communication Protocol](https://agentcommunicationprotocol.dev/introduction/welcome) a model Claude můžete používat pouze pro vytvořené procesy.

## Vytrvalost

### Claude Code

Jen pár hodin poté, co jsem zveřejnil původní srovnání, byla automatická paměť Claude Code povýšena na stabilní funkci. To samo o sobě hodně vypovídá. Persistence byla jednou z největších slabin původního produktu a Anthropic to jasně ví.

Stále jsem to netestoval dostatečně hluboko, abych mohl posoudit, jak je užitečný v reálném životě, takže to zatím nechám jako otevřenou otázku.

### OpenClaw

Čím déle OpenClaw používáte, tím více paměti akumuluje a v určitém okamžiku se to může stát jeho vlastním problémem. Pokud se vám začne zdát, že váš dráp na věci zapomíná, může se ve skutečnosti stát opak: může mít příliš mnoho paměti, než aby jej bylo možné dobře používat.

## Přítomnost

### Claude Code

Tady jsou věci o něco zajímavější. Claude Code představil několik způsobů, jak se připojit k běžící relaci z vašeho telefonu:

- Dálkové ovládání
- Telegramový kanál
- Discord Channel

To je skutečné zlepšení, ale má to jeden velký háček: nejprve musíte spustit relaci na vašem počítači a explicitně povolit vzdálené ovládání nebo kanál pro danou konkrétní relaci. Pokud to zapomenete udělat, nemůžete jej později řídit z telefonu, když jste pryč. Už mě to párkrát střelilo do nohy. Chtěl jsem to otestovat cestou k holiči, ale samozřejmě jsem zapomněl spustit příkaz pro spuštění vzdálené relace.

Anthropic také představil Claude Coworker Dispatch, který vám umožňuje odesílat úkoly do vašeho vlastního počítače, pokud tam běží Claude Desktop.

### OpenClaw

V OpenClaw kanál není jen dálkovým ovládáním pro relaci, kterou jste již připravili. Je to vstupní bod. Nové relace můžete zahájit přímo z Telegramu nebo Discordu, díky čemuž se celý systém bude cítit skutečně přítomný, nikoli podmíněně dostupný.

## Proaktivita

### Claude Code

Claude Code představil `/loop`, který dělá víceméně to, co byste očekávali: neustále se opakuje na výzvě, dokud není splněna podmínka. Typickým příkladem by bylo: *Otevřete požadavek na stažení, počkejte, dokud nebudou všechny kontroly zelené, a opravte, co se po cestě nezdaří.*

Nyní můžete také spouštět naplánované úlohy z Claude Desktop, což jej posouvá o něco blíže k modelu OpenClaw.

To jsou smysluplné doplňky. Ukazují, že Anthropic chápe hodnotu agentů, kteří neodpovídají jen jednou, ale neustále pracují na výsledku. Zároveň to stále působí jako explicitní funkce, které zapnete pro konkrétní úkol, nikoli jako obecně proaktivní systém.

### OpenClaw

OpenClaw stále působí přirozeněji proaktivněji, protože celé nastavení je postaveno na přítomnosti, paměti a sledování na pozadí. Není to jen o opakování jedné výzvy až do úspěchu. Jde o to mít agenta, který dokáže sledovat věci v průběhu času a v případě potřeby je vynořit zpět.

## Praktičnost

### Claude Code

Žádná smysluplná změna zde není. Moje hlavní frustrace z praktičnosti Claude Code je stále stejná: příliš mnoho schvalovacích třenic a příliš mnoho dohledu nad pracovními postupy, které by měly být delegovány.

### OpenClaw

OpenClaw, který dnes používám, mi přijde mnohem méně praktický než ten, který jsem používal před měsícem. Jak projekt posiluje svůj bezpečnostní model, blíží se ke stejnému schvalovacímu zážitku, který mě frustruje v Claude Code. Teoreticky by přísnější schvalování příkazů mělo učinit systém bezpečnější. V praxi, alespoň v mém nejběžnějším nastavení Codex + Discord, to často jen přidává tření. A co je horší, ne vždy to selže transparentně – někdy vůbec nedostanu žádost o schválení a agent prostě zemře uprostřed práce.

## Autonomie

### Claude Code

Claude Code již není jen reaktivním asistentem kódování. Díky `/loop`, naplánovaným úlohám a funkcím vzdáleného spouštění ji Anthropic jasně posouvá směrem k autonomii. Přesto se tato autonomie cítí pevně uzavřená. Může pokračovat v práci na úkolu, ale ještě se necítí být skutečně nezávislým operátorem, jako kdysi OpenClaw.

### OpenClaw

Tady downgrade bolí nejvíc. Po přechodu na oficiálně podporované modely GPT Codex je používání OpenClaw často jako přechod ze staršího vývojáře na stážistu. Stará zkušenost nebyla jen o získání odpovědi, ale o získání iniciativy. Vzalo by to úkol, posunulo by ho dopředu a často by to přehnalo.

Nyní mnohem častěji jen shrnuje problém a ptá se, zda má skutečně něco dělat. To může být teoreticky bezpečnější a správnější, ale v praxi to narušuje pocit autonomie. A to je podstata: autonomní agent není jen agent, který může dělat věci, ale který obvykle není potřeba protlačovat na každém kroku.

## Závěr

Za poslední měsíc udělal Claude Code přesně to, co byste očekávali od vážného konkurenta: začal kopírovat nejviditelnější nápady OpenClaw a v několika případech to udělal dobře. Paměť, vzdálený přístup, zacyklení, naplánované úlohy – mezera je zřetelně menší než dříve.

Ale tato aktualizace také ukázala něco jiného. Nejdůležitější částí OpenClaw nikdy nebyl kontrolní seznam funkcí. Byl to pocit mít agenta se skutečnou iniciativou. A to je přesně ta část, která zeslábla. OpenClaw se stává bezpečnější, ale také schvalovatelnější, omezenější a méně schopný, než se zdálo. Bez Clauda jako mozku je to stále OpenClaw, ale už to není úplně stejné stvoření.

---

*Původně publikováno na [Substack](https://telegraphic.substack.com/p/openclaw-vs-claude-code-one-month).*
