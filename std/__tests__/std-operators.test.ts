/**
 * Standard Library Operators Tests
 *
 * Tests for the Almadar Standard Library:
 * - Types and utilities
 * - Module operator definitions
 * - Registry functions
 * - Integration with validator
 */

import { describe, it, expect } from 'vitest';

// Types and utilities
import {
  STD_MODULES,
  STD_OPERATOR_CATEGORIES,
  isStdCategory,
  isStdOperator,
  getModuleFromOperator,
  getFunctionFromOperator,
  makeStdOperator,
} from '../types.js';

// Registry
import {
  STD_OPERATORS,
  STD_OPERATORS_BY_MODULE,
  getStdOperatorMeta,
  isKnownStdOperator,
  getModuleOperators,
  getAllStdOperators,
  getStdOperatorsByModule,
  getLambdaOperators,
  getStdEffectOperators,
  getStdPureOperators,
  validateStdOperatorArity,
  isStdGuardOperator,
  isStdEffectOperator,
  getOperatorMetaExtended,
  isKnownOperatorExtended,
  validateOperatorArityExtended,
  isEffectOperatorExtended,
  getStdLibStats,
} from '../registry.js';

// Module operators
import { MATH_OPERATORS } from '../modules/math.js';
import { STR_OPERATORS } from '../modules/str.js';
import { ARRAY_OPERATORS } from '../modules/array.js';
import { OBJECT_OPERATORS } from '../modules/object.js';
import { TIME_OPERATORS } from '../modules/time.js';
import { VALIDATE_OPERATORS } from '../modules/validate.js';
import { FORMAT_OPERATORS } from '../modules/format.js';
import { ASYNC_OPERATORS } from '../modules/async.js';

// Core operators for integration tests
import { OPERATORS } from '../../types/operators.js';

// Validator integration
import {
  validateSExpr,
  validateGuard,
  validateEffect,
} from '../../validation/sexpr-validator.js';

// ============================================================================
// Types and Utilities Tests
// ============================================================================

describe('Standard Library Types', () => {
  describe('STD_MODULES', () => {
    it('should contain all 8 modules', () => {
      expect(STD_MODULES).toHaveLength(8);
      expect(STD_MODULES).toContain('math');
      expect(STD_MODULES).toContain('str');
      expect(STD_MODULES).toContain('array');
      expect(STD_MODULES).toContain('object');
      expect(STD_MODULES).toContain('time');
      expect(STD_MODULES).toContain('validate');
      expect(STD_MODULES).toContain('format');
      expect(STD_MODULES).toContain('async');
    });
  });

  describe('STD_OPERATOR_CATEGORIES', () => {
    it('should contain category for each module', () => {
      expect(STD_OPERATOR_CATEGORIES).toHaveLength(8);
      for (const module of STD_MODULES) {
        expect(STD_OPERATOR_CATEGORIES).toContain(`std-${module}`);
      }
    });
  });

  describe('isStdCategory', () => {
    it('should return true for std categories', () => {
      expect(isStdCategory('std-math')).toBe(true);
      expect(isStdCategory('std-str')).toBe(true);
      expect(isStdCategory('std-array')).toBe(true);
    });

    it('should return false for non-std categories', () => {
      expect(isStdCategory('arithmetic')).toBe(false);
      expect(isStdCategory('effect')).toBe(false);
      expect(isStdCategory('math')).toBe(false);
    });
  });

  describe('isStdOperator', () => {
    it('should return true for std operators', () => {
      expect(isStdOperator('math/clamp')).toBe(true);
      expect(isStdOperator('str/upper')).toBe(true);
      expect(isStdOperator('array/filter')).toBe(true);
    });

    it('should return false for core operators', () => {
      expect(isStdOperator('+')).toBe(false);
      expect(isStdOperator('set')).toBe(false);
      expect(isStdOperator('and')).toBe(false);
    });

    it('should return false for invalid operators', () => {
      expect(isStdOperator('unknown')).toBe(false);
      expect(isStdOperator('foo/bar/baz')).toBe(false);
    });
  });

  describe('getModuleFromOperator', () => {
    it('should extract module from std operator', () => {
      expect(getModuleFromOperator('math/clamp')).toBe('math');
      expect(getModuleFromOperator('str/upper')).toBe('str');
      expect(getModuleFromOperator('array/filter')).toBe('array');
    });

    it('should return null for non-std operators', () => {
      expect(getModuleFromOperator('+')).toBeNull();
      expect(getModuleFromOperator('unknown/op')).toBeNull();
    });
  });

  describe('getFunctionFromOperator', () => {
    it('should extract function name from std operator', () => {
      expect(getFunctionFromOperator('math/clamp')).toBe('clamp');
      expect(getFunctionFromOperator('str/upper')).toBe('upper');
      expect(getFunctionFromOperator('array/filter')).toBe('filter');
    });

    it('should return null for non-std operators', () => {
      expect(getFunctionFromOperator('+')).toBeNull();
    });
  });

  describe('makeStdOperator', () => {
    it('should create std operator name', () => {
      expect(makeStdOperator('math', 'clamp')).toBe('math/clamp');
      expect(makeStdOperator('str', 'upper')).toBe('str/upper');
    });
  });
});

