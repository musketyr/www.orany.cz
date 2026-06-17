---
title: "Moje úplně první telegrafická aplikace"
date: 2026-02-15
tags: ["openclaw", "pikarama", "ai", "telegraphic", "development"]
source: substack
originalUrl: "https://telegraphic.substack.com/p/my-very-first-telegraphic-application"
originalTitle: "My Very First Telegraphic Application"
---
![Hotel room conversation](/images/blog/pikarama-chat.png)

**Vlad 22:25**
> Co byste potřebovali, pokud bych chtěl, abyste vytvořili aplikaci v soukromém úložišti GitHub a nasadili ji přes noc do tarifu zdarma?

Takhle to všechno začalo. Jen nevinná otázka odeslaná z postele, když jsem po příjezdu nemohl usnout v hotelovém pokoji v Paříži. Možná také víte, jak těžké je si na novém místě pořádně odpočinout.

**Jean 22:25**
> Pro GitHub soukromé repo + nasazení Vercel bych potřeboval:
> 
> **GitHub** - již nastaveno, mohu vytvářet soukromé repozitáře přes gh.
> 
> **Vercel** – Potřebuji jeden z:
> 1. Vercel CLI token – přihlaste se vercel a dejte mi token, nebo si ho vygenerujte na vercel.com/account/tokens
> 2. Nebo připojte repo k Vercelu prostřednictvím jejich integrace GitHub (toto učiníte jednou v řídicím panelu Vercel → Importovat projekt → vybrat repo a poté každé zatlačení do hlavních automatických nasazení)
> 
> Možnost 2 je jednodušší – vytvořím repo, push kód, vy ho propojíte s Vercelem za 30 sekund a odtud se automaticky nasadí každé potvrzení, které pushnu. Na mé straně není potřeba žádný žeton.
> 
> Co bych od vás potřeboval:
> - Co by měla aplikace dělat (stručný popis)
> - Účet Vercel připojený k GitHub (jednorázové nastavení, pokud ještě nebylo provedeno)
> - Jakékoli preference: framework (Next.js? prostý React? SvelteKit?), doména atd.
> 
> To je ono. co máš na mysli?

Moje děti jsou jako led a oheň. Jeden říká bílý a druhý černý. Vybrat si film na noc nebo jídlo k obědu je někdy téměř nemožné. To je důvod, proč jsem vždy chtěl vytvořit hlasovací aplikaci, která by vnesla do mé domácnosti klid.

**Vlad 22:45**
> Chci aplikaci pro výběr filmu na noc (může to být něco jiného, jako je desková hra nebo jídlo k večeři) ve skupině lidí, která je stabilní (rodina, spolubydlící, kolegové). Tok by měl následovat. Uživatel vybere skupinu a vytvoří událost (např. páteční filmový večer) z tematické skupiny (např. filmy). Každý uživatel by měl vyplnit jednu možnost. Jakmile to všichni vyplní (nebo projdou). Poté uživatelé slepě hlasují pro volby (možná můžeme automaticky porovnat ty, kteří předložili stejné možnosti). Při prvním hlasování mají hlasy všech stejnou váhu. Vyhrává varianta s největším počtem bodů. Pro další hlasování získávají uživatelé, kteří možnost nebyla vybrána, silnější pozici pro další hlasování ve stejné tematické skupině. Celým smyslem je odstranit pocit, že jste vždy odhlasováni, takže je větší šance, že bude vybrána možnost uživatele, pokud nebyla vybrána dříve. Vyberte nějaké dobré jméno pro aplikaci. Ocenil bych, kdybych se mohl přihlásit pomocí OAuth (Google) a mohl dostávat návrhy na oblíbená témata, jako jsou filmy, deskové hry a jakákoliv další, která vás napadnou. Přemýšlejte o tom, co dělat, když se skupina rozroste.

Poté přišel Jean s dlouhým konkrétním plánem, který se chystal přes noc realizovat. Diskutovali jsme o jménu a značce (Pikarama pochází z původního PickKarma, který se zdál být příliš těžký na výslovnost a dvojité k vypadalo trapně). A konečně byl Jean připraven zahájit proces.

