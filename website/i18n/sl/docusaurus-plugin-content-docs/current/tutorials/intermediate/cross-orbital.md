# Komunikacija med orbitalnimi (Cross-Orbital Communication)

> Vir: [`tests/schemas/05-cross-orbital.orb`](../../../../tests/schemas/05-cross-orbital.orb)

Orbitali so samostojni — toda resnične aplikacije potrebujejo, da si funkcionalnosti med seboj sporočajo. Almadar poveže orbitale prek tipiziranega event busa: en orbital oddaja (emits), drugi poslušajo (listens).

---

## Vzorec (The Pattern)

```
CartManager orbital          NotificationManager orbital
      |                               |
  CartActions trait              NotificationHandler trait
      |                               |
  emits: ITEM_ADDED  ──────────►  listens: ITEM_ADDED
  emits: CART_CLEARED ─────────►  listens: CART_CLEARED
```

Ključne lastnosti:
- **`emits`** — deklariran na traitu in na orbitalu (kateri eventi se objavljajo)
- **`listens`** — deklariran na traitu (na katere evente se odziva) in na orbitalu (katerim orbitalnim se naroča)
- **`scope: "external"`** — označi event kot prekoračitev meja orbitala

---

## Korak 1 — Deklarirajte Emits na oddajajočem traitu

Trait deklarira, katere evente lahko objavlja, vključno s pogodbo o podatkih (Payload Contract):

```json
{
  "name": "CartActions",
  "linkedEntity": "Cart",
  "category": "interaction",
  "emits": [
    {
      "event": "ITEM_ADDED",
      "scope": "external",
      "description": "Oddano, ko je element dodan v košarico",
      "payload": [
        { "name": "itemCount", "type": "number", "required": true },
        { "name": "total", "type": "number", "required": true }
      ]
    },
    {
      "event": "CART_CLEARED",
      "scope": "external",
      "description": "Oddano, ko je košarica izpraznjena",
      "payload": [
        { "name": "timestamp", "type": "number", "required": true }
      ]
    }
  ],
  "stateMachine": { "..." : "..." }
}
```

`scope: "external"` je zahtevan za evente med orbitali. Brez njega event ostane internen za trait.

---

## Korak 2 — Sprožite event v prehodu

Znotraj `effects` prehoda uporabite `["emit", "EVENT_NAME", payload]`:

```json
{
  "from": "empty",
  "event": "ADD_ITEM",
  "to": "hasItems",
  "effects": [
    ["increment", "@entity.itemCount", 1],
    ["set", "@entity.total", ["+", "@entity.total", "@payload.price"]],
    ["emit", "ITEM_ADDED", {
      "itemCount": "@entity.itemCount",
      "total": "@entity.total"
    }]
  ]
}
```

Podatki (Payload) so JSON objekt, kjer so vrednosti lahko vezave (`@entity.*`) ali literali.

---

## Korak 3 — Deklarirajte Emits na ravni orbitala

Na ravni orbitala navedite vsak event, ki ga orbital objavlja:

```json
{
  "name": "CartManager",
  "entity": { "...": "..." },
  "traits": [ { "...": "..." } ],
  "pages": [ { "...": "..." } ],
  "emits": ["ITEM_ADDED", "CART_CLEARED"]
}
```

---

## Korak 4 — Deklarirajte Listens na prejemajočem traitu

Prejemajoči trait deklarira, katere zunanje evente obravnava:

```json
{
  "name": "NotificationHandler",
  "linkedEntity": "Notification",
  "category": "interaction",
  "listens": [
    { "event": "ITEM_ADDED", "scope": "external" },
    { "event": "CART_CLEARED", "scope": "external" }
  ],
  "stateMachine": { "..." : "..." }
}
```

Ti eventi postanejo veljavni event ključi v state machine — dodajte jih v `events` in napišite prehode zanje:

