# Almadar Standard Library

The standard library for Almadar, providing core operators for:

- **Math** - `math/clamp`, `math/abs`, `math/floor`, `math/ceil`, etc.
- **String** - `str/concat`, `str/split`, `str/trim`, `str/upper`, etc.
- **Array** - `array/filter`, `array/map`, `array/reduce`, `array/find`, etc.
- **Object** - `object/get`, `object/set`, `object/keys`, `object/values`, etc.
- **Time** - `time/now`, `time/format`, `time/diff`, `time/add`, etc.
- **Validate** - `validate/required`, `validate/email`, `validate/range`, etc.

## Installation

```bash
npm install @almadar/std
```

## Usage

```json
["math/clamp", "@entity.health", 0, 100]
["str/concat", "Hello, ", "@entity.name"]
["array/filter", "@entity.items", ["lambda", ["x"], [">", "@x.price", 50]]]
```

## License

BSL 1.1 - See [LICENSE](./LICENSE)
