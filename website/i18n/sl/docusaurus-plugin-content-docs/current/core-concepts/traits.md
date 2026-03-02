# Lastnosti (Traits)

> Definicije lastnosti in vrste končnih avtomatov za Almadar

---

> Kako lastnosti delujejo v Almadar/Orbital arhitekturi - končni avtomati, varovalke, učinki in komunikacija med orbitali.

**Povezano:** [Entitete](./entities.md)

---

## Pregled

V Almadar je **Lastnost** končni avtomat, ki definira vedenje za entiteto. Osnovna kompozicija je:

```
Orbitalna enota = Entiteta + Lastnosti + Strani
```

Medtem ko [Entitete](./entities.md) definirajo obliko podatkov, Lastnosti definirajo, kako se ti podatki spreminjajo skozi čas preko **stanj**, **prehodov**, **varovalk** in **učinkov**.

---

## Definicija lastnosti

Lastnost je definirana v `.orb` shemi z naslednjo strukturo:

```json
{
  "name": "TaskManagement",
  "category": "interaction",
  "linkedEntity": "Task",
  "description": "Upravlja življenjski cikel naloge in spremembe statusa",
  "emits": [
    { "event": "TASK_COMPLETED", "scope": "external" }
  ],
  "listens": [
    { "event": "USER_ASSIGNED", "triggers": "ASSIGN" }
  ],
  "stateMachine": {
    "states": [
      { "name": "idle", "isInitial": true },
      { "name": "active" },
      { "name": "completed", "isTerminal": true }
    ],
    "events": [
      { "key": "START", "name": "Začni nalogo" },
      { "key": "COMPLETE", "name": "Dokončaj nalogo" }
    ],
    "transitions": [
      {
        "from": "idle",
        "to": "active",
        "event": "START",
        "effects": [["set", "@entity.id", "status", "active"]]
      },
      {
        "from": "active",
        "to": "completed",
        "event": "COMPLETE",
        "guard": ["=", "@entity.assigneeId", "@user.id"],
        "effects": [
          ["set", "@entity.id", "status", "completed"],
          ["emit", "TASK_COMPLETED", { "taskId": "@entity.id" }]
        ]
      }
    ]
  }
}
```

### Lastnosti lastnosti

| Lastnost | Obvezno | Opis |
|----------|---------|------|
| `name` | Da | Identifikator lastnosti (PascalCase) |
| `category` | Ne | Kategorija lastnosti (glej spodaj) |
| `linkedEntity` | Ne | Entiteta, na kateri ta lastnost deluje |
| `description` | Ne | Človeku berljiv opis |
| `emits` | Ne | Dogodki, ki jih ta lastnost lahko odda |
| `listens` | Ne | Dogodki, ki jih ta lastnost posluša |
| `stateMachine` | Da | Definicija končnega avtomata |
| `ticks` | Ne | Načrtovani/periodični učinki |
| `config` | Ne | Shema konfiguracije |

---

## Kategorije lastnosti

Lastnosti so razvrščene glede na njihov primarni namen:

| Kategorija | Namen | Tipični učinki |
|------------|-------|----------------|
| `interaction` | Obravnava dogodkov uporabniškega vmesnika | `render-ui`, `navigate`, `notify` |
| `integration` | Operacije na strežniški strani | `persist`, `fetch`, `call-service` |
| `lifecycle` | Upravljanje življenjskega cikla entitete | `persist`, `emit` |
| `gameCore` | Igralna zanka in fizika | `set`, `emit`, ticks |
| `gameEntity` | Vednja igralnih entitet | `set`, `emit`, `render-ui` |
| `gameUi` | Igralni uporabniški vmesnik, HUD, kontrole | `render-ui`, `notify` |

### Primeri kategorij

**Lastnost interakcije** - Obravnava dogodke uporabniškega vmesnika:
```json
{
  "name": "FormInteraction",
  "category": "interaction",
  "stateMachine": {
    "transitions": [{
      "event": "SUBMIT",
      "effects": [
        ["render-ui", "main", { "type": "form", "loading": true }],
        ["emit", "FORM_SUBMITTED", "@payload"]
      ]
    }]
  }
}
```

