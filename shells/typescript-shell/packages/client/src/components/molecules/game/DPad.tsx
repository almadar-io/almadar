import * as React from 'react';
import { cn } from '../../../lib/cn';
import { ControlButton } from '../../atoms/game/ControlButton';

export type DPadDirection = 'up' | 'down' | 'left' | 'right';

export interface DPadProps {
  /** Called when a direction is pressed/released */
  onDirection: (direction: DPadDirection, pressed: boolean) => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to include diagonal buttons */
  includeDiagonals?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
}

const sizeMap = {
  sm: { button: 'sm' as const, gap: 'gap-0.5', container: 'w-28' },
  md: { button: 'md' as const, gap: 'gap-1', container: 'w-40' },
  lg: { button: 'lg' as const, gap: 'gap-1.5', container: 'w-52' },
};

const arrowIcons: Record<DPadDirection, React.ReactNode> = {
  up: '▲',
  down: '▼',
  left: '◀',
  right: '▶',
};

export function DPad({
  onDirection,
  size = 'md',
  includeDiagonals = false,
  className,
  disabled,
}: DPadProps) {
  const sizes = sizeMap[size];
  const [activeDirections, setActiveDirections] = React.useState<Set<DPadDirection>>(new Set());

  const handlePress = React.useCallback(
    (direction: DPadDirection) => {
      setActiveDirections((prev) => new Set(prev).add(direction));
      onDirection(direction, true);
    },
    [onDirection]
  );

  const handleRelease = React.useCallback(
    (direction: DPadDirection) => {
      setActiveDirections((prev) => {
        const next = new Set(prev);
        next.delete(direction);
        return next;
      });
      onDirection(direction, false);
    },
    [onDirection]
  );

  const createButton = (direction: DPadDirection) => (
    <ControlButton
      key={direction}
      icon={arrowIcons[direction]}
      size={sizes.button}
      variant="secondary"
      pressed={activeDirections.has(direction)}
      onPress={() => handlePress(direction)}
      onRelease={() => handleRelease(direction)}
      disabled={disabled}
    />
  );

  return (
    <div className={cn('inline-grid grid-cols-3', sizes.gap, sizes.container, className)}>
      {/* Row 1: Empty, Up, Empty */}
      <div />
      {createButton('up')}
      <div />

      {/* Row 2: Left, Center, Right */}
      {createButton('left')}
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-gray-700 border-2 border-gray-600" />
      </div>
      {createButton('right')}

      {/* Row 3: Empty, Down, Empty */}
      <div />
      {createButton('down')}
      <div />
    </div>
  );
}

DPad.displayName = 'DPad';
