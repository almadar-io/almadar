---
slug: learning-from-interruptions
title: "Učenje iz prekinitev: Kako naš AI zapomni vaše preference (ne da bi bil čudaški)"
authors: [osamah]
tags: [architecture, ai]
---

Vsakič, ko odobrite ali zavrnete AI-jevo akcijo, se uči. Po 5 odobritvah se ta akcija zgodi samodejno.

<!-- truncate -->

## Problem Human-in-the-Loop

AI agenti potrebujejo nadzor. Lahko:
- Izvedejo napačni ukaz
- Predlagajo nevarne operacije
- Naredijo drage API klice
- Dostopajo do občutljivih podatkov

Torej dodamo prekinitve:
```
AI: "Želim zagnati: rm -rf /data/old-logs"
[ODOBRI] [ZAVRZI] [SPREMENI]
```

Ampak to ustvarja trenje. Vsaka akcija potrebuje odobritev. AI se zdi počasen.

**Rešitev?** Učiti se iz prekinitev.

## Kako deluje Interrupt Memory

### Korak 1: Zabeleži odločitev

Ko odobrite ali zavrnete:

```typescript
await sessionManager.recordInterruptDecision(
  sessionId,
  userId,
  {
    toolName: 'execute',
    toolArgs: { command: 'rm -rf /data/old-logs' },
    decision: 'approved',
    reason: 'Varno čiščenje starih logov',
  }
);
```

To ustvari **InterruptRecord**:

```typescript
interface InterruptRecord {
  interruptId: string;
  sessionId: string;
  userId: string;
  toolName: string;
  toolArgs: Record<string, unknown>;
  decision: 'approved' | 'rejected' | 'modified';
  modifiedArgs?: Record<string, unknown>;
  reason?: string;
  timestamp: Date;
}
```

### Korak 2: Posodobi Tool Preference

Vsaka odločitev posodobi vaše **ToolApprovalPreference**:

```typescript
interface ToolApprovalPreference {
  userId: string;
  toolName: string;
  autoApprove: boolean;
  confidence: number;
  approvedCount: number;
  rejectedCount: number;
  lastDecisionAt: Date;
}
```

Algoritem učenja:

```typescript
// Po vsaki odločitvi
const approvedCount = previous.approvedCount + (decision === 'approved' ? 1 : 0);
const rejectedCount = previous.rejectedCount + (decision === 'rejected' ? 1 : 0);
const total = approvedCount + rejectedCount;
const approvalRate = approvedCount / total;

// Samodejno odobri, če:
// - Vsaj 5 odločitev (min velikost vzorca)
// - Stopnja odobritev > 80%
const autoApprove = total >= 5 && approvalRate > 0.8;

// Zaupanje raste z več podatki
const confidence = Math.min(0.95, total * 0.1);
```

### Korak 3: Samodejno odobri prihodnje akcije

Naslednjič ko AI želi uporabiti ta tool:

```typescript
const shouldAutoApprove = await sessionManager.shouldAutoApproveTool(
  userId,
  'execute'
);

if (shouldAutoApprove) {
  // Izvedi brez prekinitve
} else {
  // Pokaži dialog odobritve
}
```

## Primer iz resničnega sveta

**Teden 1: Nov uporabnik, vse prekinja**

| Akcija | Odločitev | Števec |
|--------|----------|-------|
| Izvedi `ls` | ✅ Odobreno | 1/0 |
| Izvedi `cat file.txt` | ✅ Odobreno | 2/0 |
| Izvedi `rm temp.txt` | ✅ Odobreno | 3/0 |
| Izvedi `git status` | ✅ Odobreno | 4/0 |
| Izvedi `git commit` | ✅ Odobreno | 5/0 |

**Teden 2: Vzorec se pojavi**

| Akcija | Odločitev | Statistika |
|--------|----------|-------|
| Izvedi `ls` | ✅ Samodejno odobreno | 6/0 (100%) |
| Izvedi `cat` | ✅ Samodejno odobreno | 4/0 (100%) |
| Izvedi `rm` | ⛔ Prekinja | 3/2 (60%) |
| Izvedi `npm publish` | ⛔ Prekinja | 1/3 (25%) |

**Rezultat:**
- Varni, pogosti ukazi se izvedejo takoj
- Destruktivne operacije še vedno potrebujejo odobritev
- Akcije z visokimi vložki vedno prekinjajo

## Zasebnost in nadzor

### Uporabniški nadzor

Uporabniki lahko:
- Ogledajo vse zabeležene odločitve
- Izbrišejo zgodovino prekinitev
- Onemogočijo samodejno odobritev globalno
- Zahtevajo odobritev za specifične toole

```typescript
// Onemogoči samodejno odobritev za nevarne toole
await memoryManager.updateToolPreference(userId, 'execute', {
  autoApprove: false,  // Vedno vprašaj za shell ukaze
});
```

### Kaj shranjujemo