**Lastnost integracije** - Obravnava operacije strežnika:
```json
{
  "name": "DataPersistence",
  "category": "integration",
  "stateMachine": {
    "transitions": [{
      "event": "SAVE",
      "effects": [
        ["persist", "update", "Task", "@entity.id", "@payload"],
        ["emit", "DATA_SAVED", { "id": "@entity.id" }]
      ]
    }]
  }
}
```

---

## Končni avtomat

Vsaka lastnost ima končni avtomat, ki definira njeno vedenje.

### Stanja

Stanja predstavljajo možne pogoje lastnosti:

```json
{
  "states": [
    { "name": "idle", "isInitial": true, "description": "Čakanje na vnos" },
    { "name": "loading", "description": "Pridobivanje podatkov" },
    { "name": "active", "description": "Pripravljen za interakcijo" },
    { "name": "error", "isTerminal": true, "description": "Napaka" }
  ]
}
```

| Lastnost | Opis |
|----------|------|
| `name` | Identifikator stanja (majhne črke) |
| `isInitial` | Začetno stanje (natanko eno obvezno) |
| `isTerminal` | Ne pričakuje se izhodnih prehodov |
| `description` | Človeku berljiv opis |

### Dogodki

Dogodki sprožijo prehode stanj:

```json
{
  "events": [
    { "key": "INIT", "name": "Inicializiraj" },
    { "key": "SUBMIT", "name": "Pošlji obrazec", "payload": [
      { "name": "email", "type": "string", "required": true },
      { "name": "name", "type": "string", "required": true }
    ]},
    { "key": "ERROR", "name": "Prišlo je do napake" }
  ]
}
```

| Lastnost | Opis |
|----------|------|
| `key` | Identifikator dogodka (UPPER_SNAKE_CASE) |
| `name` | Prikazno ime |
| `payload` | Pričakovana shema tovora |

### Prehodi

Prehodi definirajo, kako se stanja spreminjajo kot odziv na dogodke:

```json
{
  "transitions": [
    {
      "from": "idle",
      "to": "loading",
      "event": "SUBMIT",
      "guard": ["and", ["!=", "@payload.email", ""], ["!=", "@payload.name", ""]],
      "effects": [
        ["set", "@entity.id", "email", "@payload.email"],
        ["persist", "create", "User", "@payload"]
      ]
    },
    {
      "from": ["loading", "active"],
      "to": "error",
      "event": "ERROR"
    }
  ]
}
```

| Lastnost | Opis |
|----------|------|
| `from` | Izvorno stanje(ja) - string ali polje |
| `to` | Ciljno stanje (vedno eno) |
| `event` | Ključ sprožilnega dogodka |
| `guard` | Pogoj, ki mora veljati (opcijsko) |
| `effects` | Učinki za izvedbo ob prehodu (opcijsko) |

**Prehodi z več viri:** Uporabi polje za `from` za obravnavo istega dogodka iz več stanj:
```json
{ "from": ["idle", "error"], "to": "loading", "event": "RETRY" }
```

---

## Varovalke

Varovalke so pogoji, ki se morajo ovrednotiti v `true`, da se prehod zgodi. Uporabljajo sintakso S-izrazov.

### Operatorji varovalk

| Kategorija | Operatorji |
|------------|-----------|
| Primerjava | `=`, `!=`, `<`, `>`, `<=`, `>=` |
| Logika | `and`, `or`, `not` |
| Matematika | `+`, `-`, `*`, `/`, `%` |
| Polje | `count`, `includes`, `every`, `some` |

### Primeri varovalk

```json
// Enostavna enakost
["=", "@entity.status", "active"]

// Sestavljen pogoj
["and",
  ["!=", "@payload.email", ""],
  ["!=", "@payload.name", ""]
]

// Številska primerjava
[">=", "@entity.balance", "@payload.amount"]

// Preverjanje polja
[">", ["count", "@entity.items"], 0]

// Uporabniška dovoljenja
["=", "@entity.ownerId", "@user.id"]

// Kompleksna varovalka
["and",
  ["=", "@entity.status", "pending"],
  ["or",
    ["=", "@user.role", "admin"],
    ["=", "@entity.assigneeId", "@user.id"]
  ]
]
```

### Vezave varovalk

