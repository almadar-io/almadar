/**
 * useUISlots Hook
 *
 * Core hook for managing UI slot rendering in the trait-driven architecture.
 * Traits use render_ui effects to dynamically render content into slots.
 *
 * Slots:
 * - main: Primary content area
 * - sidebar: Left/right sidebar
 * - modal: Modal overlay
 * - drawer: Slide-in drawer
 * - overlay: Full-screen overlay
 * - center: Centered popup
 * - toast: Toast notifications
 * - hud-top: Game HUD top bar
 * - hud-bottom: Game HUD bottom bar
 * - floating: Draggable floating panel
 *
 * @packageDocumentation
 */

import { useState, useCallback, useRef, useEffect } from 'react';

// ============================================================================
// Types
// ============================================================================

/**
 * Valid UI slot names
 */
export type UISlot =
  | 'main'
  | 'sidebar'
  | 'modal'
  | 'drawer'
  | 'overlay'
  | 'center'
  | 'toast'
  | 'hud-top'
  | 'hud-bottom'
  | 'floating';

/**
 * Animation types for slot transitions
 */
export type SlotAnimation = 'fade' | 'slide' | 'scale' | 'none';

/**
 * Content rendered in a slot
 */
export interface SlotContent {
  /** Unique ID for this content */
  id: string;
  /** Pattern/component type to render */
  pattern: string;
  /** Props to pass to the pattern component */
  props: Record<string, unknown>;
  /** Priority for conflict resolution (higher wins) */
  priority: number;
  /** Animation for showing/hiding */
  animation?: SlotAnimation;
  /** Auto-dismiss timestamp (for toasts) */
  autoDismissAt?: number;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Source trait that rendered this content */
  sourceTrait?: string;
}

/**
 * Configuration for render_ui effect
 */
export interface RenderUIConfig {
  /** Target slot */
  target: UISlot;
  /** Pattern/component to render */
  pattern: string;
  /** Props for the pattern */
  props?: Record<string, unknown>;
  /** Priority (default: 0) */
  priority?: number;
  /** Animation type */
  animation?: SlotAnimation;
  /** Auto-dismiss after ms (for toasts) */
  autoDismissMs?: number;
  /** Callback on dismiss */
  onDismiss?: () => void;
  /** Source trait name */
  sourceTrait?: string;
}

/**
 * Callback for slot changes
 */
export type SlotChangeCallback = (slot: UISlot, content: SlotContent | null) => void;

/**
 * UI Slot Manager interface
 */
export interface UISlotManager {
  /** Current content for each slot */
  slots: Record<UISlot, SlotContent | null>;
  /** Render content to a slot */
  render: (config: RenderUIConfig) => string;
  /** Clear a specific slot */
  clear: (slot: UISlot) => void;
  /** Clear content by ID */
  clearById: (id: string) => void;
  /** Clear all slots */
  clearAll: () => void;
  /** Subscribe to slot changes */
  subscribe: (callback: SlotChangeCallback) => () => void;
  /** Check if a slot has content */
  hasContent: (slot: UISlot) => boolean;
  /** Get content for a slot */
  getContent: (slot: UISlot) => SlotContent | null;
}

// ============================================================================
// Default Slots State
// ============================================================================

const DEFAULT_SLOTS: Record<UISlot, SlotContent | null> = {
  main: null,
  sidebar: null,
  modal: null,
  drawer: null,
  overlay: null,
  center: null,
  toast: null,
  'hud-top': null,
  'hud-bottom': null,
  floating: null,
};

// ============================================================================
// ID Generator
// ============================================================================

let idCounter = 0;
function generateId(): string {
  return `slot-content-${++idCounter}-${Date.now()}`;
}

// ============================================================================
// Hook Implementation
// ============================================================================

/**
 * Create a UI Slot Manager instance.
 *
 * This is the internal hook that creates the manager.
 * Use `useUISlots()` from context in components.
 */
