# Straži in poslovna pravila (Guards and Business Rules)

> Vir: [`tests/schemas/03-guards.orb`](../../../../tests/schemas/03-guards.orb)

Straži (Guards) so pogoji, ki morajo biti resnični, da se prehod izvede. Delujejo kot vratarji vaših poslovnih pravil — napišite enkrat, uveljavljajte povsod, tako za UI kot za API.

---

## Kaj je straža (Guard)?

Straža je S-izraz (S-expression) na prehodu. Če se ovrednoti kot `false`, je prehod blokiran:

```json
{
  "from": "active",
  "event": "WITHDRAW",
  "to": "active",
  "guard": [">=", "@entity.balance", "@payload.amount"],
  "effects": [...]
}
```

Uporabnik lahko dvigne denar samo, če je `balance >= amount`. Če ne, je prehod tiho blokiran (UI lahko prikaže onemogočeno stanje ali sporočilo o napaki).

---

## Sintaksa S-izrazov (S-Expression Syntax)

Straže so napisane kot gnezdena polja, kjer je prvi element operater (Operator):

```
[operator, arg1, arg2, ...]
```

Argumenti so lahko:
- **Literali (Literals):** `100`, `"active"`, `true`
- **Vezave (Bindings):** `"@entity.field"`, `"@payload.field"`, `"@state"`, `"@now"`
- **Gnezdeni izrazi (Nested expressions):** `["+", "@entity.count", 1]`

---

## Operaterji primerjave (Comparison Operators)

| Operater | Pomen | Primer |
|----------|-------|--------|
| `=` | Enako | `["=", "@entity.status", "active"]` |
| `!=` | Ni enako | `["!=", "@entity.role", "guest"]` |
| `>` | Večje od | `[">", "@entity.score", 0]` |
| `>=` | Večje ali enako | `[">=", "@entity.balance", "@payload.amount"]` |
| `<` | Manjše od | `["<", "@entity.attempts", 3]` |
| `<=` | Manjše ali enako | `["<=", "@entity.age", 65]` |

---

## Logični operaterji (Boolean Operators)

Kombiniranje pogojev z `and`, `or`, `not`:

```json
["and",
  [">=", "@entity.balance", "@payload.amount"],
  ["=", "@entity.isVerified", true]
]
```

```json
["or",
  ["=", "@entity.role", "admin"],
  ["=", "@entity.role", "manager"]
]
```

```json
["not", ["=", "@entity.status", "frozen"]]
```

---

## Poln primer: upravljalnik računov (Account Manager)

To je celoten `AccountManager` iz `03-guards.orb`. Prikazuje:
- Stražo z `and` za kombiniranje dveh pogojev
- Uporabo `@payload.amount` za preverjanje uporabnikovega vnosa
- Preproste prehode stanj (zamrznitev/odmrznitev) brez straž

```json
{
  "name": "AccountManager",
  "version": "1.0.0",
  "orbitals": [
    {
      "name": "AccountManager",
      "entity": {
        "name": "Account",
        "persistence": "persistent",
        "collection": "accounts",
        "fields": [
          { "name": "id", "type": "string", "required": true },
          { "name": "balance", "type": "number", "default": 0 },
          { "name": "isVerified", "type": "boolean", "default": false }
        ]
      },
      "traits": [
        {
          "name": "AccountActions",
          "linkedEntity": "Account",
          "category": "interaction",
          "stateMachine": {
            "states": [
              { "name": "active", "isInitial": true },
              { "name": "frozen" }
            ],
            "events": [
              { "key": "INIT", "name": "Inicializacija" },
              { "key": "WITHDRAW", "name": "Dvigi sredstev", "payload": [
                { "name": "amount", "type": "number", "required": true }
              ]},
              { "key": "FREEZE", "name": "Zamrzni račun" },
              { "key": "UNFREEZE", "name": "Odmrzni račun" }
            ],
            "transitions": [
              {
                "from": "active",
                "event": "INIT",
                "to": "active",
                "effects": [
                  ["fetch", "Account"],
                  ["render-ui", "main", {
                    "type": "entity-table",
                    "entity": "Account",
                    "columns": ["balance", "isVerified"],
                    "itemActions": [
                      { "event": "WITHDRAW", "label": "Dvigi" },
                      { "event": "FREEZE", "label": "Zamrzni" }
                    ]
                  }]
                ]
              },
              {
                "from": "active",
                "event": "WITHDRAW",
                "to": "active",
                "guard": ["and",
                  [">=", "@entity.balance", "@payload.amount"],
                  ["=", "@entity.isVerified", true]
                ],
                "effects": [
                  ["set", "@entity.balance", ["-", "@entity.balance", "@payload.amount"]]
                ]
              },
              {
                "from": "active",
                "event": "FREEZE",
                "to": "frozen"
              },
              {
                "from": "frozen",
                "event": "UNFREEZE",
                "to": "active"
              }
            ]
          }
        }
      ],
      "pages": [
        {
          "name": "AccountListPage",
          "path": "/accounts",
          "traits": [
            { "ref": "AccountActions", "linkedEntity": "Account" }
          ]
        }
      ]
    }
  ]
}
```

