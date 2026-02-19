# التواصل بين المدارات (Cross-Orbital Communication)

> المصدر: [`tests/schemas/05-cross-orbital.orb`](../../../../tests/schemas/05-cross-orbital.orb)

المدارات مكتفية بذاتها — لكن التطبيقات الحقيقية تحتاج الميزات للتواصل مع بعضها. يربط المدار المدارات معاً من خلال حافلة أحداث مكتوبة: مدار يُصدر، وآخرون يستمعون.

---

## النمط (The Pattern)

```
CartManager orbital          NotificationManager orbital
      |                               |
  CartActions trait              NotificationHandler trait
      |                               |
  emits: ITEM_ADDED  ──────────►  listens: ITEM_ADDED
  emits: CART_CLEARED ─────────►  listens: CART_CLEARED
```

الخصائص الرئيسية:
- **`emits`** — مُعلَن على سمة (Trait) وعلى المدار (Orbital) (ما الأحداث التي يُصدرها)
- **`listens`** — مُعلَن على سمة (ما الأحداث التي تردّ عليها) وعلى المدار (ما المدارات التي تشترك بها)
- **`scope: "external"`** — يُعلّم الحدث بأنه يتجاوز حدود المدار

---

## الخطوة 1 — إعلان الإصدارات (Emits) على السمة المُصدِرة

السمة تُعلن عن الأحداث التي يمكنها نشرها، بما في ذلك عقد البيانات (Payload Contract):

```json
{
  "name": "CartActions",
  "linkedEntity": "Cart",
  "category": "interaction",
  "emits": [
    {
      "event": "ITEM_ADDED",
      "scope": "external",
      "description": "يُصدَر عند إضافة عنصر للسلة",
      "payload": [
        { "name": "itemCount", "type": "number", "required": true },
        { "name": "total", "type": "number", "required": true }
      ]
    },
    {
      "event": "CART_CLEARED",
      "scope": "external",
      "description": "يُصدَر عند مسح السلة",
      "payload": [
        { "name": "timestamp", "type": "number", "required": true }
      ]
    }
  ],
  "stateMachine": { "..." : "..." }
}
```

`scope: "external"` مطلوب للأحداث بين المدارات. بدونه يبقى الحدث داخلياً للسمة.

---

## الخطوة 2 — إطلاق الحدث في انتقال

داخل `effects` لانتقال ما، استخدم `["emit", "EVENT_NAME", payload]`:

```json
{
  "from": "empty",
  "event": "ADD_ITEM",
  "to": "hasItems",
  "effects": [
    ["increment", "@entity.itemCount", 1],
    ["set", "@entity.total", ["+", "@entity.total", "@payload.price"]],
    ["emit", "ITEM_ADDED", {
      "itemCount": "@entity.itemCount",
      "total": "@entity.total"
    }]
  ]
}
```

البيانات (Payload) كائن JSON حيث يمكن أن تكون القيم ارتباطات (`@entity.*`) أو قيماً ثابتة.

---

## الخطوة 3 — إعلان الإصدارات على مستوى المدار

على مستوى المدار، اذكر كل حدث يُصدره المدار:

```json
{
  "name": "CartManager",
  "entity": { "...": "..." },
  "traits": [ { "...": "..." } ],
  "pages": [ { "...": "..." } ],
  "emits": ["ITEM_ADDED", "CART_CLEARED"]
}
```

---

## الخطوة 4 — إعلان الاستماع (Listens) على السمة المستقبِلة

السمة المستقبِلة تُعلن عن الأحداث الخارجية التي تتعامل معها:

```json
{
  "name": "NotificationHandler",
  "linkedEntity": "Notification",
  "category": "interaction",
  "listens": [
    { "event": "ITEM_ADDED", "scope": "external" },
    { "event": "CART_CLEARED", "scope": "external" }
  ],
  "stateMachine": { "..." : "..." }
}
```

هذه الأحداث تصبح مفاتيح أحداث صالحة في آلة الحالة — أضفها إلى `events` واكتب انتقالات لها:

