import React, { useState, useEffect } from 'react';
import { FlashCard } from '../types';
import { RotateCcw, Edit2, X, Check, Plus, Trash2 } from 'lucide-react';

interface FlashCardsDisplayProps {
  flashCards: FlashCard[];
  isEditing?: boolean;
  onEdit?: () => void;
  onCancelEdit?: () => void;
  onSaveFlashCards?: (flashCards: Array<{ front: string; back: string }>) => void;
}

const FlashCardsDisplay: React.FC<FlashCardsDisplayProps> = ({ 
  flashCards,
  isEditing = false,
  onEdit,
  onCancelEdit,
  onSaveFlashCards,
}) => {
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
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Flash Cards
        </h3>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                <Check size={16} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
              >
                <X size={16} />
                Cancel
              </button>
            </>
          ) : (
            <>
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
              )}
              <button
                onClick={handleReset}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-1"
              >
                <RotateCcw size={14} />
                Reset All
              </button>
            </>
          )}
        </div>
      </div>

      {/* Horizontal scrollable container */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {isEditing ? (
            <>
              {editCards.map((card, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80"
                >
                  <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Card {index + 1}</span>
                      <button
                        onClick={() => handleRemoveCard(index)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Question</label>
                        <textarea
                          value={card.front}
                          onChange={(e) => handleCardChange(index, 'front', e.target.value)}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm resize-none"
                          rows={3}
                          placeholder="Enter question..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Answer</label>
                        <textarea
                          value={card.back}
                          onChange={(e) => handleCardChange(index, 'back', e.target.value)}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm resize-none"
                          rows={3}
                          placeholder="Enter answer..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex-shrink-0 w-80">
                <button
                  onClick={handleAddCard}
                  className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <Plus size={32} />
                  <span className="mt-2 text-sm">Add Card</span>
                </button>
              </div>
            </>
          ) : (
            flashCards.map((card, index) => {
              const flipped = isFlipped[index] || false;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 h-64"
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-500"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                    onClick={() => handleFlip(index)}
                  >
                    {/* Front of card */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-lg shadow-lg cursor-pointer"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)',
                      }}
                    >
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg w-full h-full flex flex-col justify-center items-center p-6">
                        <div className="text-sm text-indigo-100 mb-2 font-medium">Question</div>
                        <p className="text-lg font-medium text-center">{card.front}</p>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-lg shadow-lg cursor-pointer"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-lg w-full h-full flex flex-col justify-center items-center p-6">
                        <div className="text-sm text-purple-100 mb-2 font-medium">Answer</div>
                        <p className="text-base text-center leading-relaxed">{card.back}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
        Click on a card to flip it • {flashCards.length} card{flashCards.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
};

export default FlashCardsDisplay;

