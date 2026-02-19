# الحراس (Guards) وقواعد الأعمال (Business Rules)

> المصدر: [`tests/schemas/03-guards.orb`](../../../../tests/schemas/03-guards.orb)

الحراس (Guards) هي شروط يجب أن تكون صحيحة لكي ينفَّذ الانتقال. تعمل كحراس لقواعد أعمالك — تُكتب مرة واحدة، وتُطبَّق في كل مكان، لكل من الواجهة والـ API.

---

## ما هو الحارس (Guard)؟

الحارس هو تعبير S (S-expression) على انتقال. إذا قيّم إلى `false`، يُحجب الانتقال:

```json
{
  "from": "active",
  "event": "WITHDRAW",
  "to": "active",
  "guard": [">=", "@entity.balance", "@payload.amount"],
  "effects": [...]
}
```

يمكن للمستخدم السحب فقط إذا كان `balance >= amount`. إذا لم يكن كذلك، يُحجب الانتقال بصمت (يمكن للواجهة عرض حالة معطّلة أو رسالة خطأ).

---

## صيغة التعابير S (S-Expression Syntax)

تُكتب الحراسات كمصفوفات متداخلة حيث العنصر الأول هو المشغّل (Operator):

```
[operator, arg1, arg2, ...]
```

يمكن أن تكون الوسيطات:
- **قيم ثابتة (Literals):** `100`، `"active"`، `true`
- **ارتباطات (Bindings):** `"@entity.field"`، `"@payload.field"`، `"@state"`، `"@now"`
- **تعابير متداخلة (Nested expressions):** `["+", "@entity.count", 1]`

---

## مشغّلات المقارنة (Comparison Operators)

| المشغّل | المعنى | المثال |
|---------|--------|--------|
| `=` | يساوي | `["=", "@entity.status", "active"]` |
| `!=` | لا يساوي | `["!=", "@entity.role", "guest"]` |
| `>` | أكبر من | `[">", "@entity.score", 0]` |
| `>=` | أكبر من أو يساوي | `[">=", "@entity.balance", "@payload.amount"]` |
| `<` | أصغر من | `["<", "@entity.attempts", 3]` |
| `<=` | أصغر من أو يساوي | `["<=", "@entity.age", 65]` |

---

## مشغّلات القيم المنطقية (Boolean Operators)

ادمج الشروط باستخدام `and`، `or`، `not`:

```json
["and",
  [">=", "@entity.balance", "@payload.amount"],
  ["=", "@entity.isVerified", true]
]
```

```json
["or",
  ["=", "@entity.role", "admin"],
  ["=", "@entity.role", "manager"]
]
```

```json
["not", ["=", "@entity.status", "frozen"]]
```

---

## مثال كامل: مدير الحسابات (Account Manager)

هذا هو `AccountManager` الكامل من `03-guards.orb`. يُوضح:
- حارساً يستخدم `and` لدمج شرطين
- استخدام `@payload.amount` للتحقق من مدخلات المستخدم
- انتقالات حالة بسيطة (تجميد/إلغاء تجميد) بدون حراس

```json
{
  "name": "AccountManager",
  "version": "1.0.0",
  "orbitals": [
    {
      "name": "AccountManager",
      "entity": {
        "name": "Account",
        "persistence": "persistent",
        "collection": "accounts",
        "fields": [
          { "name": "id", "type": "string", "required": true },
          { "name": "balance", "type": "number", "default": 0 },
          { "name": "isVerified", "type": "boolean", "default": false }
        ]
      },
      "traits": [
        {
          "name": "AccountActions",
          "linkedEntity": "Account",
          "category": "interaction",
          "stateMachine": {
            "states": [
              { "name": "active", "isInitial": true },
              { "name": "frozen" }
            ],
            "events": [
              { "key": "INIT", "name": "تهيئة" },
              { "key": "WITHDRAW", "name": "سحب أموال", "payload": [
                { "name": "amount", "type": "number", "required": true }
              ]},
              { "key": "FREEZE", "name": "تجميد الحساب" },
              { "key": "UNFREEZE", "name": "إلغاء تجميد الحساب" }
            ],
            "transitions": [
              {
                "from": "active",
                "event": "INIT",
                "to": "active",
                "effects": [
                  ["fetch", "Account"],
                  ["render-ui", "main", {
                    "type": "entity-table",
                    "entity": "Account",
                    "columns": ["balance", "isVerified"],
                    "itemActions": [
                      { "event": "WITHDRAW", "label": "سحب" },
                      { "event": "FREEZE", "label": "تجميد" }
                    ]
                  }]
                ]
              },
              {
                "from": "active",
                "event": "WITHDRAW",
                "to": "active",
                "guard": ["and",
                  [">=", "@entity.balance", "@payload.amount"],
                  ["=", "@entity.isVerified", true]
                ],
                "effects": [
                  ["set", "@entity.balance", ["-", "@entity.balance", "@payload.amount"]]
                ]
              },
              {
                "from": "active",
                "event": "FREEZE",
                "to": "frozen"
              },
              {
                "from": "frozen",
                "event": "UNFREEZE",
                "to": "active"
              }
            ]
          }
        }
      ],
      "pages": [
        {
          "name": "AccountListPage",
          "path": "/accounts",
          "traits": [
            { "ref": "AccountActions", "linkedEntity": "Account" }
          ]
        }
      ]
    }
  ]
}
```