```json
"events": [
  { "key": "INIT", "name": "تهيئة" },
  { "key": "ITEM_ADDED", "name": "تمت إضافة عنصر" },
  { "key": "CART_CLEARED", "name": "تم مسح السلة" }
],
"transitions": [
  {
    "from": "idle",
    "event": "ITEM_ADDED",
    "to": "notified",
    "effects": [
      ["increment", "@entity.count", 1],
      ["set", "@entity.message", "تمت إضافة عنصر للسلة"]
    ]
  },
  {
    "from": "notified",
    "event": "CART_CLEARED",
    "to": "idle",
    "effects": [
      ["set", "@entity.message", "تم مسح السلة"],
      ["set", "@entity.count", 0]
    ]
  }
]
```

---

## الخطوة 5 — إعلان الاستماع على مستوى المدار

على مستوى المدار المستقبِل، أعلن من أي مدار تأتي الأحداث:

```json
{
  "name": "NotificationManager",
  "entity": { "...": "..." },
  "traits": [ { "...": "..." } ],
  "pages": [ { "...": "..." } ],
  "listens": [
    { "event": "ITEM_ADDED", "from": "CartManager" },
    { "event": "CART_CLEARED", "from": "CartManager" }
  ]
}
```

---

## المخطط الكامل (The Complete Schema)

