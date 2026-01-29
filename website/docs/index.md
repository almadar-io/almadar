# Almadar

> **The Physics of Software**: Declare your application, compile to production

Welcome to the Almadar programming language - a declarative approach to building full-stack applications through state machines, entities, and traits.

## What is Almadar?

Almadar is a **declarative language** that transforms how software is built. Instead of writing imperative code scattered across client and server, you declare applications as compositions of:

- **Entities** - Your data structures
- **Traits** - Behavior as state machines
- **Pages** - UI bindings

The compiler generates a complete, production-ready application.

```
Your Vision → OrbitalSchema (.orb) → Full-Stack Application
```

## Why Almadar?

| Traditional Development | Almadar Approach |
|------------------------|------------------|
| Months of development | Weeks to production |
| Scattered business logic | Centralized state machines |
| Manual API/UI coupling | Unified schema |
| Documentation as afterthought | Schema IS documentation |
| Testing is complex | State machines are inherently testable |

## Quick Example

```json
{
  "name": "TaskManager",
  "orbitals": [{
    "name": "Tasks",
    "entity": {
      "name": "Task",
      "fields": [
        { "name": "title", "type": "string" },
        { "name": "status", "type": "enum", "values": ["pending", "done"] }
      ]
    },
    "traits": [{
      "name": "TaskLifecycle",
      "stateMachine": {
        "states": [
          { "name": "Pending", "isInitial": true },
          { "name": "Done" }
        ],
        "events": [{ "key": "COMPLETE", "name": "Complete Task" }],
        "transitions": [{
          "from": "Pending",
          "to": "Done",
          "event": "COMPLETE",
          "effects": [
            ["persist", "update", "Task", "@entity"],
            ["notify", "success", "Task completed!"]
          ]
        }]
      }
    }]
  }]
}
```

## Get Started

<div class="grid cards">

- :material-rocket-launch: **[Quick Start](en/getting-started/introduction.md)**
  
  Build your first Almadar application in 10 minutes

- :material-book-open-variant: **[Language Guide](en/language/specification.md)**
  
  Deep dive into entities, traits, and S-expressions

- :material-download: **[Download CLI](en/downloads/cli.md)**
  
  Get the Almadar compiler for your platform

- :fontawesome-brands-discord: **[Join Community](en/community/contributing.md)**
  
  Connect with other Almadar developers

</div>

## Language Selector

- [English Documentation](en/index.md)
- [التوثيق بالعربية](ar/index.md)

---

## Enterprise Services

Looking for a development partner? **Almadar** is both the creator of Almadar and a full-service software agency.

- [Almadar Enterprise](en/enterprise/index.md) — Custom development, training, consulting
- [المدار للأعمال](ar/enterprise/index.md) — التطوير المخصص، التدريب، الاستشارات

---

*Built with passion by [Almadar](https://almadar.io)*
