/**
 * FlashCardStack - Manages a stack of flashcards with navigation and progress
 *
 * Orbital Entity Binding:
 * - Data flows through `cards` prop from Orbital state
 * - User interactions emit events via useEventBus()
 *
 * Events Emitted:
 * - UI:CARD_CHANGED - When active card changes
 * - UI:STACK_COMPLETED - When all cards have been studied
 * - UI:SHUFFLE_CARDS - When shuffle is requested
 * - UI:RESET_STACK - When stack reset is requested
 */

import React, { useState, useCallback } from "react";
import { Shuffle, RotateCcw, CheckCircle } from "lucide-react";
import {
  Box,
  VStack,
  HStack,
  Card,
  Button,
  Typography,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { FlashCard, FlashCardEntity } from "./FlashCard";

export interface FlashCardStackProps {
  /** Array of flashcard entities */
  cards: FlashCardEntity[];
  /** Current card index (controlled) */
  currentIndex?: number;
  /** Show shuffle button */
  showShuffle?: boolean;
  /** Show completion summary */
  showSummary?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Entity name */
  entity?: string;
}

export const FlashCardStack: React.FC<FlashCardStackProps> = ({
  cards,
  currentIndex: controlledIndex,
  showShuffle = true,
  showSummary = true,
  className = "",
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex =
    controlledIndex !== undefined ? controlledIndex : internalIndex;

  const studiedCount = cards.filter((c) => c.studied).length;
  const isComplete = studiedCount === cards.length && cards.length > 0;

  const goToCard = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, cards.length - 1));
      if (controlledIndex === undefined) {
        setInternalIndex(clampedIndex);
      }
      emit("UI:CARD_CHANGED", {
        cardIndex: clampedIndex,
        cardId: cards[clampedIndex]?.id,
      });
    },
    [cards, controlledIndex, emit],
  );

  const handleShuffle = () => {
    emit("UI:SHUFFLE_CARDS", { cardIds: cards.map((c) => c.id) });
  };

  const handleReset = () => {
    if (controlledIndex === undefined) {
      setInternalIndex(0);
    }
    emit("UI:RESET_STACK", { cardIds: cards.map((c) => c.id) });
  };

  if (cards.length === 0) {
    return (
      <Card className={`border border-gray-200 ${className}`}>
        <VStack gap="sm" align="center" className="py-8 text-[var(--color-muted-foreground)]">
          <Typography variant="small" className="text-lg">{t('flashcard.noFlashcardsAvailable')}</Typography>
          <Typography variant="small" className="text-sm">{t('flashcard.addCardsToStart')}</Typography>
        </VStack>
      </Card>
    );
  }

  if (isComplete && showSummary) {
    return (
      <Card className={`shadow-md ${className} bg-green-50 border-green-200`}>
        <VStack gap="md" align="center" className="py-8">
          <CheckCircle size={48} className="text-green-500" />
          <Typography variant="small" className="text-xl font-semibold text-green-700">
            {t('flashcard.allCardsStudied')}
          </Typography>
          <Typography variant="small" className="text-sm text-green-600">
            {t('flashcard.completedAllCards', { count: cards.length })}
          </Typography>
          <Button
            variant="primary"
            size="sm"
            className="mt-4 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            {t('flashcard.studyAgain')}
          </Button>
        </VStack>
      </Card>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <VStack gap="md" className={`w-full max-w-md mx-auto ${className}`}>
      {/* Stack Controls */}
      <HStack justify="between" align="center">
        <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">
          {t('flashcard.studiedCount', { studied: studiedCount, total: cards.length })}
        </Typography>
        {showShuffle && (
          <Button
            variant="secondary"
            size="sm"
            className="p-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-gray-100 rounded"
            onClick={handleShuffle}
            title={t('flashcard.shuffleCards')}
          >
            <Shuffle size={18} />
          </Button>
        )}
      </HStack>

      {/* Progress dots */}
      <HStack gap="xs" justify="center" wrap>
        {cards.map((card, idx) => (
          <Button
            key={card.id}
            variant="secondary"
            size="sm"
            className={`w-3 h-3 rounded-full transition-all p-0 min-w-0 min-h-0 ${
              idx === currentIndex
                ? "bg-indigo-600 scale-125"
                : card.studied
                  ? "bg-green-500"
                  : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => goToCard(idx)}
            title={t('flashcard.cardNumber', { number: idx + 1 }) + (card.studied ? ` (${t('flashcard.studied')})` : '')}
          />
        ))}
      </HStack>

      {/* Current Card */}
      {currentCard && (
        <FlashCard
          entity={currentCard}
          currentCard={currentIndex + 1}
          totalCards={cards.length}
          showNavigation={true}
          showActions={true}
        />
      )}
    </VStack>
  );
};

FlashCardStack.displayName = "FlashCardStack";
