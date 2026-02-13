---
slug: compiler-that-says-no
title: "المُصرِّف الذي يقول لا: كيف يمنع 50 مُحققًا الأخطاء قبل وجودها"
authors: [osamah]
tags: [compiler, rust, engineering]
---

معظم المُصرِّفات تتحقق من البنية النحوية. مُصرِّفنا يتحقق من المنطق.

مُصرِّف المدار يُشغّل أكثر من 50 قاعدة تحقق عبر 12 وحدة قبل توليد سطر واحد من الشيفرة. يكتشف النوافذ المنبثقة العالقة، والأحداث اليتيمة، والحالات غير القابلة للوصول، والدوائر المكسورة — أخطاء عادةً ما تنجو حتى تصل إلى الإنتاج.

إليك ما يكتشفه وكيف.

<!-- truncate -->

## لماذا التحقق أفضل من الاختبار

الاختبار يخبرك: "هذا السيناريو المحدد يعمل."

التحقق يخبرك: "لا يوجد سيناريو يمكن أن يكسره."

الاختبارات عيّنات. التحقق برهان. مُصرِّف المدار لا يتحقق مما إذا كان تطبيقك يعمل *في الحالات التي اختبرتها*. بل يتحقق مما إذا كان تطبيقك *يمكن أن يُكسر أصلًا*.

## وحدات التحقق الـ 12

يُشغّل المُصرِّف المُحققات بالتسلسل، كل منها يركز على جانب مختلف:

```
Schema → Entity → Trait → Effect → RenderUI → Slot →
S-Expression → Binding → Service → CrossOrbital → Icon → ClosedCircuit
```

لنستعرض أكثرها إثارة للاهتمام.

### 1. مُحقق الكيان

يكتشف مشاكل نموذج البيانات قبل أن تصبح أخطاء وقت التشغيل.

**أسماء حقول مكررة:**
```
Error: ORB_E_DUPLICATE_FIELD
  Entity 'Task' has duplicate field name 'status'.
  Each field name must be unique within an entity.
```

**أهداف علاقة غير صالحة:**
```
Error: ORB_E_INVALID_RELATION
  Field 'assigneeId' references entity 'User' but no entity
  named 'User' exists in this schema.
  Available entities: Task, Project, Comment
```

**أسماء حقول محجوزة:**
```
Error: ORB_E_RESERVED_FIELD
  Field name 'id' is reserved and automatically generated.
  Remove this field from your entity definition.
```

### 2. مُحقق السمة

يضمن أن آلات الحالة مُشكَّلة بشكل صحيح.

**لا توجد حالة ابتدائية:**
```
Error: ORB_T_NO_INITIAL_STATE
  Trait 'TaskInteraction' has no initial state.
  Add 'isInitial: true' to exactly one state.
```

**حالات غير قابلة للوصول:**
```
Error: ORB_T_UNREACHABLE_STATE
  State 'Archived' in trait 'TaskInteraction' has no incoming
  transitions. It can never be reached.
  Either add a transition to this state or remove it.
```

هذا أمر دقيق. تُعرّف حالة لكن تنسى إنشاء انتقال *إليها*. بدون المُحقق، تكون الحالة موجودة في مخططك لكنها لا يمكن أن تُدخل أبدًا — شيفرة ميتة في آلة الحالة الخاصة بك.

**انتقالات مكررة:**
```
Error: ORB_T_DUPLICATE_TRANSITION
  Trait 'TaskInteraction' has two transitions from 'Browsing'
  on event 'EDIT'. State machines must be deterministic.
```

### 3. مُحقق الدائرة المغلقة

الجوهرة المتوجة. يضمن أن كل تفاعل مستخدم يُكمل دائرة كاملة.

**طبقات عالقة:**
```
Error: CIRCUIT_NO_OVERLAY_EXIT
  State 'EditModal' renders to 'modal' slot but has no exit
  transition. Users will be stuck in this overlay.

  Fix: Add a transition from 'EditModal' with event 'CANCEL' or 'CLOSE'
  that includes the effect: ["render-ui", "modal", null]
```

