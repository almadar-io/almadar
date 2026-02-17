/**
 * DomainKeyword Atom Component
 *
 * Renders a syntax-highlighted keyword from the domain language.
 * Keywords like "A", "It has", "belongs to", "States:" are styled distinctly.
 */

import React from 'react';
import { clsx as cn } from 'clsx';

export type KeywordCategory =
  | 'entity'      // A, An, is
  | 'property'    // It has, belongs to, has many
  | 'state'       // It can be, It starts as, States:
  | 'behavior'    // From, to, when, Transitions:
  | 'guard'       // if, then, AND, OR
  | 'page'        // The, shows, Purpose:, URL:
  | 'effect';     // notify, update, emit, navigate

export interface DomainKeywordProps {
  /**
   * The keyword text to display
   */
  children: string;

  /**
   * Category of the keyword for styling
   */
  category?: KeywordCategory;

  /**
   * Size of the keyword
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the keyword is clickable
   * @default false
   */
  clickable?: boolean;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Auto-detect keyword category from the keyword text
 */
function detectCategory(keyword: string): KeywordCategory {
  const lower = keyword.toLowerCase().trim();

  // Entity keywords
  if (['a', 'an', 'is'].includes(lower)) return 'entity';

  // Property keywords
  if (['it has', 'has', 'belongs to', 'has many', 'has one'].includes(lower)) return 'property';

  // State keywords
  if (['it can be', 'can be', 'it starts as', 'starts as', 'states', 'states:'].includes(lower)) return 'state';

  // Behavior keywords
  if (['from', 'to', 'when', 'transitions', 'transitions:', 'every'].includes(lower)) return 'behavior';

  // Guard keywords
  if (['if', 'then', 'and', 'or', 'not'].includes(lower)) return 'guard';

  // Page keywords
  if (['the', 'shows', 'purpose', 'purpose:', 'url', 'url:', 'it displays', 'users can'].includes(lower)) return 'page';

  // Effect keywords
  if (['notify', 'update', 'emit', 'navigate', 'call'].includes(lower)) return 'effect';

  return 'entity'; // default
}

const categoryColors: Record<KeywordCategory, string> = {
  entity: 'var(--color-accent)',
  property: 'var(--color-info)',
  state: 'var(--color-warning)',
  behavior: 'var(--color-success)',
  guard: 'var(--color-error)',
  page: 'var(--color-primary)',
  effect: 'var(--color-warning)',
};

const categoryWeights: Record<KeywordCategory, string> = {
  entity: 'font-semibold',
  property: 'font-medium',
  state: 'font-medium',
  behavior: 'font-semibold',
  guard: 'font-medium',
  page: 'font-semibold',
  effect: 'font-medium',
};

export const DomainKeyword: React.FC<DomainKeywordProps> = ({
  children,
  category,
  size = 'md',
  clickable = false,
  onClick,
  className,
}) => {
  const resolvedCategory = category || detectCategory(children);

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const Component = clickable ? 'button' : 'span';

  return (
    <Component
      type={clickable ? 'button' : undefined}
      onClick={clickable ? onClick : undefined}
      className={cn(
        'inline font-mono',
        categoryWeights[resolvedCategory],
        sizeClasses[size],
        clickable && 'cursor-pointer hover:underline focus:outline-none focus:ring-2 focus:ring-offset-1 rounded',
        className
      )}
      style={{ color: categoryColors[resolvedCategory] }}
    >
      {children}
    </Component>
  );
};

DomainKeyword.displayName = 'DomainKeyword';

export default DomainKeyword;
