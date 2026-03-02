# الصفحات (Pages)

> كيفية عمل الصفحات في بنية Almadar - التوجيه، ربط السمات، الفتحات، والتنقل.

**مرتبط بـ:**
- [الكيانات](./entities.md)
- [السمات](./traits.md)

---

## نظرة عامة

في Almadar، **الصفحة (Page)** هي مسار يؤلف السمات لعرض واجهة المستخدم. التركيب الأساسي هو:

```
Orbital = Entity + Traits + Pages
```

بينما تحدد [الكيانات](./entities.md) البيانات وتحدد [السمات](./traits.md) السلوك، تحدد الصفحات **أين** يتفاعل المستخدمون مع النظام. الصفحات **مدفوعة بالسمات** - لا تحتوي على واجهة مستخدم مباشرة، بل تشير إلى السمات التي تقوم تأثيرات `render-ui` الخاصة بها بملء الصفحة.

---

## تعريف الصفحة

يتم تعريف الصفحة في مخطط `.orb` بالهيكل التالي:

```json
{
  "name": "TaskListPage",
  "path": "/tasks",
  "viewType": "list",
  "primaryEntity": "Task",
  "traits": [
    { "ref": "TaskBrowser", "linkedEntity": "Task" },
    { "ref": "FilterPanel", "linkedEntity": "Task" }
  ]
}
```

### خصائص الصفحة

| الخاصية | مطلوبة | الوصف |
|---------|--------|-------|
| `name` | نعم | معرف PascalCase (مثل `TaskListPage`) |
| `path` | نعم | مسار URL يبدأ بـ `/` |
| `viewType` | لا | تلميح دلالي: `list`، `detail`، `create`، `edit`، `dashboard`، `custom` |
| `primaryEntity` | لا | الكيان الرئيسي الذي تعمل عليه هذه الصفحة |
| `traits` | نعم | مصفوفة من مراجع السمات التي تقود واجهة المستخدم |
| `isInitial` | لا | ما إذا كانت هذه الصفحة نقطة الدخول |

---

## المسارات وأنماط المسارات

تحدد مسارات الصفحات مسارات URL للتطبيق.

### قواعد المسار

- يجب أن يبدأ بـ `/`
- الأحرف الصالحة: أحرف، أرقام، شرطات، شرطات سفلية، نقطتين، شرطات مائلة
- يجب أن يكون فريدًا عبر جميع الصفحات في المخطط

### المسارات الثابتة

مسارات بسيطة بدون قطع ديناميكية:

```json
{ "path": "/tasks" }
{ "path": "/dashboard" }
{ "path": "/settings/profile" }
```

### القطع الديناميكية

استخدم صيغة النقطتين للمعاملات الديناميكية:

```json
{ "path": "/tasks/:id" }
{ "path": "/users/:userId/tasks/:taskId" }
{ "path": "/projects/:projectId/members/:memberId" }
```

القطع الديناميكية تُستخرج وتكون متاحة في:
- حمولات الأحداث (`@payload.id`)
- تأثيرات التنقل
- عمليات البحث عن الكيانات

### أمثلة المسارات

| المسار | الوصف |
|--------|-------|
| `/tasks` | صفحة قائمة المهام |
| `/tasks/:id` | تفاصيل مهمة واحدة |
| `/tasks/create` | إنشاء مهمة جديدة |
| `/tasks/:id/edit` | تعديل مهمة موجودة |
| `/users/:id/profile` | ملف المستخدم |
| `/dashboard` | عرض لوحة التحكم |

---

## أنواع العرض (View Types)

أنواع العرض هي تلميحات دلالية عن غرض الصفحة:

| النوع | الغرض | الأنماط النموذجية |
|-------|-------|-------------------|
| `list` | عرض مجموعة من الكيانات | `entity-table`، `entity-cards`، `entity-list` |
| `detail` | عرض كيان واحد | `entity-detail`، `stats` |
| `create` | إنشاء كيان جديد | `form` |
| `edit` | تعديل كيان موجود | `form` |
| `dashboard` | نظرة عامة مع أقسام متعددة | `dashboard-grid`، `stats` |
| `custom` | تخطيط مخصص | أي أنماط |