**Branje straže WITHDRAW:**
```json
["and",
  [">=", "@entity.balance", "@payload.amount"],  // Račun ima dovolj sredstev
  ["=", "@entity.isVerified", true]              // Račun je verificiran
]
```

Oba pogoja morata biti resnična. Če račun ni verificiran ali je saldo prenizek, je dvig blokiran.

---

## Straže z izračunanimi vrednostmi (Guards with Computed Values)

Straže lahko uporabljajo aritmetične operaterje — rezultat gnezdenega izraza se uporabi kot argument:

```json
// Dovoli samo, če saldo po dvigu ostane nad minimumom
[">=",
  ["-", "@entity.balance", "@payload.amount"],
  100
]
```

```json
// Dovoli samo, če je število elementov znotraj omejitve
["<",
  ["+", "@entity.itemCount", 1],
  50
]
```

---

## Pogosti vzorci straž (Common Guard Patterns)

### Dostop na podlagi vloge (Role-based access)

```json
// Samo skrbniki (admins) lahko brišejo
{
  "from": "listing",
  "event": "DELETE",
  "to": "listing",
  "guard": ["=", "@currentUser.role", "admin"],
  "effects": [["persist", "delete", "Task", "@entity.id"]]
}
```

### Preverjanje lastništva (Ownership check)

```json
// Samo dodeljeni uporabnik (assignee) lahko začne nalogo
{
  "from": "Pending",
  "event": "START",
  "to": "InProgress",
  "guard": ["=", "@entity.assigneeId", "@currentUser.id"],
  "effects": [["persist", "update", "Task", "@entity"]]
}
```

### Validacija polja (Field validation)

```json
// Rezultat mora biti med 0 in 100
{
  "guard": ["and",
    [">=", "@payload.score", 0],
    ["<=", "@payload.score", 100]
  ]
}
```

### Predpogoj stanja (Status precondition)

```json
// Odobriti je mogoče samo, če je trenutno v pregledu
{
  "guard": ["=", "@entity.status", "review"]
}
```

---

## Straže vs. efekti (Guards vs. Effects)

Straže se izvajajo **pred** prehodom. Efekti se izvajajo **po njem**. Nikoli ne uporabljajte efektov za uveljavljanje poslovnih pravil — za to so straže.

```json
// ❌ Napačno: uporaba efektov za simulacijo straže
"effects": [
  ["if", ["<", "@entity.balance", 0], ["notify", "error", "Nezadostna sredstva"]]
]

// ✅ Pravilno: straža v celoti blokira prehod
"guard": [">=", "@entity.balance", "@payload.amount"]
```

---

## Naslednji koraki

- [Komunikacija med orbitalnimi (Cross-Orbital Communication)](./cross-orbital) — straže se lahko sklicujejo na podatke iz drugih orbitalov
- [UI Vzorci in render-ui (UI Patterns)](./ui-patterns) — prikazovanje povratnih informacij, ko straže blokirajo akcije
- [Gradnja celovite aplikacije (Full App)](../advanced/full-app) — straže v resničnem večorbitalnem aplikaciji
