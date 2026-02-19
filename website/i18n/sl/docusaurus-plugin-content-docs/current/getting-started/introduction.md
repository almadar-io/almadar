---
id: introduction
title: Uvod v Almadar
sidebar_label: Uvod
---

# Uvod v Almadar

> **Fizika programske opreme**: Naravni jezik → Shema → Produkcijska aplikacija

## Kaj je Almadar?

Almadar (المدار) je **deklarativni programski jezik** za gradnjo celovitih aplikacij. Namesto da pišete imperativno kodo, razpršeno med frontend in backend, deklarirate svojo aplikacijo kot shemo:

- **Entities** - Vaše podatkovne strukture s pravili za vztrajnost
- **Traits** - Vedênje, definirano kot state machines
- **Pages** - Poti z UI bindings

Almadar compiler pretvori to shemo v popolno, produkcijsko pripravljeno aplikacijo.

## Problem, ki ga Almadar rešuje

### Tradicionalni razvoj

```
Frontend ekipa          Backend ekipa          Database ekipa
     |                      |                      |
     v                      v                      v
  React koda    +     Express API    +      Shema/SQL
     |                      |                      |
     v                      v                      v
 Dovoljenja    +    Dovoljenja     +    Omejitve
     |                      |                      |
     v                      v                      v
  Testiranje   +     Testiranje     +     Testiranje
```

**Težave:**
- Poslovna logika podvojena med plastmi
- Dovoljenja razpršena v middleware, routah in poizvedbah
- Dokumentacija ločena od kode
- Testiranje zahteva več pristopov

### Almadar razvoj

```
Almadar shema (.orb datoteka)
        |
        v
   almadar compile
        |
        v
Celovita aplikacija
  - React Frontend
  - Express Backend  
  - Modeli podatkovne baze
  - Dovoljenja
  - Dokumentacija
```

**Prednosti:**
- En sam vir resnice
- Dovoljenja v guards (enem mestu)
- Shema JE dokumentacija
- State machines so po naravi testabilni

## Ključni koncepti

### 1. Entities

Entities definirajo, kaj vaša aplikacija upravlja:

```json
{
  "name": "Task",
  "persistence": "persistent",
  "fields": [
    { "name": "title", "type": "string", "required": true },
    { "name": "status", "type": "enum", "values": ["pending", "in_progress", "done"] },
    { "name": "assignee", "type": "relation", "target": "User" },
    { "name": "dueDate", "type": "date" }
  ]
}
```

**Vrste vztrajnosti (Persistence):**
- `persistent` - Shranjeno v podatkovni bazi
- `runtime` - V pomnilniku (sejno specifično)
- `singleton` - Ena globalna instanca

### 2. Traits

Traits definirajo, kako se vaša aplikacija obnaša z uporabo state machines:

```json
{
  "name": "TaskLifecycle",
  "linkedEntity": "Task",
  "category": "interaction",
  "stateMachine": {
    "states": [
      { "name": "Pending", "isInitial": true },
      { "name": "InProgress" },
      { "name": "Done", "isTerminal": true }
    ],
    "events": [
      { "key": "INIT", "name": "Inicializacija" },
      { "key": "START", "name": "Začni delo" },
      { "key": "COMPLETE", "name": "Označi kot dokončano" }
    ],
    "transitions": [
      {
        "from": "Pending",
        "event": "INIT",
        "to": "Pending",
        "effects": [
          ["fetch", "Task"],
          ["render-ui", "main", {
            "type": "entity-table",
            "entity": "Task",
            "columns": ["title", "status", "assignee"],
            "itemActions": [
              { "event": "START", "label": "Začni" },
              { "event": "COMPLETE", "label": "Dokončaj" }
            ]
          }]
        ]
      },
      {
        "from": "Pending",
        "to": "InProgress",
        "event": "START",
        "guard": ["=", "@entity.assignee", "@currentUser.id"],
        "effects": [
          ["set", "@entity.status", "in_progress"],
          ["persist", "update", "Task", "@entity"]
        ]
      },
      {
        "from": "InProgress",
        "to": "Done",
        "event": "COMPLETE",
        "effects": [
          ["persist", "update", "Task", "@entity"],
          ["notify", "success", "Naloga dokončana!"]
        ]
      }
    ]
  }
}
```

**Pomembna opomba:** Trait združuje vedênje (state machine) in vmesnik (`render-ui` effects).

### 3. Pages (Strani)

Pages (strani) povezujejo traits z URL potmi. Vsak orbital potrebuje vsaj eno page:

```json
{
  "name": "TaskListPage",
  "path": "/tasks",
  "traits": [
    { "ref": "TaskLifecycle", "linkedEntity": "Task" }
  ]
}
```

Popoln orbital združi vse štiri dele skupaj:

```json
{
  "name": "TaskManager",
  "entity": {
    "name": "Task",
    "persistence": "persistent",
    "fields": [
      { "name": "title", "type": "string", "required": true },
      { "name": "status", "type": "enum", "values": ["pending", "in_progress", "done"] },
      { "name": "assignee", "type": "string" }
    ]
  },
  "traits": [
    {
      "name": "TaskLifecycle",
      "linkedEntity": "Task",
      "category": "interaction",
      "stateMachine": { "...": "glej zgoraj" }
    }
  ],
  "pages": [
    {
      "name": "TaskListPage",
      "path": "/tasks",
      "traits": [{ "ref": "TaskLifecycle", "linkedEntity": "Task" }]
    }
  ]
}
```

### 4. S-izrazi (S-Expressions)

Celotna logika je izražena kot polja:

```json
// Guard: Preveri pogoje
["and",
  ["=", "@entity.status", "pending"],
  [">", "@entity.priority", 3]
]

// Effects: Izvedi ukaze
["persist", "update", "Task", "@entity"]
["notify", "success", "Shranjeno!"]
["navigate", "/tasks"]
```

### 5. Zaprti krog (Closed Circuit)

Vsaka uporabniška akcija sledi tej poti:

```
1. Event    → Uporabnik klikne "Dokončaj nalogo"
2. Guard    → Preveri: Ali je uporabnik prevzemnik?
3. Transition → Stanje: InProgress → Done
4. Effects  → Strežnik: Shrani v bazo
             → Klient: Prikaži obvestilo, osveži seznam
5. Response → UI se posodobi z realnimi podatki
```

## Zakaj "Almadar"?

Almadar (المدار) pomeni "orbita" v arabščini. Tako kot planeti sledijo predvidljivim potem, ki jih vodijo fizikalni zakoni, aplikacije, zgrajene z Almadarjem, sledijo predvidljivim potem, ki jih vodijo state machines.

| Fizika | Almadar |
|---------|---------|
| Telesa v vesolju | Entities (podatki) |
| Sile povzročijo gibanje | Eventi sprožijo vedênje |
| Zakoni vodijo gibanje | Guards nadzorujejo prehode |
| Povratne zanke | Effects |
| Stabilne orbite | Veljavna stanja aplikacije |

## Naslednji koraki

1. [Namesti CLI](../downloads/cli) - Namesti Almadar v svoj sistem
2. [Anatomija popolnega orbitala](../tutorials/beginner/complete-orbital) - Spoznaj vse štiri dele
3. [Zgradi upravljalnik nalog](../tutorials/beginner/task-manager) - Celoten praktični primer
4. [Prispevanje](../community/contributing) - Pridruži se skupnosti

---

*Pripravljen na revolucijo v načinu gradnje programske opreme? Gremo!*
