/**
 * useUIEvents - UI Event to State Machine Bridge
 *
 * Listens for UI events from the event bus and dispatches
 * corresponding state machine events.
 *
 * Components emit events like `UI:VIEW`, `UI:SAVE`, `UI:CANCEL`
 * This hook translates them to state machine dispatch calls.
 */

import { useEffect, useState, useMemo, useContext } from 'react';
import { useEventBus, type KFlowEvent } from './useEventBus';
import { SelectionContext } from '../providers/SelectionProvider';

/**
 * Map of UI events to state machine events.
 * UI events are prefixed with "UI:" and the suffix is the event name.
 */
const UI_EVENT_MAP: Record<string, string> = {
  // Form/CRUD events
  'UI:SAVE': 'SAVE',
  'UI:CANCEL': 'CANCEL',
  'UI:CLOSE': 'CLOSE',
  'UI:VIEW': 'VIEW',
  'UI:EDIT': 'EDIT',
  'UI:DELETE': 'DELETE',
  'UI:CREATE': 'CREATE',
  'UI:SELECT': 'SELECT',
  'UI:DESELECT': 'DESELECT',
  'UI:SUBMIT': 'SAVE',
  'UI:UPDATE_STATUS': 'UPDATE_STATUS',
  'UI:SEARCH': 'SEARCH',
  'UI:CLEAR_SEARCH': 'CLEAR_SEARCH',
  'UI:ADD': 'CREATE',
  // Game events (for closed circuit with GameMenu, GamePauseOverlay, GameOverScreen)
  'UI:PAUSE': 'PAUSE',
  'UI:RESUME': 'RESUME',
  'UI:RESTART': 'RESTART',
  'UI:GAME_OVER': 'GAME_OVER',
  'UI:START': 'START',
  'UI:QUIT': 'QUIT',
  'UI:INIT': 'INIT',
};

/**
 * Hook to bridge UI events to state machine dispatch
 *
 * @param dispatch - The state machine dispatch function
 * @param validEvents - Optional array of valid event names (filters which events to handle)
 * @param eventBusInstance - Optional event bus instance (for testing, uses hook if not provided)
 */
export function useUIEvents<E extends string>(
  dispatch: (event: E, payload?: unknown) => void,
  validEvents?: readonly E[],
  eventBusInstance?: ReturnType<typeof useEventBus>
): void {
  const defaultEventBus = useEventBus();
  const eventBus = eventBusInstance ?? defaultEventBus;

  // Stabilize validEvents to prevent re-subscriptions when array reference changes
  // but contents are the same. This is critical because generated trait hooks
  // pass inline arrays which create new references on every render.
  const validEventsKey = validEvents ? validEvents.slice().sort().join(',') : '';
  const stableValidEvents = useMemo(
    () => validEvents,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [validEventsKey]
  );

  useEffect(() => {
    // Create handlers for all UI events
    const unsubscribes: Array<() => void> = [];

    // Listen for all UI events
    Object.entries(UI_EVENT_MAP).forEach(([uiEvent, smEvent]) => {
      const handler = (event: KFlowEvent) => {
        // Only dispatch if the event is valid for this state machine
        if (!stableValidEvents || stableValidEvents.includes(smEvent as E)) {
          dispatch(smEvent as E, event.payload);
        }
      };

      const unsubscribe = eventBus.on(uiEvent, handler);
      unsubscribes.push(unsubscribe);
    });

    // Also listen for generic UI events that aren't in the map
    const genericHandler = (event: KFlowEvent) => {
      const eventName = event.payload?.event as string | undefined;
      if (eventName) {
        const smEvent = eventName as E;
        if (!stableValidEvents || stableValidEvents.includes(smEvent)) {
          dispatch(smEvent, event.payload);
        }
      }
    };
    const genericUnsubscribe = eventBus.on('UI:DISPATCH', genericHandler);
    unsubscribes.push(genericUnsubscribe);

    // Listen for direct state machine events (for internal trait events)
    // This allows effects to emit events like 'ADDED' directly on the event bus
    // and have them dispatched to the state machine
    if (stableValidEvents) {
      stableValidEvents.forEach((smEvent) => {
        // Skip events already handled by UI_EVENT_MAP
        const alreadyMapped = Object.values(UI_EVENT_MAP).includes(smEvent);
        if (!alreadyMapped) {
          const directHandler = (event: KFlowEvent) => {
            dispatch(smEvent, event.payload);
          };
          const unsubscribe = eventBus.on(smEvent, directHandler);
          unsubscribes.push(unsubscribe);
        }
      });
    }

    return () => {
      unsubscribes.forEach(unsub => unsub());
    };
  }, [eventBus, dispatch, stableValidEvents]);
}

/**
 * Hook for selected entity tracking
 * Many list UIs need to track which item is selected.
 *
 * This hook uses SelectionProvider if available (preferred),
 * otherwise falls back to listening to events directly.
 *
 * @example Using with SelectionProvider (recommended)
 * ```tsx
 * function MyPage() {
 *   return (
 *     <EventBusProvider>
 *       <SelectionProvider>
 *         <MyComponent />
 *       </SelectionProvider>
 *     </EventBusProvider>
 *   );
 * }
 *
 * function MyComponent() {
 *   const [selected, setSelected] = useSelectedEntity<Order>();
 *   // selected is automatically updated when UI:VIEW/UI:SELECT events fire
 * }
 * ```
 */
export function useSelectedEntity<T>(
  eventBusInstance?: ReturnType<typeof useEventBus>
): [T | null, (entity: T | null) => void] {
  const defaultEventBus = useEventBus();
  const eventBus = eventBusInstance ?? defaultEventBus;

  // Try to use SelectionProvider context first (preferred - survives component mount/unmount)
  // Import dynamically to avoid circular dependency
  const selectionContext = useSelectionContext<T>();

  // Local state for fallback mode (when SelectionProvider is not available)
  const [localSelected, setLocalSelected] = useState<T | null>(null);

  // Track if we're using context mode
  const usingContext = selectionContext !== null;

  // Listen for selection events (fallback mode only - when no SelectionProvider)
  useEffect(() => {
    // Skip event listening if we have a SelectionProvider (it handles events itself)
    if (usingContext) return;

    const handleSelect = (event: KFlowEvent) => {
      const row = event.payload?.row as T | undefined;
      if (row) {
        setLocalSelected(row);
      }
    };

    const handleDeselect = () => {
      setLocalSelected(null);
    };

    const unsubSelect = eventBus.on('UI:SELECT', handleSelect);
    const unsubView = eventBus.on('UI:VIEW', handleSelect);
    const unsubDeselect = eventBus.on('UI:DESELECT', handleDeselect);
    const unsubClose = eventBus.on('UI:CLOSE', handleDeselect);
    const unsubCancel = eventBus.on('UI:CANCEL', handleDeselect);

    return () => {
      unsubSelect();
      unsubView();
      unsubDeselect();
      unsubClose();
      unsubCancel();
    };
  }, [eventBus, usingContext]);

  // Return context values if available, otherwise local state
  if (selectionContext) {
    return [selectionContext.selected, selectionContext.setSelected];
  }

  return [localSelected, setLocalSelected];
}

/**
 * Internal hook to safely access SelectionContext without throwing.
 * Returns null if SelectionProvider is not in the tree.
 */
function useSelectionContext<T>(): { selected: T | null; setSelected: (entity: T | null) => void } | null {
  // useContext returns null if the context is not available (no provider in tree)
  const context = useContext(SelectionContext);
  return context as { selected: T | null; setSelected: (entity: T | null) => void } | null;
}
