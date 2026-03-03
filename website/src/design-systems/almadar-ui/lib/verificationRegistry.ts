/**
 * Verification Registry - Tracks runtime verification checks and transition traces
 *
 * Provides:
 * 1. A checklist of pass/fail checks (INIT has fetch, bridge connected, etc.)
 * 2. A full transition timeline with effect execution results
 * 3. ServerBridge health snapshot
 * 4. window.__orbitalVerification for Playwright/automation
 *
 * @packageDocumentation
 */

// ============================================================================
// Types
// ============================================================================

export type CheckStatus = "pass" | "fail" | "pending" | "warn";

export interface VerificationCheck {
  id: string;
  label: string;
  status: CheckStatus;
  details?: string;
  /** Timestamp when status last changed */
  updatedAt: number;
}

export interface EffectTrace {
  type: string;
  args: unknown[];
  status: "executed" | "failed" | "skipped";
  error?: string;
  durationMs?: number;
}

export interface TransitionTrace {
  id: string;
  traitName: string;
  from: string;
  to: string;
  event: string;
  guardExpression?: string;
  guardResult?: boolean;
  effects: EffectTrace[];
  timestamp: number;
}

export interface BridgeHealth {
  connected: boolean;
  eventsForwarded: number;
  eventsReceived: number;
  lastError?: string;
  lastHeartbeat: number;
}

export interface VerificationSummary {
  totalChecks: number;
  passed: number;
  failed: number;
  warnings: number;
  pending: number;
}

export interface VerificationSnapshot {
  checks: VerificationCheck[];
  transitions: TransitionTrace[];
  bridge: BridgeHealth | null;
  summary: VerificationSummary;
}

// ============================================================================
// State
// ============================================================================

const checks = new Map<string, VerificationCheck>();
const transitions: TransitionTrace[] = [];
let bridgeHealth: BridgeHealth | null = null;

const MAX_TRANSITIONS = 500;

type ChangeListener = () => void;
const listeners = new Set<ChangeListener>();

function notifyListeners(): void {
  listeners.forEach((l) => l());
  exposeOnWindow();
}

// ============================================================================
// Checks API
// ============================================================================

export function registerCheck(
  id: string,
  label: string,
  status: CheckStatus = "pending",
  details?: string,
): void {
  checks.set(id, { id, label, status, details, updatedAt: Date.now() });
  notifyListeners();
}

export function updateCheck(
  id: string,
  status: CheckStatus,
  details?: string,
): void {
  const check = checks.get(id);
  if (check) {
    check.status = status;
    if (details !== undefined) check.details = details;
    check.updatedAt = Date.now();
  } else {
    checks.set(id, { id, label: id, status, details, updatedAt: Date.now() });
  }
  notifyListeners();
}

export function getAllChecks(): VerificationCheck[] {
  return Array.from(checks.values());
}

// ============================================================================
// Transition Timeline API
// ============================================================================