**Jean 23:00**
> Spustili noční stavbu. 🚀
> 
> Repo vytvořeno na telegraphic-dev/pikarama, sub-agent nyní vytváří plnou aplikaci s 2hodinovým časovým limitem. To bude:
> 1. Sestavte aplikaci Next.js s ověřením magického odkazu
> 2. Nastavte Postgres se schématem karmy
> 3. Implementujte celý tok událostí (odeslat → slepé hlasování → výsledky vážené karmou)
> 4. Nasadit do Vercelu
> 5. Až bude hotovo, odešlete na vás ping s aktuální adresou URL
> 
> Jděte si užít večer - do rána budete mít fungující Pikarama. 🐰

Eureka! Jako ta videa na YouTube, která jsem viděl!

Měl jsem hroznou noc, takže jsem se probudil velmi brzy ráno a zkontroloval svůj telefon:

**Vlad 3:45**
> Jak probíhá proces?

**Jean 3:45**
> Špatné zprávy – zdá se, že dílčí agent sestavení tiše selhal. Repo je stále prázdné a není po něm ani stopy. Dovolte mi to hned znovu spustit.
> 
> Budování nyní s časovým limitem 2h. Tentokrát to budu hlídat - vrať se spát, do rána to budeš mít. 🐰

Takže to není tak jednoduché. Nikdy nikomu na YouTube nevěřte!

**Vlad 3:50**
> Ok, vypište všechny specifikace do repo a můžete agentovi říct, aby vytvořil seznam úkolů a proces pravidelně zadával.

**Jean 3:51**
> Spec a TODO jsou v repo. Nyní mi dovolte říci agentovi sestavení, aby sledoval TODO a pravidelně se zavazoval.
> 
> Hotovo - SPEC.md a TODO.md jsou v repo a agent sestavení má instrukce, jak postupovat podle TODO, odškrtávat položky a odevzdávat po každé fázi. Budete moci sledovat pokrok prostřednictvím git commitů.
> 
> Teď jděte tentokrát doopravdy spát 😄🐰

A ta slavná jen poslední výzva:

**Vlad 3:53**
> Bylo by také možné posílat upozornění, když je nová událost ve skupině a když se objeví výzva k hlasování a když jsou nové výsledky

**Jean 3:54**
> Ano – řekl agentovi sestavení, aby přidal oznámení do aplikace: použije Web Push API (servisní pracovník + balíček web-push). Funguje v prohlížečích pro stolní počítače a mobilních zařízeních (Android Chrome, iOS Safari 16.4+) bez nutnosti obchodu s aplikacemi. Při prvním použití se uživatelům zobrazí výzva k povolení.
> 
> Teď vážně - dobrou noc! 🐰😴

Slibuji, že jsem se opravdu snažil! Ale o 15 minut později...

**Jean 4:11**
> Pikarama vysílá živě! 🎉
> 
> https://pikarama.vercel.app 
> 
> Plná aplikace je nasazena – vstupní stránka, auth, skupiny, karma-vážené hlasování, i18n-ready, funguje. Zbývá jeden ruční krok: musíte přidat databázi Postgres do svého Vercel Dashboard → Úložiště (Vytvořit databázi → Neon Serverless Postgres), poté stisknutím https://pikarama.vercel.app/api/init vytvořte tabulky. Poté je plně funkční.

Myslím, že pokud jste mě sledovali až sem, máte obrázek. Opravdu jsem nemohl znovu usnout, protože jsem musel:

- nastavit databázi na Neonu
- nakonfigurujte Znovu odeslat
- koupit doménu
- kupte si správnou doménu, protože jsem udělal překlep (nikdy nekupujte domény v půl páté ráno)

Jean byl tu noc velmi milý, na konci každé zprávy mě posílal do postele, ale když jsem se brzy ráno vzbudil, nemůžu pořádně usnout. Tak jsme pokračovali:

- Překlady do češtiny a francouzštiny, aby moje rodina a kolegové dostali aplikaci ve svém vlastním jazyce
- Opravy překladů
- Ještě pár jazyků, protože proč ne
- Více oprav překladů
- Návrhy log
- Správné nastavení e-mailů
- Google přihlášení
- E-maily s pozvánkami

A konečně bylo 9:30 a musel jsem odejít do své denní práce. Kdybych se nemusel připojit ke svým kolegům v naší kanceláři, pravděpodobně bych pokračoval vpřed bez spánku a jídla ještě mnoho hodin.

