# UI Vzorci (UI Patterns) in render-ui

> Vir: [`tests/schemas/08-patterns.orb`](../../../../tests/schemas/08-patterns.orb)

UI vmesnik Almadarja je v celoti poganjan z `render-ui` efekti znotraj prehodov state machine. Ni JSX-a, ni datotek s predlogami, ni ločenega drevesa komponent — state machine *je* logika vmesnika.

---

## Kako deluje render-ui

```json
["render-ui", "slot", { "type": "pattern", ...props }]
```

| Parameter | Opis |
|-----------|------|
| `"slot"` | Kje na strani se komponenta prikaže |
| `{ "type": "..." }` | Tip vzorca (Pattern) |
| `...props` | Nastavitve za ta vzorec |

**Za brisanje slota (Slot):**
```json
["render-ui", "slot", null]
```

---

## Sloti (Slots)

Sloti (Slots) razdelijo stran na poimenovana področja. En slot v danem trenutku poseduje ena lastnost (Trait).

| Slot | Tipična uporaba |
|------|-----------------|
| `main` | Glavno področje vsebine |
| `modal` | Pogovorna okna (obrazci, potrditve) |
| `drawer` | Stranska plošča (prikaz podrobnosti) |
| `sidebar` | Stalna stranska navigacija |
| `overlay` | Prekritja celotnega zaslona |
| `hud-top` / `hud-bottom` | Stalne glave/noge |
| `toast` | Toast obvestila |

---

## Kategorije vzorcev (Pattern Categories)

### Vzorci prikaza (Display Patterns)

**`entity-table`** — tabela podatkov s stolpci, razvrščanjem in akcijami vrstic.

```json
["render-ui", "main", {
  "type": "entity-table",
  "entity": "Product",
  "columns": ["name", "price", "stock", "category"],
  "itemActions": [
    { "event": "VIEW", "label": "Poglej" },
    { "event": "EDIT", "label": "Uredi" },
    { "event": "DELETE", "label": "Izbriši" }
  ]
}]
```

**`entity-detail`** — prikaz podrobnosti enega zapisa samo za branje.

```json
["render-ui", "main", {
  "type": "entity-detail",
  "entity": "Product",
  "fields": ["name", "description", "price", "stock", "category"]
}]
```

**`stats`** — kartice statističnih podatkov na nadzorni plošči (Dashboard) (štetja, vsote, povzetki).

```json
["render-ui", "main", {
  "type": "stats",
  "items": [
    { "label": "Skupaj izdelkov", "value": "@entity.count" },
    { "label": "Razprodano", "value": "@entity.outOfStock" }
  ]
}]
```

---

### Vzorci obrazcev (Form Patterns)

**`form`** — samodejno generiran obrazec za entiteto.

```json
["render-ui", "main", {
  "type": "form",
  "entity": "Product",
  "fields": [
    { "name": "name", "label": "Ime izdelka", "required": true },
    { "name": "description", "label": "Opis", "type": "textarea" },
    { "name": "price", "label": "Cena", "type": "number", "required": true },
    { "name": "stock", "label": "Zaloga", "type": "number" },
    { "name": "category", "label": "Kategorija" }
  ]
}]
```

**`form-section`** — obrazec znotraj modala ali predala (drawer) s SAVE/CANCEL, vezanim na evente.

```json
["render-ui", "modal", {
  "type": "form-section",
  "entity": "Task",
  "fields": ["title", "priority", "dueDate"],
  "submitEvent": "SAVE",
  "cancelEvent": "CANCEL"
}]
```

> **Pomembno:** Uporabite `submitEvent` in `cancelEvent` (ne `onSubmit`/`onCancel` — ti sta zastareli).

---

### Vzorci navigacije in glave (Navigation & Header Patterns)

**`page-header`** — naslov strani z neobveznimi gumbi za akcije.

```json
["render-ui", "main", {
  "type": "page-header",
  "title": "Izdelki",
  "subtitle": "Upravljajte katalog svojih izdelkov",
  "actions": [
    { "event": "CREATE", "label": "Nov izdelek", "variant": "primary" }
  ]
}]
```

---

### Vzorci stanja (State Patterns)

**`empty-state`** — prikaže se, ko ni podatkov.

```json
["render-ui", "main", {
  "type": "empty-state",
  "title": "Še ni izdelkov",
  "description": "Dodajte svoj prvi izdelek za začetek",
  "actions": [{ "event": "CREATE", "label": "Dodaj izdelek" }]
}]
```

**`loading-state`** — stanje nalaganja med pridobivanjem podatkov.

```json
["render-ui", "main", {
  "type": "loading-state",
  "title": "Nalaganje izdelkov..."
}]
```

---

## UI, ki ga poganja stanje (State-Driven UI): poln primer

Iz `08-patterns.orb` — celoten `ProductCRUD` trait:

```json
{
  "name": "ProductCRUD",
  "linkedEntity": "Product",
  "category": "interaction",
  "stateMachine": {
    "states": [
      { "name": "listing", "isInitial": true },
      { "name": "viewing" },
      { "name": "editing" },
      { "name": "creating" }
    ],
    "events": [
      { "key": "INIT", "name": "Inicializacija" },
      { "key": "VIEW", "name": "Poglej izdelek", "payload": [
        { "name": "id", "type": "string", "required": true }
      ]},
      { "key": "EDIT", "name": "Uredi izdelek" },
      { "key": "CREATE", "name": "Ustvari izdelek" },
      { "key": "SAVE", "name": "Shrani" },
      { "key": "CANCEL", "name": "Prekliči" },
      { "key": "BACK", "name": "Nazaj na seznam" },
      { "key": "DELETE", "name": "Izbriši izdelek" }
    ],
    "transitions": [
      {
        "from": "listing", "event": "INIT", "to": "listing",
        "effects": [
          ["fetch", "Product"],
          ["render-ui", "main", {
            "type": "entity-table", "entity": "Product",
            "columns": ["name", "price", "stock", "category"],
            "itemActions": [
              { "event": "VIEW", "label": "Poglej" },
              { "event": "EDIT", "label": "Uredi" },
              { "event": "DELETE", "label": "Izbriši" }
            ]
          }]
        ]
      },
      {
        "from": "listing", "event": "VIEW", "to": "viewing",
        "effects": [
          ["fetch", "Product", "@payload.id"],
          ["render-ui", "main", {
            "type": "entity-detail", "entity": "Product",
            "fields": ["name", "description", "price", "stock", "category"]
          }]
        ]
      },
      {
        "from": "listing", "event": "CREATE", "to": "creating",
        "effects": [
          ["render-ui", "main", {
            "type": "form", "entity": "Product",
            "fields": [
              { "name": "name", "label": "Ime izdelka", "required": true },
              { "name": "price", "label": "Cena", "type": "number", "required": true }
            ]
          }]
        ]
      },
      {
        "from": "viewing", "event": "EDIT", "to": "editing",
        "effects": [["render-ui", "main", { "type": "form", "entity": "Product", "mode": "edit" }]]
      },
      {
        "from": "viewing", "event": "BACK", "to": "listing",
        "effects": [["navigate", "/products"]]
      },
      {
        "from": "editing", "event": "SAVE", "to": "viewing",
        "effects": [
          ["persist", "update", "Product", "@entity"],
          ["notify", "success", "Izdelek shranjen"]
        ]
      },
      { "from": "editing", "event": "CANCEL", "to": "viewing" },
      {
        "from": "creating", "event": "SAVE", "to": "listing",
        "effects": [
          ["persist", "update", "Product", "@entity"],
          ["notify", "success", "Izdelek ustvarjen"],
          ["navigate", "/products"]
        ]
      },
      { "from": "creating", "event": "CANCEL", "to": "listing",
        "effects": [["navigate", "/products"]]
      },
      {
        "from": "listing", "event": "DELETE", "to": "listing",
        "effects": [
          ["persist", "delete", "Product", "@payload.id"],
          ["notify", "info", "Izdelek izbrisan"]
        ]
      }
    ]
  }
}
```

S stranmi (Pages):

```json
"pages": [
  {
    "name": "ProductListPage",
    "path": "/products",
    "traits": [{ "ref": "ProductCRUD", "linkedEntity": "Product" }]
  },
  {
    "name": "ProductDetailPage",
    "path": "/products/:id",
    "traits": [{ "ref": "ProductCRUD", "linkedEntity": "Product" }]
  }
]
```

**Kaj state machine prikaže glede na stanje (State):**

| Stanje (State) | Slot `main` prikaže |
|----------------|---------------------|
| `listing` | `entity-table` z akcijami vrstic |
| `viewing` | `entity-detail` s polji |
| `editing` | `form` v načinu urejanja |
| `creating` | `form` z vsemi polji |

---

## Referenca lastnosti akcij (Action Props Reference)

Akcije (Actions) so definirane **znotraj** lastnosti vzorca, ne kot ločeni vzorci.

| Vzorec (Pattern) | Kako vezati akcije |
|------------------|--------------------|
| `entity-table` | `itemActions: [{ "event": "EDIT", "label": "Uredi" }]` |
| `entity-detail` | `actions: [{ "event": "EDIT", "label": "Uredi" }]` |
| `form-section` | `submitEvent: "SAVE"`, `cancelEvent: "CANCEL"` |
| `page-header` | `actions: [{ "event": "CREATE", "label": "Novo" }]` |
| `empty-state` | `actions: [{ "event": "CREATE", "label": "Dodaj" }]` |

---

## Vezave v lastnostih vzorcev (Bindings in Pattern Props)

Lastnosti vzorcev sprejemajo vezave (Bindings) za branje živih podatkov:

| Vezava (Binding) | Se ovrednoti v |
|------------------|----------------|
| `@entity.field` | Vrednost polja trenutne entitete |
| `@payload.field` | Polje podatkov eventa (Event Payload) |
| `@state` | Ime trenutnega stanja |
| `@now` | Trenutna časovna oznaka |

---

## Naslednji koraki

- [Straži in poslovna pravila (Guards)](./guards) — dodajte pogoje za nadzor prehodov
- [Komunikacija med orbitalnimi (Cross-Orbital Communication)](./cross-orbital) — povežite orbitale skupaj
- [Gradnja celovite aplikacije (Full App)](../advanced/full-app) — združite več orbitalov skupaj
