# الأنماط (Patterns)

> الجسر بين المخططات التصريحية ومكونات واجهة المستخدم

---

## نظرة عامة

**نظام الأنماط** يربط المخططات التصريحية بمكونات واجهة المستخدم الفعلية. عندما يحدد تأثير `render-ui` في السمة نوع نمط، يستخدم النظام ثلاث آليات رئيسية لـ:

1. **التحقق** من خصائص النمط مقابل المخطط
2. **تعيين** النمط إلى مكون ملموس
3. **فرض** عقد الأحداث للامتثال للدائرة المغلقة

```
المخطط (render-ui)  →  سجل الأنماط  →  تعيين المكون  →  مكون Shell
                              ↓
                       عقد الحدث
                              ↓
                    التحقق من الدائرة المغلقة
```

---

## سجل الأنماط

سجل الأنماط هو مصدر الحقيقة لجميع الأنماط المتاحة. يحدد كل نمط:

```json
{
  "entity-table": {
    "type": "entity-table",
    "category": "display",
    "description": "جدول بيانات مع أعمدة وفرز",
    "suggestedFor": ["data-dense views", "comparisons", "admin panels"],
    "typicalSize": "medium",
    "componentHints": ["row-action:*", "table-cell", "sort-header"],
    "implements": "EntityBoundPatternProps",
    "propsSchema": {
      "columns": {
        "required": true,
        "types": ["array"],
        "description": "يمكن أن تكون الأعمدة كائنات Column أو أسماء حقول string بسيطة"
      },
      "entity": {
        "types": ["string", "array"],
        "description": "اسم الكيان للجلب التلقائي أو مصفوفة البيانات"
      },
      "itemActions": {
        "types": ["array"],
        "description": "إجراءات العنصر من الكود المولد - تعيين إلى rowActions"
      }
    },
    "componentMapping": {
      "component": "DataTable",
      "eventContract": { }
    }
  }
}
```

### خصائص النمط

| الخاصية | الوصف |
|---------|-------|
| `type` | معرف النمط الفريد (يستخدم في `render-ui`) |
| `category` | التجميع: `display`، `form`، `header`، `filter`، `navigation`، `layout`، `game`، `state` |
| `description` | وصف قابل للقراءة من قبل الإنسان |
| `suggestedFor` | تلميحات حالة الاستخدام لتوليد LLM |
| `typicalSize` | البصمة في واجهة المستخدم: `tiny`، `small`، `medium`، `large` |
| `componentHints` | أنماط المكونات الفرعية التي قد يستخدمها هذا النمط |
| `implements` | الواجهة التي ينفذها المكون (مثل `EntityBoundPatternProps`) |
| `propsSchema` | تعريفات الخصائص مع الأنواع والمتطلبات |
| `componentMapping` | تعيين إلى مكون shell وعقد الحدث |

### فئات الأنماط

| الفئة | الأمثلة | الغرض |
|-------|---------|-------|
| `display` | `entity-table`، `entity-list`، `entity-cards`، `stats` | عرض البيانات |
| `form` | `form`، `form-section`، `form-fields` | إدخال البيانات |
| `header` | `page-header`، `title-only` | عناوين الصفحات والإجراءات |
| `filter` | `search-bar`، `filter-group`، `search-input` | تصفية البيانات |
| `navigation` | `tabs`، `breadcrumb`، `wizard-progress`، `pagination` | عناصر التحكم في التنقل |
| `layout` | `modal`، `drawer`، `master-detail`، `dashboard-grid` | هيكل الصفحة |
| `game` | `game-canvas`، `game-hud`، `game-controls` | عناصر واجهة اللعبة |
| `state` | `empty-state`، `loading-state`، `error-state` | ملاحظات الحالة |

---

## تعيين المكونات

يربط تعيين المكون أنواع الأنماط بمكونات shell:

```json
{
  "mappings": {
    "entity-table": {
      "component": "DataTable",
      "category": "display"
    },
    "form": {
      "component": "Form",
      "category": "form"
    },
    "page-header": {
      "component": "PageHeader",
      "category": "header"
    }
  }
}
```

### خصائص التعيين

| الخاصية | الوصف |
|---------|-------|
| `component` | اسم المكون في shell |
| `category` | نفس فئة النمط |
| `client` | اختياري - مكون خاص بالعميل |
| `deprecated` | اختياري - يعلم النمط على أنه مهمل |
| `replacedBy` | اختياري - نمط بديل للأنماط المهملة |

---

## عقود الأحداث

تحدد عقود الأحداث الأحداث التي يمكن للمكون إصدارها والأحداث المطلوبة. هذا مهم لـ **التحقق من الدائرة المغلقة** - ضمان أن كل تفاعل واجهة مستخدم له انتقال آلة حالة مقابل.