// ============================================================================
// Module Operator Tests
// ============================================================================

describe('Module Operators', () => {
  describe('Math Module', () => {
    it('should have all expected operators', () => {
      const ops = Object.keys(MATH_OPERATORS);
      expect(ops).toContain('math/abs');
      expect(ops).toContain('math/min');
      expect(ops).toContain('math/max');
      expect(ops).toContain('math/clamp');
      expect(ops).toContain('math/floor');
      expect(ops).toContain('math/ceil');
      expect(ops).toContain('math/round');
      expect(ops).toContain('math/pow');
      expect(ops).toContain('math/sqrt');
      expect(ops).toContain('math/mod');
      expect(ops).toContain('math/sign');
      expect(ops).toContain('math/lerp');
      expect(ops).toContain('math/map');
      expect(ops).toContain('math/random');
      expect(ops).toContain('math/randomInt');
      expect(ops).toContain('math/default');
    });

    it('should have correct arity for math/clamp', () => {
      const meta = MATH_OPERATORS['math/clamp'];
      expect(meta.minArity).toBe(3);
      expect(meta.maxArity).toBe(3);
    });

    it('should have no side effects', () => {
      for (const [, meta] of Object.entries(MATH_OPERATORS)) {
        expect(meta.hasSideEffects).toBe(false);
      }
    });
  });

  describe('String Module', () => {
    it('should have all expected operators', () => {
      const ops = Object.keys(STR_OPERATORS);
      expect(ops).toContain('str/len');
      expect(ops).toContain('str/upper');
      expect(ops).toContain('str/lower');
      expect(ops).toContain('str/trim');
      expect(ops).toContain('str/split');
      expect(ops).toContain('str/join');
      expect(ops).toContain('str/replace');
      expect(ops).toContain('str/includes');
      expect(ops).toContain('str/template');
      expect(ops).toContain('str/truncate');
    });

    it('should have no side effects', () => {
      for (const [, meta] of Object.entries(STR_OPERATORS)) {
        expect(meta.hasSideEffects).toBe(false);
      }
    });
  });

  describe('Array Module', () => {
    it('should have all expected operators', () => {
      const ops = Object.keys(ARRAY_OPERATORS);
      expect(ops).toContain('array/len');
      expect(ops).toContain('array/first');
      expect(ops).toContain('array/last');
      expect(ops).toContain('array/filter');
      expect(ops).toContain('array/map');
      expect(ops).toContain('array/reduce');
      expect(ops).toContain('array/sum');
      expect(ops).toContain('array/groupBy');
    });

    it('should mark lambda-accepting operators', () => {
      expect(ARRAY_OPERATORS['array/filter'].acceptsLambda).toBe(true);
      expect(ARRAY_OPERATORS['array/map'].acceptsLambda).toBe(true);
      expect(ARRAY_OPERATORS['array/reduce'].acceptsLambda).toBe(true);
      expect(ARRAY_OPERATORS['array/find'].acceptsLambda).toBe(true);
    });

    it('should not mark non-lambda operators', () => {
      expect(ARRAY_OPERATORS['array/len'].acceptsLambda).toBeFalsy();
      expect(ARRAY_OPERATORS['array/first'].acceptsLambda).toBeFalsy();
    });
  });

  describe('Object Module', () => {
    it('should have all expected operators', () => {
      const ops = Object.keys(OBJECT_OPERATORS);
      expect(ops).toContain('object/keys');
      expect(ops).toContain('object/values');
      expect(ops).toContain('object/get');
      expect(ops).toContain('object/set');
      expect(ops).toContain('object/merge');
      expect(ops).toContain('object/pick');
      expect(ops).toContain('object/omit');
    });
  });

  describe('Time Module', () => {
    it('should have all expected operators', () => {
      const ops = Object.keys(TIME_OPERATORS);
      expect(ops).toContain('time/now');
      expect(ops).toContain('time/today');
      expect(ops).toContain('time/format');
      expect(ops).toContain('time/add');
      expect(ops).toContain('time/diff');
      expect(ops).toContain('time/isPast');
      expect(ops).toContain('time/isFuture');
      expect(ops).toContain('time/relative');
    });
  });

  describe('Validate Module', () => {
    it('should have all expected operators', () => {
      const ops = Object.keys(VALIDATE_OPERATORS);
      expect(ops).toContain('validate/required');
      expect(ops).toContain('validate/email');
      expect(ops).toContain('validate/minLength');
      expect(ops).toContain('validate/maxLength');
      expect(ops).toContain('validate/pattern');
      expect(ops).toContain('validate/oneOf');
      expect(ops).toContain('validate/check');
    });
  });

  describe('Format Module', () => {
    it('should have all expected operators', () => {
      const ops = Object.keys(FORMAT_OPERATORS);
      expect(ops).toContain('format/number');
      expect(ops).toContain('format/currency');
      expect(ops).toContain('format/percent');
      expect(ops).toContain('format/bytes');
      expect(ops).toContain('format/ordinal');
      expect(ops).toContain('format/plural');
    });
  });

  describe('Async Module', () => {
    it('should have all expected operators', () => {
      const ops = Object.keys(ASYNC_OPERATORS);
      expect(ops).toContain('async/delay');
      expect(ops).toContain('async/timeout');
      expect(ops).toContain('async/debounce');
      expect(ops).toContain('async/throttle');
      expect(ops).toContain('async/retry');
      expect(ops).toContain('async/race');
      expect(ops).toContain('async/all');
    });

    it('should have side effects', () => {
      for (const [, meta] of Object.entries(ASYNC_OPERATORS)) {
        expect(meta.hasSideEffects).toBe(true);
      }
    });
  });
});

