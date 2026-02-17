/**
 * Guard Registry - Tracks guard evaluations for debugging
 *
 * @packageDocumentation
 */

export interface GuardContext {
  traitName?: string;
  type?: "transition" | "tick";
  transitionFrom?: string;
  transitionTo?: string;
  tickName?: string;
  [key: string]: unknown;
}

export interface GuardEvaluation {
  id: string;
  traitName: string;
  guardName: string;
  expression: string;
  result: boolean;
  context: GuardContext;
  timestamp: number;
  /** Input values used in guard evaluation */
  inputs: Record<string, unknown>;
}

type ChangeListener = () => void;

const guardHistory: GuardEvaluation[] = [];
const listeners = new Set<ChangeListener>();
const MAX_HISTORY = 100;

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

export function recordGuardEvaluation(
  evaluation: Omit<GuardEvaluation, "id" | "timestamp">,
): void {
  const entry: GuardEvaluation = {
    ...evaluation,
    id: `guard-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    timestamp: Date.now(),
  };

  guardHistory.unshift(entry);

  // Keep history bounded
  if (guardHistory.length > MAX_HISTORY) {
    guardHistory.pop();
  }

  notifyListeners();
}

export function getGuardHistory(): GuardEvaluation[] {
  return [...guardHistory];
}

export function getRecentGuardEvaluations(count: number): GuardEvaluation[] {
  return guardHistory.slice(0, count);
}

export function getGuardEvaluationsForTrait(
  traitName: string,
): GuardEvaluation[] {
  return guardHistory.filter((g) => g.traitName === traitName);
}

export function subscribeToGuardChanges(listener: ChangeListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function clearGuardHistory(): void {
  guardHistory.length = 0;
  notifyListeners();
}
