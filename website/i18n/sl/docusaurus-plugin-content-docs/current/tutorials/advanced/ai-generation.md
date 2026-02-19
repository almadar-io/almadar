# Generiranje shem z LLM (Generating Schemas with an LLM)

Almadar sheme so strukturiran JSON — in ta struktura jih naredi idealne cilje za generiranje z jezikovnimi modeli (LLM). Opišete svojo aplikacijo v naravnem jeziku; LLM izpiše veljavno `.orb` shemo.

Ta vadnica pokriva:
- Namestitev in uporabo Almadar veščine (Almadar Skill)
- Poizvedovanje LLM za generiranje celotne sheme
- Validacija izhoda
- Odpravljanje najpogostejših napak, ki jih naredijo LLM-ji

---

## Almadar veščina (The Almadar Skill)

Paket `@almadar/skills` vključuje veščino Claude Code (Claude Code Skill), ki nauči LLM celotno specifikacijo jezika Almadar — orbitale, entitete, traite, state machine-e, vzorce, S-izraze in več.

### Namestitev (Install)

```bash
npm install -g @almadar/skills
```

Nato namestite veščino Claude Code:

```bash
almadar-skills install almadar-orbitals
```

Ali jo uporabite neposredno v Claude Code z referenco na datoteko veščine v svoji seji.

---

## Potek generiranja (The Generation Workflow)

```
1. Opišite svojo aplikacijo v naravnem jeziku
       ↓
2. LLM razstavi na orbitale (en za vsako entitetno domeno)
       ↓
3. LLM generira: entiteta + traiti + state machine-i + strani
       ↓
4. Validacija: almadar validate schema.orb
       ↓
5. Odpravite napake, ponovite
       ↓
6. Zaženite: almadar dev
```

---

## Kako poizvedovati za shemo (How to Prompt for a Schema)

### Poizvedba za razstavljanje (The Decomposition Prompt)

Začnite z zahtevo LLM-ju, da razstavi vašo aplikacijo na orbitale pred pisanjem JSON:

```
Želim zgraditi aplikacijo za upravljanje projektov z:
- Projekti (ime, opis, status: aktiven/arhiviran)
- Nalogami (naslov, prioriteta, dodeljenec, rok, povezano s projektom)
- Uporabniki (ime, e-pošta, vloga: skrbnik/član)

Naloge je mogoče ustvariti, urediti, izbrisati in premikati skozi stanja:
za narediti → v teku → pregled → dokončano.

Ko je naloga dokončana, naj se posodobi število dokončanih nalog projekta.

Prosim razstavite to v Almadar orbitale in generirajte celotno shemo.
```

### Kaj vključiti v svojo poizvedbo (What to Include in Your Prompt)

Dobra poizvedba za generiranje pokriva:

| Element | Primer |
|---------|--------|
| **Entitete (Entities)** | "Naloge imajo naslov, prioriteto (nizka/srednja/visoka), rok, dodeljenec" |
| **Vztrajnost (Persistence)** | "Naloge so persistentne (shranjene v bazi), košarica je runtime (samo za sejo)" |
| **Delovni tokovi (Workflows)** | "Naloge se premikajo od za narediti → v teku → pregled → dokončano" |
| **UI vedenja (UI behaviors)** | "Uporabniki lahko pregledujejo, ustvarjajo, urejajo in brišejo naloge na strani /tasks" |
| **Poslovna pravila (Business rules)** | "Samo dodeljenec lahko označi nalogo kot dokončano" |
| **Povezave (Connections)** | "Ko je naloga dokončana, posodobi števec projekta" |
| **Potrebne strani (Pages needed)** | "Potrebujem poti /tasks, /projects in /users" |

---

## Kaj mora LLM proizvesti (What the LLM Should Produce)

Za vsak orbital mora LLM izpisati vse štiri zahtevane dele:

