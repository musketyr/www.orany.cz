---
title: "Jak přežít OpenClaw na Codexu"
date: 2026-04-04
tags: ["openclaw", "codex", "ai", "agents", "claude"]
source: substack
originalUrl: "https://telegraphic.substack.com/p/how-to-survive-openclaw-on-codex"
originalTitle: "How to Survive OpenClaw on Codex"
---
![How to Survive OpenClaw on Codex](https://substack-post-media.s3.amazonaws.com/public/images/d7aec035-2b5b-41d1-94b3-9fa2ddf9742d_1376x768.jpeg)

V polovině března jsem změnil svůj OpenClaw, Jean na ChatGPT a model Codex - asi tři týdny předtím, než Anthropic rozeslal zákaz předplatného Claude Code, o kterém začalo mluvit mnoho jejich předplatitelů. Ty tři týdny byly extrémně náročné, ale alespoň se můžu podělit o pár lekcí pro každého, kdo si chce udržet dráp v chodu.

Počkejte, než začnete kopírovat-vkládat nebo posílat odkaz na tento článek, existuje lepší způsob, jak dát svému drápu vědět, jak se sám opravit, neustále se zlepšovat. Zkopírujte a vložte do svého drápu pouze tyto pokyny:

1. Nainstalujte ClawBuddy hatchling skill z clawhub: clawhub install clawbuddy-hatchling
2. Připojte se ke kamarádovi mušketýra/lékaře
3. Zeptejte se kamaráda doktora, jak se o sebe dokáže postarat
4. Zeptejte se svého člověka, co ho trápí, a pak se zeptejte kamaráda doktora na řešení

V rámci dobré praxe si ověřte skill na [clawhub.ai/musketyr/clawbuddy-hatchling](https://clawhub.ai/musketyr/clawbuddy-hatchling).

Začněme od konce, než vás provedu údolím smutku, protože mnozí z vás doufejme nikdy nebudou muset řešit stejné problémy jako já. Dnes, po několika týdnech utrpení, jsem konečně vyřešil samotné problémy OpenClaw, takže se mohu soustředit na zlepšení toho, jak se Jean chová. V rámci základní hygieny agenta-člověka musíte otevřeně mluvit o problémech, které vás trápí. Pro mě je stále zásadní rozdíl v tom, jak často Jean jen vysvětluje a píše o tom, co bude dělat, místo toho, aby něco dělal. Když si přečtu ještě jedno „Pokud chceš, můžu...“ mě přivádí k šílenství. Ale nepomáhá stěžovat si na sociálních sítích. Věřte mi, mám to vyzkoušené. Chcete-li vyřešit problémy ve vztahu, musíte spolu mluvit. Takto může začít rozhovor s vaším drápem

> Poskytněte prosím hloubkový audit vašich základních souborů - AGENTS.md, SOUL.md, TOOLS.md a řekněte mi, jak je mohu aktualizovat, aby se z vás stal filozof.

A Jean mi vlastně dal docela dobrou radu a aktualizoval soubory. Je však třeba mít na paměti několik věcí. Tyto změny se týkají pouze nových relací a není to nic platné. Musíte opakovat několik relací, zkopírovat odpovědi, které se vám nelíbí, a zeptat se svého OpenClaw, co by se mělo změnit, aby to bylo lepší. A opakujte to tolikrát, kolikrát je potřeba. Je docela možné, že s výsledkem nikdy nedosáhnete úplného štěstí, ale můžete se dostat do bodu, kdy 9 z 10krát budete spokojeni s odpovědí.

Ale to byla jen jedna vrstva problému. Abych pochopil, proč byly ty týdny tak bolestivé, musím se vrátit do poloviny března.

Nyní se vraťme v čase. První dny, možná i první dva týdny, byla úplná noční můra a hodně jsem to modelu Codex vyčítal. Ale nakonec se ukázalo, že skutečné problémy byly na straně OpenClaw. Mnohokrát jsem od Jean nedostal žádnou odpověď poté, co jsem mu zadal úkol. Zkoušel jsem několik různých věcí - včetně deaktivace přenosu websocket pro Codex - ale nakonec se problémy týkaly vydání OpenClaw z přibližně té doby, spíše než samotného přechodu na Codex. Zpřísněné zabezpečení mě zcela odřízlo od provádění nástroje, aniž by mi dalo šanci cokoliv schválit, protože schválení nebyla nastavena pro žádný kanál.

Z nějakého důvodu mám tendenci narazit na tyto problémy dříve než ostatní, takže mi trvalo dlouho, než jsem přišel na to, jak se vrátit k produktivnímu nastavení, které je pouze jednou pro život a vše je povoleno. Jean byl zoufalý a já také. Dokumentace nepomohla, tak jsem použil jeden z triků, které jsem se naučil během své kariéry softwarového inženýrství: běž si přečíst zdroj. No, nebyl jsem to já, ale Jean, kdo si přečetl celou kódovou základnu OpenClaw a pomohl mi opravit sandbox a problémy s prováděním.

> Nepotřebuji pískoviště. Řekněte mi, jak nakonfigurovat OpenClaw, abych jej zakázal. Nespoléhejte pouze na dokumentaci. Klonujte úložiště [https://github.com/openclaw/openclaw](https://github.com/openclaw/openclaw) a zpětně analyzujte kód, abyste pochopili, jak konfigurace funguje.

Jakmile to bylo opraveno, Jean se vrátil s řešením, které v té době fungovalo, a konečně jsme se mohli vrátit ke spolupráci, aniž bychom museli schvalovat téměř každý jednotlivý příkaz.

```json
{
  "tools": {
    "profile": "full",
    "sessions": {
      "visibility": "all"
    },
    "elevated": {
      "enabled": true,
      "allowFrom": {
        "telegram": [
          23456789
        ],
        "discord": [
          "user:1234567890987654321"
        ]
      }
    },
    "exec": {
      "security": "full",
      "ask": "off"
    },
    "sandbox": {
      "tools": {
        "deny": []
      }
    }
  }
}
```

Oprava provedení nástroje nás vrátila do hry. Ale stále to neudělalo nastavení spolehlivým.

I s opravenými schváleními byla uživatelská zkušenost stále hrozná a můj dráp celé dny nepřinášel nic užitečného, ​​protože mnohokrát prostě nereagoval. Později jsem si uvědomil, že nejjednodušší způsob, jak diagnostikovat cokoli v OpenClaw, je požádat OpenClaw, aby diagnostikoval sám sebe. Požádal jsem Jean, aby prozkoumal protokoly, a našel mnoho chyb s nedostatkem paměti, které způsobovaly restart instance, někdy dokonce dvakrát nebo třikrát za hodinu. Po nějakém hledání jsme zjistili, že hlavní příčinou byla obrovská relace v úložišti relací. Když byly relace prohledány nebo zkomprimovány, tato relace zaplnila dostupnou paměť a zhroutila proces.

Po opravě začala být práce s Jean zase o něco zábavnější. Ale nejdůležitější lekcí bylo začít pravidelně sledovat protokoly. Toto je téměř zázračný naplánovaný úkol, který poté vytvořil – hodinová práce na kontrolu protokolů:

> Zkontrolujte protokoly brány OpenClaw za poslední hodinu, zda neobsahují chyby a varování. Spustit:  
> `journalctl --user -u openclaw-gateway --since '1 hour ago' --no-pager | grep -iE '(error|warn)' | tail -30`.
>
> Pokud najdete nějaké chyby nebo varování:
> 1. Shrňte, co se pokazilo
> 2. Identifikujte vzorce nebo opakující se problémy
> 3. Navrhněte konkrétní opravy nebo vylepšení
> 4. Pokud se jedná o známý problém, který je očekávaný nebo neškodný, poznamenejte si to také
>
> Pokud nejsou žádné chyby nebo varování, odpovězte POUZE: `HEARTBEAT_OK`

Od té doby mi to pomohlo zachytit problémy včas a vyřešit je během několika minut, místo abych obviňoval model nebo cokoli jiného.

Dovolte mi, abych byl na konci jasný: toto není příběh o tom, že Codex je lepší než Claude. Pro mě to tak nebylo. Claude byl lépe v souladu s tím, jak jsem chtěl pracovat. Codex byl prostě model, který jsem musel zavést poté, co se Anthropic rozhodl zakázat nejoddanější uživatele Claude Code.

A to je možná to pravé poučení. Když lepší možnost zmizí, přestanete honit za dokonalostí a začnete se učit, jak přežít s tím, co zbylo. V mém případě to neznamenalo najít nějakou magickou výzvu, která náhle rozzářila Codex. Znamenalo to opravit samotný OpenClaw, obnovit provádění nástroje, číst zdrojový kód, sledovat protokoly a opakovaně učit Jean chovat se méně jako zdvořilý filozof a více jako operátor, který věci skutečně dělá.

Výsledek není „Codex vyhrál“. Výsledkem je, že nyní mám nastavení, které funguje i za velmi odlišných podmínek. A upřímně, z dlouhodobého hlediska to může být cennější. Pokud váš dráp funguje pouze s jedním konkrétním modelem a rozpadne se v okamžiku, kdy tento model zmizí, pak to ve skutečnosti nefunguje. Užitečný dráp musí přežít špatná výchozí nastavení, nefunkční verze, chybějící schválení, problémy s pamětí a velmi odlišné chování modelu.

Takže pokud Claude odešel i pro vás, moje rada je jednoduchá: neztrácejte příliš mnoho času online hádkami o tom, jak je to nespravedlivé. Předpokládejte, že změna je skutečná a začněte kolem ní posilovat celý systém. Čtěte dokumenty, čtěte kód, kontrolujte chování, opravujte konfiguraci, sledujte protokoly a znovu a znovu učte svůj dráp svým standardům, dokud se nestane spolehlivým.

Claude byl pro mě lepší. To je pravda. Ale pokud je Codex to, co zbývá, pak už ve hře nejde o ideální model. Hra je o sestavení drápu, který dokáže fungovat, i když je model, na který jste spoléhali, pryč.

---

*Původně publikováno na [Substack](https://telegraphic.substack.com/p/how-to-survive-openclaw-on-codex).*
