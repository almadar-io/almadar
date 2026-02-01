"use strict";
var OrbitalVisualizerModule = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/orbitals/visualizer/browser.ts
  var browser_exports = {};
  __export(browser_exports, {
    OrbitalVisualizer: () => OrbitalVisualizer
  });

  // src/orbitals/types/expression.ts
  var import_zod = __require("zod");
  var SExprAtomSchema = import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.number(),
    import_zod.z.boolean(),
    import_zod.z.null(),
    import_zod.z.record(import_zod.z.unknown())
    // Objects for payload data
  ]);
  var SExprSchema = import_zod.z.lazy(
    () => import_zod.z.union([
      SExprAtomSchema,
      import_zod.z.array(import_zod.z.lazy(() => SExprSchema)).min(1).refine(
        (arr) => typeof arr[0] === "string",
        { message: "S-expression array must have a string operator as first element" }
      )
    ])
  );
  function isSExpr(value) {
    return Array.isArray(value) && value.length > 0 && typeof value[0] === "string";
  }
  function getOperator(expr) {
    if (!isSExpr(expr)) return null;
    return expr[0];
  }
  function getArgs(expr) {
    if (!isSExpr(expr)) return [];
    return expr.slice(1);
  }

  // src/domain-language/formatters/sexpr-formatter.ts
  function formatSExprToDomain(expr, context) {
    const ctx = context ?? { entityName: "" };
    if (!isSExpr(expr)) {
      return formatPrimitive(expr);
    }
    const op = getOperator(expr);
    const args = getArgs(expr);
    if (op === null) {
      return formatPrimitive(expr);
    }
    if (isComparisonOperator(op)) {
      return formatComparison(op, args, ctx);
    }
    if (isArithmeticOperator(op)) {
      return formatArithmetic(op, args, ctx);
    }
    if (isLogicalOperator(op)) {
      return formatLogical(op, args, ctx);
    }
    if (isControlOperator(op)) {
      return formatControl(op, args, ctx);
    }
    if (isEffectOperator(op)) {
      return formatEffect(op, args, ctx);
    }
    if (op.includes("/")) {
      return formatStdLibrary(op, args, ctx);
    }
    return formatGenericOperator(op, args, ctx);
  }
  function formatSExprGuardToDomain(expr, entityName) {
    const text = formatSExprToDomain(expr, { entityName: entityName ?? "" });
    return `if ${text}`;
  }
  function formatSExprEffectToDomain(expr, entityName) {
    return formatSExprToDomain(expr, { entityName: entityName ?? "" });
  }
  function isArraySExpr(value) {
    return Array.isArray(value) && value.length > 0 && typeof value[0] === "string";
  }
  var COMPARISON_OPERATORS = ["=", "==", "!=", ">", "<", ">=", "<=", "eq", "neq", "gt", "lt", "gte", "lte"];
  var ARITHMETIC_OPERATORS = ["+", "-", "*", "/", "%", "mod"];
  var LOGICAL_OPERATORS = ["and", "or", "not", "&&", "||", "!"];
  var CONTROL_OPERATORS = ["if", "cond", "do", "let", "when", "unless", "case"];
  var EFFECT_OPERATORS = ["set", "emit", "navigate", "notify", "persist", "spawn", "despawn", "call-service", "render-ui"];
  function isComparisonOperator(op) {
    return COMPARISON_OPERATORS.includes(op);
  }
  function isArithmeticOperator(op) {
    return ARITHMETIC_OPERATORS.includes(op);
  }
  function isLogicalOperator(op) {
    return LOGICAL_OPERATORS.includes(op);
  }
  function isControlOperator(op) {
    return CONTROL_OPERATORS.includes(op);
  }
  function isEffectOperator(op) {
    return EFFECT_OPERATORS.includes(op);
  }
  function formatPrimitive(value) {
    if (value === null || value === void 0) {
      return "nothing";
    }
    if (typeof value === "string") {
      if (value.startsWith("@")) {
        return formatBinding(value);
      }
      return `"${value}"`;
    }
    if (typeof value === "number") {
      return String(value);
    }
    if (typeof value === "boolean") {
      return value ? "true" : "false";
    }
    if (Array.isArray(value)) {
      const items = value.map((v) => formatPrimitive(v));
      return `[${items.join(", ")}]`;
    }
    if (typeof value === "object") {
      const entries = Object.entries(value).map(([k, v]) => `${k}: ${formatPrimitive(v)}`);
      return `{${entries.join(", ")}}`;
    }
    return String(value);
  }
  function formatBinding(binding) {
    if (!binding.startsWith("@")) {
      return binding;
    }
    const parts = binding.slice(1).split(".");
    const root = parts[0];
    const path = parts.slice(1);
    switch (root) {
      case "entity":
        return path.length > 0 ? path.join(".") : "entity";
      case "payload":
        return path.length > 0 ? `incoming ${path.join(".")}` : "payload";
      case "state":
        return "current state";
      case "now":
        return "current time";
      default:
        if (path.length > 0) {
          return `${root}'s ${path.join(".")}`;
        }
        return root;
    }
  }
  var COMPARISON_TEXT = {
    "=": "is",
    "==": "is",
    "eq": "is",
    "!=": "is not",
    "neq": "is not",
    ">": "is greater than",
    "gt": "is greater than",
    "<": "is less than",
    "lt": "is less than",
    ">=": "is at least",
    "gte": "is at least",
    "<=": "is at most",
    "lte": "is at most"
  };
  function formatComparison(op, args, ctx) {
    const left = formatSExprToDomain(args[0], ctx);
    const right = formatSExprToDomain(args[1], ctx);
    const opText = COMPARISON_TEXT[op] || op;
    return `${left} ${opText} ${right}`;
  }
  var ARITHMETIC_TEXT = {
    "+": "plus",
    "-": "minus",
    "*": "times",
    "/": "divided by",
    "%": "mod",
    "mod": "mod"
  };
  function formatArithmetic(op, args, ctx) {
    if (args.length === 1 && op === "-") {
      return `negative ${formatSExprToDomain(args[0], ctx)}`;
    }
    const left = formatSExprToDomain(args[0], ctx);
    const right = formatSExprToDomain(args[1], ctx);
    const opText = ARITHMETIC_TEXT[op] || op;
    return `(${left} ${opText} ${right})`;
  }
  function formatLogical(op, args, ctx) {
    switch (op) {
      case "and":
      case "&&": {
        const parts = args.map((a) => formatSExprToDomain(a, ctx));
        return parts.join(" and ");
      }
      case "or":
      case "||": {
        const parts = args.map((a) => formatSExprToDomain(a, ctx));
        return parts.join(" or ");
      }
      case "not":
      case "!": {
        const inner = formatSExprToDomain(args[0], ctx);
        return `not ${inner}`;
      }
      default:
        return formatGenericOperator(op, args, ctx);
    }
  }
  function formatControl(op, args, ctx) {
    switch (op) {
      case "if": {
        const condition = formatSExprToDomain(args[0], ctx);
        const thenBranch = formatSExprToDomain(args[1], ctx);
        if (args.length > 2) {
          const elseBranch = formatSExprToDomain(args[2], ctx);
          return `if ${condition} then ${thenBranch} else ${elseBranch}`;
        }
        return `if ${condition} then ${thenBranch}`;
      }
      case "cond": {
        const parts = args.map((clauseExpr) => {
          if (isSExpr(clauseExpr)) {
            const clauseArgs = getArgs(clauseExpr);
            const cond = formatSExprToDomain(clauseArgs[0], ctx);
            const result = formatSExprToDomain(clauseArgs[1], ctx);
            return `when ${cond}: ${result}`;
          }
          return formatSExprToDomain(clauseExpr, ctx);
        });
        return parts.join("; ");
      }
      case "do": {
        const parts = args.map((a) => formatSExprToDomain(a, ctx));
        return parts.join(", then ");
      }
      case "let": {
        const bindings = args[0];
        const body = args[1];
        if (isSExpr(bindings)) {
          const bindingArgs = getArgs(bindings);
          const bindingText = [];
          for (let i = 0; i < bindingArgs.length; i += 2) {
            const varName = formatBinding(bindingArgs[i]);
            const varValue = formatSExprToDomain(bindingArgs[i + 1], ctx);
            bindingText.push(`${varName} = ${varValue}`);
          }
          const bodyText = formatSExprToDomain(body, ctx);
          return `let ${bindingText.join(", ")} in ${bodyText}`;
        }
        return formatGenericOperator(op, args, ctx);
      }
      case "when": {
        const condition = formatSExprToDomain(args[0], ctx);
        const effects = args.slice(1).map((a) => formatSExprToDomain(a, ctx));
        return `when ${condition}: ${effects.join(", then ")}`;
      }
      case "unless": {
        const condition = formatSExprToDomain(args[0], ctx);
        const effects = args.slice(1).map((a) => formatSExprToDomain(a, ctx));
        return `unless ${condition}: ${effects.join(", then ")}`;
      }
      case "case": {
        const value = formatSExprToDomain(args[0], ctx);
        const cases = args.slice(1).map((clauseExpr) => {
          if (isSExpr(clauseExpr)) {
            const clauseArgs = getArgs(clauseExpr);
            const pattern = formatSExprToDomain(clauseArgs[0], ctx);
            const result = formatSExprToDomain(clauseArgs[1], ctx);
            return `${pattern}: ${result}`;
          }
          return formatSExprToDomain(clauseExpr, ctx);
        });
        return `case ${value} of ${cases.join("; ")}`;
      }
      default:
        return formatGenericOperator(op, args, ctx);
    }
  }
  function hasComplexPatternProps(patternObj) {
    for (const [key, value] of Object.entries(patternObj)) {
      if (key === "type" || key === "entity") continue;
      if (Array.isArray(value) && value.length > 0) {
        if (typeof value[0] === "object" && value[0] !== null) {
          return true;
        }
      }
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        return true;
      }
    }
    return false;
  }
  function formatSimplePatternProps(patternObj) {
    const props = [];
    for (const [key, value] of Object.entries(patternObj)) {
      if (key === "type" || key === "entity") continue;
      if (value === void 0 || value === null) continue;
      if (Array.isArray(value)) {
        if (value.every((v) => typeof v === "string")) {
          props.push(`${key} [${value.join(", ")}]`);
        }
      } else if (typeof value === "string") {
        props.push(`${key} '${value}'`);
      } else if (typeof value === "number" || typeof value === "boolean") {
        props.push(`${key} ${value}`);
      }
    }
    return props.join(" ");
  }
  function formatEffect(op, args, ctx) {
    switch (op) {
      case "set": {
        const field = formatBinding(args[0]);
        const value = formatSExprToDomain(args[1], ctx);
        return `update ${field} to ${value}`;
      }
      case "emit": {
        const event = args[0];
        if (args.length > 1) {
          const payload = formatSExprToDomain(args[1], ctx);
          return `emit ${event} with ${payload}`;
        }
        return `emit ${event}`;
      }
      case "navigate": {
        const path = args[0];
        if (args.length > 1) {
          const params = formatSExprToDomain(args[1], ctx);
          return `navigate to ${path} with ${params}`;
        }
        return `navigate to ${path}`;
      }
      case "notify": {
        const firstArg = args[0];
        if (typeof firstArg === "object" && firstArg !== null && !Array.isArray(firstArg)) {
          const obj = firstArg;
          const message2 = obj.message || obj.text || "notification";
          const type = obj.type || obj.variant || "info";
          return `show ${type} notification "${message2}"`;
        }
        const message = typeof firstArg === "string" ? firstArg : formatPrimitive(firstArg);
        if (args.length > 1) {
          const type = typeof args[1] === "string" ? args[1] : "info";
          return `show ${type} notification "${message}"`;
        }
        return `notify "${message}"`;
      }
      case "persist": {
        const action = args[0];
        if (args.length > 1) {
          const data = formatSExprToDomain(args[1], ctx);
          return `persist ${action} ${data}`;
        }
        return `persist ${action}`;
      }
      case "spawn": {
        const entityType = args[0];
        if (args.length > 1) {
          const props = formatSExprToDomain(args[1], ctx);
          return `spawn ${entityType} with ${props}`;
        }
        return `spawn ${entityType}`;
      }
      case "despawn": {
        if (args.length > 0) {
          const id = formatSExprToDomain(args[0], ctx);
          return `despawn ${id}`;
        }
        return "despawn this";
      }
      case "call-service": {
        const service = args[0];
        const method = args.length > 1 ? args[1] : "";
        if (method) {
          return `call ${service}.${method}`;
        }
        return `call ${service}`;
      }
      case "render-ui": {
        const slot = args[0];
        const patternArg = args.length > 1 ? args[1] : null;
        if (patternArg === null) {
          return `render null to ${slot}`;
        }
        if (patternArg !== null) {
          if (typeof patternArg === "object" && patternArg !== null && !Array.isArray(patternArg)) {
            const patternObj = patternArg;
            const patternType = patternObj.type;
            const entity = patternObj.entity;
            const hasComplexProps = hasComplexPatternProps(patternObj);
            if (hasComplexProps) {
              return `["render-ui", "${slot}", ${JSON.stringify(patternArg)}]`;
            }
            if (patternType) {
              const propsStr = formatSimplePatternProps(patternObj);
              if (entity && propsStr) {
                return `render ${patternType} to ${slot} for ${entity} with ${propsStr}`;
              }
              if (entity) {
                return `render ${patternType} to ${slot} for ${entity}`;
              }
              if (propsStr) {
                return `render ${patternType} to ${slot} with ${propsStr}`;
              }
              return `render ${patternType} to ${slot}`;
            }
            return `["render-ui", "${slot}", ${JSON.stringify(patternArg)}]`;
          }
          if (isSExpr(patternArg)) {
            return `render ${formatSExprToDomain(patternArg, ctx)} to ${slot}`;
          }
          return `render ${patternArg} to ${slot}`;
        }
        return `render to ${slot}`;
      }
      default:
        return formatGenericOperator(op, args, ctx);
    }
  }
  function formatStdLibrary(op, args, ctx) {
    const [module, fn] = op.split("/");
    switch (module) {
      case "math":
        return formatMathFunction(fn, args, ctx);
      case "str":
        return formatStrFunction(fn, args, ctx);
      case "array":
        return formatArrayFunction(fn, args, ctx);
      case "object":
        return formatObjectFunction(fn, args, ctx);
      case "validate":
        return formatValidateFunction(fn, args, ctx);
      case "time":
        return formatTimeFunction(fn, args, ctx);
      case "format":
        return formatFormatFunction(fn, args, ctx);
      default:
        return formatGenericOperator(op, args, ctx);
    }
  }
  function formatMathFunction(fn, args, ctx) {
    const formattedArgs = args.map((a) => formatSExprToDomain(a, ctx));
    switch (fn) {
      case "abs":
        return `absolute value of ${formattedArgs[0]}`;
      case "min":
        return `minimum of ${formattedArgs.join(", ")}`;
      case "max":
        return `maximum of ${formattedArgs.join(", ")}`;
      case "clamp":
        return `${formattedArgs[0]} clamped between ${formattedArgs[1]} and ${formattedArgs[2]}`;
      case "floor":
        return `floor of ${formattedArgs[0]}`;
      case "ceil":
        return `ceiling of ${formattedArgs[0]}`;
      case "round":
        return `${formattedArgs[0]} rounded`;
      case "sqrt":
        return `square root of ${formattedArgs[0]}`;
      case "pow":
        return `${formattedArgs[0]} to the power of ${formattedArgs[1]}`;
      case "lerp":
        return `lerp from ${formattedArgs[0]} to ${formattedArgs[1]} at ${formattedArgs[2]}`;
      case "random":
        return "random number";
      case "randomInt":
        return `random integer between ${formattedArgs[0]} and ${formattedArgs[1]}`;
      default:
        return `math/${fn}(${formattedArgs.join(", ")})`;
    }
  }
  function formatStrFunction(fn, args, ctx) {
    const formattedArgs = args.map((a) => formatSExprToDomain(a, ctx));
    switch (fn) {
      case "len":
        return `length of ${formattedArgs[0]}`;
      case "upper":
        return `${formattedArgs[0]} uppercase`;
      case "lower":
        return `${formattedArgs[0]} lowercase`;
      case "trim":
        return `${formattedArgs[0]} trimmed`;
      case "split":
        return `${formattedArgs[0]} split by ${formattedArgs[1]}`;
      case "join":
        return `${formattedArgs[0]} joined with ${formattedArgs[1]}`;
      case "includes":
        return `${formattedArgs[0]} contains ${formattedArgs[1]}`;
      case "startsWith":
        return `${formattedArgs[0]} starts with ${formattedArgs[1]}`;
      case "endsWith":
        return `${formattedArgs[0]} ends with ${formattedArgs[1]}`;
      case "replace":
        return `${formattedArgs[0]} with ${formattedArgs[1]} replaced by ${formattedArgs[2]}`;
      case "truncate":
        return `${formattedArgs[0]} truncated to ${formattedArgs[1]} characters`;
      case "template":
        return `template ${formattedArgs[0]} with ${formattedArgs[1]}`;
      default:
        return `str/${fn}(${formattedArgs.join(", ")})`;
    }
  }
  function formatArrayFunction(fn, args, ctx) {
    const formattedArgs = args.map((a) => formatSExprToDomain(a, ctx));
    switch (fn) {
      case "len":
        return `count of ${formattedArgs[0]}`;
      case "first":
        return `first item in ${formattedArgs[0]}`;
      case "last":
        return `last item in ${formattedArgs[0]}`;
      case "filter":
        return `${formattedArgs[0]} filtered where ${formattedArgs[1]}`;
      case "map":
        return `${formattedArgs[0]} transformed by ${formattedArgs[1]}`;
      case "reduce":
        return `${formattedArgs[0]} reduced with ${formattedArgs[1]}`;
      case "find":
        return `find in ${formattedArgs[0]} where ${formattedArgs[1]}`;
      case "some":
        return `any in ${formattedArgs[0]} matches ${formattedArgs[1]}`;
      case "every":
        return `all in ${formattedArgs[0]} match ${formattedArgs[1]}`;
      case "includes":
        return `${formattedArgs[0]} contains ${formattedArgs[1]}`;
      case "sort":
        return `${formattedArgs[0]} sorted`;
      case "sortBy":
        return `${formattedArgs[0]} sorted by ${formattedArgs[1]}`;
      case "reverse":
        return `${formattedArgs[0]} reversed`;
      case "unique":
        return `unique items in ${formattedArgs[0]}`;
      case "flatten":
        return `${formattedArgs[0]} flattened`;
      case "concat":
        return `${formattedArgs.join(" combined with ")}`;
      case "slice":
        return `${formattedArgs[0]} from ${formattedArgs[1]} to ${formattedArgs[2]}`;
      case "take":
        return `first ${formattedArgs[1]} items of ${formattedArgs[0]}`;
      case "drop":
        return `${formattedArgs[0]} without first ${formattedArgs[1]} items`;
      case "groupBy":
        return `${formattedArgs[0]} grouped by ${formattedArgs[1]}`;
      case "sum":
        return `sum of ${formattedArgs[0]}`;
      case "avg":
        return `average of ${formattedArgs[0]}`;
      default:
        return `array/${fn}(${formattedArgs.join(", ")})`;
    }
  }
  function formatObjectFunction(fn, args, ctx) {
    const formattedArgs = args.map((a) => formatSExprToDomain(a, ctx));
    switch (fn) {
      case "get":
        return `${formattedArgs[1]} of ${formattedArgs[0]}`;
      case "set":
        return `${formattedArgs[0]} with ${formattedArgs[1]} set to ${formattedArgs[2]}`;
      case "has":
        return `${formattedArgs[0]} has ${formattedArgs[1]}`;
      case "keys":
        return `keys of ${formattedArgs[0]}`;
      case "values":
        return `values of ${formattedArgs[0]}`;
      case "entries":
        return `entries of ${formattedArgs[0]}`;
      case "merge":
        return `${formattedArgs.join(" merged with ")}`;
      case "pick":
        return `${formattedArgs[0]} with only ${formattedArgs[1]}`;
      case "omit":
        return `${formattedArgs[0]} without ${formattedArgs[1]}`;
      case "empty?":
        return `${formattedArgs[0]} is empty`;
      default:
        return `object/${fn}(${formattedArgs.join(", ")})`;
    }
  }
  function formatValidateFunction(fn, args, ctx) {
    const formattedArgs = args.map((a) => formatSExprToDomain(a, ctx));
    switch (fn) {
      case "required":
        return `${formattedArgs[0]} is required`;
      case "email":
        return `${formattedArgs[0]} is valid email`;
      case "url":
        return `${formattedArgs[0]} is valid URL`;
      case "phone":
        return `${formattedArgs[0]} is valid phone`;
      case "minLength":
        return `${formattedArgs[0]} has at least ${formattedArgs[1]} characters`;
      case "maxLength":
        return `${formattedArgs[0]} has at most ${formattedArgs[1]} characters`;
      case "min":
        return `${formattedArgs[0]} is at least ${formattedArgs[1]}`;
      case "max":
        return `${formattedArgs[0]} is at most ${formattedArgs[1]}`;
      case "range":
        return `${formattedArgs[0]} is between ${formattedArgs[1]} and ${formattedArgs[2]}`;
      case "pattern":
        return `${formattedArgs[0]} matches pattern ${formattedArgs[1]}`;
      default:
        return `validate/${fn}(${formattedArgs.join(", ")})`;
    }
  }
  function formatTimeFunction(fn, args, ctx) {
    const formattedArgs = args.map((a) => formatSExprToDomain(a, ctx));
    switch (fn) {
      case "now":
        return "current time";
      case "today":
        return "today";
      case "format":
        return `${formattedArgs[0]} formatted as ${formattedArgs[1]}`;
      case "add":
        return `${formattedArgs[0]} plus ${formattedArgs[1]} ${formattedArgs[2]}`;
      case "subtract":
        return `${formattedArgs[0]} minus ${formattedArgs[1]} ${formattedArgs[2]}`;
      case "diff":
        return `difference between ${formattedArgs[0]} and ${formattedArgs[1]}`;
      case "isBefore":
        return `${formattedArgs[0]} is before ${formattedArgs[1]}`;
      case "isAfter":
        return `${formattedArgs[0]} is after ${formattedArgs[1]}`;
      case "isBetween":
        return `${formattedArgs[0]} is between ${formattedArgs[1]} and ${formattedArgs[2]}`;
      case "year":
        return `year of ${formattedArgs[0]}`;
      case "month":
        return `month of ${formattedArgs[0]}`;
      case "day":
        return `day of ${formattedArgs[0]}`;
      default:
        return `time/${fn}(${formattedArgs.join(", ")})`;
    }
  }
  function formatFormatFunction(fn, args, ctx) {
    const formattedArgs = args.map((a) => formatSExprToDomain(a, ctx));
    switch (fn) {
      case "number":
        return `${formattedArgs[0]} as number`;
      case "currency":
        return `${formattedArgs[0]} as ${formattedArgs[1]} currency`;
      case "percent":
        return `${formattedArgs[0]} as percentage`;
      case "bytes":
        return `${formattedArgs[0]} as file size`;
      case "ordinal":
        return `${formattedArgs[0]} as ordinal`;
      case "plural":
        return `${formattedArgs[0]} with ${formattedArgs[1]}/${formattedArgs[2]}`;
      case "list":
        return `${formattedArgs[0]} as list`;
      case "phone":
        return `${formattedArgs[0]} as phone number`;
      default:
        return `format/${fn}(${formattedArgs.join(", ")})`;
    }
  }
  function formatGenericOperator(op, args, ctx) {
    if (args.length === 0) {
      return op;
    }
    const formattedArgs = args.map((a) => formatSExprToDomain(a, ctx));
    return `${op}(${formattedArgs.join(", ")})`;
  }

  // src/orbitals/visualizer/index.ts
  var DEFAULT_CONFIG = {
    nodeRadius: 70,
    nodeSpacing: 650,
    // Increased to give more room for transitions
    initialIndicatorOffset: 45,
    arrowSize: 12,
    colors: {
      background: "#0d1117",
      node: "#161b22",
      nodeBorder: "#30363d",
      nodeText: "#e6edf3",
      initialNode: "#238636",
      finalNode: "#f85149",
      arrow: "#8b949e",
      arrowText: "#8b949e",
      effectText: "#ffb86c",
      guardText: "#ff79c6",
      initial: "#238636"
    },
    fonts: {
      node: '18px "Inter", sans-serif',
      event: '16px "JetBrains Mono", monospace',
      effect: '14px "JetBrains Mono", monospace'
    }
  };
  function isBinding(val) {
    return typeof val === "string" && val.startsWith("@");
  }
  function parseBinding(binding) {
    if (!isBinding(binding)) return null;
    const withoutAt = binding.substring(1);
    const parts = withoutAt.split(".");
    return {
      root: parts[0],
      path: parts.slice(1),
      raw: binding
    };
  }
  function formatGuard(guard) {
    let text = "";
    if (typeof guard === "string") {
      text = guard;
    } else if (Array.isArray(guard)) {
      text = formatSExprCompact(guard);
    }
    return text ? `[${text}]` : "";
  }
  function formatGuardHuman(guard, entityName) {
    if (!guard) return "";
    if (typeof guard === "string") {
      return `if ${guard}`;
    }
    if (isArraySExpr(guard)) {
      return formatSExprGuardToDomain(guard, entityName ?? "");
    }
    return "";
  }
  function formatEffectsHuman(effects, entityName) {
    if (!Array.isArray(effects) || effects.length === 0) return [];
    return effects.map((effect) => {
      if (isArraySExpr(effect)) {
        return formatSExprEffectToDomain(effect, entityName ?? "");
      }
      return String(effect);
    }).filter(Boolean);
  }
  function formatSExprCompact(expr) {
    if (!Array.isArray(expr) || expr.length === 0) return "[]";
    const op = expr[0];
    const args = expr.slice(1);
    const formattedArgs = args.map((a) => {
      if (isBinding(a)) {
        const parsed = parseBinding(a);
        if (parsed && parsed.path.length > 0) {
          return `${parsed.root}.${parsed.path.join(".")}`;
        }
        return parsed?.root || a;
      }
      if (typeof a === "string") return a;
      if (typeof a === "number" || typeof a === "boolean") return String(a);
      if (Array.isArray(a)) return formatSExprCompact(a);
      return "{...}";
    });
    return `${op} ${formattedArgs.join(" ")}`;
  }
  function getEffectSummary(effects) {
    if (!Array.isArray(effects) || effects.length === 0) return "";
    const setFields = [];
    const otherEffects = [];
    effects.forEach((effect) => {
      if (!Array.isArray(effect)) return;
      const op = effect[0];
      if (op === "set" && effect[1] && typeof effect[1] === "string") {
        const parsed = parseBinding(effect[1]);
        if (parsed && parsed.path.length > 0) {
          setFields.push(parsed.path[parsed.path.length - 1]);
        } else {
          setFields.push("field");
        }
      } else {
        otherEffects.push(effect);
      }
    });
    const summaries = [];
    if (setFields.length > 0) {
      summaries.push(`\u2192 ${setFields.join(", ")}`);
    }
    otherEffects.forEach((effect) => {
      const op = effect[0];
      switch (op) {
        case "emit":
          summaries.push(`\u2191 ${effect[1] || "event"}`);
          break;
        case "notify":
          summaries.push(`\u{1F4E7} ${effect[1] || ""}`);
          break;
        case "persist":
          summaries.push(`\u{1F4BE} ${effect[1] || "save"}`);
          break;
        case "navigate":
          summaries.push(`\u{1F517} nav`);
          break;
        case "spawn":
          summaries.push(`+ ${effect[1] || "spawn"}`);
          break;
        case "despawn":
          summaries.push(`- despawn`);
          break;
        default:
          summaries.push(op);
      }
    });
    return summaries.join(" | ");
  }
  function extractOutputsFromTransitions(transitions) {
    const outputs = /* @__PURE__ */ new Set();
    transitions.forEach((t) => {
      if (t.effects) {
        t.effects.forEach((effect) => {
          if (Array.isArray(effect)) {
            const op = effect[0];
            if (["emit", "notify", "persist", "navigate", "call-service"].includes(op)) {
              if (isArraySExpr(effect)) {
                const humanText = formatSExprEffectToDomain(effect, "");
                outputs.add(humanText);
              }
            }
          }
        });
      }
    });
    return Array.from(outputs);
  }
  function getNodeRadius(stateName, config) {
    const baseRadius = config.nodeRadius;
    const textLength = stateName.length;
    if (textLength > 12) return baseRadius + 25;
    if (textLength > 8) return baseRadius + 15;
    if (textLength > 6) return baseRadius + 8;
    return baseRadius;
  }
  function calculateLayout(states, transitions, options, config) {
    const positions = {};
    const entityBoxWidth = options.hasEntity ? 200 : 0;
    const outputBoxWidth = options.hasOutputs ? 200 : 0;
    const leftOffset = 100 + entityBoxWidth;
    const initialState = states.find((s) => s.isInitial) || states[0];
    const finalStates = states.filter((s) => s.isFinal);
    const middleStates = states.filter((s) => !s.isInitial && !s.isFinal);
    let maxLabelLength = 0;
    transitions.forEach((t) => {
      if (t.effects && t.effects.length > 0) {
        const summary = getEffectSummary(t.effects);
        maxLabelLength = Math.max(maxLabelLength, summary.length);
      }
      if (t.guard) {
        const guardStr = formatGuard(t.guard);
        maxLabelLength = Math.max(maxLabelLength, guardStr.length);
      }
      if (t.event) {
        maxLabelLength = Math.max(maxLabelLength, t.event.length);
      }
    });
    const labelWidth = Math.min(maxLabelLength * 10, 350);
    const dynamicSpacing = Math.min(Math.max(config.nodeSpacing, labelWidth + 100), 400);
    const stateColumn = {};
    if (initialState) {
      const queue = [{ name: initialState.name, col: 0 }];
      const visited = /* @__PURE__ */ new Set();
      while (queue.length > 0) {
        const { name, col } = queue.shift();
        if (visited.has(name)) continue;
        visited.add(name);
        if (stateColumn[name] === void 0) {
          stateColumn[name] = col;
        }
        transitions.forEach((t) => {
          if (t.from === name && t.from !== t.to && !visited.has(t.to)) {
            queue.push({ name: t.to, col: col + 1 });
          }
        });
      }
    }
    states.forEach((s) => {
      if (stateColumn[s.name] === void 0) {
        stateColumn[s.name] = 0;
      }
    });
    const columns = {};
    Object.entries(stateColumn).forEach(([name, col]) => {
      if (!columns[col]) columns[col] = [];
      columns[col].push(name);
    });
    Object.values(columns).forEach((stateNames) => {
      stateNames.sort((a, b) => {
        const stateA = states.find((s) => s.name === a);
        const stateB = states.find((s) => s.name === b);
        if (stateA?.isInitial) return -1;
        if (stateB?.isInitial) return 1;
        if (stateA?.isFinal && !stateB?.isFinal) return 1;
        if (stateB?.isFinal && !stateA?.isFinal) return -1;
        return a.localeCompare(b);
      });
    });
    const numColumns = Math.max(...Object.keys(columns).map(Number)) + 1;
    const maxRowsInColumn = Math.max(...Object.values(columns).map((arr) => arr.length));
    const minVerticalSpacing = 420;
    const tooltipPadding = 150;
    const width = Math.max(1400, numColumns * dynamicSpacing + entityBoxWidth + outputBoxWidth + 400);
    const height = Math.max(1e3, maxRowsInColumn * minVerticalSpacing + 350 + tooltipPadding);
    Object.entries(columns).forEach(([colStr, stateNames]) => {
      const col = parseInt(colStr);
      const x = leftOffset + col * dynamicSpacing;
      const numInColumn = stateNames.length;
      const verticalSpacing = Math.max(minVerticalSpacing, height / (numInColumn + 1));
      stateNames.forEach((stateName, rowIndex) => {
        const state = states.find((s) => s.name === stateName);
        if (state) {
          const y = verticalSpacing * (rowIndex + 1);
          positions[stateName] = { x, y, state };
        }
      });
    });
    return { positions, width, height: height + 60 };
  }
  function escapeXml(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  function createArrowMarkerSvg(id, color, config) {
    return `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="${config.arrowSize}" markerHeight="${config.arrowSize}" orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" fill="${color}"/>
  </marker>`;
  }
  function drawStateSvg(name, x, y, state, config) {
    const radius = getNodeRadius(name, config);
    let borderColor = config.colors.nodeBorder;
    let borderWidth = 2;
    if (state.isInitial) {
      borderColor = config.colors.initialNode;
      borderWidth = 3;
    } else if (state.isFinal) {
      borderColor = config.colors.finalNode;
      borderWidth = 3;
    }
    let svg = `<g class="state-node">
    <circle cx="${x}" cy="${y}" r="${radius}" fill="${config.colors.node}" stroke="${borderColor}" stroke-width="${borderWidth}"/>`;
    if (state.isFinal) {
      svg += `<circle cx="${x}" cy="${y}" r="${radius - 6}" fill="none" stroke="${borderColor}" stroke-width="2"/>`;
    }
    if (state.isInitial) {
      svg += `<path d="M ${x - radius - config.initialIndicatorOffset} ${y} L ${x - radius - 5} ${y}" stroke="${config.colors.initial}" stroke-width="2" fill="none" marker-end="url(#arrow-initial)"/>`;
    }
    svg += `<text x="${x}" y="${y + 7}" text-anchor="middle" fill="${config.colors.nodeText}" font-family="Inter, sans-serif" font-size="18px" font-weight="600">${escapeXml(name)}</text>`;
    svg += `</g>`;
    return svg;
  }
  function drawTransitionPathSvg(from, to, transitions, positions, config) {
    const fromPos = positions[from];
    const toPos = positions[to];
    if (!fromPos || !toPos) return "";
    const relevantTransitions = transitions.filter((t) => t.from === from && t.to === to);
    if (relevantTransitions.length === 0) return "";
    const fromRadius = getNodeRadius(from, config);
    const toRadius = getNodeRadius(to, config);
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return "";
    const nx = dx / dist;
    const ny = dy / dist;
    const startX = fromPos.x + nx * fromRadius;
    const startY = fromPos.y + ny * fromRadius;
    const endX = toPos.x - nx * (toRadius + 5);
    const endY = toPos.y - ny * (toRadius + 5);
    const hasReverse = transitions.some((t) => t.from === to && t.to === from);
    const isReverse = hasReverse && from > to;
    const baseOffset = hasReverse ? 50 : 30;
    const curveOffset = baseOffset + (relevantTransitions.length > 1 ? 20 : 0);
    const curveDirection = isReverse ? 1 : -1;
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2 + curveOffset * curveDirection;
    return `<path class="transition-path" data-from="${from}" data-to="${to}" d="M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}" stroke="${config.colors.arrow}" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>`;
  }
  function drawTransitionLabelsSvg(from, to, transitions, positions, config) {
    const fromPos = positions[from];
    const toPos = positions[to];
    if (!fromPos || !toPos) return "";
    const relevantTransitions = transitions.filter((t) => t.from === from && t.to === to);
    if (relevantTransitions.length === 0) return "";
    const fromRadius = getNodeRadius(from, config);
    const toRadius = getNodeRadius(to, config);
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return "";
    const nx = dx / dist;
    const ny = dy / dist;
    const startX = fromPos.x + nx * fromRadius;
    const startY = fromPos.y + ny * fromRadius;
    const endX = toPos.x - nx * (toRadius + 5);
    const endY = toPos.y - ny * (toRadius + 5);
    const hasReverse = transitions.some((t) => t.from === to && t.to === from);
    const isReverse = hasReverse && from > to;
    const baseOffset = hasReverse ? 50 : 40;
    const curveOffset = baseOffset + (relevantTransitions.length > 1 ? 25 : 0);
    const curveDirection = isReverse ? 1 : -1;
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2 + curveOffset * curveDirection;
    let svg = "";
    relevantTransitions.forEach((transition, index) => {
      const blockOffset = index * 60 * curveDirection;
      const dataAttrs = `data-from="${from}" data-to="${to}" data-event="${transition.event}"`;
      const labelY = midY + curveDirection * 5 + blockOffset;
      svg += `<g class="transition-group" ${dataAttrs}>`;
      svg += `<text class="transition-label transition-event" x="${midX}" y="${labelY}" text-anchor="middle" fill="${config.colors.arrowText}" font-family="JetBrains Mono, monospace" font-size="14px" font-weight="600">${escapeXml(transition.event)}</text>`;
      const hasGuard = !!transition.guard;
      const guardText = hasGuard ? formatGuardHuman(transition.guard) : "";
      const effectLines = transition.effects ? formatEffectsHuman(transition.effects) : [];
      const hasEffects = effectLines.length > 0;
      if (hasGuard || hasEffects) {
        const tooltipStartY = labelY + 20 * curveDirection;
        const lineHeight = 18;
        const padding = 12;
        let maxTextWidth = 0;
        if (guardText) maxTextWidth = Math.max(maxTextWidth, guardText.length * 7);
        effectLines.forEach((line) => {
          maxTextWidth = Math.max(maxTextWidth, line.length * 7);
        });
        const boxWidth = Math.max(180, Math.min(maxTextWidth + padding * 2 + 20, 400));
        const numLines = (hasGuard ? 1 : 0) + effectLines.length;
        const boxHeight = numLines * lineHeight + padding * 2;
        const boxY = curveDirection > 0 ? tooltipStartY : tooltipStartY - boxHeight;
        svg += `<g class="transition-detail">`;
        svg += `<rect x="${midX - boxWidth / 2}" y="${boxY}" width="${boxWidth}" height="${boxHeight}" fill="rgba(22, 27, 34, 0.95)" stroke="${config.colors.nodeBorder}" stroke-width="1" rx="6"/>`;
        let currentY = boxY + padding + 12;
        if (hasGuard && guardText) {
          svg += `<text x="${midX - boxWidth / 2 + padding}" y="${currentY}" fill="${config.colors.guardText}" font-family="Inter, sans-serif" font-size="12px">`;
          svg += `<tspan font-weight="600">Guard:</tspan> ${escapeXml(guardText)}</text>`;
          currentY += lineHeight;
        }
        if (hasEffects) {
          effectLines.forEach((effectText, idx) => {
            const prefix = idx === 0 ? "Then: " : "      ";
            svg += `<text x="${midX - boxWidth / 2 + padding}" y="${currentY}" fill="${config.colors.effectText}" font-family="Inter, sans-serif" font-size="12px">`;
            svg += `<tspan font-weight="${idx === 0 ? "600" : "400"}">${prefix}</tspan>${escapeXml(effectText)}</text>`;
            currentY += lineHeight;
          });
        }
        svg += `</g>`;
      }
      svg += `</g>`;
    });
    return svg;
  }
  function drawEntityInputSvg(entity, x, y, _height) {
    const fieldCount = entity.fields ? entity.fields.length : 0;
    const boxWidth = 160;
    const boxHeight = Math.max(80, fieldCount * 22 + 50);
    const boxY = y - boxHeight / 2;
    let svg = `<g class="entity-input">
    <rect x="${x}" y="${boxY}" width="${boxWidth}" height="${boxHeight}" fill="#1a1f2e" stroke="#4a9eff" stroke-width="2" rx="8"/>
    <text x="${x + boxWidth / 2}" y="${boxY + 24}" text-anchor="middle" fill="#4a9eff" font-family="Inter, sans-serif" font-size="14px" font-weight="600">\u{1F4E6} ${escapeXml(entity.name || "Entity")}</text>`;
    if (entity.fields && entity.fields.length > 0) {
      entity.fields.forEach((field, idx) => {
        const fieldName = typeof field === "string" ? field : field.name;
        svg += `<text x="${x + 12}" y="${boxY + 48 + idx * 20}" fill="#8b949e" font-family="JetBrains Mono, monospace" font-size="11px">\u2022 ${escapeXml(fieldName)}</text>`;
      });
    }
    svg += `<path d="M ${x + boxWidth + 5} ${y} L ${x + boxWidth + 40} ${y}" stroke="#4a9eff" stroke-width="2" fill="none" marker-end="url(#arrow-input)"/>`;
    svg += `</g>`;
    return svg;
  }
  function drawOutputsSvg(outputs, x, y, height) {
    if (!outputs || outputs.length === 0) return "";
    const maxOutputLength = Math.max(...outputs.map((o) => o.length));
    const boxWidth = Math.max(200, maxOutputLength * 7 + 30);
    const lineHeight = 22;
    const boxHeight = outputs.length * lineHeight + 50;
    const boxY = y - boxHeight / 2;
    let svg = `<g class="outputs">
    <rect x="${x}" y="${boxY}" width="${boxWidth}" height="${boxHeight}" fill="#1a1f2e" stroke="#ffb86c" stroke-width="2" rx="8"/>
    <text x="${x + boxWidth / 2}" y="${boxY + 24}" text-anchor="middle" fill="#ffb86c" font-family="Inter, sans-serif" font-size="13px" font-weight="600">\u{1F4E4} External Effects</text>`;
    outputs.forEach((output, idx) => {
      svg += `<text x="${x + 12}" y="${boxY + 48 + idx * lineHeight}" fill="#e6edf3" font-family="Inter, sans-serif" font-size="11px">\u2022 ${escapeXml(output)}</text>`;
    });
    svg += `</g>`;
    return svg;
  }
  function drawLegendSvg(y, config) {
    const items = [
      { label: "Initial", color: config.colors.initialNode },
      { label: "Final", color: config.colors.finalNode },
      { label: "State", color: config.colors.nodeBorder }
    ];
    let svg = `<g class="legend">`;
    let x = 20;
    items.forEach((item) => {
      svg += `<circle cx="${x}" cy="${y}" r="6" fill="${config.colors.node}" stroke="${item.color}" stroke-width="2"/>`;
      svg += `<text x="${x + 12}" y="${y + 4}" fill="${config.colors.arrowText}" font-family="Inter, sans-serif" font-size="10px">${escapeXml(item.label)}</text>`;
      x += 70;
    });
    svg += `</g>`;
    return svg;
  }
  function renderStateMachineToSvg(stateMachine, options = {}, config = DEFAULT_CONFIG) {
    const states = stateMachine.states || [];
    const transitions = stateMachine.transitions || [];
    const title = options.title || "";
    const entity = options.entity;
    const outputs = extractOutputsFromTransitions(transitions);
    const layoutOptions = {
      hasEntity: !!entity,
      hasOutputs: outputs.length > 0
    };
    const { positions, width, height } = calculateLayout(states, transitions, layoutOptions, config);
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height + 40}" viewBox="0 0 ${width} ${height + 40}" class="orbital-state-machine" style="display: block; max-width: none;">`;
    svg += `<defs>`;
    svg += createArrowMarkerSvg("arrow", config.colors.arrow, config);
    svg += createArrowMarkerSvg("arrow-initial", config.colors.initial, config);
    svg += createArrowMarkerSvg("arrow-input", "#4a9eff", config);
    svg += createArrowMarkerSvg("arrow-output", "#ffb86c", config);
    svg += `</defs>`;
    svg += `<rect x="0" y="0" width="${width}" height="${height + 40}" fill="${config.colors.background}" rx="8"/>`;
    if (title) {
      svg += `<text x="${width / 2}" y="20" text-anchor="middle" fill="${config.colors.nodeText}" font-family="Inter, sans-serif" font-size="14px" font-weight="600">${escapeXml(title)}</text>`;
    }
    const offsetY = title ? 30 : 0;
    svg += `<g transform="translate(0, ${offsetY})">`;
    if (entity) {
      svg += drawEntityInputSvg(entity, 20, height / 2, height);
    }
    const drawnPairs = /* @__PURE__ */ new Set();
    transitions.forEach((transition) => {
      const pairKey = `${transition.from}->${transition.to}`;
      if (!drawnPairs.has(pairKey)) {
        drawnPairs.add(pairKey);
        svg += drawTransitionPathSvg(transition.from, transition.to, transitions, positions, config);
      }
    });
    for (const [name, pos] of Object.entries(positions)) {
      svg += drawStateSvg(name, pos.x, pos.y, pos.state, config);
    }
    drawnPairs.clear();
    transitions.forEach((transition) => {
      const pairKey = `${transition.from}->${transition.to}`;
      if (!drawnPairs.has(pairKey)) {
        drawnPairs.add(pairKey);
        svg += drawTransitionLabelsSvg(transition.from, transition.to, transitions, positions, config);
      }
    });
    if (outputs.length > 0) {
      const maxX = Math.max(...Object.values(positions).map((p) => p.x));
      svg += drawOutputsSvg(outputs, maxX + config.nodeRadius + 60, height / 2, height);
    }
    svg += `</g>`;
    svg += drawLegendSvg(height + 25, config);
    svg += `</svg>`;
    return svg;
  }
  function extractStateMachine(data) {
    if (!data || typeof data !== "object") return null;
    const obj = data;
    if (obj.states && obj.transitions) {
      return obj;
    }
    if (obj.stateMachine) {
      return obj.stateMachine;
    }
    if (Array.isArray(obj.traits)) {
      const traitWithSM = obj.traits.find(
        (t) => typeof t === "object" && t !== null && "stateMachine" in t
      );
      if (traitWithSM && typeof traitWithSM === "object" && "stateMachine" in traitWithSM) {
        return traitWithSM.stateMachine;
      }
    }
    return null;
  }
  function calculateTransitionPathData(from, to, transitions, positions, config) {
    const fromPos = positions[from];
    const toPos = positions[to];
    if (!fromPos || !toPos) return null;
    const relevantTransitions = transitions.filter((t) => t.from === from && t.to === to);
    if (relevantTransitions.length === 0) return null;
    const fromRadius = getNodeRadius(from, config);
    const toRadius = getNodeRadius(to, config);
    if (from === to) {
      const loopRadius = 50;
      const cx = fromPos.x;
      const cy = fromPos.y - fromRadius - loopRadius;
      const startAngle = -0.5;
      const endAngle = 0.5;
      const startX2 = fromPos.x + Math.cos(-Math.PI / 2 + startAngle) * fromRadius;
      const startY2 = fromPos.y + Math.sin(-Math.PI / 2 + startAngle) * fromRadius;
      const endX2 = fromPos.x + Math.cos(-Math.PI / 2 + endAngle) * fromRadius;
      const endY2 = fromPos.y + Math.sin(-Math.PI / 2 + endAngle) * fromRadius;
      const pathData = `M ${startX2} ${startY2} A ${loopRadius} ${loopRadius} 0 1 1 ${endX2} ${endY2}`;
      return {
        pathData,
        labelX: cx,
        labelY: cy - loopRadius * 0.5
      };
    }
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return null;
    const nx = dx / dist;
    const ny = dy / dist;
    const startX = fromPos.x + nx * fromRadius;
    const startY = fromPos.y + ny * fromRadius;
    const endX = toPos.x - nx * (toRadius + 5);
    const endY = toPos.y - ny * (toRadius + 5);
    const hasReverse = transitions.some((t) => t.from === to && t.to === from);
    const isReverse = hasReverse && from > to;
    const baseOffset = hasReverse ? 50 : 30;
    const curveOffset = baseOffset + (relevantTransitions.length > 1 ? 20 : 0);
    const curveDirection = isReverse ? 1 : -1;
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2 + curveOffset * curveDirection;
    return {
      pathData: `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`,
      labelX: midX,
      labelY: midY + curveDirection * 5
    };
  }
  function renderStateMachineToDomData(stateMachine, options = {}, config = DEFAULT_CONFIG) {
    const states = stateMachine.states || [];
    const transitions = stateMachine.transitions || [];
    const title = options.title || "";
    const entity = options.entity;
    const outputs = extractOutputsFromTransitions(transitions);
    const layoutOptions = {
      hasEntity: !!entity,
      hasOutputs: outputs.length > 0
    };
    const { positions, width, height } = calculateLayout(states, transitions, layoutOptions, config);
    const domStates = Object.entries(positions).map(([name, pos]) => ({
      id: `state-${name}`,
      name,
      x: pos.x,
      y: pos.y,
      radius: getNodeRadius(name, config),
      isInitial: pos.state.isInitial ?? false,
      isFinal: pos.state.isFinal ?? false,
      description: pos.state.description
    }));
    const domPaths = [];
    const domLabels = [];
    const drawnPairs = /* @__PURE__ */ new Set();
    transitions.forEach((transition, idx) => {
      const pairKey = `${transition.from}->${transition.to}`;
      if (!drawnPairs.has(pairKey)) {
        drawnPairs.add(pairKey);
        const pathData2 = calculateTransitionPathData(
          transition.from,
          transition.to,
          transitions,
          positions,
          config
        );
        if (pathData2) {
          domPaths.push({
            id: `path-${transition.from}-${transition.to}`,
            from: transition.from,
            to: transition.to,
            pathData: pathData2.pathData,
            labelX: pathData2.labelX,
            labelY: pathData2.labelY
          });
        }
      }
      const guardText = transition.guard ? formatGuardHuman(transition.guard) : void 0;
      const effectTexts = transition.effects ? formatEffectsHuman(transition.effects) : [];
      const hasDetails = !!guardText || effectTexts.length > 0;
      const pathData = calculateTransitionPathData(
        transition.from,
        transition.to,
        transitions,
        positions,
        config
      );
      if (pathData) {
        const sameEventIndex = domLabels.filter(
          (l) => l.from === transition.from && l.to === transition.to
        ).length;
        const labelOffset = sameEventIndex * 60;
        domLabels.push({
          id: `label-${transition.from}-${transition.to}-${idx}`,
          from: transition.from,
          to: transition.to,
          event: transition.event,
          x: pathData.labelX,
          y: pathData.labelY + labelOffset,
          guardText,
          effectTexts,
          hasDetails
        });
      }
    });
    let domEntity;
    if (entity) {
      const fieldCount = entity.fields ? entity.fields.length : 0;
      const boxWidth = 160;
      const boxHeight = Math.max(80, fieldCount * 22 + 50);
      domEntity = {
        name: entity.name || "Entity",
        fields: entity.fields?.map((f) => typeof f === "string" ? f : f.name) || [],
        x: 20,
        y: height / 2 - boxHeight / 2,
        width: boxWidth,
        height: boxHeight
      };
    }
    let domOutputs;
    if (outputs.length > 0) {
      const maxX = Math.max(...Object.values(positions).map((p) => p.x));
      const maxOutputLength = Math.max(...outputs.map((o) => o.length));
      const boxWidth = Math.max(200, maxOutputLength * 7 + 30);
      const lineHeight = 22;
      const boxHeight = outputs.length * lineHeight + 50;
      domOutputs = {
        outputs,
        x: maxX + config.nodeRadius + 300,
        // Increased further to avoid overlap with curved transitions
        y: height / 2 - boxHeight / 2,
        width: boxWidth,
        height: boxHeight
      };
    }
    return {
      width,
      height: height + 40,
      title: title || void 0,
      states: domStates,
      paths: domPaths,
      labels: domLabels,
      entity: domEntity,
      outputs: domOutputs,
      config
    };
  }

  // src/orbitals/visualizer/browser.ts
  function formatSExprHumanReadable(expr, indent = 0) {
    const spaces = "  ".repeat(indent);
    if (typeof expr === "string") {
      if (expr.startsWith("@")) {
        return `<span class="sexpr-binding">${expr}</span>`;
      }
      return `<span class="sexpr-string">"${expr}"</span>`;
    }
    if (typeof expr === "number") {
      return `<span class="sexpr-number">${expr}</span>`;
    }
    if (typeof expr === "boolean") {
      return `<span class="sexpr-boolean">${expr}</span>`;
    }
    if (!Array.isArray(expr) || expr.length === 0) {
      return "[]";
    }
    const op = expr[0];
    const args = expr.slice(1);
    switch (op) {
      case "set":
        return `<span class="sexpr-effect">set</span> ${formatSExprHumanReadable(args[0])} \u2192 ${formatSExprHumanReadable(args[1])}`;
      case "emit":
        return `<span class="sexpr-effect">emit</span> <span class="sexpr-event">${args[0]}</span>${args[1] ? ` with ${formatSExprHumanReadable(args[1])}` : ""}`;
      case "notify":
        return `<span class="sexpr-effect">notify</span> via <span class="sexpr-string">${args[0]}</span>: "${args[1] || ""}"`;
      case "persist":
        return `<span class="sexpr-effect">persist</span> ${args[0]} ${args[1] || ""}`;
      case "navigate":
        return `<span class="sexpr-effect">navigate</span> to <span class="sexpr-string">"${args[0]}"</span>`;
      case "spawn":
        return `<span class="sexpr-effect">spawn</span> <span class="sexpr-entity">${args[0]}</span>`;
      case "despawn":
        return `<span class="sexpr-effect">despawn</span> ${formatSExprHumanReadable(args[0])}`;
      case "call-service":
        return `<span class="sexpr-effect">call-service</span> <span class="sexpr-string">"${args[0]}"</span>`;
      case "do":
        return args.map((a) => formatSExprHumanReadable(a, indent)).join("\n" + spaces);
      // Guards
      case "=":
      case "!=":
      case "<":
      case ">":
      case "<=":
      case ">=":
        return `${formatSExprHumanReadable(args[0])} <span class="sexpr-operator">${op}</span> ${formatSExprHumanReadable(args[1])}`;
      case "and":
        return args.map((a) => formatSExprHumanReadable(a)).join(' <span class="sexpr-operator">AND</span> ');
      case "or":
        return args.map((a) => formatSExprHumanReadable(a)).join(' <span class="sexpr-operator">OR</span> ');
      case "not":
        return `<span class="sexpr-operator">NOT</span> ${formatSExprHumanReadable(args[0])}`;
      default:
        const formattedArgs = args.map((a) => formatSExprHumanReadable(a)).join(", ");
        return `<span class="sexpr-fn">${op}</span>(${formattedArgs})`;
    }
  }
  var currentStateMachine = null;
  function render(container, data, options = {}) {
    const config = { ...DEFAULT_CONFIG, ...options.config };
    const stateMachine = extractStateMachine(data);
    currentStateMachine = stateMachine;
    if (!stateMachine) {
      container.innerHTML = '<p style="color: #8b949e; text-align: center;">No state machine found</p>';
      return;
    }
    let title = options.title || "";
    if (!title && typeof data === "object" && data !== null) {
      const obj = data;
      if (obj.name) title = String(obj.name);
    }
    const entity = options.entity || (typeof data === "object" && data !== null ? data.entity : void 0);
    const svgString = renderStateMachineToSvg(stateMachine, { title, entity }, config);
    container.innerHTML = svgString;
    addInteractivity(container, config, stateMachine);
  }
  function addInteractivity(container, config, stateMachine) {
    const svg = container.querySelector("svg");
    if (!svg) return;
    const style = document.createElement("style");
    style.textContent = `
    @keyframes draw-arrow {
      to { stroke-dashoffset: 0; }
    }
    @keyframes tooltip-fade-in {
      from { opacity: 0; transform: translateX(-50%) translateY(10px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    .orbital-state-machine .state-node {
      cursor: pointer;
      transition: filter 0.2s ease;
    }
    .orbital-state-machine .state-node:hover {
      filter: brightness(1.2);
    }
    .orbital-state-machine .state-node circle {
      transition: stroke-width 0.2s ease, filter 0.2s ease;
    }
    .orbital-state-machine .state-node:hover circle {
      stroke-width: 4;
    }
    .orbital-state-machine .transition-group {
      cursor: pointer;
    }
    .orbital-state-machine .transition-group:hover text {
      fill: #e6edf3 !important;
    }
    .orbital-tooltip {
      animation: tooltip-fade-in 0.2s ease;
      max-width: 400px;
    }
    .orbital-tooltip .tooltip-header {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 8px;
      color: #e6edf3;
      border-bottom: 1px solid #30363d;
      padding-bottom: 8px;
    }
    .orbital-tooltip .tooltip-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      margin-right: 4px;
      background: #30363d;
      color: #8b949e;
    }
    .orbital-tooltip .tooltip-badge.initial {
      background: rgba(35, 134, 54, 0.2);
      color: #238636;
    }
    .orbital-tooltip .tooltip-badge.final {
      background: rgba(248, 81, 73, 0.2);
      color: #f85149;
    }
    .orbital-tooltip .tooltip-section {
      margin-top: 10px;
    }
    .orbital-tooltip .tooltip-section-title {
      font-size: 11px;
      color: #8b949e;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .orbital-tooltip .tooltip-code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      background: #0d1117;
      padding: 8px;
      border-radius: 4px;
      line-height: 1.5;
    }
    .orbital-tooltip .tooltip-code .sexpr-effect {
      color: #ffb86c;
      font-weight: 600;
    }
    .orbital-tooltip .tooltip-code .sexpr-binding {
      color: #79c0ff;
    }
    .orbital-tooltip .tooltip-code .sexpr-string {
      color: #a5d6ff;
    }
    .orbital-tooltip .tooltip-code .sexpr-number {
      color: #ffa657;
    }
    .orbital-tooltip .tooltip-code .sexpr-boolean {
      color: #ff7b72;
    }
    .orbital-tooltip .tooltip-code .sexpr-operator {
      color: #ff79c6;
      font-weight: 600;
    }
    .orbital-tooltip .tooltip-code .sexpr-event {
      color: #7ee787;
    }
    .orbital-tooltip .tooltip-code .sexpr-entity {
      color: #d2a8ff;
    }
    .orbital-tooltip .tooltip-code .sexpr-fn {
      color: #d2a8ff;
    }
    /* Transition filtering styles */
    .orbital-state-machine.filtering .transition-element {
      opacity: 0.15;
      transition: opacity 0.2s ease;
    }
    .orbital-state-machine.filtering .transition-element.highlighted {
      opacity: 1;
    }
    .orbital-state-machine.filtering .state-node {
      opacity: 0.4;
      transition: opacity 0.2s ease;
    }
    .orbital-state-machine.filtering .state-node.highlighted {
      opacity: 1;
    }
    .orbital-state-machine.filtering .transition-path,
    .orbital-state-machine.filtering .transition-label {
      opacity: 0.15;
      transition: opacity 0.2s ease;
    }
    .orbital-state-machine.filtering .transition-path.highlighted,
    .orbital-state-machine.filtering .transition-label.highlighted {
      opacity: 1;
    }
    /* Transition detail reveal on hover */
    .orbital-state-machine .transition-event {
      cursor: pointer;
    }
    .orbital-state-machine .transition-event:hover {
      fill: #e6edf3 !important;
    }
    .orbital-state-machine .transition-path {
      cursor: pointer;
    }
    .orbital-state-machine .transition-detail {
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .orbital-state-machine .transition-group:hover .transition-detail {
      opacity: 1;
      pointer-events: auto;
    }
    .orbital-state-machine .transition-detail.visible {
      opacity: 1 !important;
      pointer-events: auto !important;
    }
  `;
    container.appendChild(style);
    const stateNodes = svg.querySelectorAll(".state-node");
    stateNodes.forEach((node) => {
      const text = node.querySelector("text");
      const stateName = text?.textContent || "";
      node.addEventListener("mouseenter", () => {
        svg.classList.add("filtering");
        node.classList.add("highlighted");
        const connectedStates = /* @__PURE__ */ new Set();
        connectedStates.add(stateName);
        stateMachine.transitions.forEach((t) => {
          if (t.from === stateName) connectedStates.add(t.to);
          if (t.to === stateName) connectedStates.add(t.from);
        });
        stateNodes.forEach((otherNode) => {
          const otherText = otherNode.querySelector("text");
          const otherName = otherText?.textContent || "";
          if (connectedStates.has(otherName)) {
            otherNode.classList.add("highlighted");
          }
        });
        svg.querySelectorAll(".transition-path, .transition-label").forEach((el) => {
          const from = el.getAttribute("data-from");
          const to = el.getAttribute("data-to");
          if (from === stateName || to === stateName) {
            el.classList.add("highlighted");
          }
        });
      });
      node.addEventListener("mouseleave", () => {
        svg.classList.remove("filtering");
        svg.querySelectorAll(".highlighted").forEach((el) => el.classList.remove("highlighted"));
      });
      node.addEventListener("click", (e) => {
        e.stopPropagation();
        const stateData = stateMachine.states.find((s) => s.name === stateName);
        const outgoingTransitions = stateMachine.transitions.filter((t) => t.from === stateName);
        showStateTooltip(container, node, stateData, outgoingTransitions, config);
      });
    });
    const transitionLabels = svg.querySelectorAll("text");
    transitionLabels.forEach((label) => {
      const text = label.textContent || "";
      if (/^[A-Z_]+$/.test(text)) {
        const parent = label.parentElement;
        if (parent) {
          parent.classList.add("transition-group");
          label.addEventListener("click", (e) => {
            e.stopPropagation();
            const transition = stateMachine.transitions.find((t) => t.event === text);
            if (transition) {
              showTransitionDetailTooltip(container, label, transition, config);
            }
          });
        }
      }
    });
    document.addEventListener("click", () => {
      const tooltip = document.body.querySelector(".orbital-tooltip");
      if (tooltip) tooltip.remove();
    });
  }
  function showStateTooltip(container, node, state, outgoingTransitions, config) {
    const existing = document.body.querySelector(".orbital-tooltip");
    if (existing) existing.remove();
    if (!state) return;
    const circle = node.querySelector("circle");
    if (!circle) return;
    const cx = parseFloat(circle.getAttribute("cx") || "0");
    const cy = parseFloat(circle.getAttribute("cy") || "0");
    const r = parseFloat(circle.getAttribute("r") || "0");
    const svg = container.querySelector("svg");
    if (!svg) return;
    const svgRect = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;
    const scaleX = svgRect.width / viewBox.width;
    const scaleY = svgRect.height / viewBox.height;
    const x = cx * scaleX + svgRect.left + window.scrollX;
    const y = (cy - r) * scaleY + svgRect.top + window.scrollY - 10;
    let content = `
    <div class="tooltip-header">${state.name}</div>
    <div class="tooltip-body">
      ${state.isInitial ? '<span class="tooltip-badge initial">Initial State</span>' : ""}
      ${state.isFinal ? '<span class="tooltip-badge final">Final State</span>' : ""}
      ${!state.isInitial && !state.isFinal ? '<span class="tooltip-badge">Intermediate State</span>' : ""}
      ${state.description ? `<p style="margin: 8px 0 0 0; color: #8b949e; font-size: 12px;">${state.description}</p>` : ""}
    </div>
  `;
    if (outgoingTransitions.length > 0) {
      content += `
      <div class="tooltip-section">
        <div class="tooltip-section-title">Outgoing Transitions</div>
        <div class="tooltip-code">
          ${outgoingTransitions.map((t) => `\u2192 <span class="sexpr-event">${t.event}</span> \u2192 ${t.to}`).join("<br>")}
        </div>
      </div>
    `;
    }
    const tooltip = document.createElement("div");
    tooltip.className = "orbital-tooltip";
    tooltip.innerHTML = content;
    tooltip.style.cssText = `
    position: fixed;
    left: ${x - window.scrollX}px;
    top: ${y - window.scrollY}px;
    transform: translateX(-50%) translateY(-100%);
    background: #1a1f2e;
    border: 1px solid ${state.isInitial ? config.colors.initialNode : state.isFinal ? config.colors.finalNode : config.colors.nodeBorder};
    border-radius: 8px;
    padding: 12px 16px;
    color: #e6edf3;
    font-family: Inter, sans-serif;
    font-size: 13px;
    z-index: 99999;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    pointer-events: auto;
  `;
    document.body.appendChild(tooltip);
    tooltip.addEventListener("click", (e) => e.stopPropagation());
  }
  function showTransitionDetailTooltip(container, label, transition, config) {
    const existing = document.body.querySelector(".orbital-tooltip");
    if (existing) existing.remove();
    const svg = container.querySelector("svg");
    if (!svg) return;
    const labelRect = label.getBoundingClientRect();
    const x = labelRect.left + labelRect.width / 2;
    const y = labelRect.top - 10;
    let content = `
    <div class="tooltip-header">${transition.event}</div>
    <div class="tooltip-body">
      <span class="tooltip-badge">${transition.from} \u2192 ${transition.to}</span>
    </div>
  `;
    if (transition.guard) {
      content += `
      <div class="tooltip-section">
        <div class="tooltip-section-title">Guard Condition</div>
        <div class="tooltip-code">
          ${formatSExprHumanReadable(transition.guard)}
        </div>
      </div>
    `;
    }
    if (transition.effects && transition.effects.length > 0) {
      content += `
      <div class="tooltip-section">
        <div class="tooltip-section-title">Effects</div>
        <div class="tooltip-code">
          ${transition.effects.map((e) => formatSExprHumanReadable(e)).join("<br>")}
        </div>
      </div>
    `;
    }
    const tooltip = document.createElement("div");
    tooltip.className = "orbital-tooltip";
    tooltip.innerHTML = content;
    tooltip.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    transform: translateX(-50%) translateY(-100%);
    background: #1a1f2e;
    border: 1px solid #8b949e;
    border-radius: 8px;
    padding: 12px 16px;
    color: #e6edf3;
    font-family: Inter, sans-serif;
    font-size: 13px;
    z-index: 99999;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    pointer-events: auto;
  `;
    document.body.appendChild(tooltip);
    tooltip.addEventListener("click", (e) => e.stopPropagation());
  }
  function init() {
    document.querySelectorAll("[data-orbital-diagram]").forEach((container) => {
      try {
        const dataAttr = container.getAttribute("data-orbital-diagram");
        if (!dataAttr) return;
        const data = JSON.parse(dataAttr);
        const title = container.getAttribute("data-title") || "";
        const useDom = container.getAttribute("data-use-dom") === "true";
        if (useDom) {
          renderDom(container, data, { title });
        } else {
          render(container, data, { title });
        }
      } catch (e) {
        console.error("Failed to parse orbital diagram:", e);
        container.innerHTML = '<p style="color: #f85149;">Failed to render diagram</p>';
      }
    });
  }
  var pinnedTooltip = null;
  function renderDom(container, data, options = {}) {
    const config = { ...DEFAULT_CONFIG, ...options.config };
    const stateMachine = extractStateMachine(data);
    currentStateMachine = stateMachine;
    if (!stateMachine) {
      container.innerHTML = '<p style="color: #8b949e; text-align: center;">No state machine found</p>';
      return;
    }
    let title = options.title || "";
    if (!title && typeof data === "object" && data !== null) {
      const obj = data;
      if (obj.name) title = String(obj.name);
    }
    const entity = options.entity || (typeof data === "object" && data !== null ? data.entity : void 0);
    const layoutData = renderStateMachineToDomData(stateMachine, { title, entity }, config);
    const bundles = bundleTransitions(layoutData.labels);
    container.innerHTML = "";
    container.style.position = "relative";
    container.style.width = layoutData.width + "px";
    container.style.height = layoutData.height + "px";
    container.style.backgroundColor = config.colors.background;
    container.style.borderRadius = "8px";
    container.style.overflow = "visible";
    if (title) {
      const titleEl = document.createElement("div");
      titleEl.style.cssText = `
      position: absolute; left: 0; right: 0; top: 10px;
      text-align: center; font-weight: 600;
      color: ${config.colors.nodeText}; font-size: 14px;
      font-family: Inter, sans-serif;
    `;
      titleEl.textContent = title;
      container.appendChild(titleEl);
    }
    const contentWrapper = document.createElement("div");
    contentWrapper.style.cssText = `
    position: absolute; inset: 0;
    top: ${title ? 30 : 0}px;
  `;
    container.appendChild(contentWrapper);
    if (layoutData.entity) {
      const entityBox = createEntityBox(layoutData.entity);
      contentWrapper.appendChild(entityBox);
    }
    layoutData.states.forEach((state) => {
      const stateNode = createStateNode(state, config);
      contentWrapper.appendChild(stateNode);
    });
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.cssText = `
    position: absolute; inset: 0;
    width: ${layoutData.width}px;
    height: ${layoutData.height - (title ? 30 : 0)}px;
    overflow: visible;
    z-index: 20;
    pointer-events: none;
  `;
    contentWrapper.appendChild(svg);
    bundles.forEach((bundle, idx) => {
      const group = createTransitionBundle(bundle, layoutData.states, idx, bundles.length, config, container);
      if (group) svg.appendChild(group);
    });
    if (layoutData.outputs) {
      const outputsBox = createOutputsBox(layoutData.outputs);
      contentWrapper.appendChild(outputsBox);
    }
    const legend = createLegend(config, layoutData.height);
    container.appendChild(legend);
    addDomStyles();
  }
  function bundleTransitions(labels) {
    const bundleMap = {};
    labels.forEach((label) => {
      const key = `${label.from}->${label.to}`;
      if (!bundleMap[key]) bundleMap[key] = [];
      bundleMap[key].push(label);
    });
    const allPairs = new Set(Object.keys(bundleMap));
    return Object.entries(bundleMap).map(([key, bundleLabels]) => {
      const [from, to] = key.split("->");
      const reverseKey = `${to}->${from}`;
      const isBidirectional = allPairs.has(reverseKey);
      const isReverse = from > to;
      return {
        id: `bundle-${from}-${to}`,
        from,
        to,
        labels: bundleLabels,
        isBidirectional,
        isReverse
      };
    });
  }
  function createStateNode(state, config) {
    const size = state.radius * 2;
    let borderColor = config.colors.nodeBorder;
    let borderWidth = 2;
    if (state.isInitial) {
      borderColor = config.colors.initialNode;
      borderWidth = 3;
    } else if (state.isFinal) {
      borderColor = config.colors.finalNode;
      borderWidth = 3;
    }
    const wrapper = document.createElement("div");
    wrapper.style.cssText = `
    position: absolute;
    left: ${state.x - state.radius}px;
    top: ${state.y - state.radius}px;
    width: ${size}px;
    height: ${size}px;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
    const circle = document.createElement("div");
    circle.style.cssText = `
    position: absolute; inset: 0;
    border-radius: 50%;
    background: ${config.colors.node};
    border: ${borderWidth}px solid ${borderColor};
    display: flex;
    align-items: center;
    justify-content: center;
  `;
    const nameEl = document.createElement("span");
    nameEl.style.cssText = `
    font-weight: 600;
    color: ${config.colors.nodeText};
    font-size: 18px;
    font-family: Inter, sans-serif;
    text-align: center;
    padding: 0 8px;
  `;
    nameEl.textContent = state.name;
    circle.appendChild(nameEl);
    if (state.isFinal) {
      const inner = document.createElement("div");
      inner.style.cssText = `
      position: absolute;
      width: ${size - 12}px;
      height: ${size - 12}px;
      border-radius: 50%;
      border: 2px solid ${borderColor};
    `;
      circle.appendChild(inner);
    }
    wrapper.appendChild(circle);
    if (state.isInitial) {
      const arrowSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      arrowSvg.style.cssText = `
      position: absolute;
      left: -45px;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 20px;
    `;
      arrowSvg.innerHTML = `
      <defs>
        <marker id="init-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="${config.colors.initial}" />
        </marker>
      </defs>
      <path d="M 0 10 L 35 10" stroke="${config.colors.initial}" stroke-width="2" fill="none" marker-end="url(#init-arrow)" />
    `;
      wrapper.appendChild(arrowSvg);
    }
    return wrapper;
  }
  function createTransitionBundle(bundle, states, bundleIndex, totalBundles, config, container) {
    const fromState = states.find((s) => s.name === bundle.from);
    const toState = states.find((s) => s.name === bundle.to);
    if (!fromState || !toState) return null;
    const isSelfLoop = bundle.from === bundle.to;
    const dx = toState.x - fromState.x;
    const dy = toState.y - fromState.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (isSelfLoop) {
      const loopRadius = 50 + bundleIndex * 25;
      const loopDirection = bundleIndex % 2 === 0 ? -1 : 1;
      const cx = fromState.x;
      const cy = fromState.y + (fromState.radius + loopRadius) * loopDirection;
      const startAngle = loopDirection === -1 ? -0.5 : 0.5;
      const endAngle = loopDirection === -1 ? 0.5 : -0.5;
      const startX2 = fromState.x + Math.cos(Math.PI / 2 * loopDirection + startAngle) * fromState.radius;
      const startY2 = fromState.y + Math.sin(Math.PI / 2 * loopDirection + startAngle) * fromState.radius;
      const endX2 = fromState.x + Math.cos(Math.PI / 2 * loopDirection + endAngle) * fromState.radius;
      const endY2 = fromState.y + Math.sin(Math.PI / 2 * loopDirection + endAngle) * fromState.radius;
      const isSingle2 = bundle.labels.length === 1;
      const labelText2 = isSingle2 ? bundle.labels[0].event : `${bundle.labels.length} events`;
      const bundleColor2 = isSingle2 ? config.colors.arrow : "#6366f1";
      const labelWidth2 = labelText2.length * 9 + (isSingle2 ? 24 : 40);
      const loopPath = `M ${startX2} ${startY2} A ${loopRadius} ${loopRadius} 0 1 ${loopDirection === -1 ? 1 : 0} ${endX2} ${endY2}`;
      const labelX2 = cx;
      const labelY2 = cy + loopRadius * loopDirection * 0.5;
      const markerId2 = `arrow-self-${bundle.id}`;
      const group2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
      group2.setAttribute("data-bundle-id", bundle.id);
      group2.setAttribute("cursor", "pointer");
      group2.style.pointerEvents = "auto";
      group2.innerHTML = `
      <defs>
        <marker id="${markerId2}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="${bundleColor2}" />
        </marker>
      </defs>
      <path d="${loopPath}" stroke="${bundleColor2}" stroke-width="${isSingle2 ? 1.5 : 2.5}" fill="none" marker-end="url(#${markerId2})" />
      <rect x="${labelX2 - labelWidth2 / 2}" y="${labelY2 - 14}" width="${labelWidth2}" height="28" rx="${isSingle2 ? 4 : 14}"
            fill="${isSingle2 ? config.colors.background : "#4f46e5"}" stroke="${bundleColor2}" stroke-width="${isSingle2 ? 1 : 0}" />
      <text x="${labelX2}" y="${labelY2 + 5}" text-anchor="middle" fill="${isSingle2 ? config.colors.arrowText : "#ffffff"}"
            font-family="JetBrains Mono, monospace" font-size="13px" font-weight="${isSingle2 ? 600 : 700}">${labelText2}</text>
    `;
      group2.addEventListener("mouseenter", () => {
        if (pinnedTooltip) return;
        showBundleTooltip(container, bundle, labelX2, labelY2, config, false);
      });
      group2.addEventListener("mouseleave", () => {
        if (pinnedTooltip) return;
        hideBundleTooltip();
      });
      group2.addEventListener("click", (e) => {
        e.stopPropagation();
        if (pinnedTooltip?.bundleId === bundle.id) {
          hideBundleTooltip();
          pinnedTooltip = null;
        } else {
          showBundleTooltip(container, bundle, labelX2, labelY2, config, true);
        }
      });
      return group2;
    }
    if (dist === 0) return null;
    const nx = dx / dist;
    const ny = dy / dist;
    const startX = fromState.x + nx * fromState.radius;
    const startY = fromState.y + ny * fromState.radius;
    const endX = toState.x - nx * (toState.radius + 8);
    const endY = toState.y - ny * (toState.radius + 8);
    const baseCurveDirection = bundle.isReverse ? 1 : -1;
    const laneOffset = 55 + bundleIndex * 55;
    const baseOffset = bundle.isBidirectional ? 60 : 40;
    const curveAmount = (baseOffset + laneOffset) * baseCurveDirection;
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const perpX = -ny * curveAmount;
    const perpY = nx * curveAmount;
    const controlX = midX + perpX;
    const controlY = midY + perpY;
    const t = 0.5;
    const labelX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
    const labelY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
    const isSingle = bundle.labels.length === 1;
    const labelText = isSingle ? bundle.labels[0].event : `${bundle.labels.length} events`;
    const labelWidth = labelText.length * 9 + (isSingle ? 24 : 40);
    const bundleColor = isSingle ? config.colors.arrow : "#6366f1";
    const pathD = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("data-bundle-id", bundle.id);
    group.setAttribute("cursor", "pointer");
    group.style.pointerEvents = "auto";
    const markerId = `arrow-${bundle.id}`;
    group.innerHTML = `
    <defs>
      <marker id="${markerId}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${bundleColor}" />
      </marker>
    </defs>
    <path d="${pathD}" stroke="${bundleColor}" stroke-width="${isSingle ? 1.5 : 2.5}" fill="none" marker-end="url(#${markerId})" />
    <rect x="${labelX - labelWidth / 2}" y="${labelY - 14}" width="${labelWidth}" height="28" rx="${isSingle ? 4 : 14}"
          fill="${isSingle ? config.colors.background : "#4f46e5"}" stroke="${bundleColor}" stroke-width="${isSingle ? 1 : 0}" />
    <text x="${labelX}" y="${labelY + 5}" text-anchor="middle" fill="${isSingle ? config.colors.arrowText : "#ffffff"}"
          font-family="JetBrains Mono, monospace" font-size="13px" font-weight="${isSingle ? 600 : 700}">${labelText}</text>
  `;
    group.addEventListener("mouseenter", (e) => {
      if (pinnedTooltip) return;
      showBundleTooltip(container, bundle, labelX, labelY, config, false);
    });
    group.addEventListener("mouseleave", () => {
      if (pinnedTooltip) return;
      hideBundleTooltip();
    });
    group.addEventListener("click", (e) => {
      e.stopPropagation();
      if (pinnedTooltip?.bundleId === bundle.id) {
        hideBundleTooltip();
        pinnedTooltip = null;
      } else {
        showBundleTooltip(container, bundle, labelX, labelY, config, true);
      }
    });
    return group;
  }
  function showBundleTooltip(container, bundle, x, y, config, pinned) {
    hideBundleTooltip();
    const isSingle = bundle.labels.length === 1;
    const containerRect = container.getBoundingClientRect();
    const screenX = containerRect.left + x + window.scrollX;
    const screenY = containerRect.top + y + window.scrollY;
    const estimatedHeight = isSingle ? 80 : 60 + bundle.labels.length * 50;
    const showBelow = screenY - estimatedHeight < 50;
    const tooltip = document.createElement("div");
    tooltip.className = "orbital-dom-tooltip";
    const topPadding = pinned ? 32 : 12;
    tooltip.style.cssText = `
    position: fixed;
    left: ${screenX - window.scrollX}px;
    top: ${screenY - window.scrollY + (showBelow ? 30 : -10)}px;
    transform: translate(-50%, ${showBelow ? "0" : "-100%"});
    background: rgba(22, 27, 34, 0.98);
    border: ${pinned ? 2 : 1}px solid ${pinned ? "#22c55e" : isSingle ? config.colors.nodeBorder : "#6366f1"};
    border-radius: 8px;
    padding: ${topPadding}px 16px 12px 16px;
    color: #e6edf3;
    font-family: Inter, sans-serif;
    font-size: 13px;
    z-index: 99999;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    max-width: 400px;
    max-height: 50vh;
    overflow-y: auto;
    pointer-events: ${pinned ? "auto" : "none"};
  `;
    let content = "";
    if (pinned) {
      content += `
      <div style="position: relative; margin-bottom: 8px; height: 24px;">
        <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%);
                    background: #22c55e; color: #fff; padding: 2px 8px; border-radius: 9999px; font-size: 11px; white-space: nowrap;">
          \u{1F4CC} Pinned
        </div>
        <button onclick="this.closest('.orbital-dom-tooltip').remove(); window._pinnedTooltip = null;" 
                style="position: absolute; top: 0; right: 0; width: 20px; height: 20px;
                       background: #ef4444; border: none; border-radius: 50%; color: #fff;
                       cursor: pointer; font-size: 12px; line-height: 18px;">\xD7</button>
      </div>
    `;
    }
    if (!isSingle) {
      content += `
      <div style="font-weight: 700; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #4f46e5; color: #a5b4fc;">
        ${bundle.from} \u2192 ${bundle.to}
        <span style="background: #4f46e5; color: #fff; padding: 2px 8px; border-radius: 9999px; font-size: 11px; margin-left: 8px;">
          ${bundle.labels.length} events
        </span>
      </div>
    `;
    }
    const maxContentHeight = pinned ? "calc(100vh - 120px)" : "300px";
    content += `<div style="display: flex; flex-direction: column; gap: 8px; max-height: ${maxContentHeight}; overflow-y: auto; overflow-x: hidden;">`;
    bundle.labels.forEach((label, idx) => {
      content += `
      <div style="${!isSingle && idx > 0 ? "padding-top: 8px; border-top: 1px solid #30363d;" : ""} max-width: 100%; overflow: hidden;">
        <div style="font-weight: 600; color: ${config.colors.arrowText}; font-family: JetBrains Mono, monospace; word-break: break-word; overflow-wrap: break-word; white-space: normal; max-width: 100%;">
          ${!isSingle ? '<span style="color: #6b7280;">\u2022 </span>' : ""}${label.event}
        </div>
        ${label.guardText ? `
          <div style="margin-left: 12px; font-size: 12px; color: ${config.colors.guardText}; word-break: break-word; overflow-wrap: break-word; white-space: pre-wrap; max-width: 100%;">
            <span style="font-weight: 600;">if:</span> ${label.guardText}
          </div>
        ` : ""}
        ${label.effectTexts.length > 0 ? label.effectTexts.map((e, i) => `
          <div style="margin-left: 12px; font-size: 12px; color: ${config.colors.effectText}; word-break: break-word; overflow-wrap: break-word; white-space: pre-wrap; max-width: 100%;">
            <span style="font-weight: 600;">${i === 0 ? "\u2192" : " "}</span> ${e}
          </div>
        `).join("") : ""}
      </div>
    `;
    });
    content += "</div>";
    tooltip.innerHTML = content;
    document.body.appendChild(tooltip);
    const rect = tooltip.getBoundingClientRect();
    const margin = 16;
    const containerLeft = containerRect.left;
    const containerTop = containerRect.top;
    const containerRight = containerRect.right;
    const containerBottom = containerRect.bottom;
    let finalLeft = screenX - window.scrollX - rect.width / 2;
    let finalTop = showBelow ? screenY - window.scrollY + 30 : screenY - window.scrollY - 10 - rect.height;
    finalLeft = Math.max(containerLeft + margin, Math.min(finalLeft, containerRight - rect.width - margin));
    finalTop = Math.max(containerTop + margin, finalTop);
    const maxAvailableHeight = containerBottom - finalTop - margin;
    if (rect.height > maxAvailableHeight && maxAvailableHeight > 100) {
      tooltip.style.maxHeight = `${maxAvailableHeight}px`;
    }
    const finalHeight = Math.min(rect.height, maxAvailableHeight > 100 ? maxAvailableHeight : rect.height);
    if (finalTop + finalHeight > containerBottom - margin) {
      finalTop = Math.max(containerTop + margin, containerBottom - finalHeight - margin);
    }
    tooltip.style.left = `${finalLeft}px`;
    tooltip.style.top = `${finalTop}px`;
    tooltip.style.transform = "none";
    if (pinned) {
      pinnedTooltip = { element: tooltip, bundleId: bundle.id };
    }
  }
  function hideBundleTooltip() {
    const existing = document.querySelector(".orbital-dom-tooltip:not([data-pinned])");
    if (existing && !pinnedTooltip) existing.remove();
  }
  function createEntityBox(entity) {
    const box = document.createElement("div");
    box.style.cssText = `
    position: absolute;
    left: ${entity.x}px;
    top: ${entity.y}px;
    width: ${entity.width}px;
    height: ${entity.height}px;
    background: #1a1f2e;
    border: 2px solid #4a9eff;
    border-radius: 8px;
    padding: 12px;
    z-index: 5;
  `;
    box.innerHTML = `
    <div style="text-align: center; font-weight: 600; color: #4a9eff; font-size: 14px; margin-bottom: 8px;">
      \u{1F4E6} ${entity.name}
    </div>
    ${entity.fields.map((f) => `<div style="font-size: 12px; color: #8b949e; font-family: JetBrains Mono, monospace;">\u2022 ${f}</div>`).join("")}
  `;
    return box;
  }
  function createOutputsBox(outputs) {
    const box = document.createElement("div");
    box.style.cssText = `
    position: absolute;
    left: ${outputs.x}px;
    top: ${outputs.y}px;
    width: ${outputs.width}px;
    height: ${outputs.height}px;
    background: #1a1f2e;
    border: 2px solid #ffb86c;
    border-radius: 8px;
    padding: 12px;
    z-index: 5;
  `;
    box.innerHTML = `
    <div style="text-align: center; font-weight: 600; color: #ffb86c; font-size: 13px; margin-bottom: 8px;">
      \u{1F4E4} External Effects
    </div>
    ${outputs.outputs.map((o) => `<div style="font-size: 12px; color: #e6edf3; font-family: Inter, sans-serif; margin-bottom: 2px;">\u2022 ${o}</div>`).join("")}
  `;
    return box;
  }
  function createLegend(config, height) {
    const legend = document.createElement("div");
    legend.style.cssText = `
    position: absolute;
    left: 20px;
    top: ${height - 25}px;
    display: flex;
    gap: 16px;
    z-index: 15;
  `;
    const items = [
      { label: "Initial", color: config.colors.initialNode },
      { label: "Final", color: config.colors.finalNode },
      { label: "State", color: config.colors.nodeBorder },
      { label: "Multi-event", color: "#6366f1", isFilled: true }
    ];
    items.forEach((item) => {
      const el = document.createElement("div");
      el.style.cssText = "display: flex; align-items: center; gap: 6px;";
      el.innerHTML = `
      <div style="width: 12px; height: 12px; border-radius: 50%;
                  ${item.isFilled ? `background: ${item.color};` : `background: ${config.colors.node}; border: 2px solid ${item.color};`}"></div>
      <span style="font-size: 12px; color: ${config.colors.arrowText};">${item.label}</span>
    `;
      legend.appendChild(el);
    });
    return legend;
  }
  function addDomStyles() {
    if (document.getElementById("orbital-dom-styles")) return;
    const style = document.createElement("style");
    style.id = "orbital-dom-styles";
    style.textContent = `
    .orbital-dom-tooltip { animation: tooltip-fade-in 0.2s ease; }
    @keyframes tooltip-fade-in {
      from { opacity: 0; transform: translate(-50%, -100%) translateY(10px); }
      to { opacity: 1; transform: translate(-50%, -100%); }
    }
  `;
    document.head.appendChild(style);
  }
  if (typeof document !== "undefined") {
    document.addEventListener("click", () => {
      if (pinnedTooltip) {
        pinnedTooltip.element.remove();
        pinnedTooltip = null;
      }
    });
  }
  var OrbitalVisualizer = {
    render,
    renderDom,
    init,
    renderToSvg: renderStateMachineToSvg,
    extractStateMachine,
    getEffectSummary,
    extractOutputsFromTransitions,
    formatSExprHumanReadable,
    CONFIG: DEFAULT_CONFIG
  };
  if (typeof window !== "undefined") {
    window.OrbitalVisualizer = OrbitalVisualizer;
    window._pinnedTooltip = pinnedTooltip;
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
  return __toCommonJS(browser_exports);
})();
