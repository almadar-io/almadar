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
import { Box, HStack, Button, Badge, Typography, useEventBus, useTranslate } from '@almadar/ui';

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

export const LayerNavigator = ({
  layers,
  currentLayer,
  showNames = false,
  showCounts = false,
  compact = false,
  className = '',
}: LayerNavigatorProps) => {
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
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrev}
          disabled={!canGoPrev}
          className="p-2"
        >
          <ChevronLeft size={20} />
        </Button>

        <Badge variant="info" className="px-3 py-1.5 rounded-full">
          <HStack gap="xs" align="center">
            <Layers size={16} />
            <Typography variant="small" className="font-medium">
              {t('knowledge.layer', { number: currentLayer })}
              {current?.name && showNames && `: ${current.name}`}
            </Typography>
          </HStack>
        </Badge>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleNext}
          disabled={!canGoNext}
          className="p-2"
        >
          <ChevronRight size={20} />
        </Button>
      </HStack>
    );
  }

  return (
    <HStack gap="xs" align="center" wrap className={className}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePrev}
        disabled={!canGoPrev}
        className="p-1.5"
      >
        <ChevronLeft size={18} />
      </Button>

      {sortedLayers.map((layer) => {
        const isActive = layer.number === currentLayer;
        return (
          <Button
            key={layer.number}
            variant={isActive ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => handleSelectLayer(layer.number)}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium
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
              <Typography variant="small">{layer.number}</Typography>
              {showNames && layer.name && (
                <Typography variant="small" className="hidden sm:inline">: {layer.name}</Typography>
              )}
              {showCounts && layer.conceptCount !== undefined && (
                <Typography variant="small" className="text-xs opacity-70">({layer.conceptCount})</Typography>
              )}
            </HStack>
          </Button>
        );
      })}

      <Button
        variant="ghost"
        size="sm"
        onClick={handleNext}
        disabled={!canGoNext}
        className="p-1.5"
      >
        <ChevronRight size={18} />
      </Button>
    </HStack>
  );
};

LayerNavigator.displayName = 'LayerNavigator';
