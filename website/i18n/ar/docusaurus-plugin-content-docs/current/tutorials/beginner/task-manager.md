# بناء مدير المهام

> المصدر: [`tests/schemas/09-full-app.orb`](../../../../tests/schemas/09-full-app.orb)

يبني هذا الدرس مدير مهام حقيقي خطوة بخطوة. في النهاية ستحصل على مخطط يحتوي:
- كيان `Task` مع الاستمرار
- **سمة دورة الحياة** (آلة حالة لحالة المهمة)
- **سمة CRUD** (عرض القائمة، الإنشاء، التعديل، الحذف)
- صفحتان مرتبطتان بالسمات

---

## ما سنبنيه

```
/tasks       → TaskListPage  (تصفح المهام وإنشاؤها وتعديلها وحذفها)
/tasks/:id   → التنقل من القائمة (عرض التفاصيل)
```

---

## الخطوة 1 — كيان المهمة (Task Entity)

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

---

## الخطوة 2 — سمة دورة الحياة (TaskLifecycle Trait)

تتتبع سمة `TaskLifecycle` مكان المهمة في سير العمل: `todo → inProgress → review → done`.

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
      { "name": "done", "isTerminal": true, "description": "المهمة مكتملة" }
    ],
    "events": [
      { "key": "INIT", "name": "تهيئة" },
      { "key": "START", "name": "بدء المهمة" },
      { "key": "SUBMIT_FOR_REVIEW", "name": "إرسال للمراجعة" },
      { "key": "APPROVE", "name": "موافقة" },
      { "key": "REJECT", "name": "طلب تعديلات" },
      { "key": "COMPLETE", "name": "إتمام" }
    ],
    "transitions": [
      {
        "from": "todo", "event": "INIT", "to": "todo",
        "effects": [
          ["fetch", "Task"],
          ["render-ui", "main", {
            "type": "stats",
            "items": [
              { "label": "للتنفيذ", "value": "@entity.todo" },
              { "label": "جارٍ التنفيذ", "value": "@entity.inProgress" },
              { "label": "منجز", "value": "@entity.done" }
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

**أنماط جديرة بالملاحظة:**
- انتقال INIT بحلقة ذاتية يعرض لوحة `stats` تُظهر العدد حسب الحالة
- `isTerminal: true` على `done` يعني عدم السماح بانتقالات إضافية من تلك الحالة
- `emit` ينشر حدثاً بين المدارات (انظر [التواصل بين المدارات](../intermediate/cross-orbital))

---

## الخطوة 3 — سمة CRUD (TaskCRUD Trait)

تدير سمة `TaskCRUD` واجهة القائمة: عرض القائمة، الإنشاء، التعديل، الحذف.

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
      { "key": "INIT", "name": "تهيئة" },
      { "key": "VIEW", "name": "عرض المهمة", "payload": [
        { "name": "id", "type": "string", "required": true }
      ]},
      { "key": "CREATE", "name": "إنشاء مهمة" },
      { "key": "EDIT", "name": "تعديل مهمة" },
      { "key": "SAVE", "name": "حفظ" },
      { "key": "CANCEL", "name": "إلغاء" },
      { "key": "DELETE", "name": "حذف مهمة" }
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
              { "event": "VIEW", "label": "عرض" },
              { "event": "EDIT", "label": "تعديل" },
              { "event": "DELETE", "label": "حذف" }
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
          ["notify", "success", "تم إنشاء المهمة"]
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
          ["notify", "info", "تم حذف المهمة"]
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

## الخطوة 4 — إضافة الصفحات (Pages)

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

## التحقق والتشغيل

```bash
# التحقق من المخطط
almadar validate schema.orb

# بدء خادم التطوير
almadar dev
```

انتقل إلى `http://localhost:3000/tasks` لرؤية مدير المهام.

---

## الخطوات التالية

- [أنماط الواجهة وrender-ui](../intermediate/ui-patterns) — تعمّق في `entity-table` و`form` والمزيد
- [الحراس وقواعد الأعمال](../intermediate/guards) — قيّد من يمكنه إتمام أو حذف المهام
- [التواصل بين المدارات](../intermediate/cross-orbital) — اربط TaskManager بـ ProjectManager
- [بناء تطبيق كامل](../advanced/full-app) — التطبيق الكامل ذو 3 مدارات