// ============================================================================
// Registry Tests
// ============================================================================

describe('Standard Library Registry', () => {
  describe('STD_OPERATORS', () => {
    it('should contain all module operators', () => {
      const totalExpected =
        Object.keys(MATH_OPERATORS).length +
        Object.keys(STR_OPERATORS).length +
        Object.keys(ARRAY_OPERATORS).length +
        Object.keys(OBJECT_OPERATORS).length +
        Object.keys(TIME_OPERATORS).length +
        Object.keys(VALIDATE_OPERATORS).length +
        Object.keys(FORMAT_OPERATORS).length +
        Object.keys(ASYNC_OPERATORS).length;

      expect(Object.keys(STD_OPERATORS).length).toBe(totalExpected);
    });
  });

  describe('getStdOperatorMeta', () => {
    it('should return metadata for std operators', () => {
      const meta = getStdOperatorMeta('math/clamp');
      expect(meta).toBeDefined();
      expect(meta?.module).toBe('math');
      expect(meta?.minArity).toBe(3);
    });

    it('should return undefined for unknown operators', () => {
      expect(getStdOperatorMeta('math/unknown')).toBeUndefined();
      expect(getStdOperatorMeta('+')).toBeUndefined();
    });
  });

  describe('isKnownStdOperator', () => {
    it('should return true for std operators', () => {
      expect(isKnownStdOperator('math/clamp')).toBe(true);
      expect(isKnownStdOperator('str/upper')).toBe(true);
    });

    it('should return false for core or unknown operators', () => {
      expect(isKnownStdOperator('+')).toBe(false);
      expect(isKnownStdOperator('unknown')).toBe(false);
    });
  });

  describe('getModuleOperators', () => {
    it('should return operators for a module', () => {
      const mathOps = getModuleOperators('math');
      expect(Object.keys(mathOps)).toContain('math/clamp');
      expect(Object.keys(mathOps)).toContain('math/lerp');
    });
  });

  describe('getAllStdOperators', () => {
    it('should return all std operator names', () => {
      const ops = getAllStdOperators();
      expect(ops.length).toBeGreaterThan(100);
      expect(ops).toContain('math/clamp');
      expect(ops).toContain('str/upper');
      expect(ops).toContain('array/filter');
    });
  });

  describe('getStdOperatorsByModule', () => {
    it('should return operators for specific module', () => {
      const mathOps = getStdOperatorsByModule('math');
      expect(mathOps).toContain('math/clamp');
      expect(mathOps).not.toContain('str/upper');
    });
  });

  describe('getLambdaOperators', () => {
    it('should return operators that accept lambdas', () => {
      const lambdaOps = getLambdaOperators();
      expect(lambdaOps).toContain('array/filter');
      expect(lambdaOps).toContain('array/map');
      expect(lambdaOps).toContain('array/reduce');
      expect(lambdaOps).not.toContain('math/clamp');
    });
  });

  describe('getStdEffectOperators', () => {
    it('should return operators with side effects', () => {
      const effectOps = getStdEffectOperators();
      expect(effectOps).toContain('async/delay');
      expect(effectOps).toContain('async/debounce');
      expect(effectOps).not.toContain('math/clamp');
    });
  });

  describe('getStdPureOperators', () => {
    it('should return operators without side effects', () => {
      const pureOps = getStdPureOperators();
      expect(pureOps).toContain('math/clamp');
      expect(pureOps).toContain('str/upper');
      expect(pureOps).not.toContain('async/delay');
    });
  });

  describe('validateStdOperatorArity', () => {
    it('should pass for correct arity', () => {
      expect(validateStdOperatorArity('math/clamp', 3)).toBeNull();
      expect(validateStdOperatorArity('str/upper', 1)).toBeNull();
    });

    it('should fail for too few arguments', () => {
      const error = validateStdOperatorArity('math/clamp', 2);
      expect(error).not.toBeNull();
      expect(error).toContain('at least 3');
    });

    it('should fail for too many arguments', () => {
      const error = validateStdOperatorArity('str/upper', 2);
      expect(error).not.toBeNull();
      expect(error).toContain('at most 1');
    });

    it('should fail for unknown operator', () => {
      const error = validateStdOperatorArity('math/unknown', 1);
      expect(error).not.toBeNull();
      expect(error).toContain('Unknown');
    });
  });

  describe('isStdGuardOperator', () => {
    it('should return true for pure operators', () => {
      expect(isStdGuardOperator('math/clamp')).toBe(true);
      expect(isStdGuardOperator('str/upper')).toBe(true);
    });

    it('should return false for effect operators', () => {
      expect(isStdGuardOperator('async/delay')).toBe(false);
    });
  });

  describe('getStdLibStats', () => {
    it('should return statistics', () => {
      const stats = getStdLibStats();
      expect(stats.totalOperators).toBeGreaterThan(100);
      expect(stats.byModule.math).toBeGreaterThan(10);
      expect(stats.byModule.str).toBeGreaterThan(20);
      expect(stats.byModule.array).toBeGreaterThan(30);
      expect(stats.pureOperators).toBeGreaterThan(stats.effectOperators);
      expect(stats.lambdaOperators).toBeGreaterThan(10);
    });
  });
});

