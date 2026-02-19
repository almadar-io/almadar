# تشريح مدار كامل

> كل ميزة في المدار هي مدار (orbital). المدار غير مكتمل بدون جميع أجزائه الأربعة.

## الأجزاء الأربعة للمدار

المدار هو الوحدة الأساسية لتطبيق المدار. يجب أن يحتوي على:

```
المدار = الكيان + السمة/السمات + آلة الحالة + الصفحات
```

| الجزء | الغرض | غيابه يعني... |
|-------|--------|----------------|
| `entity` | البيانات التي تديرها | لا بيانات للعمل معها |
| `traits` | كيف يتصرف التطبيق | لا سلوك ولا واجهة |
| `stateMachine` | الحالات والأحداث والانتقالات | لا دورة حياة معرّفة |
| `pages` | أين تظهر الواجهة (المسارات) | الصفحة تُحمَّل فارغة — لا شيء يظهر |

**الصفحات هي الجزء الأكثر نسياناً.** بدون `pages`، توجد السمة لكنها لا تُثبَّت على أي مسار — لا يرى المستخدم شيئاً.

---

## الخطوة 1 — تعريف الكيان (Entity)

الكيان (Entity) هو هيكل بياناتك. يصف ما تديره وكيف يُستمر.

```json
{
  "name": "Task",
  "persistence": "persistent",
  "collection": "tasks",
  "fields": [
    { "name": "id", "type": "string", "required": true },
    { "name": "title", "type": "string", "required": true },
    { "name": "status", "type": "enum", "values": ["pending", "done"], "default": "pending" }
  ]
}
```

**أنواع الحقول (Field types):** `string`، `number`، `boolean`، `date`، `timestamp`، `enum`، `array`، `object`، `relation`

**أنماط الاستمرار (Persistence):**
- `persistent` — محفوظ في قاعدة البيانات (Firestore، PostgreSQL)
- `runtime` — في الذاكرة، خاص بالجلسة (السلة، حالة المعالج)
- `singleton` — نسخة عامة واحدة (إعدادات التطبيق، المستخدم الحالي)

---

## الخطوة 2 — تعريف آلة الحالة (State Machine)

آلة الحالة (State Machine) تعيش داخل السمة (Trait). تصف ما هي الحالات التي يمكن أن تكون عليها الميزة وما الأحداث التي تسبب الانتقالات.

### الحالات (States)

كل آلة حالة تحتاج حالة واحدة على الأقل مميّزة بـ `"isInitial": true`. الحالات هي **كائنات**، وليست نصوصاً:

```json
"states": [
  { "name": "Pending", "isInitial": true },
  { "name": "Done", "isTerminal": true }
]
```

### الأحداث (Events)

الأحداث هي مشغّلات — إجراءات المستخدم أو أحداث النظام أو خطّافات دورة الحياة:

```json
"events": [
  { "key": "INIT", "name": "تهيئة" },
  { "key": "COMPLETE", "name": "إتمام المهمة" }
]
```

> **`INIT` إلزامي.** بدون انتقال INIT، تُحمَّل الصفحة دون عرض أي شيء.

### الانتقالات (Transitions)

الانتقالات تربط الحالات والأحداث معاً. يمكنها حمل الحراس (شروط) والتأثيرات (إجراءات):

```json
"transitions": [
  {
    "from": "Pending",
    "event": "INIT",
    "to": "Pending",
    "effects": [
      ["fetch", "Task"],
      ["render-ui", "main", {
        "type": "entity-table",
        "entity": "Task",
        "columns": ["title", "status"],
        "itemActions": [
          { "event": "COMPLETE", "label": "إتمام" }
        ]
      }]
    ]
  },
  {
    "from": "Pending",
    "event": "COMPLETE",
    "to": "Done",
    "effects": [
      ["persist", "update", "Task", "@entity"],
      ["notify", "success", "تم إنجاز المهمة!"]
    ]
  }
]
```

---

## الخطوة 3 — بناء السمة (Trait)

لفّ آلة الحالة في سمة مع `name` و`linkedEntity` و`category`:

```json
{
  "name": "TaskLifecycle",
  "linkedEntity": "Task",
  "category": "interaction",
  "stateMachine": {
    "states": [
      { "name": "Pending", "isInitial": true },
      { "name": "Done", "isTerminal": true }
    ],
    "events": [
      { "key": "INIT", "name": "تهيئة" },
      { "key": "COMPLETE", "name": "إتمام المهمة" }
    ],
    "transitions": [
      {
        "from": "Pending",
        "event": "INIT",
        "to": "Pending",
        "effects": [
          ["fetch", "Task"],
          ["render-ui", "main", {
            "type": "entity-table",
            "entity": "Task",
            "columns": ["title", "status"],
            "itemActions": [
              { "event": "COMPLETE", "label": "إتمام" }
            ]
          }]
        ]
      },
      {
        "from": "Pending",
        "event": "COMPLETE",
        "to": "Done",
        "effects": [
          ["persist", "update", "Task", "@entity"],
          ["notify", "success", "تم إنجاز المهمة!"]
        ]
      }
    ]
  }
}
```

