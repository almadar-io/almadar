/**
 * CounterTemplate
 * 
 * A presentational template for counter/incrementer features.
 * Supports increment, decrement, and reset operations.
 */

import React from 'react';
import { cn } from '../../lib/cn';
import { Container } from '../molecules/Container';
import { VStack, HStack } from '../atoms/Stack';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { Minus, Plus, RotateCcw } from 'lucide-react';

export type CounterSize = 'sm' | 'md' | 'lg';
export type CounterVariant = 'minimal' | 'standard' | 'full';

export interface CounterTemplateProps {
  /** Current count value */
  count: number;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step size for increment/decrement */
  step?: number;
  /** Called when increment is clicked */
  onIncrement?: () => void;
  /** Called when decrement is clicked */
  onDecrement?: () => void;
  /** Called when reset is clicked */
  onReset?: () => void;
  /** Title displayed above the counter */
  title?: string;
  /** Show reset button */
  showReset?: boolean;
  /** Counter display size */
  size?: CounterSize;
  /** Template variant */
  variant?: CounterVariant;
  /** Additional class name */
  className?: string;
}

const sizeStyles: Record<CounterSize, { display: string; button: 'sm' | 'md' | 'lg' }> = {
  sm: { display: 'text-4xl', button: 'sm' },
  md: { display: 'text-6xl', button: 'md' },
  lg: { display: 'text-8xl', button: 'lg' },
};

export const CounterTemplate: React.FC<CounterTemplateProps> = ({
  count,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onIncrement,
  onDecrement,
  onReset,
  title = 'Counter',
  showReset = true,
  size = 'md',
  variant = 'standard',
  className,
}) => {
  const canDecrement = count - step >= min;
  const canIncrement = count + step <= max;

  const renderMinimal = () => (
    <HStack gap="lg" align="center" justify="center" className={className}>
      <Button
        variant="secondary"
        size={sizeStyles[size].button}
        onClick={onDecrement}
        disabled={!canDecrement}
        leftIcon={<Minus className="h-4 w-4" />}
      >
        {step > 1 ? `-${step}` : ''}
      </Button>
      <Typography
        variant="h1"
        className={cn(sizeStyles[size].display, 'font-bold tabular-nums min-w-[3ch] text-center')}
      >
        {count}
      </Typography>
      <Button
        variant="secondary"
        size={sizeStyles[size].button}
        onClick={onIncrement}
        disabled={!canIncrement}
        leftIcon={<Plus className="h-4 w-4" />}
      >
        {step > 1 ? `+${step}` : ''}
      </Button>
    </HStack>
  );

  const renderStandard = () => (
    <Container size="sm" padding="lg" className={className}>
      <VStack gap="lg" align="center">
        <Typography variant="h2" className="text-gray-700">
          {title}
        </Typography>
        <Typography
          variant="h1"
          className={cn(sizeStyles[size].display, 'font-bold tabular-nums text-primary-600')}
        >
          {count}
        </Typography>
        <HStack gap="md">
          <Button
            variant="secondary"
            size={sizeStyles[size].button}
            onClick={onDecrement}
            disabled={!canDecrement}
            leftIcon={<Minus className="h-4 w-4" />}
          />
          <Button
            variant="primary"
            size={sizeStyles[size].button}
            onClick={onIncrement}
            disabled={!canIncrement}
            leftIcon={<Plus className="h-4 w-4" />}
          />
        </HStack>
        {showReset && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            leftIcon={<RotateCcw className="h-4 w-4" />}
          >
            Reset
          </Button>
        )}
      </VStack>
    </Container>
  );

  const renderFull = () => (
    <Container size="sm" padding="lg" className={className}>
      <VStack gap="xl" align="center">
        <Typography variant="h2" className="text-gray-700">
          {title}
        </Typography>
        <VStack gap="sm" align="center">
          <Typography
            variant="h1"
            className={cn(sizeStyles[size].display, 'font-bold tabular-nums text-primary-600')}
          >
            {count}
          </Typography>
          {(min !== -Infinity || max !== Infinity) && (
            <Typography variant="small" color="muted">
              Range: {min === -Infinity ? '-∞' : min} to {max === Infinity ? '∞' : max}
            </Typography>
          )}
        </VStack>
        <HStack gap="md">
          <Button
            variant="secondary"
            size={sizeStyles[size].button}
            onClick={onDecrement}
            disabled={!canDecrement}
            leftIcon={<Minus className="h-4 w-4" />}
          >
            {step > 1 ? step : ''}
          </Button>
          <Button
            variant="primary"
            size={sizeStyles[size].button}
            onClick={onIncrement}
            disabled={!canIncrement}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            {step > 1 ? step : ''}
          </Button>
        </HStack>
        {showReset && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            leftIcon={<RotateCcw className="h-4 w-4" />}
          >
            Reset to 0
          </Button>
        )}
      </VStack>
    </Container>
  );

  switch (variant) {
    case 'minimal':
      return renderMinimal();
    case 'full':
      return renderFull();
    default:
      return renderStandard();
  }
};

CounterTemplate.displayName = 'CounterTemplate';

export default CounterTemplate;
