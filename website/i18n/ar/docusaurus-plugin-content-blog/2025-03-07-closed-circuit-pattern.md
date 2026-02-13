---
slug: closed-circuit-pattern
title: "نمط الدائرة المغلقة: لماذا يعلق مستخدموك (وكيف تمنع ذلك)"
authors: [osamah]
tags: [architecture, state-machines]
image: /img/blog/closed-circuit-pattern.png
---

![نمط الدائرة المغلقة: لماذا يعلق مستخدموك (وكيف تمنع ذلك)](/img/blog/closed-circuit-pattern.png)

هل سبق أن فتحت نافذة منبثقة ولم تستطع إغلاقها؟ هذه دائرة مكسورة. جعلنا بناء مثل هذه الأشياء مستحيلاً.

<!-- truncate -->

## مشكلة المستخدم العالق

أنت تستخدم تطبيقاً. تنقر على "فتح الإعدادات." تظهر نافذة منبثقة. تنقر على زر X. لا شيء يحدث. تضغط Escape. لا شيء. تنقر خارج النافذة. لا زال لا شيء.

**أنت عالق.**

هذا يحدث لأن:
1. النافذة المنبثقة فُتحت عبر حالة داخلية (`setIsOpen(true)`)
2. زر الإغلاق يُفعّل `setIsOpen(false)`
3. لكن إذا كان هناك خطأ برمجي، الحالة لا تتحدث
4. أو الأسوأ — زر الإغلاق لم يُوصَّل أصلاً

في المدار، هذا مستحيل معمارياً.

## مبدأ الدائرة المغلقة

**كل تفاعل مع الواجهة يجب أن يُكمل دائرة كاملة عائداً إلى آلة الحالة.**

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   User Click ──► Event Bus ──► State Machine ──► UI Update     │
│       ▲                                              │         │
│       └──────────────────────────────────────────────┘         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

لا اختصارات. لا تغييرات مباشرة للحالة. كل إجراء يتدفق عبر الدائرة.

## كيف يعمل في المدار

### 1. المستخدم يُطلق حدثاً

عندما تنقر على زر:

```typescript
// ❌ NOT this:
onClick={() => setIsModalOpen(false)}

// ✅ This:
onClick={() => eventBus.emit('UI:CLOSE')}
```

المكوّن لا يعرف ما سيحدث بعد ذلك. إنه فقط يُرسل.

### 2. ناقل الأحداث يوجّه إلى آلة الحالة

يستقبل ناقل الأحداث `UI:CLOSE` ويوجّهه إلى آلة حالة السمة النشطة.

### 3. آلة الحالة تُعالج

```json
{
  "from": "modalOpen",
  "to": "browsing",
  "event": "CLOSE",
  "effects": [
    ["render-ui", "modal", null],
    ["render-ui", "main", { "type": "page-header", ... }]
  ]
}
```

آلة الحالة:
1. تنتقل من `modalOpen` إلى `browsing`
2. تُفرغ خانة النافذة المنبثقة
3. تُصيّر المحتوى الرئيسي

### 4. الواجهة تتحدث

المكوّن يُعاد تصييره بناءً على الحالة الجديدة. النافذة المنبثقة تختفي لأن آلة الحالة قالت ذلك.

## لماذا هذا يمنع حالات العلق

### 1. الأحداث يجب أن تملك انتقالات

إذا عرّفت زراً بحدث:

```json
{
  "type": "page-header",
  "actions": [{ "label": "Open", "event": "OPEN_MODAL" }]
}
```

المُتحقق **يتطلب** انتقالاً مطابقاً:

```json
{
  "from": "browsing",
  "to": "modalOpen",
  "event": "OPEN_MODAL"
  // ✅ Required transition exists
}
```

إذا نسيت:
```
✗ Error: CIRCUIT_ORPHAN_EVENT
  Action 'Open' emits event 'OPEN_MODAL' which has no transition handler
```

### 2. خانات التراكب يجب أن تملك مخارج

