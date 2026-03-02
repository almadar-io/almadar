# Entitete

> Kako entitete delujejo v Almadar arhitekturi - od definicije sheme do izvajanja v runtime okolju.

---

## Pregled

V Almadar je **Entiteta** podatkovni model v jedru vsake Orbitalne enote. Osnovna kompozicija je:

```
Orbitalna enota = Entiteta + Lastnosti (Traits) + Strani (Pages)
```

Entitete definirajo obliko podatkov, medtem ko Lastnosti definirajo vedenje (končni avtomati), ki delujejo na teh podatkih. Povezava med njima je eksplicitna in varna glede na tip.



## Definicija entitete

Entiteta je definirana v `.orb` shemi z naslednjo strukturo:

```json
{
  "name": "Task",
  "collection": "tasks",
  "fields": [
    { "name": "id", "type": "string", "required": true, "primaryKey": true },
    { "name": "title", "type": "string", "required": true },
    { "name": "status", "type": "enum", "values": ["pending", "active", "done"] },
    { "name": "assigneeId", "type": "relation", "relation": { "entity": "User", "cardinality": "one" } },
    { "name": "dueDate", "type": "date" },
    { "name": "tags", "type": "array", "items": { "type": "string" } }
  ]
}
```

### Lastnosti entitete

| Lastnost | Obvezno | Opis |
|----------|---------|------|
| `name` | Da | PascalCase identifikator (npr. `Task`, `User`, `GameState`) |
| `collection` | Za trajne | Ime zbirke v bazi podatkov (npr. `tasks`, `users`) |
| `persistence` | Ne | Način shranjevanja: `persistent`, `runtime`, ali `singleton` |
| `fields` | Da | Polje definicij polj |

---

## Vrste polj

Almadar podpira naslednje vrste polj:

| Vrsta | Opis | Primer | TypeScript | Shranjevanje |
|-------|------|--------|------------|--------------|
| `string` | Besedilni podatki | `"hello"` | `string` | String |
| `number` | Številske vrednosti (float) | `42.5` | `number` | Number |
| `boolean` | Resnično/neresnično | `true` | `boolean` | Boolean |
| `date` | Datum brez časa | `"2026-03-01"` | `Date` | ISO string |
| `datetime` | Datum s časom | `"2026-03-01T10:30:00Z"` | `Date` | ISO string |
| `timestamp` | Milisekunde od epohi | `1709312400000` | `number` | Number |
| `array` | Zbirka vrednosti | `["a", "b"]` | `T[]` | Array |
| `object` | Strukturirani podatki | `{ key: "value" }` | `Record<string, unknown>` | JSON |
| `enum` | Poimenovane konstante | `"pending"` | Union type | String |
| `relation` | Sklic na entiteto | `"user_123"` | `string` (FK) | String |

### Lastnosti polja

```json
{
  "name": "status",
  "type": "enum",
  "required": true,
  "values": ["pending", "active", "done"],
  "default": ["quote", "pending"]
}
```

| Lastnost | Opis |
|----------|------|
| `name` | camelCase identifikator polja |
| `type` | Ena izmed podprtih vrst polj |
| `required` | Ali mora polje imeti vrednost |
| `primaryKey` | Označuje polje primarnega ključa |
| `unique` | Uveljavlja omejitev enoličnosti |
| `default` | Privzeta vrednost (kot S-izraz) |
| `values` | Za vrsto `enum` - polje dovoljenih vrednosti |
| `items` | Za vrsto `array` - definicija tipa elementa |
| `properties` | Za vrsto `object` - ugnezdene definicije polj |
| `relation` | Za vrsto `relation` - ciljna entiteta in kardinalnost |

### Polja relacij

Relacije povezujejo entitete med seboj:

```json
{
  "name": "assigneeId",
  "type": "relation",
  "relation": {
    "entity": "User",
    "cardinality": "one"
  },
  "required": false
}
```

**Možnosti kardinalnosti:**
- `one` - Enojni sklic (tuji ključ)
- `many` - Več sklicev (polje ID-jev)

---

## Vrste trajnosti entitet

