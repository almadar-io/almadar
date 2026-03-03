/**
 * ReviewCard Molecule
 *
 * Spaced-review card displaying a node title with recall quality rating buttons (1-5).
 * Uses SM-2 quality scale: 1 = complete blackout, 5 = perfect recall.
 *
 * Events Emitted:
 * - UI:REVIEW_ANSWER — When quality button is clicked
 * - UI:SKIP_REVIEW — When skip is clicked
 */

import React from "react";
import { Card, VStack, HStack, Typography, Button } from "@almadar/ui";
import { useEventBus } from "@almadar/ui";
import type { ReviewItem } from "../types/knowledge";
import { DomainBadge } from "../atoms/DomainBadge";

export interface ReviewCardProps {
  item: ReviewItem;
  showAnswer?: boolean;
  className?: string;
}

const QUALITY_LABELS = ["", "Again", "Hard", "OK", "Good", "Easy"];
const QUALITY_VARIANTS: Array<"danger" | "warning" | "warning" | "default" | "success" | "success"> = [
  "danger", "danger", "warning", "warning", "default", "success",
];

export const ReviewCard: React.FC<ReviewCardProps> = ({
  item,
  showAnswer = false,
  className,
}) => {
  const { emit } = useEventBus();

  const handleQuality = (quality: number) => {
    emit("UI:REVIEW_ANSWER", {
      nodeId: item.nodeId,
      quality,
    });
  };

  const handleSkip = () => {
    emit("UI:SKIP_REVIEW", { nodeId: item.nodeId });
  };

  return (
    <Card padding="md" className={className}>
      <VStack gap="md">
        <HStack gap="sm" align="center">
          <Typography variant="h4" size="md">
            {item.nodeTitle}
          </Typography>
          <DomainBadge domain={item.domain} size="sm" />
        </HStack>
        <Typography variant="body" size="xs" color="muted">
          {item.subject} — last reviewed {item.lastReviewed}
        </Typography>

        {showAnswer && (
          <VStack gap="sm">
            <Typography variant="label" size="sm" color="muted">
              How well did you recall this?
            </Typography>
            <HStack gap="xs" wrap>
              {[1, 2, 3, 4, 5].map((q) => (
                <Button
                  key={q}
                  size="sm"
                  variant={QUALITY_VARIANTS[q]}
                  onClick={() => handleQuality(q)}
                >
                  {q}. {QUALITY_LABELS[q]}
                </Button>
              ))}
            </HStack>
          </VStack>
        )}

        <HStack justify="end">
          <Button size="sm" variant="ghost" onClick={handleSkip}>
            Skip
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

ReviewCard.displayName = "ReviewCard";
