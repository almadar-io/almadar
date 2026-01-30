import * as React from 'react';
import { cn } from '../../../lib/cn';
import { DPad, type DPadDirection } from '../../molecules/game/DPad';
import { ActionButtons, type ActionButtonConfig } from '../../molecules/game/ActionButtons';
import { ControlButton } from '../../atoms/game/ControlButton';

export interface GameControl {
  /** Unique identifier */
  id: string;
  /** Event to emit on press */
  event: string;
  /** Display label */
  label?: string;
  /** Icon component or emoji */
  icon?: React.ReactNode;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost' | string;
}

export interface GameControlsProps {
  /** Control layout type */
  layout: 'dpad' | 'joystick' | 'buttons' | 'custom' | string;
  /** Position on screen */
  position: 'bottom-left' | 'bottom-right' | 'bottom-center' | 'split' | string;
  /** Controls to display - accepts readonly for compatibility with generated const arrays */
  controls?: readonly GameControl[];
  /** Called when control is pressed/released */
  onControl?: (event: string, pressed: boolean) => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Whether controls are visible */
  visible?: boolean;
  /** Opacity when visible */
  opacity?: number;
}

const positionMap: Record<string, string> = {
  'bottom-left': 'absolute bottom-4 left-4',
  'bottom-right': 'absolute bottom-4 right-4',
  'bottom-center': 'absolute bottom-4 left-1/2 -translate-x-1/2',
  split: 'absolute bottom-4 left-0 right-0 flex justify-between px-4',
};

export function GameControls({
  layout,
  position,
  controls = [],
  onControl = () => {},
  size = 'md',
  className,
  visible = true,
  opacity = 0.9,
}: GameControlsProps) {
  if (!visible) return null;

  // Direction mapping for DPad
  const directionToEvent: Record<DPadDirection, string | undefined> = {
    up: controls.find((c) => c.id === 'up')?.event,
    down: controls.find((c) => c.id === 'down')?.event,
    left: controls.find((c) => c.id === 'left')?.event,
    right: controls.find((c) => c.id === 'right')?.event,
  };

  const handleDirection = (direction: DPadDirection, pressed: boolean) => {
    const event = directionToEvent[direction];
    if (event) {
      onControl(event, pressed);
    }
  };

  // Separate directional and action controls
  const directionControls = controls.filter((c) =>
    ['up', 'down', 'left', 'right'].includes(c.id)
  );
  const actionControls = controls.filter(
    (c) => !['up', 'down', 'left', 'right'].includes(c.id)
  );

  // Split layout: DPad on left, actions on right
  if (position === 'split') {
    return (
      <div className={cn(positionMap[position], className)} style={{ opacity }}>
        {/* Left side: DPad or direction buttons */}
        {layout === 'dpad' && directionControls.length > 0 ? (
          <DPad size={size} onDirection={handleDirection} />
        ) : (
          <div className="flex gap-2">
            {directionControls.map((control) => (
              <ControlButton
                key={control.id}
                icon={control.icon}
                label={control.label}
                size={size}
                variant={control.variant ?? 'secondary'}
                onPress={() => onControl(control.event, true)}
                onRelease={() => onControl(control.event, false)}
              />
            ))}
          </div>
        )}

        {/* Right side: Action buttons */}
        <ActionButtons
          buttons={actionControls.map((c) => ({
            id: c.id,
            label: c.label,
            icon: c.icon,
            variant: c.variant,
          }))}
          onAction={(id, pressed) => {
            const control = actionControls.find((c) => c.id === id);
            if (control) onControl(control.event, pressed);
          }}
          layout={actionControls.length === 4 ? 'diamond' : 'horizontal'}
          size={size}
        />
      </div>
    );
  }

  // Non-split layouts
  if (layout === 'dpad') {
    return (
      <div className={cn(positionMap[position], className)} style={{ opacity }}>
        <DPad size={size} onDirection={handleDirection} />
      </div>
    );
  }

  if (layout === 'buttons' || layout === 'custom') {
    return (
      <div className={cn(positionMap[position], className)} style={{ opacity }}>
        <div className="flex gap-2 flex-wrap">
          {controls.map((control) => (
            <ControlButton
              key={control.id}
              icon={control.icon}
              label={control.label}
              size={size}
              variant={control.variant ?? 'secondary'}
              onPress={() => onControl(control.event, true)}
              onRelease={() => onControl(control.event, false)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Joystick layout (future: implement virtual joystick)
  return (
    <div className={cn(positionMap[position], className)} style={{ opacity }}>
      <div className="w-24 h-24 rounded-full bg-gray-700/50 border-4 border-gray-600 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-gray-500" />
      </div>
    </div>
  );
}

GameControls.displayName = 'GameControls';
