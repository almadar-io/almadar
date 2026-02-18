import React from "react";
import { cn } from "../../lib/cn";
import { Spinner } from "../atoms";
import { useTranslate } from "../../hooks/useTranslate";

export interface LoadingStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  title,
  message,
  className,
}) => {
  const { t } = useTranslate();
  const displayMessage = message ?? t('common.loading');
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12",
        className,
      )}
    >
      <Spinner size="lg" />
      {title && (
        <h3 className="mt-4 text-lg font-semibold text-[var(--color-foreground)]">
          {title}
        </h3>
      )}
      <p
        className={cn(
          "text-sm text-[var(--color-muted-foreground)]",
          title ? "mt-2" : "mt-4",
        )}
      >
        {displayMessage}
      </p>
    </div>
  );
};

LoadingState.displayName = "LoadingState";
