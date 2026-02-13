---
slug: s-expressions-json-functional
title: "التعبيرات الرمزية: صيغة JSON للبرمجة الوظيفية (التي تكون منطقية فعلاً)"
image: /img/blog/s-expressions-json-functional.png
authors: [osamah]
tags: [architecture]
---

![التعبيرات الرمزية وJSON والنهضة الوظيفية](/img/blog/s-expressions-json-functional.png)

لماذا اخترنا التعبيرات الرمزية بأسلوب Lisp بدلاً من JSON لتعريف المنطق، ولماذا قد تفعل ذلك أيضاً.

الجميع يحب JSON، لكن عندما تحتاج إلى منطق، ينتهي بك المطاف بقوالب نصية أو JavaScript. ماذا لو كانت صيغة البيانات *هي* صيغة المنطق؟

<!-- truncate -->

## قيود JSON

JSON ممتاز للبيانات:

```json
{
  "name": "John",
  "age": 30,
  "hobbies": ["coding", "reading"]
}
```

لكن ماذا عن المنطق؟ لديك عدة خيارات:

### الخيار 1: قوالب نصية
```json
{
  "condition": "user.age >= 18 && user.verified"
}
```
- ❌ عُرضة للأخطاء (أخطاء مطبعية في النصوص)
- ❌ بدون تحقق
- ❌ خطر الحقن

### الخيار 2: لغة مخصصة
```json
{
  "condition": {
    "and": [
      { "gte": ["user.age", 18] },
      { "eq": ["user.verified", true] }
    ]
  }
}
```
- ✅ مُهيكل
- ❌ مُطوَّل
- ❌ صعب القراءة

### الخيار 3: دوال JavaScript
```javascript
const condition = (user) => user.age >= 18 && user.verified;
```
- ✅ سهل القراءة
- ❌ غير قابل للتسلسل
- ❌ خطر أمني (eval)

## ادخل عالم التعبيرات الرمزية

التعبيرات الرمزية (symbolic expressions) موجودة منذ عام 1958 مع Lisp. وهي بسيطة:

```
(operator operand1 operand2 ...)
```

بصيغة متوافقة مع JSON:

```json
["operator", "operand1", "operand2", ...]
```

## التعبيرات الرمزية في المدار

يستخدم المدار التعبيرات الرمزية للحرّاس والتأثيرات:

### الحرّاس: المنطق الشرطي

```json
{
  "from": "pending",
  "to": "approved",
  "event": "APPROVE",
  "guard": ["and",
    [">=", "@user.roleLevel", 5],
    ["not", "@entity.isFlagged"],
    [">", "@entity.amount", 0]
  ]
}
```

هذا يعادل:
```javascript
if (user.roleLevel >= 5 && !entity.isFlagged && entity.amount > 0) {
  // Allow transition
}
```

لكنه:
- ✅ قابل للتسلسل
- ✅ قابل للتحقق
- ✅ آمن (بدون eval)
- ✅ متعدد المنصات

### التأثيرات: تغييرات الحالة

```json
{
  "effects": [
    ["set", "@entity.status", "approved"],
    ["set", "@entity.approvedAt", "@now"],
    ["set", "@entity.approvedBy", "@user.id"],
    ["persist", "update", "Order", "@entity.id", "@entity"]
  ]
}
```

كل تأثير هو تعبير رمزي:
- `["set", target, value]` — تعيين قيمة
- `["persist", operation, entity, id, data]` — حفظ في قاعدة البيانات
- `["emit", event, payload]` — إرسال حدث

## لماذا هذا مهم

### 1. التماثل بين الكود والبيانات (Homoiconicity)

التعبيرات الرمزية هي بيانات تبدو كالكود. هذا يعني:

```json
["+", "@entity.count", 1]
```

هي في الوقت ذاته:
- هيكل بيانات (مصفوفة من نصوص)
- كود قابل للتنفيذ (أضف 1 إلى العداد)

### 2. قابلية التركيب

يمكنك تداخل التعبيرات الرمزية بلا حدود:

```json
["if",
  ["and",
    [">", "@entity.score", 100],
    ["=", "@entity.status", "active"]
  ],
  ["emit", "ACHIEVEMENT_UNLOCKED", { "level": "gold" }],
  ["emit", "ACHIEVEMENT_PROGRESS", { "needed": ["-", 100, "@entity.score"] }]
]
```

### 3. التسلسل

لأن التعبيرات الرمزية مجرد مصفوفات، فإنها تُسلسَل بشكل مثالي:

```javascript
// JavaScript
const guard = [">=", "@user.age", 18];
JSON.stringify(guard); // '[">=","@user.age",18]'
```

```python
# Python
guard = [">=", "@user.age", 18]
json.dumps(guard)  # '[">=","@user.age",18]'
```

```rust
// Rust
let guard = json!( [">=", "@user.age", 18] );
serde_json::to_string(&guard).unwrap();
```

## سياق الربط

تستخدم التعبيرات الرمزية في المدار بادئات خاصة للسياق:

| البادئة | المعنى | مثال |
|---------|--------|------|
| `@entity.field` | حقل الكيان الحالي | `"@entity.status"` |
| `@payload.field` | حمولة الحدث | `"@payload.userId"` |
| `@state` | اسم حالة آلة الحالة الحالية | `"@state"` (مثلاً `"Browsing"`) |
| `@user.field` | المستخدم الحالي | `"@user.id"` |
| `@now` | الطابع الزمني الحالي | `"@now"` |

هذا يُنشئ **نظام ربط تصريحي**:

```json
{
  "guard": ["=", "@entity.ownerId", "@user.id"],
  "effects": [
    ["set", "@entity.updatedAt", "@now"],
    ["set", "@entity.updatedBy", "@user.id"]
  ]
}
```

## تشبيه واقعي: صيغ Excel

إذا استخدمت Excel، فقد استخدمت تعبيرات رمزية:

```excel
=IF(AND(A1>100, B1="active"), "Gold", "Silver")
```

في المدار:
```json
["if",
  ["and", [">", "@entity.score", 100], ["=", "@entity.status", "active"]],
  "Gold",
  "Silver"
]
```

صيغ Excel هي تعبيرات رمزية. وهي:
- تصريحية (تقول ماذا، لا كيف)
- قابلة للتركيب (دوال تستدعي دوالاً)
- آمنة (لا تنفيذ كود عشوائي)

## المعاملات القياسية

تتضمن المكتبة القياسية للمدار:

### المقارنة
```json
["=", "a", "b"]        // المساواة
["!=", "a", "b"]       // عدم المساواة
[">", "a", "b"]        // أكبر من
[">=", "a", "b"]       // أكبر من أو يساوي
```

### المنطق
```json
["and", "a", "b", "c"] // الكل يجب أن يكون صحيحاً
["or", "a", "b", "c"]  // واحد على الأقل صحيح
["not", "a"]           // النفي
```

### الرياضيات
```json
["+", "a", "b", "c"]   // المجموع
["-", "a", "b"]        // الفرق
["*", "a", "b"]        // الضرب
["/", "a", "b"]        // القسمة
```

### المصفوفات
```json
["count", "@array"]    // طول المصفوفة
["contains", "@array", "item"]  // التحقق من العضوية
["filter", "@array", ["predicate"]]
```

### النصوص
```json
["concat", "a", "b"]   // الدمج
["length", "str"]      // طول النص
["matches", "str", "regex"]
```

## جرّبه: ابنِ حارساً

لننشئ حارساً لسير عمل الموافقة:

```json
{
  "from": "pending",
  "to": "approved",
  "event": "APPROVE",
  "guard": ["and",
    ["or",
      [">=", "@user.roleLevel", 5],
      ["=", "@user.id", "@entity.ownerId"]
    ],
    ["not", "@entity.isLocked"],
    [">", "@entity.amount", 0],
    ["<", "@entity.amount", 10000]
  ]
}
```

هذا يُترجم إلى:
```javascript
if (
  (user.roleLevel >= 5 || user.id === entity.ownerId) &&
  !entity.isLocked &&
  entity.amount > 0 &&
  entity.amount < 10000
) {
  // Allow approval
}
```

لكن مع:
- ✅ صياغة تصريحية
- ✅ تحقق تلقائي
- ✅ لا خطر لحقن الكود
- ✅ قابل للتسلسل لسجلات التدقيق

## الخلاصة

التعبيرات الرمزية ليست مجرد فضول من Lisp — إنها حل عملي لسؤال "كيف نضع المنطق في JSON؟"

تمنحك:
- **قوة الكود** (قابلية التركيب، التعبيرية)
- **أمان البيانات** (التسلسل، التحقق، بدون eval)
- **وضوح Excel** (تصريحية، سهلة القراءة)

في المرة القادمة التي تُغريك فيها `eval()` أو القوالب النصية للمنطق الديناميكي، تذكّر: هناك حل عمره 60 عاماً يعمل فعلاً.

تريد استكشاف المزيد؟ اطّلع على [معاملات المكتبة القياسية](/docs/stdlib).
