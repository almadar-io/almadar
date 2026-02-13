---
slug: compliance-as-code
title: "الامتثال كشيفرة: عندما تفرض هندستك البرمجية القانون"
authors: [osamah]
tags: [enterprise, compliance, architecture]
---

لا تنجح قوائم التحقق. ولا يترسخ التدريب. وتكتشف عمليات التدقيق المشاكل بعد أشهر من حدوثها.

ماذا لو جعلت هندستك البرمجية عدم الامتثال أمرًا مستحيلًا؟

<!-- truncate -->

## فشل قوائم التحقق

تعتمد كل صناعة خاضعة للتنظيم على قوائم التحقق:

- الرعاية الصحية: "هل تحققت من هوية المريض قبل إعطاء الدواء؟"
- المالية: "هل حصلت على موافقتين للمعاملات التي تتجاوز 10,000 دولار؟"
- الحكومة: "هل أكملت جميع حقول التفتيش الإلزامية قبل إغلاق القضية؟"

المشكلة: تعتبر قوائم التحقق مجرد *اقتراحات*. تعتمد على تذكّر البشر واهتمامهم وتوفر الوقت لديهم. يتم تخطي الخطوات تحت الضغط. ويتم تجاوز البروتوكولات في حالات الطوارئ. وتصبح الاختصارات ممارسة معتادة أثناء ضغط العمل.

النتيجة: اكتشاف إخفاقات الامتثال بعد أشهر خلال عمليات التدقيق، مما يؤدي إلى غرامات ودعاوى قضائية وأضرار.

## البديل المعماري أولًا

ماذا لو *لم يستطع* البرنامج تخطي الخطوات؟

ليس مربع حوار تحذيري. ليس شريطًا أحمر. الـ transition (الانتقال بين حالتين في state machine) نفسه غير موجود ما لم تتحقق الشروط.

هذه هي طريقة عمل كل سير عمل في Almadar. يوضح نظام تفتيش حكومي قمنا ببنائه هذا الـ pattern (نمط التصميم):

```json
{
  "name": "InspectionWorkflow",
  "entity": {
    "name": "Inspection",
    "fields": [
      { "name": "phase", "type": "enum", "values": ["introduction", "content", "preparation", "record", "closing"] },
      { "name": "legalBasis", "type": "string" },
      { "name": "findings", "type": "string" },
      { "name": "measures", "type": "string" },
      { "name": "inspectorSignature", "type": "boolean", "default": false },
      { "name": "subjectSignature", "type": "boolean", "default": false },
      { "name": "caseNumber", "type": "string" }
    ]
  }
}
```

### transitions المراحل مع الـ guards

كل transition بين المراحل محمي بمتطلبات قانونية:

```json
{
  "from": "Introduction",
  "to": "Content",
  "event": "PROCEED",
  "guard": ["and",
    ["not-empty", "@entity.legalBasis"],
    ["not-empty", "@entity.caseNumber"]
  ],
  "effects": [
    ["set", "@entity.phase", "content"],
    ["log", "info", "Phase transition: Introduction → Content"]
  ]
}
```

*لا يستطيع* المفتش الانتقال إلى مرحلة المحتوى دون إدخال الأساس القانوني ورقم القضية. لا يوجد زر "تخطي". لا يوجد تجاوز. الـ transition غير موجود حتى يُقيَّم الـ guard (شرط يجب تحققه قبل السماح بالانتقال) بالقيمة الصحيحة.

### guard الإغلاق: كل شيء يجب أن يكون مكتملًا

```json
{
  "from": "Record",
  "to": "Closing",
  "event": "CLOSE_INSPECTION",
  "guard": ["and",
    ["not-empty", "@entity.legalBasis"],
    ["not-empty", "@entity.findings"],
    ["not-empty", "@entity.measures"],
    ["=", "@entity.inspectorSignature", true],
    ["=", "@entity.subjectSignature", true]
  ],
  "effects": [
    ["set", "@entity.phase", "closing"],
    ["persist", "update", "Inspection", "@entity"],
    ["emit", "INSPECTION_COMPLETED"]
  ]
}
```

لإغلاق تفتيش:
- يجب ملء الأساس القانوني
- يجب توثيق النتائج
- يجب تحديد الإجراءات
- يجب أن يكون المفتش قد وقّع
- يجب أن يكون الخاضع للتفتيش قد وقّع

يبقي أي عنصر مفقود النظام في مرحلة السجل. ليس برسالة خطأ — زر الإغلاق ببساطة لا ينتقل. *لا تملك* الـ state machine (نظام الحالات والانتقالات الذي يدير سير العمل) مساراً إلى الإغلاق دون تحقق جميع الشروط.

## لماذا يختلف هذا عن التحقق التقليدي

التحقق التقليدي:

```javascript
function closeInspection(inspection) {
  if (!inspection.legalBasis) {
    showError("Legal basis required");
    return; // But what if someone removes this check?
  }
  if (!inspection.findings) {
    showError("Findings required");
    return; // And this one?
  }
  // ... maybe 20 more checks
  // What if a new developer doesn't add the check for a new field?

  inspection.phase = "closing";
  save(inspection);
}
```

المشاكل:
1. **يمكن تجاوز التحقق** — استدعاء مباشر لواجهة البرمجة يتخطى تحقق الواجهة الأمامية
2. **يمكن أن يكون التحقق ناقصًا** — يُضاف حقل إلزامي جديد لكن فحصه لا يُضاف
3. **يوجد التحقق في الشيفرة** — لا يستطيع المدققون التحقق منه دون قراءة JavaScript
4. **يتناثر التحقق** — الواجهة الأمامية والخلفية وقاعدة البيانات لكل منها نسختها الخاصة

