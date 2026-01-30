# Almadar CLI

The command-line interface for Almadar - compile Orbital schemas to full-stack applications.

## Installation

### npm (recommended)

```bash
npm install -g @almadar/cli
```

### Homebrew (macOS/Linux)

```bash
brew install almadar-io/tap/almadar
```

### Direct Download

Download pre-built binaries from the [GitHub Releases](https://github.com/almadar-io/almadar/releases) page.

| Platform | Architecture | Download |
|----------|-------------|----------|
| Linux | x64 | `almadar-linux-x64.tar.gz` |
| Linux | ARM64 | `almadar-linux-arm64.tar.gz` |
| macOS | x64 (Intel) | `almadar-darwin-x64.tar.gz` |
| macOS | ARM64 (Apple Silicon) | `almadar-darwin-arm64.tar.gz` |
| Windows | x64 | `almadar-windows-x64.zip` |

### Build from Source

```bash
# Requires Rust 1.75+
git clone https://github.com/almadar-io/almadar.git
cd almadar/cli
cargo build --release
```

## Commands

| Command | Description |
|---------|-------------|
| `almadar validate <file>` | Validate an Orbital schema |
| `almadar parse <file>` | Parse and display schema information |
| `almadar compile <file>` | Compile schema to generated code |
| `almadar serve <file>` | Start the Orbital server runtime |
| `almadar gui <file>` | Start the Orbital desktop GUI |
| `almadar dev <file>` | Start both server and client (dev mode) |

## Usage

### Validate a Schema

```bash
almadar validate schema.orb

# Output as JSON (for tooling integration)
almadar validate schema.orb --json
```

### Compile to TypeScript

```bash
# Full-stack TypeScript (React + Express)
almadar compile schema.orb --shell typescript --output ./my-app

# Client-only
almadar compile schema.orb --shell typescript --mode client

# Server-only
almadar compile schema.orb --shell typescript --mode server
```

### Compile to Python

```bash
# Full-stack Python (FastAPI + PyTorch)
almadar compile schema.orb --shell python --output ./my-app
```

### Mixed Compilation (TypeScript Frontend + Python Backend)

```bash
almadar compile schema.orb \
  --frontend typescript \
  --backend python \
  --backend-url http://localhost:8000 \
  --output ./my-app
```

### Development Mode

```bash
# Start server and GUI together
almadar dev schema.orb

# Custom port
almadar dev schema.orb --port 8080
```

## Options

### validate

| Option | Description |
|--------|-------------|
| `--json` | Output results as JSON for programmatic consumption |

### compile

| Option | Default | Description |
|--------|---------|-------------|
| `-o, --output` | `./output` | Output directory |
| `-s, --shell` | `typescript` | Target shell: `typescript` or `python` |
| `-m, --mode` | `full` | Compilation mode: `full`, `client`, or `server` |
| `--frontend` | - | Frontend shell for mixed compilation |
| `--backend` | - | Backend shell for mixed compilation |
| `--backend-url` | - | Backend URL for frontend proxy |
| `-v, --verbose` | - | Verbose output |

### serve

| Option | Default | Description |
|--------|---------|-------------|
| `-p, --port` | `3030` | Server port |
| `--host` | `127.0.0.1` | Bind address |
| `--mock` | - | Load mock/sample data |

### dev

| Option | Default | Description |
|--------|---------|-------------|
| `-p, --port` | `3030` | Server port |

## Documentation

- [Getting Started](https://almadar.io/docs/en/getting-started)
- [CLI Reference](https://almadar.io/docs/en/reference/cli)
- [Schema Format](https://almadar.io/docs/en/reference/schema)

## License

MIT License - See [LICENSE](../LICENSE)
