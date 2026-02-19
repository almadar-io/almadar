# Gradnja celovite večorbitalne aplikacije (Full Multi-Orbital Application)

> Vir: [`tests/schemas/09-full-app.orb`](../../../../tests/schemas/09-full-app.orb)

Ta vadnica vodi skozi celotno shemo `full-app-test` — resničnega aplikacijo s tremi povezanimi orbitali. Združuje vse iz prejšnjih vadnic: entitete, state machine, render-ui, straže in evente med orbitalnimi.

---

## Pregled aplikacije (Application Overview)

```
TaskManager orbital          ProjectManager orbital       UserManager orbital
  entity: Task                 entity: Project              entity: User
  traits:                      traits:                      traits:
    TaskLifecycle                ProjectStats                 UserBrowser
    TaskCRUD                   listens:                     pages:
  pages:                         TASK_COMPLETED               /users
    /tasks                       TASK_CREATED
  emits:
    TASK_COMPLETED
    TASK_CREATED
```

**Tok podatkov (Data flow):**
1. Uporabnik ustvari ali dokonča nalogo v `TaskManager`
2. `TaskManager` odda `TASK_CREATED` ali `TASK_COMPLETED`
3. `ProjectManager` posluša in posodablja svoje štetje projektov

---

## Orbital 1: TaskManager

### Entiteta (Entity)

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

### Trait 1: TaskLifecycle

Upravlja stanje delovnega toka naloge. Odda `TASK_COMPLETED`, ko je naloga odobrena ali neposredno dokončana.

**Stanja (States):** `todo → inProgress → review → done`

Ključni prehodi (Transitions):
```json
{ "from": "review", "event": "APPROVE", "to": "done",
  "effects": [["emit", "TASK_COMPLETED", { "taskId": "@entity.id", "projectId": "@entity.projectId" }]]
},
{ "from": "inProgress", "event": "COMPLETE", "to": "done",
  "effects": [["emit", "TASK_COMPLETED", { "taskId": "@entity.id", "projectId": "@entity.projectId" }]]
}
```

### Trait 2: TaskCRUD

Upravlja UI seznama. Odda `TASK_CREATED`, ko je nova naloga shranjena.

**Stanja:** `listing → creating | editing`

Ključni prehodi:
```json
{ "from": "creating", "event": "SAVE", "to": "listing",
  "effects": [
    ["persist", "update", "Task", "@entity"],
    ["emit", "TASK_CREATED", { "taskId": "@entity.id", "projectId": "@entity.projectId" }],
    ["notify", "success", "Naloga ustvarjena"]
  ]
},
{ "from": "listing", "event": "VIEW", "to": "listing",
  "effects": [["navigate", "/tasks/@payload.id"]]
}
```

### Strani (Pages)

```json
"pages": [
  {
    "name": "TaskListPage",
    "path": "/tasks",
    "traits": [{ "ref": "TaskCRUD", "linkedEntity": "Task" }]
  }
]
```

### Emits na ravni orbitala

```json
"emits": ["TASK_COMPLETED", "TASK_CREATED"]
```

---

## Orbital 2: ProjectManager

### Entiteta (Entity)

Sledi agregatnim statistikam po projektih, reaktivno posodabljane ob spremembi nalog:

```json
{
  "name": "Project",
  "persistence": "persistent",
  "collection": "projects",
  "fields": [
    { "name": "id", "type": "string", "required": true },
    { "name": "name", "type": "string", "required": true },
    { "name": "description", "type": "string" },
    { "name": "taskCount", "type": "number", "default": 0 },
    { "name": "completedCount", "type": "number", "default": 0 }
  ]
}
```

### Trait: ProjectStats

Posluša tako `TASK_COMPLETED` kot `TASK_CREATED` in povečuje številce:

```json
{
  "name": "ProjectStats",
  "linkedEntity": "Project",
  "category": "interaction",
  "listens": [
    { "event": "TASK_COMPLETED", "scope": "external" },
    { "event": "TASK_CREATED", "scope": "external" }
  ],
  "stateMachine": {
    "states": [{ "name": "idle", "isInitial": true }],
    "events": [
      { "key": "INIT", "name": "Inicializacija" },
      { "key": "TASK_COMPLETED", "name": "Naloga dokončana" },
      { "key": "TASK_CREATED", "name": "Naloga ustvarjena" }
    ],
    "transitions": [
      {
        "from": "idle", "event": "INIT", "to": "idle",
        "effects": [
          ["fetch", "Project"],
          ["render-ui", "main", {
            "type": "stats",
            "items": [
              { "label": "Skupaj nalog", "value": "@entity.taskCount" },
              { "label": "Dokončano", "value": "@entity.completedCount" }
            ]
          }]
        ]
      },
      {
        "from": "idle", "event": "TASK_CREATED", "to": "idle",
        "effects": [["increment", "@entity.taskCount", 1]]
      },
      {
        "from": "idle", "event": "TASK_COMPLETED", "to": "idle",
        "effects": [["increment", "@entity.completedCount", 1]]
      }
    ]
  }
}
```

