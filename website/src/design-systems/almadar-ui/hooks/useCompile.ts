'use client';
/**
 * useCompile Hook
 *
 * Handles schema compilation to generate application files.
 */

import { useState, useCallback } from 'react';

// =============================================================================
// Types
// =============================================================================

// Accept any schema-like object to avoid type conflicts between
// client's local OrbitalSchema type and shared package's type
export interface SchemaLike {
  name: string;
  version?: string;
  [key: string]: unknown;
}

export type CompileStage = 'idle' | 'compiling' | 'done' | 'error';

export interface CompileResult {
  success: boolean;
  files?: Array<{ path: string; content: string }>;
  errors?: string[];
}

export interface UseCompileResult {
  isCompiling: boolean;
  stage: CompileStage;
  lastResult: CompileResult | null;
  error: string | null;
  compileSchema: (schema: SchemaLike) => Promise<CompileResult | null>;
}

// =============================================================================
// Hook Implementation
// =============================================================================

export function useCompile(): UseCompileResult {
  const [isCompiling, setIsCompiling] = useState(false);
  const [stage, setStage] = useState<CompileStage>('idle');
  const [lastResult, setLastResult] = useState<CompileResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const compileSchema = useCallback(async (schema: SchemaLike): Promise<CompileResult | null> => {
    setIsCompiling(true);
    setStage('compiling');
    setError(null);

    try {
      // TODO: Implement actual compilation via API
      console.log('[useCompile] Compiling schema:', schema.name);

      // Mock result for now
      const result: CompileResult = {
        success: true,
        files: [],
      };

      setLastResult(result);
      setStage('done');
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Compilation failed';
      setError(errorMessage);
      setStage('error');
      setLastResult({ success: false, errors: [errorMessage] });
      return null;
    } finally {
      setIsCompiling(false);
    }
  }, []);

  return {
    isCompiling,
    stage,
    lastResult,
    error,
    compileSchema,
  };
}
