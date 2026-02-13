---
slug: understanding-state-machines
title: فهم الـ state machines في Almadar
authors: [osamah]
tags: [architecture, tutorial]
---

الـ state machines (أنظمة تتحكم بسلوك البرنامج عبر حالات محددة) هي جوهر Almadar. في هذا المقال، نستكشف ليش اخترنا الـ state machines كأساس لسلوك التطبيق.

<!-- truncate -->

## ليش state machines؟

غالباً تطبيقات الويب التقليدية تعاني من سلوك غير متوقع. ممكن زر يسوي أشياء مختلفة حسب حالة مخفية أو سباقات أو افتراضات مدفونة في الكود.

الـ state machines تحل هذا بجعل **كل حالة ممكنة صريحة** و**كل transition مقصود**.

## تشريح state machine في Almadar

كل trait (خاصية سلوكية مرتبطة بالكيان) في Almadar تحتوي على state machine:

```json
{
  "name": "Toggleable",
  "stateMachine": {
    "states": [
      { "name": "off", "isInitial": true },
      { "name": "on" }
    ],
    "transitions": [
      {
        "from": "off",
        "event": "TOGGLE",
        "to": "on",
        "effects": [
          ["render-ui", "main", { "type": "toggle", "active": true }]
        ]
      },
      {
        "from": "on",
        "event": "TOGGLE",
        "to": "off",
        "effects": [
          ["render-ui", "main", { "type": "toggle", "active": false }]
        ]
      }
    ]
  }
}
```

## المفاهيم الأساسية

### الحالات
الحالات تمثل الأوضاع الممكنة لـ entity (الكيان/نموذج البيانات) حقك. كل حالة صريحة ومسماة.

### الأحداث
الأحداث تفعّل الـ transitions. ممكن تجي من إجراءات المستخدم أو أحداث النظام أو orbitals ثانية.

### الـ Transitions
الـ transitions (الانتقالات بين الحالات) تحدد كيف ينتقل الـ entity من حالة لأخرى. كل transition ممكن يحتوي على:
- **guards (شروط حماية)**: شروط لازم تتحقق
- **effects (نتائج)**: إجراءات تنفَّذ (تحديث الحقول، عرض الواجهة، إرسال أحداث)

### الـ Effects
الـ effects هي side effects لـ transition. Almadar يدعم:
- `set` - تحديث حقل الـ entity
- `increment` / `decrement` - تعديل الأرقام
- `render-ui` - عرض pattern واجهة
- `emit` - نشر أحداث لـ orbitals أخرى
- `persist` - حفظ في قاعدة البيانات
- `navigate` - تغيير المسارات

## الفوائد

1. **التنبؤية**: دايماً تعرف في أي حالة تطبيقك
2. **قابلية الاختبار**: اختبر كل transition بشكل مستقل
3. **الأمان**: الـ guards تمنع تغييرات الحالة غير المصرح بها
4. **تصحيح الأخطاء**: سجل الحالة يخلي الأخطاء قابلة للتكرار

## الخطوات التالية

مستعد تبني باستخدام state machines؟ اطلع على [دليل البداية](/ar/docs/getting-started/introduction).