إذا صيّرت إلى `modal` أو `drawer`، يتطلب المُتحقق مخرجاً:

```json
{
  "from": "browsing",
  "to": "modalOpen",
  "event": "OPEN_MODAL",
  "effects": [
    ["render-ui", "modal", { "type": "form-section", ... }]
  ]
}
```

يجب أن يكون هناك:
```json
{
  "from": "modalOpen",
  "to": "browsing",
  "event": "CLOSE"
  // ✅ Required exit transition
}
```

إذا نسيت:
```
✗ Error: CIRCUIT_NO_OVERLAY_EXIT
  State 'modalOpen' renders to 'modal' slot but has no exit transition.
  Users will be stuck in this overlay.
```

### 3. أغلفة الخانات تتعامل مع مخارج الطوارئ

حتى لو نسيت زر إغلاق، غلاف الخانة يُنقذك:

```typescript
// ModalSlot.tsx (auto-generated wrapper)
const handleClose = () => {
  eventBus.emit('UI:CLOSE');
  eventBus.emit('UI:CANCEL');
};

return (
  <Modal
    isOpen={Boolean(children)}
    onClose={handleClose}  // Escape key, overlay click, X button
  >
    {children}
  </Modal>
);
```

الغلاف يُرسل الحدث. آلة الحالة تتعامل معه. الدائرة تكتمل.

## تشبيه واقعي: إشارات المرور

إشارات المرور تتبع دائرة مغلقة:

```
Red ──(timer)──► Green ──(timer)──► Yellow ──(timer)──► Red
```

لا يوجد "قفز من الأحمر إلى الأخضر فوراً" أو "علق على الأصفر." الدائرة مغلقة — كل حالة لها انتقالات محددة.

الآن تخيل إشارة مرور معطلة:
- عالقة على الأحمر ← ازدحام مروري
- عالقة على الأخضر ← حوادث
- انتقالات عشوائية ← فوضى

مُتحقق المدار مثل مهندس مرور يتحقق من:
- ✅ كل ضوء له انتقالات
- ✅ لا حالات مستحيلة
- ✅ أوضاع الطوارئ معرّفة

## مثال: نافذة منبثقة لا يمكن أن تتعطل

إليك تطبيق نافذة منبثقة **مستحيل أن تعلق فيها**:

```json
{
  "states": [
    { "name": "browsing", "isInitial": true },
    { "name": "modalOpen" }
  ],
  "events": [
    { "key": "OPEN_MODAL", "name": "Open Modal" },
    { "key": "CLOSE", "name": "Close" },
    { "key": "SAVE", "name": "Save" }
  ],
  "transitions": [
    {
      "from": "browsing",
      "to": "browsing",
      "event": "INIT",
      "effects": [
        ["render-ui", "main", {
          "type": "page-header",
          "title": "Tasks",
          "actions": [{ "label": "New Task", "event": "OPEN_MODAL" }]
        }]
      ]
    },
    {
      "from": "browsing",
      "to": "modalOpen",
      "event": "OPEN_MODAL",
      "effects": [
        ["render-ui", "modal", {
          "type": "form-section",
          "entity": "Task",
          "fields": ["title", "status"],
          "submitEvent": "SAVE",
          "cancelEvent": "CLOSE"
        }]
      ]
    },
    {
      "from": "modalOpen",
      "to": "browsing",
      "event": "CLOSE",
      "effects": [
        ["render-ui", "modal", null],
        ["emit", "INIT"]
      ]
    },
    {
      "from": "modalOpen",
      "to": "browsing",
      "event": "SAVE",
      "effects": [
        ["persist", "create", "Task", "@payload.data"],
        ["render-ui", "modal", null],
        ["emit", "INIT"]
      ]
    }
  ]
}
```

**ثلاث طرق للخروج من النافذة المنبثقة:**
1. انقر "إلغاء" ← يُطلق حدث `CLOSE`
2. انقر "حفظ" ← يُطلق حدث `SAVE`
3. اضغط Escape أو انقر على التراكب ← ModalSlot يُرسل `UI:CLOSE`

