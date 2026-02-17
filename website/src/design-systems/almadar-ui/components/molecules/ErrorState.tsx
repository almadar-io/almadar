import React from "react";
import { cn } from "../../lib/cn";
import { Button } from "../atoms";
import { AlertCircle } from "lucide-react";
import { useEventBus } from "../../hooks/useEventBus";

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
  title = "Something went wrong",
  message,
  description,
  onRetry,
  className,
  retryEvent,
}) => {
  const eventBus = useEventBus();

  const handleRetry = () => {
    if (retryEvent) eventBus.emit(`UI:${retryEvent}`, {});
    onRetry?.();
  };
  // Resolve alias: description → message
  const resolvedMessage = message ?? description ?? "An error occurred";
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
        {title}
      </h3>
      <p className="mt-1 text-sm text-[var(--color-muted-foreground)] max-w-sm">
        {resolvedMessage}
      </p>
      {(onRetry || retryEvent) && (
        <Button variant="secondary" className="mt-4" onClick={handleRetry}>
          Try again
        </Button>
      )}
    </div>
  );
};
