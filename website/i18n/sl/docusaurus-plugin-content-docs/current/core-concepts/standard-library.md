# Standardna Knjižnica

> Standardne knjižnice vedenj za Almadar aplikacije

---

## 1. Pregled

Standardna knjižnica zagotavlja **34 ponovno uporabnih vedenj** (standardnih lastnosti) za Orbital sistem. Vsako vedenje je samostojna `OrbitalSchema`, ki lahko deluje kot samostojna `.orb` datoteka.

### Kategorije vedenj

| Kategorija | Vedenja |
|------------|---------|
| **Jedro igre** | GameLoop, Physics2D, Input, Collision |
| **Entiteta igre** | Health, Score, Movement, Combat, Inventory |
| **Uporabniški vmesnik igre** | GameFlow, Dialogue, LevelProgress |
| **Interakcija z uporabniškim vmesnikom** | List, Detail, Form, Modal, Drawer, Tabs, Wizard, MasterDetail, Filter |
| **Upravljanje podatkov** | Pagination, Selection, Sort, Filter, Search |
| **Asinhrono** | Loading, Fetch, Submit, Retry, Poll |
| **Povratne informacije** | Notification, Confirmation, Undo |

---

## 2. Struktura vedenja (OrbitalSchema)

Vsako vedenje je popolna `OrbitalSchema` (znana tudi kot `BehaviorSchema`):

```typescript
import type { BehaviorSchema } from '@almadar/std';

export const LIST_BEHAVIOR: BehaviorSchema = {
  name: 'std-list',
  version: '1.0.0',
  description: 'Seznam entitet z izbiro in dejanji',
  orbitals: [{
    name: 'ListOrbital',
    entity: {
      name: 'ListState',
      persistence: 'runtime',
      fields: [
        { name: 'id', type: 'string', required: true },
        { name: 'selectedId', type: 'string', default: null },
        { name: 'items', type: 'array', default: [] },
      ],
    },
    traits: [{
      name: 'List',
      linkedEntity: 'ListState',
      category: 'interaction',
      stateMachine: {
        states: [
          { name: 'Empty', isInitial: true },
          { name: 'Loaded' },
          { name: 'ItemSelected' },
        ],
        events: [/* ... */],
        transitions: [/* ... */],
      },
    }],
    pages: [],
  }],
};
```

### Ključne točke strukture

- **`name`**: Kebab-case s predpono `std-` (npr. `std-list`, `std-gameloop`)
- **`orbitals`**: Polje, ki vsebuje en orbital z entiteto, lastnostmi in stranmi
- **`entity`**: Polja stanja runtime
- **`traits`**: Polje definicij lastnosti z `linkedEntity`
- **`pages`**: Prazno polje (obvezno glede na tip, lahko se zapolni za strani)

---

## 3. Preverjanje vzorca z varnostjo tipov

### Unija PatternType

Učinek `render-ui` uveljavlja veljavne vrste vzorcev ob času prevajanja:

```typescript
import type { PatternConfig } from '@almadar/core';

export interface PatternConfig {
  type: PatternType;  // 203 veljavnih vzorcev
  [key: string]: unknown;
}
```

Unija `PatternType` vključuje vse registrirane vzorce:

```typescript
export type PatternType =
  | 'entity-table'
  | 'card'
  | 'form'
  | 'button'
  // ... 199 dodatnih vzorcev
  ;
```

### Uporaba v vedenjih

```typescript
// ✅ Veljavno - 'entity-table' s tipiziranimi lastnostmi
['render-ui', 'main', { patternType: 'entity-table', columns: ['name', 'email'] }]

// ❌ Napaka TypeScript - 'fake-pattern' ni veljaven PatternType
['render-ui', 'main', { patternType: 'fake-pattern' }]

// ❌ Napaka TypeScript - manjka obvezna lastnost 'columns'
['render-ui', 'main', { patternType: 'entity-table' }]
```

---

## 4. Uporaba

### Uvoz vedenj

```typescript
import { 
  LIST_BEHAVIOR,
  FORM_BEHAVIOR,
  LOADING_BEHAVIOR,
  STANDARD_BEHAVIORS,
} from '@almadar/std';

// Dostop do vseh 34 vedenj
console.log(STANDARD_BEHAVIORS.length); // 34
```

