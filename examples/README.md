# Almadar Examples

Example schemas demonstrating Almadar patterns and best practices.

## Examples

| Example | Description |
|---------|-------------|
| `task-manager/` | Simple task management with CRUD and status workflow |
| `ecommerce/` | E-commerce with products, cart, and checkout |

## Running Examples

```bash
# Validate a schema
almadar validate examples/task-manager/schema.orb

# Compile to TypeScript
almadar compile examples/task-manager/schema.orb --shell typescript

# Start development server
almadar dev examples/task-manager/schema.orb
```

## Creating Your Own

Use these examples as starting points for your own applications:

```bash
# Create a new project
almadar new my-app

# Copy an example as a starting point
cp -r examples/task-manager my-app
cd my-app
almadar dev
```

## License

MIT
