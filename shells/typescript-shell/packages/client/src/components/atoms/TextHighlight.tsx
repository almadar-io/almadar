/**
 * TextHighlight Atom Component
 * 
 * A styled span component for highlighting text with annotations (questions or notes).
 * Uses different colors for different annotation types:
 * - Questions: Blue highlight
 * - Notes: Yellow highlight
 */

import React from 'react';
import { cn } from '../../lib/cn';

export type HighlightType = 'question' | 'note';

export interface TextHighlightProps {
  /**
   * Type of highlight (determines color)
   */
  type: HighlightType;

  /**
   * Whether the highlight is currently active/focused
   * @default false
   */
  isActive?: boolean;

  /**
   * Callback when highlight is clicked
   */
  onClick?: () => void;

  /**
   * Callback when highlight is hovered
   */
  onMouseEnter?: () => void;

  /**
   * Callback when hover ends
   */
  onMouseLeave?: () => void;

  /**
   * Unique ID for the annotation
   */
  annotationId?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Highlighted text content
   */
  children: React.ReactNode;
}

/**
 * TextHighlight component for rendering highlighted text annotations
 */
export const TextHighlight: React.FC<TextHighlightProps> = ({
  type,
  isActive = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  annotationId,
  className,
  children,
}) => {
  const baseStyles = 'cursor-pointer transition-all duration-150';

  const typeStyles = {
    question: cn(
      // Blue border for questions
      'bg-white border-b-2 border-blue-600',
      'hover:bg-neutral-100',
      isActive && 'bg-blue-100 ring-2 ring-blue-600'
    ),
    note: cn(
      // Yellow border for notes
      'bg-white border-b-2 border-amber-500',
      'hover:bg-neutral-100',
      isActive && 'bg-amber-100 ring-2 ring-amber-500'
    ),
  };

  return (
    <span
      data-highlight="true"
      data-highlight-type={type}
      data-annotation-id={annotationId}
      className={cn(baseStyles, typeStyles[type], className)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {children}
    </span>
  );
};

TextHighlight.displayName = 'TextHighlight';

