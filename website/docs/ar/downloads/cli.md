# تحميل مجمع Orbital

مجمع Orbital هو بوابتك المحلية لبناء التطبيقات من برامج `.orb`. حمّل الملف التنفيذي المترجم لمنصتك.

## التحميل حسب المنصة

أحدث إصدار: [GitHub Releases](https://github.com/almadar-io/almadar/releases)

### macOS

```bash
# Apple Silicon (ARM64)
curl -fsSL https://github.com/almadar-io/almadar/releases/latest/download/orbital-Darwin-aarch64 -o /usr/local/bin/orbital
chmod +x /usr/local/bin/orbital

# Intel (x86_64)
curl -fsSL https://github.com/almadar-io/almadar/releases/latest/download/orbital-Darwin-x86_64 -o /usr/local/bin/orbital
chmod +x /usr/local/bin/orbital
```

### Linux

```bash
# x86_64
curl -fsSL https://github.com/almadar-io/almadar/releases/latest/download/orbital-Linux-x86_64 -o /usr/local/bin/orbital
chmod +x /usr/local/bin/orbital

# ARM64
curl -fsSL https://github.com/almadar-io/almadar/releases/latest/download/orbital-Linux-aarch64 -o /usr/local/bin/orbital
chmod +x /usr/local/bin/orbital
```

### Windows

حمّل من [GitHub Releases](https://github.com/almadar-io/almadar/releases):
- `orbital-Windows-x86_64.exe`

أو من سطر الأوامر:
```powershell
curl -fsSL "https://github.com/almadar-io/almadar/releases/latest/download/orbital-Windows-x86_64.exe" -o "%LOCALAPPDATA%\Programs\orbital.exe"
```

## التحقق من التثبيت

```bash
orbital --version
orbital --help
```

## الأوامر الأساسية

### `orbital validate`

التحقق من صحة ملف `.orb`:

```bash
orbital validate my-app.orb
orbital validate my-app.orb --simulate       # تتبع جميع الحالات المتاحة
orbital validate my-app.orb --json           # مخرجات JSON للـ CI
```

### `orbital compile`

توليد أكواد جاهزة للإنتاج:

```bash
orbital compile my-app.orb -o ./output                        # TypeScript (الافتراضي)
orbital compile my-app.orb -s python -o ./output              # Python + FastAPI
orbital compile my-app.orb -s mobile -o ./output              # React Native
orbital compile my-app.orb --shell typescript --server hono   # استخدام Hono
```

### `orbital serve`

التصريف والخدمة بدون تبعيات (يستخدم Hono + Bun المجمع):

```bash
orbital serve my-app.orb                # http://localhost:3030
orbital serve my-app.orb -p 8000        # منفذ مخصص
orbital serve my-app.orb --open         # فتح المتصفح تلقائياً
```

### `orbital test`

تشغيل اختبارات آلة الحالة الشاملة:

```bash
orbital test my-app.orb
```

### `orbital format`

تنسيق وتطبيع ملفات `.orb`:

```bash
orbital format my-app.orb
orbital format my-app.orb > my-app.orb  # الكتابة فوق الملف الأصلي
```

### `orbital parse`

عرض بنية المخطط:

```bash
orbital parse my-app.orb
```

### `orbital new`

إنشاء مشروع جديد:

```bash
orbital new my-app
```

### `orbital convert`

تحويل مشروع موجود إلى `.orb`:

```bash
orbital convert ./my-react-project
```

## نمط الوكيل التفاعلي

تشغيل وكيل الذكاء الاصطناعي باللغة الطبيعية:

```bash
orbital "بناء تطبيق قائمة المهام مع الفئات"
orbital --resume                    # استئناف الجلسة
orbital --last                      # أحدث جلسة
```

## الخيارات العامة

```bash
--provider <NAME>                   # مزود LLM (claude, gpt-4, إلخ)
--autonomy <LEVEL>                  # سلوك الوكيل: full, balanced, cautious
--budget <USD>                      # حد التكلفة لتشغيل الوكيل
--resume [ID]                       # استئناف جلسة سابقة
--last                              # استئناف أحدث جلسة
```

## البدء السريع

```bash
# الإنشاء والتشغيل
orbital new my-app
cd my-app
orbital serve my-app.orb --open

# أو التصريف والنشر
orbital compile my-app.orb -o ./output
cd output && npm install && npm run build
```

## استكشاف الأخطاء

### "الأمر غير موجود"

أضف إلى PATH:
```bash
export PATH="$PATH:/usr/local/bin"
```

### رفض الصلاحيات (macOS/Linux)

```bash
chmod +x /usr/local/bin/orbital
```

---

*هل لديك أسئلة؟ افتح [مشكلة](https://github.com/almadar-io/almadar/issues) أو اقرأ [التوثيق](/).*