**`category`** يمكن أن يكون:
- `interaction` — يحتوي واجهة، يطلق تأثيرات `render-ui`
- `integration` — استدعاءات خدمات خلفية، بدون واجهة

---

## الخطوة 4 — إضافة الصفحات (Pages)

الصفحات تربط السمات بمسارات URL. هذا هو الجزء الأكثر نسياناً.

```json
"pages": [
  {
    "name": "TaskListPage",
    "path": "/tasks",
    "traits": [
      { "ref": "TaskLifecycle", "linkedEntity": "Task" }
    ]
  }
]
```

- `path` هو مسار URL (يدعم معاملات `:id`، مثل `/tasks/:id`)
- `traits[].ref` يشير إلى سمة بالاسم المعرّفة في نفس المدار
- `traits[].linkedEntity` يخبر وقت التشغيل بأي كيان يُرتبط

---

## المدار الكامل

بجمع كل شيء — مدار `TaskManager` يعمل بالكامل:

```json
{
  "name": "TaskManager",
  "orbitals": [
    {
      "name": "Tasks",
      "entity": {
        "name": "Task",
        "persistence": "persistent",
        "collection": "tasks",
        "fields": [
          { "name": "id", "type": "string", "required": true },
          { "name": "title", "type": "string", "required": true },
          { "name": "status", "type": "enum", "values": ["pending", "done"], "default": "pending" }
        ]
      },
      "traits": [
        {
          "name": "TaskLifecycle",
          "linkedEntity": "Task",
          "category": "interaction",
          "stateMachine": {
            "states": [
              { "name": "Pending", "isInitial": true },
              { "name": "Done", "isTerminal": true }
            ],
            "events": [
              { "key": "INIT", "name": "تهيئة" },
              { "key": "COMPLETE", "name": "إتمام المهمة" }
            ],
            "transitions": [
              {
                "from": "Pending",
                "event": "INIT",
                "to": "Pending",
                "effects": [
                  ["fetch", "Task"],
                  ["render-ui", "main", {
                    "type": "entity-table",
                    "entity": "Task",
                    "columns": ["title", "status"],
                    "itemActions": [
                      { "event": "COMPLETE", "label": "إتمام" }
                    ]
                  }]
                ]
              },
              {
                "from": "Pending",
                "event": "COMPLETE",
                "to": "Done",
                "effects": [
                  ["persist", "update", "Task", "@entity"],
                  ["notify", "success", "تم إنجاز المهمة!"]
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
          "traits": [
            { "ref": "TaskLifecycle", "linkedEntity": "Task" }
          ]
        }
      ]
    }
  ]
}
```

---

## الأخطاء الشائعة (Common Mistakes)

### غياب `pages` (Missing pages)

```json
// ❌ ناقص — لا شيء يُعرض على أي مسار
{
  "name": "Tasks",
  "entity": { ... },
  "traits": [ { "name": "TaskLifecycle", ... } ]
}

// ✅ كامل — السمة مثبّتة على /tasks
{
  "name": "Tasks",
  "entity": { ... },
  "traits": [ { "name": "TaskLifecycle", ... } ],
  "pages": [
    { "name": "TaskListPage", "path": "/tasks", "traits": [{ "ref": "TaskLifecycle", "linkedEntity": "Task" }] }
  ]
}
```

### الحالات كنصوص (غير صحيح)

```json
// ❌ تنسيق خاطئ
"states": ["Pending", "Done"]

// ✅ الحالات يجب أن تكون كائنات
"states": [
  { "name": "Pending", "isInitial": true },
  { "name": "Done", "isTerminal": true }
]
```

### غياب انتقال INIT (Missing INIT transition)

```json
// ❌ الصفحة تُفتح لكنها فارغة — لا render-ui ابتدائي
"transitions": [
  { "from": "Pending", "event": "COMPLETE", "to": "Done", "effects": [...] }
]

// ✅ أضف حلقة ذاتية على INIT لعرض الواجهة الأولية
"transitions": [
  {
    "from": "Pending", "event": "INIT", "to": "Pending",
    "effects": [["fetch", "Task"], ["render-ui", "main", { "type": "entity-table", "entity": "Task" }]]
  },
  { "from": "Pending", "event": "COMPLETE", "to": "Done", "effects": [...] }
]
```

---

## الخطوات التالية

- [بناء مدير المهام](./task-manager) — أضف CRUD كامل لهذا النمط
- [أنماط الواجهة وrender-ui](../intermediate/ui-patterns) — استكشف جميع أنواع الأنماط
- [الحراس وقواعد الأعمال](../intermediate/guards) — أضف شروطاً للانتقالات
