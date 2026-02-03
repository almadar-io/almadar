/**
 * FlashCardStack - Manages a stack of flashcards with navigation and progress
 *
 * Almadar Entity Binding:
 * - Data flows through `cards` prop from Almadar state
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
import { Box } from "../../../components/atoms/Box";
import { VStack } from "../../../components/atoms/Stack";
import { HStack } from "../../../components/atoms/Stack";
import { Card } from "../../../components/molecules/Card";
import { FlashCard, FlashCardEntity } from "./FlashCard";
import { useEventBus } from "../../../hooks/useEventBus";

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
}

export const FlashCardStack: React.FC<FlashCardStackProps> = ({
  cards,
  currentIndex: controlledIndex,
  showShuffle = true,
  showSummary = true,
  className = "",
}) => {
  const { emit } = useEventBus();
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
        <VStack gap="sm" align="center" className="py-8 text-gray-500">
          <span className="text-lg">No flashcards available</span>
          <span className="text-sm">Add some cards to start studying</span>
        </VStack>
      </Card>
    );
  }

  if (isComplete && showSummary) {
    return (
      <Card className={`shadow-md ${className} bg-green-50 border-green-200`}>
        <VStack gap="md" align="center" className="py-8">
          <CheckCircle size={48} className="text-green-500" />
          <span className="text-xl font-semibold text-green-700">
            All cards studied!
          </span>
          <span className="text-sm text-green-600">
            You've completed all {cards.length} flashcards
          </span>
          <button
            className="mt-4 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            Study Again
          </button>
        </VStack>
      </Card>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <VStack gap="md" className={`w-full max-w-md mx-auto ${className}`}>
      {/* Stack Controls */}
      <HStack justify="between" align="center">
        <span className="text-sm text-gray-500">
          {studiedCount} of {cards.length} studied
        </span>
        {showShuffle && (
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            onClick={handleShuffle}
            title="Shuffle cards"
          >
            <Shuffle size={18} />
          </button>
        )}
      </HStack>

      {/* Progress dots */}
      <HStack gap="xs" justify="center" wrap>
        {cards.map((card, idx) => (
          <button
            key={card.id}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentIndex
                ? "bg-indigo-600 scale-125"
                : card.studied
                  ? "bg-green-500"
                  : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => goToCard(idx)}
            title={`Card ${idx + 1}${card.studied ? " (studied)" : ""}`}
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
