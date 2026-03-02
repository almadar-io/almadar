# الكيانات (Entities)

> كيفية عمل الكيانات في بنية Almadar - من تعريف المخطط إلى التنفيذ في وقت التشغيل.

---

## نظرة عامة

في Almadar، **الكيان (Entity)** هو نموذج البيانات في قلب كل وحدة مدارية (Orbital Unit). التركيب الأساسي هو:

```
Orbital Unit = Entity + Traits + Pages
```

تحدد الكيانات شكل البيانات، بينما تحدد السمات (Traits) السلوك (آلات الحالة) التي تعمل على هذه البيانات. الربط بينهما صريح وآمن من حيث النوع.

## تعريف الكيان

يتم تعريف الكيان في مخطط `.orb` بالهيكل التالي:

```json
{
  "name": "Task",
  "collection": "tasks",
  "fields": [
    { "name": "id", "type": "string", "required": true, "primaryKey": true },
    { "name": "title", "type": "string", "required": true },
    { "name": "status", "type": "enum", "values": ["pending", "active", "done"] },
    { "name": "assigneeId", "type": "relation", "relation": { "entity": "User", "cardinality": "one" } },
    { "name": "dueDate", "type": "date" },
    { "name": "tags", "type": "array", "items": { "type": "string" } }
  ]
}
```

### خصائص الكيان

| الخاصية | مطلوبة | الوصف |
|---------|--------|-------|
| `name` | نعم | معرف PascalCase (مثل `Task`، `User`، `GameState`) |
| `collection` | للمستمرة | اسم مجموعة قاعدة البيانات (مثل `tasks`، `users`) |
| `persistence` | لا | وضع التخزين: `persistent`، `runtime`، أو `singleton` |
| `fields` | نعم | مصفوفة من تعريفات الحقول |

---

## أنواع الحقول

يدعم Almadar الأنواع التالية من الحقول:

| النوع | الوصف | المثال | TypeScript | التخزين |
|-------|-------|--------|------------|---------|
| `string` | بيانات نصية | `"hello"` | `string` | String |
| `number` | قيم عددية (عشرية) | `42.5` | `number` | Number |
| `boolean` | صح/خطأ | `true` | `boolean` | Boolean |
| `date` | تاريخ بدون وقت | `"2026-03-01"` | `Date` | ISO string |
| `datetime` | تاريخ مع وقت | `"2026-03-01T10:30:00Z"` | `Date` | ISO string |
| `timestamp` | مللي ثانية منذ Epoch | `1709312400000` | `number` | Number |
| `array` | مجموعة من القيم | `["a", "b"]` | `T[]` | Array |
| `object` | بيانات منظمة | `{ key: "value" }` | `Record<string, unknown>` | JSON |
| `enum` | ثوابت مسماة | `"pending"` | Union type | String |
| `relation` | مرجع كيان | `"user_123"` | `string` (FK) | String |

### خصائص الحقل

```json
{
  "name": "status",
  "type": "enum",
  "required": true,
  "values": ["pending", "active", "done"],
  "default": ["quote", "pending"]
}
```

| الخاصية | الوصف |
|---------|-------|
| `name` | معرف الحقل بصيغة camelCase |
| `type` | أحد أنواع الحقول المدعومة |
| `required` | ما إذا كان الحقل يجب أن يحتوي على قيمة |
| `primaryKey` | تحديد حقل المفتاح الأساسي |
| `unique` | فرض قيد التفرد |
| `default` | القيمة الافتراضية (كـ S-expression) |
| `values` | لنوع `enum` - مصفوفة القيم المسموح بها |
| `items` | لنوع `array` - تعريف نوع العنصر |
| `properties` | لنوع `object` - تعريفات الحقول المتداخلة |
| `relation` | لنوع `relation` - الكيان المستهدف والتعددية |

### حقول العلاقات (Relation Fields)

تربط العلاقات الكيانات معًا:

```json
{
  "name": "assigneeId",
  "type": "relation",
  "relation": {
    "entity": "User",
    "cardinality": "one"
  },
  "required": false
}
```

**خيارات التعددية (Cardinality):**
- `one` - مرجع واحد (مفتاح خارجي)
- `many` - مراجع متعددة (مصفوفة من المعرفات)

---

## أنواع استمرارية الكيانات (Persistence Types)