✅ **Shranjujemo:**
- Imena toolov (execute, persist, call-service)
- Odločitev (approved/rejected)
- Timestamp
- Anonimizirane vzorce

❌ **Ne shranjujemo:**
- Občutljive vrednosti argumentov
- Vsebino datotek
- API odzive
- Gesla ali skrivnosti

### Transparentnost

Vsaka samodejno odobrena akcija je zabeležena:

```
[2025-04-11 10:23:45] Samodejno odobreno: execute
  Razlog: 95% stopnja odobritev čez 20 odločitev
  Uporabnik: user_123
  Seja: sess_456
```

## Krivulja učenja

Različni tooli se učijo z različnimi hitrostmi:

| Tool | Hitrost učenja | Zakaj |
|------|-------------|-----|
| `read_file` | Hitro | Nizko tveganje, konsistentno |
| `write_file` | Srednje | Srednje tveganje |
| `execute` | Počasi | Visoko tveganje, kontekstno odvisno |
| `call_service` | Nikoli | Vedno zahteva odobritev |

### Pragi zaupanja

```typescript
const THRESHOLDS = {
  read_file: { minDecisions: 3, minRate: 0.9 },
  write_file: { minDecisions: 5, minRate: 0.85 },
  execute: { minDecisions: 10, minRate: 0.9 },
  call_service: { minDecisions: Infinity, minRate: 1.0 }, // Nikoli samo
};
```

## Primer kode: Celoten potek

```typescript
// Internal: Almadar's interrupt learning system
// (This is how it works under the hood — not a public API)

const memoryManager = createMemoryManager(db);
const sessionManager = createSessionManager({
  memoryManager,
});

// Agent je ustvarjen z omogočenim učenjem prekinitev
const agent = createAgent({
  skill: 'kflow-orbitals',
  workDir: '/workspace',
  userId: 'user_123',
  // Interrupt config based on learned preferences
  noInterrupt: false,
});

// Poženi agenta
const result = await agent.run({
  input: 'Ustvari User entity',
});

// Med izvajanjem je uporabnik sprejel te odločitve:
// - Odobreno: execute 'ls'
// - Odobreno: execute 'orbital validate'
// - Odobreno: execute 'git status'
// - Zavrnjeno: execute 'rm -rf /'
// - Odobreno: execute 'orbital compile'

// Zabeleži vse prekinitve
for (const interrupt of result.interrupts) {
  await sessionManager.recordInterruptDecision(
    threadId,
    'user_123',
    {
      toolName: interrupt.toolName,
      toolArgs: interrupt.toolArgs,
      decision: interrupt.decision,
      reason: interrupt.reason,
    }
  );
}

// Preveri, kaj smo se naučili
const preferences = await memoryManager.getUserToolPreferences('user_123');
for (const pref of preferences) {
  console.log(`${pref.toolName}: ${pref.approvedCount}/${pref.rejectedCount} ` +
              `(${Math.round(pref.approvedCount/(pref.approvedCount+pref.rejectedCount)*100)}%) ` +
              `- Auto: ${pref.autoApprove}`);
}

// Output:
// execute: 4/1 (80%) - Auto: false (need 5+ at 80%)
// validate: 1/0 (100%) - Auto: false (need 3+ at 90%)
// compile: 1/0 (100%) - Auto: false
```

## Primerjava iz resničnega sveta: Pametni domači asistent

Mislite nanj kot na pameten dom:

**Teden 1:**
- Vi: "Ugasi luči"
- Asistent: "Ali naj ugasnem vse luči?" [Da] [Ne]
- Vi: [Da]

**Teden 2:**
- Vi: "Ugasi luči"
- Asistent: *Ugasi luči* (se je naučil, da vedno rečete da)

**Ampak:**
- Vi: "Odkleni vhodna vrata"
- Asistent: "Potrdi odklepanje?" [Da] [Ne]
- Vedno vpraša, ker varnost > udobje

Asistent se uči vzorcev, a spoštuje meje.

## Koristi

### Za uporabnike
- ✅ Manj trenja sčasoma
- ✅ Še vedno pod nadzorom
- ✅ Transparentno učenje
- ✅ Spoštovanje zasebnosti

### Za AI agente
- ✅ Hitrejše izvajanje
- ✅ Boljša uporabniška izkušnja
- ✅ Kontekstualno razumevanje
- ✅ Varno privzeto

### Za ekipe
- ✅ Konsistentni vzorci med uporabniki
- ✅ Sled odločitev za audit
- ✅ Identifikacija tveganega tool usage

## Spoznanje

Prekinitve ne morajo biti nadležne. Lahko so **priložnosti za učenje**.

Vsaka odobritev uči AI:
- Kaj štejete za varno
- Vaše preferirane workflowe
- Katere akcije potrebujejo skrbni pregled

Sčasoma AI postane razširitev vašega namena — hiter, ko mora biti hiter, previden, ko mora biti previden.

To ni samo avtomatizacija. To je **sodelovanje**.

Več o [Orbital Memory](./ai-orbital-memory).
