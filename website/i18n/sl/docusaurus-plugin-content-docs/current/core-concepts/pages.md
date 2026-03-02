# Strani (Pages)

> Kako strani delujejo v Almadar arhitekturi - usmerjanje, vezava lastnosti, reže in navigacija.

**Povezano:**
- [Entitete](./entities.md)
- [Lastnosti](./traits.md)

---

## Pregled

V Almadar je **Stran** pot, ki komponira lastnosti za upodabljanje uporabniškega vmesnika. Osnovna kompozicija je:

```
Orbital = Entiteta + Lastnosti + Strani
```

Medtem ko [Entitete](./entities.md) definirajo podatke in [Lastnosti](./traits.md) definirajo vedenje, Strani definirajo **kje** uporabniki interagirajo s sistemom. Strani so **lastnostno vodene** - ne vsebujejo uporabniškega vmesnika neposredno, ampak sklicujejo lastnosti, katerih učinki `render-ui` zapolnijo stran.

---

## Definicija strani

Stran je definirana v `.orb` shemi z naslednjo strukturo:

```json
{
  "name": "TaskListPage",
  "path": "/tasks",
  "viewType": "list",
  "primaryEntity": "Task",
  "traits": [
    { "ref": "TaskBrowser", "linkedEntity": "Task" },
    { "ref": "FilterPanel", "linkedEntity": "Task" }
  ]
}
```

### Lastnosti strani

| Lastnost | Obvezno | Opis |
|----------|---------|------|
| `name` | Da | PascalCase identifikator (npr. `TaskListPage`) |
| `path` | Da | Pot URL-ja, ki se začne z `/` |
| `viewType` | Ne | Semantična namig: `list`, `detail`, `create`, `edit`, `dashboard`, `custom` |
| `primaryEntity` | Ne | Glavna entiteta, na kateri ta stran deluje |
| `traits` | Da | Polje sklicev lastnosti, ki poganjajo uporabniški vmesnik |
| `isInitial` | Ne | Ali je to začetna stran |

---

## Poti in vzorci poti

Poti strani definirajo URL poti za vašo aplikacijo.

### Pravila poti

- Se mora začeti z `/`
- Veljavni znaki: črke, številke, vezaji, podčrtaji, dvopičja, poševnice
- Mora biti enolična med vsemi stranmi v shemi

### Statične poti

Preproste poti brez dinamičnih segmentov:

```json
{ "path": "/tasks" }
{ "path": "/dashboard" }
{ "path": "/settings/profile" }
```

### Dinamični segmenti

Uporabite sintakso dvopičja za dinamične parametre:

```json
{ "path": "/tasks/:id" }
{ "path": "/users/:userId/tasks/:taskId" }
{ "path": "/projects/:projectId/members/:memberId" }
```

Dinamični segmenti so izluščeni in na voljo v:
- Tovorih dogodkov (`@payload.id`)
- Učinkih navigacije
- Iskanju entitet

### Primeri poti

| Pot | Opis |
|-----|------|
| `/tasks` | Stran s seznamom nalog |
| `/tasks/:id` | Podrobnost posamezne naloge |
| `/tasks/create` | Ustvari novo nalogo |
| `/tasks/:id/edit` | Uredi obstoječo nalogo |
| `/users/:id/profile` | Uporabniški profil |
| `/dashboard` | Pogled nadzorne plošče |

---

## Vrste pogledov

Vrste pogledov so semantični namigi o namenu strani:

| Vrsta | Namen | Tipični vzorci |
|-------|-------|----------------|
| `list` | Prikaz zbirke entitet | `entity-table`, `entity-cards`, `entity-list` |
| `detail` | Prikaz posamezne entitete | `entity-detail`, `stats` |
| `create` | Ustvari novo entiteto | `form` |
| `edit` | Uredi obstoječo entiteto | `form` |
| `dashboard` | Pregled z več razdelki | `dashboard-grid`, `stats` |
| `custom` | Postavitev po meri | Kateri koli vzorci |