### Uvozi tipov

```typescript
import type { 
  BehaviorSchema,   // Alias OrbitalSchema
  OrbitalSchema,    // Poln tip sheme
  Orbital,          // Posamezen orbital
  Entity,           // Definicija entitete
} from '@almadar/std';
```

### Funkcije registra

```typescript
import { 
  getBehavior,
  isKnownBehavior,
  getAllBehaviorNames,
  getBehaviorLibraryStats,
} from '@almadar/std';

// Pridobi vedenje po imenu
const list = getBehavior('std-list');

// Preveri, če je veljavno
if (isKnownBehavior('std-form')) { /* ... */ }

// Pridobi statistiko
const stats = getBehaviorLibraryStats();
// { totalBehaviors: 34, totalStates: X, totalEvents: X, ... }
```

---

## Popolna referenca vedenj (34 vedenj)

### Vedenja iger (12)

| Vedenje | Opis | Stanja | Dogodki |
|---------|------|--------|---------|
| `GAME_LOOP_BEHAVIOR` | Glavna igralna zanka z update/render | Paused, Running | START, PAUSE, RESUME |
| `PHYSICS_2D_BEHAVIOR` | 2D fizikalna simulacija | Static, Dynamic | COLLISION, APPLY_FORCE |
| `INPUT_BEHAVIOR` | Obravnava vhoda (tipkovnica, miška, dotik) | Idle, Active | KEY_DOWN, KEY_UP, CLICK |
| `COLLISION_BEHAVIOR` | Zaznavanje trkov | Clear, Colliding | ENTER, EXIT |
| `HEALTH_BEHAVIOR` | Sistem zdravja/škode | Healthy, Damaged, Dead | DAMAGE, HEAL, REVIVE |
| `SCORE_BEHAVIOR` | Sistem točk/ocenjevanja | Idle, Updating | ADD_POINTS, RESET |
| `MOVEMENT_BEHAVIOR` | Premikanje entitete | Idle, Moving | MOVE, STOP, TELEPORT |
| `COMBAT_BEHAVIOR` | Borbni mehanizmi | Peaceful, InCombat, Cooldown | ATTACK, DEFEND, DODGE |
| `INVENTORY_BEHAVIOR` | Inventar predmetov | Empty, HasItems | ADD_ITEM, REMOVE_ITEM |
| `GAME_FLOW_BEHAVIOR` | Upravljanje stanja igre | Menu, Playing, Paused, GameOver | START, PAUSE, RESUME, END |
| `DIALOGUE_BEHAVIOR` | Sistem dialogov NPC | Idle, Active | START_DIALOGUE, ADVANCE, END |
| `LEVEL_PROGRESS_BEHAVIOR` | Sledenje ravni/nalog | InProgress, Completed | COMPLETE_OBJECTIVE, UNLOCK |

### Vedenja interakcije z uporabniškim vmesnikom (9)

| Vedenje | Opis | Primer uporabe |
|---------|------|----------------|
| `LIST_BEHAVIOR` | Seznam entitet z izbiro | Podatkovne tabele, seznami |
| `DETAIL_BEHAVIOR` | Prikaz posamezne entitete | Podrobnost predmeta, profil |
| `FORM_BEHAVIOR` | Obravnava obrazca | Obrazci za ustvarjanje/urejanje |
| `MODAL_BEHAVIOR` | Modalno dialog okno | Opozorila, potrditve |
| `DRAWER_BEHAVIOR` | Predalna plošča na strani | Navigacija, filtri |
| `TABS_BEHAVIOR` | Vmesnik z zavihki | Razdelki vsebine |
| `WIZARD_BEHAVIOR` | Večkoraki čarovnik | Uvod, blagajna |
| `MASTER_DETAIL_BEHAVIOR` | Postavitev master-detail | E-pošta, raziskovalec datotek |
| `FILTER_BEHAVIOR` | Filtriranje podatkov | Rezultati iskanja, seznami |

### Vedenja upravljanja podatkov (5)