هذا هو خطأ "النافذة المنبثقة التي لا تُغلق". في التطبيقات التقليدية، تكتشفه عندما يبلغ عنه مستخدم. في المدار، تكتشفه قبل أن توجد الشيفرة.

**أحداث يتيمة:**
```
Error: CIRCUIT_ORPHAN_EVENT
  Action 'Delete' in state 'Viewing' emits event 'DELETE'
  which has no transition handler in the current state.

  The button will render but clicking it will do nothing.
```

عرّفت زرًا بحدث، لكن لا انتقال يعالج ذلك الحدث في الحالة الحالية. الزر سيُعرض، والمستخدم سينقر عليه، ولن يحدث شيء. المُحقق يكتشف هذا في وقت التصريف.

**فقدان الفتحة الرئيسية:**
```
Error: CIRCUIT_NO_MAIN_RENDER
  State 'Browsing' has no render-ui effect targeting the 'main' slot.
  The page will be blank when entering this state.
```

عرّفت حالة لكن نسيت عرض أي شيء في فتحة واجهة المستخدم الرئيسية. سيرى المستخدمون صفحة فارغة.

### 4. مُحقق التعبيرات-S

يتحقق من أن تعبيراتك المنطقية مُشكَّلة بشكل صحيح.

**عوامل غير معروفة:**
```
Error: ORB_S_UNKNOWN_OPERATOR
  Unknown operator 'equals' in guard expression.
  Did you mean '='?
  Available comparison operators: =, !=, >, >=, <, <=
```

**عدد وسائط خاطئ:**
```
Error: ORB_S_WRONG_ARITY
  Operator 'and' expects 2+ arguments, got 1.
  Expression: ["and", ["=", "@entity.status", "active"]]

  'and' with a single argument is always equal to that argument.
  Did you mean to add another condition?
```

**عدم تطابق الأنواع:**
```
Error: ORB_S_TYPE_MISMATCH
  Operator '>' expects numeric arguments.
  Got: "@entity.name" (string) > 10 (number)

  You're comparing a string to a number. This will always
  evaluate to false.
```

### 5. مُحقق الربط

يضمن أن جميع مراجع البيانات تشير إلى حقول حقيقية.

**جذر ربط غير معروف:**
```
Error: ORB_B_UNKNOWN_ROOT
  Unknown binding root '@result' in expression.
  Valid roots: @entity, @payload, @state, @now, @config, @user
```

**حقل كيان غير معروف:**
```
Error: ORB_B_UNKNOWN_FIELD
  Binding '@entity.staus' references field 'staus' which doesn't
  exist on entity 'Task'.
  Did you mean 'status'?
  Available fields: title, description, status, priority
```

كشف الأخطاء الإملائية مع اقتراحات. `@entity.staus` → "هل تقصد `status`؟"

### 6. مُحقق عبر المدارات

يضمن اكتمال اتصال الأحداث بين المدارات.

**إطلاق بدون مستمع:**
```
Error: ORB_X_ORPHAN_EMIT
  Trait 'OrderTrait' emits 'ORDER_COMPLETED' but no trait
  has a matching 'listens' declaration.

  Every emitted event must have at least one listener.
  Either add a listener or remove the emission.
```

هذا يمنع أحداث "أطلق وانسَ" — إطلاقات لا تذهب إلى أي مكان. في بنية الخدمات المصغرة، هذا سيكون رسالة تُنشر في طابور بدون مستهلك. في المدار، يكتشفه المُصرِّف.

## البنية ذات المسارين

بعض عمليات التحقق تتطلب مراجع أمامية. الكيان أ يشير إلى الكيان ب، لكن ب مُعرَّف بعد أ. مُحقق بمسار واحد سيرفض هذا.

مُصرِّف المدار يستخدم **نهج المسارين**:

**المسار 1: الجمع**
- جمع جميع أسماء الكيانات وأسماء السمات وأسماء الحالات وأسماء الأحداث
- بناء جدول رموز لكل ما هو موجود

**المسار 2: التحقق**
- فحص جميع المراجع مقابل جدول الرموز
- تشغيل جميع وحدات التحقق الـ 12
- الإبلاغ عن الأخطاء مع السياق والاقتراحات

