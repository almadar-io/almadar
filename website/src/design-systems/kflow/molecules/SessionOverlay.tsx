/**
 * SessionOverlay Molecule
 *
 * Floating bar showing session stats: time elapsed, nodes visited, XP earned,
 * and an "End Session" button.
 *
 * Events Emitted:
 * - UI:END_SESSION — When "End Session" is clicked
 */

import React from "react";
import { Card, HStack, Typography, Button, Icon } from "@almadar/ui";
import { Clock, MapPin, Zap, X } from "lucide-react";
import { useEventBus } from "@almadar/ui";

export interface SessionOverlayProps {
  timeSpent: number;
  nodesVisited: number;
  xpEarned: number;
  className?: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export const SessionOverlay: React.FC<SessionOverlayProps> = ({
  timeSpent,
  nodesVisited,
  xpEarned,
  className,
}) => {
  const { emit } = useEventBus();

  const handleEnd = () => {
    emit("UI:END_SESSION", { timeSpent, nodesVisited, xpEarned });
  };

  return (
    <Card
      padding="sm"
      shadow="md"
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 ${className ?? ""}`}
    >
      <HStack gap="md" align="center">
        <HStack gap="xs" align="center">
          <Icon icon={Clock} size="xs" />
          <Typography variant="label" size="sm">{formatTime(timeSpent)}</Typography>
        </HStack>
        <HStack gap="xs" align="center">
          <Icon icon={MapPin} size="xs" />
          <Typography variant="label" size="sm">{nodesVisited} nodes</Typography>
        </HStack>
        <HStack gap="xs" align="center">
          <Icon icon={Zap} size="xs" />
          <Typography variant="label" size="sm">{xpEarned} XP</Typography>
        </HStack>
        <Button size="sm" variant="ghost" onClick={handleEnd} icon={X}>
          End
        </Button>
      </HStack>
    </Card>
  );
};

SessionOverlay.displayName = "SessionOverlay";
