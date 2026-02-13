---
slug: welcome-to-almadar
title: Dobrodošli v Almadarju
authors: [almadar]
tags: [announcement]
---

Z veseljem predstavljamo **Almadar** - Fiziko programske opreme.

Almadar je deklarativni ogrodje za gradnjo celovitih aplikacij prek state machines. Definirajte svoje entities, vedênja in UI kot sheme, ki se prevedejo v produkcijsko pripravljeno kodo.

<!-- truncate -->

## Kaj je Almadar?

Almadar (arabsko za "orbita") prinaša nov paradigem v razvoj programske opreme:

- **Deklarativne sheme**: Definirajte celotno strukturo svoje aplikacije na enem mestu
- **State machines**: Modelirajte vedênje kot predvidljive, testabilne state machines
- **Celovita generacija**: Prevedite v React frontend, Express/FastAPI backend in modele podatkovne baze

## Almadar model

Tako kot elektroni krožijo okoli jeder po kvantnih pravilih, vaše komponente aplikacije sledijo pravilom state machines. Vsak **Orbital** je entity s priloženimi **traits**, ki definirajo njegovo vedênje, UI in integracije.

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

## Začetek

Pripravljeni preizkusiti Almadar? Oglejte si našo [dokumentacijo](/docs), da začnete, ali [prenesite CLI](/docs/downloads/cli), da ustvarite svoj prvi projekt.

Ostanite z nami za več posodobitev, vaj in poglobljenih vpogledov v Almadar arhitekturo!
