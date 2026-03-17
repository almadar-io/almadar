---
slug: why-state-machines-for-business
title: "Zakaj bi moral biti vaš naslednji app State Machine"
authors: [osamah]
tags: [business, architecture]
---

Vaša razvojna ekipa hitro dostavlja funkcije. Ampak napake se vračajo. Deploymenti se pokvarijo ob petkih. Kodebase raste, strah pred dotikanjem pa tudi.

Problem ni vaša ekipa. Je arhitektura.

<!-- truncate -->

## Skriti stroški "Move Fast and Break Things"

Programska industrija porabi ocenjenih **2,41 bilijona dolarjev letno** za popravljanje slabe kode (CISQ 2022). Ne za gradnjo novih funkcij. Za *popravljanje tega, kar že obstaja*.

Večina teh stroškov izhaja iz ene same koreninske vzroke: **nepredvidljivo stanje**.

```
Uporabnik klikne "Pošlji" →
  Je forma veljavna? (odvisno od 12 zastavic boolean)
  Je uporabnik avtenticiran? (preveri globalno spremenljivko)
  Je omrežje na voljo? (upaj na najboljše)
  Je bilo to že poslano? (dodaj še eno zastavico)
```

Vsaka zastavica boolean podvoji število možnih stanj. S 10 zastavicami ima vaša aplikacija **1,024 možnih stanj**, od katerih jih večina ni testiranih.

## Kaj če bi vaša aplikacija lahko bila samo v stanjih, ki ste jih definirali?

To je tisto, kar vam daje state machine.

Namesto raztresenih zastavic in implicitnega stanja deklarirate točno, kaj je mogoče:

```json
{
  "states": [
    { "name": "Draft", "isInitial": true },
    { "name": "Submitted" },
    { "name": "UnderReview" },
    { "name": "Approved" },
    { "name": "Rejected" }
  ]
}
```

Pet stanj. Ne 1,024. Vsak prehod med njimi je ekspliciten:

```json
{
  "from": "Draft",
  "to": "Submitted",
  "event": "SUBMIT",
  "guard": ["and",
    ["not-empty", "@entity.title"],
    ["not-empty", "@entity.description"]
  ]
}
```

Guard pravi: ne morete poslati brez naslova in opisa. To ni validacijska knjižnica, ki jo morda pozabite poklicati. Je **arhitektura, ki vsili pravilo**.

## Poslovni primer

### 1. Napake postanejo arhitekturno nemogoče

V tradicionalni aplikaciji preprečujete napake s testi. Testi pokrivajo primere, ki ste jih *mislili*. State machines preprečujejo napake, tako da naredijo neveljavna stanja *nepredstavljiva*.

Modal, ki se ne more zapreti? Almadar compiler ga zavrne:

```
Error: CIRCUIT_NO_OVERLAY_EXIT
  State 'EditModal' renderira v slot 'modal' ampak nima izhodnega prehoda.
  Uporabniki se bodo zataknili v ta overlay.
```

Ta napaka se sproži ob *compile time*. Pred deploymentom. Pred QA. Pred uporabniki.

### 2. Hitrost razvoja se poveča

Z Almadarjem se popolna aplikacija — frontend, backend, baza, API — prevede iz ene same datoteke sheme:

```bash
orbital compile invoice-app.orb --shell typescript -o app/
```

Tipična CRUD aplikacija, ki tradicionalno traja 2-4 tedne za izgradnjo, traja **dneve** s schema-first pristopom. Generirana koda obdeluje routing, state management, API endpointe in modele baze.

### 3. Skladnost postane samodejna

Za regulirane industrije je shema *specifikacija*:

```json
{
  "from": "InProgress",
  "to": "Completed",
  "event": "COMPLETE",
  "guard": ["and",
    ["=", "@entity.allFieldsFilled", true],
    [">=", "@entity.inspectorSignatures", 2]
  ]
}
```

Inšpektor ne more zaključiti poročila brez vseh izpolnjenih polj in dveh podpisov. To ni predlog v usposabljanju. Je vsiljeno s strani sistema.

Revizorji ne potrebujejo pregledovati kode. Pregledujejo shemo — berljiv JSON dokument, ki *je* sistem.

### 4. Onboarding traja ure, ne tedne

Novi razvijalci ne potrebujejo razumevanja tisočerih vrstic React, Express in Redux. Preberejo shemo:

- **Entities** jim povejo, kateri podatki obstajajo
- **States** jim povejo, kaj aplikacija lahko počne
- **Transitions** jim povejo, kako se premika med stanji
- **Guards** jim povejo poslovna pravila
- **Effects** jim povejo, kaj se zgodi ob vsakem prehodu

Shema je dokumentacija. Vedno je točna, ker *je* tekoči sistem.

## Pravi primer: Vladow inšpekcijski sistem

Zgradili smo terenski inšpekcijski sistem za vladno uporabo. Tradicionalni pristop: 6 mesecev, 5 razvijalcev, kompleksno upravljanje workflowov.

Z Almadarjem:

- **5 inšpekcijskih faz** modeliranih kot stanja (Introduction, Content, Preparation, Record, Closing)
- **Pravne zahteve** kodirane kot guards (ne morete zapreti brez vseh obveznih polj)
- **Audit trail** vgrajen v state machine (vsak prehod je zabeležen)
- **Generiranje dokumentov** sproženo kot effects na Closing prehodu

Shema ima 400 vrstic. Generira popolno web aplikacijo z backend API, modeli baze in UI za inšpektorje.

## Kdaj State Machines niso primerni

State machines niso za vse:

- **Čisti content site** (blogi, landing page) — ni kompleksnega stanja
- **Enkratni skripti** — ni vredno strukture
- **Visoko eksperimentalni prototipi** — včasih morate najprej ugotoviti, kaj gradite

Ampak za **katero koli aplikacijo z workflowi, formami, odobritvami, večkoraki procesi ali uporabniškimi vlogami** — kar je večina poslovne programske opreme — state machines eliminirajo cele kategorije napak.

## Spoznanje

Vprašanje ni, ali se state machines splača naučiti. Je, ali si lahko privoščite napake, ki jih boste poslali brez njih.

Almadar naredi state machines praktične za poslovne aplikacije:
- Ena datoteka sheme → full-stack aplikacija
- Preprečevanje napak ob compile time → manj produkcijskih incidentov
- Berljive sheme → hitrejše revizije in onboarding
- Guards in transitions → compliance kot koda

Vaši uporabniki ne bodo vedeli, da uporabljajo state machine. Samo opazili bodo, da stvari delujejo.

Pripravljeni poskusiti? Preverite [Getting Started vodnik](https://orb.almadar.io/docs/getting-started/introduction).
