# أنماط الواجهة (UI Patterns) وrender-ui

> المصدر: [`tests/schemas/08-patterns.orb`](../../../../tests/schemas/08-patterns.orb)

واجهة المدار مدفوعة بالكامل بتأثيرات `render-ui` داخل انتقالات آلة الحالة. لا يوجد JSX أو ملفات قوالب أو شجرة مكونات منفصلة — آلة الحالة *هي* منطق الواجهة.

---

## كيف يعمل render-ui

```json
["render-ui", "slot", { "type": "pattern", ...props }]
```

| المعامل | الوصف |
|---------|--------|
| `"slot"` | أين تُعرض المكوّن على الصفحة |
| `{ "type": "..." }` | نمط المكوّن (Pattern) المستخدم |
| `...props` | الإعدادات الخاصة بالنمط |

**لمسح فتحة (Slot):**
```json
["render-ui", "slot", null]
```

---

## الفتحات (Slots)

الفتحات تقسّم الصفحة إلى مناطق مسمّاة. كل فتحة تملكها سمة (Trait) واحدة في وقت واحد.

| الفتحة (Slot) | الاستخدام الاعتيادي |
|------|-------------|
| `main` | منطقة المحتوى الرئيسية |
| `modal` | نوافذ الحوار (النماذج، التأكيدات) |
| `drawer` | اللوحة الجانبية (عرض التفاصيل) |
| `sidebar` | التنقل الجانبي الثابت |
| `overlay` | تغطيات الشاشة الكاملة |
| `hud-top` / `hud-bottom` | الرؤوس/التذييلات الثابتة |
| `toast` | إشعارات Toast |

---

## فئات الأنماط (Pattern Categories)

### أنماط العرض (Display Patterns)

**`entity-table`** — جدول بيانات مع أعمدة وفرز وإجراءات للصفوف.

```json
["render-ui", "main", {
  "type": "entity-table",
  "entity": "Product",
  "columns": ["name", "price", "stock", "category"],
  "itemActions": [
    { "event": "VIEW", "label": "عرض" },
    { "event": "EDIT", "label": "تعديل" },
    { "event": "DELETE", "label": "حذف" }
  ]
}]
```

**`entity-detail`** — عرض تفاصيل سجل واحد للقراءة فقط.

```json
["render-ui", "main", {
  "type": "entity-detail",
  "entity": "Product",
  "fields": ["name", "description", "price", "stock", "category"]
}]
```

**`stats`** — بطاقات إحصائيات لوحة التحكم (Counts، Totals، Summaries).

```json
["render-ui", "main", {
  "type": "stats",
  "items": [
    { "label": "إجمالي المنتجات", "value": "@entity.count" },
    { "label": "نفدت الكمية", "value": "@entity.outOfStock" }
  ]
}]
```

---

### أنماط النماذج (Form Patterns)

**`form`** — نموذج مُولَّد تلقائياً لكيان ما.

```json
["render-ui", "main", {
  "type": "form",
  "entity": "Product",
  "fields": [
    { "name": "name", "label": "اسم المنتج", "required": true },
    { "name": "description", "label": "الوصف", "type": "textarea" },
    { "name": "price", "label": "السعر", "type": "number", "required": true },
    { "name": "stock", "label": "المخزون", "type": "number" },
    { "name": "category", "label": "الفئة" }
  ]
}]
```

**`form-section`** — نموذج داخل مودال أو درج (drawer) مع SAVE/CANCEL مرتبط بأحداث (Events).

```json
["render-ui", "modal", {
  "type": "form-section",
  "entity": "Task",
  "fields": ["title", "priority", "dueDate"],
  "submitEvent": "SAVE",
  "cancelEvent": "CANCEL"
}]
```

> **مهم:** استخدم `submitEvent` و`cancelEvent` (وليس `onSubmit`/`onCancel` — هذه مُهمَلة).

---

### أنماط التنقل والرأس (Navigation & Header Patterns)

**`page-header`** — عنوان الصفحة مع أزرار الإجراءات الاختيارية.

```json
["render-ui", "main", {
  "type": "page-header",
  "title": "المنتجات",
  "subtitle": "أدر كتالوج منتجاتك",
  "actions": [
    { "event": "CREATE", "label": "منتج جديد", "variant": "primary" }
  ]
}]
```

---

### أنماط الحالة (State Patterns)

**`empty-state`** — يُعرض عندما لا توجد بيانات.

```json
["render-ui", "main", {
  "type": "empty-state",
  "title": "لا منتجات بعد",
  "description": "أضف منتجك الأول للبدء",
  "actions": [{ "event": "CREATE", "label": "إضافة منتج" }]
}]
```

**`loading-state`** — حالة التحميل أثناء جلب البيانات.

```json
["render-ui", "main", {
  "type": "loading-state",
  "title": "جارٍ تحميل المنتجات..."
}]
```

---

## الواجهة المدفوعة بالحالة (State-Driven UI): مثال كامل

من `08-patterns.orb` — سمة `ProductCRUD` الكاملة:

```json
{
  "name": "ProductCRUD",
  "linkedEntity": "Product",
  "category": "interaction",
  "stateMachine": {
    "states": [
      { "name": "listing", "isInitial": true },
      { "name": "viewing" },
      { "name": "editing" },
      { "name": "creating" }
    ],
    "events": [
      { "key": "INIT", "name": "تهيئة" },
      { "key": "VIEW", "name": "عرض المنتج", "payload": [
        { "name": "id", "type": "string", "required": true }
      ]},
      { "key": "EDIT", "name": "تعديل المنتج" },
      { "key": "CREATE", "name": "إنشاء منتج" },
      { "key": "SAVE", "name": "حفظ" },
      { "key": "CANCEL", "name": "إلغاء" },
      { "key": "BACK", "name": "العودة للقائمة" },
      { "key": "DELETE", "name": "حذف المنتج" }
    ],
    "transitions": [
      {
        "from": "listing", "event": "INIT", "to": "listing",
        "effects": [
          ["fetch", "Product"],
          ["render-ui", "main", {
            "type": "entity-table", "entity": "Product",
            "columns": ["name", "price", "stock", "category"],
            "itemActions": [
              { "event": "VIEW", "label": "عرض" },
              { "event": "EDIT", "label": "تعديل" },
              { "event": "DELETE", "label": "حذف" }
            ]
          }]
        ]
      },
      {
        "from": "listing", "event": "VIEW", "to": "viewing",
        "effects": [
          ["fetch", "Product", "@payload.id"],
          ["render-ui", "main", {
            "type": "entity-detail", "entity": "Product",
            "fields": ["name", "description", "price", "stock", "category"]
          }]
        ]
      },
      {
        "from": "listing", "event": "CREATE", "to": "creating",
        "effects": [
          ["render-ui", "main", {
            "type": "form", "entity": "Product",
            "fields": [
              { "name": "name", "label": "اسم المنتج", "required": true },
              { "name": "price", "label": "السعر", "type": "number", "required": true }
            ]
          }]
        ]
      },
      {
        "from": "viewing", "event": "EDIT", "to": "editing",
        "effects": [["render-ui", "main", { "type": "form", "entity": "Product", "mode": "edit" }]]
      },
      {
        "from": "viewing", "event": "BACK", "to": "listing",
        "effects": [["navigate", "/products"]]
      },
      {
        "from": "editing", "event": "SAVE", "to": "viewing",
        "effects": [
          ["persist", "update", "Product", "@entity"],
          ["notify", "success", "تم حفظ المنتج"]
        ]
      },
      { "from": "editing", "event": "CANCEL", "to": "viewing" },
      {
        "from": "creating", "event": "SAVE", "to": "listing",
        "effects": [
          ["persist", "update", "Product", "@entity"],
          ["notify", "success", "تم إنشاء المنتج"],
          ["navigate", "/products"]
        ]
      },
      { "from": "creating", "event": "CANCEL", "to": "listing",
        "effects": [["navigate", "/products"]]
      },
      {
        "from": "listing", "event": "DELETE", "to": "listing",
        "effects": [
          ["persist", "delete", "Product", "@payload.id"],
          ["notify", "info", "تم حذف المنتج"]
        ]
      }
    ]
  }
}
```

مع الصفحات (Pages):

```json
"pages": [
  {
    "name": "ProductListPage",
    "path": "/products",
    "traits": [{ "ref": "ProductCRUD", "linkedEntity": "Product" }]
  },
  {
    "name": "ProductDetailPage",
    "path": "/products/:id",
    "traits": [{ "ref": "ProductCRUD", "linkedEntity": "Product" }]
  }
]
```

**ما تعرضه آلة الحالة (State Machine) حسب الحالة (State):**

| الحالة (State) | الفتحة `main` تعرض |
|-------|---------------------|
| `listing` | `entity-table` مع إجراءات الصفوف |
| `viewing` | `entity-detail` مع الحقول |
| `editing` | `form` في وضع التعديل |
| `creating` | `form` مع جميع الحقول |

---

## مرجع خصائص الإجراءات (Action Props Reference)

الإجراءات (Actions) تُعرَّف **داخل** خصائص النمط، وليس كأنماط منفصلة.

| النمط (Pattern) | كيفية ربط الإجراءات |
|---------|---------------------|
| `entity-table` | `itemActions: [{ "event": "EDIT", "label": "تعديل" }]` |
| `entity-detail` | `actions: [{ "event": "EDIT", "label": "تعديل" }]` |
| `form-section` | `submitEvent: "SAVE"`, `cancelEvent: "CANCEL"` |
| `page-header` | `actions: [{ "event": "CREATE", "label": "جديد" }]` |
| `empty-state` | `actions: [{ "event": "CREATE", "label": "إضافة" }]` |

---

## الربط في خصائص الأنماط (Bindings in Pattern Props)

خصائص الأنماط تقبل الارتباطات (Bindings) لقراءة البيانات الحية:

| الارتباط (Binding) | يُقيَّم إلى |
|---------|-------------|
| `@entity.field` | قيمة حقل الكيان الحالي |
| `@payload.field` | حقل بيانات الحدث (Event Payload) |
| `@state` | اسم الحالة الحالية |
| `@now` | الطابع الزمني الحالي |

---

## الخطوات التالية

- [الحراس (Guards) وقواعد الأعمال](./guards) — أضف شروطاً للتحكم في الانتقالات
- [التواصل بين المدارات (Cross-Orbital Communication)](./cross-orbital) — اربط المدارات معاً
- [بناء تطبيق كامل (Full App)](../advanced/full-app) — جمّع مدارات متعددة معاً
