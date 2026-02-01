import React from "react";
import { cn } from "../../lib/cn";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

// Using CSS variables for theme-aware styling
const variantStyles = {
  default: [
    "bg-[var(--color-muted)] text-[var(--color-foreground)]",
    "border-[length:var(--border-width-thin)] border-[var(--color-border)]",
  ].join(" "),
  primary: "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]",
  success: [
    "bg-[var(--color-surface)] text-[var(--color-success)]",
    "border-[length:var(--border-width)] border-[var(--color-success)]",
  ].join(" "),
  warning: [
    "bg-[var(--color-surface)] text-[var(--color-warning)]",
    "border-[length:var(--border-width)] border-[var(--color-warning)]",
  ].join(" "),
  danger: [
    "bg-[var(--color-surface)] text-[var(--color-error)]",
    "border-[length:var(--border-width)] border-[var(--color-error)]",
  ].join(" "),
  info: [
    "bg-[var(--color-surface)] text-[var(--color-info)]",
    "border-[length:var(--border-width)] border-[var(--color-info)]",
  ].join(" "),
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "sm", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-bold rounded-[var(--radius-sm)]",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";
