/**
 * Debug Registry - Central event log for debugging
 *
 * @packageDocumentation
 */

export type DebugEventType =
  | 'state-change'
  | 'event-fired'
  | 'effect-executed'
  | 'guard-evaluated'
  | 'error'
  | 'warning'
  | 'info';

export interface DebugEvent {
  id: string;
  type: DebugEventType;
  source: string;
  message: string;
  data?: Record<string, unknown>;
  timestamp: number;
}

type ChangeListener = () => void;

const events: DebugEvent[] = [];
const listeners = new Set<ChangeListener>();
const MAX_EVENTS = 500;

function notifyListeners(): void {
  listeners.forEach(listener => listener());
}

export function logDebugEvent(
  type: DebugEventType,
  source: string,
  message: string,
  data?: Record<string, unknown>
): void {
  const event: DebugEvent = {
    id: `event-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    type,
    source,
    message,
    data,
    timestamp: Date.now(),
  };

  events.unshift(event);

  // Keep events bounded
  if (events.length > MAX_EVENTS) {
    events.pop();
  }

  notifyListeners();
}

export function logStateChange(source: string, from: string, to: string, event?: string): void {
  logDebugEvent('state-change', source, `${from} → ${to}`, { from, to, event });
}

export function logEventFired(source: string, eventName: string, payload?: unknown): void {
  logDebugEvent('event-fired', source, eventName, { eventName, payload });
}

export function logEffectExecuted(source: string, effectType: string, details?: unknown): void {
  logDebugEvent('effect-executed', source, effectType, { effectType, details });
}

export function logError(source: string, message: string, error?: unknown): void {
  logDebugEvent('error', source, message, { error });
}

export function logWarning(source: string, message: string, data?: Record<string, unknown>): void {
  logDebugEvent('warning', source, message, data);
}

export function logInfo(source: string, message: string, data?: Record<string, unknown>): void {
  logDebugEvent('info', source, message, data);
}

export function getDebugEvents(): DebugEvent[] {
  return [...events];
}

export function getRecentEvents(count: number): DebugEvent[] {
  return events.slice(0, count);
}

export function getEventsByType(type: DebugEventType): DebugEvent[] {
  return events.filter(e => e.type === type);
}

export function getEventsBySource(source: string): DebugEvent[] {
  return events.filter(e => e.source === source);
}

export function subscribeToDebugEvents(listener: ChangeListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function clearDebugEvents(): void {
  events.length = 0;
  notifyListeners();
}
