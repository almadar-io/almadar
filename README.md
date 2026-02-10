# Almadar

> **فيزياء البرمجيات** - The Physics of Software

Almadar (المدار) is a declarative programming language for building full-stack applications using entities, traits, and state machines.

## Quick Start

```bash
# Install CLI globally
npm install -g @almadar/cli

# Create a new project
almadar new my-app
cd my-app

# Install dependencies
npm install

# Start development server
almadar dev
```

## Installation

### NPM Packages

Install the packages you need:

```bash
# Core packages (required)
npm install @almadar/core @almadar/validation @almadar/evaluator

# Standard library operators
npm install @almadar/std

# UI patterns and components
npm install @almadar/patterns @almadar/ui

# Runtime (for running compiled apps)
npm install @almadar/runtime @almadar/server

# External service integrations (Stripe, Twilio, YouTube, etc.)
npm install @almadar/integrations

# AI agent infrastructure
npm install @almadar/agent @almadar/llm @almadar/skills
```

### CLI Installation

```bash
# npm (recommended)
npm install -g @almadar/cli

# Or use npx
npx @almadar/cli validate schema.orb
```

## Published Packages

All `@almadar` packages are published to [npm](https://www.npmjs.com/org/almadar).

### Core

| Package | npm | Description |
|---------|-----|-------------|
| `@almadar/core` | [![npm](https://img.shields.io/npm/v/@almadar/core)](https://www.npmjs.com/package/@almadar/core) | Core schema types and definitions |
| `@almadar/validation` | [![npm](https://img.shields.io/npm/v/@almadar/validation)](https://www.npmjs.com/package/@almadar/validation) | Schema validation rules |
| `@almadar/evaluator` | [![npm](https://img.shields.io/npm/v/@almadar/evaluator)](https://www.npmjs.com/package/@almadar/evaluator) | S-expression evaluator |
| `@almadar/std` | [![npm](https://img.shields.io/npm/v/@almadar/std)](https://www.npmjs.com/package/@almadar/std) | Standard library (math, string, array operators) |
| `@almadar/patterns` | [![npm](https://img.shields.io/npm/v/@almadar/patterns)](https://www.npmjs.com/package/@almadar/patterns) | Pattern registry and component mappings |

### Runtime

| Package | npm | Description |
|---------|-----|-------------|
| `@almadar/runtime` | [![npm](https://img.shields.io/npm/v/@almadar/runtime)](https://www.npmjs.com/package/@almadar/runtime) | Interpreted runtime for orbital applications |
| `@almadar/server` | [![npm](https://img.shields.io/npm/v/@almadar/server)](https://www.npmjs.com/package/@almadar/server) | Shared server infrastructure (Express middleware) |
| `@almadar/ui` | [![npm](https://img.shields.io/npm/v/@almadar/ui)](https://www.npmjs.com/package/@almadar/ui) | React UI components, hooks, and providers |
| `@almadar/integrations` | [![npm](https://img.shields.io/npm/v/@almadar/integrations)](https://www.npmjs.com/package/@almadar/integrations) | External service integrations (Stripe, Twilio, YouTube, Email, LLM) |

### AI & Agent

| Package | npm | Description |
|---------|-----|-------------|
| `@almadar/agent` | [![npm](https://img.shields.io/npm/v/@almadar/agent)](https://www.npmjs.com/package/@almadar/agent) | AI agent infrastructure for schema generation |
| `@almadar/llm` | [![npm](https://img.shields.io/npm/v/@almadar/llm)](https://www.npmjs.com/package/@almadar/llm) | Multi-provider LLM client (rate limiting, token tracking, structured outputs) |
| `@almadar/skills` | [![npm](https://img.shields.io/npm/v/@almadar/skills)](https://www.npmjs.com/package/@almadar/skills) | AI skill generators and prompts |

### Tooling

| Package | npm | Description |
|---------|-----|-------------|
| `@almadar/cli` | [![npm](https://img.shields.io/npm/v/@almadar/cli)](https://www.npmjs.com/package/@almadar/cli) | Almadar CLI (validate, compile, dev server) |
| `@almadar/extensions` | [![npm](https://img.shields.io/npm/v/@almadar/extensions)](https://www.npmjs.com/package/@almadar/extensions) | Editor extension utilities for `.orb` files (VSCode, Zed) |

### CLI Platform Binaries

| Package | Platform |
|---------|----------|
| `@almadar/cli-darwin-arm64` | macOS Apple Silicon |
| `@almadar/cli-darwin-x64` | macOS Intel |
| `@almadar/cli-linux-arm64` | Linux ARM64 |
| `@almadar/cli-linux-x64` | Linux x64 |
| `@almadar/cli-windows-x64` | Windows x64 |

## Documentation

- [Getting Started](https://almadar.io/docs/en/getting-started/introduction)
- [Language Reference](https://almadar.io/docs/en/language/specification)
- [API Reference](https://almadar.io/docs/en/reference/cli)

## Repository Structure

| Directory | Description |
|-----------|-------------|
| [`examples/`](./examples) | Example schemas |
| [`templates/`](./templates) | Shell templates for compilation |
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
