# المكتبة القياسية (Standard Library)

> السلوكيات القياسية القابلة لإعادة الاستخدام لتطبيقات Almadar

---

## 1. نظرة عامة

توفر المكتبة القياسية **34 سلوكًا قابلاً لإعادة الاستخدام** (سمات قياسية) لنظام Orbital. كل سلوك هو `OrbitalSchema` قائم بذات يمكنه العمل كملف `.orb` مستقل.

### فئات السلوكيات

| الفئة | السلوكيات |
|-------|-----------|
| **Game Core** | GameLoop، Physics2D، Input، Collision |
| **Game Entity** | Health، Score، Movement، Combat، Inventory |
| **Game UI** | GameFlow، Dialogue، LevelProgress |
| **UI Interaction** | List، Detail، Form، Modal، Drawer، Tabs، Wizard، MasterDetail، Filter |
| **Data Management** | Pagination، Selection، Sort، Filter، Search |
| **Async** | Loading، Fetch، Submit، Retry، Poll |
| **Feedback** | Notification، Confirmation، Undo |

---

## 2. هيكل السلوك (OrbitalSchema)

كل سلوك هو `OrbitalSchema` كامل (يُعرف أيضًا بـ `BehaviorSchema`):

```typescript
import type { BehaviorSchema } from '@almadar/std';

export const LIST_BEHAVIOR: BehaviorSchema = {
  name: 'std-list',
  version: '1.0.0',
  description: 'قائمة كيانات مع تحديد وإجراءات',
  orbitals: [{
    name: 'ListOrbital',
    entity: {
      name: 'ListState',
      persistence: 'runtime',
      fields: [
        { name: 'id', type: 'string', required: true },
        { name: 'selectedId', type: 'string', default: null },
        { name: 'items', type: 'array', default: [] },
      ],
    },
    traits: [{
      name: 'List',
      linkedEntity: 'ListState',
      category: 'interaction',
      stateMachine: {
        states: [
          { name: 'Empty', isInitial: true },
          { name: 'Loaded' },
          { name: 'ItemSelected' },
        ],
        events: [/* ... */],
        transitions: [/* ... */],
      },
    }],
    pages: [],
  }],
};
```

### النقاط الرئيسية في الهيكل

- **`name`**: kebab-case مع بادئة `std-` (مثل `std-list`، `std-gameloop`)
- **`orbitals`**: مصفوفة تحتوي على orbital واحد مع كيان وسمات وصفحات
- **`entity`**: حقول حالة وقت التشغيل
- **`traits`**: مصفوفة من تعريفات السمات مع `linkedEntity`
- **`pages`**: مصفوفة فارغة (مطلوبة حسب النوع، يمكن ملؤها للصفحات)

---

## 3. التحقق من صحة النمط مع Type Safety

### اتحاد PatternType

يُنفذ تأثير `render-ui` الأنواع الصالحة في وقت التجميع:

```typescript
import type { PatternConfig } from '@almadar/core';

export interface PatternConfig {
  type: PatternType;  // 203 أنماط صالحة
  [key: string]: unknown;
}
```

يتضمن اتحاد `PatternType` جميع الأنماط المسجلة:

```typescript
export type PatternType =
  | 'entity-table'
  | 'card'
  | 'form'
  | 'button'
  // ... 199 نمطًا آخر
  ;
```

### الاستخدام في السلوكيات

```typescript
// ✅ صالح - 'entity-table' مع خصائص مكتوبة
['render-ui', 'main', { patternType: 'entity-table', columns: ['name', 'email'] }]

// ❌ خطأ TypeScript - 'fake-pattern' ليس PatternType صالح
['render-ui', 'main', { patternType: 'fake-pattern' }]

// ❌ خطأ TypeScript - الخاصية المطلوبة 'columns' مفقودة
['render-ui', 'main', { patternType: 'entity-table' }]
```

---

## 4. الاستخدام

### استيراد السلوكيات

```typescript
import { 
  LIST_BEHAVIOR,
  FORM_BEHAVIOR,
  LOADING_BEHAVIOR,
  STANDARD_BEHAVIORS,
} from '@almadar/std';

// الوصول إلى جميع الـ 34 سلوكًا
console.log(STANDARD_BEHAVIORS.length); // 34
```

