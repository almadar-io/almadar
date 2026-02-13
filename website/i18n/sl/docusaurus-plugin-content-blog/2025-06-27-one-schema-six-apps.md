---
slug: one-schema-six-apps
title: "Ena shema, šest aplikacij: Kako smo zgradili igro, vladno orodje in sledilnik fitnesa z istim jezikom"
authors: [almadar]
tags: [case-study, architecture]
---

Taktična strateška igra. 3D dungeon crawler. Platforma za inteligenco odnosov. Vladow inšpekcijski sistem. Platforma za učenje z AI. Osebni sledilnik fitnesa.

Šest aplikacij. Šest popolnoma različnih domen. Een jezik.

Tukaj je razlaga — in zakaj je to pomembno.

<!-- truncate -->

## Trditev

Vsak programski jezik trdi, da je "general purpose." Ampak kdaj ste nazadnje uporabili isti framework za gradnjo igre *in* vladno compliance orodje?

Almadarjeva Orbital arhitektura je po zasnovi domen-agnostična. Orbital je: Entity + Traits + Pages. Ta formula deluje za katero koli domeno, ker modelira **vedênje**, ne **tehnologijo**.

Prehodimo vseh šest.

## 1. Trait Wars — Taktična strateška igra

**Domena:** Turn-based taktični boj
**Ključni izziv:** Kompleksen boj z vidnim AI, faze potez, kompozicija enot

Trait Wars je strategijska igra, navdihnjena z Heroes of Might and Magic, kjer enote opremijo **Traits** — vidne state machine, ki definirajo njihovo vedênje. Jederna inovacija: igralci lahko preberejo sovražnikove state machine in izkoristijo okna prehodov.

**Kako Orbitals modelirajo to:**

```
Match Orbital: upravlja stanje igre, poteze, pogoje zmage
Unit Orbital: obravnava premikanje, boj, smrt
Hero Orbital: posebne sposobnosti, kompozicija traitov
Terrain Orbital: efekti polj, fog of war
```

Vsako enotino vedênje je trait s stanji kot `Idle → Moving → Attacking → Defending`. Igralci vidijo ta stanja in načrtujejo okoli njih.

**Kaj to omogoča:** Turn-based phase controller je sam state machine:

```json
{
  "states": [
    { "name": "ObservationPhase", "isInitial": true },
    { "name": "SelectionPhase" },
    { "name": "MovementPhase" },
    { "name": "ActionPhase" },
    { "name": "ResolutionPhase" }
  ]
}
```

Pet stanj. Čisti prehodi. Ni skrite kompleksnosti game loopa.

## 2. Iram — 3D Action RPG

**Domena:** Dungeon-crawling ARPG
**Ključni izziv:** Real-time boj, proceduralni dungeon, kompozicija sposobnosti

Iram se dogaja znotraj Dyson Sphere z imenom Iram Dominion. Igralci se spuščajo skozi 5 dungeon con, premagujejo šefe in zbirajo **Orbital Shards** — fragmente vedênja, ki se komponirajo v nove sposobnosti.

**Kako Orbitals modelirajo to:**

```
Player Orbital: zdravje, inventar, opremljeni orbitali
Dungeon Orbital: generiranje sob, spawnanje sovražnikov, loot tables
Combat Orbital: škoda, projektili, area effects
Boss Orbital: phase-based boss srečanja
```

Igralec lahko hkrati opremi 8 Orbitalov (Defend, Mend, Disrupt, Fabricate, Pathfind, Transmute, Command, Archive). Vsak je samostojen state machine, ki se komponira z drugimi.

**Resonance sistem:** Združljivi Orbitali ustvarjajo sinergijske efekte:
- Defend + Mend → 1.5x shield healing
- Disrupt + Fabricate → Pasti uporabijo debuffe
- Archive + Command → Zavezniki prejmejo intel o slabostih sovražnikov

To ustvarja deckbuilding meta-igro na vrhu action boja.

## 3. Winning 11 — Inteligenca odnosov

