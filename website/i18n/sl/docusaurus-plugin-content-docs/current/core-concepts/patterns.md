# Vzorce (Patterns)

> Most med deklarativnimi shemami in komponentami uporabniškega vmesnika

---

## Pregled

**Sistem vzorcev** povezuje deklarativne sheme z dejanskimi komponentami uporabniškega vmesnika. Ko učinek `render-ui` lastnosti določi vrsto vzorca, sistem uporablja tri ključne mehanizme za:

1. **Preverjanje** lastnosti vzorca glede na shemo
2. **Preslikavo** vzorca v konkretno komponento
3. **Uveljavljanje** pogodbe dogodka za skladnost z zaprtim krogom

```
Shema (render-ui)  →  Register vzorcev  →  Preslikava komponent  →  Komponenta lupine
                              ↓
                       Pogodba dogodka
                              ↓
                    Preverjanje zaprtega kroga
```

---

## Register vzorcev

Register vzorcev je vir resnice za vse razpoložljive vzorce. Vsak vzorec definira:

```json
{
  "entity-table": {
    "type": "entity-table",
    "category": "display",
    "description": "Podatkovna tabela s stolpci in razvrščanjem",
    "suggestedFor": ["pogledi gostih podatkov", "primerjave", "administrativne plošče"],
    "typicalSize": "medium",
    "componentHints": ["row-action:*", "table-cell", "sort-header"],
    "implements": "EntityBoundPatternProps",
    "propsSchema": {
      "columns": {
        "required": true,
        "types": ["array"],
        "description": "Stolpci so lahko objekti Column ali preprosta imena polj"
      },
      "entity": {
        "types": ["string", "array"],
        "description": "Ime entitete za samodejno pridobivanje ALI polje podatkov"
      },
      "itemActions": {
        "types": ["array"],
        "description": "Dejanja elementov iz generirane kode - preslika se v rowActions"
      }
    },
    "componentMapping": {
      "component": "DataTable",
      "eventContract": { }
    }
  }
}
```

### Lastnosti vzorca

| Lastnost | Opis |
|----------|------|
| `type` | Enoličen identifikator vzorca (uporabljen v `render-ui`) |
| `category` | Združevanje: `display`, `form`, `header`, `filter`, `navigation`, `layout`, `game`, `state` |
| `description` | Človeku berljiv opis |
| `suggestedFor` | Namigi primerov uporabe za LLM generiranje |
| `typicalSize` | Odtis uporabniškega vmesnika: `tiny`, `small`, `medium`, `large` |
| `componentHints` | Vzorci podkomponent, ki jih ta vzorec lahko uporabi |
| `implements` | Vmesnik, ki ga komponenta implementira (npr. `EntityBoundPatternProps`) |
| `propsSchema` | Definicije lastnosti z tipi in zahtevami |
| `componentMapping` | Preslikava v komponento lupine in pogodbo dogodka |

### Kategorije vzorcev

| Kategorija | Primeri | Namen |
|------------|---------|-------|
| `display` | `entity-table`, `entity-list`, `entity-cards`, `stats` | Predstavitev podatkov |
| `form` | `form`, `form-section`, `form-fields` | Vnos podatkov |
| `header` | `page-header`, `title-only` | Naslovi strani in dejanja |
| `filter` | `search-bar`, `filter-group`, `search-input` | Filtriranje podatkov |
| `navigation` | `tabs`, `breadcrumb`, `wizard-progress`, `pagination` | Kontrole navigacije |
| `layout` | `modal`, `drawer`, `master-detail`, `dashboard-grid` | Struktura strani |
| `game` | `game-canvas`, `game-hud`, `game-controls` | Elementi igralnega uporabniškega vmesnika |
| `state` | `empty-state`, `loading-state`, `error-state` | Povratne informacije o stanju |

---

## Preslikava komponent

Preslikava komponent povezuje vrste vzorcev s komponentami lupine:

```json
{
  "mappings": {
    "entity-table": {
      "component": "DataTable",
      "category": "display"
    },
    "form": {
      "component": "Form",
      "category": "form"
    },
    "page-header": {
      "component": "PageHeader",
      "category": "header"
    }
  }
}
```

### Lastnosti preslikave

| Lastnost | Opis |
|----------|------|
| `component` | Ime komponente v lupini |
| `category` | Ista kot kategorija vzorca |
| `client` | Opcijsko - komponenta specifična za odjemalca |
| `deprecated` | Opcijsko - označi vzorec kot zastarel |
| `replacedBy` | Opcijsko - nadomestni vzorec za zastarele |

---

## Pogodbe dogodkov

Pogodbe dogodkov definirajo, katere dogodke komponenta oddaja in zahteva. To je ključno za **preverjanje zaprtega kroga** - zagotavljanje, da ima vsaka interakcija z uporabniškim vmesnikom ustrezni prehod končnega avtomata.

