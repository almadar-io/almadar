# توليد المخططات بالذكاء الاصطناعي (Generating Schemas with an LLM)

مخططات المدار عبارة عن JSON منظَّم — وهذا الهيكل يجعلها أهدافاً مثالية لتوليد نماذج اللغة الكبيرة (LLM). تصف تطبيقك بلغة عادية؛ يُخرج النموذج مخطط `.orb` صالح.

يغطي هذا الدرس:
- تثبيت واستخدام مهارة المدار (Almadar Skill)
- استفسار نموذج اللغة لتوليد مخطط كامل
- التحقق من الناتج
- إصلاح الأخطاء الأكثر شيوعاً التي ترتكبها النماذج

---

## مهارة المدار (The Almadar Skill)

تتضمن حزمة `@almadar/skills` مهارة Claude Code تُعلّم النموذج مواصفات لغة المدار الكاملة — المدارات، والكيانات، والسمات، وآلات الحالة، والأنماط، والتعابير S، والمزيد.

### التثبيت (Install)

```bash
npm install -g @almadar/skills
```

ثم ثبّت مهارة Claude Code:

```bash
almadar-skills install almadar-orbitals
```

أو استخدمها مباشرة في Claude Code بالإشارة إلى ملف المهارة في جلستك.

---

## سير عمل التوليد (The Generation Workflow)

```
1. صف تطبيقك بلغة عادية
       ↓
2. يُفكّك النموذج إلى مدارات (واحد لكل نطاق كيان)
       ↓
3. يُولّد النموذج: كيان + سمات + آلات حالة + صفحات
       ↓
4. التحقق: almadar validate schema.orb
       ↓
5. إصلاح أي أخطاء، والتكرار
       ↓
6. التشغيل: almadar dev
```

---

## كيفية الاستفسار عن مخطط (How to Prompt for a Schema)

### استفسار التفكيك (The Decomposition Prompt)

ابدأ بمطالبة النموذج بتفكيك تطبيقك إلى مدارات قبل كتابة JSON:

```
أريد بناء تطبيق إدارة مشاريع يحتوي على:
- مشاريع (اسم، وصف، حالة: نشط/مؤرشف)
- مهام (عنوان، أولوية، منفَّذ، تاريخ استحقاق، مرتبط بمشروع)
- مستخدمون (اسم، بريد إلكتروني، دور: مسؤول/عضو)

يمكن إنشاء المهام وتعديلها وحذفها ونقلها عبر الحالات:
للتنفيذ → قيد التنفيذ → مراجعة → منجزة.

عندما تكتمل مهمة، يجب تحديث عداد المهام المكتملة للمشروع.

يرجى تفكيك هذا إلى مدارات المدار وتوليد مخطط كامل.
```

### ما يجب تضمينه في استفسارك (What to Include in Your Prompt)

يغطي استفسار التوليد الجيد:

| العنصر | المثال |
|--------|--------|
| **الكيانات (Entities)** | "المهام لها عنوان، أولوية (منخفضة/متوسطة/عالية)، تاريخ استحقاق، منفَّذ" |
| **الاستمرار (Persistence)** | "المهام دائمة (مخزَّنة في قاعدة البيانات)، السلة وقت التشغيل (للجلسة فقط)" |
| **سير العمل (Workflows)** | "المهام تنتقل من للتنفيذ → قيد التنفيذ → مراجعة → منجزة" |
| **سلوكيات الواجهة (UI behaviors)** | "يمكن للمستخدمين سرد المهام وإنشاؤها وتعديلها وحذفها في صفحة /tasks" |
| **قواعد الأعمال (Business rules)** | "فقط المنفَّذ يمكنه تحديد المهمة منجزة" |
| **الاتصالات (Connections)** | "عند اكتمال مهمة، حدّث عداد المشروع" |
| **الصفحات المطلوبة (Pages needed)** | "أحتاج مسارات /tasks و/projects و/users" |

---

## ما يجب أن يُنتج النموذج (What the LLM Should Produce)

لكل مدار، يجب أن يُخرج النموذج الأجزاء الأربعة المطلوبة:

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

## الأخطاء الأكثر شيوعاً للنماذج (The Most Common LLM Mistakes)

النماذج التي لا تحمل مهارة المدار ترتكب أخطاء متوقعة. تعلّم كيف تكتشفها.

### 1. غياب `pages` (الأكثر شيوعاً — Missing pages)

النموذج يُولّد الكيان + السمات لكنه ينسى مصفوفة الصفحات كلياً.

```json
// ❌ غير مكتمل — لا صفحات
{
  "name": "TaskManager",
  "orbitals": [{
    "name": "Tasks",
    "entity": { ... },
    "traits": [ { "name": "TaskCRUD", ... } ]
  }]
}

// ✅ أضف الصفحات
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

**استفسار الإصلاح:** `"المخطط يفتقر إلى مصفوفة pages لكل مدار. يرجى إضافة صفحات مع path وtraits[].ref لكل مدار."`

---

### 2. الحالات كنصوص بدلاً من كائنات (States as strings instead of objects)

```json
// ❌ خاطئ
"states": ["Pending", "InProgress", "Done"]

