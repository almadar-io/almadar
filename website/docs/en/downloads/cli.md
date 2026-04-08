# Download Orbital CLI

The Orbital compiler is your local gateway for building applications from `.orb` programs. Download the precompiled binary for your platform.

## Platform-Specific Downloads

Latest release: [GitHub Releases](https://github.com/almadar-io/almadar/releases)

### macOS

```bash
# Apple Silicon (ARM64)
curl -fsSL https://github.com/almadar-io/almadar/releases/latest/download/orbital-Darwin-aarch64 -o /usr/local/bin/orbital
chmod +x /usr/local/bin/orbital

# Intel (x86_64)
curl -fsSL https://github.com/almadar-io/almadar/releases/latest/download/orbital-Darwin-x86_64 -o /usr/local/bin/orbital
chmod +x /usr/local/bin/orbital
```

### Linux

```bash
# x86_64
curl -fsSL https://github.com/almadar-io/almadar/releases/latest/download/orbital-Linux-x86_64 -o /usr/local/bin/orbital
chmod +x /usr/local/bin/orbital

# ARM64
curl -fsSL https://github.com/almadar-io/almadar/releases/latest/download/orbital-Linux-aarch64 -o /usr/local/bin/orbital
chmod +x /usr/local/bin/orbital
```

### Windows

Download from [GitHub Releases](https://github.com/almadar-io/almadar/releases):
- `orbital-Windows-x86_64.exe`

Or use command line:
```powershell
curl -fsSL "https://github.com/almadar-io/almadar/releases/latest/download/orbital-Windows-x86_64.exe" -o "%LOCALAPPDATA%\Programs\orbital.exe"
```

## Verify Installation

```bash
orbital --version
orbital --help
```

## Core Commands

### `orbital validate`

Validate an `.orb` schema for correctness:

```bash
orbital validate my-app.orb
orbital validate my-app.orb --simulate       # Trace all reachable states
orbital validate my-app.orb --json           # JSON output for CI
```

### `orbital compile`

Generate production-ready code:

```bash
orbital compile my-app.orb -o ./output                        # TypeScript (default)
orbital compile my-app.orb -s python -o ./output              # Python + FastAPI
orbital compile my-app.orb -s mobile -o ./output              # React Native
orbital compile my-app.orb --shell typescript --server hono   # Use Hono backend
```

### `orbital serve`

Compile and serve with zero dependencies (uses bundled Hono + Bun):

```bash
orbital serve my-app.orb                # http://localhost:3030
orbital serve my-app.orb -p 8000        # Custom port
orbital serve my-app.orb --open         # Auto-open browser
```

### `orbital test`

Run exhaustive state machine tests:

```bash
orbital test my-app.orb
```

### `orbital format`

Pretty-print and normalize `.orb` files:

```bash
orbital format my-app.orb
orbital format my-app.orb > my-app.orb  # Overwrite in-place
```

### `orbital parse`

Display schema structure:

```bash
orbital parse my-app.orb
```

### `orbital new`

Create new project scaffold:

```bash
orbital new my-app
```

### `orbital convert`

Convert existing project to `.orb`:

```bash
orbital convert ./my-react-project
```

## Interactive Agent Mode

Run the AI agent with natural language:

```bash
orbital "Build a todo app with categories"
orbital --resume                    # Resume session
orbital --last                      # Most recent session
```

## Global Options

```bash
--provider <NAME>                   # LLM provider (claude, gpt-4, etc)
--autonomy <LEVEL>                  # Agent behavior: full, balanced, cautious
--budget <USD>                      # Cost limit for agent runs
--resume [ID]                       # Resume previous session
--last                              # Resume most recent
```

## Quick Start

```bash
# Create and run
orbital new my-app
cd my-app
orbital serve my-app.orb --open

# Or compile and deploy
orbital compile my-app.orb -o ./output
cd output && npm install && npm run build
```

## Troubleshooting

### "Command not found"

Add to PATH:
```bash
export PATH="$PATH:/usr/local/bin"
```

### Permission Denied (macOS/Linux)

```bash
chmod +x /usr/local/bin/orbital
```

---

*Questions? Open an [issue](https://github.com/almadar-io/almadar/issues) or see the [documentation](/).*
