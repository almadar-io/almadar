# Almadar Templates

Shell templates used by the Almadar compiler to generate full-stack applications.

## Available Templates

### Almadar Shell (`almadar-shell/`)
- **Frontend**: React with TypeScript
- **Backend**: Express.js
- **Packages**: Uses @almadar/* npm packages for UI, runtime, and server utilities
- **Use case**: Web applications, dashboards, CRUD apps

### Python Shell (`python-shell/`)
- **Backend**: FastAPI with PyTorch
- **Use case**: ML/AI applications, data processing, simulations

## Usage

When compiling an Almadar schema, specify the shell:

```bash
almadar compile schema.orb --shell typescript
almadar compile schema.orb --shell python
```

The compiler copies the template to your output directory and generates
code into the appropriate `generated/` folder.

## NPM Dependencies

The TypeScript template uses @almadar/* packages from npm:

```bash
# Installed automatically in generated projects
@almadar/core      # Core types
@almadar/runtime   # Client runtime
@almadar/server    # Server runtime
@almadar/ui        # React components
@almadar/patterns  # Pattern definitions
@almadar/std       # Standard library
```

## Environment Variable

You can set `ORBITAL_SHELLS_DIR` to point to a custom templates directory:

```bash
export ORBITAL_SHELLS_DIR=/path/to/templates
almadar compile schema.orb --shell python
```

## License

MIT