Entitete imajo tri načine trajnosti, ki temeljito spremenijo njihovo shranjevanje in deljenje:

### 1. Trajne entitete

**Shranjevanje:** Baza podatkov (Firestore, PostgreSQL, itd.)
**Življenjska doba:** Preživi ponovne zagon, deljeno med sejami
**Zbiralnik:** Obvezen - eksplicitno poimenovanje
**Privzeto:** Če `persistence` ni določeno, je privzeto `persistent`

```json
{
  "name": "Task",
  "persistence": "persistent",  // Opcijsko - privzeto "persistent", če ni navedeno
  "collection": "tasks",
  "fields": [...]
}
```

**Značilnosti:**
- Vsi orbitali, ki se sklicujejo na isto ime entitete, delijo isto zbirko
- CRUD operacije potekajo skozi adapter za trajnost
- Primerno za domenske objekte (Task, User, Order, Product)

### 2. Runtime entitete

**Shranjevanje:** Samo v pomnilniku (JavaScript/Python objekti)
**Življenjska doba:** Izgubljeno ob ponovnem zagonu/koncu seje
**Zbiralnik:** Noben

```json
{
  "name": "Enemy",
  "persistence": "runtime",
  "fields": [...]
}
```

**Značilnosti:**
- **Izolirano po orbitalu** - vsak orbital dobi svoje instance
- Ni operacij z bazo podatkov
- Primerno za začasno stanje (Enemy, Projectile, Particle)
- Pogosto v igrah, kjer se entitete pogosto pojavljajo in izginjajo

### 3. Singleton entitete

**Shranjevanje:** Pomnilnik (ena instanca)
**Življenjska doba:** Ena instanca na sejo
**Zbiralnik:** Noben (en zapis)

```json
{
  "name": "Player",
  "persistence": "singleton",
  "fields": [...]
}
```

**Značilnosti:**
- Eno instanco delijo vsi orbitali
- Dostopno preko vezave `@EntityName` (npr. `@Player.health`)
- Primerno za globalno stanje (Player, GameConfig, Settings)

### Primerjava trajnosti

| Vidik | Trajno | Runtime | Singleton |
|-------|--------|---------|-----------|
| Shranjevanje | Baza podatkov | Pomnilnik | Pomnilnik |
| Življenjska doba | Trajno | Seja | Seja |
| Deljenje | Deljeno po imenu | Izolirano po orbitalu | Ena instanca |
| Zbirka | Obvezen | Noben | Noben |
| Primer uporabe | Domenski objekti | Igralne entitete | Globalna konfiguracija |

---

## Vezave entitet v S-izrazih


### Osnovne vezave

| Vezava | Opis | Primer |
|--------|------|--------|
| `@entity` | Trenutna instanca entitete | `@entity.status`, `@entity.id` |
| `@payload` | Podatki tovora dogodka | `@payload.newStatus`, `@payload.amount` |
| `@state` | Ime trenutnega stanja lastnosti | `@state` vrne `"active"` |
| `@now` | Trenutni časovni žig (ms) | `@now` vrne `1709312400000` |
| `@user` | Podatki o avtenticiranem uporabniku | `@user.id`, `@user.email` |
| `@EntityName` | Singleton entiteta | `@Player.health`, `@GameConfig.level` |

### Uporaba v varovalkah

Varovalke uporabljajo vezave za preverjanje pogojev pred prehodi:

```json
{
  "from": "active",
  "to": "completed",
  "event": "COMPLETE",
  "guards": [
    [">=", "@entity.progress", 100],
    ["=", "@entity.assigneeId", "@user.id"]
  ]
}
```

### Uporaba v učinkih

Učinki uporabljajo vezave za branje in spreminjanje podatkov:

```json
{
  "effects": [
    ["set", "@entity.id", "status", "@payload.newStatus"],
    ["set", "@entity.id", "updatedAt", "@now"],
    ["increment", "@entity.id", "completionCount", 1]
  ]
}
```

### Navigacija po poti

Vezave podpirajo točkovno notacijo za ugnezden dostop:

```
@entity.user.name          → entity.user.name
@payload.metadata.tags[0]  → payload.metadata.tags[0]
@Player.inventory.slots    → Player.inventory.slots
```

