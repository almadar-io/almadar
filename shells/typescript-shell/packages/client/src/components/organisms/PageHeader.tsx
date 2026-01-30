import React from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../atoms';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEventBus } from '../../hooks/useEventBus';

export interface PageBreadcrumb {
  label: string;
  href?: string;
}

/**
 * Schema-based action definition
 */
export interface SchemaAction {
  label: string;
  /** Navigate to URL when clicked */
  navigatesTo?: string;
  /** Custom click handler */
  onClick?: () => void;
  /** Event to dispatch via event bus (for trait state machine integration) */
  event?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  icon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
}

export interface PageHeaderProps {
  /** Page title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Show back button */
  showBack?: boolean;
  /** Event to emit when back is clicked (default: BACK) */
  backEvent?: string;
  /** Breadcrumbs */
  breadcrumbs?: readonly PageBreadcrumb[];
  /** Status badge */
  status?: {
    label: string;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  };
  /** Actions array - first action with variant='primary' (or first action) is the main action */
  actions?: readonly Readonly<SchemaAction>[];
  /** Loading state indicator */
  isLoading?: boolean;
  /** Tabs for sub-navigation */
  tabs?: ReadonlyArray<{
    label: string;
    value: string;
    count?: number;
  }>;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  /** Custom content in the header */
  children?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  backEvent = 'BACK',
  breadcrumbs,
  status,
  actions,
  isLoading,
  tabs,
  activeTab,
  onTabChange,
  children,
  className,
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const eventBus = useEventBus();

  const handleBack = () => {
    // Emit event for trait state machine to handle
    // The trait can transition state and/or trigger navigate effect
    eventBus.emit(`UI:${backEvent}`);
  };

  /**
   * Replace template placeholders like {{id}} with actual URL params.
   * E.g., "/tasks/{{id}}/edit" with params {id: "123"} becomes "/tasks/123/edit"
   */
  const replacePlaceholders = (url: string): string => {
    return url.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      return String(params[key] || '');
    });
  };

  // Create click handler for schema actions
  const createActionHandler = (action: SchemaAction) => () => {
    // Emit event via event bus if defined (for trait state machine integration)
    if (action.event) {
      eventBus.emit(`UI:${action.event}`);
    }
    if (action.navigatesTo) {
      const resolvedUrl = replacePlaceholders(action.navigatesTo);
      navigate(resolvedUrl);
    }
    if (action.onClick) {
      action.onClick();
    }
  };

  const statusColors = {
    default: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  };

  return (
    <div className={cn('mb-6', className)}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-4">
          <ol className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-gray-400 dark:text-gray-500">/</span>}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-gray-900 dark:text-white font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </ol>
        </nav>
      )}

      {/* Main header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {showBack && (
            <button
              onClick={handleBack}
              className="mt-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
              {status && (
                <span
                  className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-medium',
                    statusColors[status.variant || 'default']
                  )}
                >
                  {status.label}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {actions?.map((action, idx) => (
            <Button
              key={`action-${idx}`}
              data-event={action.event}
              data-testid={action.event ? `action-${action.event}` : undefined}
              variant={action.variant || (idx === 0 ? 'primary' : 'secondary')}
              leftIcon={action.icon && <action.icon className="h-4 w-4" />}
              onClick={createActionHandler(action)}
              isLoading={action.loading || isLoading}
              disabled={action.disabled || isLoading}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      {tabs && tabs.length > 0 && (
        <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => onTabChange?.(tab.value)}
                className={cn(
                  'pb-3 text-sm font-bold border-b-2 transition-colors rounded-none',
                  activeTab === tab.value
                    ? 'border-black text-black'
                    : 'border-transparent text-neutral-500 hover:text-black hover:border-neutral-300'
                )}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className={cn(
                      'ml-2 px-2 py-0.5 rounded-full text-xs',
                      activeTab === tab.value
                        ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Custom content */}
      {children}
    </div>
  );
};
