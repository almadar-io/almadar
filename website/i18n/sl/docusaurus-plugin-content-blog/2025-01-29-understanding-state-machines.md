---
slug: understanding-state-machines
title: Razumevanje state machines v Almadarju
authors: [osamah]
tags: [architecture, tutorial]
---

State machines so srce Almadarja. V tem prispevku raziskujemo, zakaj smo izbrali state machines kot temelj za vedênje aplikacije.

<!-- truncate -->

## Zakaj state machines?

Tradicionalne spletne aplikacije pogosto trpijo zaradi nepredvidljivega vedênja. Gumb lahko naredi različne stvari, odvisno od skritega stanja, dirkalnih pogojev ali implicitnih predpostavk, zakopanih v kodi.

State machines to rešijo z **vsako možno stanje izrecnim** in **vsakim prehodom namernim**.

## Anatomija Almadar state machine

Vsak trait v Almadarju vsebuje state machine:

```json
{
  "name": "Toggleable",
  "stateMachine": {
    "states": [
      { "name": "off", "isInitial": true },
      { "name": "on" }
    ],
    "transitions": [
      {
        "from": "off",
        "event": "TOGGLE",
        "to": "on",
        "effects": [
          ["render-ui", "main", { "type": "toggle", "active": true }]
        ]
      },
      {
        "from": "on",
        "event": "TOGGLE",
        "to": "off",
        "effects": [
          ["render-ui", "main", { "type": "toggle", "active": false }]
        ]
      }
    ]
  }
}
```

## Ključni koncepti

### States
States predstavljajo možna stanja vašega entity. Vsako stanje je izrecno in poimenovano.

### Events
Events sprožijo prehode. Lahko prihajajo iz uporabniških akcij, sistemskih dogodkov ali drugih orbitalov.

### Transitions
Transitions definirajo, kako se vaš entity premika iz enega stanja v drugo. Vsak transition lahko ima:
- **Guards**: Pogoji, ki morajo biti izpolnjeni
- **Effects**: Ukazi za izvedbo (posodobi polja, render UI, emit events)

### Effects
Effects so stranski učinki prehoda. Almadar podpira:
- `set` - Posodobi polje entity
- `increment` / `decrement` - Spremeni številke
- `render-ui` - Render UI pattern
- `emit` - Objavi events drugim orbitalom
- `persist` - Shrani v bazo
- `navigate` - Spremeni poti

## Prednosti

1. **Predvidljivost**: Vedno veste, v kakšnem stanju je vaša aplikacija
2. **Testabilnost**: Testirajte vsak transition neodvisno
3. **Varnost**: Guards preprečujejo nepooblaščene spremembe stanja
4. **Debugiranje**: Zgodovina stanj naredi napake reproducibilne

## Naslednji koraki

Pripravljeni graditi s state machines? Oglejte si naš [vodnik za začetek](/docs/getting-started/introduction).
