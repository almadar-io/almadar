# Almadar Shell Templates

Shell templates used by the Almadar compiler to generate full-stack applications.

## Available Shells

### TypeScript Shell (`typescript-shell/`)
- **Frontend**: React with TypeScript
- **Backend**: Express.js
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

The compiler copies the shell template to your output directory and generates
code into the appropriate `generated/` folder.

## Environment Variable

You can set `ORBITAL_SHELLS_DIR` to point to a custom shells directory:

```bash
export ORBITAL_SHELLS_DIR=/path/to/shells
almadar compile schema.orb --shell python
```

## License

MIT
