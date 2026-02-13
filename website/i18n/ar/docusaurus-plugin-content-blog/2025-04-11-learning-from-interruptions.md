---
slug: learning-from-interruptions
title: "التعلم من المقاطعات: كيف يتذكر ذكاؤنا الاصطناعي تفضيلاتك (بدون أن يكون مخيفاً)"
authors: [osamah]
tags: [architecture, ai]
---

في كل مرة توافق أو ترفض إجراء الذكاء الاصطناعي، فإنه يتعلم. بعد 5 موافقات، يتم تنفيذ ذلك الإجراء تلقائياً.

<!-- truncate -->

## مشكلة الإنسان في الحلقة

يحتاج وكلاء الذكاء الاصطناعي إلى إشراف. قد يقومون بـ:
- تنفيذ أمر خاطئ
- اقتراح عمليات غير آمنة
- إجراء استدعاءات API مكلفة
- الوصول إلى بيانات حساسة

لذلك نضيف مقاطعات:
```
الذكاء الاصطناعي: "أريد تنفيذ: rm -rf /data/old-logs"
[موافقة] [رفض] [تعديل]
```

لكن هذا يخلق احتكاكاً. كل إجراء يحتاج موافقة. يبدو الذكاء الاصطناعي بطيئاً.

**الحل؟** التعلم من المقاطعات.

## كيف تعمل ذاكرة المقاطعة

### الخطوة 1: تسجيل القرار

عندما توافق أو ترفض:

```typescript
await sessionManager.recordInterruptDecision(
  sessionId,
  userId,
  {
    toolName: 'execute',
    toolArgs: { command: 'rm -rf /data/old-logs' },
    decision: 'approved',
    reason: 'Safe cleanup of old logs',
  }
);
```

ينشئ هذا **سجل مقاطعة**:

```typescript
interface InterruptRecord {
  interruptId: string;
  sessionId: string;
  userId: string;
  toolName: string;
  toolArgs: Record<string, unknown>;
  decision: 'approved' | 'rejected' | 'modified';
  modifiedArgs?: Record<string, unknown>;
  reason?: string;
  timestamp: Date;
}
```

### الخطوة 2: تحديث تفضيلات الأداة

يحدث كل قرار **تفضيل موافقة الأداة**:

```typescript
interface ToolApprovalPreference {
  userId: string;
  toolName: string;
  autoApprove: boolean;
  confidence: number;
  approvedCount: number;
  rejectedCount: number;
  lastDecisionAt: Date;
}
```

خوارزمية التعلم:

```typescript
// بعد كل قرار
const approvedCount = previous.approvedCount + (decision === 'approved' ? 1 : 0);
const rejectedCount = previous.rejectedCount + (decision === 'rejected' ? 1 : 0);
const total = approvedCount + rejectedCount;
const approvalRate = approvedCount / total;

// تتم الموافقة التلقائية إذا:
// - 5 قرارات على الأقل (حد أدنى لحجم العينة)
// - معدل الموافقة > 80%
const autoApprove = total >= 5 && approvalRate > 0.8;

// الثقة تنمو مع المزيد من البيانات
const confidence = Math.min(0.95, total * 0.1);
```

### الخطوة 3: الموافقة التلقائية على الإجراءات المستقبلية

في المرة القادمة التي يريد الذكاء الاصطناعي استخدام تلك الأداة:

```typescript
const shouldAutoApprove = await sessionManager.shouldAutoApproveTool(
  userId,
  'execute'
);

if (shouldAutoApprove) {
  // التنفيذ بدون مقاطعة
} else {
  // عرض حوار الموافقة
}
```

## مثال واقعي

**الأسبوع 1: مستخدم جديد، كل شيء يُقاطَع**

| الإجراء | القرار | العدد |
|---------|--------|-------|
| تنفيذ `ls` | موافقة | 1/0 |
| تنفيذ `cat file.txt` | موافقة | 2/0 |
| تنفيذ `rm temp.txt` | موافقة | 3/0 |
| تنفيذ `git status` | موافقة | 4/0 |
| تنفيذ `git commit` | موافقة | 5/0 |

**الأسبوع 2: يظهر pattern (نمط تكراري)**

| الإجراء | القرار | الإحصائيات |
|---------|--------|------------|
| تنفيذ `ls` | موافقة تلقائية | 6/0 (100%) |
| تنفيذ `cat` | موافقة تلقائية | 4/0 (100%) |
| تنفيذ `rm` | مقاطعة | 3/2 (60%) |
| تنفيذ `npm publish` | مقاطعة | 1/3 (25%) |

**النتيجة:**
- تنفذ الأوامر الآمنة والشائعة فوراً
- العمليات المدمرة لا تزال تحتاج موافقة
- الإجراءات عالية المخاطر تُقاطَع دائماً

## الخصوصية والتحكم

### تحكم المستخدم

يمكن للمستخدمين:
- عرض جميع القرارات المسجلة
- حذف سجل المقاطعات
- تعطيل الموافقة التلقائية عالمياً
- طلب الموافقة لأدوات محددة

```typescript
// تعطيل الموافقة التلقائية للأدوات الخطرة
await memoryManager.updateToolPreference(userId, 'execute', {
  autoApprove: false,  // السؤال دائماً عن أوامر الصدفة
});
```

### ما نخزنه