Eventa `TASK_CREATED` in `TASK_COMPLETED` sta prejeta iz `TaskManager`. Sprožita prehode v samo-zanki (self-loop transitions), ki zaženejo efekte `increment` — posodabljanje statistik projekta v realnem času.

### Strani in listens na ravni orbitala

```json
"pages": [
  {
    "name": "ProjectListPage",
    "path": "/projects",
    "traits": [{ "ref": "ProjectStats", "linkedEntity": "Project" }]
  }
],
"listens": [
  { "event": "TASK_COMPLETED", "from": "TaskManager" },
  { "event": "TASK_CREATED", "from": "TaskManager" }
]
```

---

## Orbital 3: UserManager

Najpreprostejši orbital — brskalnik samo za branje za uporabnike z akcijo navigacije na podrobnosti.

### Entiteta (Entity)

```json
{
  "name": "User",
  "persistence": "persistent",
  "collection": "users",
  "fields": [
    { "name": "id", "type": "string", "required": true },
    { "name": "name", "type": "string", "required": true },
    { "name": "email", "type": "string", "required": true },
    { "name": "role", "type": "enum", "values": ["admin", "member", "guest"], "default": "member" }
  ]
}
```

### Trait: UserBrowser

```json
{
  "name": "UserBrowser",
  "linkedEntity": "User",
  "category": "interaction",
  "stateMachine": {
    "states": [{ "name": "browsing", "isInitial": true }],
    "events": [
      { "key": "INIT", "name": "Inicializacija" },
      { "key": "VIEW", "name": "Poglej uporabnika", "payload": [
        { "name": "id", "type": "string", "required": true }
      ]}
    ],
    "transitions": [
      {
        "from": "browsing", "event": "INIT", "to": "browsing",
        "effects": [
          ["fetch", "User"],
          ["render-ui", "main", {
            "type": "entity-table",
            "entity": "User",
            "columns": ["name", "email", "role"],
            "itemActions": [{ "event": "VIEW", "label": "Poglej" }]
          }]
        ]
      },
      {
        "from": "browsing", "event": "VIEW", "to": "browsing",
        "effects": [["navigate", "/users/@payload.id"]]
      }
    ]
  }
}
```

### Strani (Pages)

```json
"pages": [
  {
    "name": "UserListPage",
    "path": "/users",
    "traits": [{ "ref": "UserBrowser", "linkedEntity": "User" }]
  }
]
```

---

## Povzetek poti aplikacije (Application Routes Summary)

| Pot (Path) | Orbital | Trait | Opis |
|------------|---------|-------|------|
| `/tasks` | TaskManager | TaskCRUD | Brskanje, ustvarjanje, urejanje, brisanje nalog |
| `/tasks/:id` | TaskManager | TaskCRUD | Navigacija na podrobnosti naloge (prek efekta `navigate`) |
| `/projects` | ProjectManager | ProjectStats | Ogled statov projekta posodobljenih z eventi nalog |
| `/users` | UserManager | UserBrowser | Brskanje po uporabnikih, klik za podrobnosti |

---

## Vzorci v tej aplikaciji (Patterns in This App)

| Koncept | Kje se pojavi |
|---------|---------------|
| Več traitov na orbital (Multiple traits per orbital) | TaskManager ima TaskLifecycle + TaskCRUD |
| Terminalna stanja (Terminal states) | `done` v TaskLifecycle (`isTerminal: true`) |
| Oddajanje med orbitalnimi (Cross-orbital emit) | TaskLifecycle odda `TASK_COMPLETED`, TaskCRUD odda `TASK_CREATED` |
| Poslušanje med orbitalnimi (Cross-orbital listen) | ProjectStats posluša oba eventa in povečuje številce |
| Samo-zanke prehodov (Self-loop transitions) | Vsi INIT prehodi; upravljalniki eventov ProjectStats |
| Podatki v eventih (Payload in events) | `VIEW` nosi `id`; `TASK_COMPLETED` nosi `taskId` + `projectId` |
| Efekt navigate | VIEW prehod v TaskCRUD navigira na `/tasks/@payload.id` |
| Efekt increment | ProjectStats uporablja `["increment", "@entity.taskCount", 1]` |

---

## Naslednji koraki

- [Generiranje shem z LLM (AI Generation)](./ai-generation) — imejte AI generirati sheme kot je ta
- [Straži in poslovna pravila (Guards)](../intermediate/guards) — dodajte straže dovoljenj delovnim tokovom nalog
- [UI Vzorci in render-ui (UI Patterns)](../intermediate/ui-patterns) — izboljšajte UI z več tipi vzorcev