للكيانات ثلاثة أوضاع استمرارية تغير بشكل أساسي سلوك التخزين والمشاركة:

### 1. الكيانات المستمرة (Persistent)

**التخزين:** قاعدة البيانات (Firestore، PostgreSQL، إلخ)
**العمر:** تستمر عند إعادة التشغيل، مشتركة عبر الجلسات
**المجموعة:** مطلوبة - تسمية صريحة
**الافتراضي:** إذا لم يتم تحديد `persistence`، فإنه يكون `persistent` افتراضيًا

```json
{
  "name": "Task",
  "persistence": "persistent",
  "collection": "tasks",
  "fields": [...]
}
```

**الخصائص:**
- جميع الوحدات المدارية التي تشير إلى نفس اسم الكيان تشترك في نفس المجموعة
- عمليات CRUD تمر عبر محول الاستمرارية
- مناسبة للكائنات المجال (Task، User، Order، Product)

### 2. كيانات وقت التشغيل (Runtime)

**التخزين:** الذاكرة فقط (كائنات JavaScript/Python)
**العمر:** تُفقد عند إعادة التشغيل/انتهاء الجلسة
**المجموعة:** لا يوجد

```json
{
  "name": "Enemy",
  "persistence": "runtime",
  "fields": [...]
}
```

**الخصائص:**
- **معزولة لكل وحدة مدارية** - كل وحدة تحصل على نسخها الخاصة
- لا توجد عمليات قاعدة بيانات
- مناسبة للحالة المؤقتة (Enemy، Projectile، Particle)
- شائعة في الألعاب حيث تظهر الكيانات وتختفي بشكل متكرر

### 3. كيانات Singleton

**التخزين:** الذاكرة (نسخة واحدة)
**العمر:** نسخة واحدة لكل جلسة
**المجموعة:** لا يوجد (سجل واحد)

```json
{
  "name": "Player",
  "persistence": "singleton",
  "fields": [...]
}
```

**الخصائص:**
- نسخة واحدة مشتركة عبر جميع الوحدات المدارية
- يمكن الوصول إليها عبر ربط `@EntityName` (مثل `@Player.health`)
- مناسبة للحالة العامة (Player، GameConfig، Settings)

### مقارنة الاستمرارية

| الجانب | Persistent | Runtime | Singleton |
|--------|------------|---------|-----------|
| التخزين | قاعدة بيانات | الذاكرة | الذاكرة |
| العمر | دائم | الجلسة | الجلسة |
| المشاركة | مشتركة بالاسم | معزولة لكل وحدة | نسخة واحدة |
| المجموعة | مطلوبة | لا يوجد | لا يوجد |
| حالة الاستخدام | كائنات المجال | كيانات الألعاب | الإعدادات العامة |

---

## روابط الكيانات في S-Expressions

### الروابط الأساسية

| الربط | الوصف | المثال |
|-------|-------|--------|
| `@entity` | نسخة الكيان الحالية | `@entity.status`، `@entity.id` |
| `@payload` | بيانات حمولة الحدث | `@payload.newStatus`، `@payload.amount` |
| `@state` | اسم حالة السمة الحالية | `@state` يرجع `"active"` |
| `@now` | الطابع الزمني الحالي (مللي ثانية) | `@now` يرجع `1709312400000` |
| `@user` | معلومات المستخدم المصادق | `@user.id`، `@user.email` |
| `@EntityName` | كيان Singleton | `@Player.health`، `@GameConfig.level` |

### الاستخدام في الحراس (Guards)

تستخدم الحراس الروابط للتحقق من الشروط قبل الانتقالات:

```json
{
  "from": "active",
  "to": "completed",
  "event": "COMPLETE",
  "guards": [
    [">=", "@entity.progress", 100],
    ["=", "@entity.assigneeId", "@user.id"]
  ]
}
```

### الاستخدام في التأثيرات (Effects)

تستخدم التأثيرات الروابط لقراءة البيانات وتعديلها:

```json
{
  "effects": [
    ["set", "@entity.id", "status", "@payload.newStatus"],
    ["set", "@entity.id", "updatedAt", "@now"],
    ["increment", "@entity.id", "completionCount", 1]
  ]
}
```

### التنقل في المسارات

تدعم الروابط ترقيم النقاط للوصول المتداخل:

```
@entity.user.name          → entity.user.name
@payload.metadata.tags[0]  → payload.metadata.tags[0]
@Player.inventory.slots    → Player.inventory.slots
```

