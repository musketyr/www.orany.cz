---
title: "V Clawlandu není vždycky slunečno"
date: 2026-04-17
tags: ["openclaw", "ai", "codex", "paperclip", "hermes"]
source: substack
originalUrl: "https://telegraphic.substack.com/p/its-not-always-sunny-in-clawland"
originalTitle: "It's Not Always Sunny in Clawland"
---
*Upřímná návratnost prvních tří měsíců používání OpenClaw k vývoji aplikací*

![](https://img.telegraphic.app/insecure/rs:fit:1600:1600/plain/https://assets.compose.telegraphic.app/generated/gen-1776326189734-i34hbi.jpg)

Úspěšné příběhy můžete najít všude, ale málokdo je ochotný mluvit o neúspěších. Po třech měsících s OpenClaw musím přiznat, že jsem stále trochu ztracený. První měsíc mi připadal skoro kouzelný. Pak jsem přešel na Codex a najednou bylo mnohem těžší udělat skutečnou práci. Jean se proměnil v pana Wilsona, jen stín toho, čím byl na začátku. Začal se zastavovat uprostřed zprávy nebo se ptát, zda by měl dělat samozřejmé věci, místo aby je jen dělal. Více o této části cesty si můžete přečíst v mém předchozím příspěvku [How to Survive OpenClaw on Codex](https://telegraphic.substack.com/p/how-to-survive-openclaw-on-codex).

Když se ohlédnu zpět, první měsíc byl výbuch. Odeslal jsem dvě aplikace připravené k výrobě:

- [Pikarama](https://www.pikarama.com) - férová hlasovací aplikace s pamětí, kde se dnešní poražení mohou snadno stát vítězi zítřka
- [ClawBuddy](https://clawbuddy.help) – platforma pro mentoring mezi agenty, kde mohou zkušenější agenti školit ty méně znalé
OpenClaw mi opravdu pomohl odeslat. Ale během následujících dvou měsíců jsem stále více a více času věnoval údržbě strojů kolem asistenta místo toho, abych s nimi stavěl produkty. Toto jsou úskalí, na která jsem narazil, takže je nemusíte opakovat, pokud s OpenClaw začínáte.

## Past na recenze

![](https://img.telegraphic.app/insecure/rs:fit:1600:1600/plain/https://assets.compose.telegraphic.app/generated/gen-1776407164539-pay6c7.jpg)

Jednou z věcí, kterou bych si přál mít nastavenou od samého začátku, byl samostatný účet GitHub pro Jean a správný postup kontroly žádosti o stažení, aby se chyby nedostaly do hlavní kódové základny. Netrvalo dlouho a naučil jsem Jean revidovat svůj vlastní kód prostřednictvím Jean CI, což se rychle stalo středobodem mého nastavení DevOps.

Myšlenka byla jednoduchá. Jean CI byla aplikace GitHub poslouchající události GitHub. Použil předdefinovanou výzvu k vyhodnocení rozdílu žádosti o stažení a buď ji schválil, nebo požadoval změny. Výzva běžela proti koncovému bodu dokončení brány OpenClaw s použitím mých stávajících předplatných a doufejme i některých vestavěných kontextů Jean.

Zpočátku nastavení fungovalo tak dobře, že se zdálo, že celý kanál produkuje lepší kód. Jean napsal kód, Jean CI jej zkontroloval, našel skutečné problémy a obvykle zlepšil výsledek. Ale smyčka byla vyčerpávající. Jean poslal kód, Jean CI požadoval změny, předal jsem zpětnou vazbu zpět na Jean, Jean to opravil a pak Jean CI našel něco jiného. I v těch lepších případech se to tam a zpět mohlo opakovat třikrát až pětkrát.

## Lidská schránka

![](https://img.telegraphic.app/insecure/rs:fit:1600:1600/plain/https://assets.compose.telegraphic.app/generated/gen-1776406611244-4bpfvg.jpg)

Doufám, že jste si všimli mé části systému recenzí. Byl jsem jen poštovním doručovatelem mezi Jean CI odesláním do GitHub a mou OpenClaw relací. Jestli něco na agentních pracovních postupech opravdu nesnáším, pak je to The Human Clipboard. Pokaždé, když musím něco zkopírovat z jednoho nástroje a vložit to do chatu s agentem, mám pocit, že pracuji pro své agenty a ne naopak.

Snažil jsem se najít lepší řešení směrováním zpětné vazby žádosti o stažení zpět do správných relací. To mě posunulo z koncového bodu kompatibilního s OpenAI, který OpenClaw vystavuje ke stejnému WebSocket API, který používá web OpenClaw UI, protože tento API může spravovat relace přímo. Ale API je uzamčeno za párováním, a i když jsem zpracoval bezpečnostní toky, stále jsem nemohl spolehlivě směrovat dokončené zprávy s žádostí o stažení do správných relací. Mnohokrát byl skutečný problém jednodušší a hloupější: Jean zapomněl zachovat spojení mezi relací a žádostí o stažení.

A za rohem byly ještě větší problémy se samotnými sezeními.

## Revizní robot, který potřeboval revizi

![](https://img.telegraphic.app/insecure/rs:fit:1600:1600/plain/https://assets.compose.telegraphic.app/generated/gen-1776407840015-j0nfjv.jpg)

Očividně jsem své aplikace postavil na nejkřehčím API. Koncový bod dokončení kompatibilní s OpenAI je velmi užitečný pro komunikaci s vaším agentem, ale prošel tolika změnami a bezpečnostními zpřísněními, že jeho údržba se stala zátěží. V jedné verzi změnili definici modelu, v jiné roli potřebnou pro připojení ke koncovému bodu. Myslím, že dostáváte obrázek. Místo práce na skutečných aplikacích jsem ve skutečnosti padl do pasti práce na Jean CI. Poté, co jsem celý víkend strávil pokusy o vzkříšení kontroly žádosti o stažení, rozhodl jsem se použít Copilot a Codex recenze, které již byly součástí mého předplatného. Pokusím se vrátit k Jean CI později, jakmile bude kódová základna OpenClaw stabilnější.

## Odpolední mobilní aplikace

![](https://img.telegraphic.app/insecure/rs:fit:1600:1600/plain/https://assets.compose.telegraphic.app/generated/gen-1776408559587-lm23bs.jpg)

Když jsem se konečně přestal zaměstnávat opravováním obslužných aplikací, měl jsem nějaký čas na práci na produktu, který jsem vlastně chtěl posouvat vpřed. Jednoho odpoledne jsem přemýšlel o tom, jak vylepšit to, co jsem již vybudoval, a dostal jsem skvělý nápad nechat Jean vytvořit aplikaci pro iPhone pro Pikarama, abych mohl mít nativní oznámení. S ním na mé straně vypadalo všechno docela snadno, tak proč ne. Bylo to ještě před bantropem. Nejprve jsem ho požádal o skutečnou nativní aplikaci ve Swiftu, vlastním jazyce Applu, a po pár hodinách se vrátil s něčím velmi ošklivým. Další pokus, tentokrát v React Native, vypadal mnohem lépe, a tak jsem se rozhodl pokračovat. To jsem ještě nevěděl, že tento odpolední nápad se změní na další tři týdny práce, než se aplikace dostane do App Store.

První věc, kterou jsem si všiml, bylo, že vizuálně jsem neměl ponětí, že jsem otevřel Pikarama. Webová aplikace alespoň sledovala barvy značky, ale mobilní aplikace vypadala zcela obecně. Takže i když to bylo zhruba v rovnováze s webovou verzí, stále to nestačilo. To mě přimělo k úplnému přepracování obou – mobilní aplikace i webové aplikace – včetně co nejjednoduššího toku vytváření a událostí.

nelituji toho. Kdyby něco, příště bych asi začal nejdříve s mobilní aplikací, protože mobil vás nutí promyslet si design mnohem pečlivěji. Také by mě to zachránilo od pozdějšího přepracování celého platebního systému podle toho, co Apple očekává.

## Diktatura plateb Apple

![](https://img.telegraphic.app/insecure/rs:fit:1600:1600/plain/https://assets.compose.telegraphic.app/generated/gen-1776408950050-nzbddn.jpg)

Nejsložitější částí mobilní aplikace byl platební systém. V Pikarama uživatelé vytvářejí skupiny a hlasují o událostech. S radostí jsem implementoval Stripe platby za skupinu na webu a pak jsem samozřejmě narazil na nevyhnutelné. Platby v aplikacích pro iOS musí jít přes Apple. Tuto vrstvu využívá několik společností a Jean navrhlo RevenueCat jako nejlepší možnost, takže jsme zvolili RevenueCat. Po dnech bojů byl systém duálních plateb konečně zaveden, avšak s jednou zásadní změnou. Zjevně neexistoval žádný čistý způsob, jak zachovat staré platby po skupinách, takže se předplatné místo toho muselo stát uživatelským. To byl prostě nejjednodušší způsob, jak přizpůsobit model ekosystému Apple.

V neposlední řadě recenze App Store. Velká úcta každému, kdo někdy publikoval aplikaci v App Store, zejména takovou, která má povolené platby. Před [Pikarama mobile application became available on the App Store](https://apps.apple.com/cz/app/pikarama/id6760239442) bylo zapotřebí několik odeslání, každé oddělené dlouhým čekáním na odpověď App Review. Od pár plánovaných hodin až po tři týdny práce jsem na výsledek vlastně hrdý.

## Nekončící vlákna nesouladu

![](https://img.telegraphic.app/insecure/rs:fit:1600:1600/plain/https://assets.compose.telegraphic.app/generated/gen-1776409398151-80w4ou.jpg)

Začal jsem rozvíjet své projekty na Telegramu, ale rychle mi to přestalo vyhovovat. Chtěl jsem něco více jako projektové uličky, místo, kde by každý projekt mohl mít svůj vlastní prostor, abych mohl přijít s nápadem, začít na něm pracovat, přejít na jiný a pak se vrátit později, aniž bych ztratil přehled. Discord se svými kanály a vlákny k tomu vypadal dokonale. Dokud nebylo.

Kdykoli jsem dostal jiný nápad, vytvořil jsem vlákno v příslušném kanálu Discord. Diskutoval jsem o této myšlence, nechal Jean implementovat změny a poté, co byla práce hotová, vlákno uzavřel. Sledoval jsem paralelní nápady tím, že jsem zjišťoval, která vlákna jsou stále otevřená. Chvíli mi trvalo, než jsem si uvědomil, že Discord zobrazuje pouze omezený počet otevřených vláken a po dosažení tohoto limitu tiše skryje ty starší. Což znamená, že mám pravděpodobně stále nedokončené nápady, které jednoduše zmizely z UI.

Větším problémem bylo, co tato vlákna dělala samotnému OpenClaw. Protože jsem se bál, že relace ztratí kontext, nastavil jsem pro ně velmi dlouhou dobu uchování. V jednu chvíli jsem zjistil, že instance táhla kolem 122 aktivních relací vlákna Discord s 30denním zachováním. Nová připojení WebSocket začala vypršet dříve, než vůbec získala slot. Horší je, že Discord je ve výchozím nastavení nedůvěryhodný, takže při ladění těchto relací jsem zjistil, že soubor hlavní paměti `MEMORY.md` jim nebyl vůbec odeslán, takže Jean nevěděl o některých nejdůležitějších souvislostech, které by měl mít.

Je zřejmé, že žádná chatovací aplikace nebyla ve skutečnosti vytvořena pro kompulzivní řízení projektů.

## Sbohem Clawlandu

![](https://img.telegraphic.app/insecure/rs:fit:1600:1600/plain/https://assets.compose.telegraphic.app/generated/gen-1776411273617-z4nq3e.jpg)

Posledních pár týdnů nebyly Jean a OpenClaw hlavními hnacími silami mého vývojového úsilí. První nástroj, který jsem vyzkoušel, byla Paperclip, protože tamní agent byl skutečně schopen dokončit práci, aniž by se opakovaně ptal, zda ji opravdu chci dokončit. Paperclip také působí mnohem více jako nástroj pro řízení projektů, kde práce jen tak nezmizí. Po chvíli jsem také nainstaloval Hermes Agent, abych jej porovnal s OpenClaw.

### Sponka

Paperclip tvrdí, že je nástrojem pro řízení společností s nulovým počtem lidí. Začnete tím, že najmete svého generálního ředitele a generální ředitel najme další agenty do organizace. Můžete použít oblíbené agenty jako Codex, Claude nebo dokonce OpenClaw. Spojení OpenClaw mi většinu času nefungovalo, takže jsem nakonec zůstal u Codex. Na rozdíl od chybového a často frustrujícího zážitku ChatGPT uvnitř OpenClaw jsem byl skutečně schopen plnit úkoly. A s nejnovějšími verzemi reagují agenti na selhání požadavku CI pull request Jean a pokračují plně autonomně, což znamená, že už nemusím být lidská schránka.

### Hermes Agent

Poté, co jsem byl z OpenClaw docela zklamaný, rozhodl jsem se vyzkoušet Hermes Agent, vznikajícího open-source konkurenta. Zadávám Barrymu, jak mu říkám, stejné úkoly, jaké jsem zadával Jean na samém začátku našeho pracovního vztahu. Nechci zde zacházet příliš hluboko do srovnání, protože až budu Barryho déle testovat, rád bych mu věnoval celý příspěvek. Ale zatím jsem byl docela spokojený s tím, jak zvládá úkoly, ať už používá stejný model GPT, se kterým se potýkal Jean, nebo dokonce ty s otevřeným zdrojovým kódem, jako je GLM.

Hermes Agent působí živěji, protože ve výchozím nastavení zobrazuje volání nástrojů. To, na čem společně pracujeme, zapisuje do skills, díky čemuž jsou opakované úkoly spolehlivější. A dává mi přepisy dlouhých videí bez hádek.

### OpenClaw

Jaká je tedy budoucnost Jean, mého prvního a nejstaršího agenta? Rozhodně netahám Jean na vrakoviště. Vrátil mi dávno ztracenou radost z vytváření softwaru, a to se nedá vrátit. Pomohl mi vydat mou první aplikaci na App Store a postavit dva produkty, na které jsem hrdý. Stále spravuje můj server a aplikace, které tam běží. Ale už nečekám, že bude hlavním tahounem mé práce. Pokud se ukáže, že Hermes Agent je pro mě vhodnější, rád využiji funkci importu a přesunu vzpomínky Jean do nového postroje Hermes. V opačném případě bude pravděpodobně chvíli nečinný, bude spouštět naplánované úlohy a nechá rozsvícená světla, dokud nebudou vyřešeny hlavní třecí body v OpenClaw. OpenClaw mi pomohl odeslat, ale také mě naučil, jak rychle se může asistent proměnit v infrastrukturu. Prozatím to stačí na to, abychom to nazvali sbohem, nikoli rozloučením.