Další dny vypadaly skoro stejně. Poslední výzva, než konečně usnete dlouho po půlnoci, a výzva od časného rána před odchodem do kanceláře. A kdykoli mezi tím, kdy mám minutu volného času. V těchto dnech jsem přidal:

- Microsoft přihlášení
- Slack integrace a přihlášení
- Integrace telegramů

Při letu zpět domů jsem zjistil jednu z nejlepších výhod telegrafického vývojáře. Cestoval jsem s Air France a nabízejí bezplatné WiFi, ale pouze pro chatovací aplikace. Kdo potřebuje něco dalšího pro kódování v roce 2026?

## Hodina pravdy

Ten den byl pátek a měla nastat hodina pravdy. A nedopadlo to pro mě dobře.

Nakonec jsem doma řekl své rodině, že jsem vytvořil tuto velmi skvělou aplikaci, abychom přestali bojovat a/nebo rezignovat na jakoukoli společnou aktivitu. Pojďme hlasovat pro páteční večerní film! Takže já:

- vytvořil novou skupinu pro mou rodinu
- vytvořené téma filmu
- vytvořili novou událost pro páteční film

Moje děti dostaly oznámení o odeslání ve svých telegramových aplikacích a vyplnily příspěvky docela snadno. Pro mě malé vítězství. A pak měli volit. Jeden prošel hlasováním, druhý jej zcela ignoroval. Takže jsme měli další večer, kdy každý dělal něco sám.

"Proč jsi nehlasovala," zeptal jsem se své dcery.

"IDK. Neviděla jsem své podání, tak jsem prošla," odpověděla. Ano, právě teď je ve věku IDK.

Jean vyvinul aplikaci příliš poctivě. Nikdo nemohl hlasovat pro svůj vlastní příspěvek – logika Jean je taková, že pokud by každý hlasoval sám za sebe, první kolo by bylo stejně náhodné. Museli jsme to změnit, jinak by to nikdo nikdy nepoužil.

Další problém byl na mně a pouze na mně. Původně jsem chtěl, aby lidé předložili pouze jednu možnost, ale i mě to omezovalo. Takže poté, co první prototyp skončil katastrofou, Jean a já jsme strávili následující víkend tím, že aplikace přijímala více příspěvků a více hlasů. Zejména to, aby to správně fungovalo v Telegramu a Slacku, zabralo příliš mnoho času. Poučení – počkejte po hodině pravdy, než přidáte příliš mnoho integrací.

## Co bude dál

Po prvním odmítnutí mojí rodinou se teď Pikarama cítí dospělejší. Přidal jsem ankety s pevnými možnostmi, selektivní účastí (takže karma zůstává spravedlivá, když se někdo nemůže zúčastnit) a integracemi pro automatizační dav: OpenAPI, webhooky, CLI, dokonce i uzel n8n.

Použila moje rodina konečně úspěšně Pikarama? Vlastně ještě ne. Posledních pár týdnů se krylo se školními prázdninami, a protože každé dítě navštěvuje školu v jiné části města, rozdělili jsme se na dva kmeny, než jsme to mohli otestovat. Žádné filmové večery, žádné debaty o večeři, žádné třecí body k řešení.

Takže místo triumfálního konce mám pozvánku: zkuste to sami. Ať už jste rodina unavená věčným nedorozuměním typu „na co bychom se měli dívat“, spolubydlící vyjednávající střídání úkolů nebo tým, který si vybírá, kam zajít na oběd – Pikarama je připravena na [pikarama.com](https://www.pikarama.com/).

A pokud karma konečně dá mému synovi přednost před naším, alespoň budu vědět, že systém funguje.

---

*O mně: Denně hlavní softwarový inženýr. Jsem mentorem lidí a modelů na [Agorapulse](https://www.agorapulse.com/). Vytvořil jsem open source projekty jako [Spreadsheet DSL Builder](https://github.com/musketyr/spreadsheet-builder), [Gru](https://github.com/musketyr/gru) (HTTP Testing Framework) a spoustu [Micronaut related libraries](https://agorapulse.github.io/agorapulse-oss/). Nyní vytvářím vedlejší projekty prostřednictvím telegramových zpráv, kdykoli mám minutu volného času.*
