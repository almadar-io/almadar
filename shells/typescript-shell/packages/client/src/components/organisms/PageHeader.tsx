import React from "react";
import { cn } from "../../lib/cn";
import { Button } from "../atoms";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEventBus } from "../../hooks/useEventBus";

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
  variant?: "primary" | "secondary" | "ghost" | "danger";
  icon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
}

export interface PageHeaderProps {
  /** Page title - accepts unknown to handle generated code accessing dynamic entity data */
  title?: string | number | unknown;
  /** Optional subtitle/description */
  subtitle?: string | number | unknown;
  /** Show back button */
  showBack?: boolean;
  /** Event to emit when back is clicked (default: BACK) */
  backEvent?: string;
  /** Breadcrumbs */
  breadcrumbs?: readonly PageBreadcrumb[];
  /** Status badge */
  status?: {
    label: string;
    variant?: "default" | "success" | "warning" | "danger" | "info";
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
  backEvent = "BACK",
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
      return String(params[key] || "");
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
    default: "bg-[var(--color-muted)] text-[var(--color-foreground)]",
    success: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
    warning: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
    danger: "bg-[var(--color-error)]/10 text-[var(--color-error)]",
    info: "bg-[var(--color-info)]/10 text-[var(--color-info)]",
  };

  return (
    <div className={cn("mb-6", className)}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-4">
          <ol className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <span className="text-[var(--color-muted-foreground)]">
                    /
                  </span>
                )}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-[var(--color-foreground)] font-medium">
                    {crumb.label}
                  </span>
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
              className="mt-1 p-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-muted)] transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-[var(--color-muted-foreground)]" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[var(--color-foreground)]">
                {title != null ? String(title) : ""}
              </h1>
              {status && (
                <span
                  className={cn(
                    "px-2.5 py-1 rounded-[var(--radius-full)] text-xs font-medium",
                    statusColors[status.variant || "default"],
                  )}
                >
                  {status.label}
                </span>
              )}
            </div>
            {subtitle != null && subtitle !== "" && (
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                {String(subtitle)}
              </p>
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
              variant={action.variant || (idx === 0 ? "primary" : "secondary")}
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
        <div className="mt-6 border-b border-[var(--color-border)]">
          <nav className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => onTabChange?.(tab.value)}
                className={cn(
                  "pb-3 text-sm font-bold border-b-2 transition-colors rounded-none",
                  activeTab === tab.value
                    ? "border-[var(--color-primary)] text-[var(--color-foreground)]"
                    : "border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:border-[var(--color-border)]",
                )}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className={cn(
                      "ml-2 px-2 py-0.5 rounded-[var(--radius-full)] text-xs",
                      activeTab === tab.value
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                        : "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]",
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
