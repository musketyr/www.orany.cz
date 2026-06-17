---
title: "Osobní agenti učinili můj AFOL server zbytečným"
date: 2026-06-02
tags: ["ai", "agents", "product"]
source: substack
originalUrl: "https://telegraphic.substack.com/p/personal-agents-made-my-afol-server"
originalTitle: "Personal Agents Made My AFOL Server Obsolete"
---
*Proč byste měli svou aplikaci vystavit osobním agentům místo toho, abyste v ní drželi AI*

## Nechat Clauda uspořádat moji sbírku LEGO

![](https://substackcdn.com/image/fetch/$s_!c_bP!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F23835aec-4bb0-4824-a1a2-3293f776775e_1376x768.jpeg)

Loni na podzim mě ohromila síla serverů Model Context Protocol. MCP byl v té době stále novou funkcí Claude, ale překvapivě rychle se stal standardem. Zatímco jiní lidé přemýšleli o propojení systémů prodeje vstupenek a interních řídicích panelů, měl jsem důležitější případ podnikového použití: moje sbírka LEGO byla nepořádek.

Před pár lety jsem začal sbírat LEGO nejen pro zábavu, ale také jako malou investici. Některé sady opravdu zdraží, pokud je necháte nějakou dobu zapečetěné. Problém byl v tom, že jsem rychle ztratil přehled o tom, co už jsem koupil. Mým zdrojem pravdy byla tabulka Google se stanovenými čísly, nákupními cenami a stavem. Žádné obrázky. Žádné tituly. Žádná aktuální hodnota. Jen čísla, která na mě zírají jako hodně barevná daňová kontrola.

Takže jsem udělal to, co dělá každý rozumný dospělý fanoušek LEGO, když čelí problému s tabulkou. Postavil jsem server.

Ne malý scénář. Ne víkendová utilita. Pořádný server.

Právě jsem dočetl Spring AI v akci. Hodně jsem pracoval s Claude Code. Znal jsem Java, Spring, Terraform, AWS, kontejnery, vyvažování zátěže, pozorovatelnost, správné propojení sítí a všechny dospělé inženýrské návyky, které jste získali po letech, kdy jste to dělali pro peníze. Claude tento profesionální přístup okamžitě pochopil a pomohl mi vybudovat přesně takový systém, jaký bych si vybudoval v práci.

To byla první chyba.

Projekt se stal [Brick Directory](https://brick.directory/). Připojil se k BrickLink, BrickOwl, Brickset, Rebrickable, BrickEconomy a několika dalším zdrojům AFOL. Měl MCP server. Mělo to webový frontend. Měl interní chat. Mělo přihlášení. Měl databázi. Mělo to vektorové vyhledávání. Měl všechny obvyklé kousky, které přidáte, když jste technicky zdatní a emocionálně bez dozoru.

A fungovalo to.

Mohl bych otevřít Claude, připojit server MCP a říct něco jako: „Najděte moji tabulku Google s názvem LEGO collection a synchronizujte ji s Rebrickable.“ Claude si přečetl list, vyřešil nastavená čísla, mluvil s AFOL API a najednou se moje sbírka objevila v Rebrickable se skutečnými jmény a hodnotami. Připadalo mi to jako kouzlo.

Pak mi AWS poslal účet.

Nejprve to byly stovky dolarů. Já a Claude jsme se podívali na architekturu a Claude velmi zdvořile připustil, že nastavení bylo možná trochu překonstruované pro vedlejší projekt. Odstranili jsme některé díly a snížili náklady, ale postupem času jsem stále utratil téměř tisíc dolarů. Více než velmi slušná LEGO sada. Alespoň sada LEGO má minifigurky.

Opravdu toho nelituji. Byla to praktická laboratoř. Hodně jsem se naučil. Ale také to bolestně objasnilo jednu věc: vytvořil jsem celý produkt, který agentům poskytuje přístup k datům, ke kterým by agenti mohli přistupovat přímo, kdybych integraci zabalil jinak.

## Interní problém s chatem

Brick Directory má interní chat, ale to nikdy nebyl hlavní plán. Hlavním rysem byl vždy MCP server: Claude nebo jiný externí agent by měl mít možnost se připojit k Brick Directory a používat jej jako nástroj. Chat byl spíše hřištěm pro lidi, kteří zatím nevyužívají ChatGPT, Claude nebo osobního agenta. Způsob, jak vyzkoušet data z aplikace, aniž byste museli cokoliv nastavovat.

Chat zná aplikaci. Zná databázi. Může odpovídat na otázky týkající se sad, dílů, minifigurek, barev, inventáře a cen. Na papíře to zní skvěle.

Ale když jsem se podíval na skutečný vzor použití, příběh byl docela jasný. Proběhly stovky chatovacích relací s celkovým počtem méně než tisíce zpráv. Téměř všechna setkání byla malinká. Nedávné tituly vypadaly jako „LEGO Detaily sady pro více čísel“, „Sady a minifigurky Star Wars“, „Hledání drahých sad LEGO“ nebo „LEGO sady vhodné pro 10leté děti“.

To je užitečné. Ale není to vztah.

Je to vyhledávací pole.

A tady mě interní agenti většinou zklamou. Vědí toho o aplikaci hodně, ale žijí uvnitř zdí aplikace. Často nemohou procházet web. Nevědí, co jsem včera dělal. Nevědí, že můj syn má rád Minecraft, že preferuji stručné odpovědi, že pro vývoj používám Claude Code nebo OpenClaw, nebo že mám špatný zvyk přehnaně inženýrovat vedlejší projekty, když jsou poblíž Java a AWS.

Nemohou také snadno klást doplňující otázky a pamatovat si odpovědi pro příště způsobem, který mě sleduje napříč nástroji. Každý produkt chce mít nyní „AI chat“, ale většina z těchto chatů jsou jen zdvořilí vězni. Sedí na jedné kartě, s jednou databází, pálí tokeny vlastníka produktu a čekají, až uživatel položí správnou otázku.

Uživatelé již tímto způsobem nejsou školeni.

Jsou zvyklí na ChatGPT, Claude, OpenClaw, Hermes a podobné osobní agenty. Pokud agent něco neví, může hledat. Pokud potřebuje kontext, může se zeptat. Pokud odpověď závisí na souboru, kartě prohlížeče, úložišti, kalendáři nebo předchozí konverzaci, dobří osobní agenti ji často dosáhnou. A pokud toho nemohou dosáhnout dnes, mohou se obvykle naučit chybějící preferenci a zapamatovat si ji zítra.

To je mnohem lepší výchozí bod.

Osobní agent mě už zná. Chybí mu pouze vaše aplikace.

Proč tedy vynakládáme tolik úsilí na budování menších, osamělejších agentů v každé aplikaci?

## Otevření aplikace je obvykle lepší než uvěznění agenta

Existují dva způsoby, jak přidat AI k produktu.

První způsob je ten módní: vybudovat interního agenta. Přidejte panel chatu. Připojte jej k vaší databázi. Zaplaťte za modelové hovory. Doufám, že uživatelé kladou dobré otázky. Přidejte mantinely. Přidejte výzvy. Přidejte další výzvu, protože první výzva zapomněla, kdo to byl. Přidejte tlačítko, které říká „Zeptejte se AI“, protože to dělají všichni ostatní.

Druhý způsob je méně okouzlující, ale mnohem výkonnější: vystavte svůj produkt agentům, kterým uživatelé již důvěřují.

Může to být server MCP. Může to být CLI. Může to být API s dobrými dokumenty OpenAPI. Může to být publikovaný skill. Na tvaru záleží méně než na směru. Místo toho, abyste řekli „pojď do mé aplikace a promluv si s mým zajatým asistentem“, řekneš „přiveď svého asistenta sem; dám mu bezpečné nástroje“.

To mění i ekonomiku.

Díky internímu chatu spálíte své tokeny pokaždé, když se někdo zeptá, zda se sada 75192 vyplatí koupit. Pokud se tato funkce stane populární, gratulujeme, váš úspěch je nyní nákladovým střediskem. Pokud ji začnete omezovat, funkce se zhorší přesně ve chvíli, kdy ji lidé začnou používat.

S přístupem externího agenta uživatel obvykle přinese modelový účet. Claude, ChatGPT, OpenClaw, Hermes, Codex, cokoliv používají. Vaším úkolem není provozovat malé AI kasino uvnitř vašeho SaaS. Vaším úkolem je odhalit možnosti způsobem, který může agent uživatele bezpečně používat.

To je zdravější hranice.

Respektuje také to, jak lidé skutečně pracují. Nechci jednoho agenta v Brick Directory, dalšího v GitHub, dalšího v mé aplikaci pro poznámky, dalšího v mé bance, dalšího v mém obchodě s potravinami a dalšího v mém domácím automatizačním systému. To není budoucnost. To je Clippy s mikroslužbami.

Chci jednoho osobního agenta, který může v případě potřeby zavolat ty správné nástroje.

## Od drahého serveru po bezplatné skills

Legrační na tom je, že užitečné jádro Brick Directory, část, kterou jsem původně chtěl ze serveru MCP, lze nyní reprodukovat, aniž byste vůbec spouštěli Brick Directory.

Místo toho jsem vygeneroval AFOL skills.

Existuje skill pro Rebrickable. Jeden pro Brickset. Jeden pro BrickOwl. BrickLink a BrickEconomy mohou sledovat stejný vzor. K dispozici je také AFOL router skill, který agentovi pomáhá rozhodnout, který zdroj použít. Úložiště obsahuje reference OpenAPI, malé CLI, příklady pouze pro čtení, kontroly pověření a bezpečnostní pravidla pro mutace, jako jsou aktualizace inventáře nebo kolekce.

To není tak vizuálně působivé jako hostovaná aplikace s panelem chatu. Neexistuje žádný řídicí panel pro snímek obrazovky. Žádný efektní vnitřní asistent mávající z rohu.

Pro agenty je to ale mnohem užitečnější.

Můj osobní agent může načíst AFOL skill, zkontrolovat, jaké přihlašovací údaje jsou k dispozici, zavolat správnému CLI a zkombinovat výsledek se vším, co už zná. Může mi to pomoci porovnat sadu LEGO se zájmy mého syna. Může hledat na webu chybějící kontext. Může číst moji tabulku. Může aktualizovat návrh článku o celé věci. Může se zeptat, zda chci zmutovat svou sbírku, než udělám něco nebezpečného.

A nemusím udržovat architekturu AWS naživu, jen aby agent mohl vyhledat nastavené číslo.

To je část, kterou si přeji, aby pochopilo více tvůrců SaaS. Integrace AI nemusí vždy znamenat vytvoření funkce AI uvnitř vašeho produktu. Někdy to znamená, že váš produkt bude čitelný pro agenty, kteří již existují.

Interní chat Brick Directory má kontext aplikace, ale postrádá můj kontext. Můj osobní agent má můj kontext, ale postrádá data Brick Directory. Druhý problém je mnohem jednodušší vyřešit.

Dejte osobnímu agentovi nástroj.

## Interní agenti nejsou zbyteční

Abychom byli spravedliví, interní agenti nejsou zbyteční. Jsou místa, kde mají smysl.

Pokud je uživatel anonymní, nemá žádného agenta a potřebuje pouze rychlou odpověď uvnitř vašeho produktu, může vám pomoci interní chat. Pokud úkol závisí na stavu soukromé aplikace, který nemůžete bezpečně vystavit, může být vestavěný asistent tím správným rozhraním. Pokud potřebujete přísně kontrolovaný pracovní postup, můžete riziko snížit ponecháním agenta uvnitř produktu.

Tam už bych ale defaultně nezačínal.

Interní agenti by měli být záložním UI, nikoli hlavní integrační strategií.

Hlavní strategií by mělo být: zpřístupnit aplikaci externím agentům bezpečným, nudným a dobře zdokumentovaným způsobem. Nuda je tu dobrá. Nudný znamená CLI. nástroje MCP. schémata OpenAPI. Operace pouze pro čtení ve výchozím nastavení. Výslovné potvrzení pro zápisy. Malé skládací kousky.

To není méně ambiciózní. Je ambicióznější, protože akceptuje, že váš produkt není středem uživatelského vesmíru.

Zástupcem uživatele je.

## Aplikace by se měla stát nástrojem

Největší mentální posun je pro mě toto: v době agentů není vaše aplikace vždy cílem. Někdy je to jen nástroj.

To zní urážlivě, pokud jste roky přemýšleli o produktech, relacích, zapojení, řídicích panelech a udržení. Ale je to také osvobozující. Ne každá užitečná věc se musí stát místem, kam uživatelé chodí a zůstávají. Některé užitečné věci by se měly stát funkcemi, které mohou uživatelé volat odkudkoli, kde se již nacházejí.

Brick Directory mě to naučil drahým způsobem. Postavil jsem plnou aplikaci, zaplatil cloudový účet, přidal interní chat a až později jsem si uvědomil, že nejcennější částí je rozhraní mezi agenty a daty AFOL.

Nyní může stejná myšlenka žít jako skills. Pro mě běží zdarma. Snadno se instaluje. Je užitečná z OpenClaw, Hermes, Claude, ChatGPT nebo jakéhokoli osobního agenta, který vyhraje další kolo této velmi rychle se pohybující hry.

Interní chat zná Brick Directory.

Můj osobní agent mě zná.

Vím, kterou stranu chci prodloužit.

* * *
