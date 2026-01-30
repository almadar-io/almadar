---
slug: welcome-to-almadar
title: Welcome to Almadar
authors: [almadar]
tags: [announcement]
---

We're excited to introduce **Almadar** - The Physics of Software.

Almadar is a declarative framework for building full-stack applications through state machines. Define your entities, behaviors, and UI as schemas that compile to production-ready code.

<!-- truncate -->

## What is Almadar?

Almadar (Arabic for "The Orbit") brings a new paradigm to software development:

- **Declarative Schemas**: Define your entire application structure in one place
- **State Machines**: Model behavior as predictable, testable state machines
- **Full-Stack Generation**: Compile to React frontend, Express/FastAPI backend, and database models

## The Almadar Model

Just as electrons orbit nuclei following quantum rules, your application components follow state machine rules. Each **Almadar** is an entity with attached **traits** that define its behavior, UI, and integrations.

```json
{
  "orbitals": [{
    "name": "TaskManager",
    "entity": {
      "name": "Task",
      "fields": [
        { "name": "title", "type": "string" },
        { "name": "status", "type": "enum", "options": ["todo", "done"] }
      ]
    },
    "traits": [
      { "ref": "Listable" },
      { "ref": "Editable" }
    ]
  }]
}
```

## Getting Started

Ready to try Almadar? Check out our [documentation](/docs) to get started, or [download the CLI](/docs/downloads/cli) to create your first project.

Stay tuned for more updates, tutorials, and deep dives into the Almadar architecture!