### استيراد الأنواع

```typescript
import type { 
  BehaviorSchema,   // alias لـ OrbitalSchema
  OrbitalSchema,    // نوع المخطط الكامل
  Orbital,          // orbital واحد
  Entity,           // تعريف الكيان
} from '@almadar/std';
```

### دوال السجل

```typescript
import { 
  getBehavior,
  isKnownBehavior,
  getAllBehaviorNames,
  getBehaviorLibraryStats,
} from '@almadar/std';

// الحصول على سلوك بالاسم
const list = getBehavior('std-list');

// التحقق من الصحة
if (isKnownBehavior('std-form')) { /* ... */ }

// الحصول على الإحصائيات
const stats = getBehaviorLibraryStats();
// { totalBehaviors: 34, totalStates: X, totalEvents: X, ... }
```

---

## مرجع السلوكيات الكامل (34 سلوكًا)

### سلوكيات الألعاب (12)

| السلوك | الوصف | الحالات | الأحداث |
|--------|-------|---------|---------|
| `GAME_LOOP_BEHAVIOR` | حلقة اللعبة الرئيسية مع التحديث/العرض | Paused، Running | START، PAUSE، RESUME |
| `PHYSICS_2D_BEHAVIOR` | محاكاة الفيزياء ثنائية الأبعاد | Static، Dynamic | COLLISION، APPLY_FORCE |
| `INPUT_BEHAVIOR` | معالجة الإدخال (لوحة المفاتيح، الفأرة، اللمس) | Idle، Active | KEY_DOWN، KEY_UP، CLICK |
| `COLLISION_BEHAVIOR` | اكتشاف التصادم | Clear، Colliding | ENTER، EXIT |
| `HEALTH_BEHAVIOR` | نظام الصحة/الضرر | Healthy، Damaged، Dead | DAMAGE، HEAL، REVIVE |
| `SCORE_BEHAVIOR` | نظام النقاط/النتيجة | Idle، Updating | ADD_POINTS، RESET |
| `MOVEMENT_BEHAVIOR` | حركة الكيان | Idle، Moving | MOVE، STOP، TELEPORT |
| `COMBAT_BEHAVIOR` | ميكانيكيات القتال | Peaceful، InCombat، Cooldown | ATTACK، DEFEND، DODGE |
| `INVENTORY_BEHAVIOR` | مخزن العناصر | Empty، HasItems | ADD_ITEM، REMOVE_ITEM |
| `GAME_FLOW_BEHAVIOR` | إدارة حالة اللعبة | Menu، Playing، Paused، GameOver | START، PAUSE، RESUME، END |
| `DIALOGUE_BEHAVIOR` | نظام حوار NPC | Idle، Active | START_DIALOGUE، ADVANCE، END |
| `LEVEL_PROGRESS_BEHAVIOR` | تتبع المستوى/المهمة | InProgress، Completed | COMPLETE_OBJECTIVE، UNLOCK |

### سلوكيات تفاعل واجهة المستخدم (9)

| السلوك | الوصف | حالة الاستخدام |
|--------|-------|----------------|
| `LIST_BEHAVIOR` | قائمة الكيانات مع التحديد | جداول البيانات، القوائم |
| `DETAIL_BEHAVIOR` | عرض كيان واحد | تفاصيل العنصر، الملف الشخصي |
| `FORM_BEHAVIOR` | معالجة نموذج الإدخال | نماذج الإنشاء/التعديل |
| `MODAL_BEHAVIOR` | حوار Modal | تنبيهات، تأكيدات |
| `DRAWER_BEHAVIOR` | لوحة جانبية Drawer | تنقل، مرشحات |
| `TABS_BEHAVIOR` | واجهة علامات التبويب | أقسام المحتوى |
| `WIZARD_BEHAVIOR` | معالج متعدد الخطوات | التهيئة، الدفع |
| `MASTER_DETAIL_BEHAVIOR` | تخطيط رئيسي-تفصيلي | البريد، مستكشف الملفات |
| `FILTER_BEHAVIOR` | تصفية البيانات | نتائج البحث، القوائم |

### سلوكيات إدارة البيانات (5)

