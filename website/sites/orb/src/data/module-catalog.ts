export const MODULE_CATALOG: Record<string, Record<string, { description: string; example: string; returnType: string }>> = {
  "math": {
    "math/abs": {
      "description": "The number",
      "example": "[\"math/abs\", -5] // => 5",
      "returnType": "number"
    },
    "math/min": {
      "description": "Numbers to compare",
      "example": "[\"math/min\", 3, 1, 4] // => 1",
      "returnType": "number"
    },
    "math/max": {
      "description": "Numbers to compare",
      "example": "[\"math/max\", 3, 1, 4] // => 4",
      "returnType": "number"
    },
    "math/clamp": {
      "description": "Maximum bound",
      "example": "[\"math/clamp\", 150, 0, 100] // => 100",
      "returnType": "number"
    },
    "math/floor": {
      "description": "The number",
      "example": "[\"math/floor\", 3.7] // => 3",
      "returnType": "number"
    },
    "math/ceil": {
      "description": "The number",
      "example": "[\"math/ceil\", 3.2] // => 4",
      "returnType": "number"
    },
    "math/round": {
      "description": "Decimal places",
      "example": "[\"math/round\", 3.456, 2] // => 3.46",
      "returnType": "number"
    },
    "math/pow": {
      "description": "The exponent",
      "example": "[\"math/pow\", 2, 8] // => 256",
      "returnType": "number"
    },
    "math/sqrt": {
      "description": "The number",
      "example": "[\"math/sqrt\", 16] // => 4",
      "returnType": "number"
    },
    "math/mod": {
      "description": "Divisor",
      "example": "[\"math/mod\", 7, 3] // => 1",
      "returnType": "number"
    },
    "math/sign": {
      "description": "The number",
      "example": "[\"math/sign\", -42] // => -1",
      "returnType": "number"
    },
    "math/lerp": {
      "description": "Interpolation factor (0-1)",
      "example": "[\"math/lerp\", 0, 100, 0.5] // => 50",
      "returnType": "number"
    },
    "math/map": {
      "description": "Output range maximum",
      "example": "[\"math/map\", 5, 0, 10, 0, 100] // => 50",
      "returnType": "number"
    },
    "math/random": {
      "description": "Maximum (inclusive)",
      "example": "[\"math/randomInt\", 1, 6] // => 4",
      "returnType": "number"
    },
    "math/default": {
      "description": "Default value",
      "example": "[\"math/default\", null, 0] // => 0",
      "returnType": "number"
    }
  },
  "str": {
    "str/len": {
      "description": "The string",
      "example": "[\"str/len\", \"hello\"] // => 5",
      "returnType": "number"
    },
    "str/concat": {
      "description": "Strings to concatenate",
      "example": "[\"str/concat\", \"/users/\", \"@entity.id\"] // => \"/users/123\"",
      "returnType": "string"
    },
    "str/upper": {
      "description": "The string",
      "example": "[\"str/upper\", \"hello\"] // => \"HELLO\"",
      "returnType": "string"
    },
    "str/lower": {
      "description": "The string",
      "example": "[\"str/lower\", \"HELLO\"] // => \"hello\"",
      "returnType": "string"
    },
    "str/trim": {
      "description": "The string",
      "example": "[\"str/trimEnd\", \"hello  \"] // => \"hello\"",
      "returnType": "string"
    },
    "str/split": {
      "description": "Delimiter",
      "example": "[\"str/split\", \"a,b,c\", \",\"] // => [\"a\", \"b\", \"c\"]",
      "returnType": "array"
    },
    "str/join": {
      "description": "Delimiter",
      "example": "[\"str/join\", [\"a\", \"b\", \"c\"], \", \"] // => \"a, b, c\"",
      "returnType": "string"
    },
    "str/slice": {
      "description": "End index (exclusive)",
      "example": "[\"str/slice\", \"hello\", 1, 4] // => \"ell\"",
      "returnType": "string"
    },
    "str/replace": {
      "description": "Replacement",
      "example": "[\"str/replaceAll\", \"a-b-c\", \"-\", \"_\"] // => \"a_b_c\"",
      "returnType": "string"
    },
    "str/includes": {
      "description": "Padding character",
      "example": "[\"str/padEnd\", \"5\", 3, \"0\"] // => \"500\"",
      "returnType": "string"
    },
    "str/repeat": {
      "description": "Repeat count",
      "example": "[\"str/repeat\", \"ab\", 3] // => \"ababab\"",
      "returnType": "string"
    },
    "str/reverse": {
      "description": "The string",
      "example": "[\"str/reverse\", \"hello\"] // => \"olleh\"",
      "returnType": "string"
    },
    "str/capitalize": {
      "description": "The string",
      "example": "[\"str/snakeCase\", \"Hello World\"] // => \"hello_world\"",
      "returnType": "string"
    },
    "str/default": {
      "description": "Default value",
      "example": "[\"str/default\", null, \"N/A\"] // => \"N/A\"",
      "returnType": "string"
    },
    "str/template": {
      "description": "Variables to substitute",
      "example": "[\"str/template\", \"Hello, {name}!\", {\"name\": \"World\"}] // => \"Hello, World!\"",
      "returnType": "string"
    },
    "str/truncate": {
      "description": "Suffix for truncated strings",
      "example": "[\"str/truncate\", \"Hello World\", 8, \"...\"] // => \"Hello...\"",
      "returnType": "string"
    }
  },
  "array": {
    "array/len": {
      "description": "The array",
      "example": "[\"array/empty?\", []] // => true",
      "returnType": "boolean"
    },
    "array/first": {
      "description": "The array",
      "example": "[\"array/first\", [1, 2, 3]] // => 1",
      "returnType": "any"
    },
    "array/last": {
      "description": "The array",
      "example": "[\"array/last\", [1, 2, 3]] // => 3",
      "returnType": "any"
    },
    "array/nth": {
      "description": "Index (0-based)",
      "example": "[\"array/nth\", [1, 2, 3], 1] // => 2",
      "returnType": "any"
    },
    "array/slice": {
      "description": "End index (exclusive)",
      "example": "[\"array/slice\", [1, 2, 3, 4], 1, 3] // => [2, 3]",
      "returnType": "array"
    },
    "array/concat": {
      "description": "Arrays to concatenate",
      "example": "[\"array/concat\", [1, 2], [3, 4]] // => [1, 2, 3, 4]",
      "returnType": "array"
    },
    "array/append": {
      "description": "Item to add",
      "example": "[\"array/append\", [1, 2], 3] // => [1, 2, 3]",
      "returnType": "array"
    },
    "array/prepend": {
      "description": "Item to add",
      "example": "[\"array/prepend\", [2, 3], 1] // => [1, 2, 3]",
      "returnType": "array"
    },
    "array/insert": {
      "description": "Item to insert",
      "example": "[\"array/insert\", [1, 3], 1, 2] // => [1, 2, 3]",
      "returnType": "array"
    },
    "array/remove": {
      "description": "Item to remove",
      "example": "[\"array/removeItem\", [1, 2, 3, 2], 2] // => [1, 3, 2]",
      "returnType": "array"
    },
    "array/reverse": {
      "description": "The array",
      "example": "[\"array/reverse\", [1, 2, 3]] // => [3, 2, 1]",
      "returnType": "array"
    },
    "array/sort": {
      "description": "\"asc\" or \"desc\"",
      "example": "[\"array/sort\", \"@items\", \"price\", \"desc\"]",
      "returnType": "array"
    },
    "array/shuffle": {
      "description": "The array",
      "example": "[\"array/shuffle\", [1, 2, 3, 4, 5]]",
      "returnType": "array"
    },
    "array/unique": {
      "description": "The array",
      "example": "[\"array/unique\", [1, 2, 2, 3, 1]] // => [1, 2, 3]",
      "returnType": "array"
    },
    "array/flatten": {
      "description": "The array",
      "example": "[\"array/flatten\", [[1, 2], [3, 4]]] // => [1, 2, 3, 4]",
      "returnType": "array"
    },
    "array/zip": {
      "description": "Second array",
      "example": "[\"array/zip\", [1, 2], [\"a\", \"b\"]] // => [[1, \"a\"], [2, \"b\"]]",
      "returnType": "array"
    },
    "array/includes": {
      "description": "Item to find",
      "example": "[\"array/indexOf\", [1, 2, 3], 2] // => 1",
      "returnType": "number"
    },
    "array/find": {
      "description": "Predicate function",
      "example": "[\"array/findIndex\", \"@items\", [\"fn\", \"x\", [\"=\", \"@x.status\", \"active\"]]]",
      "returnType": "number"
    },
    "array/filter": {
      "description": "Predicate function",
      "example": "[\"array/filter\", \"@items\", [\"fn\", \"x\", [\">\", \"@x.price\", 100]]]",
      "returnType": "array"
    },
    "array/reject": {
      "description": "Predicate function",
      "example": "[\"array/reject\", \"@items\", [\"fn\", \"x\", [\"=\", \"@x.status\", \"deleted\"]]]",
      "returnType": "array"
    },
    "array/map": {
      "description": "Transform function",
      "example": "[\"array/map\", \"@items\", [\"fn\", \"x\", [\"*\", \"@x.price\", 1.1]]]",
      "returnType": "array"
    },
    "array/reduce": {
      "description": "Initial accumulator value",
      "example": "[\"array/reduce\", \"@items\", [\"fn\", [\"acc\", \"x\"], [\"+\", \"@acc\", \"@x.price\"]], 0]",
      "returnType": "any"
    },
    "array/every": {
      "description": "Predicate function",
      "example": "[\"array/every\", \"@items\", [\"fn\", \"x\", [\">\", \"@x.price\", 0]]]",
      "returnType": "boolean"
    },
    "array/some": {
      "description": "Predicate function",
      "example": "[\"array/some\", \"@items\", [\"fn\", \"x\", [\"=\", \"@x.status\", \"active\"]]]",
      "returnType": "boolean"
    },
    "array/count": {
      "description": "Predicate function",
      "example": "[\"array/count\", \"@tasks\", [\"fn\", \"t\", [\"=\", \"@t.status\", \"done\"]]]",
      "returnType": "number"
    },
    "array/sum": {
      "description": "Field to sum",
      "example": "[\"array/sum\", \"@cart.items\", \"price\"]",
      "returnType": "number"
    },
    "array/avg": {
      "description": "Field to average",
      "example": "[\"array/avg\", \"@ratings\", \"score\"]",
      "returnType": "number"
    },
    "array/min": {
      "description": "Field to compare",
      "example": "[\"array/min\", \"@products\", \"price\"]",
      "returnType": "number"
    },
    "array/max": {
      "description": "Field to group by",
      "example": "[\"array/groupBy\", \"@orders\", \"status\"]",
      "returnType": "any"
    },
    "array/partition": {
      "description": "Predicate function",
      "example": "[\"array/partition\", \"@items\", [\"fn\", \"x\", [\">\", \"@x.price\", 50]]]",
      "returnType": "array"
    },
    "array/take": {
      "description": "Number of elements",
      "example": "[\"array/take\", \"@items\", 5]",
      "returnType": "array"
    },
    "array/drop": {
      "description": "Number of elements to skip",
      "example": "[\"array/dropLast\", \"@items\", 2]",
      "returnType": "array"
    }
  },
  "object": {
    "object/keys": {
      "description": "The object",
      "example": "[\"object/keys\", {\"a\": 1, \"b\": 2}] // => [\"a\", \"b\"]",
      "returnType": "array"
    },
    "object/values": {
      "description": "The object",
      "example": "[\"object/values\", {\"a\": 1, \"b\": 2}] // => [1, 2]",
      "returnType": "array"
    },
    "object/entries": {
      "description": "Array of [key, value] pairs",
      "example": "[\"object/fromEntries\", [[\"a\", 1], [\"b\", 2]]] // => {\"a\": 1, \"b\": 2}",
      "returnType": "any"
    },
    "object/get": {
      "description": "Default if path not found",
      "example": "[\"object/get\", \"@user\", \"profile.name\", \"Anonymous\"]",
      "returnType": "any"
    },
    "object/set": {
      "description": "Value to set",
      "example": "[\"object/set\", \"@user\", \"profile.name\", \"John\"]",
      "returnType": "any"
    },
    "object/has": {
      "description": "Dot-separated path",
      "example": "[\"object/has\", \"@user\", \"profile.name\"]",
      "returnType": "boolean"
    },
    "object/merge": {
      "description": "Objects to merge",
      "example": "[\"object/deepMerge\", {\"a\": {\"b\": 1}}, {\"a\": {\"c\": 2}}]",
      "returnType": "any"
    },
    "object/pick": {
      "description": "Keys to keep",
      "example": "[\"object/pick\", \"@entity\", [\"name\", \"email\"]]",
      "returnType": "any"
    },
    "object/omit": {
      "description": "Transform function",
      "example": "[\"object/mapKeys\", \"@data\", [\"fn\", \"k\", [\"str/upper\", \"@k\"]]]",
      "returnType": "any"
    },
    "object/filter": {
      "description": "The object",
      "example": "[\"object/empty?\", {}] // => true",
      "returnType": "boolean"
    },
    "object/equals": {
      "description": "Second object",
      "example": "[\"object/equals\", {\"a\": 1}, {\"a\": 1}] // => true",
      "returnType": "boolean"
    },
    "object/clone": {
      "description": "Path segments to join with dots",
      "example": "[\"path\", \"formValues\", \"@payload.fieldId\"] // => \"formValues.customerName\"",
      "returnType": "string"
    }
  },
  "format": {
    "format/number": {
      "description": "Format options (decimals, locale)",
      "example": "[\"format/number\", 1234567.89] // => \"1,234,567.89\"",
      "returnType": "string"
    },
    "format/currency": {
      "description": "Locale",
      "example": "[\"format/currency\", 1234.56, \"USD\"] // => \"$1,234.56\"",
      "returnType": "string"
    },
    "format/percent": {
      "description": "Decimal places",
      "example": "[\"format/percent\", 0.856, 1] // => \"85.6%\"",
      "returnType": "string"
    },
    "format/bytes": {
      "description": "Bytes",
      "example": "[\"format/bytes\", 2500000] // => \"2.4 MB\"",
      "returnType": "string"
    },
    "format/ordinal": {
      "description": "Number",
      "example": "[\"format/ordinal\", 42] // => \"42nd\"",
      "returnType": "string"
    },
    "format/plural": {
      "description": "Plural form",
      "example": "[\"format/plural\", 5, \"item\", \"items\"] // => \"5 items\"",
      "returnType": "string"
    },
    "format/list": {
      "description": "\"and\" or \"or\"",
      "example": "[\"format/list\", [\"Alice\", \"Bob\", \"Charlie\"], \"and\"] // => \"Alice, Bob, and Charlie\"",
      "returnType": "string"
    },
    "format/phone": {
      "description": "Card number",
      "example": "[\"format/creditCard\", \"4111111111111234\"] // => \"•••• •••• •••• 1234\"",
      "returnType": "string"
    }
  },
  "time": {
    "time/now": {
      "description": "Current timestamp",
      "example": "[\"time/now\"] // => 1705593600000",
      "returnType": "number"
    },
    "time/today": {
      "description": "Today at midnight (local time)",
      "example": "[\"time/today\"]",
      "returnType": "number"
    },
    "time/parse": {
      "description": "Format pattern",
      "example": "[\"time/parse\", \"2024-01-18\", \"YYYY-MM-DD\"]",
      "returnType": "number"
    },
    "time/format": {
      "description": "Format pattern",
      "example": "[\"time/format\", \"@entity.createdAt\", \"MMM DD, YYYY\"]",
      "returnType": "string"
    },
    "time/year": {
      "description": "Timestamp",
      "example": "[\"time/year\", \"@entity.createdAt\"] // => 2024",
      "returnType": "number"
    },
    "time/month": {
      "description": "Timestamp",
      "example": "[\"time/month\", \"@entity.createdAt\"] // => 1",
      "returnType": "number"
    },
    "time/day": {
      "description": "Timestamp",
      "example": "[\"time/day\", \"@entity.createdAt\"] // => 18",
      "returnType": "number"
    },
    "time/weekday": {
      "description": "Timestamp",
      "example": "[\"time/weekday\", \"@entity.createdAt\"] // => 4 (Thursday)",
      "returnType": "number"
    },
    "time/hour": {
      "description": "Timestamp",
      "example": "[\"time/hour\", \"@entity.createdAt\"] // => 14",
      "returnType": "number"
    },
    "time/minute": {
      "description": "Timestamp",
      "example": "[\"time/minute\", \"@entity.createdAt\"] // => 30",
      "returnType": "number"
    },
    "time/second": {
      "description": "Timestamp",
      "example": "[\"time/second\", \"@entity.createdAt\"] // => 45",
      "returnType": "number"
    },
    "time/add": {
      "description": "Time unit (year/month/week/day/hour/minute/second/ms)",
      "example": "[\"time/add\", [\"time/now\"], 7, \"day\"]",
      "returnType": "number"
    },
    "time/subtract": {
      "description": "Time unit",
      "example": "[\"time/subtract\", [\"time/now\"], 1, \"hour\"]",
      "returnType": "number"
    },
    "time/diff": {
      "description": "Timestamp",
      "example": "[\"time/isToday\", \"@entity.createdAt\"]",
      "returnType": "boolean"
    },
    "time/relative": {
      "description": "Timestamp",
      "example": "[\"time/relative\", \"@entity.lastActivityAt\"] // => \"2 hours ago\"",
      "returnType": "string"
    },
    "time/duration": {
      "description": "Duration in milliseconds",
      "example": "[\"time/duration\", 9000000] // => \"2h 30m\"",
      "returnType": "string"
    }
  },
  "validate": {
    "validate/required": {
      "description": "Value to check",
      "example": "[\"validate/required\", \"@payload.name\"]",
      "returnType": "boolean"
    },
    "validate/string": {
      "description": "Value to check",
      "example": "[\"validate/string\", \"@payload.name\"]",
      "returnType": "boolean"
    },
    "validate/number": {
      "description": "Value to check",
      "example": "[\"validate/number\", \"@payload.age\"]",
      "returnType": "boolean"
    },
    "validate/boolean": {
      "description": "Value to check",
      "example": "[\"validate/boolean\", \"@payload.active\"]",
      "returnType": "boolean"
    },
    "validate/array": {
      "description": "Value to check",
      "example": "[\"validate/array\", \"@payload.items\"]",
      "returnType": "boolean"
    },
    "validate/object": {
      "description": "Value to check",
      "example": "[\"validate/object\", \"@payload.data\"]",
      "returnType": "boolean"
    },
    "validate/email": {
      "description": "Email to validate",
      "example": "[\"validate/email\", \"@payload.email\"]",
      "returnType": "boolean"
    },
    "validate/url": {
      "description": "URL to validate",
      "example": "[\"validate/url\", \"@payload.website\"]",
      "returnType": "boolean"
    },
    "validate/uuid": {
      "description": "UUID to validate",
      "example": "[\"validate/uuid\", \"@payload.id\"]",
      "returnType": "boolean"
    },
    "validate/phone": {
      "description": "Card number to validate",
      "example": "[\"validate/creditCard\", \"@payload.cardNumber\"]",
      "returnType": "boolean"
    },
    "validate/date": {
      "description": "Maximum length",
      "example": "[\"validate/maxLength\", \"@payload.name\", 50]",
      "returnType": "boolean"
    },
    "validate/length": {
      "description": "Required length",
      "example": "[\"validate/length\", \"@payload.code\", 6]",
      "returnType": "boolean"
    },
    "validate/min": {
      "description": "Minimum value",
      "example": "[\"validate/min\", \"@payload.age\", 18]",
      "returnType": "boolean"
    },
    "validate/max": {
      "description": "Maximum value",
      "example": "[\"validate/max\", \"@payload.quantity\", 100]",
      "returnType": "boolean"
    },
    "validate/range": {
      "description": "Maximum value",
      "example": "[\"validate/range\", \"@payload.rating\", 1, 5]",
      "returnType": "boolean"
    },
    "validate/pattern": {
      "description": "Disallowed values",
      "example": "[\"validate/noneOf\", \"@payload.username\", [\"admin\", \"root\", \"system\"]]",
      "returnType": "boolean"
    },
    "validate/equals": {
      "description": "Second value",
      "example": "[\"validate/equals\", \"@payload.password\", \"@payload.confirmPassword\"]",
      "returnType": "boolean"
    },
    "validate/check": {
      "description": "Validation rules by field",
      "example": "",
      "returnType": "any"
    }
  },
  "prob": {
    "prob/seed": {
      "description": "Seed value (integer)",
      "example": "[\"prob/seed\", 42]",
      "returnType": "void"
    },
    "prob/flip": {
      "description": "Probability of true (0 to 1)",
      "example": "[\"prob/flip\", 0.5] // => true or false with equal probability",
      "returnType": "boolean"
    },
    "prob/gaussian": {
      "description": "Standard deviation",
      "example": "[\"prob/gaussian\", 0, 1] // => standard normal sample",
      "returnType": "number"
    },
    "prob/uniform": {
      "description": "Upper bound (exclusive)",
      "example": "[\"prob/uniform\", 0, 10] // => number in [0, 10)",
      "returnType": "number"
    },
    "prob/beta": {
      "description": "Beta shape parameter (> 0)",
      "example": "[\"prob/beta\", 2, 5] // => number in [0, 1], mean ~ 0.286",
      "returnType": "number"
    },
    "prob/categorical": {
      "description": "Array of weights (same length as items)",
      "example": "[\"prob/categorical\", [\"a\", \"b\", \"c\"], [1, 2, 1]] // => \"b\" most likely",
      "returnType": "any"
    },
    "prob/poisson": {
      "description": "Rate parameter (> 0)",
      "example": "[\"prob/poisson\", 4] // => non-negative integer, mean ~ 4",
      "returnType": "number"
    },
    "prob/condition": {
      "description": "Condition that must hold",
      "example": "[\"prob/condition\", [\">\", \"@entity.x\", 0]]",
      "returnType": "void"
    },
    "prob/sample": {
      "description": "Expression to evaluate (lazy)",
      "example": "[\"prob/sample\", 1000, [\"prob/flip\", 0.5]] // => array of booleans",
      "returnType": "array"
    },
    "prob/posterior": {
      "description": "Number of samples to attempt",
      "example": "[\"prob/posterior\", model, evidence, query, 5000]",
      "returnType": "array"
    },
    "prob/infer": {
      "description": "Array of numeric samples",
      "example": "[\"prob/expected-value\", [2, 4, 6, 8]] // => 5",
      "returnType": "number"
    },
    "prob/variance": {
      "description": "Array of numeric samples",
      "example": "[\"prob/variance\", [2, 4, 4, 4, 5, 5, 7, 9]] // => 4",
      "returnType": "number"
    },
    "prob/histogram": {
      "description": "Number of bins",
      "example": "[\"prob/histogram\", [1, 2, 3, 4, 5], 2] // => {binEdges, counts}",
      "returnType": "object"
    },
    "prob/percentile": {
      "description": "Significance level (e.g., 0.05 for 95% interval)",
      "example": "[\"prob/credible-interval\", samples, 0.05] // => [lo, hi]",
      "returnType": "array"
    }
  },
  "async": {
    "async/delay": {
      "description": "Optional effect to execute after delay",
      "example": "[\"async/delay\", 2000, [\"emit\", \"RETRY\"]] // Wait 2s then emit",
      "returnType": "any"
    },
    "async/interval": {
      "description": "Effect to execute each interval",
      "example": "[\"async/interval\", 5000, [\"emit\", \"POLL_TICK\"]] // Emit every 5s",
      "returnType": "string"
    },
    "async/timeout": {
      "description": "Timeout in milliseconds",
      "example": "[\"async/timeout\", [\"call\", \"api\", \"fetchData\"], 5000]",
      "returnType": "any"
    },
    "async/debounce": {
      "description": "Debounce delay in milliseconds",
      "example": "[\"async/debounce\", \"SEARCH\", 300]",
      "returnType": "void"
    },
    "async/throttle": {
      "description": "Throttle interval in milliseconds",
      "example": "[\"async/throttle\", \"SCROLL\", 100]",
      "returnType": "void"
    },
    "async/retry": {
      "description": "{ attempts, backoff, baseDelay }",
      "example": "",
      "returnType": "any"
    },
    "async/race": {
      "description": "Effects to race",
      "example": "[\"async/race\", [\"call\", \"api1\"], [\"call\", \"api2\"]]",
      "returnType": "any"
    },
    "async/all": {
      "description": "Effects to execute",
      "example": "[\"async/all\", [\"call\", \"api1\"], [\"call\", \"api2\"]]",
      "returnType": "array"
    },
    "async/sequence": {
      "description": "Effects to execute in order",
      "example": "[\"async/sequence\", [\"call\", \"validate\"], [\"call\", \"save\"]]",
      "returnType": "array"
    }
  },
  "nn": {
    "nn/sequential": {
      "description": "Layers to stack sequentially",
      "example": "[\"nn/sequential\", [\"nn/linear\", 16, 64], [\"nn/relu\"], [\"nn/linear\", 64, 4]]",
      "returnType": "nn/module"
    },
    "nn/linear": {
      "description": "Output dimension",
      "example": "[\"nn/linear\", 16, 64] // 16 inputs -> 64 outputs",
      "returnType": "nn/layer"
    },
    "nn/relu": {
      "description": "ReLU activation function: max(0, x)",
      "example": "[\"nn/relu\"]",
      "returnType": "nn/layer"
    },
    "nn/tanh": {
      "description": "Tanh activation function: (e^x - e^-x) / (e^x + e^-x)",
      "example": "[\"nn/tanh\"]",
      "returnType": "nn/layer"
    },
    "nn/sigmoid": {
      "description": "Sigmoid activation function: 1 / (1 + e^-x)",
      "example": "[\"nn/sigmoid\"]",
      "returnType": "nn/layer"
    },
    "nn/softmax": {
      "description": "Dimension to apply softmax",
      "example": "[\"nn/softmax\"]",
      "returnType": "nn/layer"
    },
    "nn/dropout": {
      "description": "Dropout probability",
      "example": "[\"nn/dropout\", 0.3] // 30% dropout",
      "returnType": "nn/layer"
    },
    "nn/batchnorm": {
      "description": "Number of features to normalize",
      "example": "[\"nn/batchnorm\", 64]",
      "returnType": "nn/layer"
    },
    "nn/layernorm": {
      "description": "Shape to normalize over",
      "example": "[\"nn/layernorm\", 64]",
      "returnType": "nn/layer"
    },
    "nn/forward": {
      "description": "The neural network module",
      "example": "[\"nn/paramCount\", \"@entity.architecture\"] // => 3300",
      "returnType": "number"
    },
    "nn/clone": {
      "description": "The neural network module to clone",
      "example": "[\"nn/clone\", \"@entity.architecture\"]",
      "returnType": "nn/module"
    }
  },
  "tensor": {
    "tensor/from": {
      "description": "Array of numbers (can be nested for multi-dimensional)",
      "example": "[\"tensor/from\", [1.0, 2.0, 3.0]]",
      "returnType": "tensor"
    },
    "tensor/zeros": {
      "description": "Shape of the tensor",
      "example": "[\"tensor/zeros\", [3, 4]] // 3x4 tensor of zeros",
      "returnType": "tensor"
    },
    "tensor/ones": {
      "description": "Shape of the tensor",
      "example": "[\"tensor/ones\", [3, 4]] // 3x4 tensor of ones",
      "returnType": "tensor"
    },
    "tensor/rand": {
      "description": "Shape of the tensor",
      "example": "[\"tensor/rand\", [16]] // Random 16-element vector",
      "returnType": "tensor"
    },
    "tensor/randn": {
      "description": "Shape of the tensor",
      "example": "[\"tensor/randn\", [16]] // Random normal 16-element vector",
      "returnType": "tensor"
    },
    "tensor/shape": {
      "description": "The tensor",
      "example": "[\"tensor/shape\", \"@entity.sensors\"] // => [16]",
      "returnType": "number[]"
    },
    "tensor/get": {
      "description": "Index (single for 1D, array for multi-D)",
      "example": "[\"tensor/get\", \"@entity.output\", 3] // Get 4th element",
      "returnType": "number"
    },
    "tensor/slice": {
      "description": "End index (exclusive)",
      "example": "[\"tensor/slice\", \"@entity.output\", 0, 3] // First 3 elements",
      "returnType": "tensor"
    },
    "tensor/reshape": {
      "description": "New shape",
      "example": "[\"tensor/reshape\", \"@entity.data\", [4, 4]] // Reshape to 4x4",
      "returnType": "tensor"
    },
    "tensor/flatten": {
      "description": "The tensor",
      "example": "[\"tensor/flatten\", \"@entity.data\"]",
      "returnType": "tensor"
    },
    "tensor/add": {
      "description": "Second tensor or scalar",
      "example": "[\"tensor/add\", \"@entity.a\", \"@entity.b\"]",
      "returnType": "tensor"
    },
    "tensor/sub": {
      "description": "Second tensor or scalar",
      "example": "[\"tensor/sub\", \"@entity.a\", \"@entity.b\"]",
      "returnType": "tensor"
    },
    "tensor/mul": {
      "description": "Second tensor or scalar",
      "example": "[\"tensor/mul\", \"@entity.weights\", 0.99] // Decay weights",
      "returnType": "tensor"
    },
    "tensor/div": {
      "description": "Second tensor or scalar",
      "example": "[\"tensor/div\", \"@entity.gradient\", \"@entity.batchSize\"]",
      "returnType": "tensor"
    },
    "tensor/matmul": {
      "description": "Second tensor (MxK)",
      "example": "[\"tensor/matmul\", \"@entity.input\", \"@entity.weights\"]",
      "returnType": "tensor"
    },
    "tensor/dot": {
      "description": "Second vector",
      "example": "[\"tensor/dot\", \"@entity.a\", \"@entity.b\"]",
      "returnType": "number"
    },
    "tensor/sum": {
      "description": "Dimension to reduce",
      "example": "[\"tensor/sum\", \"@entity.rewards\"] // Total reward",
      "returnType": "number | tensor"
    },
    "tensor/mean": {
      "description": "Dimension to reduce",
      "example": "[\"tensor/mean\", \"@entity.losses\"]",
      "returnType": "number | tensor"
    },
    "tensor/max": {
      "description": "Dimension to reduce",
      "example": "[\"tensor/max\", \"@entity.qValues\"]",
      "returnType": "number | tensor"
    },
    "tensor/min": {
      "description": "Dimension to reduce",
      "example": "[\"tensor/min\", \"@entity.distances\"]",
      "returnType": "number | tensor"
    },
    "tensor/argmax": {
      "description": "Dimension to reduce",
      "example": "[\"tensor/argmax\", \"@entity.qValues\"] // Best action index",
      "returnType": "number | tensor"
    },
    "tensor/norm": {
      "description": "Range as [min, max]",
      "example": "[\"tensor/outOfRangeIndices\", \"@payload.input\", [-1.0, 1.0]]",
      "returnType": "number[]"
    },
    "tensor/clamp": {
      "description": "The tensor (must be 1D)",
      "example": "[\"tensor/toList\", \"@entity.output\"]",
      "returnType": "number[]"
    }
  },
  "train": {
    "train/loop": {
      "description": "Training configuration with constraints",
      "example": "[\"train/loop\", \"@entity.architecture\", \"@entity.buffer\", \"@entity.trainingConfig\"]",
      "returnType": "train/result"
    },
    "train/step": {
      "description": "Training configuration",
      "example": "[\"train/step\", \"@entity.architecture\", \"@batch.input\", \"@batch.target\", \"@entity.config\"]",
      "returnType": "train/stepResult"
    },
    "train/validate": {
      "description": "The neural network",
      "example": "[\"train/getMaxWeightMagnitude\", \"@entity.architecture\"]",
      "returnType": "number"
    },
    "train/mse": {
      "description": "Target class labels",
      "example": "[\"train/crossEntropy\", \"@entity.logits\", \"@batch.labels\"]",
      "returnType": "number"
    },
    "train/huber": {
      "description": "Threshold for quadratic vs linear",
      "example": "[\"train/huber\", \"@entity.qValues\", \"@batch.targets\", 1.0]",
      "returnType": "number"
    },
    "train/sgd": {
      "description": "Momentum factor",
      "example": "[\"train/sgd\", \"@entity.architecture\", 0.01, 0.9]",
      "returnType": "void"
    },
    "train/adam": {
      "description": "Config with gamma, lambda",
      "example": "[\"train/computeAdvantages\", \"@episode.rewards\", \"@episode.values\", { \"gamma\": 0.99, \"lambda\": 0.95 }]",
      "returnType": "tensor"
    }
  }
};
