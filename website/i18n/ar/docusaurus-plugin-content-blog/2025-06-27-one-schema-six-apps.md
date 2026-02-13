---
slug: one-schema-six-apps
title: "schema واحد، ستة تطبيقات: كيف بنينا لعبة وأداة حكومية ومتتبع لياقة بنفس اللغة"
authors: [almadar]
tags: [case-study, architecture]
---

لعبة استراتيجية تكتيكية. لعبة زنزانات ثلاثية الأبعاد. منصة ذكاء العلاقات. نظام تفتيش حكومي. منصة تعلم بالذكاء الاصطناعي. متتبع لياقة شخصي.

ستة تطبيقات. ستة مجالات مختلفة تمامًا. لغة واحدة.

إليك الكيفية — ولماذا يهم ذلك.

<!-- truncate -->

## الادعاء

تدّعي كل لغة برمجة أنها "عامة الغرض." لكن متى كانت آخر مرة استخدمت فيها نفس الإطار لبناء لعبة *و* أداة امتثال حكومية؟

تعتبر البنية المدارية لـ Almadar محايدة المجال بالتصميم. الـ orbital (الوحدة المدارية) هو: entity (كيان يمثّل نموذج البيانات) + traits (وحدات سلوك تدير الـ state machine) + صفحات. تعمل تلك الصيغة لأي مجال لأنها تُنمذج **السلوك**، وليس **التقنية**.

لنستعرض الستة جميعًا.

## 1. حروب الـ traits — لعبة استراتيجية تكتيكية

**المجال:** قتال تكتيكي قائم على الأدوار
**التحدي الرئيسي:** قتال معقد مع ذكاء اصطناعي مرئي، مراحل أدوار، تركيب وحدات

تعد حروب الـ traits لعبة استراتيجية مستوحاة من Heroes of Might and Magic حيث تُجهّز الوحدات **traits** — state machines (آلات حالة تدير سلوك البرنامج عبر حالات محددة) مرئية تُحدد سلوكها. الابتكار الأساسي: يستطيع اللاعبون قراءة state machines الأعداء واستغلال نوافذ الـ transition (الانتقال بين حالتين).

**كيف تُنمذجها الـ orbitals:**

```
Match Orbital: manages game state, turns, win conditions
Unit Orbital: handles movement, combat, death
Hero Orbital: special abilities, trait composition
Terrain Orbital: tile effects, fog of war
```

سلوك كل وحدة هو trait بحالات مثل `خامل → متحرك → مهاجم → مدافع`. يرى اللاعبون هذه الحالات ويخططون حولها.

**ما يجعل هذا يعمل:** يعتبر متحكم مراحل الأدوار state machine بحد ذاته:

```json
{
  "states": [
    { "name": "ObservationPhase", "isInitial": true },
    { "name": "SelectionPhase" },
    { "name": "MovementPhase" },
    { "name": "ActionPhase" },
    { "name": "ResolutionPhase" }
  ]
}
```

خمس حالات. transitions نظيفة. بدون تعقيد خفي في حلقة اللعبة.

## 2. إرم — لعبة أكشن RPG ثلاثية الأبعاد

**المجال:** لعبة ARPG لاستكشاف الزنزانات
**التحدي الرئيسي:** قتال فوري، زنزانات إجرائية، تركيب القدرات

تدور إرم داخل كرة دايسون تُسمى سيادة إرم. ينزل اللاعبون عبر 5 مناطق زنزانات، ويهزمون الزعماء، ويجمعون **شظايا مدارية** — أجزاء من السلوك تتركب لتصبح قدرات جديدة.

**كيف تُنمذجها الـ orbitals:**

```
Player Orbital: health, inventory, equipped orbitals
Dungeon Orbital: room generation, enemy spawning, loot tables
Combat Orbital: damage, projectiles, area effects
Boss Orbital: phase-based boss encounters
```

يستطيع اللاعب تجهيز 8 orbitals في وقت واحد (الدفاع، الترميم، التعطيل، التصنيع، الاستكشاف، التحويل، القيادة، الأرشفة). كل منها state machine مكتفية ذاتيًا تتركب مع الأخرى.

**نظام الـ resonance (رنين — تأثيرات تآزرية بين الـ orbitals):** تخلق الـ orbitals المتوافقة effects (تأثيرات تُنفَّذ عند الـ transitions) تآزرية:
- الدفاع + الترميم → شفاء دروع 1.5 ضعف
- التعطيل + التصنيع → الفخاخ تُطبق إضعافات
- الأرشفة + القيادة → الحلفاء يتلقون معلومات عن نقاط ضعف الأعداء

يخلق هذا لعبة فوقية لبناء الأوراق فوق قتال الأكشن.