**نخزن:**
- أسماء الأدوات (execute, persist, call-service)
- القرار (موافقة/رفض)
- الطابع الزمني
- patterns مجهولة الهوية

**لا نخزن:**
- قيم المعاملات الحساسة
- محتويات الملفات
- استجابات API
- كلمات المرور أو الأسرار

### الشفافية

كل إجراء يُوافَق عليه تلقائياً يُسجَّل:

```
[2025-04-11 10:23:45] Auto-approved: execute
  Reason: 95% approval rate over 20 decisions
  User: user_123
  Session: sess_456
```

## منحنى التعلم

الأدوات المختلفة تتعلم بسرعات مختلفة:

| الأداة | سرعة التعلم | لماذا |
|--------|-------------|-------|
| `read_file` | سريعة | مخاطر منخفضة، متسقة |
| `write_file` | متوسطة | مخاطر متوسطة |
| `execute` | بطيئة | مخاطر عالية، تعتمد على السياق |
| `call_service` | أبداً | تحتاج دائماً موافقة |

### عتبات الثقة

```typescript
const THRESHOLDS = {
  read_file: { minDecisions: 3, minRate: 0.9 },
  write_file: { minDecisions: 5, minRate: 0.85 },
  execute: { minDecisions: 10, minRate: 0.9 },
  call_service: { minDecisions: Infinity, minRate: 1.0 }, // لا موافقة تلقائية أبداً
};
```

## مثال كود: التدفق الكامل

```typescript
// داخلي: نظام تعلم المقاطعات في المدار
// (هكذا يعمل من الداخل — ليس واجهة برمجية عامة)

const memoryManager = createMemoryManager(db);
const sessionManager = createSessionManager({
  memoryManager,
});

// الوكيل يُنشأ مع تفعيل تعلم المقاطعات
const agent = createAgent({
  skill: 'kflow-orbitals',
  workDir: '/workspace',
  userId: 'user_123',
  // إعدادات المقاطعة بناءً على التفضيلات المُتعلَّمة
  noInterrupt: false,
});

// تشغيل الوكيل
const result = await agent.run({
  input: 'Create a User entity',
});

// أثناء التنفيذ، اتخذ المستخدم هذه القرارات:
// - موافقة: execute 'ls'
// - موافقة: execute 'orbital validate'
// - موافقة: execute 'git status'
// - رفض: execute 'rm -rf /'
// - موافقة: execute 'orbital compile'

// تسجيل جميع المقاطعات
for (const interrupt of result.interrupts) {
  await sessionManager.recordInterruptDecision(
    threadId,
    'user_123',
    {
      toolName: interrupt.toolName,
      toolArgs: interrupt.toolArgs,
      decision: interrupt.decision,
      reason: interrupt.reason,
    }
  );
}

// التحقق مما تعلمناه
const preferences = await memoryManager.getUserToolPreferences('user_123');
for (const pref of preferences) {
  console.log(`${pref.toolName}: ${pref.approvedCount}/${pref.rejectedCount} ` +
              `(${Math.round(pref.approvedCount/(pref.approvedCount+pref.rejectedCount)*100)}%) ` +
              `- Auto: ${pref.autoApprove}`);
}

// الإخراج:
// execute: 4/1 (80%) - Auto: false (need 5+ at 80%)
// validate: 1/0 (100%) - Auto: false (need 3+ at 90%)
// compile: 1/0 (100%) - Auto: false
```

## تشبيه واقعي: مساعد المنزل الذكي

فكر فيها كمنزل ذكي:

**الأسبوع 1:**
- أنت: "أطفئ الأضواء"
- المساعد: "هل أطفئ جميع الأضواء؟" [نعم] [لا]
- أنت: [نعم]

**الأسبوع 2:**
- أنت: "أطفئ الأضواء"
- المساعد: *يطفئ الأضواء* (تعلّم أنك تقول نعم دائماً)

**لكن:**
- أنت: "افتح قفل الباب الأمامي"
- المساعد: "تأكيد فتح القفل؟" [نعم] [لا]
- يسأل دائماً لأن الأمان > الراحة

يتعلم المساعد الـ patterns لكنه يحترم الحدود.

## الفوائد

### للمستخدمين
- احتكاك أقل مع مرور الوقت
- لا يزالون في السيطرة
- تعلم شفاف
- يحترم الخصوصية

### لوكلاء الذكاء الاصطناعي
- تنفيذ أسرع
- تجربة مستخدم أفضل
- فهم سياقي
- إعدادات افتراضية أكثر أماناً

### للفرق
- patterns متسقة عبر المستخدمين
- سجل تدقيق للقرارات
- تحديد استخدام الأدوات الخطرة

## الخلاصة

لا يجب أن تكون المقاطعات مزعجة. يمكن أن تكون **فرص تعلم**.

تعلم كل موافقة الذكاء الاصطناعي:
- ما تعتبره آمناً
- سير العمل المفضل لديك
- أي الإجراءات تحتاج تدقيقاً

مع مرور الوقت، يصبح الذكاء الاصطناعي امتداداً لنيتك — سريع عندما يجب أن يكون سريعاً، وحذر عندما يجب أن يكون حذراً.

هذا ليس مجرد أتمتة. هذا **تعاون**.

تعلم المزيد عن [الذاكرة المدارية](./ai-orbital-memory).