الثلاثة ينتقلون عائدين إلى `browsing` ويُفرغون النافذة المنبثقة.

## التسلسل الهرمي للخانات

الخانات المختلفة لها متطلبات عودة مختلفة:

| الخانة | النوع | متطلبات العودة |
|--------|-------|---------------|
| `main` | رئيسي | لا شيء — هذه هي القاعدة الأساسية |
| `sidebar` | ثانوي | اختياري — يمكن أن يتواجد مع main |
| `modal` | تراكب | **مطلوب** — يجب أن يملك انتقال خروج |
| `drawer` | تراكب | **مطلوب** — يجب أن يملك انتقال خروج |
| `toast` | إشعار | يختفي تلقائياً، لا حاجة لانتقال |

## لماذا هذه الهندسة مهمة

### للمستخدمين
- ✅ لن يعلقوا في النوافذ المنبثقة أبداً
- ✅ سلوك متسق عبر التطبيقات
- ✅ أنماط واجهة متوقعة

### للمطورين
- ✅ الأخطاء تُلتقط وقت التصريف
- ✅ لا حاجة لتوصيل معالجات الإغلاق يدوياً
- ✅ تغييرات الحالة قابلة للتتبع

### للفرق
- ✅ المخطط = التوثيق
- ✅ سهولة مراجعة تدفقات الحالة
- ✅ التأهيل أسرع

## جرّبه: ابنِ نافذة منبثقة لا تتعطل

أنشئ ملف `modal-demo.orb`:

```json
{
  "name": "ModalDemo",
  "orbitals": [{
    "name": "Demo",
    "entity": { "name": "Item", "fields": [{ "name": "name", "type": "string" }] },
    "traits": [{
      "name": "DemoTrait",
      "linkedEntity": "Item",
      "stateMachine": {
        "states": [
          { "name": "main", "isInitial": true },
          { "name": "modalOpen" }
        ],
        "events": [
          { "key": "INIT", "name": "Initialize" },
          { "key": "OPEN", "name": "Open" },
          { "key": "CLOSE", "name": "Close" }
        ],
        "transitions": [
          {
            "from": "main",
            "to": "main",
            "event": "INIT",
            "effects": [
              ["render-ui", "main", {
                "type": "page-header",
                "title": "Demo",
                "actions": [{ "label": "Open Modal", "event": "OPEN" }]
              }]
            ]
          },
          {
            "from": "main",
            "to": "modalOpen",
            "event": "OPEN",
            "effects": [
              ["render-ui", "modal", { "type": "page-header", "title": "I'm a Modal!" }]
            ]
          },
          {
            "from": "modalOpen",
            "to": "main",
            "event": "CLOSE",
            "effects": [
              ["render-ui", "modal", null],
              ["emit", "INIT"]
            ]
          }
        ]
      }
    }],
    "pages": [{ "name": "DemoPage", "path": "/", "traits": [{ "ref": "DemoTrait" }] }]
  }]
}
```

صرّف وجرّب:
```bash
orbital validate modal-demo.orb  # Will fail without CLOSE transition
orbital compile modal-demo.orb --shell typescript
```

جرّب إزالة انتقال `CLOSE` والتحقق مرة أخرى. المُصرِّف لن يسمح لك بإنشاء دائرة مكسورة.

## الخلاصة

نمط الدائرة المغلقة ليس مجرد فكرة جيدة — إنه مفروض من المُصرِّف.

في المدار:
- كل إجراء في الواجهة يُرسل حدثاً
- كل حدث له انتقال
- كل تراكب له مخرج
- المستخدمون لا يعلقون أبداً

لأن أفضل طريقة لمنع الأخطاء ليست الاختبار — بل جعل كتابتها مستحيلة.

تعرّف على المزيد حول [آلات الحالة في المدار](/docs/traits).
