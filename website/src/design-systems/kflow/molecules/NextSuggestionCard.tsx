/**
 * NextSuggestionCard Molecule
 *
 * "What's next" card showing a suggested learning action with domain badge,
 * type icon, and action button.
 *
 * Events Emitted:
 * - UI:CONTINUE_LEARNING — When "Continue" is clicked
 * - UI:START_REVIEW — When "Review" is clicked
 * - UI:OPEN_EXPLORER — When "Explore" is clicked
 */

import React from "react";
import { Card, VStack, HStack, Typography, Button, Icon } from "@almadar/ui";
import { BookOpen, RefreshCw, Compass, Sword, Sparkles } from "lucide-react";
import { useEventBus } from "@almadar/ui";
import type { NextSuggestion, NextSuggestionType } from "../types/knowledge";
import { DomainBadge } from "../atoms/DomainBadge";

export interface NextSuggestionCardProps {
  suggestion: NextSuggestion;
  onSelect?: () => void;
  className?: string;
}

const TYPE_CONFIG: Record<NextSuggestionType, { icon: typeof BookOpen; label: string; event: string }> = {
  continue: { icon: BookOpen, label: "Continue", event: "CONTINUE_LEARNING" },
  review: { icon: RefreshCw, label: "Review", event: "START_REVIEW" },
  explore: { icon: Compass, label: "Explore", event: "OPEN_EXPLORER" },
  challenge: { icon: Sword, label: "Challenge", event: "START_CHALLENGE" },
  discovery: { icon: Sparkles, label: "Discover", event: "VIEW_DISCOVERY" },
};

export const NextSuggestionCard: React.FC<NextSuggestionCardProps> = ({
  suggestion,
  onSelect,
  className,
}) => {
  const { emit } = useEventBus();
  const config = TYPE_CONFIG[suggestion.type];

  const handleClick = () => {
    emit(`UI:${config.event}`, {
      nodeId: suggestion.nodeId,
      subjectId: suggestion.subjectId,
      type: suggestion.type,
    });
    onSelect?.();
  };

  return (
    <Card variant="interactive" padding="md" className={className}>
      <VStack gap="sm">
        <HStack gap="sm" align="center">
          <Icon icon={config.icon} size="sm" className="text-[var(--color-primary)]" />
          <Typography variant="label" size="sm" truncate>
            {suggestion.title}
          </Typography>
          <DomainBadge domain={suggestion.domain} size="sm" />
        </HStack>
        <Typography variant="body" size="xs" color="muted" overflow="clamp-2">
          {suggestion.description}
        </Typography>
        <Button size="sm" variant="primary" onClick={handleClick}>
          {config.label}
        </Button>
      </VStack>
    </Card>
  );
};

NextSuggestionCard.displayName = "NextSuggestionCard";