| Vedenje | Opis | Funkcije |
|---------|------|----------|
| `PAGINATION_BEHAVIOR` | Listanje po podatkih | Velikost strani, navigacija |
| `SELECTION_BEHAVIOR` | Večkratna izbira elementov | Izberi vse, izbira obsega |
| `SORT_BEHAVIOR` | Razvrščanje stolpcev podatkov | Večstolpčno razvrščanje |
| `SEARCH_BEHAVIOR` | Iskanje po celotnem besedilu | Odmaknjeno, filtri |

### Asinhrona vedenja (5)

| Vedenje | Opis | Stanja |
|---------|------|--------|
| `LOADING_BEHAVIOR` | Stanja nalaganja | Idle, Loading, Success, Error |
| `FETCH_BEHAVIOR` | Pridobivanje podatkov | Fresh, Stale, Refreshing |
| `SUBMIT_BEHAVIOR` | Pošiljanje obrazca | Ready, Submitting, Submitted |
| `RETRY_BEHAVIOR` | Ponovni poskus z umikom | Failed, Retrying, Recovered |
| `POLL_BEHAVIOR` | Polling posodobitev | Polling, Stopped |

### Vedenja povratnih informacij (3)

| Vedenje | Opis | Funkcije |
|---------|------|----------|
| `NOTIFICATION_BEHAVIOR` | Toast obvestila | Samodejno zapri, dejanja |
| `CONFIRMATION_BEHAVIOR` | Potrdi dejanja | V redu/Prekliči, gumbi po meri |
| `UNDO_BEHAVIOR` | Sklad razveljavi/ponovi | Časovno omejeno razveljavitev |

---

## API referenca

### Register vedenj

```typescript
// Pridobi posamezno vedenje
import { getBehavior } from '@almadar/std';

// Preveri, če obstaja
import { isKnownBehavior } from '@almadar/std';

// Naštej vsa
import { getAllBehaviorNames, getAllBehaviors } from '@almadar/std';

// Metapodatki
import { getAllBehaviorMetadata } from '@almadar/std';

// Poišči po primeru uporabe
import { findBehaviorsForUseCase } from '@almadar/std';

// Filtriranje dogodkov
import { getBehaviorsForEvent } from '@almadar/std';

// Filtriranje stanj
import { getBehaviorsWithState } from '@almadar/std';

// Preverjanje
import { validateBehaviorReference } from '@almadar/std';
```

### Operatorji standardne knjižnice

```typescript
// Matematične operacije
import { MATH_OPERATORS } from '@almadar/std';

// Operacije z nizi
import { STR_OPERATORS } from '@almadar/std';

// Operacije s polji
import { ARRAY_OPERATORS } from '@almadar/std';

// Operacije z objekti
import { OBJECT_OPERATORS } from '@almadar/std';

// Operacije s časom
import { TIME_OPERATORS } from '@almadar/std';

// Preverjanje
import { VALIDATE_OPERATORS } from '@almadar/std';

// Oblikovanje
import { FORMAT_OPERATORS } from '@almadar/std';

// Asinhrona pripomočka
import { ASYNC_OPERATORS } from '@almadar/std';
```

### Dostop do registra

```typescript
// Iskanje vseh operatorjev
import {
  STD_OPERATORS,
  STD_OPERATORS_BY_MODULE,
  getStdOperatorMeta,
  isKnownStdOperator,
} from '@almadar/std';

// Poizvedbe po modulih
import {
  getModuleOperators,
  getAllStdOperators,
  getStdOperatorsByModule,
} from '@almadar/std';

// Klasifikacija
import {
  getLambdaOperators,
  getStdEffectOperators,
  getStdPureOperators,
} from '@almadar/std';

// Preverjanje
import {
  validateStdOperatorArity,
  isStdGuardOperator,
  isStdEffectOperator,
} from '@almadar/std';
```

### Generiranje dokumentacije

```typescript
import {
  generateOperatorDoc,
  generateModuleDoc,
  generateBehaviorDoc,
  generateModulesDocs,
  generateBehaviorsDocs,
  generateStdLibDocs,
} from '@almadar/std';
```