```json
{
  "contracts": {
    "form": {
      "emits": [
        {
          "event": "SAVE",
          "trigger": "submit",
          "payload": { "type": "FormData" }
        },
        {
          "event": "CANCEL",
          "trigger": "click",
          "payload": { "type": "void" }
        }
      ],
      "requires": ["SAVE", "CANCEL"],
      "entityAware": true
    },
    "entity-table": {
      "emits": [
        {
          "event": "VIEW",
          "trigger": "action",
          "payload": { "type": "EntityRow" },
          "optional": true
        },
        {
          "event": "SELECT",
          "trigger": "select",
          "payload": { "type": "EntityRow" },
          "optional": true
        },
        {
          "event": "EDIT",
          "trigger": "action",
          "payload": { "type": "EntityRow" },
          "optional": true
        },
        {
          "event": "DELETE",
          "trigger": "action",
          "payload": { "type": "EntityRow" },
          "optional": true
        }
      ],
      "requires": [],
      "entityAware": true,
      "configDriven": true
    }
  }
}
```

### خصائص العقد

| الخاصية | الوصف |
|---------|-------|
| `emits` | الأحداث التي يمكن للمكون إصدارها |
| `requires` | الأحداث التي يجب أن يكون لها انتقالات (الدائرة المغلقة) |
| `entityAware` | المكون يستقبل بيانات الكيان |
| `configDriven` | الأحداث تحددها التكوين (مثل `itemActions`) |

### تعريف الحدث

| الخاصية | الوصف |
|---------|-------|
| `event` | اسم الحدث (مثل `SAVE`، `CANCEL`، `SELECT`) |
| `trigger` | ما يشغل الحدث: `click`، `submit`، `change`، `action`، `close` |
| `payload` | نوع الحمولة: `void`، `FormData`، `EntityRow`، أو شكل مخصص |
| `optional` | إذا كان `true`، الانتقال غير مطلوب |

### التكامل مع الدائرة المغلقة

تُمكّن عقود الأحداث [التحقق من الدائرة المغلقة](/core-concepts/closed-circuit):

1. **الأحداث المطلوبة**: إذا كان `requires: ["SAVE", "CANCEL"]`، يضمن المُحقق وجود انتقالات لكلا الحدثين
2. **أنماط التداخل**: `modal` و `drawer` تتطلب انتقالات `CLOSE` لمنع حالات واجهة المستخدم العالقة
3. **الأحداث المدفوعة بالتكوين**: لـ `entity-table` مع `itemActions: [{ event: "DELETE" }]`، يتحقق المُحقق من وجود انتقال `DELETE`

---

## متطلبات واجهة المكون

يجب على المكونات المعينة للأنماط تنفيذ واجهات محددة للمشاركة في الدائرة المغلقة.

### EntityBoundPatternProps

لمكونات مرتبطة بالبيانات (`entity-table`، `entity-list`، `form`، إلخ):

```typescript
interface EntityBoundPatternProps {
  entity?: string;           // اسم نوع الكيان
  data?: unknown[];          // مصفوفة البيانات
  isLoading?: boolean;       // حالة التحميل
  error?: Error | null;      // حالة الخطأ
}
```

### تكامل ناقل الأحداث

يجب على جميع المكونات التفاعلية إصدار الأحداث عبر ناقل الأحداث، وليس الاستدعاءات الداخلية:

```typescript
// صحيح - يستخدم ناقل الأحداث
const handleRowClick = (row: EntityRow) => {
  eventBus.emit('UI:SELECT', { row });
};

// خاطئ - إدارة حالة داخلية
const handleRowClick = (row: EntityRow) => {
  setSelectedRow(row);  // يكسر الدائرة!
};
```

### نمط خصائص الإجراءات

المكونات مع إجراءات قابلة للتكوين تستقبلها كخصائص:

```typescript
interface ActionablePatternProps {
  actions?: Array<{
    label: string;
    event: string;        // الحدث للإصدار
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: string;
  }>;
  itemActions?: Array<{   // للإجراءات على مستوى الصف
    label: string;
    event: string;
    icon?: string;
  }>;
}
```

يصدر المكون `UI:{event}` عند تشغيل الإجراء، مكملًا الدائرة مرة أخرى إلى آلة الحالة.

---

## نظام التصميم

يحتوي نظام التصميم على تنفيذات المكونات الفعلية التي تُعين إليها الأنماط.

### هيكل المكونات

| المستوى | الغرض | الأمثلة |
|---------|-------|---------|
| **Atoms** | عناصر واجهة مستخدم غير قابلة للقسمة | `Button`، `Input`، `Badge`، `Icon`، `Spinner` |
| **Molecules** | تركيبات بسيطة | `SearchInput`، `Tabs`، `Breadcrumb`، `FilterGroup` |
| **Organisms** | معقدة، قائمة بذاتها | `DataTable`، `Form`، `PageHeader`، `ModalSlot` |
| **Templates** | تخطيطات على مستوى الصفحة | مكونات صفحة كاملة خاصة بالعميل |

---

## استخدام الأنماط في المخططات

### تأثير render-ui

تُستخدم الأنماط عبر تأثير `render-ui` في انتقالات السمات:

