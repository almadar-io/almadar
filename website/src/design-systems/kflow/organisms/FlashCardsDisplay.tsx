import React, { useState, useEffect } from 'react';
import { FlashCard } from '../types';
import { RotateCcw, Edit2, X, Check, Plus, Trash2 } from 'lucide-react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Typography,
  Textarea,
  useTranslate,
  type EntityDisplayProps,
} from '@almadar/ui';

interface FlashCardsDisplayProps extends EntityDisplayProps<FlashCard> {
  flashCards: FlashCard[];
  isEditing?: boolean;
  onEdit?: () => void;
  onCancelEdit?: () => void;
  onSaveFlashCards?: (flashCards: Array<{ front: string; back: string }>) => void;
}

const FlashCardsDisplay = ({
  flashCards,
  isEditing = false,
  onEdit,
  onCancelEdit,
  onSaveFlashCards,
  className,
}: FlashCardsDisplayProps) => {
  const { t } = useTranslate();
  const [isFlipped, setIsFlipped] = useState<Record<number, boolean>>({});
  const [editCards, setEditCards] = useState<Array<{ front: string; back: string }>>([]);

  useEffect(() => {
    if (flashCards.length > 0) {
      setEditCards(flashCards.map(card => ({ front: card.front, back: card.back })));
    } else if (isEditing && flashCards.length === 0) {
      // When entering edit mode with no existing cards, initialize with one empty card
      setEditCards([{ front: '', back: '' }]);
    }
  }, [flashCards, isEditing]);

  const handleSave = () => {
    if (onSaveFlashCards) {
      onSaveFlashCards(editCards.filter(card => card.front.trim() && card.back.trim()));
    }
  };

  const handleCancel = () => {
    setEditCards(flashCards.map(card => ({ front: card.front, back: card.back })));
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const handleAddCard = () => {
    setEditCards([...editCards, { front: '', back: '' }]);
  };

  const handleRemoveCard = (index: number) => {
    setEditCards(editCards.filter((_, i) => i !== index));
  };

  const handleCardChange = (index: number, field: 'front' | 'back', value: string) => {
    const updated = [...editCards];
    updated[index] = { ...updated[index], [field]: value };
    setEditCards(updated);
  };

  const handleFlip = (index: number) => {
    setIsFlipped(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleReset = () => {
    setIsFlipped({});
  };

  if (flashCards.length === 0 && !isEditing) {
    return null;
  }

  return (
    <Box className={`mt-8 ${className || ''}`}>
      <HStack justify="between" align="center" className="mb-4">
        <Typography variant="h3" className="text-xl font-semibold text-[var(--color-foreground)]">
          {t('flashcard.flashCards')}
        </Typography>
        <HStack gap="sm" align="center">
          {isEditing ? (
            <>
              <Button
                onClick={handleSave}
                variant="primary"
                size="sm"
                className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700"
              >
                <Check size={16} />
                {t('flashcard.save')}
              </Button>
              <Button
                onClick={handleCancel}
                variant="secondary"
                size="sm"
                className="inline-flex items-center gap-1 bg-[var(--color-muted-foreground)] text-[var(--color-background)] hover:opacity-80"
              >
                <X size={16} />
                {t('flashcard.cancel')}
              </Button>
            </>
          ) : (
            <>
              {onEdit && (
                <Button
                  onClick={onEdit}
                  variant="secondary"
                  size="sm"
                  className="inline-flex items-center gap-1 text-sm text-[var(--color-foreground)] hover:text-[var(--color-foreground)] border border-[var(--color-border)] hover:bg-[var(--color-muted)]"
                >
                  <Edit2 size={14} />
                  {t('flashcard.edit')}
                </Button>
              )}
              <Button
                onClick={handleReset}
                variant="secondary"
                size="sm"
                className="text-sm text-[var(--color-foreground)] hover:text-[var(--color-foreground)] flex items-center gap-1"
              >
                <RotateCcw size={14} />
                {t('flashcard.resetAll')}
              </Button>
            </>
          )}
        </HStack>
      </HStack>

      {/* Horizontal scrollable container */}
      <Box className="relative">
        <HStack gap="md" className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {isEditing ? (
            <>
              {editCards.map((card, index) => (
                <Box
                  key={index}
                  className="flex-shrink-0 w-80"
                >
                  <Box className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-lg">
                    <HStack justify="between" align="center" className="mb-3">
                      <Typography variant="small" className="font-medium text-[var(--color-foreground)]">{t('flashcard.cardNumber', { number: index + 1 })}</Typography>
                      <Button
                        onClick={() => handleRemoveCard(index)}
                        variant="secondary"
                        size="sm"
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-0"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </HStack>
                    <VStack gap="sm">
                      <Box>
                        <Typography variant="small" className="block text-xs font-medium text-[var(--color-foreground)] mb-1">{t('flashcard.question')}</Typography>
                        <Textarea
                          value={card.front}
                          onChange={(e) => handleCardChange(index, 'front', e.target.value)}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-[var(--color-foreground)] text-sm resize-none"
                          rows={3}
                          placeholder={t('flashcard.enterQuestion')}
                        />
                      </Box>
                      <Box>
                        <Typography variant="small" className="block text-xs font-medium text-[var(--color-foreground)] mb-1">{t('flashcard.answer')}</Typography>
                        <Textarea
                          value={card.back}
                          onChange={(e) => handleCardChange(index, 'back', e.target.value)}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-[var(--color-foreground)] text-sm resize-none"
                          rows={3}
                          placeholder={t('flashcard.enterAnswer')}
                        />
                      </Box>
                    </VStack>
                  </Box>
                </Box>
              ))}
              <Box className="flex-shrink-0 w-80">
                <Button
                  onClick={handleAddCard}
                  variant="secondary"
                  className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center text-[var(--color-muted-foreground)] hover:border-gray-400 dark:hover:border-gray-500 hover:text-[var(--color-foreground)] transition-colors"
                >
                  <Plus size={32} />
                  <Typography variant="small" className="mt-2">{t('flashcard.addCard')}</Typography>
                </Button>
              </Box>
            </>
          ) : (
            flashCards.map((card, index) => {
              const flipped = isFlipped[index] || false;
              return (
                <Box
                  key={index}
                  className="flex-shrink-0 w-80 h-64"
                  style={{ perspective: '1000px' }}
                >
                  <Box
                    className="relative w-full h-full transition-transform duration-500"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                    onClick={() => handleFlip(index)}
                  >
                    {/* Front of card */}
                    <Box
                      className="absolute inset-0 w-full h-full rounded-lg shadow-lg cursor-pointer"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)',
                      }}
                    >
                      <VStack gap="sm" align="center" justify="center" className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg w-full h-full p-6">
                        <Typography variant="small" className="text-indigo-100 font-medium">{t('flashcard.question')}</Typography>
                        <Typography variant="body" className="text-lg font-medium text-center">{card.front}</Typography>
                      </VStack>
                    </Box>

                    {/* Back of card */}
                    <Box
                      className="absolute inset-0 w-full h-full rounded-lg shadow-lg cursor-pointer"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <VStack gap="sm" align="center" justify="center" className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-lg w-full h-full p-6">
                        <Typography variant="small" className="text-purple-100 font-medium">{t('flashcard.answer')}</Typography>
                        <Typography variant="body" className="text-base text-center leading-relaxed">{card.back}</Typography>
                      </VStack>
                    </Box>
                  </Box>
                </Box>
              );
            })
          )}
        </HStack>
      </Box>

      <Typography variant="small" className="text-xs text-[var(--color-muted-foreground)] mt-2 text-center">
        {t('flashcard.clickToFlipHint')} • {t('flashcard.cardCount', { count: flashCards.length })}
      </Typography>
    </Box>
  );
};

FlashCardsDisplay.displayName = 'FlashCardsDisplay';

export default FlashCardsDisplay;
