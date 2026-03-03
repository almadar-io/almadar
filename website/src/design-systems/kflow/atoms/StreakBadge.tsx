/**
 * StreakBadge Atom
 *
 * Displays a streak day count with a fire icon.
 */

import React from "react";
import { Badge, Icon } from "@almadar/ui";
import { Flame } from "lucide-react";

export interface StreakBadgeProps {
  streakDay: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({
  streakDay,
  size = "sm",
  className,
}) => {
  const variant = streakDay >= 7 ? "warning" : streakDay >= 3 ? "success" : "default";
  return (
    <Badge size={size} variant={variant} className={className}>
      <Icon icon={Flame} size="xs" />
      {streakDay}d
    </Badge>
  );
};

StreakBadge.displayName = "StreakBadge";
