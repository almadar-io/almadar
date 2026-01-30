/**
 * InputListener - Invisible component that captures keyboard input
 *
 * Rendered by InputCapture trait via render_ui effect.
 * Listens for keydown/keyup events and:
 * 1. Updates the Input singleton entity
 * 2. Emits INPUT:* events via event bus
 *
 * This follows the closed circuit pattern:
 * Trait (render_ui) → Component (InputListener) → Events (INPUT:*) → Trait (state machine)
 *
 * @generated pattern component
 */

import { useEffect, useCallback } from 'react';
import { useEventBus, type EventBusContextType } from '../../../hooks/useEventBus';
import { updateSingleton, getSingleton, spawnEntity } from '../../../stores/entityStore';

/**
 * Input binding configuration
 */
export interface InputBinding {
  /** Key code or key value (e.g., 'ArrowLeft', 'KeyA', 'Space') */
  key: string;
  /** Field name in the Input singleton (e.g., 'left', 'right', 'jump') */
  field: string;
  /** Optional custom event name (defaults to INPUT:{FIELD}_DOWN/UP) */
  event?: string;
}

/**
 * InputListener props
 */
export interface InputListenerProps {
  /** Key bindings configuration */
  bindings?: readonly InputBinding[];
  /** Whether input listening is enabled */
  enabled?: boolean;
  /** Event bus for emitting events (optional, uses hook if not provided) */
  eventBus?: EventBusContextType;
}

/**
 * Default key bindings for platformer controls
 */
const DEFAULT_BINDINGS: InputBinding[] = [
  { key: 'ArrowLeft', field: 'left' },
  { key: 'KeyA', field: 'left' },
  { key: 'ArrowRight', field: 'right' },
  { key: 'KeyD', field: 'right' },
  { key: 'ArrowUp', field: 'up' },
  { key: 'KeyW', field: 'up' },
  { key: 'ArrowDown', field: 'down' },
  { key: 'KeyS', field: 'down' },
  { key: 'Space', field: 'jump' },
  { key: 'KeyZ', field: 'action' },
];

/**
 * InputListener Component
 *
 * Invisible component that captures keyboard input and emits events.
 * Designed to be rendered by the InputCapture trait via render_ui effect.
 */
export function InputListener({
  bindings = DEFAULT_BINDINGS,
  enabled = true,
  eventBus: eventBusProp,
}: InputListenerProps) {
  // Get event bus from context or prop
  let eventBusFromHook: EventBusContextType | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    eventBusFromHook = useEventBus();
  } catch {
    // Outside EventBusProvider context - will use prop or skip emission
  }
  const eventBus = eventBusProp || eventBusFromHook;

  // Ensure Input singleton exists
  useEffect(() => {
    if (!enabled) return;

    if (!getSingleton('Input')) {
      spawnEntity({
        id: 'input',
        type: 'Input',
        left: false,
        right: false,
        up: false,
        down: false,
        jump: false,
        action: false,
      });
    }
  }, [enabled]);

  // Handle key down
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      const binding = bindings.find(b => b.key === e.code || b.key === e.key);
      if (binding) {
        e.preventDefault();

        // Update Input singleton
        updateSingleton('Input', { [binding.field]: true });

        // Emit event
        if (eventBus) {
          const eventName = binding.event || `INPUT:${binding.field.toUpperCase()}_DOWN`;
          eventBus.emit(eventName, { key: e.key, code: e.code, field: binding.field });
        }
      }
    },
    [bindings, enabled, eventBus]
  );

  // Handle key up
  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      const binding = bindings.find(b => b.key === e.code || b.key === e.key);
      if (binding) {
        e.preventDefault();

        // Update Input singleton
        updateSingleton('Input', { [binding.field]: false });

        // Emit event
        if (eventBus) {
          const eventName = binding.event
            ? `${binding.event}_UP`
            : `INPUT:${binding.field.toUpperCase()}_UP`;
          eventBus.emit(eventName, { key: e.key, code: e.code, field: binding.field });
        }
      }
    },
    [bindings, enabled, eventBus]
  );

  // Attach event listeners
  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enabled, handleKeyDown, handleKeyUp]);

  // Invisible component - renders nothing
  return null;
}

InputListener.displayName = 'InputListener';
