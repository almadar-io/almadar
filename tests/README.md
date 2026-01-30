# Almadar Language Tests

This directory contains black-box tests for the Almadar language. These tests validate that all language features work correctly from a user's perspective.

## Purpose

Before any release, these tests ensure that:
- All `.orb` schemas validate correctly
- Code generation works for all supported shells
- The compiled output is syntactically correct

## Test Schemas

| Schema | Feature Tested |
|--------|----------------|
| `01-basic-entity.orb` | Entity definition with all field types |
| `02-state-machine.orb` | State machines with transitions |
| `03-guards.orb` | Guard conditions on transitions |
| `04-effects.orb` | Effect execution (set, increment, etc.) |
| `05-cross-orbital.orb` | Cross-almadar communication (emit/listen) |
| `06-ticks.orb` | Scheduled effects via ticks |
| `07-relations.orb` | Entity relations (one-to-many, many-to-many) |
| `08-patterns.orb` | UI patterns (render_ui effects) |
| `09-full-app.orb` | Complete application with multiple orbitals |

## Running Tests

### Prerequisites

Install the `almadar` CLI:

```bash
# macOS
brew install almadar-lang/tap/almadar

# Linux (Debian/Ubuntu)
curl -fsSL https://almadar.dev/install.sh | bash

# Windows
winget install almadar
```

### Run All Tests

```bash
./run-tests.sh
```

### Options

```bash
# Verbose output
./run-tests.sh --verbose

# Test specific shell
./run-tests.sh --shell typescript
./run-tests.sh --shell python
```

## Adding New Tests

1. Create a new `.orb` file in `schemas/`
2. Name it with a numeric prefix for ordering (e.g., `10-new-feature.orb`)
3. Include a `description` field explaining what the test covers
4. Run `./run-tests.sh` to verify it passes

## CI Integration

These tests run automatically in GitHub Actions on:
- Every push to `main`
- Every pull request
- Before publishing releases

See `.github/workflows/test.yml` for the CI configuration.