**مهم:** أنواع العرض لا تقيد واجهة المستخدم - العرض الفعلي يتم التحكم فيه بواسطة تأثيرات `render-ui` في [السمات](./traits.md#effects). أنواع العرض هي بيانات وصفية لـ:
- التوثيق
- تلميحات توليد الكود
- هيكلة واجهة المستخدم

---

## ربط الصفحة بالسمة

تشير الصفحات إلى السمات التي توفر سلوكها وواجهة المستخدم.

### مراجع السمات

```json
{
  "pages": [
    {
      "name": "TaskListPage",
      "path": "/tasks",
      "traits": [
        { "ref": "TaskBrowser", "linkedEntity": "Task" },
        { "ref": "QuickActions", "linkedEntity": "Task", "config": { "showCreate": true } }
      ]
    }
  ]
}
```

### هيكل PageTraitRef

| الخاصية | مطلوبة | الوصف |
|---------|--------|-------|
| `ref` | نعم | اسم السمة أو المسار (مثل `"TaskBrowser"`، `"Std.traits.CRUD"`) |
| `linkedEntity` | لا | الكيان الذي تعمل عليه هذه السمة |
| `config` | لا | تكوين خاص بالسمة |

### سمات متعددة لكل صفحة

يمكن أن تحتوي الصفحة على سمات متعددة، كل منها يسهم في واجهة المستخدم لمختلف الفتحات:

```json
{
  "name": "DashboardPage",
  "path": "/dashboard",
  "traits": [
    { "ref": "StatsSummary", "linkedEntity": "Analytics" },
    { "ref": "RecentActivity", "linkedEntity": "Activity" },
    { "ref": "QuickActions", "linkedEntity": "Task" }
  ]
}
```

تستهدف تأثيرات `render-ui` لكل سمة [فتحات](#slots-and-ui-rendering) محددة.

### linkedEntity على السمات

تحدد خاصية `linkedEntity` ربط سمة بكيان محدد:

```json
{ "ref": "StatusManager", "linkedEntity": "Task" }
```

هذا يعني:
- روابط `@entity` في السمة تحل إلى بيانات `Task`
- التأثيرات مثل `persist` تعمل على مجموعة `Task`
- آلة حالة السمة تدير نسخ `Task`

انظر [ربط السمة بالكيان](./traits.md#linkedentity-trait-entity-binding) للتفاصيل.

---

## الكيان الأساسي (Primary Entity)

تحدد خاصية `primaryEntity` الكيان الرئيسي الذي تعمل عليه الصفحة:

```json
{
  "name": "TaskDetailPage",
  "path": "/tasks/:id",
  "primaryEntity": "Task",
  "traits": [
    { "ref": "TaskViewer" },
    { "ref": "CommentList", "linkedEntity": "Comment" }
  ]
}
```

**الاستخدام:**
- الكيان الافتراضي للسمات بدون `linkedEntity` صريح
- التحقق من وجود الكيان
- تلميحات توليد الكود
- غير مطلوب إذا حددت جميع السمات كياناتها صراحةً

---

## الفتحات وعرض واجهة المستخدم (Slots)

تعرض السمات واجهة المستخدم من خلال تأثيرات `render-ui` التي تستهدف **فتحات** - مناطق مسمى على الصفحة.

### الفتحات المتاحة

| الفتحة | الغرض |
|--------|-------|
| `main` | منطقة المحتوى الأساسي |
| `sidebar` | اللوحة الجانبية |
| `modal` | طبقة Modal |
| `drawer` | لوحة Drawer |
| `overlay` | طبقة ملء الشاشة |
| `center` | محتوى مركزي |
| `toast` | إشعارات Toast |
| `hud-top` | HUD العلوي (واجهة اللعبة) |
| `hud-bottom` | HUD السفلي (واجهة اللعبة) |
| `floating` | عنصر عائم |
| `system` | مكونات النظام غير المرئية |

### تأثير render-ui

تملأ السمات الفتحات باستخدام تأثير `render-ui`:

```json
["render-ui", "main", {
  "type": "entity-table",
  "entity": "Task",
  "columns": ["title", "status", "dueDate"],
  "itemActions": [
    { "event": "VIEW", "label": "View" },
    { "event": "EDIT", "label": "Edit" }
  ]
}]
```

### تدفق الفتحة

```
┌─────────────────────────────────────────────────────────────┐
│  الصفحة: TaskListPage                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  الفتحة: main                                        │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │  النمط: entity-table (من TaskBrowser)       │    │   │
│  │  │  - الأعمدة: title، status، dueDate          │    │   │
│  │  │  - الإجراءات: VIEW، EDIT                    │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  الفتحة: sidebar                                     │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │  النمط: filter-panel (من FilterPanel)       │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### عروض متعددة لنفس الفتحة

إذا قامت سمات متعددة بالعرض إلى نفس الفتحة، فإنها تتراكب (الأحدث يستبدل أو يضيف حسب نوع النمط):

```json
// السمة A
["render-ui", "main", { "type": "stats", ... }]

// السمة B (لاحقًا في الصفحة)
["render-ui", "main", { "type": "entity-table", ... }]
```

---

## التنقل (Navigation)

يتم التعامل مع التنقل بين الصفحات من خلال تأثير `navigate` في السمات.

### تأثير navigate

```json
["navigate", "/tasks/:id", { "id": "@payload.taskId" }]
```

**الصيغة:** `["navigate", path, params?]`

| المعامل | الوصف |
|---------|-------|
| `path` | مسار الصفحة المستهدفة (يمكن أن يتضمن قطعًا ديناميكية) |
| `params` | كائن اختياري لملء القطع الديناميكية |

### أمثلة التنقل

**تنقل بسيط:**
```json
["navigate", "/dashboard"]
```

**مع معرف الكيان:**
```json
["navigate", "/tasks/@entity.id"]
```

**مع الحمولة:**
```json
["navigate", "/tasks/:id", { "id": "@payload.taskId" }]
```

**مسار متداخل:**
```json
["navigate", "/users/:userId/tasks/:taskId", {
  "userId": "@entity.assigneeId",
  "taskId": "@entity.id"
}]
```

### التنقل في الانتقالات

يحدث التنقل عادةً بعد تغييرات الحالة:

```json
{
  "from": "editing",
  "to": "saved",
  "event": "SAVE",
  "effects": [
    ["persist", "update", "Task", "@entity.id", "@payload"],
    ["notify", "تم حفظ المهمة!", "success"],
    ["navigate", "/tasks/@entity.id"]
  ]
}
```

انظر [التأثيرات](./traits.md#effects) للمزيد من التفاصيل.

---

## الصفحة الأولية (Initial Page)

قم بتمييز الصفحة كنقطة دخول بـ `isInitial`:

```json
{
  "name": "HomePage",
  "path": "/",
  "isInitial": true,
  "traits": [
    { "ref": "WelcomeBanner" }
  ]
}
```

**السلوك:**
- التطبيق يحمّل هذه الصفحة أولاً
- التوجيهات من الجذر (`/`) تذهب هنا
- يجب أن تكون صفحة واحدة فقط مُعلمة كأولية لكل وحدة مدارية

---

## التحقق من الصفحات

يتم التحقق من الصفحات في وقت التجميع بهذه القواعد:

### الحقول المطلوبة
- `name` - يجب أن يكون PascalCase
- `path` - يجب أن يبدأ بـ `/`، أحرف صالحة فقط
- `traits` - يجب أن تحتوي على مرجع سمة واحد على الأقل

### أخطاء التحقق

| الخطأ | الوصف |
|-------|-------|
| `PageMissingName` | اسم الصفحة مطلوب |
| `PageMissingPath` | مسار الصفحة مطلوب |
| `PageInvalidPath` | المسار لا يطابق النمط |
| `PageEmptyTraits` | مصفوفة السمات لا يمكن أن تكون فارغة |
| `PageInvalidTraitRef` | السمة المشار إليها غير موجودة |
| `PageInvalidViewType` | viewType ليس في القائمة الصالحة |
| `PageDuplicatePath` | صفحة أخرى تستخدم نفس المسار |

---

## مثال كامل

مثال صفحة كامل مع سمات متعددة:

```json
{
  "orbitals": [
    {
      "name": "TaskManagement",
      "entity": {
        "name": "Task",
        "collection": "tasks",
        "fields": [
          { "name": "id", "type": "string", "required": true },
          { "name": "title", "type": "string", "required": true },
          { "name": "status", "type": "enum", "values": ["pending", "active", "done"] },
          { "name": "assigneeId", "type": "relation", "relation": { "entity": "User" } }
        ]
      },
      "traits": [
        {
          "name": "TaskBrowser",
          "linkedEntity": "Task",
          "stateMachine": {
            "states": [
              { "name": "idle", "isInitial": true },
              { "name": "viewing" }
            ],
            "transitions": [
              {
                "from": "idle",
                "to": "viewing",
                "event": "INIT",
                "effects": [
                  ["fetch", "Task", {}],
                  ["render-ui", "main", {
                    "type": "entity-table",
                    "entity": "Task",
                    "columns": ["title", "status", "assigneeId"],
                    "itemActions": [
                      { "event": "VIEW", "label": "View" },
                      { "event": "EDIT", "label": "Edit" }
                    ]
                  }]
                ]
              },
              {
                "from": "viewing",
                "to": "viewing",
                "event": "VIEW",
                "effects": [
                  ["navigate", "/tasks/@payload.id"]
                ]
              }
            ]
          }
        },
        {
          "name": "TaskViewer",
          "linkedEntity": "Task",
          "stateMachine": {
            "states": [
              { "name": "loading", "isInitial": true },
              { "name": "viewing" }
            ],
            "transitions": [
              {
                "from": "loading",
                "to": "viewing",
                "event": "INIT",
                "effects": [
                  ["fetch", "Task", { "id": "@payload.id" }],
                  ["render-ui", "main", {
                    "type": "entity-detail",
                    "entity": "Task",
                    "fields": ["title", "status", "assigneeId", "createdAt"]
                  }]
                ]
              },
              {
                "from": "viewing",
                "to": "viewing",
                "event": "EDIT",
                "effects": [
                  ["navigate", "/tasks/@entity.id/edit"]
                ]
              },
              {
                "from": "viewing",
                "to": "viewing",
                "event": "BACK",
                "effects": [
                  ["navigate", "/tasks"]
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
          "viewType": "list",
          "primaryEntity": "Task",
          "isInitial": true,
          "traits": [
            { "ref": "TaskBrowser", "linkedEntity": "Task" }
          ]
        },
        {
          "name": "TaskDetailPage",
          "path": "/tasks/:id",
          "viewType": "detail",
          "primaryEntity": "Task",
          "traits": [
            { "ref": "TaskViewer", "linkedEntity": "Task" }
          ]
        }
      ]
    }
  ]
}
```

---

## المبادئ الرئيسية

1. **صفحات مدفوعة بالسمات** - الصفحات هي حاويات لمراجع السمات. تظهر واجهة المستخدم من تأثيرات `render-ui` في السمات، ليس من تعريفات الصفحات.

2. **هيكلية الفتحات** - تتدفق واجهة المستخدم عبر فتحات قياسية (`main`، `sidebar`، `modal`)، مما يتيح تركيب التخطيط دون ترميز ثابت.

3. **المسار كعقد** - مسار الصفحة هو الواجهة الأساسية - فهو يحدد URL الذي يتصفحه المستخدمون.

4. **ربط الكيان الصريح** - `linkedEntity` على مراجع السمات يجعل علاقات الكيانات صريحة.

5. **لا حالة للصفحة** - الصفحات تركيبية نقية. كل الحالة تعيش في آلات حالة السمات.

6. **تنقل مدفوع بالتأثيرات** - التنقل هو تأثير يُشغل بواسطة انتقالات السمات، ليس خاصية للصفحة.

---

## ملخص

يوفر نظام صفحات Almadar:

1. **التوجيه** - التنقل القائم على المسار مع القطع الديناميكية
2. **تركيب السمات** - سمات متعددة لكل صفحة، كل منها يسهم في واجهة المستخدم
3. **الفتحات** - مناطق مسمى لوضع واجهة المستخدم (main، sidebar، modal، إلخ)
4. **أنواع العرض** - تلميحات دلالية لغرض الصفحة (list، detail، dashboard)
5. **التنقل** - التوجيه المدفوع بالتأثيرات بين الصفحات
6. **ربط الكيان** - علاقات الكيانات الصريحة عبر `linkedEntity`
7. **التحقق** - يفرض المترجم تفرد المسار ووجود السمة

الصفحات هي طبقة التوجيه والتركيب - فهي تحدد **إلى أين** يذهب المستخدمون، بينما تحدد [السمات](./traits.md) **ما يحدث** وتحدد [الكيانات](./entities.md) **ما هي البيانات** المعنية.
