---
slug: ikea-effect-software
title: "The IKEA Effect for Software: Why We Built Apps from Flat-Packs"
authors: [osamah]
tags: [architecture, philosophy]
---

IKEA revolutionized furniture by making it composable, flat-packed, and assembly-friendly. What if software worked the same way?

<!-- truncate -->

<OrbitalDiagram />

![The IKEA Effect in Software: Why We Love What We Build (And Why That's Dangerous)](/img/blog/ikea-effect-software.png)

We overvalue code we write ourselves. Almadar's component architecture forces us to assemble, not invent.

## The Furniture Problem

Before IKEA, furniture was either:
- **Custom-made**: Expensive, slow, perfectly fitted
- **Pre-assembled**: Bulky, expensive to ship, limited styles

IKEA found a third way: **flat-pack modular components** that customers assemble themselves. This approach:
- Reduced shipping costs by 80%
- Enabled massive variety from standard parts
- Let customers customize configurations
- Made high-quality design accessible

## The Software Parallel

Traditional software development faces the same dilemma:
- **Custom-built**: Perfect fit, expensive, slow
- **SaaS platforms**: Limited customization, vendor lock-in
- **Low-code tools**: Quick start, hit walls when scaling

Almadar introduces a third way: **Orbital units** — composable, declarative, self-contained feature modules.

## What Is an Orbital?

An Orbital is a flat-pack software module containing:

```json
{
  "name": "TaskManagement",
  "entity": {
    "name": "Task",
    "fields": [
      { "name": "title", "type": "string" },
      { "name": "status", "type": "enum", "values": ["todo", "done"] }
    ]
  },
  "traits": [
    {
      "name": "TaskBrowser",
      "stateMachine": {
        "states": [{ "name": "Browsing", "isInitial": true }],
        "transitions": [
          {
            "from": "Browsing",
            "to": "Browsing",
            "event": "INIT",
            "effects": [
              ["render-ui", "main", { "type": "entity-table", "entity": "Task" }]
            ]
          }
        ]
      }
    }
  ],
  "pages": [
    { "name": "TaskListPage", "path": "/tasks", "traits": [{ "ref": "TaskBrowser" }] }
  ]
}
```

Just like an IKEA bookshelf comes with panels, screws, and instructions, an Orbital comes with:
- **Entity** (the structure/panels)
- **Traits** (the connectors/instructions)
- **Pages** (the placement guide)

## The Uses System: Standardized Connectors

IKEA's genius was the cam lock — a connector that works across all their furniture. Almadar has `uses`:

```json
{
  "uses": [
    { "from": "std/behaviors/crud", "as": "CRUD" }
  ],
  "traits": [
    { "ref": "CRUD.traits.CRUDManagement", "linkedEntity": "Task" }
  ]
}
```

This imports pre-built CRUD behavior, just like buying a pre-made drawer unit instead of cutting wood.

## Why Composition Wins

| Custom Code | Traditional Framework | Almadar Orbitals |
|-------------|----------------------|------------------|
| Perfect fit | Convention over config | Best of both |
| Slow to build | Fast start, walls later | Fast + scalable |
| Hard to change | Limited customization | Recomposable |
| Team dependency | Framework dependency | Standard parts |

## Real-World Example: E-Commerce Platform

Building an e-commerce platform traditionally means:
1. Design database schema (2 weeks)
2. Build auth system (2 weeks)
3. Build product catalog (3 weeks)
4. Build cart/checkout (4 weeks)
5. Build admin panel (3 weeks)

**Total: 14 weeks**

With Almadar Orbitals:
```json
{
  "orbitals": [
    { "uses": [{ "from": "std/behaviors/auth", "as": "Auth" }] },
    { "uses": [{ "from": "std/behaviors/crud", "as": "Products" }] },
    { "uses": [{ "from": "std/behaviors/cart", "as": "Cart" }] },
    { "uses": [{ "from": "std/behaviors/checkout", "as": "Checkout" }] }
  ]
}
```

**Configuration + customization: 2 weeks**

The 80% that's the same across all e-commerce sites comes from standard behaviors. The 20% that's unique to your business gets custom traits.

## The Ecosystem Effect

IKEA's real power isn't individual pieces — it's the ecosystem. You can:
- Combine BILLY with OXBERG for different looks
- Add lighting from the same collection
- Everything fits together

Almadar's standard library (`std/behaviors/`) creates the same ecosystem:
- `std/behaviors/crud` — Create, read, update, delete
- `std/behaviors/list` — List browsing with filtering
- `std/behaviors/detail` — Entity detail views
- `std/behaviors/wizard` — Multi-step flows

Each behavior works with any entity, just like IKEA's drawer units fit any desk.

## Try It Yourself

Create a file called `task-app.orb`:

```json
{
  "name": "TaskApp",
  "version": "1.0.0",
  "orbitals": [
    {
      "name": "TaskManagement",
      "uses": [{ "from": "std/behaviors/crud", "as": "CRUD" }],
      "entity": {
        "name": "Task",
        "fields": [
          { "name": "title", "type": "string", "required": true },
          { "name": "status", "type": "enum", "values": ["todo", "in-progress", "done"] }
        ]
      },
      "traits": [{ "ref": "CRUD.traits.CRUDManagement" }],
      "pages": [{ "name": "TasksPage", "path": "/tasks" }]
    }
  ]
}
```

Then compile:
```bash
orbital compile task-app.orb --shell typescript
```

You now have a full CRUD application — flat-packed, composable, ready to customize.

## The Takeaway

IKEA didn't just make cheaper furniture. They changed how people think about furnishing homes — from "hire a carpenter" to "assemble it myself."

Almadar aims to do the same for software. Not by making developers obsolete, but by giving them composable, flat-pack modules that snap together into applications.

The future isn't custom carpentry for every shelf. It's knowing which standard parts to combine, and where to add the custom touches that matter.

Ready to assemble your first app? [Get started with the CLI](https://orb.almadar.io/docs/downloads/cli).