## 3. Winning 11 — ذكاء العلاقات

**المجال:** شبكات مهنية قائمة على الثقة
**التحدي الرئيسي:** فرض رقم دنبار، التوافق النفسي، تشكيل الفرق

تستبدل Winning 11 الشبكات السلبية على طريقة LinkedIn بـ "حدائق" مقصودة وعالية القيمة من متعاونين موثوقين. يفرض النظام رقم دنبار (حد 150 اتصال) ويستخدم تقييمات نفسية لحساب درجات الثقة.

**كيف تُنمذجها الـ orbitals:**

```
User Orbital: profile, Jungian archetype assessment
Connection Orbital: trust scoring, categorization, decay
Garden Orbital: relationship visualization, health metrics
Team Orbital: AI-driven team formation (2-11 members)
```

التقييم النفسي هو trait متعدد الخطوات بحالات لكل مرحلة أسئلة. تُحدَّث درجات الثقة كحقول entity عبر الـ effects عند حدوث التفاعلات.

**يفرض الـ guards (شروط تمنع أو تسمح بالـ transition) الديناميكيات الاجتماعية:**

```json
{
  "from": "Active",
  "to": "Active",
  "event": "ADD_CONNECTION",
  "guard": ["<", "@entity.connectionCount", 150]
}
```

حرفيًا لا تستطيع إضافة اتصال رقم 151. ليس اقتراحًا — لا تملك الـ state machine أي transition.

## 4. نظام التفتيش الحكومي — سير عمل الامتثال

**المجال:** تفتيش ميداني منظم للمنظمين الحكوميين
**التحدي الرئيسي:** فرض سير عمل من 5 مراحل، guards المتطلبات القانونية، سجلات التدقيق

يرشد هذا النظام، المبني للمفتشين الحكوميين، المفتش عبر مراحل المقدمة → المحتوى → التحضير → السجل → الإغلاق. تُفرض المتطلبات القانونية بالـ guards — لا يمكنك التقدم دون إكمال الحقول الإلزامية.

**كيف تُنمذجها الـ orbitals:**

```
Inspection Orbital: 5-phase workflow, field validation, document generation
Inspector Orbital: authentication, assignment, workload
Company Orbital: entity being inspected, history, compliance status
```

**يضمن guard الإغلاق عدم تفويت أي شيء:**

```json
{
  "from": "Record",
  "to": "Closing",
  "event": "CLOSE",
  "guard": ["and",
    ["not-empty", "@entity.legalBasis"],
    ["not-empty", "@entity.findings"],
    ["not-empty", "@entity.measures"],
    ["=", "@entity.inspectorSignature", true],
    ["=", "@entity.subjectSignature", true]
  ]
}
```

يُسجَّل كل transition تلقائيًا. لا يعد سجل التدقيق ميزة — إنه نتيجة للهندسة المعمارية.

## 5. KFlow — منصة تعلم بالذكاء الاصطناعي

**المجال:** توليد رسم بياني معرفي مدعوم بنماذج اللغة الكبيرة
**التحدي الرئيسي:** توسيع المفاهيم التكراري، توليد دروس بالذكاء الاصطناعي، نشر الدورات

تحوّل KFlow موضوعًا أوليًا (مثل "JavaScript") إلى رسم بياني معرفي منظم مع مفاهيم مترابطة، ودروس مولَّدة بالذكاء الاصطناعي، ودورات قابلة للنشر.

**كيف تُنمذجها الـ orbitals:**

```
Graph Orbital: seed concept, difficulty levels, learning paths
Concept Orbital: hierarchical layers, prerequisites, follow-ups
Lesson Orbital: AI-generated content, flashcards, exercises
Course Orbital: curated subsets, publishing, mentor assignment
```

**تقود الأحداث عبر الـ orbitals خط الإنتاج:**

```
User enters topic → Graph emits TOPIC_CREATED →
  Concept listens → expands prerequisites → emits CONCEPT_EXPANDED →
    Lesson listens → generates AI content → emits LESSON_CREATED →
      Course listens → adds to curriculum
```

يعتبر خط الإنتاج بالكامل تصريحيًا. بدون كود تنظيم. بدون طوابير مهام. مجرد أحداث تتدفق عبر الـ orbitals.

## 6. متتبع اللياقة — منصة تدريب شخصية

**المجال:** إدارة المدرب-العميل مع جدولة قائمة على الرصيد
**التحدي الرئيسي:** نظام رصيد، تتبع التمارين، تحليل الوجبات بالذكاء الاصطناعي

مبني لمدرب شخصي يدير عملاء متعددين. يتميز بنظام حجز جلسات قائم على الرصيد، وتتبع رفع الأثقال، وإدارة خطط الوجبات، وتحليل غذائي مدعوم بالذكاء الاصطناعي.

