---
slug: guard-clauses-state-machines
title: "شروط الحراسة في آلات الحالة: أنظمة صلاحيات تعمل فعلاً"
authors: [osamah]
tags: [architecture, state-machines]
---

منطق التفويض مبعثر في أنحاء تطبيقك؟ ماذا لو كان ببساطة... جزءاً من تعريف الحالة؟

<!-- truncate -->

## فوضى التفويض

معظم التطبيقات تتعامل مع الصلاحيات بهذه الطريقة:

```typescript
// في المكوّن
function ApproveButton({ order }) {
  const { user } = useAuth();

  const canApprove =
    user.roleLevel >= 5 &&
    !order.isFlagged &&
    order.amount > 0;

  return (
    <button disabled={!canApprove} onClick={handleApprove}>
      Approve
    </button>
  );
}

// في مسار الـ API
app.post('/api/orders/:id/approve', async (req, res) => {
  const { user } = req;
  const order = await Order.findById(req.params.id);

  // نفس المنطق، مكرر!
  if (user.roleLevel < 5) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }
  if (order.isFlagged) {
    return res.status(400).json({ error: 'Order is flagged' });
  }
  if (order.amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  // ... منطق الموافقة الفعلي
});
```

**المشاكل:**
- ❌ المنطق مكرر في الواجهة الأمامية والخلفية
- ❌ صعوبة المزامنة بينهما
- ❌ مبعثر عبر ملفات متعددة
- ❌ لا يوجد مصدر واحد للحقيقة

## الحراس: تفويض تصريحي

في المدار، الحراس جزء من آلة الحالة:

```json
{
  "from": "pending",
  "to": "approved",
  "event": "APPROVE",
  "guard": ["and",
    [">=", "@user.roleLevel", 5],
    ["not", "@entity.isFlagged"],
    [">", "@entity.amount", 0]
  ],
  "effects": [
    ["set", "@entity.status", "approved"],
    ["set", "@entity.approvedAt", "@now"],
    ["persist", "update", "Order", "@entity.id", "@entity"]
  ]
}
```

الحارس **تصريحي**، **قابل للتسلسل**، و**مُطبَّق في كل مكان**.

## كيف تعمل الحراس

### 1. تعريف الحارس

```json
{
  "guard": ["operator", "operand1", "operand2", ...]
}
```

### 2. التقييم عند وقت الانتقال

عند استقبال حدث `APPROVE`:
1. يتم تقييم تعبير الحارس
2. إذا كانت النتيجة `true`: يُنفَّذ الانتقال
3. إذا كانت النتيجة `false`: يُحظَر الانتقال، مع رسالة خطأ اختيارية

### 3. التطبيق في كل مكان

نفس الحارس يُطبَّق على:
- ✅ واجهة المستخدم (الزر معطّل إذا فشل الحارس)
- ✅ آلة الحالة (الانتقال محظور)
- ✅ الـ API المُولَّد (الطلب مرفوض)
- ✅ سجلات التدقيق (قرار التفويض مُسجَّل)

## أمثلة على الحراس

### مقارنة بسيطة

```json
{
  "guard": ["=", "@entity.ownerId", "@user.id"]
}
// فقط المالك يمكنه تنفيذ هذا الإجراء
```

### مبني على الأدوار

```json
{
  "guard": [">=", "@user.roleLevel", 5]
}
// مستوى المسؤول (5+) مطلوب
```

### متعدد العوامل

```json
{
  "guard": ["and",
    ["or",
      [">=", "@user.roleLevel", 5],
      ["=", "@user.department", "finance"]
    ],
    ["not", "@entity.isLocked"],
    ["<", "@entity.amount", 10000]
  ]
}
// (مسؤول أو مالية) وغير مقفل والمبلغ < 10 آلاف
```

### مبني على الوقت

```json
{
  "guard": ["<",
    ["-", "@now", "@entity.createdAt"],
    86400000
  ]
}
// الإجراء مسموح فقط خلال 24 ساعة من الإنشاء
```

### عضوية المصفوفة

```json
{
  "guard": ["contains", "@user.permissions", "orders:approve"]
}
// يجب أن يمتلك المستخدم صلاحية صريحة
```

## مثال معقد: سير عمل الموافقة

```json
{
  "traits": [{
    "name": "OrderApproval",
    "linkedEntity": "Order",
    "stateMachine": {
      "states": [
        { "name": "draft", "isInitial": true },
        { "name": "pending_review" },
        { "name": "approved" },
        { "name": "rejected" },
        { "name": "escalated" }
      ],
      "events": ["SUBMIT", "APPROVE", "REJECT", "ESCALATE", "RETURN"],
      "transitions": [
        {
          "from": "draft",
          "to": "pending_review",
          "event": "SUBMIT",
          "guard": ["and",
            [">", "@entity.amount", 0],
            ["not", ["is-empty", "@entity.description"]]
          ]
        },
        {
          "from": "pending_review",
          "to": "approved",
          "event": "APPROVE",
          "guard": ["and",
            [">=", "@user.roleLevel", 5],
            ["not", "@entity.isFlagged"],
            ["or",
              ["<", "@entity.amount", 5000],
              ["and",
                [">=", "@user.roleLevel", 7],
                ["<", "@entity.amount", 50000]
              ]
            ]
          ]
        },
        {
          "from": "pending_review",
          "to": "escalated",
          "event": "ESCALATE",
          "guard": [">=", "@user.roleLevel", 5]
        },
        {
          "from": "pending_review",
          "to": "rejected",
          "event": "REJECT",
          "guard": [">=", "@user.roleLevel", 5]
        },
        {
          "from": "escalated",
          "to": "approved",
          "event": "APPROVE",
          "guard": [">=", "@user.roleLevel", 9]
        }
      ]
    }
  }]
}
```

