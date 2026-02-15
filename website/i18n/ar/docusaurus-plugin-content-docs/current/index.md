---
id: index
title: توثيق المدار
sidebar_label: نظرة عامة
slug: /
---

# المدار

> **فيزياء البرمجيات**: صرّح بتطبيقك، ترجمه للإنتاج

مرحباً بك في توثيق لغة برمجة المدار. المدار هو نهج تصريحي لبناء تطبيقات متكاملة من خلال آلات الحالة والكيانات والسمات.

## التنقل السريع

### البدء
- [مقدمة](getting-started/introduction) - ما هو المدار ولماذا يجب استخدامه؟
- [التثبيت](getting-started/installation) - احصل على CLI المدار على نظامك
- [أول مخطط لك](getting-started/first-schema) - ابنِ مدير مهام في 10 دقائق
- [المفاهيم الأساسية](getting-started/core-concepts) - الكيانات والسمات وآلات الحالة

### مرجع اللغة
- [المواصفات](language-reference/specification) - مواصفات اللغة الكاملة
- [الكيانات](language-reference/entities) - هياكل البيانات والاستمرارية
- [السمات](language-reference/traits) - السلوك كآلات حالة
- [التعبيرات-S](language-reference/s-expressions) - بناء جملة الحراس والتأثيرات
- [التأثيرات](language-reference/effects) - تأثيرات الخادم والعميل
- [الأنماط](language-reference/patterns) - مكتبة أنماط الواجهة

### الأدلة
#### تقنية
- [تصميم آلة الحالة](guides/technical/state-machine-design)
- [الحراس والأذونات](guides/technical/guards-permissions)
- [الأحداث عبر المدارات](guides/technical/cross-orbital-events)
- [الاختبار](guides/technical/testing)

#### الأعمال
- [لماذا المدار؟](guides/business/why-almadar)
- [مقارنة التكلفة](guides/business/cost-comparison)
- [دراسات الحالة](guides/business/case-studies)

### الدروس
#### للمبتدئين
- [مدير المهام](tutorials/beginner/task-manager)
- [تطبيق المهام](tutorials/beginner/todo-app)

#### المتوسط
- [متجر إلكتروني](tutorials/intermediate/e-commerce)
- [لوحة تحكم SaaS](tutorials/intermediate/saas-dashboard)

#### المتقدم
- [تطوير الألعاب](tutorials/advanced/game-development)
- [إنترنت الأشياء والروبوتات](tutorials/advanced/iot-robotics)

### المرجع
- [مرجع CLI](reference/cli-reference)
- [المكتبة القياسية](reference/standard-library)
- [مكتبة السمات](reference/traits-library)
- [مكتبة الأنماط](reference/patterns-library)
- [أكواد الأخطاء](reference/error-codes)

### التنزيلات
- [واجهة سطر الأوامر](downloads/cli) - احصل على CLI المدار
- [المهارات](downloads/skills) - مهارات الذكاء الاصطناعي لتوليد الكود

### المؤسسات
- [حلول المؤسسات](enterprise/) - المدار للفرق والمنظمات

---

## فلسفة المدار

### نمط الدائرة المغلقة

كل تفاعل مستخدم في المدار يتبع تدفقاً مضموناً:

```
حدث (إجراء المستخدم)
    ↓
تقييم الحارس (فحص الأذونات)
    ↓
انتقال الحالة (منطق السلوك)
    ↓
تنفيذ التأثيرات
    ↓
الاستجابة للواجهة
```

هذا النمط يضمن:
- الأمان بالتصميم
- سلوك يمكن التنبؤ به
- قابلية الاختبار

### الركائز الثلاث

1. **الكيانات** - ما يديره تطبيقك (البيانات)
2. **السمات** - كيف يتصرف تطبيقك (آلات الحالة)
3. **الصفحات** - أين يظهر تطبيقك (المسارات)

### لماذا "المدار"؟

مثل الكواكب في مدارها حول نجم، تتبع مكونات التطبيق في المدار مسارات متوقعة تحكمها قوانين. قوانين الفيزياء تضمن الاستقرار؛ آلات حالة المدار تضمن اتساق التطبيق.

---

## المجتمع

- [Discord](https://discord.gg/almadar) - الدردشة والدعم المباشر
- [GitHub Discussions](https://github.com/almadar-io/almadar/discussions) - النقاشات التقنية
- [LinkedIn](https://linkedin.com/company/almadar-io) - التحديثات والإعلانات

---

*بُني بشغف من [المدار](https://almadar.io)*