### Postopek razrešitve vezav

1. **Razčleni** - Izloči `@` predpono in korensko ime
2. **Poišči** - Preveri lokalne (iz `let`), nato osnovne vezave
3. **Navigiraj** - Sledi točkovni poti skozi strukturo objekta
4. **Vrni** - Vrednost ali `undefined`, če pot spodleti

---

## Povezava Lastnost-Entiteta (linkedEntity)

Lastnosti so končni avtomati, ki delujejo na entitetah. Povezava med lastnostjo in njeno entiteto je eksplicitna.

### Primarna entiteta

Vsak orbital ima **primarno entiteto** - entiteto definirano v njegovi lastnosti `entity`:

```json
{
  "name": "TaskManagement",
  "entity": {
    "name": "Task",
    "collection": "tasks",
    "fields": [...]
  },
  "traits": [...]
}
```

Lastnosti v tem orbitalu samodejno imajo dostop do `Task` preko `@entity`.

### Lastnost linkedEntity

Ko sklicujete lastnost, lahko določite, na katero entiteto naj deluje:

```json
{
  "traits": [
    {
      "ref": "StatusManagement",
      "linkedEntity": "Task"
    },
    {
      "ref": "HealthManagement",
      "linkedEntity": "Player"
    }
  ]
}
```

**Zakaj linkedEntity?**

1. **Ponovno uporabne lastnosti** - Splošna lastnost `StatusManagement` lahko deluje z vsako entiteto, ki ima polje `status`
2. **Operacije med entitetami** - Lastnost lahko deluje na drugi entiteti kot je primarna orbitala
3. **Eksplicitna vezava** - Naredi odvisnost entitete jasno in preverljivo glede na tip

### Kako deluje

Ko je lastnost instancirana:

```typescript
const linkedEntity = traitDef.linkedEntity || orbitalEntityName;
this.traitEntityMap.set(trait.name, linkedEntity);
```

1. Če je `linkedEntity` določeno, uporabi to
2. Sicer uporabi primarno entiteto orbitala
3. Shrani preslikavo za razrešitev v runtime okolju

### Primer: Multi-entitetni orbital

```json
{
  "name": "GameLevel",
  "entity": {
    "name": "Level",
    "persistence": "runtime",
    "fields": [...]
  },
  "traits": [
    { "ref": "LevelProgression", "linkedEntity": "Level" },
    { "ref": "PlayerHealth", "linkedEntity": "Player" },
    { "ref": "ScoreTracking", "linkedEntity": "GameState" }
  ]
}
```

Vsaka lastnost deluje na svoji določeni entiteti, vendar so vse del istega orbitala.

---

## Obravnavanje v runtime okolju

Runtime upravlja entitete v runtime okolju skozi naslednje mehanizme:

### Tok obdelave dogodkov

1. **Prejmi dogodek** - `{ event: "UPDATE", payload: {...}, entityId: "task_123" }`
2. **Razreši entiteto** - Naloži podatke entitete iz trajnosti ali pomnilnika
3. **Zgradi kontekst** - Ustvari kontekst vrednotenja z vezavami
4. **Preveri varovalke** - Ovrednoti izraze varovalk
5. **Izvedi učinke** - Zaženi učinke spremembe stanja
6. **Trajno shrani spremembe** - Shrani spremenjene podatke entitete
7. **Vrni odziv** - Vključi posodobljene podatke in učinke odjemalca

### Vmesnik adapterja za trajnost

```typescript
interface PersistenceAdapter {
  create(entityType: string, data: Record<string, unknown>): Promise<{ id: string }>;
  update(entityType: string, id: string, data: Record<string, unknown>): Promise<void>;
  delete(entityType: string, id: string): Promise<void>;
  getById(entityType: string, id: string): Promise<Record<string, unknown> | null>;
  list(entityType: string): Promise<Record<string, unknown>[]>;
}
```

---

## Mock način vs. Real način

Runtime podpira dva načina za trajnost entitet:

### Mock način (Razvoj)

