/**
 * FlashCard - A flashcard component with flip animation and navigation
 *
 * Almadar Entity Binding:
 * - Data flows through `entity` prop from Almadar state
 * - User interactions emit events via useEventBus()
 *
 * Events Emitted:
 * - UI:FLIP_CARD - When card is flipped
 * - UI:MARK_STUDIED - When marked as studied
 * - UI:RESET_CARD - When card is reset
 * - UI:NEXT_CARD - When navigating to next card
 * - UI:PREV_CARD - When navigating to previous card
 */

import React, { useState } from 'react';
import { RotateCcw, Check } from 'lucide-react';
import { Box } from '../../../components/atoms/Box';
import { VStack } from '../../../components/atoms/Stack';
import { HStack } from '../../../components/atoms/Stack';
import { useEventBus } from '../../../hooks/useEventBus';

export interface FlashCardEntity {
  id: string;
  front: string;
  back: string;
  studied?: boolean;
}

export interface FlashCardProps {
  /** Flash card entity data */
  entity: FlashCardEntity;
  /** Is flipped (controlled) */
  flipped?: boolean;
  /** Current card number (for progress) */
  currentCard?: number;
  /** Total cards (for progress) */
  totalCards?: number;
  /** Show navigation buttons */
  showNavigation?: boolean;
  /** Show study actions */
  showActions?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const FlashCard: React.FC<FlashCardProps> = ({
  entity,
  flipped: controlledFlipped,
  currentCard,
  totalCards,
  showNavigation = true,
  showActions = true,
  className = '',
}) => {
  const { emit } = useEventBus();
  const [internalFlipped, setInternalFlipped] = useState(false);
  const flipped = controlledFlipped !== undefined ? controlledFlipped : internalFlipped;

  const progress =
    currentCard && totalCards ? (currentCard / totalCards) * 100 : undefined;

  const handleFlip = () => {
    const newFlipped = !flipped;
    if (controlledFlipped === undefined) {
      setInternalFlipped(newFlipped);
    }
    emit('UI:FLIP_CARD', { cardId: entity.id, flipped: newFlipped });
  };

  const handleMarkStudied = (e: React.MouseEvent) => {
    e.stopPropagation();
    emit('UI:MARK_STUDIED', { cardId: entity.id });
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    emit('UI:RESET_CARD', { cardId: entity.id });
  };

  const handleNext = () => {
    emit('UI:NEXT_CARD', { currentCardId: entity.id });
  };

  const handlePrev = () => {
    emit('UI:PREV_CARD', { currentCardId: entity.id });
  };

  return (
    <VStack gap="md" className={`w-full max-w-md mx-auto ${className}`}>
      {/* Progress */}
      {progress !== undefined && (
        <VStack gap="xs">
          <HStack justify="between">
            <span className="text-sm text-gray-500">
              Card {currentCard} of {totalCards}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
          </HStack>
          <Box className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <Box
              className="h-full bg-indigo-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </Box>
        </VStack>
      )}

      {/* Flashcard */}
      <Box
        className="relative w-full h-64 cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={handleFlip}
      >
        <Box
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front Side */}
          <Box
            className="absolute inset-0 w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center p-6"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
          >
            <VStack gap="sm" align="center" className="text-center">
              <span className="text-sm text-gray-500">Question</span>
              <span className="text-xl font-semibold text-gray-900">
                {entity.front}
              </span>
              <span className="text-sm text-gray-400">Click to flip</span>
            </VStack>
          </Box>

          {/* Back Side */}
          <Box
            className="absolute inset-0 w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center p-6"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <VStack gap="sm" align="center" className="text-center">
              <span className="text-sm text-gray-500">Answer</span>
              <span className="text-xl font-semibold text-gray-900">
                {entity.back}
              </span>
              {entity.studied && (
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded mt-2">
                  Studied
                </span>
              )}
            </VStack>
          </Box>
        </Box>
      </Box>

      {/* Actions */}
      {showActions && (
        <HStack gap="sm" justify="center">
          <button
            className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
            onClick={handleMarkStudied}
          >
            <Check size={16} />
            Mark as Studied
          </button>
          <button
            className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center gap-2"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </HStack>
      )}

      {/* Navigation */}
      {showNavigation && (
        <HStack gap="sm" justify="center">
          <button
            className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            onClick={handlePrev}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={handleNext}
          >
            Next
          </button>
        </HStack>
      )}
    </VStack>
  );
};

FlashCard.displayName = 'FlashCard';
