/**
 * CustomPattern Component
 *
 * Renders freeform HTML elements with Tailwind classes for custom UI designs.
 * Supports nested children and the closed circuit pattern (action prop for events).
 *
 * @packageDocumentation
 */

import React from 'react';
import { useEventBus } from '../../hooks/useEventBus';
import { usePatternClasses } from '../../context/ThemeContext';
import { cn } from '../../lib/cn';

// ============================================================================
// Types
// ============================================================================

/**
 * Allowed HTML elements for custom patterns.
 */
export const ALLOWED_CUSTOM_COMPONENTS = [
  'div', 'span', 'button', 'a', 'p',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'header', 'footer', 'section', 'article', 'nav', 'main', 'aside',
  'ul', 'ol', 'li',
  'img', 'label', 'input', 'form',
] as const;

export type AllowedCustomComponent = (typeof ALLOWED_CUSTOM_COMPONENTS)[number];

/**
 * Check if a component name is allowed.
 */
export function isAllowedComponent(component: string): component is AllowedCustomComponent {
  return ALLOWED_CUSTOM_COMPONENTS.includes(component as AllowedCustomComponent);
}

/**
 * Interactive elements that require action prop for closed circuit.
 */
const INTERACTIVE_ELEMENTS = new Set<string>(['button', 'a']);

/**
 * Check if an element is interactive (requires action for closed circuit).
 */
export function isInteractiveElement(component: string): boolean {
  return INTERACTIVE_ELEMENTS.has(component);
}

// ============================================================================
// Props
// ============================================================================

export interface CustomPatternProps {
  /** HTML element to render */
  component: AllowedCustomComponent;
  /** Tailwind classes */
  className?: string;
  /** Token path(s) for design token resolution */
  token?: string | string[];
  /** Text content (for leaf elements) */
  content?: string;
  /** Event to emit on click (REQUIRED for interactive elements) */
  action?: string;
  /** Event payload */
  payload?: Record<string, unknown>;
  /** Nested children patterns */
  children?: React.ReactNode;
  /** Image source (for img elements) */
  src?: string;
  /** Image alt text (for img elements) */
  alt?: string;
  /** Link href (for a elements) */
  href?: string;
  /** Open link in new tab */
  external?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional HTML attributes */
  htmlProps?: Record<string, unknown>;
}

// ============================================================================
// Component
// ============================================================================

/**
 * Renders a custom HTML element with Tailwind styling.
 *
 * Follows the closed circuit pattern - interactive elements emit events via action prop.
 *
 * @example
 * ```tsx
 * <CustomPattern
 *   component="button"
 *   className="bg-blue-500 text-white px-4 py-2 rounded"
 *   action="SUBMIT"
 *   content="Submit"
 * />
 * ```
 */
