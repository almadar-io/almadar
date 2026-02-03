"use strict";
var OrbitalVisualizerModule = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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

  // builder/packages/shared/src/orbitals/visualizer/browser.ts
  var browser_exports = {};
  __export(browser_exports, {
    OrbitalVisualizer: () => OrbitalVisualizer
  });

  // builder/node_modules/zod/v3/external.js
  var external_exports = {};
  __export(external_exports, {
    BRAND: () => BRAND,
    DIRTY: () => DIRTY,
    EMPTY_PATH: () => EMPTY_PATH,
    INVALID: () => INVALID,
    NEVER: () => NEVER,
    OK: () => OK,
    ParseStatus: () => ParseStatus,
    Schema: () => ZodType,
    ZodAny: () => ZodAny,
    ZodArray: () => ZodArray,
    ZodBigInt: () => ZodBigInt,
    ZodBoolean: () => ZodBoolean,
    ZodBranded: () => ZodBranded,
    ZodCatch: () => ZodCatch,
    ZodDate: () => ZodDate,
    ZodDefault: () => ZodDefault,
    ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
    ZodEffects: () => ZodEffects,
    ZodEnum: () => ZodEnum,
    ZodError: () => ZodError,
    ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
    ZodFunction: () => ZodFunction,
    ZodIntersection: () => ZodIntersection,
    ZodIssueCode: () => ZodIssueCode,
    ZodLazy: () => ZodLazy,
    ZodLiteral: () => ZodLiteral,
    ZodMap: () => ZodMap,
    ZodNaN: () => ZodNaN,
    ZodNativeEnum: () => ZodNativeEnum,
    ZodNever: () => ZodNever,
    ZodNull: () => ZodNull,
    ZodNullable: () => ZodNullable,
    ZodNumber: () => ZodNumber,
    ZodObject: () => ZodObject,
    ZodOptional: () => ZodOptional,
    ZodParsedType: () => ZodParsedType,
    ZodPipeline: () => ZodPipeline,
    ZodPromise: () => ZodPromise,
    ZodReadonly: () => ZodReadonly,
    ZodRecord: () => ZodRecord,
    ZodSchema: () => ZodType,
    ZodSet: () => ZodSet,
    ZodString: () => ZodString,
    ZodSymbol: () => ZodSymbol,
    ZodTransformer: () => ZodEffects,
    ZodTuple: () => ZodTuple,
    ZodType: () => ZodType,
    ZodUndefined: () => ZodUndefined,
    ZodUnion: () => ZodUnion,
    ZodUnknown: () => ZodUnknown,
    ZodVoid: () => ZodVoid,
    addIssueToContext: () => addIssueToContext,
    any: () => anyType,
    array: () => arrayType,
    bigint: () => bigIntType,
    boolean: () => booleanType,
    coerce: () => coerce,
    custom: () => custom,
    date: () => dateType,
    datetimeRegex: () => datetimeRegex,
    defaultErrorMap: () => en_default,
    discriminatedUnion: () => discriminatedUnionType,
    effect: () => effectsType,
    enum: () => enumType,
    function: () => functionType,
    getErrorMap: () => getErrorMap,
    getParsedType: () => getParsedType,
    instanceof: () => instanceOfType,
    intersection: () => intersectionType,
    isAborted: () => isAborted,
    isAsync: () => isAsync,
    isDirty: () => isDirty,
    isValid: () => isValid,
    late: () => late,
    lazy: () => lazyType,
    literal: () => literalType,
    makeIssue: () => makeIssue,
    map: () => mapType,
    nan: () => nanType,
    nativeEnum: () => nativeEnumType,
    never: () => neverType,
    null: () => nullType,
    nullable: () => nullableType,
    number: () => numberType,
    object: () => objectType,
    objectUtil: () => objectUtil,
    oboolean: () => oboolean,
    onumber: () => onumber,
    optional: () => optionalType,
    ostring: () => ostring,
    pipeline: () => pipelineType,
    preprocess: () => preprocessType,
    promise: () => promiseType,
    quotelessJson: () => quotelessJson,
    record: () => recordType,
    set: () => setType,
    setErrorMap: () => setErrorMap,
    strictObject: () => strictObjectType,
    string: () => stringType,
    symbol: () => symbolType,
    transformer: () => effectsType,
    tuple: () => tupleType,
    undefined: () => undefinedType,
    union: () => unionType,
    unknown: () => unknownType,
    util: () => util,
    void: () => voidType
  });

  // builder/node_modules/zod/v3/helpers/util.js
  var util;
  (function(util2) {
    util2.assertEqual = (_) => {
    };
    function assertIs(_arg) {
    }
    util2.assertIs = assertIs;
    function assertNever(_x) {
      throw new Error();
    }
    util2.assertNever = assertNever;
    util2.arrayToEnum = (items) => {
      const obj = {};
      for (const item of items) {
        obj[item] = item;
      }
      return obj;
    };
    util2.getValidEnumValues = (obj) => {
      const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
      const filtered = {};
      for (const k of validKeys) {
        filtered[k] = obj[k];
      }
      return util2.objectValues(filtered);
    };
    util2.objectValues = (obj) => {
      return util2.objectKeys(obj).map(function(e) {
        return obj[e];
      });
    };
    util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
      const keys = [];
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          keys.push(key);
        }
      }
      return keys;
    };
    util2.find = (arr, checker) => {
      for (const item of arr) {
        if (checker(item))
          return item;
      }
      return void 0;
    };
    util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
    function joinValues(array, separator = " | ") {
      return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
    }
    util2.joinValues = joinValues;
    util2.jsonStringifyReplacer = (_, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    };
  })(util || (util = {}));
  var objectUtil;
  (function(objectUtil2) {
    objectUtil2.mergeShapes = (first, second) => {
      return {
        ...first,
        ...second
        // second overwrites first
      };
    };
  })(objectUtil || (objectUtil = {}));
  var ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set"
  ]);
  var getParsedType = (data) => {
    const t = typeof data;
    switch (t) {
      case "undefined":
        return ZodParsedType.undefined;
      case "string":
        return ZodParsedType.string;
      case "number":
        return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
      case "boolean":
        return ZodParsedType.boolean;
      case "function":
        return ZodParsedType.function;
      case "bigint":
        return ZodParsedType.bigint;
      case "symbol":
        return ZodParsedType.symbol;
      case "object":
        if (Array.isArray(data)) {
          return ZodParsedType.array;
        }
        if (data === null) {
          return ZodParsedType.null;
        }
        if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
          return ZodParsedType.promise;
        }
        if (typeof Map !== "undefined" && data instanceof Map) {
          return ZodParsedType.map;
        }
        if (typeof Set !== "undefined" && data instanceof Set) {
          return ZodParsedType.set;
        }
        if (typeof Date !== "undefined" && data instanceof Date) {
          return ZodParsedType.date;
        }
        return ZodParsedType.object;
      default:
        return ZodParsedType.unknown;
    }
  };

  // builder/node_modules/zod/v3/ZodError.js
  var ZodIssueCode = util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite"
  ]);
  var quotelessJson = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
  };
  var ZodError = class _ZodError extends Error {
    get errors() {
      return this.issues;
    }
    constructor(issues) {
      super();
      this.issues = [];
      this.addIssue = (sub) => {
        this.issues = [...this.issues, sub];
      };
      this.addIssues = (subs = []) => {
        this.issues = [...this.issues, ...subs];
      };
      const actualProto = new.target.prototype;
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(this, actualProto);
      } else {
        this.__proto__ = actualProto;
      }
      this.name = "ZodError";
      this.issues = issues;
    }
    format(_mapper) {
      const mapper = _mapper || function(issue) {
        return issue.message;
      };
      const fieldErrors = { _errors: [] };
      const processError = (error) => {
        for (const issue of error.issues) {
          if (issue.code === "invalid_union") {
            issue.unionErrors.map(processError);
          } else if (issue.code === "invalid_return_type") {
            processError(issue.returnTypeError);
          } else if (issue.code === "invalid_arguments") {
            processError(issue.argumentsError);
          } else if (issue.path.length === 0) {
            fieldErrors._errors.push(mapper(issue));
          } else {
            let curr = fieldErrors;
            let i = 0;
            while (i < issue.path.length) {
              const el = issue.path[i];
              const terminal = i === issue.path.length - 1;
              if (!terminal) {
                curr[el] = curr[el] || { _errors: [] };
              } else {
                curr[el] = curr[el] || { _errors: [] };
                curr[el]._errors.push(mapper(issue));
              }
              curr = curr[el];
              i++;
            }
          }
        }
      };
      processError(this);
      return fieldErrors;
    }
    static assert(value) {
      if (!(value instanceof _ZodError)) {
        throw new Error(`Not a ZodError: ${value}`);
      }
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(mapper = (issue) => issue.message) {
      const fieldErrors = {};
      const formErrors = [];
      for (const sub of this.issues) {
        if (sub.path.length > 0) {
          const firstEl = sub.path[0];
          fieldErrors[firstEl] = fieldErrors[firstEl] || [];
          fieldErrors[firstEl].push(mapper(sub));
        } else {
          formErrors.push(mapper(sub));
        }
      }
      return { formErrors, fieldErrors };
    }
    get formErrors() {
      return this.flatten();
    }
  };
  ZodError.create = (issues) => {
    const error = new ZodError(issues);
    return error;
  };

  // builder/node_modules/zod/v3/locales/en.js
  var errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
      case ZodIssueCode.invalid_type:
        if (issue.received === ZodParsedType.undefined) {
          message = "Required";
        } else {
          message = `Expected ${issue.expected}, received ${issue.received}`;
        }
        break;
      case ZodIssueCode.invalid_literal:
        message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
        break;
      case ZodIssueCode.unrecognized_keys:
        message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
        break;
      case ZodIssueCode.invalid_union:
        message = `Invalid input`;
        break;
      case ZodIssueCode.invalid_union_discriminator:
        message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
        break;
      case ZodIssueCode.invalid_enum_value:
        message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
        break;
      case ZodIssueCode.invalid_arguments:
        message = `Invalid function arguments`;
        break;
      case ZodIssueCode.invalid_return_type:
        message = `Invalid function return type`;
        break;
      case ZodIssueCode.invalid_date:
        message = `Invalid date`;
        break;
      case ZodIssueCode.invalid_string:
        if (typeof issue.validation === "object") {
          if ("includes" in issue.validation) {
            message = `Invalid input: must include "${issue.validation.includes}"`;
            if (typeof issue.validation.position === "number") {
              message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
            }
          } else if ("startsWith" in issue.validation) {
            message = `Invalid input: must start with "${issue.validation.startsWith}"`;
          } else if ("endsWith" in issue.validation) {
            message = `Invalid input: must end with "${issue.validation.endsWith}"`;
          } else {
            util.assertNever(issue.validation);
          }
        } else if (issue.validation !== "regex") {
          message = `Invalid ${issue.validation}`;
        } else {
          message = "Invalid";
        }
        break;
      case ZodIssueCode.too_small:
        if (issue.type === "array")
          message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
        else if (issue.type === "string")
          message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
        else if (issue.type === "number")
          message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
        else if (issue.type === "bigint")
          message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
        else if (issue.type === "date")
          message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
        else
          message = "Invalid input";
        break;
      case ZodIssueCode.too_big:
        if (issue.type === "array")
          message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
        else if (issue.type === "string")
          message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
        else if (issue.type === "number")
          message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
        else if (issue.type === "bigint")
          message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
        else if (issue.type === "date")
          message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
        else
          message = "Invalid input";
        break;
      case ZodIssueCode.custom:
        message = `Invalid input`;
        break;
      case ZodIssueCode.invalid_intersection_types:
        message = `Intersection results could not be merged`;
        break;
      case ZodIssueCode.not_multiple_of:
        message = `Number must be a multiple of ${issue.multipleOf}`;
        break;
      case ZodIssueCode.not_finite:
        message = "Number must be finite";
        break;
      default:
        message = _ctx.defaultError;
        util.assertNever(issue);
    }
    return { message };
  };
  var en_default = errorMap;

  // builder/node_modules/zod/v3/errors.js
  var overrideErrorMap = en_default;
  function setErrorMap(map) {
    overrideErrorMap = map;
  }
  function getErrorMap() {
    return overrideErrorMap;
  }

  // builder/node_modules/zod/v3/helpers/parseUtil.js
  var makeIssue = (params) => {
    const { data, path, errorMaps, issueData } = params;
    const fullPath = [...path, ...issueData.path || []];
    const fullIssue = {
      ...issueData,
      path: fullPath
    };
    if (issueData.message !== void 0) {
      return {
        ...issueData,
        path: fullPath,
        message: issueData.message
      };
    }
    let errorMessage = "";
    const maps = errorMaps.filter((m) => !!m).slice().reverse();
    for (const map of maps) {
      errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
    }
    return {
      ...issueData,
      path: fullPath,
      message: errorMessage
    };
  };
  var EMPTY_PATH = [];
  function addIssueToContext(ctx, issueData) {
    const overrideMap = getErrorMap();
    const issue = makeIssue({
      issueData,
      data: ctx.data,
      path: ctx.path,
      errorMaps: [
        ctx.common.contextualErrorMap,
        // contextual error map is first priority
        ctx.schemaErrorMap,
        // then schema-bound map if available
        overrideMap,
        // then global override map
        overrideMap === en_default ? void 0 : en_default
        // then global default map
      ].filter((x) => !!x)
    });
    ctx.common.issues.push(issue);
  }
  var ParseStatus = class _ParseStatus {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      if (this.value === "valid")
        this.value = "dirty";
    }
    abort() {
      if (this.value !== "aborted")
        this.value = "aborted";
    }
    static mergeArray(status, results) {
      const arrayValue = [];
      for (const s of results) {
        if (s.status === "aborted")
          return INVALID;
        if (s.status === "dirty")
          status.dirty();
        arrayValue.push(s.value);
      }
      return { status: status.value, value: arrayValue };
    }
    static async mergeObjectAsync(status, pairs) {
      const syncPairs = [];
      for (const pair of pairs) {
        const key = await pair.key;
        const value = await pair.value;
        syncPairs.push({
          key,
          value
        });
      }
      return _ParseStatus.mergeObjectSync(status, syncPairs);
    }
    static mergeObjectSync(status, pairs) {
      const finalObject = {};
      for (const pair of pairs) {
        const { key, value } = pair;
        if (key.status === "aborted")
          return INVALID;
        if (value.status === "aborted")
          return INVALID;
        if (key.status === "dirty")
          status.dirty();
        if (value.status === "dirty")
          status.dirty();
        if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
          finalObject[key.value] = value.value;
        }
      }
      return { status: status.value, value: finalObject };
    }
  };
  var INVALID = Object.freeze({
    status: "aborted"
  });
  var DIRTY = (value) => ({ status: "dirty", value });
  var OK = (value) => ({ status: "valid", value });
  var isAborted = (x) => x.status === "aborted";
  var isDirty = (x) => x.status === "dirty";
  var isValid = (x) => x.status === "valid";
  var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

  // builder/node_modules/zod/v3/helpers/errorUtil.js
  var errorUtil;
  (function(errorUtil2) {
    errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
    errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
  })(errorUtil || (errorUtil = {}));

  // builder/node_modules/zod/v3/types.js
  var ParseInputLazyPath = class {
    constructor(parent, value, path, key) {
      this._cachedPath = [];
      this.parent = parent;
      this.data = value;
      this._path = path;
      this._key = key;
    }
    get path() {
      if (!this._cachedPath.length) {
        if (Array.isArray(this._key)) {
          this._cachedPath.push(...this._path, ...this._key);
        } else {
          this._cachedPath.push(...this._path, this._key);
        }
      }
      return this._cachedPath;
    }
  };
  var handleResult = (ctx, result) => {
    if (isValid(result)) {
      return { success: true, data: result.value };
    } else {
      if (!ctx.common.issues.length) {
        throw new Error("Validation failed but no issues detected.");
      }
      return {
        success: false,
        get error() {
          if (this._error)
            return this._error;
          const error = new ZodError(ctx.common.issues);
          this._error = error;
          return this._error;
        }
      };
    }
  };
  function processCreateParams(params) {
    if (!params)
      return {};
    const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
    if (errorMap2 && (invalid_type_error || required_error)) {
      throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap2)
      return { errorMap: errorMap2, description };
    const customMap = (iss, ctx) => {
      const { message } = params;
      if (iss.code === "invalid_enum_value") {
        return { message: message ?? ctx.defaultError };
      }
      if (typeof ctx.data === "undefined") {
        return { message: message ?? required_error ?? ctx.defaultError };
      }
      if (iss.code !== "invalid_type")
        return { message: ctx.defaultError };
      return { message: message ?? invalid_type_error ?? ctx.defaultError };
    };
    return { errorMap: customMap, description };
  }
  var ZodType = class {
    get description() {
      return this._def.description;
    }
    _getType(input) {
      return getParsedType(input.data);
    }
    _getOrReturnCtx(input, ctx) {
      return ctx || {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      };
    }
    _processInputParams(input) {
      return {
        status: new ParseStatus(),
        ctx: {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        }
      };
    }
    _parseSync(input) {
      const result = this._parse(input);
      if (isAsync(result)) {
        throw new Error("Synchronous parse encountered promise.");
      }
      return result;
    }
    _parseAsync(input) {
      const result = this._parse(input);
      return Promise.resolve(result);
    }
    parse(data, params) {
      const result = this.safeParse(data, params);
      if (result.success)
        return result.data;
      throw result.error;
    }
    safeParse(data, params) {
      const ctx = {
        common: {
          issues: [],
          async: params?.async ?? false,
          contextualErrorMap: params?.errorMap
        },
        path: params?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data,
        parsedType: getParsedType(data)
      };
      const result = this._parseSync({ data, path: ctx.path, parent: ctx });
      return handleResult(ctx, result);
    }
    "~validate"(data) {
      const ctx = {
        common: {
          issues: [],
          async: !!this["~standard"].async
        },
        path: [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data,
        parsedType: getParsedType(data)
      };
      if (!this["~standard"].async) {
        try {
          const result = this._parseSync({ data, path: [], parent: ctx });
          return isValid(result) ? {
            value: result.value
          } : {
            issues: ctx.common.issues
          };
        } catch (err) {
          if (err?.message?.toLowerCase()?.includes("encountered")) {
            this["~standard"].async = true;
          }
          ctx.common = {
            issues: [],
            async: true
          };
        }
      }
      return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
        value: result.value
      } : {
        issues: ctx.common.issues
      });
    }
    async parseAsync(data, params) {
      const result = await this.safeParseAsync(data, params);
      if (result.success)
        return result.data;
      throw result.error;
    }
    async safeParseAsync(data, params) {
      const ctx = {
        common: {
          issues: [],
          contextualErrorMap: params?.errorMap,
          async: true
        },
        path: params?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data,
        parsedType: getParsedType(data)
      };
      const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
      const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
      return handleResult(ctx, result);
    }
    refine(check, message) {
      const getIssueProperties = (val) => {
        if (typeof message === "string" || typeof message === "undefined") {
          return { message };
        } else if (typeof message === "function") {
          return message(val);
        } else {
          return message;
        }
      };
      return this._refinement((val, ctx) => {
        const result = check(val);
        const setError = () => ctx.addIssue({
          code: ZodIssueCode.custom,
          ...getIssueProperties(val)
        });
        if (typeof Promise !== "undefined" && result instanceof Promise) {
          return result.then((data) => {
            if (!data) {
              setError();
              return false;
            } else {
              return true;
            }
          });
        }
        if (!result) {
          setError();
          return false;
        } else {
          return true;
        }
      });
    }
    refinement(check, refinementData) {
      return this._refinement((val, ctx) => {
        if (!check(val)) {
          ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
          return false;
        } else {
          return true;
        }
      });
    }
    _refinement(refinement) {
      return new ZodEffects({
        schema: this,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect: { type: "refinement", refinement }
      });
    }
    superRefine(refinement) {
      return this._refinement(refinement);
    }
    constructor(def) {
      this.spa = this.safeParseAsync;
      this._def = def;
      this.parse = this.parse.bind(this);
      this.safeParse = this.safeParse.bind(this);
      this.parseAsync = this.parseAsync.bind(this);
      this.safeParseAsync = this.safeParseAsync.bind(this);
      this.spa = this.spa.bind(this);
      this.refine = this.refine.bind(this);
      this.refinement = this.refinement.bind(this);
      this.superRefine = this.superRefine.bind(this);
      this.optional = this.optional.bind(this);
      this.nullable = this.nullable.bind(this);
      this.nullish = this.nullish.bind(this);
      this.array = this.array.bind(this);
      this.promise = this.promise.bind(this);
      this.or = this.or.bind(this);
      this.and = this.and.bind(this);
      this.transform = this.transform.bind(this);
      this.brand = this.brand.bind(this);
      this.default = this.default.bind(this);
      this.catch = this.catch.bind(this);
      this.describe = this.describe.bind(this);
      this.pipe = this.pipe.bind(this);
      this.readonly = this.readonly.bind(this);
      this.isNullable = this.isNullable.bind(this);
      this.isOptional = this.isOptional.bind(this);
      this["~standard"] = {
        version: 1,
        vendor: "zod",
        validate: (data) => this["~validate"](data)
      };
    }
    optional() {
      return ZodOptional.create(this, this._def);
    }
    nullable() {
      return ZodNullable.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return ZodArray.create(this);
    }
    promise() {
      return ZodPromise.create(this, this._def);
    }
    or(option) {
      return ZodUnion.create([this, option], this._def);
    }
    and(incoming) {
      return ZodIntersection.create(this, incoming, this._def);
    }
    transform(transform) {
      return new ZodEffects({
        ...processCreateParams(this._def),
        schema: this,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect: { type: "transform", transform }
      });
    }
    default(def) {
      const defaultValueFunc = typeof def === "function" ? def : () => def;
      return new ZodDefault({
        ...processCreateParams(this._def),
        innerType: this,
        defaultValue: defaultValueFunc,
        typeName: ZodFirstPartyTypeKind.ZodDefault
      });
    }
    brand() {
      return new ZodBranded({
        typeName: ZodFirstPartyTypeKind.ZodBranded,
        type: this,
        ...processCreateParams(this._def)
      });
    }
    catch(def) {
      const catchValueFunc = typeof def === "function" ? def : () => def;
      return new ZodCatch({
        ...processCreateParams(this._def),
        innerType: this,
        catchValue: catchValueFunc,
        typeName: ZodFirstPartyTypeKind.ZodCatch
      });
    }
    describe(description) {
      const This = this.constructor;
      return new This({
        ...this._def,
        description
      });
    }
    pipe(target) {
      return ZodPipeline.create(this, target);
    }
    readonly() {
      return ZodReadonly.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  };
  var cuidRegex = /^c[^\s-]{8,}$/i;
  var cuid2Regex = /^[0-9a-z]+$/;
  var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
  var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
  var nanoidRegex = /^[a-z0-9_-]{21}$/i;
  var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
  var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
  var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
  var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
  var emojiRegex;
  var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
  var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
  var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
  var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
  var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
  var dateRegex = new RegExp(`^${dateRegexSource}$`);
  function timeRegexSource(args) {
    let secondsRegexSource = `[0-5]\\d`;
    if (args.precision) {
      secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
    } else if (args.precision == null) {
      secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
    }
    const secondsQuantifier = args.precision ? "+" : "?";
    return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
  }
  function timeRegex(args) {
    return new RegExp(`^${timeRegexSource(args)}$`);
  }
  function datetimeRegex(args) {
    let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
    const opts = [];
    opts.push(args.local ? `Z?` : `Z`);
    if (args.offset)
      opts.push(`([+-]\\d{2}:?\\d{2})`);
    regex = `${regex}(${opts.join("|")})`;
    return new RegExp(`^${regex}$`);
  }
  function isValidIP(ip, version) {
    if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
      return true;
    }
    if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
      return true;
    }
    return false;
  }
  function isValidJWT(jwt, alg) {
    if (!jwtRegex.test(jwt))
      return false;
    try {
      const [header] = jwt.split(".");
      if (!header)
        return false;
      const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
      const decoded = JSON.parse(atob(base64));
      if (typeof decoded !== "object" || decoded === null)
        return false;
      if ("typ" in decoded && decoded?.typ !== "JWT")
        return false;
      if (!decoded.alg)
        return false;
      if (alg && decoded.alg !== alg)
        return false;
      return true;
    } catch {
      return false;
    }
  }
  function isValidCidr(ip, version) {
    if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
      return true;
    }
    if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
      return true;
    }
    return false;
  }
  var ZodString = class _ZodString extends ZodType {
    _parse(input) {
      if (this._def.coerce) {
        input.data = String(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.string) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.string,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      const status = new ParseStatus();
      let ctx = void 0;
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          if (input.data.length < check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: false,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          if (input.data.length > check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: false,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "length") {
          const tooBig = input.data.length > check.value;
          const tooSmall = input.data.length < check.value;
          if (tooBig || tooSmall) {
            ctx = this._getOrReturnCtx(input, ctx);
            if (tooBig) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: true,
                message: check.message
              });
            } else if (tooSmall) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "string",
                inclusive: true,
                exact: true,
                message: check.message
              });
            }
            status.dirty();
          }
        } else if (check.kind === "email") {
          if (!emailRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "email",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "emoji") {
          if (!emojiRegex) {
            emojiRegex = new RegExp(_emojiRegex, "u");
          }
          if (!emojiRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "emoji",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "uuid") {
          if (!uuidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "uuid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "nanoid") {
          if (!nanoidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "nanoid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "cuid") {
          if (!cuidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "cuid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "cuid2") {
          if (!cuid2Regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "cuid2",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "ulid") {
          if (!ulidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "ulid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "url") {
          try {
            new URL(input.data);
          } catch {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "url",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "regex") {
          check.regex.lastIndex = 0;
          const testResult = check.regex.test(input.data);
          if (!testResult) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "regex",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "trim") {
          input.data = input.data.trim();
        } else if (check.kind === "includes") {
          if (!input.data.includes(check.value, check.position)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: { includes: check.value, position: check.position },
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "toLowerCase") {
          input.data = input.data.toLowerCase();
        } else if (check.kind === "toUpperCase") {
          input.data = input.data.toUpperCase();
        } else if (check.kind === "startsWith") {
          if (!input.data.startsWith(check.value)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: { startsWith: check.value },
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "endsWith") {
          if (!input.data.endsWith(check.value)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: { endsWith: check.value },
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "datetime") {
          const regex = datetimeRegex(check);
          if (!regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: "datetime",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "date") {
          const regex = dateRegex;
          if (!regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: "date",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "time") {
          const regex = timeRegex(check);
          if (!regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: "time",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "duration") {
          if (!durationRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "duration",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "ip") {
          if (!isValidIP(input.data, check.version)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "ip",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "jwt") {
          if (!isValidJWT(input.data, check.alg)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "jwt",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "cidr") {
          if (!isValidCidr(input.data, check.version)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "cidr",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "base64") {
          if (!base64Regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "base64",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "base64url") {
          if (!base64urlRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "base64url",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return { status: status.value, value: input.data };
    }
    _regex(regex, validation, message) {
      return this.refinement((data) => regex.test(data), {
        validation,
        code: ZodIssueCode.invalid_string,
        ...errorUtil.errToObj(message)
      });
    }
    _addCheck(check) {
      return new _ZodString({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    email(message) {
      return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
    }
    url(message) {
      return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
    }
    emoji(message) {
      return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
    }
    uuid(message) {
      return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
    }
    nanoid(message) {
      return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
    }
    cuid(message) {
      return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
    }
    cuid2(message) {
      return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
    }
    ulid(message) {
      return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
    }
    base64(message) {
      return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
    }
    base64url(message) {
      return this._addCheck({
        kind: "base64url",
        ...errorUtil.errToObj(message)
      });
    }
    jwt(options) {
      return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
    }
    ip(options) {
      return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
    }
    cidr(options) {
      return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
    }
    datetime(options) {
      if (typeof options === "string") {
        return this._addCheck({
          kind: "datetime",
          precision: null,
          offset: false,
          local: false,
          message: options
        });
      }
      return this._addCheck({
        kind: "datetime",
        precision: typeof options?.precision === "undefined" ? null : options?.precision,
        offset: options?.offset ?? false,
        local: options?.local ?? false,
        ...errorUtil.errToObj(options?.message)
      });
    }
    date(message) {
      return this._addCheck({ kind: "date", message });
    }
    time(options) {
      if (typeof options === "string") {
        return this._addCheck({
          kind: "time",
          precision: null,
          message: options
        });
      }
      return this._addCheck({
        kind: "time",
        precision: typeof options?.precision === "undefined" ? null : options?.precision,
        ...errorUtil.errToObj(options?.message)
      });
    }
    duration(message) {
      return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
    }
    regex(regex, message) {
      return this._addCheck({
        kind: "regex",
        regex,
        ...errorUtil.errToObj(message)
      });
    }
    includes(value, options) {
      return this._addCheck({
        kind: "includes",
        value,
        position: options?.position,
        ...errorUtil.errToObj(options?.message)
      });
    }
    startsWith(value, message) {
      return this._addCheck({
        kind: "startsWith",
        value,
        ...errorUtil.errToObj(message)
      });
    }
    endsWith(value, message) {
      return this._addCheck({
        kind: "endsWith",
        value,
        ...errorUtil.errToObj(message)
      });
    }
    min(minLength, message) {
      return this._addCheck({
        kind: "min",
        value: minLength,
        ...errorUtil.errToObj(message)
      });
    }
    max(maxLength, message) {
      return this._addCheck({
        kind: "max",
        value: maxLength,
        ...errorUtil.errToObj(message)
      });
    }
    length(len, message) {
      return this._addCheck({
        kind: "length",
        value: len,
        ...errorUtil.errToObj(message)
      });
    }
    /**
     * Equivalent to `.min(1)`
     */
    nonempty(message) {
      return this.min(1, errorUtil.errToObj(message));
    }
    trim() {
      return new _ZodString({
        ...this._def,
        checks: [...this._def.checks, { kind: "trim" }]
      });
    }
    toLowerCase() {
      return new _ZodString({
        ...this._def,
        checks: [...this._def.checks, { kind: "toLowerCase" }]
      });
    }
    toUpperCase() {
      return new _ZodString({
        ...this._def,
        checks: [...this._def.checks, { kind: "toUpperCase" }]
      });
    }
    get isDatetime() {
      return !!this._def.checks.find((ch) => ch.kind === "datetime");
    }
    get isDate() {
      return !!this._def.checks.find((ch) => ch.kind === "date");
    }
    get isTime() {
      return !!this._def.checks.find((ch) => ch.kind === "time");
    }
    get isDuration() {
      return !!this._def.checks.find((ch) => ch.kind === "duration");
    }
    get isEmail() {
      return !!this._def.checks.find((ch) => ch.kind === "email");
    }
    get isURL() {
      return !!this._def.checks.find((ch) => ch.kind === "url");
    }
    get isEmoji() {
      return !!this._def.checks.find((ch) => ch.kind === "emoji");
    }
    get isUUID() {
      return !!this._def.checks.find((ch) => ch.kind === "uuid");
    }
    get isNANOID() {
      return !!this._def.checks.find((ch) => ch.kind === "nanoid");
    }
    get isCUID() {
      return !!this._def.checks.find((ch) => ch.kind === "cuid");
    }
    get isCUID2() {
      return !!this._def.checks.find((ch) => ch.kind === "cuid2");
    }
    get isULID() {
      return !!this._def.checks.find((ch) => ch.kind === "ulid");
    }
    get isIP() {
      return !!this._def.checks.find((ch) => ch.kind === "ip");
    }
    get isCIDR() {
      return !!this._def.checks.find((ch) => ch.kind === "cidr");
    }
    get isBase64() {
      return !!this._def.checks.find((ch) => ch.kind === "base64");
    }
    get isBase64url() {
      return !!this._def.checks.find((ch) => ch.kind === "base64url");
    }
    get minLength() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min;
    }
    get maxLength() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max;
    }
  };
  ZodString.create = (params) => {
    return new ZodString({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodString,
      coerce: params?.coerce ?? false,
      ...processCreateParams(params)
    });
  };
  function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepDecCount = (step.toString().split(".")[1] || "").length;
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
    return valInt % stepInt / 10 ** decCount;
  }
  var ZodNumber = class _ZodNumber extends ZodType {
    constructor() {
      super(...arguments);
      this.min = this.gte;
      this.max = this.lte;
      this.step = this.multipleOf;
    }
    _parse(input) {
      if (this._def.coerce) {
        input.data = Number(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.number) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.number,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      let ctx = void 0;
      const status = new ParseStatus();
      for (const check of this._def.checks) {
        if (check.kind === "int") {
          if (!util.isInteger(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_type,
              expected: "integer",
              received: "float",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "min") {
          const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
          if (tooSmall) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "number",
              inclusive: check.inclusive,
              exact: false,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
          if (tooBig) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "number",
              inclusive: check.inclusive,
              exact: false,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "multipleOf") {
          if (floatSafeRemainder(input.data, check.value) !== 0) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_multiple_of,
              multipleOf: check.value,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "finite") {
          if (!Number.isFinite(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_finite,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return { status: status.value, value: input.data };
    }
    gte(value, message) {
      return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
      return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
      return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
      return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
      return new _ZodNumber({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind,
            value,
            inclusive,
            message: errorUtil.toString(message)
          }
        ]
      });
    }
    _addCheck(check) {
      return new _ZodNumber({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    int(message) {
      return this._addCheck({
        kind: "int",
        message: errorUtil.toString(message)
      });
    }
    positive(message) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    negative(message) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    nonpositive(message) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    nonnegative(message) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    multipleOf(value, message) {
      return this._addCheck({
        kind: "multipleOf",
        value,
        message: errorUtil.toString(message)
      });
    }
    finite(message) {
      return this._addCheck({
        kind: "finite",
        message: errorUtil.toString(message)
      });
    }
    safe(message) {
      return this._addCheck({
        kind: "min",
        inclusive: true,
        value: Number.MIN_SAFE_INTEGER,
        message: errorUtil.toString(message)
      })._addCheck({
        kind: "max",
        inclusive: true,
        value: Number.MAX_SAFE_INTEGER,
        message: errorUtil.toString(message)
      });
    }
    get minValue() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min;
    }
    get maxValue() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max;
    }
    get isInt() {
      return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
    }
    get isFinite() {
      let max = null;
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
          return true;
        } else if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        } else if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return Number.isFinite(min) && Number.isFinite(max);
    }
  };
  ZodNumber.create = (params) => {
    return new ZodNumber({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodNumber,
      coerce: params?.coerce || false,
      ...processCreateParams(params)
    });
  };
  var ZodBigInt = class _ZodBigInt extends ZodType {
    constructor() {
      super(...arguments);
      this.min = this.gte;
      this.max = this.lte;
    }
    _parse(input) {
      if (this._def.coerce) {
        try {
          input.data = BigInt(input.data);
        } catch {
          return this._getInvalidInput(input);
        }
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.bigint) {
        return this._getInvalidInput(input);
      }
      let ctx = void 0;
      const status = new ParseStatus();
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
          if (tooSmall) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              type: "bigint",
              minimum: check.value,
              inclusive: check.inclusive,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
          if (tooBig) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              type: "bigint",
              maximum: check.value,
              inclusive: check.inclusive,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "multipleOf") {
          if (input.data % check.value !== BigInt(0)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_multiple_of,
              multipleOf: check.value,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return { status: status.value, value: input.data };
    }
    _getInvalidInput(input) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.bigint,
        received: ctx.parsedType
      });
      return INVALID;
    }
    gte(value, message) {
      return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
      return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
      return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
      return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
      return new _ZodBigInt({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind,
            value,
            inclusive,
            message: errorUtil.toString(message)
          }
        ]
      });
    }
    _addCheck(check) {
      return new _ZodBigInt({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    positive(message) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    negative(message) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    nonpositive(message) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    nonnegative(message) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    multipleOf(value, message) {
      return this._addCheck({
        kind: "multipleOf",
        value,
        message: errorUtil.toString(message)
      });
    }
    get minValue() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min;
    }
    get maxValue() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max;
    }
  };
  ZodBigInt.create = (params) => {
    return new ZodBigInt({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodBigInt,
      coerce: params?.coerce ?? false,
      ...processCreateParams(params)
    });
  };
  var ZodBoolean = class extends ZodType {
    _parse(input) {
      if (this._def.coerce) {
        input.data = Boolean(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.boolean) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.boolean,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodBoolean.create = (params) => {
    return new ZodBoolean({
      typeName: ZodFirstPartyTypeKind.ZodBoolean,
      coerce: params?.coerce || false,
      ...processCreateParams(params)
    });
  };
  var ZodDate = class _ZodDate extends ZodType {
    _parse(input) {
      if (this._def.coerce) {
        input.data = new Date(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.date) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.date,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      if (Number.isNaN(input.data.getTime())) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_date
        });
        return INVALID;
      }
      const status = new ParseStatus();
      let ctx = void 0;
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          if (input.data.getTime() < check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              message: check.message,
              inclusive: true,
              exact: false,
              minimum: check.value,
              type: "date"
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          if (input.data.getTime() > check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              message: check.message,
              inclusive: true,
              exact: false,
              maximum: check.value,
              type: "date"
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return {
        status: status.value,
        value: new Date(input.data.getTime())
      };
    }
    _addCheck(check) {
      return new _ZodDate({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    min(minDate, message) {
      return this._addCheck({
        kind: "min",
        value: minDate.getTime(),
        message: errorUtil.toString(message)
      });
    }
    max(maxDate, message) {
      return this._addCheck({
        kind: "max",
        value: maxDate.getTime(),
        message: errorUtil.toString(message)
      });
    }
    get minDate() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min != null ? new Date(min) : null;
    }
    get maxDate() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max != null ? new Date(max) : null;
    }
  };
  ZodDate.create = (params) => {
    return new ZodDate({
      checks: [],
      coerce: params?.coerce || false,
      typeName: ZodFirstPartyTypeKind.ZodDate,
      ...processCreateParams(params)
    });
  };
  var ZodSymbol = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.symbol) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.symbol,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodSymbol.create = (params) => {
    return new ZodSymbol({
      typeName: ZodFirstPartyTypeKind.ZodSymbol,
      ...processCreateParams(params)
    });
  };
  var ZodUndefined = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.undefined) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.undefined,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodUndefined.create = (params) => {
    return new ZodUndefined({
      typeName: ZodFirstPartyTypeKind.ZodUndefined,
      ...processCreateParams(params)
    });
  };
  var ZodNull = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.null) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.null,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodNull.create = (params) => {
    return new ZodNull({
      typeName: ZodFirstPartyTypeKind.ZodNull,
      ...processCreateParams(params)
    });
  };
  var ZodAny = class extends ZodType {
    constructor() {
      super(...arguments);
      this._any = true;
    }
    _parse(input) {
      return OK(input.data);
    }
  };
  ZodAny.create = (params) => {
    return new ZodAny({
      typeName: ZodFirstPartyTypeKind.ZodAny,
      ...processCreateParams(params)
    });
  };
  var ZodUnknown = class extends ZodType {
    constructor() {
      super(...arguments);
      this._unknown = true;
    }
    _parse(input) {
      return OK(input.data);
    }
  };
  ZodUnknown.create = (params) => {
    return new ZodUnknown({
      typeName: ZodFirstPartyTypeKind.ZodUnknown,
      ...processCreateParams(params)
    });
  };
  var ZodNever = class extends ZodType {
    _parse(input) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.never,
        received: ctx.parsedType
      });
      return INVALID;
    }
  };
  ZodNever.create = (params) => {
    return new ZodNever({
      typeName: ZodFirstPartyTypeKind.ZodNever,
      ...processCreateParams(params)
    });
  };
  var ZodVoid = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.undefined) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.void,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodVoid.create = (params) => {
    return new ZodVoid({
      typeName: ZodFirstPartyTypeKind.ZodVoid,
      ...processCreateParams(params)
    });
  };
  var ZodArray = class _ZodArray extends ZodType {
    _parse(input) {
      const { ctx, status } = this._processInputParams(input);
      const def = this._def;
      if (ctx.parsedType !== ZodParsedType.array) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.array,
          received: ctx.parsedType
        });
        return INVALID;
      }
      if (def.exactLength !== null) {
        const tooBig = ctx.data.length > def.exactLength.value;
        const tooSmall = ctx.data.length < def.exactLength.value;
        if (tooBig || tooSmall) {
          addIssueToContext(ctx, {
            code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
            minimum: tooSmall ? def.exactLength.value : void 0,
            maximum: tooBig ? def.exactLength.value : void 0,
            type: "array",
            inclusive: true,
            exact: true,
            message: def.exactLength.message
          });
          status.dirty();
        }
      }
      if (def.minLength !== null) {
        if (ctx.data.length < def.minLength.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: def.minLength.value,
            type: "array",
            inclusive: true,
            exact: false,
            message: def.minLength.message
          });
          status.dirty();
        }
      }
      if (def.maxLength !== null) {
        if (ctx.data.length > def.maxLength.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: def.maxLength.value,
            type: "array",
            inclusive: true,
            exact: false,
            message: def.maxLength.message
          });
          status.dirty();
        }
      }
      if (ctx.common.async) {
        return Promise.all([...ctx.data].map((item, i) => {
          return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        })).then((result2) => {
          return ParseStatus.mergeArray(status, result2);
        });
      }
      const result = [...ctx.data].map((item, i) => {
        return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      });
      return ParseStatus.mergeArray(status, result);
    }
    get element() {
      return this._def.type;
    }
    min(minLength, message) {
      return new _ZodArray({
        ...this._def,
        minLength: { value: minLength, message: errorUtil.toString(message) }
      });
    }
    max(maxLength, message) {
      return new _ZodArray({
        ...this._def,
        maxLength: { value: maxLength, message: errorUtil.toString(message) }
      });
    }
    length(len, message) {
      return new _ZodArray({
        ...this._def,
        exactLength: { value: len, message: errorUtil.toString(message) }
      });
    }
    nonempty(message) {
      return this.min(1, message);
    }
  };
  ZodArray.create = (schema, params) => {
    return new ZodArray({
      type: schema,
      minLength: null,
      maxLength: null,
      exactLength: null,
      typeName: ZodFirstPartyTypeKind.ZodArray,
      ...processCreateParams(params)
    });
  };
  function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
      const newShape = {};
      for (const key in schema.shape) {
        const fieldSchema = schema.shape[key];
        newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
      }
      return new ZodObject({
        ...schema._def,
        shape: () => newShape
      });
    } else if (schema instanceof ZodArray) {
      return new ZodArray({
        ...schema._def,
        type: deepPartialify(schema.element)
      });
    } else if (schema instanceof ZodOptional) {
      return ZodOptional.create(deepPartialify(schema.unwrap()));
    } else if (schema instanceof ZodNullable) {
      return ZodNullable.create(deepPartialify(schema.unwrap()));
    } else if (schema instanceof ZodTuple) {
      return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
    } else {
      return schema;
    }
  }
  var ZodObject = class _ZodObject extends ZodType {
    constructor() {
      super(...arguments);
      this._cached = null;
      this.nonstrict = this.passthrough;
      this.augment = this.extend;
    }
    _getCached() {
      if (this._cached !== null)
        return this._cached;
      const shape = this._def.shape();
      const keys = util.objectKeys(shape);
      this._cached = { shape, keys };
      return this._cached;
    }
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.object) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      const { status, ctx } = this._processInputParams(input);
      const { shape, keys: shapeKeys } = this._getCached();
      const extraKeys = [];
      if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
        for (const key in ctx.data) {
          if (!shapeKeys.includes(key)) {
            extraKeys.push(key);
          }
        }
      }
      const pairs = [];
      for (const key of shapeKeys) {
        const keyValidator = shape[key];
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
      if (this._def.catchall instanceof ZodNever) {
        const unknownKeys = this._def.unknownKeys;
        if (unknownKeys === "passthrough") {
          for (const key of extraKeys) {
            pairs.push({
              key: { status: "valid", value: key },
              value: { status: "valid", value: ctx.data[key] }
            });
          }
        } else if (unknownKeys === "strict") {
          if (extraKeys.length > 0) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.unrecognized_keys,
              keys: extraKeys
            });
            status.dirty();
          }
        } else if (unknownKeys === "strip") {
        } else {
          throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
        }
      } else {
        const catchall = this._def.catchall;
        for (const key of extraKeys) {
          const value = ctx.data[key];
          pairs.push({
            key: { status: "valid", value: key },
            value: catchall._parse(
              new ParseInputLazyPath(ctx, value, ctx.path, key)
              //, ctx.child(key), value, getParsedType(value)
            ),
            alwaysSet: key in ctx.data
          });
        }
      }
      if (ctx.common.async) {
        return Promise.resolve().then(async () => {
          const syncPairs = [];
          for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            syncPairs.push({
              key,
              value,
              alwaysSet: pair.alwaysSet
            });
          }
          return syncPairs;
        }).then((syncPairs) => {
          return ParseStatus.mergeObjectSync(status, syncPairs);
        });
      } else {
        return ParseStatus.mergeObjectSync(status, pairs);
      }
    }
    get shape() {
      return this._def.shape();
    }
    strict(message) {
      errorUtil.errToObj;
      return new _ZodObject({
        ...this._def,
        unknownKeys: "strict",
        ...message !== void 0 ? {
          errorMap: (issue, ctx) => {
            const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
            if (issue.code === "unrecognized_keys")
              return {
                message: errorUtil.errToObj(message).message ?? defaultError
              };
            return {
              message: defaultError
            };
          }
        } : {}
      });
    }
    strip() {
      return new _ZodObject({
        ...this._def,
        unknownKeys: "strip"
      });
    }
    passthrough() {
      return new _ZodObject({
        ...this._def,
        unknownKeys: "passthrough"
      });
    }
    // const AugmentFactory =
    //   <Def extends ZodObjectDef>(def: Def) =>
    //   <Augmentation extends ZodRawShape>(
    //     augmentation: Augmentation
    //   ): ZodObject<
    //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
    //     Def["unknownKeys"],
    //     Def["catchall"]
    //   > => {
    //     return new ZodObject({
    //       ...def,
    //       shape: () => ({
    //         ...def.shape(),
    //         ...augmentation,
    //       }),
    //     }) as any;
    //   };
    extend(augmentation) {
      return new _ZodObject({
        ...this._def,
        shape: () => ({
          ...this._def.shape(),
          ...augmentation
        })
      });
    }
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge(merging) {
      const merged = new _ZodObject({
        unknownKeys: merging._def.unknownKeys,
        catchall: merging._def.catchall,
        shape: () => ({
          ...this._def.shape(),
          ...merging._def.shape()
        }),
        typeName: ZodFirstPartyTypeKind.ZodObject
      });
      return merged;
    }
    // merge<
    //   Incoming extends AnyZodObject,
    //   Augmentation extends Incoming["shape"],
    //   NewOutput extends {
    //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
    //       ? Augmentation[k]["_output"]
    //       : k extends keyof Output
    //       ? Output[k]
    //       : never;
    //   },
    //   NewInput extends {
    //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
    //       ? Augmentation[k]["_input"]
    //       : k extends keyof Input
    //       ? Input[k]
    //       : never;
    //   }
    // >(
    //   merging: Incoming
    // ): ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"],
    //   NewOutput,
    //   NewInput
    // > {
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    setKey(key, schema) {
      return this.augment({ [key]: schema });
    }
    // merge<Incoming extends AnyZodObject>(
    //   merging: Incoming
    // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
    // ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"]
    // > {
    //   // const mergedShape = objectUtil.mergeShapes(
    //   //   this._def.shape(),
    //   //   merging._def.shape()
    //   // );
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    catchall(index) {
      return new _ZodObject({
        ...this._def,
        catchall: index
      });
    }
    pick(mask) {
      const shape = {};
      for (const key of util.objectKeys(mask)) {
        if (mask[key] && this.shape[key]) {
          shape[key] = this.shape[key];
        }
      }
      return new _ZodObject({
        ...this._def,
        shape: () => shape
      });
    }
    omit(mask) {
      const shape = {};
      for (const key of util.objectKeys(this.shape)) {
        if (!mask[key]) {
          shape[key] = this.shape[key];
        }
      }
      return new _ZodObject({
        ...this._def,
        shape: () => shape
      });
    }
    /**
     * @deprecated
     */
    deepPartial() {
      return deepPartialify(this);
    }
    partial(mask) {
      const newShape = {};
      for (const key of util.objectKeys(this.shape)) {
        const fieldSchema = this.shape[key];
        if (mask && !mask[key]) {
          newShape[key] = fieldSchema;
        } else {
          newShape[key] = fieldSchema.optional();
        }
      }
      return new _ZodObject({
        ...this._def,
        shape: () => newShape
      });
    }
    required(mask) {
      const newShape = {};
      for (const key of util.objectKeys(this.shape)) {
        if (mask && !mask[key]) {
          newShape[key] = this.shape[key];
        } else {
          const fieldSchema = this.shape[key];
          let newField = fieldSchema;
          while (newField instanceof ZodOptional) {
            newField = newField._def.innerType;
          }
          newShape[key] = newField;
        }
      }
      return new _ZodObject({
        ...this._def,
        shape: () => newShape
      });
    }
    keyof() {
      return createZodEnum(util.objectKeys(this.shape));
    }
  };
  ZodObject.create = (shape, params) => {
    return new ZodObject({
      shape: () => shape,
      unknownKeys: "strip",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(params)
    });
  };
  ZodObject.strictCreate = (shape, params) => {
    return new ZodObject({
      shape: () => shape,
      unknownKeys: "strict",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(params)
    });
  };
  ZodObject.lazycreate = (shape, params) => {
    return new ZodObject({
      shape,
      unknownKeys: "strip",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(params)
    });
  };
  var ZodUnion = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const options = this._def.options;
      function handleResults(results) {
        for (const result of results) {
          if (result.result.status === "valid") {
            return result.result;
          }
        }
        for (const result of results) {
          if (result.result.status === "dirty") {
            ctx.common.issues.push(...result.ctx.common.issues);
            return result.result;
          }
        }
        const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union,
          unionErrors
        });
        return INVALID;
      }
      if (ctx.common.async) {
        return Promise.all(options.map(async (option) => {
          const childCtx = {
            ...ctx,
            common: {
              ...ctx.common,
              issues: []
            },
            parent: null
          };
          return {
            result: await option._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            }),
            ctx: childCtx
          };
        })).then(handleResults);
      } else {
        let dirty = void 0;
        const issues = [];
        for (const option of options) {
          const childCtx = {
            ...ctx,
            common: {
              ...ctx.common,
              issues: []
            },
            parent: null
          };
          const result = option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          });
          if (result.status === "valid") {
            return result;
          } else if (result.status === "dirty" && !dirty) {
            dirty = { result, ctx: childCtx };
          }
          if (childCtx.common.issues.length) {
            issues.push(childCtx.common.issues);
          }
        }
        if (dirty) {
          ctx.common.issues.push(...dirty.ctx.common.issues);
          return dirty.result;
        }
        const unionErrors = issues.map((issues2) => new ZodError(issues2));
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union,
          unionErrors
        });
        return INVALID;
      }
    }
    get options() {
      return this._def.options;
    }
  };
  ZodUnion.create = (types, params) => {
    return new ZodUnion({
      options: types,
      typeName: ZodFirstPartyTypeKind.ZodUnion,
      ...processCreateParams(params)
    });
  };
  var getDiscriminator = (type) => {
    if (type instanceof ZodLazy) {
      return getDiscriminator(type.schema);
    } else if (type instanceof ZodEffects) {
      return getDiscriminator(type.innerType());
    } else if (type instanceof ZodLiteral) {
      return [type.value];
    } else if (type instanceof ZodEnum) {
      return type.options;
    } else if (type instanceof ZodNativeEnum) {
      return util.objectValues(type.enum);
    } else if (type instanceof ZodDefault) {
      return getDiscriminator(type._def.innerType);
    } else if (type instanceof ZodUndefined) {
      return [void 0];
    } else if (type instanceof ZodNull) {
      return [null];
    } else if (type instanceof ZodOptional) {
      return [void 0, ...getDiscriminator(type.unwrap())];
    } else if (type instanceof ZodNullable) {
      return [null, ...getDiscriminator(type.unwrap())];
    } else if (type instanceof ZodBranded) {
      return getDiscriminator(type.unwrap());
    } else if (type instanceof ZodReadonly) {
      return getDiscriminator(type.unwrap());
    } else if (type instanceof ZodCatch) {
      return getDiscriminator(type._def.innerType);
    } else {
      return [];
    }
  };
  var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.object) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const discriminator = this.discriminator;
      const discriminatorValue = ctx.data[discriminator];
      const option = this.optionsMap.get(discriminatorValue);
      if (!option) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [discriminator]
        });
        return INVALID;
      }
      if (ctx.common.async) {
        return option._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
      } else {
        return option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
      }
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */
    static create(discriminator, options, params) {
      const optionsMap = /* @__PURE__ */ new Map();
      for (const type of options) {
        const discriminatorValues = getDiscriminator(type.shape[discriminator]);
        if (!discriminatorValues.length) {
          throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
        }
        for (const value of discriminatorValues) {
          if (optionsMap.has(value)) {
            throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
          }
          optionsMap.set(value, type);
        }
      }
      return new _ZodDiscriminatedUnion({
        typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
        discriminator,
        options,
        optionsMap,
        ...processCreateParams(params)
      });
    }
  };
  function mergeValues(a, b) {
    const aType = getParsedType(a);
    const bType = getParsedType(b);
    if (a === b) {
      return { valid: true, data: a };
    } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
      const bKeys = util.objectKeys(b);
      const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
      const newObj = { ...a, ...b };
      for (const key of sharedKeys) {
        const sharedValue = mergeValues(a[key], b[key]);
        if (!sharedValue.valid) {
          return { valid: false };
        }
        newObj[key] = sharedValue.data;
      }
      return { valid: true, data: newObj };
    } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
      if (a.length !== b.length) {
        return { valid: false };
      }
      const newArray = [];
      for (let index = 0; index < a.length; index++) {
        const itemA = a[index];
        const itemB = b[index];
        const sharedValue = mergeValues(itemA, itemB);
        if (!sharedValue.valid) {
          return { valid: false };
        }
        newArray.push(sharedValue.data);
      }
      return { valid: true, data: newArray };
    } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
      return { valid: true, data: a };
    } else {
      return { valid: false };
    }
  }
  var ZodIntersection = class extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      const handleParsed = (parsedLeft, parsedRight) => {
        if (isAborted(parsedLeft) || isAborted(parsedRight)) {
          return INVALID;
        }
        const merged = mergeValues(parsedLeft.value, parsedRight.value);
        if (!merged.valid) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_intersection_types
          });
          return INVALID;
        }
        if (isDirty(parsedLeft) || isDirty(parsedRight)) {
          status.dirty();
        }
        return { status: status.value, value: merged.data };
      };
      if (ctx.common.async) {
        return Promise.all([
          this._def.left._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }),
          this._def.right._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          })
        ]).then(([left, right]) => handleParsed(left, right));
      } else {
        return handleParsed(this._def.left._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }), this._def.right._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }));
      }
    }
  };
  ZodIntersection.create = (left, right, params) => {
    return new ZodIntersection({
      left,
      right,
      typeName: ZodFirstPartyTypeKind.ZodIntersection,
      ...processCreateParams(params)
    });
  };
  var ZodTuple = class _ZodTuple extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.array) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.array,
          received: ctx.parsedType
        });
        return INVALID;
      }
      if (ctx.data.length < this._def.items.length) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: this._def.items.length,
          inclusive: true,
          exact: false,
          type: "array"
        });
        return INVALID;
      }
      const rest = this._def.rest;
      if (!rest && ctx.data.length > this._def.items.length) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: this._def.items.length,
          inclusive: true,
          exact: false,
          type: "array"
        });
        status.dirty();
      }
      const items = [...ctx.data].map((item, itemIndex) => {
        const schema = this._def.items[itemIndex] || this._def.rest;
        if (!schema)
          return null;
        return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
      }).filter((x) => !!x);
      if (ctx.common.async) {
        return Promise.all(items).then((results) => {
          return ParseStatus.mergeArray(status, results);
        });
      } else {
        return ParseStatus.mergeArray(status, items);
      }
    }
    get items() {
      return this._def.items;
    }
    rest(rest) {
      return new _ZodTuple({
        ...this._def,
        rest
      });
    }
  };
  ZodTuple.create = (schemas, params) => {
    if (!Array.isArray(schemas)) {
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    }
    return new ZodTuple({
      items: schemas,
      typeName: ZodFirstPartyTypeKind.ZodTuple,
      rest: null,
      ...processCreateParams(params)
    });
  };
  var ZodRecord = class _ZodRecord extends ZodType {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.object) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const pairs = [];
      const keyType = this._def.keyType;
      const valueType = this._def.valueType;
      for (const key in ctx.data) {
        pairs.push({
          key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
          value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
      if (ctx.common.async) {
        return ParseStatus.mergeObjectAsync(status, pairs);
      } else {
        return ParseStatus.mergeObjectSync(status, pairs);
      }
    }
    get element() {
      return this._def.valueType;
    }
    static create(first, second, third) {
      if (second instanceof ZodType) {
        return new _ZodRecord({
          keyType: first,
          valueType: second,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(third)
        });
      }
      return new _ZodRecord({
        keyType: ZodString.create(),
        valueType: first,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(second)
      });
    }
  };
  var ZodMap = class extends ZodType {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.map) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.map,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const keyType = this._def.keyType;
      const valueType = this._def.valueType;
      const pairs = [...ctx.data.entries()].map(([key, value], index) => {
        return {
          key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
          value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
        };
      });
      if (ctx.common.async) {
        const finalMap = /* @__PURE__ */ new Map();
        return Promise.resolve().then(async () => {
          for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return { status: status.value, value: finalMap };
        });
      } else {
        const finalMap = /* @__PURE__ */ new Map();
        for (const pair of pairs) {
          const key = pair.key;
          const value = pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      }
    }
  };
  ZodMap.create = (keyType, valueType, params) => {
    return new ZodMap({
      valueType,
      keyType,
      typeName: ZodFirstPartyTypeKind.ZodMap,
      ...processCreateParams(params)
    });
  };
  var ZodSet = class _ZodSet extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.set) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.set,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const def = this._def;
      if (def.minSize !== null) {
        if (ctx.data.size < def.minSize.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: def.minSize.value,
            type: "set",
            inclusive: true,
            exact: false,
            message: def.minSize.message
          });
          status.dirty();
        }
      }
      if (def.maxSize !== null) {
        if (ctx.data.size > def.maxSize.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: def.maxSize.value,
            type: "set",
            inclusive: true,
            exact: false,
            message: def.maxSize.message
          });
          status.dirty();
        }
      }
      const valueType = this._def.valueType;
      function finalizeSet(elements2) {
        const parsedSet = /* @__PURE__ */ new Set();
        for (const element of elements2) {
          if (element.status === "aborted")
            return INVALID;
          if (element.status === "dirty")
            status.dirty();
          parsedSet.add(element.value);
        }
        return { status: status.value, value: parsedSet };
      }
      const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
      if (ctx.common.async) {
        return Promise.all(elements).then((elements2) => finalizeSet(elements2));
      } else {
        return finalizeSet(elements);
      }
    }
    min(minSize, message) {
      return new _ZodSet({
        ...this._def,
        minSize: { value: minSize, message: errorUtil.toString(message) }
      });
    }
    max(maxSize, message) {
      return new _ZodSet({
        ...this._def,
        maxSize: { value: maxSize, message: errorUtil.toString(message) }
      });
    }
    size(size, message) {
      return this.min(size, message).max(size, message);
    }
    nonempty(message) {
      return this.min(1, message);
    }
  };
  ZodSet.create = (valueType, params) => {
    return new ZodSet({
      valueType,
      minSize: null,
      maxSize: null,
      typeName: ZodFirstPartyTypeKind.ZodSet,
      ...processCreateParams(params)
    });
  };
  var ZodFunction = class _ZodFunction extends ZodType {
    constructor() {
      super(...arguments);
      this.validate = this.implement;
    }
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.function) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.function,
          received: ctx.parsedType
        });
        return INVALID;
      }
      function makeArgsIssue(args, error) {
        return makeIssue({
          data: args,
          path: ctx.path,
          errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
          issueData: {
            code: ZodIssueCode.invalid_arguments,
            argumentsError: error
          }
        });
      }
      function makeReturnsIssue(returns, error) {
        return makeIssue({
          data: returns,
          path: ctx.path,
          errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
          issueData: {
            code: ZodIssueCode.invalid_return_type,
            returnTypeError: error
          }
        });
      }
      const params = { errorMap: ctx.common.contextualErrorMap };
      const fn = ctx.data;
      if (this._def.returns instanceof ZodPromise) {
        const me = this;
        return OK(async function(...args) {
          const error = new ZodError([]);
          const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
            error.addIssue(makeArgsIssue(args, e));
            throw error;
          });
          const result = await Reflect.apply(fn, this, parsedArgs);
          const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
            error.addIssue(makeReturnsIssue(result, e));
            throw error;
          });
          return parsedReturns;
        });
      } else {
        const me = this;
        return OK(function(...args) {
          const parsedArgs = me._def.args.safeParse(args, params);
          if (!parsedArgs.success) {
            throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
          }
          const result = Reflect.apply(fn, this, parsedArgs.data);
          const parsedReturns = me._def.returns.safeParse(result, params);
          if (!parsedReturns.success) {
            throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
          }
          return parsedReturns.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...items) {
      return new _ZodFunction({
        ...this._def,
        args: ZodTuple.create(items).rest(ZodUnknown.create())
      });
    }
    returns(returnType) {
      return new _ZodFunction({
        ...this._def,
        returns: returnType
      });
    }
    implement(func) {
      const validatedFunc = this.parse(func);
      return validatedFunc;
    }
    strictImplement(func) {
      const validatedFunc = this.parse(func);
      return validatedFunc;
    }
    static create(args, returns, params) {
      return new _ZodFunction({
        args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
        returns: returns || ZodUnknown.create(),
        typeName: ZodFirstPartyTypeKind.ZodFunction,
        ...processCreateParams(params)
      });
    }
  };
  var ZodLazy = class extends ZodType {
    get schema() {
      return this._def.getter();
    }
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const lazySchema = this._def.getter();
      return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
    }
  };
  ZodLazy.create = (getter, params) => {
    return new ZodLazy({
      getter,
      typeName: ZodFirstPartyTypeKind.ZodLazy,
      ...processCreateParams(params)
    });
  };
  var ZodLiteral = class extends ZodType {
    _parse(input) {
      if (input.data !== this._def.value) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_literal,
          expected: this._def.value
        });
        return INVALID;
      }
      return { status: "valid", value: input.data };
    }
    get value() {
      return this._def.value;
    }
  };
  ZodLiteral.create = (value, params) => {
    return new ZodLiteral({
      value,
      typeName: ZodFirstPartyTypeKind.ZodLiteral,
      ...processCreateParams(params)
    });
  };
  function createZodEnum(values, params) {
    return new ZodEnum({
      values,
      typeName: ZodFirstPartyTypeKind.ZodEnum,
      ...processCreateParams(params)
    });
  }
  var ZodEnum = class _ZodEnum extends ZodType {
    _parse(input) {
      if (typeof input.data !== "string") {
        const ctx = this._getOrReturnCtx(input);
        const expectedValues = this._def.values;
        addIssueToContext(ctx, {
          expected: util.joinValues(expectedValues),
          received: ctx.parsedType,
          code: ZodIssueCode.invalid_type
        });
        return INVALID;
      }
      if (!this._cache) {
        this._cache = new Set(this._def.values);
      }
      if (!this._cache.has(input.data)) {
        const ctx = this._getOrReturnCtx(input);
        const expectedValues = this._def.values;
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_enum_value,
          options: expectedValues
        });
        return INVALID;
      }
      return OK(input.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
    get Values() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
    get Enum() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
    extract(values, newDef = this._def) {
      return _ZodEnum.create(values, {
        ...this._def,
        ...newDef
      });
    }
    exclude(values, newDef = this._def) {
      return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
        ...this._def,
        ...newDef
      });
    }
  };
  ZodEnum.create = createZodEnum;
  var ZodNativeEnum = class extends ZodType {
    _parse(input) {
      const nativeEnumValues = util.getValidEnumValues(this._def.values);
      const ctx = this._getOrReturnCtx(input);
      if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
        const expectedValues = util.objectValues(nativeEnumValues);
        addIssueToContext(ctx, {
          expected: util.joinValues(expectedValues),
          received: ctx.parsedType,
          code: ZodIssueCode.invalid_type
        });
        return INVALID;
      }
      if (!this._cache) {
        this._cache = new Set(util.getValidEnumValues(this._def.values));
      }
      if (!this._cache.has(input.data)) {
        const expectedValues = util.objectValues(nativeEnumValues);
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_enum_value,
          options: expectedValues
        });
        return INVALID;
      }
      return OK(input.data);
    }
    get enum() {
      return this._def.values;
    }
  };
  ZodNativeEnum.create = (values, params) => {
    return new ZodNativeEnum({
      values,
      typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
      ...processCreateParams(params)
    });
  };
  var ZodPromise = class extends ZodType {
    unwrap() {
      return this._def.type;
    }
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.promise,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
      return OK(promisified.then((data) => {
        return this._def.type.parseAsync(data, {
          path: ctx.path,
          errorMap: ctx.common.contextualErrorMap
        });
      }));
    }
  };
  ZodPromise.create = (schema, params) => {
    return new ZodPromise({
      type: schema,
      typeName: ZodFirstPartyTypeKind.ZodPromise,
      ...processCreateParams(params)
    });
  };
  var ZodEffects = class extends ZodType {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      const effect = this._def.effect || null;
      const checkCtx = {
        addIssue: (arg) => {
          addIssueToContext(ctx, arg);
          if (arg.fatal) {
            status.abort();
          } else {
            status.dirty();
          }
        },
        get path() {
          return ctx.path;
        }
      };
      checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
      if (effect.type === "preprocess") {
        const processed = effect.transform(ctx.data, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(processed).then(async (processed2) => {
            if (status.value === "aborted")
              return INVALID;
            const result = await this._def.schema._parseAsync({
              data: processed2,
              path: ctx.path,
              parent: ctx
            });
            if (result.status === "aborted")
              return INVALID;
            if (result.status === "dirty")
              return DIRTY(result.value);
            if (status.value === "dirty")
              return DIRTY(result.value);
            return result;
          });
        } else {
          if (status.value === "aborted")
            return INVALID;
          const result = this._def.schema._parseSync({
            data: processed,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        }
      }
      if (effect.type === "refinement") {
        const executeRefinement = (acc) => {
          const result = effect.refinement(acc, checkCtx);
          if (ctx.common.async) {
            return Promise.resolve(result);
          }
          if (result instanceof Promise) {
            throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
          }
          return acc;
        };
        if (ctx.common.async === false) {
          const inner = this._def.schema._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          executeRefinement(inner.value);
          return { status: status.value, value: inner.value };
        } else {
          return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
            if (inner.status === "aborted")
              return INVALID;
            if (inner.status === "dirty")
              status.dirty();
            return executeRefinement(inner.value).then(() => {
              return { status: status.value, value: inner.value };
            });
          });
        }
      }
      if (effect.type === "transform") {
        if (ctx.common.async === false) {
          const base = this._def.schema._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (!isValid(base))
            return INVALID;
          const result = effect.transform(base.value, checkCtx);
          if (result instanceof Promise) {
            throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
          }
          return { status: status.value, value: result };
        } else {
          return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
            if (!isValid(base))
              return INVALID;
            return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
              status: status.value,
              value: result
            }));
          });
        }
      }
      util.assertNever(effect);
    }
  };
  ZodEffects.create = (schema, effect, params) => {
    return new ZodEffects({
      schema,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect,
      ...processCreateParams(params)
    });
  };
  ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
    return new ZodEffects({
      schema,
      effect: { type: "preprocess", transform: preprocess },
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      ...processCreateParams(params)
    });
  };
  var ZodOptional = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType === ZodParsedType.undefined) {
        return OK(void 0);
      }
      return this._def.innerType._parse(input);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  ZodOptional.create = (type, params) => {
    return new ZodOptional({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodOptional,
      ...processCreateParams(params)
    });
  };
  var ZodNullable = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType === ZodParsedType.null) {
        return OK(null);
      }
      return this._def.innerType._parse(input);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  ZodNullable.create = (type, params) => {
    return new ZodNullable({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodNullable,
      ...processCreateParams(params)
    });
  };
  var ZodDefault = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      let data = ctx.data;
      if (ctx.parsedType === ZodParsedType.undefined) {
        data = this._def.defaultValue();
      }
      return this._def.innerType._parse({
        data,
        path: ctx.path,
        parent: ctx
      });
    }
    removeDefault() {
      return this._def.innerType;
    }
  };
  ZodDefault.create = (type, params) => {
    return new ZodDefault({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodDefault,
      defaultValue: typeof params.default === "function" ? params.default : () => params.default,
      ...processCreateParams(params)
    });
  };
  var ZodCatch = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const newCtx = {
        ...ctx,
        common: {
          ...ctx.common,
          issues: []
        }
      };
      const result = this._def.innerType._parse({
        data: newCtx.data,
        path: newCtx.path,
        parent: {
          ...newCtx
        }
      });
      if (isAsync(result)) {
        return result.then((result2) => {
          return {
            status: "valid",
            value: result2.status === "valid" ? result2.value : this._def.catchValue({
              get error() {
                return new ZodError(newCtx.common.issues);
              },
              input: newCtx.data
            })
          };
        });
      } else {
        return {
          status: "valid",
          value: result.status === "valid" ? result.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      }
    }
    removeCatch() {
      return this._def.innerType;
    }
  };
  ZodCatch.create = (type, params) => {
    return new ZodCatch({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodCatch,
      catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
      ...processCreateParams(params)
    });
  };
  var ZodNaN = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.nan) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.nan,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return { status: "valid", value: input.data };
    }
  };
  ZodNaN.create = (params) => {
    return new ZodNaN({
      typeName: ZodFirstPartyTypeKind.ZodNaN,
      ...processCreateParams(params)
    });
  };
  var BRAND = /* @__PURE__ */ Symbol("zod_brand");
  var ZodBranded = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const data = ctx.data;
      return this._def.type._parse({
        data,
        path: ctx.path,
        parent: ctx
      });
    }
    unwrap() {
      return this._def.type;
    }
  };
  var ZodPipeline = class _ZodPipeline extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.common.async) {
        const handleAsync = async () => {
          const inResult = await this._def.in._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted")
            return INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return DIRTY(inResult.value);
          } else {
            return this._def.out._parseAsync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        };
        return handleAsync();
      } else {
        const inResult = this._def.in._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return {
            status: "dirty",
            value: inResult.value
          };
        } else {
          return this._def.out._parseSync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      }
    }
    static create(a, b) {
      return new _ZodPipeline({
        in: a,
        out: b,
        typeName: ZodFirstPartyTypeKind.ZodPipeline
      });
    }
  };
  var ZodReadonly = class extends ZodType {
    _parse(input) {
      const result = this._def.innerType._parse(input);
      const freeze = (data) => {
        if (isValid(data)) {
          data.value = Object.freeze(data.value);
        }
        return data;
      };
      return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  ZodReadonly.create = (type, params) => {
    return new ZodReadonly({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodReadonly,
      ...processCreateParams(params)
    });
  };
  function cleanParams(params, data) {
    const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
    const p2 = typeof p === "string" ? { message: p } : p;
    return p2;
  }
  function custom(check, _params = {}, fatal) {
    if (check)
      return ZodAny.create().superRefine((data, ctx) => {
        const r = check(data);
        if (r instanceof Promise) {
          return r.then((r2) => {
            if (!r2) {
              const params = cleanParams(_params, data);
              const _fatal = params.fatal ?? fatal ?? true;
              ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
            }
          });
        }
        if (!r) {
          const params = cleanParams(_params, data);
          const _fatal = params.fatal ?? fatal ?? true;
          ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
        }
        return;
      });
    return ZodAny.create();
  }
  var late = {
    object: ZodObject.lazycreate
  };
  var ZodFirstPartyTypeKind;
  (function(ZodFirstPartyTypeKind2) {
    ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
    ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
    ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
    ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
    ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
    ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
  })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
  var instanceOfType = (cls, params = {
    message: `Input not instance of ${cls.name}`
  }) => custom((data) => data instanceof cls, params);
  var stringType = ZodString.create;
  var numberType = ZodNumber.create;
  var nanType = ZodNaN.create;
  var bigIntType = ZodBigInt.create;
  var booleanType = ZodBoolean.create;
  var dateType = ZodDate.create;
  var symbolType = ZodSymbol.create;
  var undefinedType = ZodUndefined.create;
  var nullType = ZodNull.create;
  var anyType = ZodAny.create;
  var unknownType = ZodUnknown.create;
  var neverType = ZodNever.create;
  var voidType = ZodVoid.create;
  var arrayType = ZodArray.create;
  var objectType = ZodObject.create;
  var strictObjectType = ZodObject.strictCreate;
  var unionType = ZodUnion.create;
  var discriminatedUnionType = ZodDiscriminatedUnion.create;
  var intersectionType = ZodIntersection.create;
  var tupleType = ZodTuple.create;
  var recordType = ZodRecord.create;
  var mapType = ZodMap.create;
  var setType = ZodSet.create;
  var functionType = ZodFunction.create;
  var lazyType = ZodLazy.create;
  var literalType = ZodLiteral.create;
  var enumType = ZodEnum.create;
  var nativeEnumType = ZodNativeEnum.create;
  var promiseType = ZodPromise.create;
  var effectsType = ZodEffects.create;
  var optionalType = ZodOptional.create;
  var nullableType = ZodNullable.create;
  var preprocessType = ZodEffects.createWithPreprocess;
  var pipelineType = ZodPipeline.create;
  var ostring = () => stringType().optional();
  var onumber = () => numberType().optional();
  var oboolean = () => booleanType().optional();
  var coerce = {
    string: ((arg) => ZodString.create({ ...arg, coerce: true })),
    number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
    boolean: ((arg) => ZodBoolean.create({
      ...arg,
      coerce: true
    })),
    bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
    date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
  };
  var NEVER = INVALID;

  // builder/packages/shared/src/orbitals/types/expression.ts
  var SExprAtomSchema = external_exports.union([
    external_exports.string(),
    external_exports.number(),
    external_exports.boolean(),
    external_exports.null(),
    external_exports.record(external_exports.unknown())
    // Objects for payload data
  ]);
  var SExprSchema = external_exports.lazy(
    () => external_exports.union([
      SExprAtomSchema,
      external_exports.array(external_exports.lazy(() => SExprSchema)).min(1).refine(
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

  // builder/packages/shared/src/domain-language/formatters/sexpr-formatter.ts
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

  // builder/packages/shared/src/orbitals/visualizer/index.ts
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

  // builder/packages/shared/src/orbitals/visualizer/browser.ts
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
        console.error("Failed to parse almadar diagram:", e);
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
