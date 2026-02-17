/**
 * Tick Registry - Tracks scheduled tick executions for debugging
 *
 * @packageDocumentation
 */

export interface TickExecution {
  id: string;
  traitName: string;
  /** Tick name (display name) */
  name: string;
  /** Tick identifier */
  tickName: string;
  interval: number;
  /** Last execution timestamp */
  lastRun: number;
  lastExecuted: number | null;
  nextExecution: number | null;
  /** Number of times this tick has run */
  runCount: number;
  executionCount: number;
  /** Average execution time in ms */
  executionTime: number;
  /** Whether the tick is currently active */
  active: boolean;
  isActive: boolean;
  /** Guard name if this tick has a guard */
  guardName?: string;
  /** Whether the guard passed on last evaluation */
  guardPassed?: boolean;
}

type ChangeListener = () => void;

const ticks = new Map<string, TickExecution>();
const listeners = new Set<ChangeListener>();

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

export function registerTick(tick: TickExecution): void {
  ticks.set(tick.id, tick);
  notifyListeners();
}

export function updateTickExecution(id: string, timestamp: number): void {
  const tick = ticks.get(id);
  if (tick) {
    tick.lastExecuted = timestamp;
    tick.nextExecution = timestamp + tick.interval;
    tick.executionCount++;
    notifyListeners();
  }
}

export function setTickActive(id: string, isActive: boolean): void {
  const tick = ticks.get(id);
  if (tick) {
    tick.isActive = isActive;
    notifyListeners();
  }
}

export function unregisterTick(id: string): void {
  ticks.delete(id);
  notifyListeners();
}

export function getAllTicks(): TickExecution[] {
  return Array.from(ticks.values());
}

export function getTick(id: string): TickExecution | undefined {
  return ticks.get(id);
}

export function subscribeToTickChanges(listener: ChangeListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function clearTicks(): void {
  ticks.clear();
  notifyListeners();
}
