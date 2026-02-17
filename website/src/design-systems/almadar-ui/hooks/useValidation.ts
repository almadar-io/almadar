/**
 * useValidation Hook
 *
 * Stub implementation for schema validation.
 */

import { useState, useCallback } from 'react';

export interface LLMErrorContext {
  rawValuePreview?: string;
  expectedType?: string;
  actualType?: string;
  source?: {
    agent: 'requirements' | 'builder' | 'view-planner';
    operation: string;
    promptHash?: string;
  };
  tokenUsage?: {
    prompt: number;
    completion: number;
  };
}

export interface ValidationError {
  code: string;
  message: string;
  path?: string;
  severity: 'error' | 'warning';
  suggestion?: string;
  validValues?: string[];
  expectedShape?: string;
  fixGuidance?: string;
  llmContext?: LLMErrorContext;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

export type ValidationStage = 'idle' | 'validating' | 'fixing' | 'complete';

export interface UseValidationResult {
  result: ValidationResult | null;
  isValidating: boolean;
  error: string | null;
  stage: ValidationStage;
  isFixing: boolean;
  progressMessage: string | null;
  errors: ValidationError[];
  warnings: ValidationError[];
  isValid: boolean;
  validate: (appId: string) => Promise<ValidationResult>;
  clearResult: () => void;
  reset: () => void;
}

export function useValidation(): UseValidationResult {
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<ValidationStage>('idle');
  const [isFixing, setIsFixing] = useState(false);
  const [progressMessage, setProgressMessage] = useState<string | null>(null);

  const validate = useCallback(async (appId: string): Promise<ValidationResult> => {
    setIsValidating(true);
    setError(null);
    setStage('validating');
    setProgressMessage('Validating schema...');

    try {
      // TODO: Implement actual validation API call
      console.log('[useValidation] Validating app:', appId);

      const validationResult: ValidationResult = {
        valid: true,
        errors: [],
        warnings: [],
      };

      setResult(validationResult);
      setStage('complete');
      setProgressMessage(null);
      return validationResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Validation failed';
      setError(errorMessage);
      const failedResult: ValidationResult = {
        valid: false,
        errors: [{ code: 'VALIDATION_ERROR', message: errorMessage, severity: 'error' }],
        warnings: [],
      };
      setResult(failedResult);
      setStage('complete');
      setProgressMessage(null);
      return failedResult;
    } finally {
      setIsValidating(false);
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setStage('idle');
    setIsFixing(false);
    setProgressMessage(null);
    setIsValidating(false);
  }, []);

  return {
    result,
    isValidating,
    error,
    stage,
    isFixing,
    progressMessage,
    errors: result?.errors ?? [],
    warnings: result?.warnings ?? [],
    isValid: result?.valid ?? false,
    validate,
    clearResult,
    reset,
  };
}
