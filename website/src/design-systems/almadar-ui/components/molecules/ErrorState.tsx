import React from "react";
import { cn } from "../../lib/cn";
import { Button } from "../atoms";
import { AlertCircle } from "lucide-react";
import { useEventBus } from "../../hooks/useEventBus";
import { useTranslate } from "../../hooks/useTranslate";

export interface ErrorStateProps {
  title?: string;
  /** Error message to display */
  message?: string;
  /** Alias for message (schema compatibility) */
  description?: string;
  onRetry?: () => void;
  className?: string;
  /** Declarative retry event — emits UI:{retryEvent} via eventBus when retry button is clicked */
  retryEvent?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  description,
  onRetry,
  className,
  retryEvent,
}) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();

  const handleRetry = () => {
    if (retryEvent) eventBus.emit(`UI:${retryEvent}`, {});
    onRetry?.();
  };
  // Resolve alias: description → message
  const resolvedTitle = title ?? t('error.generic');
  const resolvedMessage = message ?? description ?? t('error.occurred');
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 text-center",
        className,
      )}
    >
      <div className="mb-4 rounded-[var(--radius-full)] bg-[var(--color-error)]/10 p-3">
        <AlertCircle className="h-8 w-8 text-[var(--color-error)]" />
      </div>
      <h3 className="text-lg font-medium text-[var(--color-foreground)]">
        {resolvedTitle}
      </h3>
      <p className="mt-1 text-sm text-[var(--color-muted-foreground)] max-w-sm">
        {resolvedMessage}
      </p>
      {(onRetry || retryEvent) && (
        <Button variant="secondary" className="mt-4" onClick={handleRetry}>
          {t('error.retry')}
        </Button>
      )}
    </div>
  );
};

ErrorState.displayName = "ErrorState";