هذا يُشفِّر مصفوفة موافقة كاملة:
- أي شخص يمكنه الإرسال (إذا كانت البيانات صالحة)
- المستوى 5+ يمكنه الموافقة حتى 5 آلاف دولار
- المستوى 7+ يمكنه الموافقة حتى 50 ألف دولار
- المستوى 9+ يمكنه الموافقة على أي مبلغ
- الطلبات المُصعَّدة تحتاج المستوى 9+

## تشبيه واقعي: أمن المطار

أمن المطار هو آلة حالة مع حراس:

```
تسجيل الوصول ──(هل لديك تذكرة؟)──► تسليم الحقائب ──(الوزن < 23 كغ؟)──► التفتيش الأمني

التفتيش الأمني ──(لا سوائل؟)──► المسح ──(لا أسلحة؟)──► البوابة

البوابة ──(بطاقة الصعود صالحة؟)──► الصعود ──(مقعد متوفر؟)──► الجلوس
```

كل انتقال له حارس. إذا فشلت:
- لا تذكرة؟ ← لا يمكنك تسجيل الوصول
- حقيبة زائدة الوزن؟ ← ادفع إضافياً أو أعد الترتيب
- سوائل في الحقيبة؟ ← تخلص منها

الحراس **صريحة**، **لا لبس فيها**، و**مُطبَّقة بشكل متسق**.

## الحراس مقابل التفويض التقليدي

| الجانب | التقليدي | حراس المدار |
|--------|----------|-------------|
| الموقع | مبعثر عبر الملفات | مركزي في المخطط |
| الواجهة الأمامية | منطق مكرر | فحوصات مُولَّدة تلقائياً |
| الخلفية | وسيط + معالجات المسارات | تحقق مُولَّد تلقائياً |
| التدقيق | تسجيل يدوي | تسجيل تلقائي للقرارات |
| الاختبار | اختبارات تكامل | اختبار وحدة لتعبير الحارس |
| التوثيق | مستندات منفصلة | مخطط يوثق نفسه |

## جرّبها: ابنِ نظام صلاحيات

أنشئ ملف `approval-workflow.orb`:

```json
{
  "name": "ApprovalWorkflow",
  "orbitals": [{
    "name": "DocumentApproval",
    "entity": {
      "name": "Document",
      "fields": [
        { "name": "title", "type": "string", "required": true },
        { "name": "content", "type": "string", "required": true },
        { "name": "status", "type": "enum", "values": ["draft", "pending", "approved", "rejected"] },
        { "name": "authorId", "type": "string", "required": true },
        { "name": "isConfidential", "type": "boolean", "default": false }
      ]
    },
    "traits": [{
      "name": "DocumentWorkflow",
      "linkedEntity": "Document",
      "stateMachine": {
        "states": [
          { "name": "draft", "isInitial": true },
          { "name": "pending" },
          { "name": "approved" },
          { "name": "rejected" }
        ],
        "events": ["SUBMIT", "APPROVE", "REJECT", "EDIT"],
        "transitions": [
          {
            "from": "draft",
            "to": "pending",
            "event": "SUBMIT",
            "guard": ["=", "@entity.authorId", "@user.id"]
          },
          {
            "from": "pending",
            "to": "approved",
            "event": "APPROVE",
            "guard": ["and",
              [">=", "@user.roleLevel", 5],
              ["or",
                ["not", "@entity.isConfidential"],
                [">=", "@user.roleLevel", 7]
              ]
            ]
          },
          {
            "from": "pending",
            "to": "rejected",
            "event": "REJECT",
            "guard": [">=", "@user.roleLevel", 5]
          },
          {
            "from": "rejected",
            "to": "draft",
            "event": "EDIT",
            "guard": ["=", "@entity.authorId", "@user.id"]
          }
        ]
      }
    }],
    "pages": [{ "name": "DocumentsPage", "path": "/documents" }]
  }]
}
```

هذا ينشئ:
- فقط المؤلفون يمكنهم إرسال مستنداتهم
- المستوى 5+ يمكنه الموافقة/الرفض
- المستندات السرية تحتاج المستوى 7+
- المؤلفون يمكنهم تعديل المستندات المرفوضة

## متقدم: حراس ديناميكية

يمكن للحراس أن تشير إلى بيانات خارجية:

```json
{
  "guard": ["and",
    [">=", "@user.creditScore", 700],
    ["<", "@entity.loanAmount", ["*", "@user.annualIncome", 0.3]],
    ["not", ["contains", "@user.blacklist", "@entity.merchantId"]]
  ]
}
```

الحارس يشير إلى:
- درجة الائتمان للمستخدم
- الدخل السنوي للمستخدم (لحد القرض)
- القائمة السوداء للمستخدم

يتم حل كل ذلك وقت التقييم.

## الخلاصة

الحراس تجلب **التفويض التصريحي** لآلات الحالة:

- ✅ المنطق مركزي في المخطط
- ✅ مُطبَّق تلقائياً في الواجهة الأمامية والخلفية
- ✅ قواعد صلاحيات توثق نفسها
- ✅ تعبيرات منطقية قابلة للتركيب
- ✅ مراجع ربط آمنة الأنواع

توقف عن بعثرة منطق التفويض في أنحاء تطبيقك. عرّفه مرة واحدة، وطبّقه في كل مكان.

تعلم المزيد عن [الحراس والتأثيرات](/docs/traits).