```json
"events": [
  { "key": "INIT", "name": "Inicializacija" },
  { "key": "ITEM_ADDED", "name": "Element dodan" },
  { "key": "CART_CLEARED", "name": "Košarica izpraznjena" }
],
"transitions": [
  {
    "from": "idle",
    "event": "ITEM_ADDED",
    "to": "notified",
    "effects": [
      ["increment", "@entity.count", 1],
      ["set", "@entity.message", "Element dodan v košarico"]
    ]
  },
  {
    "from": "notified",
    "event": "CART_CLEARED",
    "to": "idle",
    "effects": [
      ["set", "@entity.message", "Košarica izpraznjena"],
      ["set", "@entity.count", 0]
    ]
  }
]
```

---

## Korak 5 — Deklarirajte Listens na ravni orbitala

Na ravni prejemajočega orbitala deklarirajte, od katerega orbitala prihajajo eventi:

```json
{
  "name": "NotificationManager",
  "entity": { "...": "..." },
  "traits": [ { "...": "..." } ],
  "pages": [ { "...": "..." } ],
  "listens": [
    { "event": "ITEM_ADDED", "from": "CartManager" },
    { "event": "CART_CLEARED", "from": "CartManager" }
  ]
}
```

---

## Celotna shema (The Complete Schema)