**Konfiguracija:**
```typescript
const runtime = new OrbitalServerRuntime({
  mode: 'mock',
  mockSeed: 12345  // Opcijsko: deterministični podatki
});
```

**Značilnosti:**
- Uporablja MockPersistenceAdapter
- Generira realistične lažne podatke
- Shranjevanje v pomnilnik (brez baze podatkov)
- Generiranje glede na vrsto polja (e-pošta izgleda kot e-pošta, datumi so veljavni datumi)
- Deterministično s semenom za ponovljivo testiranje
- Samodejno sejanje konfiguriranega števila zapisov na entiteto

**Generiranje glede na vrsto polja:**

| Vrsta polja | Generirani podatki |
|-------------|-------------------|
| `string` | Lorem besede |
| `string` (ime: "email") | E-poštni naslov |
| `string` (ime: "name") | Polno ime |
| `number` | Naključno celo število |
| `boolean` | Naključno boolean |
| `date` | Nedavni datum |
| `enum` | Naključna vrednost iz polja `values` |

### Real način (Produkcija)

**Konfiguracija:**
```typescript
const runtime = new OrbitalServerRuntime({
  mode: 'real',
  persistence: new FirestorePersistenceAdapter(db)
});
```

**Značilnosti:**
- Uporablja implementacijo adapterja za trajnost po meri
- Prave operacije z bazo podatkov (Firestore, PostgreSQL, itd.)
- Asinhrone CRUD operacije
- Produkcijsko pripravljena trajnost

### Primerjava načinov

| Vidik | Mock način | Real način |
|-------|------------|------------|
| Trajnost | V pomnilniku | Baza podatkov |
| Vir podatkov | Generirano | Pravi uporabniški podatki |
| Determinizem | Z možnostjo semena | N/A |
| Primer uporabe | Razvoj, testiranje | Produkcija |
| Nastavitev | Brez konfiguracije | Zahteva adapter |

---

## Deljenje in izolacija entitet

Kako se entitete delijo med orbitali je odvisno od vrste trajnosti:

### Trajne entitete (Deljene)

Vsi orbitali, ki uporabljajo isto ime entitete, delijo isto zbirko:

```
Orbital A (entiteta: Task) ──┐
                             ├──► Zbirka: "tasks"
Orbital B (entiteta: Task) ──┘
```

Spremembe v Orbitalu A so vidne v Orbitalu B.

### Runtime entitete (Izolirane)

Vsak orbital dobi svoje instance:

```
Orbital A (entiteta: Enemy) ──► Pomnilnik: "OrbitalA_enemies"
Orbital B (entiteta: Enemy) ──► Pomnilnik: "OrbitalB_enemies"
```

Nasprotniki Orbitala A so popolnoma ločeni od nasprotnikov Orbitala B.

### Singleton entitete (Ena instanca)

Ena instanca, deljena med vsemi:

```
Orbital A ──┐
Orbital B ──┼──► Ena instanca Playerja
Orbital C ──┘
```

Vsi orbitali vidijo in spreminjajo iste podatke `Player`.

---

## Povzetek

Sistem entitet Almadar zagotavlja:

1. **Tipizirana polja** - Močno tipiziranje s string, number, boolean, date, enum, relation, array, object
2. **Načini trajnosti** - Trajno (baza podatkov), runtime (pomnilnik), singleton (globalno)
3. **Sistem vezav** - `@entity`, `@payload`, `@state`, `@now`, `@user`, `@Singleton` za dostop v S-izrazih
4. **Vezava lastnosti** - Ekspliciten `linkedEntity` povezuje lastnosti z njihovim virom podatkov
5. **Preverjanje s prevajalnikom** - Preverjanje sheme zagotavlja pravilnost
6. **Prilagodljiv runtime** - Mock način za razvoj, real način za produkcijo
7. **Nadzor nad deljenjem** - Trajno deluje, runtime izolira, singleton je globalen

Entiteta je temelj Orbitalne enote - lastnosti delujejo na njej, strani jo prikazujejo, runtime pa upravlja njen življenjski cikel.

---

*Dokument ustvarjen: 2026-02-02*
*Temelji na analizi kode Almadar*