// ============================================================================
// Extended Integration Tests
// ============================================================================

describe('Extended Operator Functions', () => {
  describe('getOperatorMetaExtended', () => {
    it('should return std operator meta', () => {
      const meta = getOperatorMetaExtended('math/clamp', OPERATORS);
      expect(meta).toBeDefined();
      expect(meta?.minArity).toBe(3);
    });

    it('should return core operator meta', () => {
      const meta = getOperatorMetaExtended('+', OPERATORS);
      expect(meta).toBeDefined();
      expect(meta?.category).toBe('arithmetic');
    });

    it('should return undefined for unknown', () => {
      expect(getOperatorMetaExtended('unknown', OPERATORS)).toBeUndefined();
    });
  });

  describe('isKnownOperatorExtended', () => {
    it('should return true for std and core operators', () => {
      expect(isKnownOperatorExtended('math/clamp', OPERATORS)).toBe(true);
      expect(isKnownOperatorExtended('+', OPERATORS)).toBe(true);
    });

    it('should return false for unknown', () => {
      expect(isKnownOperatorExtended('unknown', OPERATORS)).toBe(false);
    });
  });

  describe('validateOperatorArityExtended', () => {
    it('should validate std operator arity', () => {
      expect(validateOperatorArityExtended('math/clamp', 3, OPERATORS)).toBeNull();
      expect(validateOperatorArityExtended('math/clamp', 2, OPERATORS)).not.toBeNull();
    });

    it('should validate core operator arity', () => {
      expect(validateOperatorArityExtended('+', 2, OPERATORS)).toBeNull();
      expect(validateOperatorArityExtended('+', 1, OPERATORS)).not.toBeNull();
    });
  });

  describe('isEffectOperatorExtended', () => {
    it('should return true for std effect operators', () => {
      expect(isEffectOperatorExtended('async/delay', OPERATORS)).toBe(true);
    });

    it('should return true for core effect operators', () => {
      expect(isEffectOperatorExtended('set', OPERATORS)).toBe(true);
    });

    it('should return false for pure operators', () => {
      expect(isEffectOperatorExtended('math/clamp', OPERATORS)).toBe(false);
      expect(isEffectOperatorExtended('+', OPERATORS)).toBe(false);
    });
  });
});

