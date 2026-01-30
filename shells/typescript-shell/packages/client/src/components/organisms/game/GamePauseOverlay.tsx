import * as React from 'react';
import { cn } from '../../../lib/cn';
import { useEventBus, type EventBusContextType } from '../../../hooks/useEventBus';

export interface PauseOption {
  /** Display label */
  label: string;
  /** Event to emit on click */
  event?: string;
  /** Page to navigate to */
  navigatesTo?: string;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
}

export interface GamePauseOverlayProps {
  /** Pause menu options */
  options: PauseOption[];
  /** Called when an option is selected (legacy callback, prefer event bus) */
  onSelect?: (option: PauseOption) => void;
  /** Event bus for emitting UI events (optional, uses hook if not provided) */
  eventBus?: EventBusContextType;
  /** Title (default: "PAUSED") */
  title?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether the pause menu is visible */
  visible?: boolean;
  /** Called when clicking outside the menu */
  onDismiss?: () => void;
}

const variantMap = {
  primary:
    'bg-blue-600 hover:bg-blue-500 text-white border-blue-400',
  secondary:
    'bg-gray-700 hover:bg-gray-600 text-white border-gray-500',
  ghost:
    'bg-transparent hover:bg-white/10 text-white border-white/20',
  destructive:
    'bg-red-600 hover:bg-red-500 text-white border-red-400',
};

export function GamePauseOverlay({
  options,
  onSelect,
  eventBus: eventBusProp,
  title = 'PAUSED',
  className,
  visible = true,
  onDismiss,
}: GamePauseOverlayProps) {
  // Use provided eventBus or get from context (with fallback for outside provider)
  let eventBusFromHook: EventBusContextType | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    eventBusFromHook = useEventBus();
  } catch {
    // Outside EventBusProvider context - will use prop or skip emission
  }
  const eventBus = eventBusProp || eventBusFromHook;

  const handleOptionClick = React.useCallback(
    (option: PauseOption) => {
      // Emit event to event bus for closed circuit pattern
      if (option.event && eventBus) {
        eventBus.emit(`UI:${option.event}`, { option });
      }

      // Call legacy callback if provided
      if (onSelect) {
        onSelect(option);
      }
    },
    [eventBus, onSelect]
  );

  // Handle escape key to dismiss (also emits RESUME event)
  React.useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Emit RESUME event on escape (matches pause overlay circuit contract)
        if (eventBus) {
          eventBus.emit('UI:RESUME', {});
        }
        if (onDismiss) {
          onDismiss();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible, onDismiss, eventBus]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        'absolute inset-0 z-50 flex items-center justify-center',
        'bg-black/75 backdrop-blur-sm',
        'animate-in fade-in duration-200',
        className
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget && onDismiss) {
          onDismiss();
        }
      }}
    >
      <div className="bg-gray-900/90 border-2 border-gray-700 rounded-2xl p-8 min-w-80 shadow-2xl">
        {/* Title */}
        <h2
          className="text-4xl font-bold text-white text-center mb-8 tracking-widest"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
        >
          {title}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={cn(
                'w-full py-3 px-6 rounded-lg border-2 font-bold',
                'transition-all duration-150',
                'hover:scale-105 active:scale-95',
                'focus:outline-none focus:ring-2 focus:ring-white/25',
                variantMap[option.variant ?? 'secondary']
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Hint */}
        {onDismiss && (
          <p className="mt-6 text-center text-gray-500 text-sm">
            Press ESC to resume
          </p>
        )}
      </div>
    </div>
  );
}

GamePauseOverlay.displayName = 'GamePauseOverlay';
