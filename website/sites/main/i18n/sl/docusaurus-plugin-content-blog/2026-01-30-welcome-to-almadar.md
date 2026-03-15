---
slug: welcome-to-almadar
title: Dobrodošli v Almadar
authors: [almadar]
tags: [announcement]
---

Z veseljem predstavljamo **Almadar** — Fiziko programske opreme.

Almadar je deklarativni framework za gradnjo full-stack aplikacij preko state machines. Definirajte svoje entities, vedênja in UI kot sheme, ki se prevedejo v production-ready kodo.

<!-- truncate -->

## Kaj je Almadar?

Almadar (arabsko za "Orbit") prinaša novo paradigmo v razvoj programske opreme:

- **Deklarativne sheme**: Definirajte celotno strukturo aplikacije na enem mestu
- **State machines**: Modelirajte vedênje kot predvidljive, testabilne state machines
- **Full-stack generacija**: Prevedite v React frontend, Express/FastAPI backend in modele baze

## Almadar model

Kot elektroni orbitirajo okoli jeder po kvantnih pravilih, vaše komponente aplikacije sledijo pravilom state machine. Vsak **Orbital** je entity s priloženimi **traits**, ki definirajo njegovo vedênje, UI in integracije.

```json
{
  "orbitals": [{
    "name": "TaskManager",
    "entity": {
      "name": "Task",
      "fields": [
        { "name": "title", "type": "string" },
        { "name": "status", "type": "enum", "values": ["todo", "done"] }
      ]
    },
    "traits": [
      { "ref": "Listable" },
      { "ref": "Editable" }
    ]
  }]
}
```

## Kako začeti

Pripravljeni poskusiti Almadar? Preverite našo [dokumentacijo](https://orb.almadar.io/docs) za začetek, ali [prenesite CLI](https://orb.almadar.io/docs/downloads/cli) za ustvarjanje vašega prvega projekta.

Ostanite z nami za več posodobitev, tutorialov in globinskih raziskav Almadar arhitekture!
