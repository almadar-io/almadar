---
id: cli
title: واجهة سطر أوامر المدار
sidebar_label: CLI
---

# واجهة سطر أوامر المدار

واجهة سطر الأوامر (CLI) هي بوابتك إلى نظام المدار البيئي.

## التثبيت

### macOS / Linux

```bash
curl -fsSL https://almadar.io/install.sh | sh
```

### Windows

```powershell
irm https://almadar.io/install.ps1 | iex
```

### npm

```bash
npm install -g @almadar/cli
```

## الأوامر

| الأمر | الوصف |
|-------|-------|
| `almadar new` | إنشاء مشروع جديد |
| `almadar validate` | التحقق من المخطط |
| `almadar compile` | الترجمة للهدف |
| `almadar dev` | بدء خادم التطوير |
| `almadar test` | تشغيل الاختبارات |

## البدء السريع

```bash
# إنشاء مشروع جديد
almadar new my-app

# الانتقال للمشروع
cd my-app

# بدء التطوير
almadar dev
```
