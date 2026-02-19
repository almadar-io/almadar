# Anatomija popolnega orbitala

> Vsaka funkcionalnost v Almadarju je orbital. Orbital ni popoln brez vseh štirih delov.

## Štirje deli orbitala

Orbital je osnovna enota Almadar aplikacije. Mora vsebovati:

```
Orbital = Entity + Trait(s) + State Machine + Pages
```

| Del | Namen | Brez njega... |
|-----|--------|---------------|
| `entity` | Podatki, ki jih upravljate | Ni podatkov za delo |
| `traits` | Kako se aplikacija obnaša | Ni vedenja ali UI |
| `stateMachine` | Stanja, eventi in prehodi | Ni definiranega življenjskega cikla |
| `pages` | Kje se pojavi UI (routes) | Stran se naloži prazna — nič se ne prikaže |

**Pages so najpogosteje pozabljeni del.** Brez `pages` trait obstaja, vendar ni pritrjen na nobeno pot — uporabnik ne vidi ničesar.

---

## Korak 1 — Definirajte entity

Entity je vaša podatkovna struktura. Opisuje, kaj upravljate in kako se shranjuje.

```json
{
  "name": "Task",
  "persistence": "persistent",
  "collection": "tasks",
  "fields": [
    { "name": "id", "type": "string", "required": true },
    { "name": "title", "type": "string", "required": true },
    { "name": "status", "type": "enum", "values": ["pending", "done"], "default": "pending" }
  ]
}
```

**Tipi polj:** `string`, `number`, `boolean`, `date`, `timestamp`, `enum`, `array`, `object`, `relation`

**Načini shranjevanja (Persistence):**
- `persistent` — shranjeno v podatkovni bazi (Firestore, PostgreSQL)
- `runtime` — v pomnilniku, sejno specifično (košarica, stanje čarovnika)
- `singleton` — ena globalna instanca (konfiguracija aplikacije, trenutni uporabnik)

---

## Korak 2 — Definirajte state machine

State machine živi znotraj traita. Opisuje, v katerih stanjih je lahko funkcionalnost in kateri eventi povzročajo prehode.

### Stanja (States)

Vsaka state machine potrebuje vsaj eno stanje z oznako `"isInitial": true`. Stanja so **objekti**, ne nizi:

```json
"states": [
  { "name": "Pending", "isInitial": true },
  { "name": "Done", "isTerminal": true }
]
```

### Eventi

Eventi so sprožilci — uporabniške akcije, sistemski eventi ali lifecycle hooks:

```json
"events": [
  { "key": "INIT", "name": "Inicializacija" },
  { "key": "COMPLETE", "name": "Dokončaj nalogo" }
]
```

> **`INIT` je obvezen.** Brez INIT prehoda se stran naloži, vendar ne prikaže ničesar.

### Prehodi (Transitions)

Prehodi (transitions) povezujejo stanja in evente. Lahko nosijo guards (pogoje) in effects (akcije):

```json
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
        "columns": ["title", "status"],
        "itemActions": [
          { "event": "COMPLETE", "label": "Dokončaj" }
        ]
      }]
    ]
  },
  {
    "from": "Pending",
    "event": "COMPLETE",
    "to": "Done",
    "effects": [
      ["persist", "update", "Task", "@entity"],
      ["notify", "success", "Naloga dokončana!"]
    ]
  }
]
```

---

## Korak 3 — Zgradite trait

Zavijte state machine v trait z `name`, `linkedEntity` in `category`:

```json
{
  "name": "TaskLifecycle",
  "linkedEntity": "Task",
  "category": "interaction",
  "stateMachine": {
    "states": [
      { "name": "Pending", "isInitial": true },
      { "name": "Done", "isTerminal": true }
    ],
    "events": [
      { "key": "INIT", "name": "Inicializacija" },
      { "key": "COMPLETE", "name": "Dokončaj nalogo" }
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
            "columns": ["title", "status"],
            "itemActions": [
              { "event": "COMPLETE", "label": "Dokončaj" }
            ]
          }]
        ]
      },
      {
        "from": "Pending",
        "event": "COMPLETE",
        "to": "Done",
        "effects": [
          ["persist", "update", "Task", "@entity"],
          ["notify", "success", "Naloga dokončana!"]
        ]
      }
    ]
  }
}
```

