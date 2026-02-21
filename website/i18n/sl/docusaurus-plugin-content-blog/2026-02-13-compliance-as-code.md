---
slug: compliance-as-code
title: "Compliance kot koda: Ko vaša arhitektura vsili zakon"
authors: [osamah]
tags: [enterprise, compliance, architecture]
---

Seznami opravil ne delujejo. Usposabljanje ne prime. Revizije najdejo probleme mesece potem, ko se zgodijo.

Kaj če bi vaša programska arhitektura naredila neskladnost nemogočo?

<!-- truncate -->

## Neuspeh seznama opravil

Vsaka regulirana industrija se zanaša na sezname opravil:

- Zdravstvo: "Ali ste preverili identiteto pacienta pred dajanjem zdravila?"
- Finance: "Ali ste dobili dve odobritvi za transakcije čez 10.000$?"
- Vlada: "Ali ste izpolnili vsa obvezna polja inšpekcije pred zaprtjem primera?"

Problem: seznami opravil so *predlogi*. So odvisni od ljudi, ki se spomnijo, marajo in imajo čas. Pod pritiskom se koraki preskočijo. V nujnih primerih se protokoli zaobidejo. Med časovno stisko postanejo bližnjice standardna praksa.

Rezultat: kršitve skladnosti odkrite mesece kasneje med revizijami, kar vodi v globe, tožbe in škodo.

## Arhitektura-prva alternativa

Kaj če programske opreme *ne bi mogla* preskočiti korakov?

Ne opozorilni dialog. Ne rdeč baner. Sam prehod ne obstaja, razen če so pogoji izpolnjeni.

V Almadarju tako deluje vsak workflow. Vladow inšpekcijski sistem, ki smo ga zgradili, demonstrira vzorec:

```json
{
  "name": "InspectionWorkflow",
  "entity": {
    "name": "Inspection",
    "fields": [
      { "name": "phase", "type": "enum", "values": ["introduction", "content", "preparation", "record", "closing"] },
      { "name": "legalBasis", "type": "string" },
      { "name": "findings", "type": "string" },
      { "name": "measures", "type": "string" },
      { "name": "inspectorSignature", "type": "boolean", "default": false },
      { "name": "subjectSignature", "type": "boolean", "default": false },
      { "name": "caseNumber", "type": "string" }
    ]
  }
}
```

### Prehodi faz z Guardi

Vsak prehod faze je zaščiten z zakonskimi zahtevami:

```json
{
  "from": "Introduction",
  "to": "Content",
  "event": "PROCEED",
  "guard": ["and",
    ["not-empty", "@entity.legalBasis"],
    ["not-empty", "@entity.caseNumber"]
  ],
  "effects": [
    ["set", "@entity.phase", "content"],
    ["log", "info", "Phase transition: Introduction → Content"]
  ]
}
```

Inšpektor *ne more* preiti v fazo Content brez vnosa pravne podlage in številke primera. Ni gumba "preskoči". Ni preglasitve. Prehod ne obstaja, dokler guard ne ovrednoti kot true.

### Closing Guard: Vse mora biti dokončano

```json
{
  "from": "Record",
  "to": "Closing",
  "event": "CLOSE_INSPECTION",
  "guard": ["and",
    ["not-empty", "@entity.legalBasis"],
    ["not-empty", "@entity.findings"],
    ["not-empty", "@entity.measures"],
    ["=", "@entity.inspectorSignature", true],
    ["=", "@entity.subjectSignature", true]
  ],
  "effects": [
    ["set", "@entity.phase", "closing"],
    ["persist", "update", "Inspection", "@entity"],
    ["emit", "INSPECTION_COMPLETED"]
  ]
}
```

Za zaprtje inšpekcije:
- Pravna podlaga mora biti izpolnjena
- Ugotovitve morajo biti dokumentirane
- Ukrepi morajo biti določeni
- Inšpektor mora biti podpisan
- Predmet mora biti podpisan

Zgrešite katero koli, sistem ostane v fazi Record. Ne z napako — gumb CLOSE preprosto ne preide. State machine *nima poti* do Closing brez vseh izpolnjenih pogojev.

## Zakaj je to drugače od validacije

Tradicionalna validacija:

```javascript
function closeInspection(inspection) {
  if (!inspection.legalBasis) {
    showError("Legal basis required");
    return; // Ampak kaj, če nekdo odstrani ta check?
  }
  if (!inspection.findings) {
    showError("Findings required");
    return; // In tega?
  }
  // ... morda še 20 preverjanj
  // Kaj, če nov razvijalec ne doda checka za novo polje?

  inspection.phase = "closing";
  save(inspection);
}
```