### عملية تحليل الربط

1. **تحليل** - استخراج بادئة `@` والاسم الجذري
2. **البحث** - التحقق من المتغيرات المحلية (من `let`)، ثم الروابط الأساسية
3. **التنقل** - متابعة مسار النقطة عبر هيكل الكائن
4. **الإرجاع** - القيمة أو `undefined` إذا فشل المسار

---

## ربط السمة بالكيان (linkedEntity)

السمات هي آلات حالة تعمل على الكيانات. الربط بين السمة وكيانها صريح.

### الكيان الأساسي

كل وحدة مدارية لها **كيان أساسي** - الكيان المحدد في خاصية `entity`:

```json
{
  "name": "TaskManagement",
  "entity": {
    "name": "Task",
    "collection": "tasks",
    "fields": [...]
  },
  "traits": [...]
}
```

السمات في هذه الوحدة المدارية يمكنها الوصول تلقائيًا إلى `Task` عبر `@entity`.

### خاصية linkedEntity

عند الإشارة إلى سمة، يمكنك تحديد الكيان الذي يجب أن تعمل عليه:

```json
{
  "traits": [
    {
      "ref": "StatusManagement",
      "linkedEntity": "Task"
    },
    {
      "ref": "HealthManagement",
      "linkedEntity": "Player"
    }
  ]
}
```

**لماذا linkedEntity؟**

1. **سمات قابلة لإعادة الاستخدام** - سمة `StatusManagement` عامة يمكنها العمل مع أي كيان يحتوي على حقل `status`
2. **عمليات عبر الكيانات** - يمكن للسمة العمل على كيان مختلف عن الكيان الأساسي للوحدة المدارية
3. **ربط صريح** - يجعل تبعية الكيان واضحة وقابلة للتحقق من النوع

### كيفية العمل

عند إنشاء نسخة من السمة:

```typescript
const linkedEntity = traitDef.linkedEntity || orbitalEntityName;
this.traitEntityMap.set(trait.name, linkedEntity);
```

1. إذا تم تحديد `linkedEntity`، استخدمه
2. خلاف ذلك، الافتراضي إلى الكيان الأساسي للوحدة المدارية
3. تخزين التعيين لتحليل وقت التشغيل

### مثال: وحدة مدارية متعددة الكيانات

```json
{
  "name": "GameLevel",
  "entity": {
    "name": "Level",
    "persistence": "runtime",
    "fields": [...]
  },
  "traits": [
    { "ref": "LevelProgression", "linkedEntity": "Level" },
    { "ref": "PlayerHealth", "linkedEntity": "Player" },
    { "ref": "ScoreTracking", "linkedEntity": "GameState" }
  ]
}
```

كل سمة تعمل على الكيان المحدد، لكنها جميعًا جزء من نفس الوحدة المدارية.

---

## المعالجة في وقت التشغيل

يدير وقت التشغيل الكيانات من خلال الآليات التالية:

### تدفق معالجة الحدث

1. **استلام الحدث** - `{ event: "UPDATE", payload: {...}, entityId: "task_123" }`
2. **تحليل الكيان** - تحميل بيانات الكيان من الاستمرارية أو الذاكرة
3. **بناء السياق** - إنشاء سياق التقييم مع الروابط
4. **التحقق من الحراس** - تقييم تعبيرات الحراس
5. **تنفيذ التأثيرات** - تشغيل تأثيرات تغيير الحالة
6. **استمرار التغييرات** - حفظ بيانات الكيان المعدلة
7. **إرجاع الاستجابة** - تضمين البيانات المحدثة وتأثيرات العميل

### واجهة محول الاستمرارية

```typescript
interface PersistenceAdapter {
  create(entityType: string, data: Record<string, unknown>): Promise<{ id: string }>;
  update(entityType: string, id: string, data: Record<string, unknown>): Promise<void>;
  delete(entityType: string, id: string): Promise<void>;
  getById(entityType: string, id: string): Promise<Record<string, unknown> | null>;
  list(entityType: string): Promise<Record<string, unknown>[]>;
}
```

---

## وضع المحاكاة مقابل الوضع الحقيقي

يدعم وقت التشغيل وضعين لاستمرارية الكيانات:

### وضع المحاكاة (Mock - التطوير)

