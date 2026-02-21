---
slug: welcome-to-almadar
title: مرحباً بكم في Almadar
authors: [almadar]
tags: [announcement]
---

يسعدنا أن نقدم لكم **Almadar** - فيزياء البرمجيات.

Almadar هو إطار عمل تصريحي لبناء تطبيقات متكاملة من خلال state machines (أنظمة تتحكم بسلوك البرنامج عبر حالات محددة). عرّف الـ entities (نماذج البيانات) والسلوكيات والواجهة كـ schemas تترجم إلى كود جاهز للإنتاج.

<!-- truncate -->

## ما هو Almadar؟

Almadar يجلب نموذجاً جديداً لتطوير البرمجيات:

- **schemas تصريحية**: عرّف بنية تطبيقك بالكامل في مكان واحد
- **state machines**: صمم السلوك كـ state machines قابلة للتنبؤ والاختبار
- **توليد متكامل**: ترجم إلى واجهة React وخادم Express/FastAPI ونماذج قاعدة البيانات

## نموذج Almadar

كما تدور الإلكترونات حول النواة وفق قواعد الكم، تتبع مكونات تطبيقك قواعد الـ state machine. كل **orbital (وحدة بناء في Almadar)** هو entity مع **traits (خصائص سلوكية)** مرفقة تحدد سلوكه وواجهته وتكاملاته.

```json
{
  "orbitals": [{
    "name": "TaskManager",
    "entity": {
      "name": "Task",
      "fields": [
        { "name": "title", "type": "string" },
        { "name": "status", "type": "enum", "options": ["todo", "done"] }
      ]
    },
    "traits": [
      { "ref": "Listable" },
      { "ref": "Editable" }
    ]
  }]
}
```

## البداية

هل أنت مستعد لتجربة Almadar؟ اطلع على [التوثيق](/ar/docs) للبدء، أو [حمّل CLI](/ar/docs/downloads/cli) لإنشاء مشروعك الأول.

ترقبوا المزيد من التحديثات والدروس والتعمق في بنية Almadar!
