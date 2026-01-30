/**
 * LawReferenceBadge
 *
 * Displays a legal reference badge with gazette number and article.
 * Used throughout the inspection system to reference legal requirements.
 *
 * Event Contract:
 * - Emits: none (display only)
 * - entityAware: true
 */

import React from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Badge } from "../../../components/atoms/Badge";
import { Scale, BookOpen } from "lucide-react";

export interface LawReferenceBadgeProps {
  /** Official Gazette number */
  gazette?: string;
  /** Article reference */
  article?: string;
  /** Full law reference text */
  reference?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Show icon */
  showIcon?: boolean;
  /** Clickable - opens reference details */
  clickable?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

const sizeConfig = {
  sm: { text: "text-xs", icon: "h-3 w-3", padding: "px-1.5 py-0.5" },
  md: { text: "text-sm", icon: "h-4 w-4", padding: "px-2 py-1" },
  lg: { text: "text-base", icon: "h-5 w-5", padding: "px-3 py-1.5" },
};

export const LawReferenceBadge: React.FC<LawReferenceBadgeProps> = ({
  gazette,
  article,
  reference,
  size = "md",
  showIcon = true,
  clickable = false,
  className,
  onClick,
}) => {
  const sizes = sizeConfig[size];

  // Build display text
  const displayText = reference || (gazette && article)
    ? `${gazette ? `OG ${gazette}` : ""}${gazette && article ? " - " : ""}${article ? `Art. ${article}` : ""}`
    : reference || "No reference";

  return (
    <Box
      display="inline-flex"
      rounded="md"
      border
      className={cn(
        "items-center gap-1.5 bg-slate-50 border-slate-200",
        sizes.padding,
        clickable && "cursor-pointer hover:bg-slate-100 transition-colors",
        className
      )}
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {showIcon && (
        <Scale className={cn(sizes.icon, "text-slate-500")} />
      )}
      <Typography variant="small" className={cn(sizes.text, "font-medium text-slate-700")}>
        {displayText}
      </Typography>
    </Box>
  );
};

LawReferenceBadge.displayName = "LawReferenceBadge";
