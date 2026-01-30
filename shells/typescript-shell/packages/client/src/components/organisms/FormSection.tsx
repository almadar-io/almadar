import React from 'react';
import { cn } from '../../lib/cn';
import { Card, CardHeader, CardTitle, CardContent } from '../atoms';

export interface FormSectionProps {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Form fields */
  children: React.ReactNode;
  /** Collapsible */
  collapsible?: boolean;
  /** Default collapsed state */
  defaultCollapsed?: boolean;
  /** Use card wrapper */
  card?: boolean;
  /** Grid columns for fields */
  columns?: 1 | 2 | 3;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  collapsible = false,
  defaultCollapsed = false,
  card = false,
  columns = 1,
  className,
}) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }[columns];

  const content = (
    <>
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <div
              className={cn(
                'flex items-center justify-between',
                collapsible && 'cursor-pointer'
              )}
              onClick={() => collapsible && setCollapsed(!collapsed)}
            >
              <h3 className="text-base font-semibold text-gray-900">{title}</h3>
              {collapsible && (
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <svg
                    className={cn(
                      'h-5 w-5 text-gray-400 transition-transform',
                      collapsed && 'rotate-180'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}
      {(!collapsible || !collapsed) && (
        <div className={cn('grid gap-4', gridClass)}>{children}</div>
      )}
    </>
  );

  if (card) {
    return (
      <Card className={cn('p-6', className)}>
        {content}
      </Card>
    );
  }

  return <div className={className}>{content}</div>;
};

/**
 * Form layout with multiple sections
 */
export interface FormLayoutProps {
  children: React.ReactNode;
  /** Show section dividers */
  dividers?: boolean;
  className?: string;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  dividers = true,
  className,
}) => {
  return (
    <div
      className={cn(
        'space-y-8',
        dividers && '[&>*+*]:pt-8 [&>*+*]:border-t [&>*+*]:border-gray-200',
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Form actions bar (submit/cancel buttons)
 */
export interface FormActionsProps {
  children: React.ReactNode;
  /** Sticky at bottom */
  sticky?: boolean;
  /** Alignment */
  align?: 'left' | 'right' | 'between' | 'center';
  className?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  children,
  sticky = false,
  align = 'right',
  className,
}) => {
  const alignClass = {
    left: 'justify-start',
    right: 'justify-end',
    between: 'justify-between',
    center: 'justify-center',
  }[align];

  return (
    <div
      className={cn(
        'flex items-center gap-3 pt-6 border-t border-gray-200',
        alignClass,
        sticky && 'sticky bottom-0 bg-white py-4 -mx-6 px-6 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]',
        className
      )}
    >
      {children}
    </div>
  );
};