**Domena:** Trust-based profesionalno mreženje
**Ključni izziv:** Dunbarjev number enforcement, psihološka združljivost, formiranje ekip

Winning 11 nadomešča pasivno LinkedIn-style mreženje z namernimi, visoko-vrednimi "vrtovi" zaupanih sodelavcev. Sistem vsili Dunbarjevo število (150 connection cap) in uporablja psihološke ocene za izračun trust scoreov.

**Kako Orbitals modelirajo to:**

```
User Orbital: profil, Jungian archetype assessment
Connection Orbital: trust scoring, kategorizacija, decay
Garden Orbital: vizualizacija odnosov, metrike zdravja
Team Orbital: AI-driven formiranje ekip (2-11 članov)
```

Psihološka ocena je multi-step trait s stanji za vsako fazo vprašanj. Trust scorei se posodabljajo kot entity fields preko effects, ko pride do interakcij.

**Guardi vsilijo socialne dinamike:**

```json
{
  "from": "Active",
  "to": "Active",
  "event": "ADD_CONNECTION",
  "guard": ["<", "@entity.connectionCount", 150]
}
```

Dobesedno ne morete dodati 151. povezave. Ni predloga — state machine nima prehoda.

## 4. Government Inspection System — Compliance Workflow

**Domena:** Strukturirane terenske inšpekcije za vladne regulatorje
**Ključni izziv:** 5-fazni workflow enforcement, zakonski zahtevki guardov, sledi revizij

Zgrajen za vladne inšpektorje, ta sistem jih vodi skozi Introduction → Content → Preparation → Record → Closing faze. Zakonske zahteve so vsiljene z guardi — ne morete napredovati brez izpolnitve obveznih polj.

**Kako Orbitals modelirajo to:**

```
Inspection Orbital: 5-fazni workflow, validacija polj, generiranje dokumentov
Inspector Orbital: avtentikacija, dodelitev, obremenitev
Company Orbital: entity, ki se inšpicira, zgodovina, compliance status
```

**Closing guard zagotavlja, da nič ni zamujeno:**

```json
{
  "from": "Record",
  "to": "Closing",
  "event": "CLOSE",
  "guard": ["and",
    ["not-empty", "@entity.legalBasis"],
    ["not-empty", "@entity.findings"],
    ["not-empty", "@entity.measures"],
    ["=", "@entity.inspectorSignature", true],
    ["=", "@entity.subjectSignature", true]
  ]
}
```

Vsak prehod stanja je samodejno zabeležen. Sled revizij ni funkcija — je posledica arhitekture.

## 5. KFlow — Platforma za učenje z AI

**Domena:** LLM-powered generacija knowledge graph
**Ključni izziv:** Rekurzivna ekspanzija konceptov, AI generacija lekcij, objava tečajev

KFlow transformira seed topic (kot "JavaScript") v strukturiran knowledge graph z medsebojno povezanimi koncepti, AI-generiranimi lekcijami in objavljivimi tečaji.

**Kako Orbitals modelirajo to:**

```
Graph Orbital: seed koncept, stopnje težavnosti, učne poti
Concept Orbital: hierarhične plasti, prerekviziti, nadaljevanja
Lesson Orbital: AI-generirana vsebina, flashcards, vaje
Course Orbital: kurirani subseti, objavljanje, dodelitev mentorja
```

**Cross-orbital dogodki poganjajo pipeline:**

```
Uporabnik vnese topic → Graph emitira TOPIC_CREATED →
  Concept posluša → razširi prerekvizite → emitira CONCEPT_EXPANDED →
    Lesson posluša → generira AI vsebino → emitira LESSON_CREATED →
      Course posluša → doda v kurikulum
```

Celoten pipeline je deklarativen. Ni orchestration kode. Ni job queue. Samo dogodki, ki tečejo skozi Orbital.

## 6. Fitness Tracker — Osebna trening platforma

**Domena:** Upravljanje trener-stranka s kreditnim sistemom
**Ključni izziv:** Kreditni sistem, sledenje vaj, AI analiza obrokov

