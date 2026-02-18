/**
 * LayerNavigator - Navigation component for switching between knowledge graph layers
 *
 * Orbital Entity Binding:
 * - Data flows through props from Orbital state
 * - User interactions emit events via useEventBus()
 *
 * Events Emitted:
 * - UI:SELECT_LAYER - When a layer is selected
 * - UI:PREV_LAYER - When navigating to previous layer
 * - UI:NEXT_LAYER - When navigating to next layer
 */

import React from 'react';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { Box, HStack, useEventBus, useTranslate } from '@almadar/ui';

export interface LayerInfo {
  number: number;
  name?: string;
  conceptCount?: number;
  completed?: boolean;
}

export interface LayerNavigatorProps {
  /** Available layers */
  layers: LayerInfo[];
  /** Currently selected layer number */
  currentLayer: number;
  /** Show layer names */
  showNames?: boolean;
  /** Show concept counts */
  showCounts?: boolean;
  /** Compact mode (just arrows and current) */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const LayerNavigator: React.FC<LayerNavigatorProps> = ({
  layers,
  currentLayer,
  showNames = false,
  showCounts = false,
  compact = false,
  className = '',
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const sortedLayers = [...layers].sort((a, b) => a.number - b.number);
  const currentIndex = sortedLayers.findIndex((l) => l.number === currentLayer);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < sortedLayers.length - 1;
  const current = sortedLayers[currentIndex];

  const handleSelectLayer = (layerNumber: number) => {
    emit('UI:SELECT_LAYER', { layerNumber });
  };

  const handlePrev = () => {
    if (canGoPrev) {
      const prevLayer = sortedLayers[currentIndex - 1];
      emit('UI:PREV_LAYER', { layerNumber: prevLayer.number });
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      const nextLayer = sortedLayers[currentIndex + 1];
      emit('UI:NEXT_LAYER', { layerNumber: nextLayer.number });
    }
  };

  if (compact) {
    return (
      <HStack gap="sm" align="center" className={className}>
        <button
          onClick={handlePrev}
          disabled={!canGoPrev}
          className="p-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>

        <HStack gap="xs" align="center" className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full">
          <Layers size={16} />
          <span className="font-medium">
            {t('knowledge.layer', { number: currentLayer })}
            {current?.name && showNames && `: ${current.name}`}
          </span>
        </HStack>

        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className="p-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>
      </HStack>
    );
  }

  return (
    <HStack gap="xs" align="center" wrap className={className}>
      <button
        onClick={handlePrev}
        disabled={!canGoPrev}
        className="p-1.5 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} />
      </button>

      {sortedLayers.map((layer) => {
        const isActive = layer.number === currentLayer;
        return (
          <button
            key={layer.number}
            onClick={() => handleSelectLayer(layer.number)}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : layer.completed
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-[var(--color-foreground)] hover:bg-gray-200'
              }
            `}
          >
            <HStack gap="xs" align="center">
              <span>{layer.number}</span>
              {showNames && layer.name && (
                <span className="hidden sm:inline">: {layer.name}</span>
              )}
              {showCounts && layer.conceptCount !== undefined && (
                <span className="text-xs opacity-70">({layer.conceptCount})</span>
              )}
            </HStack>
          </button>
        );
      })}

      <button
        onClick={handleNext}
        disabled={!canGoNext}
        className="p-1.5 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} />
      </button>
    </HStack>
  );
};

LayerNavigator.displayName = 'LayerNavigator';