```json
{
  "name": "AppName",
  "version": "1.0.0",
  "orbitals": [
    {
      "name": "OrbitalName",
      "entity": {
        "name": "EntityName",
        "persistence": "persistent",
        "collection": "collection_name",
        "fields": [...]
      },
      "traits": [
        {
          "name": "TraitName",
          "linkedEntity": "EntityName",
          "category": "interaction",
          "stateMachine": {
            "states": [...],
            "events": [...],
            "transitions": [...]
          }
        }
      ],
      "pages": [
        {
          "name": "PageName",
          "path": "/route",
          "traits": [{ "ref": "TraitName", "linkedEntity": "EntityName" }]
        }
      ]
    }
  ]
}
```

---

## Najpogostejše napake LLM-jev (The Most Common LLM Mistakes)

LLM-ji brez naložene Almadar veščine naredijo predvidljive napake. Naučite se jih prepoznati.

### 1. Manjkajoče `pages` (najpogosteje — Missing pages)

LLM generira entiteto + traite, a pozabi na celotno matriko strani.

```json
// ❌ Nepopolno — brez strani
{
  "name": "TaskManager",
  "orbitals": [{
    "name": "Tasks",
    "entity": { ... },
    "traits": [ { "name": "TaskCRUD", ... } ]
  }]
}

// ✅ Dodajte strani
{
  "name": "TaskManager",
  "orbitals": [{
    "name": "Tasks",
    "entity": { ... },
    "traits": [ { "name": "TaskCRUD", ... } ],
    "pages": [
      { "name": "TaskListPage", "path": "/tasks", "traits": [{ "ref": "TaskCRUD", "linkedEntity": "Task" }] }
    ]
  }]
}
```

**Poizvedba za popravek:** `"Shemi manjka matrika pages za vsak orbital. Prosim dodajte strani z path in traits[].ref za vsak orbital."`

---

### 2. Stanja kot nizi namesto objektov (States as strings instead of objects)

```json
// ❌ Napačno
"states": ["Pending", "InProgress", "Done"]

// ✅ Pravilno
"states": [
  { "name": "Pending", "isInitial": true },
  { "name": "InProgress" },
  { "name": "Done", "isTerminal": true }
]
```

**Poizvedba za popravek:** `"Stanja morajo biti objekti z lastnostjo 'name'. Začetno stanje potrebuje 'isInitial': true. Terminalna stanja potrebujejo 'isTerminal': true."`

---

### 3. Manjkajoč prehod INIT (Missing INIT transition)

Stran se naloži, vendar ne prikaže ničesar, ker ni INIT samo-zanke z `render-ui`.

```json
// ❌ Brez INIT — stran je prazna
"transitions": [
  { "from": "Pending", "event": "COMPLETE", "to": "Done", "effects": [...] }
]

// ✅ Dodajte INIT
"transitions": [
  {
    "from": "Pending", "event": "INIT", "to": "Pending",
    "effects": [
      ["fetch", "Task"],
      ["render-ui", "main", { "type": "entity-table", "entity": "Task" }]
    ]
  },
  { "from": "Pending", "event": "COMPLETE", "to": "Done", "effects": [...] }
]
```

**Poizvedba za popravek:** `"Vsak interakcijski trait potrebuje prehod INIT (samo-zanka), ki sproži render-ui za prikaz začetnega UI. Brez njega bo stran prazna."`

---

### 4. Uporaba zastarelih lastnosti akcij (Using deprecated action props)

```json
// ❌ Zastarelo — to ne bo prestalo validacije
{ "type": "form-section", "onSubmit": "SAVE", "onCancel": "CANCEL" }

// ✅ Pravilno
{ "type": "form-section", "submitEvent": "SAVE", "cancelEvent": "CANCEL" }
```

```json
// ❌ Zastarelo
{ "type": "page-header", "headerActions": [...] }

// ✅ Pravilno
{ "type": "page-header", "actions": [...] }
```

---

### 5. Matrika traitov na ravni sheme (Schema-level traits array — wrong structure)