```json
{
  "contracts": {
    "form": {
      "emits": [
        {
          "event": "SAVE",
          "trigger": "submit",
          "payload": { "type": "FormData" }
        },
        {
          "event": "CANCEL",
          "trigger": "click",
          "payload": { "type": "void" }
        }
      ],
      "requires": ["SAVE", "CANCEL"],
      "entityAware": true
    },
    "entity-table": {
      "emits": [
        {
          "event": "VIEW",
          "trigger": "action",
          "payload": { "type": "EntityRow" },
          "optional": true
        },
        {
          "event": "SELECT",
          "trigger": "select",
          "payload": { "type": "EntityRow" },
          "optional": true
        },
        {
          "event": "EDIT",
          "trigger": "action",
          "payload": { "type": "EntityRow" },
          "optional": true
        },
        {
          "event": "DELETE",
          "trigger": "action",
          "payload": { "type": "EntityRow" },
          "optional": true
        }
      ],
      "requires": [],
      "entityAware": true,
      "configDriven": true
    }
  }
}
```

### Lastnosti pogodbe

| Lastnost | Opis |
|----------|------|
| `emits` | Dogodki, ki jih komponenta lahko odda |
| `requires` | Dogodki, ki MORAJO imeti prehode (zaprti krog) |
| `entityAware` | Komponenta prejme podatke entitete |
| `configDriven` | Dogodki so določeni s konfiguracijo (npr. `itemActions`) |

### Definicija dogodka

| Lastnost | Opis |
|----------|------|
| `event` | Ime dogodka (npr. `SAVE`, `CANCEL`, `SELECT`) |
| `trigger` | Kaj sproži dogodek: `click`, `submit`, `change`, `action`, `close` |
| `payload` | Tip tovora: `void`, `FormData`, `EntityRow`, ali oblika po meri |
| `optional` | Če je `true`, prehod ni obvezen |

### Integracija zaprtega kroga

Pogodbe dogodkov poganja [preverjanje zaprtega kroga](/core-concepts/closed-circuit):

1. **Zahtevani dogodki**: Če `requires: ["SAVE", "CANCEL"]`, validator zagotovi, da obstajata prehoda za oba dogodka
2. **Vzorci prekrival**: `modal` in `drawer` zahtevata prehode `CLOSE` za preprečevanje obtičalih stanj uporabniškega vmesnika
3. **Konfiguracijsko vodeni dogodki**: Za `entity-table` z `itemActions: [{ event: "DELETE" }]`, validator preveri prehod `DELETE`

---

## Zahteve vmesnika komponent

Komponente, preslikane na vzorce, morajo implementirati določene vmesnike za sodelovanje v zaprtem krogu.

### EntityBoundPatternProps

Za komponente, vezane na podatke (`entity-table`, `entity-list`, `form`, itd.):

```typescript
interface EntityBoundPatternProps {
  entity?: string;           // Ime tipa entitete
  data?: unknown[];          // Polje podatkov
  isLoading?: boolean;       // Stanje nalaganja
  error?: Error | null;      // Stanje napake
}
```

### Integracija z dogodkovnim vodilom

Vse interaktivne komponente morajo oddajati dogodke preko Dogodkovnega Vodila, ne notranjih povratnih klicev:

```typescript
// PRAVILNO - uporablja dogodkovno vodilo
const handleRowClick = (row: EntityRow) => {
  eventBus.emit('UI:SELECT', { row });
};

// NAPAKA - notranje upravljanje stanja
const handleRowClick = (row: EntityRow) => {
  setSelectedRow(row);  // Prekine krog!
};
```

### Vzorec lastnosti Action

Komponente s konfigurabilnimi dejanji jih prejmejo kot lastnosti:

```typescript
interface ActionablePatternProps {
  actions?: Array<{
    label: string;
    event: string;        // Dogodek za oddajo
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: string;
  }>;
  itemActions?: Array<{   // Za dejanja na ravni vrstice
    label: string;
    event: string;
    icon?: string;
  }>;
}
```

Komponenta odda `UI:{dogodek}`, ko je dejanje sproženo, kar zaključi krog nazaj v končni avtomat.

---

## Sistem oblikovanja

Sistem oblikovanja vsebuje dejanske implementacije komponent, na katere se vzorci preslikavajo.

### Hierarhija komponent

| Raven | Namen | Primeri |
|-------|-------|---------|
| **Atomi** | Nedeljivi elementi uporabniškega vmesnika | `Button`, `Input`, `Badge`, `Icon`, `Spinner` |
| **Molekule** | Preproste kompozicije | `SearchInput`, `Tabs`, `Breadcrumb`, `FilterGroup` |
| **Organizmi** | Kompleksne, samostojne | `DataTable`, `Form`, `PageHeader`, `ModalSlot` |
| **Predloge** | Postavitve na ravni strani | Komponente celotne strani specifične za odjemalca |

---

## Uporaba vzorcev v shemah

### Učinek render-ui

Vzorci se uporabljajo preko učinka `render-ui` v prehodih lastnosti:

```json
{
  "from": "viewing",
  "to": "viewing",
  "event": "INIT",
  "effects": [
    ["render-ui", "main", {
      "type": "page-header",
      "title": "Naloge",
      "actions": [
        { "label": "Ustvari nalogo", "event": "CREATE", "variant": "primary" }
      ]
    }],
    ["render-ui", "main", {
      "type": "entity-table",
      "entity": "Task",
      "columns": ["title", "status", "assignee"],
      "itemActions": [
        { "label": "Uredi", "event": "EDIT" },
        { "label": "Izbriši", "event": "DELETE", "variant": "danger" }
      ]
    }]
  ]
}
```

### Preverjanje lastnosti

Prevajalnik preveri lastnosti glede na `propsSchema`:

1. **Obvezne lastnosti** morajo biti prisotne
2. **Tipi lastnosti** se morajo ujemati z dovoljenimi tipi
3. **Neznane lastnosti** generirajo opozorila

### Ožičenje dogodkov

Za vsako dejanje/itemAction dogodek:

1. Komponenta odda `UI:{DOGODEK}` preko dogodkovnega vodila
2. Hook `useUIEvents` ujame in razpošlje v lastnost
3. Končni avtomat obdela dogodek
4. Učinki se izvedejo, potencialno ponovno upodobijo

---

## Razpoložljivi vzorci

Naslednji vzorci so na voljo takoj:

### Vzorci prikaza

| Vzorec | Opis | Pogoste lastnosti |
|--------|------|-------------------|
| `entity-table` | Podatkovna tabela s stolpci in razvrščanjem | `entity`, `columns`, `itemActions` |
| `entity-list` | Pogled seznama elementov entitete | `entity`, `itemActions` |
| `entity-cards` | Postavitev mreže kartic za entitete | `entity`, `columns`, `itemActions` |
| `stats` | Prikaz statistike s karticami | `items` |
| `detail-view` | Prikaz podrobnosti posamezne entitete | `entity`, `fields` |

### Vzorci obrazcev

| Vzorec | Opis | Pogoste lastnosti |
|--------|------|-------------------|
| `form` | Celoten obrazec s preverjanjem | `entity`, `fields`, `layout` |
| `form-section` | Združena polja obrazca | `title`, `fields` |
| `form-fields` | Polja obrazca v vrsti | `fields` |

### Vzorci glave

| Vzorec | Opis | Pogoste lastnosti |
|--------|------|-------------------|
| `page-header` | Naslov strani z dejanji | `title`, `subtitle`, `actions` |
| `title-only` | Preprost prikaz naslova | `title` |

### Vzorci filtrov

| Vzorec | Opis | Pogoste lastnosti |
|--------|------|-------------------|
| `search-bar` | Globalno iskalno polje | `placeholder`, `entity` |
| `filter-group` | Filtriraj čipe/gumbe | `filters` |
| `search-input` | Samostojno iskalno polje | `placeholder` |

### Vzorci navigacije

| Vzorec | Opis | Pogoste lastnosti |
|--------|------|-------------------|
| `tabs` | Navigacija z zavihki | `items`, `activeTab` |
| `breadcrumb` | Sled drobtin | `items` |
| `wizard-progress` | Indikator koraka za čarovnike | `steps`, `currentStep` |
| `pagination` | Navigacija po straneh | `page`, `totalPages` |

### Vzorci postavitve

| Vzorec | Opis | Pogoste lastnosti |
|--------|------|-------------------|
| `modal` | Modalno dialog prekrivanje | `title`, `children` |
| `drawer` | Predalna plošča na strani | `title`, `position` |
| `master-detail` | Razdeljen pogled | `master`, `detail` |
| `dashboard-grid` | Mrežna postavitev za nadzorne plošče | `items` |

### Vzorci stanj

| Vzorec | Opis | Pogoste lastnosti |
|--------|------|-------------------|
| `empty-state` | Nadomestek za prazne podatke | `title`, `description`, `action` |
| `loading-state` | Indikator nalaganja | `message` |
| `error-state` | Prikaz napake | `error`, `onRetry` |

---

## Povzetek

Sistem vzorcev zagotavlja:

1. **Register vzorcev** - Definira razpoložljive vzorce z lastnostmi, kategorijami in metapodatki
2. **Preslikava komponent** - Povezuje vrste vzorcev s komponentami lupine
3. **Pogodbe dogodkov** - Določa, katere dogodke komponente oddajajo in zahtevajo
4. **Preverjanje zaprtega kroga** - Zagotavlja, da imajo vse interakcije z uporabniškim vmesnikom obdelovalce končnega avtomata
5. **Sistem oblikovanja** - Vsebuje dejanske implementacije komponent

Ta arhitektura zagotavlja, da sheme ostanejo deklarativne, medtem ko prevajalnik obravnava kompleksnost ožičenja komponent v sistem končnih avtomatov, voden z dogodki.

---

*Za več podrobnosti o povezanih konceptih, glej [Lastnosti](/core-concepts/traits) in [Zaprti Krog](/core-concepts/closed-circuit).*