```json
{
  "name": "cross-orbital-test",
  "version": "1.0.0",
  "orbitals": [
    {
      "name": "CartManager",
      "entity": {
        "name": "Cart",
        "persistence": "runtime",
        "fields": [
          { "name": "id", "type": "string", "required": true },
          { "name": "itemCount", "type": "number", "default": 0 },
          { "name": "total", "type": "number", "default": 0 }
        ]
      },
      "traits": [
        {
          "name": "CartActions",
          "linkedEntity": "Cart",
          "category": "interaction",
          "emits": [
            {
              "event": "ITEM_ADDED",
              "scope": "external",
              "payload": [
                { "name": "itemCount", "type": "number", "required": true },
                { "name": "total", "type": "number", "required": true }
              ]
            },
            {
              "event": "CART_CLEARED",
              "scope": "external",
              "payload": [
                { "name": "timestamp", "type": "number", "required": true }
              ]
            }
          ],
          "stateMachine": {
            "states": [
              { "name": "empty", "isInitial": true },
              { "name": "hasItems" }
            ],
            "events": [
              { "key": "INIT", "name": "تهيئة" },
              { "key": "ADD_ITEM", "name": "إضافة عنصر", "payload": [
                { "name": "price", "type": "number", "required": true }
              ]},
              { "key": "CLEAR", "name": "مسح السلة" }
            ],
            "transitions": [
              {
                "from": "empty", "event": "INIT", "to": "empty",
                "effects": [
                  ["render-ui", "main", {
                    "type": "stats",
                    "title": "سلة التسوق",
                    "value": "@entity.itemCount",
                    "subtitle": "الإجمالي: @entity.total",
                    "actions": [{ "event": "ADD_ITEM", "label": "إضافة عنصر" }]
                  }]
                ]
              },
              {
                "from": "empty", "event": "ADD_ITEM", "to": "hasItems",
                "effects": [
                  ["increment", "@entity.itemCount", 1],
                  ["set", "@entity.total", ["+", "@entity.total", "@payload.price"]],
                  ["emit", "ITEM_ADDED", { "itemCount": "@entity.itemCount", "total": "@entity.total" }]
                ]
              },
              {
                "from": "hasItems", "event": "ADD_ITEM", "to": "hasItems",
                "effects": [
                  ["increment", "@entity.itemCount", 1],
                  ["set", "@entity.total", ["+", "@entity.total", "@payload.price"]],
                  ["emit", "ITEM_ADDED", { "itemCount": "@entity.itemCount", "total": "@entity.total" }]
                ]
              },
              {
                "from": "hasItems", "event": "CLEAR", "to": "empty",
                "effects": [
                  ["set", "@entity.itemCount", 0],
                  ["set", "@entity.total", 0],
                  ["emit", "CART_CLEARED", { "timestamp": "@now" }]
                ]
              }
            ]
          }
        }
      ],
      "pages": [
        {
          "name": "CartPage",
          "path": "/cart",
          "traits": [{ "ref": "CartActions", "linkedEntity": "Cart" }]
        }
      ],
      "emits": ["ITEM_ADDED", "CART_CLEARED"]
    },
    {
      "name": "NotificationManager",
      "entity": {
        "name": "Notification",
        "persistence": "runtime",
        "fields": [
          { "name": "id", "type": "string", "required": true },
          { "name": "message", "type": "string" },
          { "name": "count", "type": "number", "default": 0 }
        ]
      },
      "traits": [
        {
          "name": "NotificationHandler",
          "linkedEntity": "Notification",
          "category": "interaction",
          "listens": [
            { "event": "ITEM_ADDED", "scope": "external" },
            { "event": "CART_CLEARED", "scope": "external" }
          ],
          "stateMachine": {
            "states": [
              { "name": "idle", "isInitial": true },
              { "name": "notified" }
            ],
            "events": [
              { "key": "INIT", "name": "تهيئة" },
              { "key": "ITEM_ADDED", "name": "تمت إضافة عنصر" },
              { "key": "CART_CLEARED", "name": "تم مسح السلة" }
            ],
            "transitions": [
              {
                "from": "idle", "event": "INIT", "to": "idle",
                "effects": [
                  ["render-ui", "main", {
                    "type": "stats",
                    "title": "الإشعارات",
                    "value": "@entity.count",
                    "subtitle": "@entity.message"
                  }]
                ]
              },
              {
                "from": "idle", "event": "ITEM_ADDED", "to": "notified",
                "effects": [
                  ["increment", "@entity.count", 1],
                  ["set", "@entity.message", "تمت إضافة عنصر للسلة"]
                ]
              },
              {
                "from": "notified", "event": "ITEM_ADDED", "to": "notified",
                "effects": [["increment", "@entity.count", 1]]
              },
              {
                "from": "notified", "event": "CART_CLEARED", "to": "idle",
                "effects": [
                  ["set", "@entity.message", "تم مسح السلة"],
                  ["set", "@entity.count", 0]
                ]
              }
            ]
          }
        }
      ],
      "pages": [
        {
          "name": "NotificationsPage",
          "path": "/notifications",
          "traits": [{ "ref": "NotificationHandler", "linkedEntity": "Notification" }]
        }
      ],
      "listens": [
        { "event": "ITEM_ADDED", "from": "CartManager" },
        { "event": "CART_CLEARED", "from": "CartManager" }
      ]
    }
  ]
}
```

---

## قائمة التحقق: الأحداث بين المدارات (Cross-Orbital Events Checklist)

استخدم هذه القائمة عند ربط مدارين معاً:

- [ ] **السمة المُصدِرة** لديها `"emits": [...]` مع `scope: "external"` وعقد `payload`
- [ ] **الانتقال المُصدِر** يستدعي `["emit", "EVENT_NAME", {...payload}]` في `effects`
- [ ] **المدار المُصدِر** لديه `"emits": ["EVENT_NAME"]` على المستوى الأعلى
- [ ] **السمة المستمعة** لديها `"listens": [{ "event": "EVENT_NAME", "scope": "external" }]`
- [ ] **آلة حالة السمة المستمعة** لديها الحدث في `events` وانتقال له
- [ ] **المدار المستمع** لديه `"listens": [{ "event": "EVENT_NAME", "from": "EmittingOrbital" }]` على المستوى الأعلى

---

## الخطوات التالية

- [بناء تطبيق كامل (Full App)](../advanced/full-app) — الأحداث بين المدارات في تطبيق ثلاثي المدارات
- [الحراس وقواعد الأعمال (Guards)](./guards) — احرس انتقالاً بناءً على بيانات من مدار آخر