```json
{
  "name": "cross-orbital-test",
  "version": "1.0.0",
  "orbitals": [
    {
      "name": "CartManager",
      "entity": {
        "name": "Cart",
        "persistence": "runtime",
        "fields": [
          { "name": "id", "type": "string", "required": true },
          { "name": "itemCount", "type": "number", "default": 0 },
          { "name": "total", "type": "number", "default": 0 }
        ]
      },
      "traits": [
        {
          "name": "CartActions",
          "linkedEntity": "Cart",
          "category": "interaction",
          "emits": [
            {
              "event": "ITEM_ADDED",
              "scope": "external",
              "payload": [
                { "name": "itemCount", "type": "number", "required": true },
                { "name": "total", "type": "number", "required": true }
              ]
            },
            {
              "event": "CART_CLEARED",
              "scope": "external",
              "payload": [
                { "name": "timestamp", "type": "number", "required": true }
              ]
            }
          ],
          "stateMachine": {
            "states": [
              { "name": "empty", "isInitial": true },
              { "name": "hasItems" }
            ],
            "events": [
              { "key": "INIT", "name": "Inicializacija" },
              { "key": "ADD_ITEM", "name": "Dodaj element", "payload": [
                { "name": "price", "type": "number", "required": true }
              ]},
              { "key": "CLEAR", "name": "Izprazni košarico" }
            ],
            "transitions": [
              {
                "from": "empty", "event": "INIT", "to": "empty",
                "effects": [
                  ["render-ui", "main", {
                    "type": "stats",
                    "title": "Košarica",
                    "value": "@entity.itemCount",
                    "subtitle": "Skupaj: @entity.total",
                    "actions": [{ "event": "ADD_ITEM", "label": "Dodaj element" }]
                  }]
                ]
              },
              {
                "from": "empty", "event": "ADD_ITEM", "to": "hasItems",
                "effects": [
                  ["increment", "@entity.itemCount", 1],
                  ["set", "@entity.total", ["+", "@entity.total", "@payload.price"]],
                  ["emit", "ITEM_ADDED", { "itemCount": "@entity.itemCount", "total": "@entity.total" }]
                ]
              },
              {
                "from": "hasItems", "event": "ADD_ITEM", "to": "hasItems",
                "effects": [
                  ["increment", "@entity.itemCount", 1],
                  ["set", "@entity.total", ["+", "@entity.total", "@payload.price"]],
                  ["emit", "ITEM_ADDED", { "itemCount": "@entity.itemCount", "total": "@entity.total" }]
                ]
              },
              {
                "from": "hasItems", "event": "CLEAR", "to": "empty",
                "effects": [
                  ["set", "@entity.itemCount", 0],
                  ["set", "@entity.total", 0],
                  ["emit", "CART_CLEARED", { "timestamp": "@now" }]
                ]
              }
            ]
          }
        }
      ],
      "pages": [
        {
          "name": "CartPage",
          "path": "/cart",
          "traits": [{ "ref": "CartActions", "linkedEntity": "Cart" }]
        }
      ],
      "emits": ["ITEM_ADDED", "CART_CLEARED"]
    },
    {
      "name": "NotificationManager",
      "entity": {
        "name": "Notification",
        "persistence": "runtime",
        "fields": [
          { "name": "id", "type": "string", "required": true },
          { "name": "message", "type": "string" },
          { "name": "count", "type": "number", "default": 0 }
        ]
      },
      "traits": [
        {
          "name": "NotificationHandler",
          "linkedEntity": "Notification",
          "category": "interaction",
          "listens": [
            { "event": "ITEM_ADDED", "scope": "external" },
            { "event": "CART_CLEARED", "scope": "external" }
          ],
          "stateMachine": {
            "states": [
              { "name": "idle", "isInitial": true },
              { "name": "notified" }
            ],
            "events": [
              { "key": "INIT", "name": "Inicializacija" },
              { "key": "ITEM_ADDED", "name": "Element dodan" },
              { "key": "CART_CLEARED", "name": "Košarica izpraznjena" }
            ],
            "transitions": [
              {
                "from": "idle", "event": "INIT", "to": "idle",
                "effects": [
                  ["render-ui", "main", {
                    "type": "stats",
                    "title": "Obvestila",
                    "value": "@entity.count",
                    "subtitle": "@entity.message"
                  }]
                ]
              },
              {
                "from": "idle", "event": "ITEM_ADDED", "to": "notified",
                "effects": [
                  ["increment", "@entity.count", 1],
                  ["set", "@entity.message", "Element dodan v košarico"]
                ]
              },
              {
                "from": "notified", "event": "ITEM_ADDED", "to": "notified",
                "effects": [["increment", "@entity.count", 1]]
              },
              {
                "from": "notified", "event": "CART_CLEARED", "to": "idle",
                "effects": [
                  ["set", "@entity.message", "Košarica izpraznjena"],
                  ["set", "@entity.count", 0]
                ]
              }
            ]
          }
        }
      ],
      "pages": [
        {
          "name": "NotificationsPage",
          "path": "/notifications",
          "traits": [{ "ref": "NotificationHandler", "linkedEntity": "Notification" }]
        }
      ],
      "listens": [
        { "event": "ITEM_ADDED", "from": "CartManager" },
        { "event": "CART_CLEARED", "from": "CartManager" }
      ]
    }
  ]
}
```

---

## Kontrolni seznam: Eventi med orbitalnimi (Cross-Orbital Events Checklist)

Uporabite ta kontrolni seznam pri povezovanju dveh orbitalov:

- [ ] **Oddajajoči trait** ima `"emits": [...]` z `scope: "external"` in pogodbo `payload`
- [ ] **Oddajajoči prehod** kliče `["emit", "EVENT_NAME", {...payload}]` v `effects`
- [ ] **Oddajajoči orbital** ima `"emits": ["EVENT_NAME"]` na najvišji ravni
- [ ] **Poslušajoči trait** ima `"listens": [{ "event": "EVENT_NAME", "scope": "external" }]`
- [ ] **State machine poslušajočega traita** ima event v `events` in `transition` zanj
- [ ] **Poslušajoči orbital** ima `"listens": [{ "event": "EVENT_NAME", "from": "EmittingOrbital" }]` na najvišji ravni

---

## Naslednji koraki

- [Gradnja celovite aplikacije (Full App)](../advanced/full-app) — eventi med orbitalnimi v 3-orbitalni aplikaciji
- [Straži in poslovna pravila (Guards)](./guards) — straža prehoda na podlagi podatkov iz drugega orbitala