// ✅ صحيح
"states": [
  { "name": "Pending", "isInitial": true },
  { "name": "InProgress" },
  { "name": "Done", "isTerminal": true }
]
```

**استفسار الإصلاح:** `"يجب أن تكون الحالات كائنات مع خاصية 'name'. الحالة الأولية تحتاج 'isInitial': true. الحالات النهائية تحتاج 'isTerminal': true."`

---

### 3. غياب انتقال INIT (Missing INIT transition)

الصفحة تُحمَّل لكنها لا تُعرض شيئاً لأنه لا توجد حلقة ذاتية INIT مع `render-ui`.

```json
// ❌ لا INIT — الصفحة فارغة
"transitions": [
  { "from": "Pending", "event": "COMPLETE", "to": "Done", "effects": [...] }
]

// ✅ أضف INIT
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

**استفسار الإصلاح:** `"كل سمة تفاعلية تحتاج انتقال INIT (حلقة ذاتية) يُطلق render-ui لعرض الواجهة الأولية. بدونه ستكون الصفحة فارغة."`

---

### 4. استخدام خصائص الإجراءات المُهمَلة (Using deprecated action props)

```json
// ❌ مُهمَل — هذا سيفشل في التحقق
{ "type": "form-section", "onSubmit": "SAVE", "onCancel": "CANCEL" }

// ✅ صحيح
{ "type": "form-section", "submitEvent": "SAVE", "cancelEvent": "CANCEL" }
```

```json
// ❌ مُهمَل
{ "type": "page-header", "headerActions": [...] }

// ✅ صحيح
{ "type": "page-header", "actions": [...] }
```

---

### 5. مصفوفة السمات على مستوى المخطط (Schema-level traits array — wrong structure)

```json
// ❌ خاطئ — السمات على المستوى الجذري (تنسيق قديم)
{
  "name": "App",
  "traits": [...],
  "pages": [...]
}

// ✅ صحيح — السمات تعيش داخل المدارات
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

### 6. غياب `linkedEntity` على السمة (Missing linkedEntity on trait)

```json
// ❌ غياب linkedEntity
{ "name": "TaskCRUD", "category": "interaction", "stateMachine": { ... } }

// ✅ صحيح
{ "name": "TaskCRUD", "linkedEntity": "Task", "category": "interaction", "stateMachine": { ... } }
```

---

## التوليد التكراري للتطبيقات الكبيرة (Iterative Generation for Large Apps)

للتطبيقات التي تحتوي على أكثر من 3-4 مدارات، ولّد مداراً واحداً في كل مرة:

```
الخطوة 1: "ولّد فقط مدار TaskManager (كيان + سمات + صفحات)"
الخطوة 2: "الآن أضف مدار ProjectManager الذي يستمع إلى TASK_COMPLETED من TaskManager"
الخطوة 3: "الآن أضف مدار UserManager لتصفح المستخدمين"
الخطوة 4: "ادمج المدارات الثلاثة في مخطط واحد"
```

هذا يُقلل الأخطاء ويجعل كل جزء قابلاً للمراجعة قبل التجميع.

---

## التحقق من الناتج (Validating the Output)

تحقَّق دائماً قبل التشغيل:

```bash
almadar validate schema.orb
```

أخطاء التحقق الشائعة وما تعنيه:

| الخطأ | السبب |
|-------|-------|
| `Missing initial state` | لا توجد حالة لديها `"isInitial": true` |
| `Unknown event in transition` | انتقال يُشير إلى مفتاح حدث غير موجود في مصفوفة `events` |
| `Missing pages` | مدار لديه سمات لكن لا مصفوفة `pages` |
| `Invalid pattern type` | النوع `type` في تأثير `render-ui` ليس اسم نمط صالحاً |
| `Deprecated prop` | استخدام `onSubmit` بدلاً من `submitEvent`، إلخ |
| `Circular dependency` | مداران يستمعان لبعضهما (استخدم مداراً وسيطاً ثالثاً) |

---

## استفسار مرجعي (A Reference Prompt — Copy & Use)

هذا الاستفسار يعمل جيداً مع تثبيت مهارة المدار:

```
باستخدام لغة المدار، ولّد مخطط .orb كاملاً لـ: [وصف تطبيقك]

المتطلبات:
- كل نطاق ميزة يصبح مداراً واحداً مع: كيان، سمات، صفحات
- كل سمة يجب أن تحتوي على انتقال INIT بحلقة ذاتية يُعرض الواجهة الأولية باستخدام render-ui
- يجب أن تكون الحالات كائنات: { "name": "StateName", "isInitial": true }
- يجب أن تكون الصفحات موجودة مع ربط path وtraits[].ref
- استخدم "submitEvent"/"cancelEvent" على form-section (وليس onSubmit/onCancel)
- استخدم "actions" على page-header (وليس headerActions)
- جميع السمات تنتمي داخل المدارات — لا توجد مصفوفة سمات على مستوى المخطط

الكيانات المطلوبة: [قائمة الكيانات]
سير العمل: [صف انتقالات الحالة]
الصفحات المطلوبة: [قائمة المسارات]
قواعد الأعمال / الصلاحيات: [صف الحراس]
الاتصالات بين المدارات: [صف الإصدارات/الاستماع إن وُجد]
```

---

## الخطوات التالية

- [تشريح مدار كامل (Complete Orbital)](../beginner/complete-orbital) — افهم كيف يبدو المخطط الصالح
- [أنماط الواجهة (UI Patterns) وrender-ui](../intermediate/ui-patterns) — جميع أنواع الأنماط المتاحة وخصائصها
- [التواصل بين المدارات (Cross-Orbital Communication)](../intermediate/cross-orbital) — كيفية وصف الإصدارات/الاستماع للنموذج
- [بناء تطبيق كامل (Full App)](./full-app) — مثال مرجعي لإظهاره للنموذج
