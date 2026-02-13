---
slug: schema-first-development
title: "التطوير بالمخطط أولاً: لماذا نكتب JSON قبل TypeScript"
authors: [osamah]
tags: [architecture, tutorial]
image: /img/blog/schema-first-development.png
---

![التطوير بالمخطط أولاً: المخطط الذي يصبح المبنى](/img/blog/schema-first-development.png)

ماذا لو عرّفت تطبيقك بالكامل في ملف JSON واحد قبل كتابة أي كود مكوّنات؟

<!-- truncate -->

## التدفق التقليدي

يبدو تطوير الواجهات الأمامية في الغالب هكذا:

1. تصميم نماذج الواجهة
2. إنشاء التسلسل الهرمي للمكوّنات
3. تعريف واجهات TypeScript
4. بناء المكوّنات
5. إضافة إدارة الحالة
6. الربط بالخادم الخلفي
7. اكتشاف أن الواجهة البرمجية لا تتوافق مع الأنواع
8. إعادة هيكلة كل شيء

إنه تكراري، استكشافي، وغالباً ما يؤدي إلى عدم تطابق بين الواجهة الأمامية والخلفية.

## البديل: المخطط أولاً

يعكس المدار هذا التدفق:

1. **عرّف المخطط** — الكيانات، السمات، الصفحات، آلات الحالة
2. **تحقق منه** — التقط الأخطاء قبل كتابة الكود
3. **صرّفه** — وَلِّد TypeScript أو Python أو Rust
4. **شغّله** — شاهده يعمل فوراً
5. **خصّصه** — أضف منطق الأعمال حيث يلزم

يصبح المخطط **مصدر الحقيقة الوحيد** لتطبيقك بالكامل.

## ماذا يحتوي المخطط؟

يحتوي مخطط المدار (ملف `.orb`) على:

```json
{
  "name": "TaskApp",
  "version": "1.0.0",
  "orbitals": [
    {
      "name": "TaskManagement",
      "entity": {
        "name": "Task",
        "collection": "tasks",
        "fields": [
          { "name": "id", "type": "string", "required": true, "primaryKey": true },
          { "name": "title", "type": "string", "required": true },
          { "name": "status", "type": "enum", "values": ["todo", "in-progress", "done"] },
          { "name": "assigneeId", "type": "relation", "relation": { "entity": "User" } }
        ]
      },
      "traits": [
        {
          "name": "TaskBrowser",
          "linkedEntity": "Task",
          "stateMachine": {
            "states": [
              { "name": "Browsing", "isInitial": true },
              { "name": "Creating" },
              { "name": "Editing" }
            ],
            "events": [
                      { "key": "INIT", "name": "Initialize" },
                      { "key": "CREATE", "name": "Create" },
                      { "key": "EDIT", "name": "Edit" },
                      { "key": "SAVE", "name": "Save" },
                      { "key": "CANCEL", "name": "Cancel" }
                    ],
            "transitions": [
              {
                "from": "Browsing",
                "to": "Browsing",
                "event": "INIT",
                "effects": [
                  ["render-ui", "main", {
                    "type": "page-header",
                    "title": "Tasks",
                    "actions": [{ "label": "New Task", "event": "CREATE" }]
                  }],
                  ["render-ui", "main", {
                    "type": "entity-table",
                    "entity": "Task",
                    "columns": ["title", "status"],
                    "itemActions": [
                      { "label": "Edit", "event": "EDIT" }
                    ]
                  }]
                ]
              },
              {
                "from": "Browsing",
                "to": "Creating",
                "event": "CREATE",
                "effects": [
                  ["render-ui", "modal", {
                    "type": "form-section",
                    "entity": "Task",
                    "fields": ["title", "status"],
                    "submitEvent": "SAVE",
                    "cancelEvent": "CANCEL"
                  }]
                ]
              },
              {
                "from": "Creating",
                "to": "Browsing",
                "event": "SAVE",
                "effects": [
                  ["persist", "create", "Task", "@payload.data"],
                  ["render-ui", "modal", null],
                  ["emit", "INIT"]
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
          "traits": [{ "ref": "TaskBrowser" }]
        }
      ]
    }
  ]
}
```

هذا الملف الواحد يعرّف:
- **نموذج البيانات** (كيان مع حقول)
- **منطق الأعمال** (آلة حالة مع انتقالات)
- **هيكل الواجهة** (تأثيرات render-ui مع أنماط)
- **المسارات** (صفحات مع مسارات URL)

## شبكة أمان التحقق

قبل توليد الكود، يتحقق المدار من مخططك:

```bash
$ orbital validate task-app.orb

✓ Schema structure valid
✓ Entity fields valid
✓ State machine complete
✓ All transitions have handlers
✓ Pattern props match registry
✓ Closed circuit verified

Validation passed! Ready to compile.
```

إذا كان هناك خطأ:

```bash
✗ Error: CIRCUIT_NO_OVERLAY_EXIT
  State 'Creating' renders to 'modal' slot but has no exit transition.
  Users will be stuck in this overlay.

  Fix: Add a transition from 'Creating' with event 'CANCEL' or 'CLOSE'
```

هذا يلتقط الأخطاء **قبل أن تكتب أي كود**.

## توليد التطبيقات

بعد التحقق، صرّف إلى هدفك المطلوب:

```bash
# TypeScript/React
orbital compile task-app.orb --shell typescript -o output/

# Python/FastAPI
orbital compile task-app.orb --shell python -o output/

# Rust/Axum
orbital compile task-app.orb --shell rust -o output/
```

كل هدف يُولّد:
- **واجهة أمامية**: مكوّنات React مع آلة الحالة الخاصة بك
- **خادم خلفي**: مسارات API مع نماذج قاعدة البيانات
- **أنواع**: أنواع TypeScript/Python/Rust مشتركة
- **إدارة الحالة**: ناقل الأحداث وانتقالات الحالة

## قاعدة "لا تحرّر الكود المُولَّد أبداً"

هنا الجزء غير البديهي: **لا تحرّر الملفات المُولَّدة**.

إذا احتجت تغييرات:
1. حرّر مخطط `.orb`
2. أعد التصريف
3. التغييرات تتدفق تلقائياً

هذا يضمن:
- **الاتساق**: المخطط والكود متطابقان دائماً
- **قابلية التكرار**: نفس المخطط = نفس المخرجات
- **قابلية النقل**: صرّف لأهداف مختلفة من مصدر واحد

## تشبيه واقعي: ترحيل مخطط قاعدة البيانات

إذا استخدمت Rails أو Django أو Prisma، فأنت تعرف نمذجة البيانات بالمخطط أولاً:

```ruby
# Rails migration
class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :status
      t.timestamps
    end
  end
end
```

يوسّع المدار هذه الفكرة لتشمل **التطبيق بأكمله**:
- ليس مخطط قاعدة البيانات فحسب
- بل آلات الحالة والواجهة والمسارات والتأثيرات أيضاً

## متى تستخدم التطوير بالمخطط أولاً

يتفوق التطوير بالمخطط أولاً في:

| السيناريو | الفائدة |
|-----------|---------|
| **منتج جديد** | ابدأ بالهيكل، كرّر بسرعة |
| **توسيع الفريق** | المخطط مقروء للجميع (مدراء المنتج، المصممون، المطورون) |
| **منصات متعددة** | مخطط واحد ← ويب، موبايل، سطح مكتب |
| **صناعات مُنظَّمة** | المخطط = مواصفات قابلة للتدقيق |
| **مساعدة الذكاء الاصطناعي** | نماذج اللغة الكبيرة تتفوق في توليد مخططات منظّمة |

## جرّبه: ابنِ مدونة في 5 دقائق

أنشئ ملف `blog.orb`:

```json
{
  "name": "Blog",
  "version": "1.0.0",
  "orbitals": [
    {
      "name": "PostManagement",
      "uses": [{ "from": "std/List", "as": "List" }],
      "entity": {
        "name": "Post",
        "fields": [
          { "name": "title", "type": "string", "required": true },
          { "name": "content", "type": "string", "required": true },
          { "name": "published", "type": "boolean", "default": false }
        ]
      },
      "traits": [{ "ref": "List.traits.ListManagement" }],
      "pages": [{ "name": "PostsPage", "path": "/posts" }]
    }
  ]
}
```

صرّف وشغّل:
```bash
orbital compile blog.orb --shell typescript -o blog-app/
cd blog-app && npm install && npm run dev
```

لديك الآن لوحة إدارة مدونة تعمل مع قائمة وإنشاء وتعديل وحذف.

## الخلاصة

التطوير بالمخطط أولاً ليس عن إزالة المرونة — بل عن **الوضوح أولاً، المرونة ثانياً**.

بتعريف هيكل تطبيقك تصريحياً:
- تلتقط الأخطاء مبكراً
- فريقك لديه مواصفات مشتركة وقابلة للقراءة
- مساعدو الذكاء الاصطناعي يمكنهم فهم وتعديل تطبيقك
- يمكنك استهداف منصات متعددة

يصبح المخطط **التوثيق الذي يُنفَّذ**.

هل أنت مستعد لكتابة مخططك الأول؟ اطّلع على [دليل البدء](/docs/getting-started/introduction).