| السلوك | الوصف | الميزات |
|--------|-------|---------|
| `PAGINATION_BEHAVIOR` | التنقل عبر الصفحات | حجم الصفحة، التنقل |
| `SELECTION_BEHAVIOR` | تحديد متعدد للعناصر | تحديد الكل، تحديد النطاق |
| `SORT_BEHAVIOR` | فرز أعمدة البيانات | فرز متعدد الأعمدة |
| `SEARCH_BEHAVIOR` | البحث النصي الكامل | منظم، مرشحات |

### سلوكيات غير المتزامنة (5)

| السلوك | الوصف | الحالات |
|--------|-------|---------|
| `LOADING_BEHAVIOR` | حالات التحميل | Idle، Loading، Success، Error |
| `FETCH_BEHAVIOR` | جلب البيانات | Fresh، Stale، Refreshing |
| `SUBMIT_BEHAVIOR` | إرسال النموذج | Ready، Submitting، Submitted |
| `RETRY_BEHAVIOR` | إعادة المحاولة مع التراجع | Failed، Retrying، Recovered |
| `POLL_BEHAVIOR` | استطلاع التحديثات | Polling، Stopped |

### سلوكيات التغذية الراجعة (3)

| السلوك | الوصف | الميزات |
|--------|-------|---------|
| `NOTIFICATION_BEHAVIOR` | إشعارات Toast | الإغلاق التلقائي، الإجراءات |
| `CONFIRMATION_BEHAVIOR` | تأكيد الإجراءات | موافق/إلغاء، أزرار مخصصة |
| `UNDO_BEHAVIOR` | مكدس التراجع/الإعادة | تراجع محدد بالوقت |

---

## مرجع API

### سجل السلوكيات

```typescript
// الحصول على سلوك واحد
import { getBehavior } from '@almadar/std';

// التحقق من الوجود
import { isKnownBehavior } from '@almadar/std';

// قائمة الكل
import { getAllBehaviorNames, getAllBehaviors } from '@almadar/std';

// البيانات الوصفية
import { getAllBehaviorMetadata } from '@almadar/std';

// البحث حسب حالة الاستخدام
import { findBehaviorsForUseCase } from '@almadar/std';

// تصفية الأحداث
import { getBehaviorsForEvent } from '@almadar/std';

// تصفية الحالات
import { getBehaviorsWithState } from '@almadar/std';

// التحقق من الصحة
import { validateBehaviorReference } from '@almadar/std';
```

### عوامل المكتبة القياسية

```typescript
// العمليات الرياضية
import { MATH_OPERATORS } from '@almadar/std';

// عمليات النص
import { STR_OPERATORS } from '@almadar/std';

// عمليات المصفوفة
import { ARRAY_OPERATORS } from '@almadar/std';

// عمليات الكائن
import { OBJECT_OPERATORS } from '@almadar/std';

// عمليات الوقت
import { TIME_OPERATORS } from '@almadar/std';

// التحقق من الصحة
import { VALIDATE_OPERATORS } from '@almadar/std';

// التنسيق
import { FORMAT_OPERATORS } from '@almadar/std';

// الأدوات غير المتزامنة
import { ASYNC_OPERATORS } from '@almadar/std';
```

### الوصول إلى السجل

```typescript
// بحث جميع العوامل
import {
  STD_OPERATORS,
  STD_OPERATORS_BY_MODULE,
  getStdOperatorMeta,
  isKnownStdOperator,
} from '@almadar/std';

// استعلامات الوحدات
import {
  getModuleOperators,
  getAllStdOperators,
  getStdOperatorsByModule,
} from '@almadar/std';

// التصنيف
import {
  getLambdaOperators,
  getStdEffectOperators,
  getStdPureOperators,
} from '@almadar/std';

// التحقق من الصحة
import {
  validateStdOperatorArity,
  isStdGuardOperator,
  isStdEffectOperator,
} from '@almadar/std';
```

### توليد التوثيق

```typescript
import {
  generateOperatorDoc,
  generateModuleDoc,
  generateBehaviorDoc,
  generateModulesDocs,
  generateBehaviorsDocs,
  generateStdLibDocs,
} from '@almadar/std';
```