guards في Almadar:
1. **لا يمكن تجاوزها** — الـ state machine هي المسار الوحيد. لا باب خلفي في واجهة البرمجة.
2. **لا يمكن أن تكون ناقصة** — يحذر الـ compiler (المُصرِّف) من الـ transitions غير المحمية
3. **توجد في الـ schema** (ملف وصف التطبيق) — يقرأ المدققون JSON، وليس شيفرة برمجية
4. **تعتبر مصدر الحقيقة الوحيد** — guard واحد، يُطبَّق في كل مكان

## مشكلة سجل التدقيق (مَحلولة)

تحتاج الصناعات الخاضعة للتنظيم سجلات تدقيق. النهج التقليدي: تعليمات تسجيل متناثرة في الشيفرة، على أمل أن تغطي كل إجراء.

في Almadar، كل transition في الـ state machine يُسجَّل بطبيعته:

```
[2025-05-30T10:15:32Z] Inspection INS-2025-0847
  Transition: Introduction → Content
  Event: PROCEED
  User: inspector-042
  Guard: passed (legalBasis=filled, caseNumber=INS-2025-0847)
  Effects: [set phase, log]
```

لا يعتبر سجل التدقيق ميزة تُضيفها. بل هو نتيجة للهندسة المعمارية. يحمل كل transition يُنفَّذ حالة `from` وحالة `to` وحدث ومستخدم وطابع زمني ونتيجة الـ guard.

## تطبيقات في العالم الحقيقي

### الرعاية الصحية: إعطاء الأدوية

```json
{
  "from": "Prepared",
  "to": "Administered",
  "event": "ADMINISTER",
  "guard": ["and",
    ["=", "@entity.patientVerified", true],
    ["=", "@entity.medicationVerified", true],
    ["=", "@entity.dosageVerified", true],
    ["=", "@entity.allergyCheckPassed", true],
    ["not", "@entity.expired"]
  ]
}
```

خمسة فحوصات. كلها إلزامية. لا يستطيع الممرض/ة إعطاء الدواء دون اجتياز كل واحد منها.

### المالية: الموافقة على المعاملات

```json
{
  "from": "PendingApproval",
  "to": "Approved",
  "event": "APPROVE",
  "guard": ["and",
    ["!=", "@payload.approverId", "@entity.requesterId"],
    [">=", "@user.approvalLimit", "@entity.amount"],
    ["if",
      [">", "@entity.amount", 50000],
      [">=", "@entity.approvalCount", 2],
      true
    ]
  ]
}
```

- لا يستطيع مقدم الطلب الموافقة على معاملته الخاصة
- يجب أن يملك المُوافِق حدًا كافيًا للموافقة
- المعاملات التي تتجاوز 50,000 دولار تتطلب موافقتين

### التصنيع: مراقبة الجودة

```json
{
  "from": "Testing",
  "to": "Released",
  "event": "RELEASE",
  "guard": ["and",
    [">=", "@entity.testsPassed", "@entity.testsRequired"],
    ["=", "@entity.defectsFound", 0],
    ["not-empty", "@entity.qualitySignoff"]
  ]
}
```

لا يُشحن أي منتج دون اجتياز جميع الاختبارات وعدم وجود عيوب وتوقيع الجودة.

## الـ schema كمواصفة

هنا تكمن القوة الحقيقية: **يعتبر الـ schema المواصفة التنظيمية**.

عندما يسأل مدقق "كيف تضمنون أن عمليات التفتيش لا يمكن إغلاقها دون اكتمال جميع الحقول؟"، لا تُحيله إلى الشيفرة. بل تُريه الـ schema:

```json
{
  "from": "Record",
  "to": "Closing",
  "event": "CLOSE_INSPECTION",
  "guard": ["and",
    ["not-empty", "@entity.legalBasis"],
    ["not-empty", "@entity.findings"],
    ["=", "@entity.inspectorSignature", true]
  ]
}
```

يستطيع مدقق غير تقني قراءة هذا. لا يحتاج تفسيراً. إنه يقول: للانتقال من السجل إلى الإغلاق، يجب ألا يكون الأساس القانوني فارغًا، ويجب ألا تكون النتائج فارغة، ويجب أن يكون المفتش قد وقّع.

تعد المواصفة والتنفيذ نفس الأداة. لا يمكن أن ينحرفا عن بعضهما أبدًا.

## الخلاصة

لا يعتبر الامتثال ميزة تُلصقها. بل هو هندسة معمارية.

تجعل guards الـ state machine عدم الامتثال مستحيلًا — ليس مثبطًا، وليس محذَّرًا منه، بل *مستحيلًا*. لا تملك الـ state machine transition إلى المرحلة التالية دون تحقق الشروط المطلوبة.

بالنسبة للصناعات الخاضعة للتنظيم، هذا يعني:
- **صفر خطوات مُتخطاة** — الـ guards تفرض كل متطلب
- **سجلات تدقيق مدمجة** — كل transition يُسجَّل بطبيعته
- **مواصفات قابلة للقراءة** — المدققون يراجعون JSON، وليس شيفرة برمجية
- **لا انحراف** — الـ schema هو المواصفة والتنفيذ معًا

لا يكمن السؤال في "كيف نجعل الناس يتبعون قائمة التحقق؟" بل "كيف نجعل قائمة التحقق غير ضرورية؟"

تعرف على المزيد حول [عبارات الـ guard](/blog/guard-clauses-state-machines) و[الـ closed circuit pattern](/blog/closed-circuit-pattern).