**`category`** je lahko:
- `interaction` — ima UI, sproži `render-ui` effects
- `integration` — klici zalednih storitev, brez UI

---

## Korak 4 — Dodajte pages

Pages povezujejo traits z URL potmi. To je najpogosteje pozabljeni del.

```json
"pages": [
  {
    "name": "TaskListPage",
    "path": "/tasks",
    "traits": [
      { "ref": "TaskLifecycle", "linkedEntity": "Task" }
    ]
  }
]
```

- `path` je URL pot (podpira `:id` parametre, npr. `/tasks/:id`)
- `traits[].ref` se sklicuje na trait po imenu, definiranem v istem orbitalu
- `traits[].linkedEntity` pove runtime, kateri entity naj poveže

---

## Popoln orbital

Vse skupaj — popoln `TaskManager` orbital:

```json
{
  "name": "TaskManager",
  "orbitals": [
    {
      "name": "Tasks",
      "entity": {
        "name": "Task",
        "persistence": "persistent",
        "collection": "tasks",
        "fields": [
          { "name": "id", "type": "string", "required": true },
          { "name": "title", "type": "string", "required": true },
          { "name": "status", "type": "enum", "values": ["pending", "done"], "default": "pending" }
        ]
      },
      "traits": [
        {
          "name": "TaskLifecycle",
          "linkedEntity": "Task",
          "category": "interaction",
          "stateMachine": {
            "states": [
              { "name": "Pending", "isInitial": true },
              { "name": "Done", "isTerminal": true }
            ],
            "events": [
              { "key": "INIT", "name": "Inicializacija" },
              { "key": "COMPLETE", "name": "Dokončaj nalogo" }
            ],
            "transitions": [
              {
                "from": "Pending", "event": "INIT", "to": "Pending",
                "effects": [
                  ["fetch", "Task"],
                  ["render-ui", "main", {
                    "type": "entity-table", "entity": "Task",
                    "columns": ["title", "status"],
                    "itemActions": [{ "event": "COMPLETE", "label": "Dokončaj" }]
                  }]
                ]
              },
              {
                "from": "Pending", "event": "COMPLETE", "to": "Done",
                "effects": [
                  ["persist", "update", "Task", "@entity"],
                  ["notify", "success", "Naloga dokončana!"]
                ]
              }
            ]
          }
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
  ]
}
```

---

## Pogoste napake

### Manjkajoče `pages` (Missing pages)

```json
// ❌ Nepopolno — nič se ne prikaže na nobeni poti
{
  "name": "Tasks",
  "entity": { ... },
  "traits": [ { "name": "TaskLifecycle", ... } ]
}

// ✅ Popolno — trait je pritrjen na /tasks
{
  "name": "Tasks",
  "entity": { ... },
  "traits": [ { "name": "TaskLifecycle", ... } ],
  "pages": [
    { "name": "TaskListPage", "path": "/tasks", "traits": [{ "ref": "TaskLifecycle", "linkedEntity": "Task" }] }
  ]
}
```

### Stanja kot nizi (neveljavno)

```json
// ❌ Napačen format
"states": ["Pending", "Done"]

// ✅ Stanja morajo biti objekti
"states": [
  { "name": "Pending", "isInitial": true },
  { "name": "Done", "isTerminal": true }
]
```

### Manjkajoč INIT prehod (Missing INIT transition)

```json
// ❌ Stran se odpre, vendar je prazna — ni začetnega render-ui
"transitions": [
  { "from": "Pending", "event": "COMPLETE", "to": "Done", "effects": [...] }
]

// ✅ Dodajte samo-zanko na INIT za prikaz začetnega UI
"transitions": [
  {
    "from": "Pending", "event": "INIT", "to": "Pending",
    "effects": [["fetch", "Task"], ["render-ui", "main", { "type": "entity-table", "entity": "Task" }]]
  },
  { "from": "Pending", "event": "COMPLETE", "to": "Done", "effects": [...] }
]
```

---

## Naslednji koraki

- [Zgradi upravljalnik nalog](./task-manager) — dodaj popoln CRUD temu vzorcu
- [UI Patterns in render-ui](../intermediate/ui-patterns) — razišči vse tipe vzorcev
- [Guards in poslovna pravila](../intermediate/guards) — dodaj pogoje prehodom