```json
{
  "from": "viewing",
  "to": "viewing",
  "event": "INIT",
  "effects": [
    ["render-ui", "main", {
      "type": "page-header",
      "title": "المهام",
      "actions": [
        { "label": "إنشاء مهمة", "event": "CREATE", "variant": "primary" }
      ]
    }],
    ["render-ui", "main", {
      "type": "entity-table",
      "entity": "Task",
      "columns": ["title", "status", "assignee"],
      "itemActions": [
        { "label": "تعديل", "event": "EDIT" },
        { "label": "حذف", "event": "DELETE", "variant": "danger" }
      ]
    }]
  ]
}
```

### التحقق من الخصائص

يتحقق المترجم من الخصائص مقابل `propsSchema`:

1. **الخصائص المطلوبة** يجب أن تكون موجودة
2. **أنواع الخصائص** يجب أن تتطابق مع الأنواع المسموح بها
3. **الخصائص المجهولة** تولد تحذيرات

### توصيل الأحداث

لكل إجراء itemAction:

1. يصدر المكون `UI:{EVENT}` عبر ناقل الأحداث
2. خطاف `useUIEvents` يلتقط ويوجه إلى السمة
3. آلة الحالة تعالج الحدث
4. تنفذ التأثيرات، مما قد يعيد العرض

---

## الأنماط المتاحة

الأنماط التالية متاحة بشكل افتراضي:

### أنماط العرض

| النمط | الوصف | الخصائص الشائعة |
|-------|-------|-----------------|
| `entity-table` | جدول بيانات مع أعمدة وفرز | `entity`، `columns`، `itemActions` |
| `entity-list` | عرض قائمة لعناصر الكيان | `entity`، `itemActions` |
| `entity-cards` | تخطيط شبكة البطاقات للكيانات | `entity`، `columns`، `itemActions` |
| `stats` | عرض الإحصائيات مع بطاقات | `items` |
| `detail-view` | عرض تفاصيل كيان واحد | `entity`، `fields` |

### أنماط النماذج

| النمط | الوصف | الخصائص الشائعة |
|-------|-------|-----------------|
| `form` | نموذج كامل مع تحقق | `entity`، `fields`، `layout` |
| `form-section` | حقول نموذج مجمعة | `title`، `fields` |
| `form-fields` | حقول نموذج مضمنة | `fields` |

### أنماط الرؤوس

| النمط | الوصف | الخصائص الشائعة |
|-------|-------|-----------------|
| `page-header` | عنوان صفحة مع إجراءات | `title`، `subtitle`، `actions` |
| `title-only` | عرض عنوان بسيط | `title` |

### أنماط التصفية

| النمط | الوصف | الخصائص الشائعة |
|-------|-------|-----------------|
| `search-bar` | إدخال بحث عام | `placeholder`، `entity` |
| `filter-group` | رقائق/أزرار تصفية | `filters` |
| `search-input` | حقل بحث مستقل | `placeholder` |

### أنماط التنقل

| النمط | الوصف | الخصائص الشائعة |
|-------|-------|-----------------|
| `tabs` | تنقل علامات التبويب | `items`، `activeTab` |
| `breadcrumb` | مسار التنقل | `items` |
| `wizard-progress` | مؤشر الخطوة للمعالجات | `steps`، `currentStep` |
| `pagination` | تنقل الصفحات | `page`، `totalPages` |

### أنماط التخطيط

| النمط | الوصف | الخصائص الشائعة |
|-------|-------|-----------------|
| `modal` | طبقة حوار modal | `title`، `children` |
| `drawer` | لوحة جانبية | `title`، `position` |
| `master-detail` | تخطيط منقسم | `master`، `detail` |
| `dashboard-grid` | تخطيط شبكة للوحات التحكم | `items` |

### أنماط الحالة

| النمط | الوصف | الخصائص الشائعة |
|-------|-------|-----------------|
| `empty-state` | عنصر نائب لبيانات فارغة | `title`، `description`، `action` |
| `loading-state` | مؤشر التحميل | `message` |
| `error-state` | عرض الخطأ | `error`، `onRetry` |

---

## ملخص

يوفر نظام الأنماط:

1. **سجل الأنماط** - يحدد الأنماط المتاحة مع الخصائص والفئات والبيانات الوصفية
2. **تعيين المكونات** - يربط أنواع الأنماط بمكونات shell
3. **عقود الأحداث** - يحدد الأحداث التي يصدرها المكون ويتطلبها
4. **التحقق من الدائرة المغلقة** - يضمن أن جميع تفاعلات واجهة المستخدم لها معالجات آلة الحالة
5. **نظام التصميم** - يحتوي على تنفيذات المكونات الفعلية

تضمن هذه البنية أن تظل المخططات تصريحية بينما يتعامل المترجم مع تعقيد توصيل المكونات بنظام آلة الحالة المدفوع بالأحداث.

---

*للمزيد من التفاصيل حول المفاهيم المرتبطة، انظر [السمات](/core-concepts/traits) و [الدائرة المغلقة](/core-concepts/closed-circuit).*
