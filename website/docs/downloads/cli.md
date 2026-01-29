---
id: cli
title: Almadar CLI
sidebar_label: CLI
---

# Almadar CLI

The Almadar Command Line Interface (CLI) is your gateway to the Almadar ecosystem.

## Installation

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

## Commands

| Command | Description |
|---------|-------------|
| `almadar new` | Create a new project |
| `almadar validate` | Validate a schema |
| `almadar compile` | Compile to target |
| `almadar dev` | Start dev server |
| `almadar test` | Run tests |

## Quick Start

```bash
# Create new project
almadar new my-app

# Navigate to project
cd my-app

# Start development
almadar dev
```

## More Information

- [GitHub Repository](https://github.com/almadar-io/almadar)
- [Documentation](/)