```json
// ❌ Napačno — traiti na korenski ravni (zastareli format)
{
  "name": "App",
  "traits": [...],
  "pages": [...]
}

// ✅ Pravilno — traiti živijo znotraj orbitalov
{
  "name": "App",
  "orbitals": [{
    "name": "FeatureName",
    "entity": { ... },
    "traits": [...],
    "pages": [...]
  }]
}
```

---

### 6. Manjkajoč `linkedEntity` na traitu (Missing linkedEntity on trait)

```json
// ❌ Manjka linkedEntity
{ "name": "TaskCRUD", "category": "interaction", "stateMachine": { ... } }

// ✅ Pravilno
{ "name": "TaskCRUD", "linkedEntity": "Task", "category": "interaction", "stateMachine": { ... } }
```

---

## Iterativno generiranje za velike aplikacije (Iterative Generation for Large Apps)

Za aplikacije z več kot 3-4 orbitali generirajte en orbital naenkrat:

```
Korak 1: "Generiraj samo orbital TaskManager (entiteta + traiti + strani)"
Korak 2: "Zdaj dodaj orbital ProjectManager, ki posluša TASK_COMPLETED iz TaskManager"
Korak 3: "Zdaj dodaj orbital UserManager za brskanje po uporabnikih"
Korak 4: "Združi vse tri orbitale v eno shemo"
```

To zmanjša napake in naredi vsak del pregleden pred sestavljanjem.

---

## Validacija izhoda (Validating the Output)

Vedno validirajte pred zagonom:

```bash
almadar validate schema.orb
```

Pogoste napake pri validaciji in kaj pomenijo:

| Napaka | Vzrok |
|--------|-------|
| `Missing initial state` | Nobeno stanje nima `"isInitial": true` |
| `Unknown event in transition` | Prehod se sklicuje na ključ eventa, ki ni v matriki `events` |
| `Missing pages` | Orbital ima traite, a nima matrike `pages` |
| `Invalid pattern type` | `type` v efektu `render-ui` ni veljavno ime vzorca |
| `Deprecated prop` | Uporaba `onSubmit` namesto `submitEvent` itd. |
| `Circular dependency` | Dva orbitala poslušata drug drugega (uporabite tretji posredniški orbital) |

---

## Referenčna poizvedba (A Reference Prompt — Copy & Use)

Ta poizvedba dobro deluje z nameščeno Almadar veščino:

```
Z uporabo jezika Almadar generiraj celotno .orb shemo za: [OPIS VAŠE APLIKACIJE]

Zahteve:
- Vsaka funkcionalna domena postane en orbital z: entiteto, traiti, stranmi
- Vsak trait mora imeti INIT samo-zanko prehod, ki prikaže začetni UI z render-ui
- Stanja morajo biti objekti: { "name": "StateName", "isInitial": true }
- Strani morajo biti prisotne z vezavo path in traits[].ref
- Uporabite "submitEvent"/"cancelEvent" na form-section (ne onSubmit/onCancel)
- Uporabite "actions" na page-header (ne headerActions)
- Vsi traiti spadajo znotraj orbitalov — ni matrike traitov na ravni sheme

Potrebne entitete: [SEZNAM ENTITET]
Delovni tokovi: [OPIŠITE PREHODE STANJ]
Potrebne strani: [SEZNAM POT]
Poslovna pravila / dovoljenja: [OPIŠITE STRAŽE]
Medorbitalne povezave: [OPIŠITE EMITS/LISTENS, ČE OBSTAJAJO]
```

---

## Naslednji koraki

- [Anatomija popolnega orbitala (Complete Orbital)](../beginner/complete-orbital) — razumejte, kako izgleda veljavna shema
- [UI Vzorci in render-ui (UI Patterns)](../intermediate/ui-patterns) — vsi razpoložljivi tipi vzorcev in lastnosti
- [Komunikacija med orbitalnimi (Cross-Orbital Communication)](../intermediate/cross-orbital) — kako opisati emits/listens LLM-ju
- [Gradnja celovite aplikacije (Full App)](./full-app) — referenčni primer za prikaz LLM-ju
