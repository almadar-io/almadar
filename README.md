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
npm install @almadar/core @almadar/validation

# Standard library operators
npm install @almadar/std

# UI patterns
npm install @almadar/patterns

# Runtime packages (for compiled apps)
npm install @almadar/runtime @almadar/server @almadar/ui
```

### CLI Installation

```bash
# npm (recommended)
npm install -g @almadar/cli

# Or use npx
npx @almadar/cli validate schema.orb
```

## Available Packages

| Package | npm | Description |
|---------|-----|-------------|
| `@almadar/core` | [![npm](https://img.shields.io/npm/v/@almadar/core)](https://www.npmjs.com/package/@almadar/core) | Core types and schema definitions |
| `@almadar/std` | [![npm](https://img.shields.io/npm/v/@almadar/std)](https://www.npmjs.com/package/@almadar/std) | Standard library (math, string, array operators) |
| `@almadar/patterns` | [![npm](https://img.shields.io/npm/v/@almadar/patterns)](https://www.npmjs.com/package/@almadar/patterns) | UI pattern definitions |
| `@almadar/validation` | [![npm](https://img.shields.io/npm/v/@almadar/validation)](https://www.npmjs.com/package/@almadar/validation) | Schema validation utilities |
| `@almadar/runtime` | [![npm](https://img.shields.io/npm/v/@almadar/runtime)](https://www.npmjs.com/package/@almadar/runtime) | Client-side runtime |
| `@almadar/server` | [![npm](https://img.shields.io/npm/v/@almadar/server)](https://www.npmjs.com/package/@almadar/server) | Server-side runtime |
| `@almadar/ui` | [![npm](https://img.shields.io/npm/v/@almadar/ui)](https://www.npmjs.com/package/@almadar/ui) | React UI components |

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
