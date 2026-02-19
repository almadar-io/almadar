# Zgradi upravljalnik nalog (Task Manager)

> Vir: [`tests/schemas/09-full-app.orb`](../../../../tests/schemas/09-full-app.orb)

Ta vadnica korak za korakom zgradi resničen upravljalnik nalog. Na koncu boste imeli shemo z:
- Entiteto (entity) `Task` z vztrajnostjo (persistence)
- **Traitom življenjskega cikla (lifecycle trait)** — state machine za status naloge
- **CRUD traitom** — seznam, ustvarjanje, urejanje, brisanje
- Dvema stranema (pages), povezanima s traiti

---

## Kaj gradimo

```
/tasks       → TaskListPage  (brskanje, ustvarjanje, urejanje, brisanje)
/tasks/:id   → navigacija iz seznama (prikaz podrobnosti)
```

---

## Korak 1 — Entiteta Task (Task Entity)

```json
{
  "name": "Task",
  "persistence": "persistent",
  "collection": "tasks",
  "fields": [
    { "name": "id", "type": "string", "required": true },
    { "name": "title", "type": "string", "required": true },
    { "name": "description", "type": "string" },
    { "name": "priority", "type": "enum", "values": ["low", "medium", "high"], "default": "medium" },
    { "name": "dueDate", "type": "date" },
    { "name": "assigneeId", "type": "string" },
    { "name": "projectId", "type": "string" }
  ]
}
```

`persistence: "persistent"` pomeni, da se shranjuje v podatkovno bazo. Ključ `collection` nastavi ime zbirke/tabele v bazi.

---

## Korak 2 — Lifecycle Trait (TaskLifecycle)

Trait `TaskLifecycle` sledi, kje je naloga v delovnem toku (workflow): `todo → inProgress → review → done`.

```json
{
  "name": "TaskLifecycle",
  "linkedEntity": "Task",
  "category": "interaction",
  "stateMachine": {
    "states": [
      { "name": "todo", "isInitial": true },
      { "name": "inProgress" },
      { "name": "review" },
      { "name": "done", "isTerminal": true }
    ],
    "events": [
      { "key": "INIT", "name": "Inicializacija" },
      { "key": "START", "name": "Začni nalogo" },
      { "key": "SUBMIT_FOR_REVIEW", "name": "Pošlji v pregled" },
      { "key": "APPROVE", "name": "Odobri" },
      { "key": "REJECT", "name": "Zahtevaj spremembe" },
      { "key": "COMPLETE", "name": "Dokončaj" }
    ],
    "transitions": [
      {
        "from": "todo", "event": "INIT", "to": "todo",
        "effects": [
          ["fetch", "Task"],
          ["render-ui", "main", {
            "type": "stats",
            "items": [
              { "label": "Za narediti", "value": "@entity.todo" },
              { "label": "V teku", "value": "@entity.inProgress" },
              { "label": "Dokončano", "value": "@entity.done" }
            ]
          }]
        ]
      },
      { "from": "todo", "event": "START", "to": "inProgress" },
      { "from": "inProgress", "event": "SUBMIT_FOR_REVIEW", "to": "review" },
      { "from": "review", "event": "APPROVE", "to": "done", "effects": [
        ["emit", "TASK_COMPLETED", { "taskId": "@entity.id", "projectId": "@entity.projectId" }]
      ]},
      { "from": "review", "event": "REJECT", "to": "inProgress" },
      { "from": "inProgress", "event": "COMPLETE", "to": "done", "effects": [
        ["emit", "TASK_COMPLETED", { "taskId": "@entity.id", "projectId": "@entity.projectId" }]
      ]}
    ]
  }
}
```

**Opazni vzorci:**
- INIT samo-zanka prikaže `stats` nadzorno ploščo s štetjem po stanjih (states)
- `isTerminal: true` na `done` — iz tega stanja ni nadaljnjih prehodov (transitions)
- `emit` objavi medorbitalni (cross-orbital) event (glejte [Komunikacija med orbitalnimi](../intermediate/cross-orbital))

---

## Korak 3 — CRUD Trait (TaskCRUD)

Trait `TaskCRUD` upravlja UI seznama: prikaz, ustvarjanje, urejanje, brisanje.

```json
{
  "name": "TaskCRUD",
  "linkedEntity": "Task",
  "category": "interaction",
  "stateMachine": {
    "states": [
      { "name": "listing", "isInitial": true },
      { "name": "creating" },
      { "name": "editing" }
    ],
    "events": [
      { "key": "INIT", "name": "Inicializacija" },
      { "key": "VIEW", "name": "Poglej nalogo", "payload": [
        { "name": "id", "type": "string", "required": true }
      ]},
      { "key": "CREATE", "name": "Ustvari nalogo" },
      { "key": "EDIT", "name": "Uredi nalogo" },
      { "key": "SAVE", "name": "Shrani" },
      { "key": "CANCEL", "name": "Prekliči" },
      { "key": "DELETE", "name": "Izbriši nalogo" }
    ],
    "transitions": [
      {
        "from": "listing", "event": "INIT", "to": "listing",
        "effects": [
          ["fetch", "Task"],
          ["render-ui", "main", {
            "type": "entity-table", "entity": "Task",
            "columns": ["title", "priority", "dueDate"],
            "itemActions": [
              { "event": "VIEW", "label": "Poglej" },
              { "event": "EDIT", "label": "Uredi" },
              { "event": "DELETE", "label": "Izbriši" }
            ]
          }]
        ]
      },
      {
        "from": "listing", "event": "CREATE", "to": "creating",
        "effects": [["render-ui", "main", { "type": "form", "entity": "Task" }]]
      },
      {
        "from": "creating", "event": "SAVE", "to": "listing",
        "effects": [
          ["persist", "update", "Task", "@entity"],
          ["notify", "success", "Naloga ustvarjena"]
        ]
      },
      { "from": "creating", "event": "CANCEL", "to": "listing" },
      { "from": "listing", "event": "EDIT", "to": "editing" },
      {
        "from": "editing", "event": "SAVE", "to": "listing",
        "effects": [["persist", "update", "Task", "@entity"]]
      },
      { "from": "editing", "event": "CANCEL", "to": "listing" },
      {
        "from": "listing", "event": "DELETE", "to": "listing",
        "effects": [
          ["persist", "delete", "Task", "@entity.id"],
          ["notify", "info", "Naloga izbrisana"]
        ]
      },
      {
        "from": "listing", "event": "VIEW", "to": "listing",
        "effects": [["navigate", "/tasks/@payload.id"]]
      }
    ]
  }
}
```

---

## Korak 4 — Dodajte strani (Pages)

```json
"pages": [
  {
    "name": "TaskListPage",
    "path": "/tasks",
    "traits": [
      { "ref": "TaskCRUD", "linkedEntity": "Task" }
    ]
  }
]
```

---

## Validacija in zagon (Validate and Run)

```bash
# Validirajte shemo
almadar validate schema.orb

# Zaženite razvojni strežnik
almadar dev
```

Pojdite na `http://localhost:3000/tasks` za ogled upravljalnika nalog.

---

## Naslednji koraki

- [UI Patterns in render-ui](../intermediate/ui-patterns) — poglobite se v `entity-table`, `form` in ostalo
- [Guards in poslovna pravila](../intermediate/guards) — omejite, kdo lahko dokončuje ali briše naloge
- [Komunikacija med orbitalnimi](../intermediate/cross-orbital) — povežite TaskManager s ProjectManagerjem
- [Gradnja celovite aplikacije](../advanced/full-app) — popolna 3-orbitalna aplikacija