**قراءة حارس WITHDRAW:**
```json
["and",
  [">=", "@entity.balance", "@payload.amount"],  // الحساب لديه أموال كافية
  ["=", "@entity.isVerified", true]              // الحساب موثَّق
]
```

يجب أن يكون كلا الشرطين صحيحَين. إذا كان الحساب غير موثَّق، أو كان الرصيد منخفضاً، يُحجب السحب.

---

## الحراس مع القيم المحسوبة (Guards with Computed Values)

يمكن أن تستخدم الحراسات مشغّلات حسابية — نتيجة التعبير المتداخل تُستخدم كوسيطة:

```json
// يُسمح فقط إذا بقي الرصيد بعد السحب أعلى الحد الأدنى
[">=",
  ["-", "@entity.balance", "@payload.amount"],
  100
]
```

```json
// يُسمح فقط إذا كان عدد العناصر ضمن الحد
["<",
  ["+", "@entity.itemCount", 1],
  50
]
```

---

## أنماط الحراس الشائعة (Common Guard Patterns)

### التحكم بالوصول بناءً على الدور (Role-based access)

```json
// المسؤولون فقط يمكنهم الحذف
{
  "from": "listing",
  "event": "DELETE",
  "to": "listing",
  "guard": ["=", "@currentUser.role", "admin"],
  "effects": [["persist", "delete", "Task", "@entity.id"]]
}
```

### التحقق من الملكية (Ownership check)

```json
// فقط المسنَد إليه يمكنه بدء المهمة
{
  "from": "Pending",
  "event": "START",
  "to": "InProgress",
  "guard": ["=", "@entity.assigneeId", "@currentUser.id"],
  "effects": [["persist", "update", "Task", "@entity"]]
}
```

### التحقق من الحقل (Field validation)

```json
// يجب أن تكون النتيجة بين 0 و 100
{
  "guard": ["and",
    [">=", "@payload.score", 0],
    ["<=", "@payload.score", 100]
  ]
}
```

### شرط الحالة المسبقة (Status precondition)

```json
// يمكن الموافقة فقط إذا كانت الحالة في المراجعة
{
  "guard": ["=", "@entity.status", "review"]
}
```

---

## الحراس مقابل التأثيرات (Guards vs. Effects)

الحراسات تعمل **قبل** الانتقال. التأثيرات تعمل **بعده**. لا تستخدم التأثيرات لتطبيق قواعد الأعمال — هذا ما الحراسات موجودة لأجله.

```json
// ❌ خاطئ: استخدام التأثيرات لمحاكاة الحارس
"effects": [
  ["if", ["<", "@entity.balance", 0], ["notify", "error", "رصيد غير كافٍ"]]
]

// ✅ صحيح: الحارس يحجب الانتقال كلياً
"guard": [">=", "@entity.balance", "@payload.amount"]
```

---

## الخطوات التالية

- [التواصل بين المدارات (Cross-Orbital Communication)](./cross-orbital) — الحراسات يمكنها الرجوع إلى بيانات من مدارات أخرى
- [أنماط الواجهة (UI Patterns) وrender-ui](./ui-patterns) — عرض ردود الفعل عندما تحجب الحراسات الإجراءات
- [بناء تطبيق كامل (Full App)](../advanced/full-app) — الحراسات في تطبيق متعدد المدارات حقيقي
