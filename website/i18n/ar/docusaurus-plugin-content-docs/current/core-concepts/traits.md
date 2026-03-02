# السمات (Traits)

> تعريفات السمات وأنواع آلات الحالة لـ Almadar

---

> كيفية عمل السمات في بنية Almadar/Orbital - آلات الحالة، الحراس، التأثيرات، والتواصل عبر الوحدات المدارية.

**مرتبط بـ:** [الكيانات](./entities.md)

---

## نظرة عامة

في Almadar، **السمة (Trait)** هي آلة حالة تحدد السلوك للكيان. التركيب الأساسي هو:

```
Orbital Unit = Entity + Traits + Pages
```

بينما تحدد [الكيانات](./entities.md) شكل البيانات، تحدد السمات كيف تتغير هذه البيانات بمرور الوقت من خلال **الحالات**، **الانتقالات**، **الحراس**، و**التأثيرات**.

---

## تعريف السمة

يتم تعريف السمة في مخطط `.orb` بالهيكل التالي:

```json
{
  "name": "TaskManagement",
  "category": "interaction",
  "linkedEntity": "Task",
  "description": "يدير دورة حياة المهمة وتغييرات الحالة",
  "emits": [
    { "event": "TASK_COMPLETED", "scope": "external" }
  ],
  "listens": [
    { "event": "USER_ASSIGNED", "triggers": "ASSIGN" }
  ],
  "stateMachine": {
    "states": [
      { "name": "idle", "isInitial": true },
      { "name": "active" },
      { "name": "completed", "isTerminal": true }
    ],
    "events": [
      { "key": "START", "name": "Start Task" },
      { "key": "COMPLETE", "name": "Complete Task" }
    ],
    "transitions": [
      {
        "from": "idle",
        "to": "active",
        "event": "START",
        "effects": [["set", "@entity.id", "status", "active"]]
      },
      {
        "from": "active",
        "to": "completed",
        "event": "COMPLETE",
        "guard": ["=", "@entity.assigneeId", "@user.id"],
        "effects": [
          ["set", "@entity.id", "status", "completed"],
          ["emit", "TASK_COMPLETED", { "taskId": "@entity.id" }]
        ]
      }
    ]
  }
}
```

### خصائص السمة

| الخاصية | مطلوبة | الوصف |
|---------|--------|-------|
| `name` | نعم | معرف السمة (PascalCase) |
| `category` | لا | فئة السمة (انظر أدناه) |
| `linkedEntity` | لا | الكيان الذي تعمل عليه هذه السمة |
| `description` | لا | وصف قابل للقراءة من قبل الإنسان |
| `emits` | لا | الأحداث التي يمكن لهذه السمة إصدارها |
| `listens` | لا | الأحداث التي تستمع لها هذه السمة |
| `stateMachine` | نعم | تعريف آلة الحالة |
| `ticks` | لا | التأثيرات المجدولة/الدورية |
| `config` | لا | مخطط التكوين |

---

## فئات السمات

يتم تصنيف السمات حسب غرضها الأساسي:

| الفئة | الغرض | التأثيرات النموذجية |
|-------|-------|---------------------|
| `interaction` | معالجة أحداث واجهة المستخدم من جانب العميل | `render-ui`، `navigate`، `notify` |
| `integration` | العمليات من جانب الخادم | `persist`، `fetch`، `call-service` |
| `lifecycle` | إدارة دورة حياة الكيان | `persist`، `emit` |
| `gameCore` | حلقة اللعبة والفيزياء | `set`، `emit`، ticks |
| `gameEntity` | سلوكيات كيانات اللعبة | `set`، `emit`، `render-ui` |
| `gameUi` | واجهة مستخدم اللعبة، HUD، عناصر التحكم | `render-ui`، `notify` |

### أمثلة الفئات

**سمة التفاعل (Interaction)** - تتعامل مع أحداث واجهة المستخدم:
```json
{
  "name": "FormInteraction",
  "category": "interaction",
  "stateMachine": {
    "transitions": [{
      "event": "SUBMIT",
      "effects": [
        ["render-ui", "main", { "type": "form", "loading": true }],
        ["emit", "FORM_SUBMITTED", "@payload"]
      ]
    }]
  }
}
```