// ============================================================================
// Validator Integration Tests
// ============================================================================

describe('Validator Integration with Std Library', () => {
  describe('validateSExpr with std operators', () => {
    it('should accept valid std operators', () => {
      const result = validateSExpr(['math/clamp', 50, 0, 100]);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should accept nested std operators', () => {
      const result = validateSExpr([
        'str/upper',
        ['str/trim', '@entity.name'],
      ]);
      expect(result.valid).toBe(true);
    });

    it('should accept std operators mixed with core', () => {
      const result = validateSExpr([
        '+',
        ['math/abs', '@entity.x'],
        ['math/abs', '@entity.y'],
      ]);
      expect(result.valid).toBe(true);
    });

    it('should reject unknown std operators', () => {
      const result = validateSExpr(['math/unknown', 1, 2]);
      expect(result.valid).toBe(false);
      expect(result.errors[0].code).toBe('SEXPR_UNKNOWN_OPERATOR');
    });

    it('should reject wrong arity for std operators', () => {
      const result = validateSExpr(['math/clamp', 50, 0]); // Missing third arg
      expect(result.valid).toBe(false);
      expect(result.errors[0].code).toBe('SEXPR_INVALID_ARITY');
    });
  });

  describe('validateGuard with std operators', () => {
    it('should accept pure std operators in guards', () => {
      const result = validateGuard(['>', ['math/abs', '@entity.x'], 100]);
      expect(result.valid).toBe(true);
    });

    it('should accept validation operators in guards', () => {
      const result = validateGuard(['validate/email', '@entity.email']);
      expect(result.valid).toBe(true);
    });

    it('should reject async operators in guards', () => {
      const result = validateGuard(['async/delay', 1000]);
      expect(result.valid).toBe(false);
      expect(result.errors[0].code).toBe('SEXPR_EFFECT_IN_GUARD');
    });
  });

  describe('validateEffect with std operators', () => {
    it('should accept async operators in effects', () => {
      const result = validateEffect(['async/delay', 1000]);
      expect(result.valid).toBe(true);
    });

    it('should accept all std operators in effects', () => {
      const result = validateEffect([
        'do',
        ['set', '@entity.name', ['str/upper', '@payload.name']],
        ['async/delay', 500],
      ]);
      expect(result.valid).toBe(true);
    });
  });

  describe('Lambda expressions', () => {
    it('should accept fn operator', () => {
      // The fn operator itself is valid
      const result = validateSExpr(['fn', 'x', ['+', 1, 2]]);
      expect(result.valid).toBe(true);
    });

    it('should accept lambda with simple body', () => {
      // Lambda with core operators in body
      const result = validateSExpr([
        'array/filter',
        '@entity.items',
        ['fn', 'x', ['>', 100, 50]], // Simple comparison without lambda binding
      ]);
      expect(result.valid).toBe(true);
    });

    it('should accept lambda with multiple params definition', () => {
      // Lambda with multiple params - body uses core operators
      const result = validateSExpr([
        'array/reduce',
        '@entity.items',
        ['fn', ['acc', 'x'], ['+', 1, 2]],
        0,
      ]);
      expect(result.valid).toBe(true);
    });

    // Note: Full lambda binding validation (e.g., @x.price inside ["fn", "x", ...])
    // requires scope tracking which is not implemented in Phase 2.5.
    // Lambda body bindings are validated in the runtime (Phase 5/5.5).
  });
});
