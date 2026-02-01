/**
 * Debug Utilities - Functions for toggling and checking debug mode
 *
 * @packageDocumentation
 */

const DEBUG_STORAGE_KEY = 'orbital-debug';

type DebugToggleListener = (enabled: boolean) => void;

const listeners = new Set<DebugToggleListener>();

/**
 * Check if debug mode is enabled
 */
export function isDebugEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(DEBUG_STORAGE_KEY) === 'true';
}

/**
 * Enable or disable debug mode
 */
export function setDebugEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DEBUG_STORAGE_KEY, String(enabled));
  listeners.forEach(listener => listener(enabled));
}

/**
 * Toggle debug mode
 */
export function toggleDebug(): boolean {
  const newValue = !isDebugEnabled();
  setDebugEnabled(newValue);
  return newValue;
}

/**
 * Subscribe to debug mode changes
 */
export function onDebugToggle(listener: DebugToggleListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Initialize debug mode from keyboard shortcut (Ctrl+Shift+D)
 */
export function initDebugShortcut(): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      e.preventDefault();
      toggleDebug();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}
