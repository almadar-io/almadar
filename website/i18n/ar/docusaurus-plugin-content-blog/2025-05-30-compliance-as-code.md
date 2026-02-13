---
slug: compliance-as-code
title: "الامتثال كشيفرة: عندما تفرض هندستك البرمجية القانون"
authors: [osamah]
tags: [enterprise, compliance, architecture]
---

قوائم التحقق لا تنجح. التدريب لا يترسخ. عمليات التدقيق تكتشف المشاكل بعد أشهر من حدوثها.

ماذا لو جعلت هندستك البرمجية عدم الامتثال أمرًا مستحيلًا؟

<!-- truncate -->

## فشل قوائم التحقق

كل صناعة خاضعة للتنظيم تعتمد على قوائم التحقق:

- الرعاية الصحية: "هل تحققت من هوية المريض قبل إعطاء الدواء؟"
- المالية: "هل حصلت على موافقتين للمعاملات التي تتجاوز 10,000 دولار؟"
- الحكومة: "هل أكملت جميع حقول التفتيش الإلزامية قبل إغلاق القضية؟"

المشكلة: قوائم التحقق هي مجرد *اقتراحات*. تعتمد على تذكّر البشر واهتمامهم وتوفر الوقت لديهم. تحت الضغط، يتم تخطي الخطوات. في حالات الطوارئ، يتم تجاوز البروتوكولات. أثناء ضغط العمل، تصبح الاختصارات ممارسة معتادة.

النتيجة: اكتشاف إخفاقات الامتثال بعد أشهر خلال عمليات التدقيق، مما يؤدي إلى غرامات ودعاوى قضائية وأضرار.

## البديل المعماري أولًا

ماذا لو *لم يستطع* البرنامج تخطي الخطوات؟

ليس مربع حوار تحذيري. ليس شريطًا أحمر. الـ transition (الانتقال بين حالتين في state machine) نفسه غير موجود ما لم تتحقق الشروط.

في Almadar، هذه هي طريقة عمل كل سير عمل. نظام تفتيش حكومي قمنا ببنائه يوضح هذا الـ pattern (نمط التصميم):

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

*لا يمكن* للمفتش الانتقال إلى مرحلة المحتوى دون إدخال الأساس القانوني ورقم القضية. لا يوجد زر "تخطي". لا يوجد تجاوز. الـ transition غير موجود حتى يُقيَّم الـ guard (شرط يجب تحققه قبل السماح بالانتقال) بالقيمة الصحيحة.

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

أي عنصر مفقود يبقي النظام في مرحلة السجل. ليس برسالة خطأ — زر الإغلاق ببساطة لا ينتقل. الـ state machine (نظام الحالات والانتقالات الذي يدير سير العمل) *ليس لديها مسار* إلى الإغلاق دون تحقق جميع الشروط.

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
3. **التحقق موجود في الشيفرة** — لا يستطيع المدققون التحقق منه دون قراءة JavaScript
4. **التحقق متناثر** — الواجهة الأمامية والخلفية وقاعدة البيانات لكل منها نسختها الخاصة

guards في Almadar:
1. **لا يمكن تجاوزها** — الـ state machine هي المسار الوحيد. لا باب خلفي في واجهة البرمجة.
2. **لا يمكن أن تكون ناقصة** — الـ compiler (المُصرِّف) يحذر من الـ transitions غير المحمية
3. **موجودة في الـ schema** (ملف وصف التطبيق) — المدققون يقرؤون JSON، وليس شيفرة برمجية
4. **هي مصدر الحقيقة الوحيد** — guard واحد، يُطبَّق في كل مكان

## مشكلة سجل التدقيق (مَحلولة)

الصناعات الخاضعة للتنظيم تحتاج سجلات تدقيق. النهج التقليدي: تعليمات تسجيل متناثرة في الشيفرة، على أمل أن تغطي كل إجراء.

في Almadar، كل transition في الـ state machine يُسجَّل بطبيعته:

```
[2025-05-30T10:15:32Z] Inspection INS-2025-0847
  Transition: Introduction → Content
  Event: PROCEED
  User: inspector-042
  Guard: passed (legalBasis=filled, caseNumber=INS-2025-0847)
  Effects: [set phase, log]
```

سجل التدقيق ليس ميزة تُضيفها. إنه نتيجة للهندسة المعمارية. كل transition يُنفَّذ يحمل حالة `from` وحالة `to` وحدث ومستخدم وطابع زمني ونتيجة الـ guard.

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

خمسة فحوصات. كلها إلزامية. لا يمكن للممرض/ة إعطاء الدواء دون اجتياز كل واحد منها.

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

هنا تكمن القوة الحقيقية: **الـ schema هو المواصفة التنظيمية**.

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

يمكن لمدقق غير تقني قراءة هذا. إنه يقول: للانتقال من السجل إلى الإغلاق، يجب ألا يكون الأساس القانوني فارغًا، ويجب ألا تكون النتائج فارغة، ويجب أن يكون المفتش قد وقّع.

المواصفة والتنفيذ هما نفس الأداة. لا يمكن أن ينحرفا عن بعضهما أبدًا.

## الخلاصة

الامتثال ليس ميزة تُلصقها. إنه هندسة معمارية.

guards الـ state machine تجعل عدم الامتثال مستحيلًا — ليس مثبطًا، وليس محذَّرًا منه، بل *مستحيلًا*. الـ state machine ليس لديها transition إلى المرحلة التالية دون تحقق الشروط المطلوبة.

بالنسبة للصناعات الخاضعة للتنظيم، هذا يعني:
- **صفر خطوات مُتخطاة** — الـ guards تفرض كل متطلب
- **سجلات تدقيق مدمجة** — كل transition يُسجَّل بطبيعته
- **مواصفات قابلة للقراءة** — المدققون يراجعون JSON، وليس شيفرة برمجية
- **لا انحراف** — الـ schema هو المواصفة والتنفيذ معًا

السؤال ليس "كيف نجعل الناس يتبعون قائمة التحقق؟" بل "كيف نجعل قائمة التحقق غير ضرورية؟"

تعرف على المزيد حول [عبارات الـ guard](/blog/guard-clauses-state-machines) و[الـ closed circuit pattern](/blog/closed-circuit-pattern).
