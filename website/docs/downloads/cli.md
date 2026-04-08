---
id: cli
title: Orbital CLI
sidebar_label: CLI
---

# Orbital CLI

The Orbital command line interface is your gateway to building applications from `.orb` programs. The compiler runs locally and generates production-ready TypeScript, Python, or mobile code.

## Installation

Download the precompiled binary for your platform from [GitHub Releases](https://github.com/almadar-io/almadar/releases). Binaries are available for macOS, Linux, and Windows.

```bash
# macOS / Linux
curl -fsSL https://github.com/almadar-io/almadar/releases/latest/download/orbital-$(uname -s)-$(uname -m) -o /usr/local/bin/orbital
chmod +x /usr/local/bin/orbital

# Verify installation
orbital --version
```

## Core Commands

### `orbital validate <FILE>`

Validate an `.orb` schema file for correctness. The compiler checks state machine rules, binding roots, pattern prop contracts, and circuit integrity.

```bash
orbital validate my-app.orb
orbital validate my-app.orb --json                    # JSON output for CI
orbital validate my-app.orb --simulate                # Simulate all reachable states
```

**Options:**
- `--json` — Output results as JSON (for programmatic use)
- `--simulate` — Trace every reachable state and show what render-ui effects fire
- `--patterns <PATH>` — Path to extra patterns.json (auto-discovered if omitted)
- `--services <PATH>` — Path to services-registry.json (auto-discovered if omitted)

### `orbital compile <FILE>`

Generate production-ready code from an `.orb` program.

```bash
orbital compile my-app.orb -o ./output                        # TypeScript/React + Express (default)
orbital compile my-app.orb -s typescript -o ./output          # Explicit TypeScript
orbital compile my-app.orb -s python -o ./output              # Python + FastAPI
orbital compile my-app.orb -s mobile -o ./output              # React Native mobile
orbital compile my-app.orb --shell typescript --server hono   # Use Hono instead of Express
```

**Options:**
- `-s, --shell <SHELL>` — Target platform: `typescript` (default), `python`, or `mobile`
- `-o, --output <DIR>` — Output directory (default: `./output`)
- `--server <SERVER>` — Backend framework: `express` (default) or `hono`
- `-m, --mode <MODE>` — Compilation mode: `full` (default), `client`, or `server`
- `--frontend <SHELL>` — Frontend shell (for cross-stack compilation)
- `--backend <SHELL>` — Backend shell (for cross-stack compilation)
- `--backend-url <URL>` — Backend URL for frontend proxy (e.g., `http://localhost:8000`)
- `--patterns <PATH>` — Extra patterns.json path
- `-v, --verbose` — Verbose output
- `--dev-logs` — Inject structured logging into generated code
- `--emit-orb <PATH>` — Write lowered .orb JSON to file (useful for inspecting lowering)

### `orbital serve <FILE>`

Compile and serve a full-stack application with zero dependencies. Uses Hono backend, Vite client bundler, and bundled Bun runtime.

```bash
orbital serve my-app.orb                    # Start on http://localhost:3030
orbital serve my-app.orb -p 8000            # Custom port
orbital serve my-app.orb --open             # Auto-open browser
orbital serve my-app.orb --no-build         # Serve existing build
```

**Options:**
- `-p, --port <PORT>` — Port to listen on (default: 3030)
- `--open` — Open browser after start
- `--no-build` — Skip client build, serve existing build
- `--patterns <PATH>` — Extra patterns.json path

### `orbital test <FILE>`

Run exhaustive state machine tests. Covers every transition path, evaluates all guards, and verifies reaching terminal states.

```bash
orbital test my-app.orb
orbital test my-app.orb --report json       # JSON output
```

### `orbital format <FILE>`

Pretty-print and normalize an `.orb` file (JSON formatting, key ordering, indentation).

```bash
orbital format my-app.orb                   # Print formatted output
orbital format my-app.orb > my-app.orb     # Overwrite in-place
```

### `orbital parse <FILE>`

Parse and display schema information (entities, traits, pages, field counts, event counts, state machine structure).

```bash
orbital parse my-app.orb
```

### `orbital convert <PATH>`

Convert an existing project or website to an `.orb` program via AI analysis.

```bash
orbital convert ./my-react-project          # Auto-detect React/TypeScript
orbital convert ./my-website.html            # Convert static HTML
```

### `orbital new <NAME>`

Create a new project scaffold from a template.

```bash
orbital new my-app
orbital new my-app --template game          # Game template
```

### `orbital fix <FILE>`

Auto-fix validation errors in a schema (delegates to AI agent).

```bash
orbital fix my-app.orb
```

### `orbital evaluate <EXPR>`

Evaluate an S-expression and print the result.

```bash
orbital evaluate '[">", 5, 3]'               # true
orbital evaluate '["and", true, false]'      # false
```

### `orbital login`

Authenticate with Almadar Cloud.

```bash
orbital login
```

### `orbital trace <SESSION>`

View agent trace from a previous session.

```bash
orbital trace --last                        # Most recent session
orbital trace <SESSION_ID>
```

## Global Options

These options apply to all commands:

- `--provider <PROVIDER>` — LLM provider override (claude, gpt-4, etc)
- `--autonomy <LEVEL>` — Agent autonomy: `full`, `balanced`, or `cautious`
- `--budget <USD>` — Cost budget for agent runs
- `--resume [ID]` — Resume a previous session (omit ID for prompt)
- `--last` — Resume the most recent session
- `--list` — List all sessions

## Agent Mode (No Subcommand)

Run the agent interactively with an optional prompt:

```bash
orbital "Build a todo app with categories and due dates"
orbital --resume                            # Resume interactive session
orbital --last                              # Resume most recent
```

## Quick Start

```bash
# Create new project
orbital new my-app

# Validate schema
cd my-app
orbital validate my-app.orb

# Serve locally with zero dependencies
orbital serve my-app.orb --open

# Or compile and run locally
orbital compile my-app.orb -o ./output
cd output && npm install && npm run dev
```

## Documentation

- **Full Guide:** See the [Orb Language Documentation](/) for schema structure, operators, and patterns
- **GitHub:** [almadar-io/almadar](https://github.com/almadar-io/almadar)
- **Issues:** [Report bugs and request features](https://github.com/almadar-io/almadar/issues)