**التكوين:**
```typescript
const runtime = new OrbitalServerRuntime({
  mode: 'mock',
  mockSeed: 12345  // اختياري: بيانات حتمية
});
```

**الخصائص:**
- يستخدم MockPersistenceAdapter
- يولد بيانات وهمية واقعية
- تخزين في الذاكرة (لا توجد قاعدة بيانات)
- توليد مدرك لنوع الحقل (الإيميلات تبدو كإيميلات، التواريخ صالحة)
- حتمي مع seed للاختبار القابل للتكرار
- يبذر تلقائيًا عددًا مكونًا من السجلات لكل كيان

**توليد نوع الحقل:**

| نوع الحقل | البيانات المولدة |
|-----------|------------------|
| `string` | كلمات Lorem |
| `string` (name: "email") | عنوان بريد إلكتروني |
| `string` (name: "name") | الاسم الكامل |
| `number` | عدد صحيح عشوائي |
| `boolean` | قيمة عشوائية |
| `date` | تاريخ حديث |
| `enum` | قيمة عشوائية من مصفوفة `values` |

### الوضع الحقيقي (Production)

**التكوين:**
```typescript
const runtime = new OrbitalServerRuntime({
  mode: 'real',
  persistence: new FirestorePersistenceAdapter(db)
});
```

**الخصائص:**
- يستخدم تنفيذ PersistenceAdapter مخصص
- عمليات قاعدة بيانات حقيقية (Firestore، PostgreSQL، إلخ)
- عمليات CRUD غير متزامنة
- استمرارية جاهزة للإنتاج

### مقارنة الأوضاع

| الجانب | وضع المحاكاة | الوضع الحقيقي |
|--------|--------------|---------------|
| الاستمرارية | في الذاكرة | قاعدة البيانات |
| مصدر البيانات | مولد | بيانات المستخدم الحقيقية |
| الحتمية | قابل للـ seed | غير متاح |
| حالة الاستخدام | التطوير، الاختبار | الإنتاج |
| الإعداد | صفر تكوين | يحتاج محولًا |

---

## المشاركة والعزلة للكيانات

كيفية مشاركة الكيانات بين الوحدات المدارية يعتمد على نوع الاستمرارية:

### الكيانات المستمرة (مشتركة)

جميع الوحدات المدارية التي تستخدم نفس اسم الكيان تشترك في نفس المجموعة:

```
Orbital A (entity: Task) ──┐
                           ├──► Collection: "tasks"
Orbital B (entity: Task) ──┘
```

التغييرات في Orbital A مرئية لـ Orbital B.

### كيانات وقت التشغيل (معزولة)

كل وحدة مدارية تحصل على نسخها الخاصة:

```
Orbital A (entity: Enemy) ──► Memory: "OrbitalA_enemies"
Orbital B (entity: Enemy) ──► Memory: "OrbitalB_enemies"
```

أعداء Orbital A منفصلون تمامًا عن أعداء Orbital B.

### كيانات Singleton (نسخة واحدة)

نسخة واحدة مشتركة عبر الجميع:

```
Orbital A ──┐
Orbital B ──┼──► Single Player instance
Orbital C ──┘
```

جميع الوحدات المدارية ترى وتعدل نفس بيانات `Player`.

---

## ملخص

يوفر نظام الكيانات في Almadar:

1. **حقول مكتوبة** - كتابة قوية مع string، number، boolean، date، enum، relation، array، object
2. **أوضاع الاستمرارية** - Persistent (قاعدة بيانات)، runtime (ذاكرة)، singleton (عالمي)
3. **نظام الربط** - `@entity`، `@payload`، `@state`، `@now`، `@user`، `@Singleton` للوصول عبر S-expression
4. **ربط السمات** - `linkedEntity` الصريح يربط السمات بمصدر بياناتها
5. **التحقق من المترجم** - التحقق من صحة المخطط يضمن الصحة
6. **وقت تشغيل مرن** - وضع المحاكاة للتطوير، الوضع الحقيقي للإنتاج
7. **التحكم في المشاركة** - المستمرة تشترك، وقت التشغيل يعزل، singleton عالمي

الكيان هو أساس الوحدة المدارية - تعمل السمات عليه، تعرض الصفحات البيانات، ويدير وقت التشغيل دورة حياته.

---

*تم إنشاء المستند: 2026-02-02*
*بناءً على تحليل قاعدة بيانات Almadar*