هذا يعني أنه يمكنك تعريف المدارات بأي ترتيب. المُصرِّف يكتشف رسم التبعيات.

## جودة الأخطاء: الفرق بين "خطأ" و"مساعدة"

قارن خطأ مُصرِّف نموذجي:

```
Error: unexpected token at line 47, column 12
```

مع خطأ تحقق المدار:

```
Error: CIRCUIT_NO_OVERLAY_EXIT

  State 'EditModal' renders to 'modal' slot but has no exit transition.
  Users will be stuck in this overlay.

  Location: orbitals[0].traits[0].stateMachine.states[2]
  Schema: task-app.orb

  Fix: Add a transition from 'EditModal' with event 'CANCEL' or 'CLOSE'
  that includes the effect: ["render-ui", "modal", null]

  Example:
    {
      "from": "EditModal",
      "to": "Browsing",
      "event": "CANCEL",
      "effects": [["render-ui", "modal", null]]
    }
```

كل خطأ يتضمن:
- **رمز الخطأ** — قابل للبحث والتوثيق
- **وصف مقروء** — ما هو الخطأ
- **الأثر** — لماذا يهم (المستخدمون سيعلقون)
- **الموقع** — بالضبط أين في المخطط
- **الإصلاح** — كيفية حله
- **مثال** — حل جاهز للنسخ واللصق

## مبني بـ Rust: لماذا يهم ذلك

المُصرِّف مكتوب بـ Rust. هذا يمنحنا:

**مطابقة أنماط شاملة:** عندما نضيف نوع تأثير جديد، مُصرِّف Rust يجبرنا على معالجته في كل مُحقق. لا يمكننا نسيان حالة — لن يُصرَّف.

**أمان الذاكرة بدون جامع القمامة:** المُحقق يستعير المخطط بدون نسخه. لمخطط من 5,000 سطر، هذا يوفر ذاكرة ووقتًا كبيرين.

**سرعة التصريف:** التحقق الكامل لمخطط كبير يستغرق أقل من 50 مللي ثانية. تحصل على التغذية الراجعة أسرع مما يمكن لمحررك أن يتحدث.

**التزامن الآمن:** يمكن لوحدات التحقق أن تعمل بالتوازي بدون تنافس على البيانات. نظام أنواع Rust يضمن هذا في وقت التصريف.

## ما لا نتحقق منه (بعد)

المُحقق ليس كلّي المعرفة. لا يتحقق حاليًا من:

- **الصحة الدلالية للحُرّاس** — يعرف أن `[">=", "@entity.amount", 0]` صالح بنيويًا، لكنه لا يعرف ما إذا كان منطق الأعمال صحيحًا
- **الآثار المترتبة على الأداء** — آلة حالة بـ 1,000 حالة صالحة لكنها قد تكون بطيئة
- **جماليات الواجهة** — جدولان يُعرضان في نفس الفتحة أمر صالح لكنه ربما قبيح

هذه مجالات للتحسين المستقبلي. لكن القواعد الخمسين+ التي لدينا اليوم تكتشف الغالبية العظمى من الأخطاء التي تنجو حتى الإنتاج في التطبيقات التقليدية.

## الخلاصة

أفضل خطأ هو الذي لا يوجد أبدًا.

مُصرِّف المدار لا يتحقق فقط من البنية النحوية. بل يتحقق من السببية (الدوائر المغلقة)، والاكتمال (لا أحداث يتيمة)، وقابلية الوصول (لا حالات ميتة)، والصحة (تعبيرات آمنة الأنواع)، والاتساق (مطابقة الأحداث عبر المدارات).

أكثر من 50 قاعدة. 12 وحدة. أقل من 50 مللي ثانية.

هذا ليس مُصرِّفًا. إنه مراجع شيفرة لا ينام أبدًا، ولا يفوّت حالة أبدًا، ولا يوافق على شيفرة معطوبة أبدًا.

استكشف [وثائق المُصرِّف](/docs/compiler) لمعرفة المزيد.
