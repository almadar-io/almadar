/**
 * Trait Registry - Tracks active traits and their state machines for debugging
 *
 * @packageDocumentation
 */

export interface TraitTransition {
  from: string;
  to: string;
  event: string;
  guard?: string;
}

export interface TraitGuard {
  name: string;
  lastResult?: boolean;
}

export interface TraitDebugInfo {
  id: string;
  name: string;
  currentState: string;
  states: string[];
  transitions: TraitTransition[];
  guards: TraitGuard[];
  transitionCount: number;
}

type ChangeListener = () => void;

const traits = new Map<string, TraitDebugInfo>();
const listeners = new Set<ChangeListener>();

function notifyListeners(): void {
  listeners.forEach(listener => listener());
}

export function registerTrait(info: TraitDebugInfo): void {
  traits.set(info.id, info);
  notifyListeners();
}

export function updateTraitState(id: string, newState: string): void {
  const trait = traits.get(id);
  if (trait) {
    trait.currentState = newState;
    trait.transitionCount++;
    notifyListeners();
  }
}

export function updateGuardResult(traitId: string, guardName: string, result: boolean): void {
  const trait = traits.get(traitId);
  if (trait) {
    const guard = trait.guards.find(g => g.name === guardName);
    if (guard) {
      guard.lastResult = result;
      notifyListeners();
    }
  }
}

export function unregisterTrait(id: string): void {
  traits.delete(id);
  notifyListeners();
}

export function getAllTraits(): TraitDebugInfo[] {
  return Array.from(traits.values());
}

export function getTrait(id: string): TraitDebugInfo | undefined {
  return traits.get(id);
}

export function subscribeToTraitChanges(listener: ChangeListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function clearTraits(): void {
  traits.clear();
  notifyListeners();
}