export function useUISlotManager(): UISlotManager {
  const [slots, setSlots] = useState<Record<UISlot, SlotContent | null>>(DEFAULT_SLOTS);
  const subscribersRef = useRef<Set<SlotChangeCallback>>(new Set());
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  // Notify subscribers of slot changes
  const notifySubscribers = useCallback((slot: UISlot, content: SlotContent | null) => {
    subscribersRef.current.forEach((callback) => {
      try {
        callback(slot, content);
      } catch (error) {
        console.error('[UISlots] Subscriber error:', error);
      }
    });
  }, []);

  // Render content to a slot
  const render = useCallback((config: RenderUIConfig): string => {
    const id = generateId();
    const content: SlotContent = {
      id,
      pattern: config.pattern,
      props: config.props ?? {},
      priority: config.priority ?? 0,
      animation: config.animation ?? 'fade',
      onDismiss: config.onDismiss,
      sourceTrait: config.sourceTrait,
    };

    // Set auto-dismiss timer if specified
    if (config.autoDismissMs && config.autoDismissMs > 0) {
      content.autoDismissAt = Date.now() + config.autoDismissMs;
      const timer = setTimeout(() => {
        setSlots((prev) => {
          if (prev[config.target]?.id === id) {
            // Call onDismiss callback
            content.onDismiss?.();
            notifySubscribers(config.target, null);
            return { ...prev, [config.target]: null };
          }
          return prev;
        });
        timersRef.current.delete(id);
      }, config.autoDismissMs);
      timersRef.current.set(id, timer);
    }

    setSlots((prev) => {
      const existing = prev[config.target];

      // Priority-based conflict resolution
      if (existing && existing.priority > content.priority) {
        console.warn(
          `[UISlots] Slot "${config.target}" already has higher priority content (${existing.priority} > ${content.priority})`
        );
        return prev;
      }

      notifySubscribers(config.target, content);
      return { ...prev, [config.target]: content };
    });

    return id;
  }, [notifySubscribers]);

  // Clear a specific slot
  const clear = useCallback((slot: UISlot) => {
    setSlots((prev) => {
      const content = prev[slot];
      if (content) {
        // Clear any auto-dismiss timer
        const timer = timersRef.current.get(content.id);
        if (timer) {
          clearTimeout(timer);
          timersRef.current.delete(content.id);
        }
        // Call onDismiss callback
        content.onDismiss?.();
        notifySubscribers(slot, null);
      }
      return { ...prev, [slot]: null };
    });
  }, [notifySubscribers]);

  // Clear content by ID
  const clearById = useCallback((id: string) => {
    setSlots((prev) => {
      const entry = Object.entries(prev).find(([, content]) => content?.id === id);
      if (entry) {
        const [slot, content] = entry as [UISlot, SlotContent];
        // Clear any auto-dismiss timer
        const timer = timersRef.current.get(id);
        if (timer) {
          clearTimeout(timer);
          timersRef.current.delete(id);
        }
        // Call onDismiss callback
        content.onDismiss?.();
        notifySubscribers(slot, null);
        return { ...prev, [slot]: null };
      }
      return prev;
    });
  }, [notifySubscribers]);

  // Clear all slots
  const clearAll = useCallback(() => {
    // Clear all timers
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();

    setSlots((prev) => {
      // Call onDismiss for all content
      Object.entries(prev).forEach(([slot, content]) => {
        if (content) {
          content.onDismiss?.();
          notifySubscribers(slot as UISlot, null);
        }
      });
      return DEFAULT_SLOTS;
    });
  }, [notifySubscribers]);

  // Subscribe to slot changes
  const subscribe = useCallback((callback: SlotChangeCallback): (() => void) => {
    subscribersRef.current.add(callback);
    return () => {
      subscribersRef.current.delete(callback);
    };
  }, []);

  // Check if slot has content
  const hasContent = useCallback((slot: UISlot): boolean => {
    return slots[slot] !== null;
  }, [slots]);

  // Get content for a slot
  const getContent = useCallback((slot: UISlot): SlotContent | null => {
    return slots[slot];
  }, [slots]);

  return {
    slots,
    render,
    clear,
    clearById,
    clearAll,
    subscribe,
    hasContent,
    getContent,
  };
}

// ============================================================================
// Exports
// ============================================================================

export { DEFAULT_SLOTS };
