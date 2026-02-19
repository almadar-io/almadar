# بناء تطبيق متعدد المدارات (Full Multi-Orbital Application)

> المصدر: [`tests/schemas/09-full-app.orb`](../../../../tests/schemas/09-full-app.orb)

يستعرض هذا الدرس المخطط الكامل `full-app-test` — تطبيق حقيقي بثلاثة مدارات متصلة. يجمع كل شيء من الدروس السابقة: الكيانات، وآلات الحالة، وrender-ui، والحراس، والأحداث بين المدارات.

---

## نظرة عامة على التطبيق (Application Overview)

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

**تدفق البيانات:**
1. المستخدم ينشئ مهمة أو يكملها في `TaskManager`
2. `TaskManager` يُصدر `TASK_CREATED` أو `TASK_COMPLETED`
3. `ProjectManager` يستمع ويحدّث عدادات مشاريعه

---

## المدار 1: TaskManager

### الكيان (Entity)

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

### السمة 1: TaskLifecycle

تدير حالة سير عمل المهمة. تُصدر `TASK_COMPLETED` عند الموافقة على مهمة أو إكمالها مباشرة.

**الحالات (States):** `todo → inProgress → review → done`

الانتقالات الرئيسية:
```json
{ "from": "review", "event": "APPROVE", "to": "done",
  "effects": [["emit", "TASK_COMPLETED", { "taskId": "@entity.id", "projectId": "@entity.projectId" }]]
},
{ "from": "inProgress", "event": "COMPLETE", "to": "done",
  "effects": [["emit", "TASK_COMPLETED", { "taskId": "@entity.id", "projectId": "@entity.projectId" }]]
}
```

### السمة 2: TaskCRUD

تدير واجهة القائمة. تُصدر `TASK_CREATED` عند حفظ مهمة جديدة.

**الحالات:** `listing → creating | editing`

الانتقالات الرئيسية:
```json
{ "from": "creating", "event": "SAVE", "to": "listing",
  "effects": [
    ["persist", "update", "Task", "@entity"],
    ["emit", "TASK_CREATED", { "taskId": "@entity.id", "projectId": "@entity.projectId" }],
    ["notify", "success", "تم إنشاء المهمة"]
  ]
},
{ "from": "listing", "event": "VIEW", "to": "listing",
  "effects": [["navigate", "/tasks/@payload.id"]]
}
```

### الصفحات (Pages)

```json
"pages": [
  {
    "name": "TaskListPage",
    "path": "/tasks",
    "traits": [{ "ref": "TaskCRUD", "linkedEntity": "Task" }]
  }
]
```

### الإصدارات على مستوى المدار (Orbital-level emits)

```json
"emits": ["TASK_COMPLETED", "TASK_CREATED"]
```

---

## المدار 2: ProjectManager

### الكيان (Entity)

يتتبع الإحصائيات التجميعية لكل مشروع، محدَّثة بشكل تفاعلي عند تغيير المهام:

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

### السمة: ProjectStats

يستمع إلى `TASK_COMPLETED` و`TASK_CREATED` ويزيد العدادات:

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
      { "key": "INIT", "name": "تهيئة" },
      { "key": "TASK_COMPLETED", "name": "تمت المهمة" },
      { "key": "TASK_CREATED", "name": "تم إنشاء المهمة" }
    ],
    "transitions": [
      {
        "from": "idle", "event": "INIT", "to": "idle",
        "effects": [
          ["fetch", "Project"],
          ["render-ui", "main", {
            "type": "stats",
            "items": [
              { "label": "إجمالي المهام", "value": "@entity.taskCount" },
              { "label": "المكتملة", "value": "@entity.completedCount" }
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

تُستقبل أحداث `TASK_CREATED` و`TASK_COMPLETED` من `TaskManager`. تُشغّل انتقالات حلقة ذاتية تُطلق تأثيرات `increment` — تحديث إحصائيات المشروع في الوقت الفعلي.

### الصفحات والاستماع على مستوى المدار

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

## المدار 3: UserManager

أبسط مدار — متصفح للقراءة فقط للمستخدمين مع إجراء التنقل إلى التفاصيل.

### الكيان (Entity)

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

### السمة: UserBrowser

```json
{
  "name": "UserBrowser",
  "linkedEntity": "User",
  "category": "interaction",
  "stateMachine": {
    "states": [{ "name": "browsing", "isInitial": true }],
    "events": [
      { "key": "INIT", "name": "تهيئة" },
      { "key": "VIEW", "name": "عرض المستخدم", "payload": [
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
            "itemActions": [{ "event": "VIEW", "label": "عرض" }]
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

### الصفحات (Pages)

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

## ملخص مسارات التطبيق (Application Routes Summary)

| المسار (Path) | المدار (Orbital) | السمة (Trait) | الوصف |
|----------------|------------------|----------------|--------|
| `/tasks` | TaskManager | TaskCRUD | تصفح المهام، إنشاؤها، تعديلها، حذفها |
| `/tasks/:id` | TaskManager | TaskCRUD | التنقل لتفاصيل المهمة (عبر تأثير `navigate`) |
| `/projects` | ProjectManager | ProjectStats | عرض إحصائيات المشروع المحدَّثة بأحداث المهام |
| `/users` | UserManager | UserBrowser | تصفح المستخدمين، النقر للتفاصيل |

---

## الأنماط في هذا التطبيق (Patterns in This App)

| المفهوم | مكان ظهوره |
|---------|------------|
| سمات متعددة لكل مدار (Multiple traits per orbital) | TaskManager لديه TaskLifecycle + TaskCRUD |
| الحالات النهائية (Terminal states) | `done` في TaskLifecycle (`isTerminal: true`) |
| الإصدار بين المدارات (Cross-orbital emit) | TaskLifecycle يُصدر `TASK_COMPLETED`، TaskCRUD يُصدر `TASK_CREATED` |
| الاستماع بين المدارات (Cross-orbital listen) | ProjectStats يستمع لكلا الحدثين ويزيد العدادات |
| انتقالات الحلقة الذاتية (Self-loop transitions) | جميع انتقالات INIT؛ معالجات أحداث ProjectStats |
| البيانات في الأحداث (Payload in events) | `VIEW` يحمل `id`؛ `TASK_COMPLETED` يحمل `taskId` + `projectId` |
| تأثير navigate | انتقال VIEW في TaskCRUD يتنقل إلى `/tasks/@payload.id` |
| تأثير increment | ProjectStats يستخدم `["increment", "@entity.taskCount", 1]` |

---

## الخطوات التالية

- [توليد المخططات بالذكاء الاصطناعي (AI Generation)](./ai-generation) — اجعل الذكاء الاصطناعي يولّد مخططات كهذه
- [الحراس وقواعد الأعمال (Guards)](../intermediate/guards) — أضف حراسات الصلاحيات لسير عمل المهام
- [أنماط الواجهة (UI Patterns) وrender-ui](../intermediate/ui-patterns) — حسّن الواجهة بأنواع أنماط إضافية