**سمة التكامل (Integration)** - تتعامل مع عمليات الخادم:
```json
{
  "name": "DataPersistence",
  "category": "integration",
  "stateMachine": {
    "transitions": [{
      "event": "SAVE",
      "effects": [
        ["persist", "update", "Task", "@entity.id", "@payload"],
        ["emit", "DATA_SAVED", { "id": "@entity.id" }]
      ]
    }]
  }
}
```

---

## آلة الحالة (State Machine)

كل سمة لديها آلة حالة تحدد سلوكها.

### الحالات (States)

تمثل الحالات الحالات الممكنة للسمة:

```json
{
  "states": [
    { "name": "idle", "isInitial": true, "description": "في انتظار الإدخال" },
    { "name": "loading", "description": "جلب البيانات" },
    { "name": "active", "description": "جاهز للتفاعل" },
    { "name": "error", "isTerminal": true, "description": "حالة خطأ" }
  ]
}
```

| الخاصية | الوصف |
|---------|-------|
| `name` | معرف الحالة (أحرف صغيرة) |
| `isInitial` | حالة البداية (مطلوبة واحدة بالضبط) |
| `isTerminal` | لا توجد انتقالات صادرة متوقعة |
| `description` | وصف قابل للقراءة من قبل الإنسان |

### الأحداث (Events)

تشغل الأحداث انتقالات الحالة:

```json
{
  "events": [
    { "key": "INIT", "name": "Initialize" },
    { "key": "SUBMIT", "name": "Submit Form", "payload": [
      { "name": "email", "type": "string", "required": true },
      { "name": "name", "type": "string", "required": true }
    ]},
    { "key": "ERROR", "name": "Error Occurred" }
  ]
}
```

| الخاصية | الوصف |
|---------|-------|
| `key` | معرف الحدث (UPPER_SNAKE_CASE) |
| `name` | اسم العرض |
| `payload` | مخطط الحمولة المتوقعة |

### الانتقالات (Transitions)

تحدد الانتقالات كيف تتغير الحالات استجابة للأحداث:

```json
{
  "transitions": [
    {
      "from": "idle",
      "to": "loading",
      "event": "SUBMIT",
      "guard": ["and", ["!=", "@payload.email", ""], ["!=", "@payload.name", ""]],
      "effects": [
        ["set", "@entity.id", "email", "@payload.email"],
        ["persist", "create", "User", "@payload"]
      ]
    },
    {
      "from": ["loading", "active"],
      "to": "error",
      "event": "ERROR"
    }
  ]
}
```

| الخاصية | الوصف |
|---------|-------|
| `from` | الحالة المصدر - string أو مصفوفة |
| `to` | الحالة المستهدفة (دائمًا واحدة) |
| `event` | مفتاح الحدث المشغل |
| `guard` | شرط يجب أن يمر (اختياري) |
| `effects` | التأثيرات التي تنفذ عند الانتقال (اختياري) |

**الانتقالات من مصادر متعددة:** استخدم مصفوفة لـ `from` للتعامل مع نفس الحدث من حالات متعددة:
```json
{ "from": ["idle", "error"], "to": "loading", "event": "RETRY" }
```

---

## الحراس (Guards)

الحراس هي شروط يجب أن تقيم إلى `true` ليحدث الانتقال. تستخدم صيغة S-expression.

### عوامل الحراس

| الفئة | العوامل |
|-------|---------|
| المقارنة | `=`، `!=`، `<`، `>`، `<=`، `>=` |
| المنطق | `and`، `or`، `not` |
| الرياضيات | `+`، `-`، `*`، `/`، `%` |
| المصفوفة | `count`، `includes`، `every`، `some` |

### أمثلة الحراس

```json
// تساوي بسيط
["=", "@entity.status", "active"]

// شرط مركب
["and",
  ["!=", "@payload.email", ""],
  ["!=", "@payload.name", ""]
]

// مقارنة عددية
[">=", "@entity.balance", "@payload.amount"]

// فحص المصفوفة
[">", ["count", "@entity.items"], 0]

// إذن المستخدم
["=", "@entity.ownerId", "@user.id"]

// حارس معقد
["and",
  ["=", "@entity.status", "pending"],
  ["or",
    ["=", "@user.role", "admin"],
    ["=", "@entity.assigneeId", "@user.id"]
  ]
]
```

### روابط الحراس