Problemi:
1. **Validacija se lahko zaobide** — neposreden API klic preskoči frontend validacijo
2. **Validacija lahko ne bo popolna** — novo obvezno polje je dodano, ampak check ni
3. **Validacija živi v kodi** — revizorji je ne morejo preveriti brez branja JavaScripta
4. **Validacija je raztresena** — frontend, backend, baza imajo vsak svojo različico

Almadar guardi:
1. **Se ne morejo zaobiti** — state machine je edina pot. Ni API zadnjih vrat.
2. **Ne morejo biti nepopolni** — compiler opozori na nezaščitene prehode
3. **Živijo v schemi** — revizorji berejo JSON, ne kode
4. **So edini vir resnice** — en guard, vsiljen povsod

## Problem sledi revizij (rešen)

Regulirane industrije potrebujejo sledi revizij. Tradicionalni pristop: log stavki raztreseni po kodi, upajmo, da pokrivajo vsako akcijo.

V Almadarju je vsak prehod stanja sam po sebi zabeležen:

```
[2025-05-30T10:15:32Z] Inspection INS-2025-0847
  Transition: Introduction → Content
  Event: PROCEED
  User: inspector-042
  Guard: passed (legalBasis=filled, caseNumber=INS-2025-0847)
  Effects: [set phase, log]
```

Sled revizij ni funkcija, ki jo dodate. Je posledica arhitekture. Vsak prehod, ki se sproži, ima `from` stanje, `to` stanje, dogodek, uporabnika, timestamp in rezultat guarda.

## Aplikacije iz resničnega sveta

### Zdravstvo: Dajanje zdravil

```json
{
  "from": "Prepared",
  "to": "Administered",
  "event": "ADMINISTER",
  "guard": ["and",
    ["=", "@entity.patientVerified", true],
    ["=", "@entity.medicationVerified", true],
    ["=", "@entity.dosageVerified", true],
    ["=", "@entity.allergyCheckPassed", true],
    ["not", "@entity.expired"]
  ]
}
```

Pet preverjanj. Vseh obveznih. Medicinska sestra ne more dati zdravila brez prehoda vseh.

### Finance: Odobritev transakcije

```json
{
  "from": "PendingApproval",
  "to": "Approved",
  "event": "APPROVE",
  "guard": ["and",
    ["!=", "@payload.approverId", "@entity.requesterId"],
    [">=", "@user.approvalLimit", "@entity.amount"],
    ["if",
      [">", "@entity.amount", 50000],
      [">=", "@entity.approvalCount", 2],
      true
    ]
  ]
}
```

- Requester ne more odobriti svoje transakcije
- Odobritelj mora imeti zadosten limit odobritve
- Transakcije čez 50k zahtevajo dve odobritvi

### Proizvodnja: Nadzor kakovosti

```json
{
  "from": "Testing",
  "to": "Released",
  "event": "RELEASE",
  "guard": ["and",
    [">=", "@entity.testsPassed", "@entity.testsRequired"],
    ["=", "@entity.defectsFound", 0],
    ["not-empty", "@entity.qualitySignoff"]
  ]
}
```

Noben izdelek ne gre v prodajo brez prehoda vseh testov, nič napak in podpisa kakovosti.

## Schema kot specifikacija

Tukaj je prava moč: **schema JE regulativna specifikacija**.

Ko revizor vpraša "kako zagotavljate, da inšpekcij ni mogoče zapreti brez vseh polj?", ne kažete na kodo. Pokažete jim shemo:

```json
{
  "from": "Record",
  "to": "Closing",
  "event": "CLOSE_INSPECTION",
  "guard": ["and",
    ["not-empty", "@entity.legalBasis"],
    ["not-empty", "@entity.findings"],
    ["=", "@entity.inspectorSignature", true]
  ]
}
```

Netehnični revizor lahko to prebere. Pravi: za prehod iz Record v Closing mora biti pravna podlaga izpolnjena, ugotovitve morajo biti izpolnjene in inšpektor mora biti podpisan.

Specifikacija in implementacija sta isti artifact. Nikoli se ne moreta razhajati.

## Spoznanje

Compliance ni funkcija, ki jo prišrafate. Je arhitektura.

State machine guardi naredijo neskladnost nemogočo — ne odsvetovano, ne opozorjeno, *nemogoča*. State machine nima prehoda v naslednjo fazo brez zahtevanih pogojev.

Za regulirane industrije to pomeni:
- **Nič preskočenih korakov** — guardi vsilijo vsako zahtevo
- **Vgrajene sledi revizij** — vsak prehod je sam po sebi zabeležen
- **Berljive specifikacije** — revizorji pregledujejo JSON, ne kode
- **Ni razhajanja** — shema je specifikacija in implementacija

Vprašanje ni "kako naredimo ljudi, da sledijo seznamu opravil?" Ampak "kako naredimo seznam opravil nepotreben?"

Več o [guard clauses](/blog/guard-clauses-state-machines) in [closed circuit pattern](/blog/closed-circuit-pattern).
