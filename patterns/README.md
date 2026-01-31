# Almadar UI Patterns

Pattern definitions for Almadar UI components.

## Patterns

| Pattern | Description |
|---------|-------------|
| `entity-table` | Data table with sorting, filtering, pagination |
| `entity-list` | Simple list display |
| `entity-cards` | Card grid layout |
| `form` | Input form with validation |
| `form-section` | Grouped form fields |
| `page-header` | Page title and actions |
| `stats` | Stat cards with metrics |
| `master-detail` | List + detail view |
| `dashboard-grid` | Dashboard layout |

## Files

- `registry.json` - Pattern definitions and props
- `component-mapping.json` - Pattern to shell component mapping
- `event-contracts.json` - Event payload contracts

## Usage

Patterns are rendered via `render-ui` effects in traits:

```json
["render-ui", "main", {
  "type": "entity-table",
  "props": {
    "columns": ["name", "status", "createdAt"],
    "actions": ["edit", "delete"]
  }
}]
```

## License

BSL 1.1 - See [LICENSE](./LICENSE)