Zgrajen za osebnega trenerja, ki upravlja več strank. Vključuje kreditni sistem rezervacij sej, sledenje dvigov, upravljanje obrokov in AI-powered nutricionistično analizo.

**Kako Orbitals modelirajo to:**

```
Trainee Orbital: profil, krediti, metrike napredka
Session Orbital: rezervacija, odbitek kreditov, odpoved
Workout Orbital: logiranje dvigov, ponovitve, uteži, trendi
Meal Orbital: dnevni vnos, AI analiza, feedback trenerja
Schedule Orbital: skupinske seje, YouTube video reference
```

**Potek kreditov kot guard:**

```json
{
  "from": "Available",
  "to": "Booked",
  "event": "BOOK_SESSION",
  "guard": ["and",
    [">", "@entity.remainingCredits", 0],
    ["<", "@now", "@entity.creditsExpireAt"]
  ],
  "effects": [
    ["set", "@entity.remainingCredits", ["-", "@entity.remainingCredits", 1]]
  ]
}
```

Ni mogoče rezervirati z nič krediti. Ni mogoče rezervirati s pretečenimi krediti. State machine ve.

## Vzorec

Šest aplikacij. Šest različnih domen. Isti vzorec:

| Koncept | Igra | Vlada | Socialno | Fitnes | Izobraževanje | RPG |
|---------|------|-----------|--------|---------|-----------|-----|
| **Entity** | Enota | Inšpekcija | Povezava | Seja | Koncept | Igralec |
| **States** | Idle→Attack→Dead | Intro→Content→Close | Pending→Active→Decayed | Available→Booked→Done | Seed→Expanded→Published | Exploring→Combat→Boss |
| **Guards** | HP > 0, in range | Polja izpolnjena, podpisano | < 150 povezav | Krediti > 0 | Prerekviziti izpolnjeni | Ima zahtevani orbital |
| **Effects** | Povzroči škodo, premakni | Shrani ugotovitve, log | Posodobi trust score | Odbij kredit | Generiraj lekcijo | Drop loot |
| **Events** | ATTACK, MOVE, DIE | PROCEED, CLOSE | CONNECT, DECAY | BOOK, CANCEL | EXPAND, PUBLISH | ENTER_ROOM, ATTACK |

Besedišče se spreminja. Struktura ne.

## Zakaj je to pomembno

### Za razvijalce

Almadar se naučite enkrat. Nato lahko gradite:
- Poslovna orodja
- Igre
- Vladowi sistemi
- Socialne platforme
- AI-powered produkti
- Health and fitness aplikacije

Ni nov framework na domeno. Ni nov state management library. Ni nova backend arhitektura. En jezik, en compiler, en mentalni model.

### Za podjetja

Ena ekipa lahko gradi več produktov. Arhitekt, ki je zasnoval inšpekcijski sistem, lahko zasnuje bojni sistem igre — vzorci so isti. Stanja, prehodi, guardi, effects.

### Za industrijo

Dejstvo, da ista arhitektura obravnava turn-based boj in vladno compliance, kaže, da smo našli nekaj temeljnega. Ni framework optimiziran za eno domeno, ampak **model vedênja**, ki deluje čez domene.

Ker je vedênje vedênje. Naj bo to igralna enota, ki se odloči za napad, inšpektor, ki zaključi fazo, ali fitnes trener, ki rezervira sejo — je vse:

1. Začni v stanju
2. Prejmi dogodek
3. Preveri guard
4. Izvedi effects
5. Premakni v naslednje stanje

To ni funkcija frameworka. Tako sistemi delujejo.

## Spoznanje

Vprašanje "kateri jezik naj uporabim?" je manj pomembno kot "kateri model vedênja uporabljam?"

React + Express. Django + PostgreSQL. Rails + Redis. To so tehnološke izbire. Ne spremenijo, kako modelirate vedênje — samo spremenijo, kje pišete iste vzorce.

Almadar je model vedênja, ki se naključno prevede v tehnologijo. Ena shema. Šest aplikacij. Ker je model pravilen.

Raziščite vse projekte in poskusite zgraditi svojega na [almadar.io](/docs/getting-started/introduction).