Varovalke lahko sklicujejo podatke preko vezav (glej [Vezave entitet](./entities.md#entity-bindings-in-s-expressions)):

| Vezava | Opis |
|--------|------|
| `@entity.field` | Vrednost polja trenutne entitete |
| `@payload.field` | Polje tovora dogodka |
| `@state` | Ime trenutnega stanja lastnosti |
| `@user.id` | ID avtenticiranega uporabnika |
| `@now` | Trenutni časovni žig |

### Neuspeh varovalke

Če se varovalka ovrednoti v `false`:
1. Prehod je **blokiran**
2. Učinki se ne izvedejo
3. Stanje ostane nespremenjeno
4. Odziv označi `transitioned: false`

---

## Učinki

Učinki so dejanja, ki se izvedejo ob prehodu. Uporabljajo sintakso S-izrazov.

### Vrste učinkov

| Učinek | Strežnik | Odjemalec | Namen |
|--------|----------|-----------|-------|
| `render-ui` | Prezrto | Izvede | Prikaz vzorca v reži uporabniškega vmesnika |
| `navigate` | Prezrto | Izvede | Navigacija po poti |
| `notify` | Prezrto | Izvede | Prikaz obvestila/toasta |
| `fetch` | Izvede | Prezrto | Poizvedba v bazo podatkov |
| `persist` | Izvede | Prezrto | Ustvari/posodobi/izbriše podatke |
| `call-service` | Izvede | Prezrto | Klic zunanjega API-ja |
| `emit` | Izvede | Izvede | Objavi dogodek |
| `set` | Izvede | Izvede | Spremeni polje entitete (podpira povečanje/zmanjšanje preko S-izrazov) |

### Model dvojne izvedbe

Lastnosti se izvajajo **hkrati na odjemalcu in strežniku**:

```
┌─────────────────────────────────────────────────────────────┐
│  Odjemalec                       Strežnik                   │
│  ─────────                       ────────                   │
│  render-ui  ✓                    render-ui  → clientEffects │
│  navigate   ✓                    navigate   → clientEffects │
│  notify     ✓                    notify     → clientEffects │
│  fetch      ✗                    fetch      ✓ (poizvedba DB)│
│  persist    ✗                    persist    ✓ (zapis v DB)  │
│  call-service ✗                  call-service ✓ (API klic)  │
│  emit       ✓ (EventBus)         emit       ✓ (med orbitali)│
│  set        ✓                    set        ✓               │
└─────────────────────────────────────────────────────────────┘
```

### Primeri učinkov

**render-ui** - Prikaz vzorca uporabniškega vmesnika:
```json
["render-ui", "main", {
  "type": "entity-table",
  "entity": "Task",
  "columns": ["title", "status", "dueDate"]
}]
```

**persist** - Operacije z bazo podatkov:
```json
// Ustvari
["persist", "create", "Task", "@payload"]

// Posodobi
["persist", "update", "Task", "@entity.id", { "status": "completed" }]

// Izbriši
["persist", "delete", "Task", "@entity.id"]
```

**fetch** - Poizvedba podatkov:
```json
["fetch", "Task", { "status": "active", "assigneeId": "@user.id" }]
```

**emit** - Objava dogodka:
```json
["emit", "TASK_COMPLETED", { "taskId": "@entity.id", "completedBy": "@user.id" }]
```

**set** - Sprememba polja:
```json
["set", "@entity.id", "status", "active"]
["set", "@entity.id", "updatedAt", "@now"]
// Povečanje/zmanjšanje z matematičnimi operatorji:
["set", "@entity.id", "score", ["+", "@entity.score", 10]]  // Povečaj za 10
["set", "@entity.id", "health", ["-", "@entity.health", 5]]  // Zmanjšaj za 5
```

**Opomba:** `increment` in `decrement` nista ločeni vrsti učinkov. Uporabite učinek `set` z matematičnimi operatorji S-izrazov (`+`, `-`) za spreminjanje številskih polj.

**navigate** - Sprememba poti:
```json
["navigate", "/tasks/@entity.id"]
```

**notify** - Prikaz obvestila:
```json
["notify", "Naloga uspešno dokončana", "success"]
```

**call-service** - Zunanji API:
```json
["call-service", "email", "send", {
  "to": "@entity.email",
  "subject": "Naloga dodeljena",
  "body": "Dodeljena vam je bila nova naloga."
}]
```

---

## linkedEntity - Vezava Lastnost-Entiteta

Lastnost `linkedEntity` določa, na katero entiteto lastnost deluje.

### Primarna entiteta

Vsak orbital ima primarno entiteto. Lastnosti brez `linkedEntity` uporabljajo to entiteto:

```json
{
  "name": "TaskManagement",
  "entity": { "name": "Task", "fields": [...] },
  "traits": [
    { "name": "StatusTrait" }  // Uporablja entiteto Task
  ]
}
```

### Eksplicitni linkedEntity

Določite `linkedEntity` za delovanje na drugi entiteti:

```json
{
  "name": "TaskManagement",
  "entity": { "name": "Task" },
  "traits": [
    { "name": "StatusTrait", "linkedEntity": "Task" },
    { "name": "CommentTrait", "linkedEntity": "Comment" },
    { "name": "PlayerStatsTrait", "linkedEntity": "Player" }
  ]
}
```

### Zakaj linkedEntity?

1. **Ponovno uporabne lastnosti** - Splošna lastnost lahko deluje z vsako entiteto
2. **Operacije med entitetami** - Deluj na povezanih entitetah
3. **Varnost tipov** - Prevajalnik preveri sklice na polja entitete
4. **Jasne odvisnosti** - Eksplicitna vezava izboljša berljivost

Glej [Vezave entitet](./entities.md#linkedentity-concept) za več podrobnosti.

---

## Komunikacija z dogodki (emit/listen)

Lastnosti komunicirajo preko dogodkov, kar omogoča ohlapno povezovanje med orbitali.

### Oddajanje dogodkov

Deklarirajte dogodke, ki jih lastnost lahko odda:

```json
{
  "name": "OrderFlow",
  "emits": [
    {
      "event": "ORDER_CONFIRMED",
      "scope": "external",
      "description": "Se sproži, ko je naročilo potrjeno",
      "payload": [
        { "name": "orderId", "type": "string" },
        { "name": "items", "type": "array" }
      ]
    }
  ]
}
```

Oddaj v učinkih:
```json
["emit", "ORDER_CONFIRMED", { "orderId": "@entity.id", "items": "@entity.items" }]
```

### Poslušanje dogodkov

Deklarirajte dogodke, ki jih lastnost posluša:

```json
{
  "name": "InventorySync",
  "listens": [
    {
      "event": "ORDER_CONFIRMED",
      "triggers": "RESERVE_STOCK",
      "scope": "external",
      "payloadMapping": {
        "items": "@payload.items"
      },
      "guard": [">", ["count", "@payload.items"], 0]
    }
  ]
}
```

| Lastnost | Opis |
|----------|------|
| `event` | Ime dogodka za poslušanje |
| `triggers` | Notranji dogodek za sprožitev (privzeto je ime dogodka) |
| `scope` | `internal` (samo v istem orbitalu) ali `external` (med orbitali) |
| `payloadMapping` | Transformacija dohodnega tovora |
| `guard` | Opcijski pogoj za filtriranje dogodkov |

### Obseg dogodka

| Obseg | Opis |
|-------|------|
| `internal` | Dogodki samo znotraj istega orbitala |
| `external` | Dogodki lahko prečkajo meje orbitalov |

### Tok komunikacije med orbitali

```
┌──────────────────┐         ┌──────────────────┐
│  OrderManagement │         │ InventoryManagement│
│                  │         │                  │
│  ┌────────────┐  │  emit   │  ┌────────────┐  │
│  │ OrderFlow  │──┼────────►│  │InventorySync│  │
│  └────────────┘  │ ORDER_  │  └────────────┘  │
│                  │CONFIRMED│                  │
└──────────────────┘         └──────────────────┘
```

1. Lastnost `OrderFlow` odda `ORDER_CONFIRMED` (zunanji obseg)
2. Dogodkovno vodilo oddaja vsem poslušajočim lastnostim
3. `InventorySync` prejme dogodek, preslika tovor
4. Dogodek `RESERVE_STOCK` se sproži na `InventorySync`
5. Končni avtomat normalno obdela prehod

---

## Tiki (Načrtovani učinki)

Tiki tečejo učinke periodično, tudi brez uporabniške interakcije.

### Definicija tika

```json
{
  "ticks": [
    {
      "name": "cleanup_expired",
      "interval": "60000",
      "guard": [">", ["count", "@entity.expiredSessions"], 0],
      "effects": [
        ["persist", "delete", "Session", { "expiresAt": ["<", "@now"] }]
      ],
      "description": "Počisti potekle seje vsako minuto"
    },
    {
      "name": "sync_status",
      "interval": "5000",
      "effects": [
        ["fetch", "ExternalStatus", {}],
        ["set", "@entity.id", "lastSync", "@now"]
      ]
    }
  ]
}
```

### Lastnosti tika

| Lastnost | Opis |
|----------|------|
| `name` | Identifikator tika |
| `interval` | Milisekunde, ali niz kot `"5s"`, `"1m"` |
| `guard` | Pogoj (tik se preskoči, če je false) |
| `effects` | Učinki za izvedbo |
| `appliesTo` | Določeni ID-ji entitet (opcijsko) |
| `description` | Človekov opis |

### Pogosti vzorci tikov

**Čiščenje:**
```json
{
  "name": "cleanup",
  "interval": "300000",
  "effects": [["persist", "delete", "TempData", { "createdAt": ["<", ["-", "@now", 86400000]] }]]
}
```

**Periodična sinhronizacija:**
```json
{
  "name": "sync",
  "interval": "10000",
  "effects": [
    ["call-service", "external-api", "fetch-updates", {}],
    ["emit", "DATA_SYNCED", { "timestamp": "@now" }]
  ]
}
```

**Igralna zanka:**
```json
{
  "name": "game_tick",
  "interval": "16",
  "effects": [
    ["set", "@entity.id", "position", ["+", "@entity.position", "@entity.velocity"]],
    ["render-ui", "canvas", { "type": "game-canvas" }]
  ]
}
```

---

## Sklici lastnosti proti vgrajenim lastnostim

Lastnosti lahko definiramo vgrajeno ali sklicujemo iz zunanjih virov.

### Vgrajena definicija

Definirajte lastnost neposredno v orbitalu:

```json
{
  "orbital": "TaskManagement",
  "traits": [
    {
      "name": "StatusTrait",
      "stateMachine": {
        "states": [...],
        "transitions": [...]
      }
    }
  ]
}
```

### Sklicna definicija

Sklicujte lastnost iz standardne knjižnice ali uvozov:

```json
{
  "orbital": "TaskManagement",
  "uses": [
    { "from": "std/behaviors/crud", "as": "CRUD" }
  ],
  "traits": [
    {
      "ref": "CRUD.traits.CRUDManagement",
      "linkedEntity": "Task",
      "config": {
        "allowDelete": true,
        "softDelete": false
      }
    }
  ]
}
```

### Lastnosti sklica

| Lastnost | Opis |
|----------|------|
| `ref` | Pot do lastnosti (npr. `"Alias.traits.TraitName"`) |
| `linkedEntity` | Prepiši vezavo entitete |
| `config` | Prepiši konfiguracijo |

### Kdaj uporabiti sklice

- **Ponovno uporabni vzorci** - CRUD, avtentikacija, paginacija
- **Standardna vedenja** - Iz `std/behaviors/`
- **Deljenje med projekti** - Uvoz iz drugih shem
- **Konfiguracijsko vodeno** - Ista lastnost, drugačna konfiguracija

---

## Popoln primer

Popolna lastnost, ki prikazuje vse funkcije:

```json
{
  "name": "CheckoutFlow",
  "category": "integration",
  "linkedEntity": "Order",
  "description": "Obravnava postopek nakupa od košarice do potrditve",

  "emits": [
    { "event": "ORDER_PLACED", "scope": "external", "payload": [
      { "name": "orderId", "type": "string" },
      { "name": "total", "type": "number" }
    ]},
    { "event": "PAYMENT_FAILED", "scope": "internal" }
  ],

  "listens": [
    { "event": "CART_UPDATED", "triggers": "RECALCULATE", "scope": "internal" },
    { "event": "INVENTORY_RESERVED", "triggers": "CONFIRM_STOCK", "scope": "external" }
  ],

  "stateMachine": {
    "states": [
      { "name": "cart", "isInitial": true, "description": "Nakupovalna košarica" },
      { "name": "checkout", "description": "Vnos pošiljanja/plačila" },
      { "name": "processing", "description": "Obdelava plačila" },
      { "name": "confirmed", "description": "Naročilo potrjeno" },
      { "name": "failed", "isTerminal": true, "description": "Naročilo ni uspelo" }
    ],

    "events": [
      { "key": "PROCEED", "name": "Nadaljuj na blagajno" },
      { "key": "SUBMIT", "name": "Pošlji naročilo", "payload": [
        { "name": "paymentMethod", "type": "string", "required": true }
      ]},
      { "key": "PAYMENT_SUCCESS", "name": "Plačilo uspešno" },
      { "key": "PAYMENT_FAILED", "name": "Plačilo ni uspelo" },
      { "key": "RECALCULATE", "name": "Preračunaj zneske" },
      { "key": "CONFIRM_STOCK", "name": "Zaloga potrjena" }
    ],

    "transitions": [
      {
        "from": "cart",
        "to": "checkout",
        "event": "PROCEED",
        "guard": [">", ["count", "@entity.items"], 0],
        "effects": [
          ["render-ui", "main", { "type": "form", "schema": "checkout" }]
        ]
      },
      {
        "from": "checkout",
        "to": "processing",
        "event": "SUBMIT",
        "guard": ["and",
          ["!=", "@payload.paymentMethod", ""],
          [">=", "@entity.total", 0]
        ],
        "effects": [
          ["set", "@entity.id", "paymentMethod", "@payload.paymentMethod"],
          ["set", "@entity.id", "status", "processing"],
          ["call-service", "payment", "charge", {
            "amount": "@entity.total",
            "method": "@payload.paymentMethod"
          }],
          ["render-ui", "main", { "type": "stats", "loading": true }]
        ]
      },
      {
        "from": "processing",
        "to": "confirmed",
        "event": "PAYMENT_SUCCESS",
        "effects": [
          ["set", "@entity.id", "status", "confirmed"],
          ["set", "@entity.id", "confirmedAt", "@now"],
          ["persist", "update", "Order", "@entity.id", "@entity"],
          ["emit", "ORDER_PLACED", { "orderId": "@entity.id", "total": "@entity.total" }],
          ["notify", "Naročilo potrjeno!", "success"],
          ["navigate", "/orders/@entity.id"]
        ]
      },
      {
        "from": "processing",
        "to": "failed",
        "event": "PAYMENT_FAILED",
        "effects": [
          ["set", "@entity.id", "status", "failed"],
          ["emit", "PAYMENT_FAILED", { "orderId": "@entity.id" }],
          ["notify", "Plačilo ni uspelo. Poskusite znova.", "error"]
        ]
      },
      {
        "from": ["cart", "checkout"],
        "to": "cart",
        "event": "RECALCULATE",
        "effects": [
          ["set", "@entity.id", "total", ["array/reduce", "@entity.items",
            ["lambda", ["sum", "item"], ["+", "@sum", "@item.price"]], 0]]
        ]
      }
    ]
  },

  "ticks": [
    {
      "name": "expire_abandoned",
      "interval": "300000",
      "guard": ["and",
        ["=", "@state", "checkout"],
        ["<", "@entity.updatedAt", ["-", "@now", 1800000]]
      ],
      "effects": [
        ["set", "@entity.id", "status", "abandoned"],
        ["persist", "update", "Order", "@entity.id", { "status": "abandoned" }]
      ]
    }
  ]
}
```

---

## Povzetek

Sistem lastnosti Almadar zagotavlja:

1. **Končne avtomate** - Definiraj možna stanja in prehode
2. **Varovalke** - Zaščiti prehode z boolean pogoji
3. **Učinke** - Izvedi dejanja ob prehodu (UI, baza podatkov, dogodki)
4. **Dvojno izvajanje** - Učinki strežnika (persist, fetch) + Učinki odjemalca (render, navigate)
5. **Komunikacija z dogodki** - Emit/listen za sporočanje med lastnostmi in orbitali
6. **Tiki** - Načrtovani periodični učinki
7. **linkedEntity** - Eksplicitna vezava na [podatke entitete](./entities.md)
8. **Kategorije** - Klasificiraj lastnosti po namenu (interakcija, integracija, igra)
9. **Ponovna uporaba** - Sklicuj lastnosti iz knjižnic ali definiraj vgrajeno

Lastnosti so vedenjsko jedro Orbitalnih enot - definirajo *kako* se entitete spreminjajo skozi čas preko deklarativnega, komponibilnega modela končnih avtomatov.

---

*Dokument ustvarjen: 2026-02-02*
*Temelji na analizi kode orbital-rust in builder paketov*