export function recordTransition(trace: Omit<TransitionTrace, "id">): void {
  const entry: TransitionTrace = {
    ...trace,
    id: `t-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  };
  transitions.push(entry);

  if (transitions.length > MAX_TRANSITIONS) {
    transitions.shift();
  }

  // Auto-validate: check INIT transitions for fetch effects
  if (entry.event === "INIT") {
    const hasFetch = entry.effects.some((e) => e.type === "fetch");
    const checkId = `init-fetch-${entry.traitName}`;
    if (hasFetch) {
      registerCheck(
        checkId,
        `INIT transition for "${entry.traitName}" has fetch effect`,
        "pass",
      );
    } else {
      // Only warn if the trait renders entity-bound patterns
      const hasRenderUI = entry.effects.some((e) => e.type === "render-ui");
      if (hasRenderUI) {
        registerCheck(
          checkId,
          `INIT transition for "${entry.traitName}" missing fetch effect`,
          "fail",
          "Entity-bound render-ui without a fetch effect will show empty data",
        );
      }
    }
  }

  // Auto-validate: check effects executed successfully
  const failedEffects = entry.effects.filter((e) => e.status === "failed");
  if (failedEffects.length > 0) {
    registerCheck(
      `effects-${entry.id}`,
      `Effects failed in ${entry.traitName}: ${entry.from} -> ${entry.to}`,
      "fail",
      failedEffects.map((e) => `${e.type}: ${e.error}`).join("; "),
    );
  }

  notifyListeners();
}

export function getTransitions(): TransitionTrace[] {
  return [...transitions];
}

export function getTransitionsForTrait(traitName: string): TransitionTrace[] {
  return transitions.filter((t) => t.traitName === traitName);
}

// ============================================================================
// Bridge Health API
// ============================================================================

export function updateBridgeHealth(health: BridgeHealth): void {
  bridgeHealth = { ...health };

  const checkId = "server-bridge";
  if (health.connected) {
    registerCheck(checkId, "Server bridge connected", "pass");
  } else {
    registerCheck(
      checkId,
      "Server bridge disconnected",
      "fail",
      health.lastError || "Bridge is not connected",
    );
  }

  notifyListeners();
}

export function getBridgeHealth(): BridgeHealth | null {
  return bridgeHealth ? { ...bridgeHealth } : null;
}

// ============================================================================
// Summary
// ============================================================================

export function getSummary(): VerificationSummary {
  const allChecks = getAllChecks();
  return {
    totalChecks: allChecks.length,
    passed: allChecks.filter((c) => c.status === "pass").length,
    failed: allChecks.filter((c) => c.status === "fail").length,
    warnings: allChecks.filter((c) => c.status === "warn").length,
    pending: allChecks.filter((c) => c.status === "pending").length,
  };
}

// ============================================================================
// Snapshot (for automation)
// ============================================================================

export function getSnapshot(): VerificationSnapshot {
  return {
    checks: getAllChecks(),
    transitions: getTransitions(),
    bridge: getBridgeHealth(),
    summary: getSummary(),
  };
}

// ============================================================================
// Subscriptions
// ============================================================================

export function subscribeToVerification(listener: ChangeListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// ============================================================================
// Window exposure for Playwright/automation
// ============================================================================

/** Exposed on window for Playwright to query */
interface OrbitalVerificationAPI {
  getSnapshot: () => VerificationSnapshot;
  getChecks: () => VerificationCheck[];
  getTransitions: () => TransitionTrace[];
  getBridge: () => BridgeHealth | null;
  getSummary: () => VerificationSummary;
  /** Wait for a specific event to be processed */
  waitForTransition: (
    event: string,
    timeoutMs?: number,
  ) => Promise<TransitionTrace | null>;
  /** Send an event into the runtime (requires eventBus binding) */
  sendEvent?: (event: string, payload?: Record<string, unknown>) => void;
  /** Get current trait state */
  getTraitState?: (traitName: string) => string | undefined;
}

declare global {
  interface Window {
    __orbitalVerification?: OrbitalVerificationAPI;
  }
}

function exposeOnWindow(): void {
  if (typeof window === "undefined") return;

  if (!window.__orbitalVerification) {
    window.__orbitalVerification = {
      getSnapshot,
      getChecks: getAllChecks,
      getTransitions: getTransitions,
      getBridge: getBridgeHealth,
      getSummary,
      waitForTransition,
    };
  }
}

/**
 * Wait for a transition matching the given event to appear.
 * Returns the trace or null on timeout.
 */
export function waitForTransition(
  event: string,
  timeoutMs = 10_000,
): Promise<TransitionTrace | null> {
  return new Promise((resolve) => {
    // Check if already recorded
    const existing = transitions.find((t) => t.event === event);
    if (existing) {
      resolve(existing);
      return;
    }

    const timeout = setTimeout(() => {
      unsub();
      resolve(null);
    }, timeoutMs);

    const unsub = subscribeToVerification(() => {
      const found = transitions.find((t) => t.event === event);
      if (found) {
        clearTimeout(timeout);
        unsub();
        resolve(found);
      }
    });
  });
}

/**
 * Bind the EventBus so automation can send events.
 * Call this during app initialization.
 */
export function bindEventBus(eventBus: {
  emit: (type: string, payload?: Record<string, unknown>) => void;
}): void {
  if (typeof window === "undefined") return;

  exposeOnWindow();
  if (window.__orbitalVerification) {
    window.__orbitalVerification.sendEvent = (event, payload) => {
      eventBus.emit(event, payload);
    };
  }
}

/**
 * Bind a trait state getter so automation can query current states.
 */
export function bindTraitStateGetter(
  getter: (traitName: string) => string | undefined,
): void {
  if (typeof window === "undefined") return;

  exposeOnWindow();
  if (window.__orbitalVerification) {
    window.__orbitalVerification.getTraitState = getter;
  }
}

// ============================================================================
// Clear (for testing)
// ============================================================================

export function clearVerification(): void {
  checks.clear();
  transitions.length = 0;
  bridgeHealth = null;
  notifyListeners();
}

// Auto-initialize on import
exposeOnWindow();