**Pomembno:** Vrste pogledov ne omejujejo uporabniškega vmesnika - dejansko upodabljanje nadzira učinek `render-ui` v [lastnostih](./traits.md#effects). Vrste pogledov so metapodatki za:
- Dokumentacijo
- Namige za generiranje kode
- Orodja za ogrodje uporabniškega vmesnika

---

## Vezava Stran-Lastnost

Strani sklicujejo lastnosti, ki zagotavljajo njihovo vedenje in uporabniški vmesnik.

### Sklici lastnosti

```json
{
  "pages": [
    {
      "name": "TaskListPage",
      "path": "/tasks",
      "traits": [
        { "ref": "TaskBrowser", "linkedEntity": "Task" },
        { "ref": "QuickActions", "linkedEntity": "Task", "config": { "showCreate": true } }
      ]
    }
  ]
}
```

### Struktura PageTraitRef

| Lastnost | Obvezno | Opis |
|----------|---------|------|
| `ref` | Da | Ime lastnosti ali pot (npr. `"TaskBrowser"`, `"Std.traits.CRUD"`) |
| `linkedEntity` | Ne | Entiteta, na kateri ta lastnost deluje |
| `config` | Ne | Konfiguracija specifična za lastnost |

### Več lastnosti na stran

Stran lahko ima več lastnosti, od katerih vsaka prispeva uporabniški vmesnik v različne reže:

```json
{
  "name": "DashboardPage",
  "path": "/dashboard",
  "traits": [
    { "ref": "StatsSummary", "linkedEntity": "Analytics" },
    { "ref": "RecentActivity", "linkedEntity": "Activity" },
    { "ref": "QuickActions", "linkedEntity": "Task" }
  ]
}
```

Vsak učinek `render-ui` lastnosti cilja na določene [reže](#reže-in-upodabljanje-uporabniskega-vmesnika).

### linkedEntity na lastnostih

Lastnost `linkedEntity` veže lastnost na določeno entiteto:

```json
{ "ref": "StatusManager", "linkedEntity": "Task" }
```

To pomeni:
- Vezave `@entity` v lastnosti se razrešijo v podatke `Task`
- Učinki kot `persist` delujejo na zbirki `Task`
- Končni avtomat lastnosti upravlja instance `Task`

Glej [Vezava Lastnost-Entiteta](./traits.md#linkedentity-trait-entity-binding) za podrobnosti.

---

## Primarna entiteta

Lastnost `primaryEntity` označuje glavno entiteto, na kateri stran deluje:

```json
{
  "name": "TaskDetailPage",
  "path": "/tasks/:id",
  "primaryEntity": "Task",
  "traits": [
    { "ref": "TaskViewer" },
    { "ref": "CommentList", "linkedEntity": "Comment" }
  ]
}
```

**Uporaba:**
- Privzeta entiteta za lastnosti brez eksplicitnega `linkedEntity`
- Preverjanje, da entiteta obstaja
- Namigi za generiranje kode
- Ni obvezno, če vse lastnosti eksplicitno določijo svojo entiteto

---

## Reže in upodabljanje uporabniškega vmesnika

Lastnosti upodabljajo uporabniški vmesnik preko učinkov `render-ui`, ki ciljajo na **reže** - poimenovana področja na strani.

### Razpoložljive reže

| Reža | Namen |
|------|-------|
| `main` | Primarno področje vsebine |
| `sidebar` | Stranska plošča |
| `modal` | Modalno prekrivanje |
| `drawer` | Predalna plošča |
| `overlay` | Celozaslonsko prekrivanje |
| `center` | Osrednjena vsebina |
| `toast` | Toast obvestila |
| `hud-top` | Zgornji HUD (igralni uporabniški vmesnik) |
| `hud-bottom` | Spodnji HUD (igralni uporabniški vmesnik) |
| `floating` | Plavajoč element |
| `system` | Nevidne sistemske komponente |

### Učinek render-ui

Lastnosti zapolnijo reže z uporabo učinka `render-ui`:

```json
["render-ui", "main", {
  "type": "entity-table",
  "entity": "Task",
  "columns": ["title", "status", "dueDate"],
  "itemActions": [
    { "event": "VIEW", "label": "Poglej" },
    { "event": "EDIT", "label": "Uredi" }
  ]
}]
```

### Tok reže

```
┌─────────────────────────────────────────────────────────────┐
│  Stran: TaskListPage                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Reža: main                                          │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │  Vzorec: entity-table (iz TaskBrowser)      │    │   │
│  │  │  - Stolpci: title, status, dueDate          │    │   │
│  │  │  - Dejanja: VIEW, EDIT                      │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Reža: sidebar                                       │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │  Vzorec: filter-panel (iz FilterPanel)      │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Več upodabljanj v isto režo

Če več lastnosti upodablja v isto režo, se postavijo druga na drugo (poznejše nadomesti ali doda glede na vrsto vzorca):

```json
// Lastnost A
["render-ui", "main", { "type": "stats", ... }]

// Lastnost B (pozneje na strani)
["render-ui", "main", { "type": "entity-table", ... }]
```

---

## Navigacija

Navigacija med stranmi se obravnava preko učinka `navigate` v lastnostih.

### Učinek navigate

```json
["navigate", "/tasks/:id", { "id": "@payload.taskId" }]
```

**Format:** `["navigate", pot, parametri?]`

| Argument | Opis |
|----------|------|
| `pot` | Pot ciljne strani (lahko vsebuje dinamične segmente) |
| `parametri` | Opcijski objekt za zapolnitev dinamičnih segmentov |

### Primeri navigacije

**Enostavna navigacija:**
```json
["navigate", "/dashboard"]
```

**Z ID entitete:**
```json
["navigate", "/tasks/@entity.id"]
```

**S tovorom:**
```json
["navigate", "/tasks/:id", { "id": "@payload.taskId" }]
```

**Ugnezdena pot:**
```json
["navigate", "/users/:userId/tasks/:taskId", {
  "userId": "@entity.assigneeId",
  "taskId": "@entity.id"
}]
```

### Navigacija v prehodih

Navigacija se običajno zgodi po spremembah stanja:

```json
{
  "from": "editing",
  "to": "saved",
  "event": "SAVE",
  "effects": [
    ["persist", "update", "Task", "@entity.id", "@payload"],
    ["notify", "Naloga shranjena!", "success"],
    ["navigate", "/tasks/@entity.id"]
  ]
}
```

Glej [Učinki](./traits.md#effects) za več podrobnosti.

---

## Začetna stran

Označite stran kot vstopno točko z `isInitial`:

```json
{
  "name": "HomePage",
  "path": "/",
  "isInitial": true,
  "traits": [
    { "ref": "WelcomeBanner" }
  ]
}
```

**Vedenje:**
- Aplikacija naloži to stran prvo
- Preusmeritve iz korena (`/`) gredo sem
- Samo ena stran naj bi bila označena kot začetna na orbital

---

## Preverjanje strani

Strani se preverijo ob času prevajanja s temi pravili:

### Obvezna polja
- `name` - Mora biti PascalCase
- `path` - Se mora začeti z `/`, samo veljavni znaki
- `traits` - Mora imeti vsaj en sklic lastnosti

### Napake pri preverjanju

| Napaka | Opis |
|--------|------|
| `PageMissingName` | Ime strani je obvezno |
| `PageMissingPath` | Pot strani je obvezna |
| `PageInvalidPath` | Pot se ne ujema z vzorcem |
| `PageEmptyTraits` | Polje lastnosti ne more biti prazno |
| `PageInvalidTraitRef` | Sklicana lastnost ne obstaja |
| `PageInvalidViewType` | viewType ni na seznamu veljavnih |
| `PageDuplicatePath` | Druga stran uporablja isto pot |

---

## Popoln primer

Popoln primer strani z več lastnostmi:

```json
{
  "orbitals": [
    {
      "name": "TaskManagement",
      "entity": {
        "name": "Task",
        "collection": "tasks",
        "fields": [
          { "name": "id", "type": "string", "required": true },
          { "name": "title", "type": "string", "required": true },
          { "name": "status", "type": "enum", "values": ["pending", "active", "done"] },
          { "name": "assigneeId", "type": "relation", "relation": { "entity": "User" } }
        ]
      },
      "traits": [
        {
          "name": "TaskBrowser",
          "linkedEntity": "Task",
          "stateMachine": {
            "states": [
              { "name": "idle", "isInitial": true },
              { "name": "viewing" }
            ],
            "transitions": [
              {
                "from": "idle",
                "to": "viewing",
                "event": "INIT",
                "effects": [
                  ["fetch", "Task", {}],
                  ["render-ui", "main", {
                    "type": "entity-table",
                    "entity": "Task",
                    "columns": ["title", "status", "assigneeId"],
                    "itemActions": [
                      { "event": "VIEW", "label": "Poglej" },
                      { "event": "EDIT", "label": "Uredi" }
                    ]
                  }]
                ]
              },
              {
                "from": "viewing",
                "to": "viewing",
                "event": "VIEW",
                "effects": [
                  ["navigate", "/tasks/@payload.id"]
                ]
              }
            ]
          }
        },
        {
          "name": "TaskViewer",
          "linkedEntity": "Task",
          "stateMachine": {
            "states": [
              { "name": "loading", "isInitial": true },
              { "name": "viewing" }
            ],
            "transitions": [
              {
                "from": "loading",
                "to": "viewing",
                "event": "INIT",
                "effects": [
                  ["fetch", "Task", { "id": "@payload.id" }],
                  ["render-ui", "main", {
                    "type": "entity-detail",
                    "entity": "Task",
                    "fields": ["title", "status", "assigneeId", "createdAt"]
                  }]
                ]
              },
              {
                "from": "viewing",
                "to": "viewing",
                "event": "EDIT",
                "effects": [
                  ["navigate", "/tasks/@entity.id/edit"]
                ]
              },
              {
                "from": "viewing",
                "to": "viewing",
                "event": "BACK",
                "effects": [
                  ["navigate", "/tasks"]
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
          "viewType": "list",
          "primaryEntity": "Task",
          "isInitial": true,
          "traits": [
            { "ref": "TaskBrowser", "linkedEntity": "Task" }
          ]
        },
        {
          "name": "TaskDetailPage",
          "path": "/tasks/:id",
          "viewType": "detail",
          "primaryEntity": "Task",
          "traits": [
            { "ref": "TaskViewer", "linkedEntity": "Task" }
          ]
        }
      ]
    }
  ]
}
```

---

## Ključna načela

1. **Lastnostno vodene strani** - Strani so vsebniki za sklice lastnosti. Uporabniški vmesnik izhaja iz učinkov `render-ui` v lastnostih, ne iz definicij strani.

2. **Arhitektura rež** - Uporabniški vmesnik teče skozi standardizirane reže (`main`, `sidebar`, `modal`), kar omogoča kompozicijo postavitve brez trdega kodiranja.

3. **Pot kot pogodba** - Pot strani je primarni vmesnik - definira URL, na katerega uporabniki navigirajo.

4. **Eksplicitna vezava entitet** - `linkedEntity` na sklicih lastnosti naredi odnose entitet eksplicitne.

5. **Brez stanja strani** - Strani so čiste kompozicijske. Vse stanje živi v končnih avtomatih lastnosti.

6. **Navigacija z učinki** - Navigacija je učinek, sprožen s prehodi lastnosti, ne lastnost strani.

---

## Povzetek

Sistem strani Almadar zagotavlja:

1. **Usmerjanje** - Navigacija na podlagi poti z dinamičnimi segmenti
2. **Kompozicija lastnosti** - Več lastnosti na stran, vsaka prispeva uporabniški vmesnik
3. **Reže** - Poimenovana področja za postavitev uporabniškega vmesnika (main, sidebar, modal, itd.)
4. **Vrste pogledov** - Semantični namigi za namen strani (list, detail, dashboard)
5. **Navigacija** - Navigacija z učinki med stranmi
6. **Vezava entitet** - Eksplicitni odnosi entitet preko `linkedEntity`
7. **Preverjanje** - Prevajalnik uveljavlja enoličnost poti in obstoj lastnosti

Strani so sloj usmerjanja in kompozicije - definirajo **kam** uporabniki gredo, medtem ko [lastnosti](./traits.md) definirajo **kaj** se zgodi in [entitete](./entities.md) definirajo **kateri podatki** so vpleteni.