export function CustomPattern({
  component,
  className,
  token,
  content,
  action,
  payload,
  children,
  src,
  alt,
  href,
  external,
  disabled,
  htmlProps,
}: CustomPatternProps): React.ReactElement | null {
  const { emit } = useEventBus();
  const tokenClasses = usePatternClasses(token, className);

  // Validate component
  if (!isAllowedComponent(component)) {
    console.warn(`CustomPattern: Unknown component "${component}", falling back to div`);
    return (
      <div className={cn(tokenClasses, 'p-4 border border-dashed border-red-300 text-red-500')}>
        Unknown component: {component}
      </div>
    );
  }

  // Handle click for interactive elements
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;

    // For links without action, let browser handle navigation
    if (component === 'a' && href && !action) {
      return;
    }

    // Emit event if action is defined
    if (action) {
      e.preventDefault();
      emit(`UI:${action}`, payload ?? {});
    }
  };

  // Build common props
  const commonProps: Record<string, unknown> = {
    className: tokenClasses || undefined,
    ...htmlProps,
  };

  // Add click handler for interactive elements or elements with action
  if (action || isInteractiveElement(component)) {
    commonProps.onClick = handleClick;
  }

  // Handle disabled state
  if (disabled) {
    commonProps['aria-disabled'] = true;
    if (component === 'button') {
      commonProps.disabled = true;
    }
  }

  // Determine content to render
  const renderContent = children ?? content;

  // Render based on component type
  switch (component) {
    case 'button':
      return (
        <button {...(commonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
          {renderContent}
        </button>
      );

    case 'a':
      return (
        <a
          href={href ?? '#'}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          {...(commonProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {renderContent}
        </a>
      );

    case 'img':
      return (
        <img
          src={src}
          alt={alt ?? ''}
          {...(commonProps as React.ImgHTMLAttributes<HTMLImageElement>)}
        />
      );

    case 'input':
      return (
        <input
          {...(commonProps as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      );

    case 'label':
      return (
        <label {...(commonProps as React.LabelHTMLAttributes<HTMLLabelElement>)}>
          {renderContent}
        </label>
      );

    case 'form':
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (action) {
              emit(`UI:${action}`, payload ?? {});
            }
          }}
          {...(commonProps as React.FormHTMLAttributes<HTMLFormElement>)}
        >
          {renderContent}
        </form>
      );

    // Heading elements
    case 'h1':
      return <h1 {...(commonProps as React.HTMLAttributes<HTMLHeadingElement>)}>{renderContent}</h1>;
    case 'h2':
      return <h2 {...(commonProps as React.HTMLAttributes<HTMLHeadingElement>)}>{renderContent}</h2>;
    case 'h3':
      return <h3 {...(commonProps as React.HTMLAttributes<HTMLHeadingElement>)}>{renderContent}</h3>;
    case 'h4':
      return <h4 {...(commonProps as React.HTMLAttributes<HTMLHeadingElement>)}>{renderContent}</h4>;
    case 'h5':
      return <h5 {...(commonProps as React.HTMLAttributes<HTMLHeadingElement>)}>{renderContent}</h5>;
    case 'h6':
      return <h6 {...(commonProps as React.HTMLAttributes<HTMLHeadingElement>)}>{renderContent}</h6>;

    // List elements
    case 'ul':
      return <ul {...(commonProps as React.HTMLAttributes<HTMLUListElement>)}>{renderContent}</ul>;
    case 'ol':
      return <ol {...(commonProps as React.HTMLAttributes<HTMLOListElement>)}>{renderContent}</ol>;
    case 'li':
      return <li {...(commonProps as React.HTMLAttributes<HTMLLIElement>)}>{renderContent}</li>;

    // Semantic elements
    case 'header':
      return <header {...(commonProps as React.HTMLAttributes<HTMLElement>)}>{renderContent}</header>;
    case 'footer':
      return <footer {...(commonProps as React.HTMLAttributes<HTMLElement>)}>{renderContent}</footer>;
    case 'section':
      return <section {...(commonProps as React.HTMLAttributes<HTMLElement>)}>{renderContent}</section>;
    case 'article':
      return <article {...(commonProps as React.HTMLAttributes<HTMLElement>)}>{renderContent}</article>;
    case 'nav':
      return <nav {...(commonProps as React.HTMLAttributes<HTMLElement>)}>{renderContent}</nav>;
    case 'main':
      return <main {...(commonProps as React.HTMLAttributes<HTMLElement>)}>{renderContent}</main>;
    case 'aside':
      return <aside {...(commonProps as React.HTMLAttributes<HTMLElement>)}>{renderContent}</aside>;

    // Generic elements
    case 'span':
      return <span {...(commonProps as React.HTMLAttributes<HTMLSpanElement>)}>{renderContent}</span>;
    case 'p':
      return <p {...(commonProps as React.HTMLAttributes<HTMLParagraphElement>)}>{renderContent}</p>;
    case 'div':
    default:
      return <div {...(commonProps as React.HTMLAttributes<HTMLDivElement>)}>{renderContent}</div>;
  }
}

CustomPattern.displayName = 'CustomPattern';

// ============================================================================
// Recursive Custom Pattern Renderer
// ============================================================================

export interface CustomPatternConfig {
  type: 'custom';
  component: AllowedCustomComponent;
  className?: string;
  token?: string | string[];
  content?: string;
  action?: string;
  payload?: Record<string, unknown>;
  children?: CustomPatternConfig[];
  src?: string;
  alt?: string;
  href?: string;
  external?: boolean;
  disabled?: boolean;
  [key: string]: unknown;
}

/**
 * Check if a pattern config is a custom pattern.
 */
export function isCustomPatternConfig(config: unknown): config is CustomPatternConfig {
  return (
    typeof config === 'object' &&
    config !== null &&
    (config as Record<string, unknown>).type === 'custom'
  );
}

/**
 * Recursively render custom pattern configurations.
 *
 * Use this to render nested custom patterns from render_ui effects.
 */
export function renderCustomPattern(
  config: CustomPatternConfig,
  key?: string | number
): React.ReactElement {
  const {
    component,
    className,
    token,
    content,
    action,
    payload,
    children,
    src,
    alt,
    href,
    external,
    disabled,
    ...rest
  } = config;

  // Recursively render children
  const renderedChildren = children?.map((child, index) =>
    renderCustomPattern(child, index)
  );

  return (
    <CustomPattern
      key={key}
      component={component}
      className={className}
      token={token}
      content={content}
      action={action}
      payload={payload}
      src={src}
      alt={alt}
      href={href}
      external={external}
      disabled={disabled}
      htmlProps={rest}
    >
      {renderedChildren}
    </CustomPattern>
  );
}

// ============================================================================
// Exports
// ============================================================================

export { ALLOWED_CUSTOM_COMPONENTS as CUSTOM_COMPONENT_TYPES };