**كيف تُنمذجها الـ orbitals:**

```
Trainee Orbital: profile, credits, progress metrics
Session Orbital: booking, credit deduction, cancellation
Workout Orbital: lift logging, reps, weight, trends
Meal Orbital: daily intake, AI analysis, trainer feedback
Schedule Orbital: group sessions, YouTube video references
```

**انتهاء صلاحية الرصيد كـ guard:**

```json
{
  "from": "Available",
  "to": "Booked",
  "event": "BOOK_SESSION",
  "guard": ["and",
    [">", "@entity.remainingCredits", 0],
    ["<", "@now", "@entity.creditsExpireAt"]
  ],
  "effects": [
    ["set", "@entity.remainingCredits", ["-", "@entity.remainingCredits", 1]]
  ]
}
```

لا تستطيع الحجز برصيد صفري. لا تستطيع الحجز برصيد منتهي الصلاحية. الـ state machine تعرف.

## الـ pattern

ستة تطبيقات. ستة مجالات مختلفة. نفس الـ pattern (النمط المعماري):

| المفهوم | اللعبة | الحكومة | الاجتماعي | اللياقة | التعليم | الـ RPG |
|---------|--------|---------|-----------|---------|---------|--------|
| **الـ entity** | الوحدة | التفتيش | الاتصال | الجلسة | المفهوم | اللاعب |
| **الحالات** | خامل→هجوم→ميت | مقدمة→محتوى→إغلاق | معلق→نشط→متلاشٍ | متاح→محجوز→منتهٍ | بذرة→موسَّع→منشور | استكشاف→قتال→زعيم |
| **الـ guards** | HP > 0، في المدى | الحقول مملوءة، موقَّع | < 150 اتصال | الرصيد > 0 | المتطلبات المسبقة متحققة | يملك الـ orbital المطلوب |
| **الـ effects** | إلحاق ضرر، تحرك | حفظ النتائج، تسجيل | تحديث درجة الثقة | خصم رصيد | توليد درس | إسقاط غنيمة |
| **الأحداث** | ATTACK, MOVE, DIE | PROCEED, CLOSE | CONNECT, DECAY | BOOK, CANCEL | EXPAND, PUBLISH | ENTER_ROOM, ATTACK |

تتغير المفردات. ولا تتغير البنية.

## لماذا يهم هذا

### للمطورين

تتعلم Almadar مرة واحدة. ثم يمكنك بناء:
- أدوات أعمال
- ألعاب
- أنظمة حكومية
- منصات اجتماعية
- منتجات مدعومة بالذكاء الاصطناعي
- تطبيقات صحة ولياقة

بدون إطار جديد لكل مجال. بدون مكتبة إدارة حالة جديدة. بدون بنية خلفية جديدة. لغة واحدة، compiler (مُصرِّف) واحد، نموذج ذهني واحد.

### للشركات

يمكن لفريق واحد بناء منتجات متعددة. يستطيع المهندس المعماري الذي صمم نظام التفتيش تصميم نظام قتال اللعبة — الـ patterns (الأنماط المعمارية) هي نفسها. حالات، transitions، guards، effects.

### للصناعة

تشير حقيقة أن نفس الهندسة تتعامل مع القتال القائم على الأدوار والامتثال الحكومي إلى أننا وجدنا شيئًا جوهريًا. ليس إطارًا محسَّنًا لمجال واحد، بل **نموذجًا للسلوك** يعمل عبر المجالات.

لأن السلوك هو سلوك. سواء كانت وحدة لعبة تقرر الهجوم، أو مفتش يُكمل مرحلة، أو مدرب لياقة يحجز جلسة — كلها:

1. ابدأ في حالة
2. استقبل حدثًا
3. تحقق من الـ guards
4. نفّذ الـ effects
5. انتقل إلى الحالة التالية

لا يعتبر هذا ميزة إطار عمل. بل هكذا تعمل الأنظمة.

## الخلاصة

يعد سؤال "ما اللغة التي يجب أن أستخدمها؟" أقل أهمية من "ما نموذج السلوك الذي أستخدمه؟"

React + Express. Django + PostgreSQL. Rails + Redis. هذه خيارات تقنية. لا تغيّر كيفية نمذجة السلوك — فقط تغيّر أين تكتب نفس الـ patterns.

تعتبر Almadar نموذج سلوك يُصرَّف إلى تقنية. schema واحد. ستة تطبيقات. لأن النموذج صحيح.

استكشف جميع المشاريع وجرب بناء مشروعك الخاص في [almadar.io](/docs/getting-started/introduction).
