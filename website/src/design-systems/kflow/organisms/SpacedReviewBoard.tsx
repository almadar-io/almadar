/* eslint-disable almadar/organism-extends-entity-display */
/**
 * SpacedReviewBoard Organism
 *
 * Stack of ReviewCard items with SM-2 quality rating.
 * Presents one card at a time, tracks session stats.
 *
 * Events Emitted:
 * - UI:REVIEW_ANSWER — Quality rating for current card (via ReviewCard)
 * - UI:SKIP_REVIEW — Skip current card (via ReviewCard)
 * - UI:REVIEW_SESSION_COMPLETE — All reviews done
 */

import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Typography,
  Card,
  Button,
  Container,
  ProgressBar,
  PageHeader,
  useEventBus,
  useTranslate,
} from "@almadar/ui";
import { CheckCircle } from "lucide-react";
import type { ReviewItem } from "../types/knowledge";
import { ReviewCard } from "../molecules/ReviewCard";

export interface SpacedReviewEntity {
  items: ReviewItem[];
  currentIndex: number;
  sessionStats: {
    reviewed: number;
    skipped: number;
    averageQuality: number;
  };
}

export interface SpacedReviewBoardProps {
  entity: SpacedReviewEntity;
  className?: string;
}

export function SpacedReviewBoard({
  entity,
  className = "",
}: SpacedReviewBoardProps): React.JSX.Element {
  const { emit, on } = useEventBus();
  const { t } = useTranslate();
  const { items } = entity;
  const [currentIdx, setCurrentIdx] = useState(entity.currentIndex);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewed, setReviewed] = useState(entity.sessionStats.reviewed);
  const [skipped, setSkipped] = useState(entity.sessionStats.skipped);

  const isComplete = currentIdx >= items.length;
  const current = !isComplete ? items[currentIdx] : null;

  const advance = useCallback(() => {
    setShowAnswer(false);
    setCurrentIdx((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const unsubs = [
      on("UI:REVIEW_ANSWER", () => {
        setReviewed((r) => r + 1);
        advance();
      }),
      on("UI:SKIP_REVIEW", () => {
        setSkipped((s) => s + 1);
        advance();
      }),
    ];
    return () => unsubs.forEach((u) => u());
  }, [on, advance]);

  useEffect(() => {
    if (isComplete && items.length > 0) {
      emit("UI:REVIEW_SESSION_COMPLETE", { reviewed, skipped });
    }
  }, [isComplete, items.length, emit, reviewed, skipped]);

  return (
    <Box className={`min-h-screen bg-[var(--color-background)] ${className}`}>
      <PageHeader
        title={t('review.title')}
        subtitle={`${Math.min(currentIdx + 1, items.length)} / ${items.length}`}
      >
        <ProgressBar
          value={currentIdx}
          max={Math.max(items.length, 1)}
          size="sm"
          variant="primary"
        />
      </PageHeader>

      <Container size="lg" padding="sm" className="py-6">
        {isComplete ? (
          <Card>
            <VStack gap="md" align="center" className="py-12">
              <CheckCircle size={48} className="text-[var(--color-success)]" />
              <Typography variant="h1" className="text-2xl font-bold text-[var(--color-foreground)]">
                {t('review.sessionComplete')}
              </Typography>
              <HStack gap="lg">
                <VStack gap="xs" align="center">
                  <Typography variant="small" className="text-2xl font-medium">{reviewed}</Typography>
                  <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">
                    {t('review.reviewed')}
                  </Typography>
                </VStack>
                <VStack gap="xs" align="center">
                  <Typography variant="small" className="text-2xl font-medium">{skipped}</Typography>
                  <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">
                    {t('review.skipped')}
                  </Typography>
                </VStack>
              </HStack>
            </VStack>
          </Card>
        ) : current ? (
          <VStack gap="md">
            <ReviewCard item={current} showAnswer={showAnswer} />
            {!showAnswer && (
              <Button
                variant="primary"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
                onClick={() => setShowAnswer(true)}
              >
                {t('review.showAnswer')}
              </Button>
            )}
          </VStack>
        ) : null}
      </Container>
    </Box>
  );
}

SpacedReviewBoard.displayName = "SpacedReviewBoard";
