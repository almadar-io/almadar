# Almadar

> **فيزياء البرمجيات** - The Physics of Software

Almadar (المدار) is a declarative programming language for building full-stack applications using entities, traits, and state machines.

## Core Architecture

Almadar applications are defined by an **OrbitalSchema**. This is the root definition that contains one or more **Orbital Units** in the `orbitals` array.

### 1. The Orbital Unit
The Orbital is the atomic unit of composition. It is defined within the `orbitals` list and encapsulates an Entity, its Traits, and its Pages.

```json
{
  "name": "TaskApp",
  "version": "1.0.0",
  "description": "A productivity application",
  "orbitals": [
    {
      "name": "TaskManager",
      "uses": [
        { "from": "std/behaviors/crud", "as": "Crud" }
      ],
      "emits": ["TASK_COMPLETED"],
      "domainContext": {
        "category": "productivity"
      },
      "entity": { ... }, 
      "traits": [ ... ],
      "pages": [ ... ]
    }
  ]
}
```
#### 2. Entities (The Matter)
Entities define the shape of your data structure. They are defined inside the orbital under the entity key.
```json
"entity": {
  "name": "Task",
  "persistence": "persistent",
  "collection": "tasks",
  "fields": [
    { "name": "id", "type": "string", "required": true },
    { "name": "title", "type": "string", "required": true },
    { "name": "priority", "type": "enum", "values": ["low", "high"] },
    { "name": "assignee", "type": "relation", "relation": { "target": "User", "cardinality": "one" } },
    { "name": "completedAt", "type": "timestamp" }
  ]
}
```
#### 3. Traits (The Energy)
Traits are State Machines that define behavior. They are listed in the traits array of the orbital.
```json
"traits": [
  {
    "name": "TaskWorkflow",
    "linkedEntity": "Task",
    "stateMachine": {
      "states": [
        { "name": "todo", "isInitial": true },
        { "name": "done", "isTerminal": true }
      ],
      "events": [
        { "key": "COMPLETE", "name": "Complete Task" }
      ],
      "transitions": [
        {
          "from": "todo",
          "event": "COMPLETE",
          "to": "done",
          "guard": ["!=", "@entity.assignee", null],
          "effects": [
            ["update_field", "completedAt", ["@now"]],
            ["emit", "TASK_COMPLETED", { "id": "@entity.id" }],
            ["render-ui", "main", { "type": "success-confetti" }]
          ]
        }
      ]
    }
  }
]
```
#### 5. Pages (The Container)
Pages define the routing and bind Traits to UI slots. They are listed in the pages array of the orbital.
```json
"pages": [
  {
    "name": "TaskDashboard",
    "path": "/tasks/:id",
    "traits": [
      { "ref": "TaskWorkflow", "linkedEntity": "Task" },
      { 
        "ref": "Crud.traits.Editor", 
        "config": { "slot": "main", "readonly": false } 
      }
    ]
  }
]
```

## Quick Start

```bash
# Install CLI
npm install -g @almadar/cli

# Create a new project
almadar new my-app
cd my-app

# Start development server
almadar dev
```

## Documentation

- [Getting Started](https://almadar.io/docs/en/getting-started/introduction)
- [Language Reference](https://almadar.io/docs/en/language/specification)
- [API Reference](https://almadar.io/docs/en/reference/cli)

## Packages

| Package | Description |
|---------|-------------|
| [`std/`](./std) | Standard library (math, string, array operators) |
| [`patterns/`](./patterns) | UI pattern definitions |
| [`examples/`](./examples) | Example schemas |
| [`website/`](./website) | Documentation website |
| [`extensions/`](./extensions) | Editor extensions (VSCode, Zed) |

## Community

- [Discord](https://discord.gg/almadar)
- [Twitter](https://twitter.com/AlmadarLang)
- [GitHub Discussions](https://github.com/almadar-io/almadar/discussions)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

BSL 1.1 (Business Source License) - See [LICENSE](./LICENSE)

- Source code: BSL 1.1 (converts to Apache 2.0 on 2030-02-01)
- Documentation: CC BY 4.0
- Non-production use: Free
- Production use: Requires license (contact licensing@almadar.io)

---

Built with ❤️ by [Almadar](https://almadar.io)