يمكن للحراس الرجوع إلى البيانات من خلال الروابط (انظر [روابط الكيانات](./entities.md#entity-bindings-in-s-expressions)):

| الربط | الوصف |
|-------|-------|
| `@entity.field` | قيمة حقل الكيان الحالي |
| `@payload.field` | حقل حمولة الحدث |
| `@state` | اسم حالة السمة الحالية |
| `@user.id` | معرف المستخدم المصادق |
| `@now` | الطابع الزمني الحالي |

### فشل الحارس

إذا قيم الحارس إلى `false`:
1. يتم **حظر** الانتقال
2. لا تنفذ أي تأثيرات
3. تبقى الحالة دون تغيير
4. تشير الاستجابة إلى `transitioned: false`

---

## التأثيرات (Effects)

التأثيرات هي إجراءات تنفذ عند حدوث انتقال. تستخدم صيغة S-expression.

### أنواع التأثيرات

| التأثير | الخادم | العميل | الغرض |
|---------|--------|--------|-------|
| `render-ui` | يتجاهل | ينفذ | عرض نمط لواجهة المستخدم |
| `navigate` | يتجاهل | ينفذ | التنقل بين المسارات |
| `notify` | يتجاهل | ينفذ | عرض إشعار/تنبيه |
| `fetch` | ينفذ | يتجاهل | استعلام قاعدة البيانات |
| `persist` | ينفذ | يتجاهل | إنشاء/تحديث/حذف البيانات |
| `call-service` | ينفذ | يتجاهل | استدعاء API خارجي |
| `emit` | ينفذ | ينفذ | نشر حدث |
| `set` | ينفذ | ينفذ | تعديل حقل الكيان (يدعم الزيادة/النقصان عبر S-expressions) |

### نموذج التنفيذ المزدوج

تنفذ السمات على **كل من العميل والخادم** في نفس الوقت:

```
┌─────────────────────────────────────────────────────────────┐
│  العميل                         الخادم                      │
│  ───────                        ──────                      │
│  render-ui  ✓                   render-ui  → clientEffects  │
│  navigate   ✓                   navigate   → clientEffects  │
│  notify     ✓                   notify     → clientEffects  │
│  fetch      ✗                   fetch      ✓ (استعلام DB)   │
│  persist    ✗                   persist    ✓ (كتابة DB)     │
│  call-service ✗                 call-service ✓ (استدعاء API)│
│  emit       ✓ (EventBus)        emit       ✓ (عبر الوحدات)  │
│  set        ✓                   set        ✓                │
└─────────────────────────────────────────────────────────────┘
```

### أمثلة التأثيرات

**render-ui** - عرض نمط واجهة مستخدم:
```json
["render-ui", "main", {
  "type": "entity-table",
  "entity": "Task",
  "columns": ["title", "status", "dueDate"]
}]
```

**persist** - عمليات قاعدة البيانات:
```json
// إنشاء
["persist", "create", "Task", "@payload"]

// تحديث
["persist", "update", "Task", "@entity.id", { "status": "completed" }]

// حذف
["persist", "delete", "Task", "@entity.id"]
```

**fetch** - استعلام البيانات:
```json
["fetch", "Task", { "status": "active", "assigneeId": "@user.id" }]
```

**emit** - نشر حدث:
```json
["emit", "TASK_COMPLETED", { "taskId": "@entity.id", "completedBy": "@user.id" }]
```

**set** - تعديل حقل:
```json
["set", "@entity.id", "status", "active"]
["set", "@entity.id", "updatedAt", "@now"]
// الزيادة/النقصان باستخدام عوامل الرياضيات:
["set", "@entity.id", "score", ["+", "@entity.score", 10]]  // زيادة بـ 10
["set", "@entity.id", "health", ["-", "@entity.health", 5]]  // نقصان بـ 5
```

**ملاحظة:** `increment` و `decrement` ليسا نوعي تأثير منفصلين. استخدم تأثير `set` مع عوامل الرياضيات في S-expression (`+`، `-`) لتعديل الحقول الرقمية.

**navigate** - تغيير المسار:
```json
["navigate", "/tasks/@entity.id"]
```

**notify** - عرض إشعار:
```json
["notify", "تم إكمال المهمة بنجاح", "success"]
```

**call-service** - API خارجي:
```json
["call-service", "email", "send", {
  "to": "@entity.email",
  "subject": "تم تعيين مهمة",
  "body": "لقد تم تعيين مهمة جديدة لك."
}]
```

---

## linkedEntity - ربط السمة بالكيان

تحدد خاصية `linkedEntity` الكيان الذي تعمل عليه السمة.

### الكيان الأساسي

كل وحدة مدارية لها كيان أساسي. السمات بدون `linkedEntity` تستخدم هذا الكيان:

```json
{
  "name": "TaskManagement",
  "entity": { "name": "Task", "fields": [...] },
  "traits": [
    { "name": "StatusTrait" }  // يستخدم كيان Task
  ]
}
```

### linkedEntity صريح

حدد `linkedEntity` للعمل على كيان مختلف:

```json
{
  "name": "TaskManagement",
  "entity": { "name": "Task" },
  "traits": [
    { "name": "StatusTrait", "linkedEntity": "Task" },
    { "name": "CommentTrait", "linkedEntity": "Comment" },
    { "name": "PlayerStatsTrait", "linkedEntity": "Player" }
  ]
}
```

### لماذا linkedEntity؟

1. **سمات قابلة لإعادة الاستخدام** - يمكن لسمة عامة العمل مع أي كيان
2. **عمليات عبر الكيانات** - العمل على الكيانات المرتبطة
3. **أمان النوع** - المترجم يتحقق من مراجع حقول الكيان
4. **تبعيات واضحة** - الربط الصريح يحسن القابلية للقراءة

انظر [روابط الكيانات](./entities.md#linkedentity-concept) للمزيد من التفاصيل.

---

## التواصل بالأحداث (emit/listen)

تتواصل السمات من خلال الأحداث، مما يتيح الربط الفضفاض بين الوحدات المدارية.

### إصدار الأحداث

أعلن عن الأحداث التي يمكن للسمة إصدارها:

```json
{
  "name": "OrderFlow",
  "emits": [
    {
      "event": "ORDER_CONFIRMED",
      "scope": "external",
      "description": "يُطلق عند تأكيد الطلب",
      "payload": [
        { "name": "orderId", "type": "string" },
        { "name": "items", "type": "array" }
      ]
    }
  ]
}
```

أصدر في التأثيرات:
```json
["emit", "ORDER_CONFIRMED", { "orderId": "@entity.id", "items": "@entity.items" }]
```

### الاستماع للأحداث

أعلن عن الأحداث التي تستمع لها السمة:

```json
{
  "name": "InventorySync",
  "listens": [
    {
      "event": "ORDER_CONFIRMED",
      "triggers": "RESERVE_STOCK",
      "scope": "external",
      "payloadMapping": {
        "items": "@payload.items"
      },
      "guard": [">", ["count", "@payload.items"], 0]
    }
  ]
}
```

| الخاصية | الوصف |
|---------|-------|
| `event` | اسم الحدث للاستماع إليه |
| `triggers` | الحدث الداخلي للتشغيل (يفترض اسم الحدث افتراضيًا) |
| `scope` | `internal` (نفس الوحدة) أو `external` (عبر الوحدات) |
| `payloadMapping` | تحويل الحمولة الواردة |
| `guard` | شرط اختياري لتصفية الأحداث |

### نطاق الحدث

| النطاق | الوصف |
|--------|-------|
| `internal` | الأحداث داخل نفس الوحدة المدارية فقط |
| `external` | يمكن للأحداث عبر حدود الوحدات المدارية |

### تدفق التواصل عبر الوحدات المدارية

```
┌──────────────────┐         ┌──────────────────┐
│  OrderManagement │         │ InventoryManagement│
│                  │         │                  │
│  ┌────────────┐  │  emit   │  ┌────────────┐  │
│  │ OrderFlow  │──┼────────►│  │InventorySync│  │
│  └────────────┘  │ ORDER_  │  └────────────┘  │
│                  │CONFIRMED│                  │
└──────────────────┘         └──────────────────┘
```

1. سمة `OrderFlow` تصدر `ORDER_CONFIRMED` (نطاق خارجي)
2. ناقل الأحداث يبث إلى جميع السمات المستمعة
3. `InventorySync` تستقبل الحدث، تعيّن الحمولة
4. حدث `RESERVE_STOCK` يُشغل على `InventorySync`
5. آلة الحالة تعالج الانتقال بشكل طبيعي

---

## Ticks (التأثيرات المجدولة)

تعمل Ticks على تشغيل التأثيرات بشكل دوري، حتى بدون تفاعل المستخدم.

### تعريف Tick

```json
{
  "ticks": [
    {
      "name": "cleanup_expired",
      "interval": "60000",
      "guard": [">", ["count", "@entity.expiredSessions"], 0],
      "effects": [
        ["persist", "delete", "Session", { "expiresAt": ["<", "@now"] }]
      ],
      "description": "تنظيف الجلسات منتهية الصلاحية كل دقيقة"
    },
    {
      "name": "sync_status",
      "interval": "5000",
      "effects": [
        ["fetch", "ExternalStatus", {}],
        ["set", "@entity.id", "lastSync", "@now"]
      ]
    }
  ]
}
```

### خصائص Tick

| الخاصية | الوصف |
|---------|-------|
| `name` | معرف Tick |
| `interval` | مللي ثانية، أو string مثل `"5s"`، `"1m"` |
| `guard` | شرط (يتخطى Tick إذا كان false) |
| `effects` | التأثيرات التي تنفذ |
| `appliesTo` | معرفات كيانات محددة (اختياري) |
| `description` | وصف بشري |

### أنماط Tick الشائعة

**التنظيف:**
```json
{
  "name": "cleanup",
  "interval": "300000",
  "effects": [["persist", "delete", "TempData", { "createdAt": ["<", ["-", "@now", 86400000]] }]]
}
```

**المزامنة الدورية:**
```json
{
  "name": "sync",
  "interval": "10000",
  "effects": [
    ["call-service", "external-api", "fetch-updates", {}],
    ["emit", "DATA_SYNCED", { "timestamp": "@now" }]
  ]
}
```

**حلقة اللعبة:**
```json
{
  "name": "game_tick",
  "interval": "16",
  "effects": [
    ["set", "@entity.id", "position", ["+", "@entity.position", "@entity.velocity"]],
    ["render-ui", "canvas", { "type": "game-canvas" }]
  ]
}
```

---

## مراجع السمات مقابل السمات المضمنة

يمكن تعريف السمات مضمنة أو الإشارة إليها من مصادر خارجية.

### التعريف المضمن

حدد السمة مباشرة في الوحدة المدارية:

```json
{
  "orbital": "TaskManagement",
  "traits": [
    {
      "name": "StatusTrait",
      "stateMachine": {
        "states": [...],
        "transitions": [...]
      }
    }
  ]
}
```

### تعريف المرجع

أشر إلى سمة من المكتبة القياسية أو الاستيرادات:

```json
{
  "orbital": "TaskManagement",
  "uses": [
    { "from": "std/behaviors/crud", "as": "CRUD" }
  ],
  "traits": [
    {
      "ref": "CRUD.traits.CRUDManagement",
      "linkedEntity": "Task",
      "config": {
        "allowDelete": true,
        "softDelete": false
      }
    }
  ]
}
```

### خصائص المرجع

| الخاصية | الوصف |
|---------|-------|
| `ref` | مسار السمة (مثل `"Alias.traits.TraitName"`) |
| `linkedEntity` | تجاوز ربط الكيان |
| `config` | تجاوزات التكوين |

### متى تستخدم المراجع

- **الأنماط القابلة لإعادة الاستخدام** - CRUD، المصادقة، الترقيم
- **السلوكيات القياسية** - من `std/behaviors/`
- **المشاركة عبر المشاريع** - استيراد من مخططات أخرى
- **مدفوع بالتكوين** - نفس السمة، تكوين مختلف

---

## مثال كامل

سمة كاملة توضح جميع الميزات:

```json
{
  "name": "CheckoutFlow",
  "category": "integration",
  "linkedEntity": "Order",
  "description": "يدير عملية الدفع من السلة إلى التأكيد",

  "emits": [
    { "event": "ORDER_PLACED", "scope": "external", "payload": [
      { "name": "orderId", "type": "string" },
      { "name": "total", "type": "number" }
    ]},
    { "event": "PAYMENT_FAILED", "scope": "internal" }
  ],

  "listens": [
    { "event": "CART_UPDATED", "triggers": "RECALCULATE", "scope": "internal" },
    { "event": "INVENTORY_RESERVED", "triggers": "CONFIRM_STOCK", "scope": "external" }
  ],

  "stateMachine": {
    "states": [
      { "name": "cart", "isInitial": true, "description": "عربة التسوق" },
      { "name": "checkout", "description": "إدخال الشحن/الدفع" },
      { "name": "processing", "description": "معالجة الدفع" },
      { "name": "confirmed", "description": "تم تأكيد الطلب" },
      { "name": "failed", "isTerminal": true, "description": "فشل الطلب" }
    ],

    "events": [
      { "key": "PROCEED", "name": "Proceed to Checkout" },
      { "key": "SUBMIT", "name": "Submit Order", "payload": [
        { "name": "paymentMethod", "type": "string", "required": true }
      ]},
      { "key": "PAYMENT_SUCCESS", "name": "Payment Succeeded" },
      { "key": "PAYMENT_FAILED", "name": "Payment Failed" },
      { "key": "RECALCULATE", "name": "Recalculate Totals" },
      { "key": "CONFIRM_STOCK", "name": "Stock Confirmed" }
    ],

    "transitions": [
      {
        "from": "cart",
        "to": "checkout",
        "event": "PROCEED",
        "guard": [">", ["count", "@entity.items"], 0],
        "effects": [
          ["render-ui", "main", { "type": "form", "schema": "checkout" }]
        ]
      },
      {
        "from": "checkout",
        "to": "processing",
        "event": "SUBMIT",
        "guard": ["and",
          ["!=", "@payload.paymentMethod", ""],
          [">=", "@entity.total", 0]
        ],
        "effects": [
          ["set", "@entity.id", "paymentMethod", "@payload.paymentMethod"],
          ["set", "@entity.id", "status", "processing"],
          ["call-service", "payment", "charge", {
            "amount": "@entity.total",
            "method": "@payload.paymentMethod"
          }],
          ["render-ui", "main", { "type": "stats", "loading": true }]
        ]
      },
      {
        "from": "processing",
        "to": "confirmed",
        "event": "PAYMENT_SUCCESS",
        "effects": [
          ["set", "@entity.id", "status", "confirmed"],
          ["set", "@entity.id", "confirmedAt", "@now"],
          ["persist", "update", "Order", "@entity.id", "@entity"],
          ["emit", "ORDER_PLACED", { "orderId": "@entity.id", "total": "@entity.total" }],
          ["notify", "تم تأكيد الطلب!", "success"],
          ["navigate", "/orders/@entity.id"]
        ]
      },
      {
        "from": "processing",
        "to": "failed",
        "event": "PAYMENT_FAILED",
        "effects": [
          ["set", "@entity.id", "status", "failed"],
          ["emit", "PAYMENT_FAILED", { "orderId": "@entity.id" }],
          ["notify", "فشل الدفع. يرجى المحاولة مرة أخرى.", "error"]
        ]
      },
      {
        "from": ["cart", "checkout"],
        "to": "cart",
        "event": "RECALCULATE",
        "effects": [
          ["set", "@entity.id", "total", ["array/reduce", "@entity.items",
            ["lambda", ["sum", "item"], ["+", "@sum", "@item.price"]], 0]]
        ]
      }
    ]
  },

  "ticks": [
    {
      "name": "expire_abandoned",
      "interval": "300000",
      "guard": ["and",
        ["=", "@state", "checkout"],
        ["<", "@entity.updatedAt", ["-", "@now", 1800000]]
      ],
      "effects": [
        ["set", "@entity.id", "status", "abandoned"],
        ["persist", "update", "Order", "@entity.id", { "status": "abandoned" }]
      ]
    }
  ]
}
```

---

## ملخص

يوفر نظام السمات في Almadar:

1. **آلات الحالة** - تحديد الحالات والانتقالات الممكنة
2. **الحراس** - حماية الانتقالات بشروط منطقية
3. **التأثيرات** - تنفيذ إجراءات عند الانتقال (UI، قاعدة البيانات، الأحداث)
4. **التنفيذ المزدوج** - تأثيرات الخادم (persist، fetch) + تأثيرات العميل (render، navigate)
5. **التواصل بالأحداث** - emit/listen للرسائل عبر السمات والوحدات المدارية
6. **Ticks** - التأثيرات الدورية المجدولة
7. **linkedEntity** - الربط الصريح بـ [بيانات الكيان](./entities.md)
8. **الفئات** - تصنيف السمات حسب الغرض (interaction، integration، game)
9. **إمكانية إعادة الاستخدام** - الإشارة إلى السمات من المكتبات أو التعريف مضمنًا

السمات هي الأساس السلوكي للوحدات المدارية - فهي تحدد *كيف* تتغير الكيانات بمرور الوقت من خلال نموذج آلة الحالة التصريحي القابل للتركيب.

---

*تم إنشاء المستند: 2026-02-02*
*بناءً على تحليل قاعدة بيانات orbital-rust وbuilder packages*
