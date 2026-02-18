/**
 * OrbitalDetailModal - Trait State Machine Diagram Modal
 *
 * Full-screen modal displaying trait state machine diagrams.
 * Uses DOM-based rendering with hybrid SVG for curved arrow paths.
 *
 * Events Emitted:
 * - UI:CLOSE_MODAL - When the modal is closed
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { X, ChevronDown, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Typography, LoadingState, Button, Box, VStack, HStack, Icon } from '@almadar/ui';
import type { OrbitalSchema, EntityRef } from '@almadar/core';
import { isEntityReference } from '@almadar/core';
import {
  renderStateMachineToDomData,
  extractStateMachine,
  DEFAULT_CONFIG,
  type StateMachineDefinition,
  type VisualizerConfig,
  type DomLayoutData,
} from '@almadar/ui/lib';
import { DomStateMachineVisualizer } from './OrbitalStateMachineView';

// ============================================================================
// Types
// ============================================================================

interface EntityInfo {
  name: string;
  fields?: (string | { name: string })[];
}

/**
 * Get entity info safely from EntityRef
 */
function getEntityInfo(entity: EntityRef): EntityInfo | undefined {
  if (isEntityReference(entity)) {
    // String reference - extract name from format "Alias.entity"
    return { name: entity.replace('.entity', '') };
  }
  // Inline entity
  return {
    name: entity.name,
    fields: entity.fields?.map((field) => {
      if (typeof field === 'string') return field;
      return { name: field.name };
    }),
  };
}

interface TraitInfo {
  name: string;
  orbitalName: string;
  stateMachine: StateMachineDefinition;
  entity?: EntityInfo;
}

interface OrbitalVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  schema: OrbitalSchema | null;
  /** Optional: pre-select a specific trait by name */
  selectedTraitName?: string;
}

// ============================================================================
// Light Theme Config
// ============================================================================

const LIGHT_CONFIG: VisualizerConfig = {
  ...DEFAULT_CONFIG,
  colors: {
    background: '#ffffff',
    node: '#f8fafc',
    nodeBorder: '#cbd5e1',
    nodeText: '#1e293b',
    initialNode: '#16a34a',
    finalNode: '#dc2626',
    arrow: '#64748b',
    arrowText: '#475569',
    effectText: '#d97706',
    guardText: '#db2777',
    initial: '#16a34a',
  },
};

// ============================================================================
// Component
// ============================================================================

export const OrbitalVisualizerModal: React.FC<OrbitalVisualizerModalProps> = ({
  isOpen,
  onClose,
  schema,
  selectedTraitName,
}) => {
  const [selectedTrait, setSelectedTrait] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  // Extract all traits from schema
  const traits = useMemo((): TraitInfo[] => {
    if (!schema?.orbitals) return [];

    const allTraits: TraitInfo[] = [];

    schema.orbitals.forEach((orbital) => {
      // Skip OrbitalReferences (they only have $ref property)
      if ('$ref' in orbital) return;
      if (!orbital.traits) return;

      orbital.traits.forEach((trait) => {
        // Handle both inline traits and trait references
        if (typeof trait === 'object' && 'stateMachine' in trait) {
          const sm = extractStateMachine(trait);
          if (sm) {
            // Get entity info safely (handle EntityRef union type)
            const entityInfo = 'entity' in orbital && orbital.entity
              ? getEntityInfo(orbital.entity)
              : undefined;

            allTraits.push({
              name: trait.name || 'Unnamed Trait',
              orbitalName: orbital.name,
              stateMachine: sm,
              entity: entityInfo,
            });
          }
        }
      });
    });

    return allTraits;
  }, [schema]);

  // Set initial selection
  useEffect(() => {
    if (isOpen && traits.length > 0) {
      if (selectedTraitName) {
        const found = traits.find((t) => t.name === selectedTraitName);
        if (found) {
          setSelectedTrait(found.name);
          return;
        }
      }
      // Default to first trait
      setSelectedTrait(traits[0].name);
    }
  }, [isOpen, traits, selectedTraitName]);

  // Reset zoom when trait changes
  useEffect(() => {
    setZoom(1);
  }, [selectedTrait]);

  // Get current trait info
  const currentTrait = useMemo(() => {
    return traits.find((t) => t.name === selectedTrait) || null;
  }, [traits, selectedTrait]);

  // Generate DOM layout data (instead of SVG)
  const layoutData = useMemo((): DomLayoutData | null => {
    if (!currentTrait) return null;

    const config = isDarkTheme ? DEFAULT_CONFIG : LIGHT_CONFIG;

    return renderStateMachineToDomData(
      currentTrait.stateMachine,
      {
        title: currentTrait.name,
        entity: currentTrait.entity,
      },
      config
    );
  }, [currentTrait, isDarkTheme]);

  // Handle zoom
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.25));
  const handleResetZoom = () => setZoom(1);

  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);

  if (!isOpen) return null;

  return (
    <Box className="fixed inset-0 z-50">
      {/* Full screen modal - no backdrop, direct full screen */}
      <Box
        ref={containerRef}
        className="w-screen h-screen flex flex-col overflow-hidden"
        style={{ backgroundColor: 'var(--color-card)' }}
      >
        {/* Header */}
        <HStack
          justify="between"
          align="center"
          className="px-6 py-3 border-b"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}
        >
          <HStack gap="md" align="center">
            <Typography variant="h5" style={{ color: 'var(--color-foreground)' }}>
              State Machine Visualizer
            </Typography>

            {/* Trait Selector Dropdown */}
            {traits.length > 0 && (
              <Box className="relative">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <Typography variant="label" weight="medium" style={{ color: 'var(--color-foreground)' }}>
                    {currentTrait?.name || 'Select Trait'}
                  </Typography>
                  <Icon
                    icon={ChevronDown}
                    size="sm"
                    className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--color-muted-foreground)' }}
                  />
                </Button>

                {isDropdownOpen && (
                  <Box
                    className="absolute top-full left-0 mt-1 w-64 border rounded-lg shadow-lg z-10 max-h-64 overflow-auto"
                    style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
                  >
                    {traits.map((trait) => (
                      <Button
                        key={`${trait.orbitalName}-${trait.name}`}
                        variant="ghost"
                        onClick={() => {
                          setSelectedTrait(trait.name);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 transition-colors"
                        style={selectedTrait === trait.name ? { backgroundColor: 'color-mix(in srgb, var(--color-info) 10%, transparent)' } : {}}
                      >
                        <VStack gap="xs">
                          <Typography variant="label" weight="medium" style={{ color: 'var(--color-foreground)' }}>
                            {trait.name}
                          </Typography>
                          <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                            {trait.orbitalName} • {trait.stateMachine.states?.length || 0} states
                          </Typography>
                        </VStack>
                      </Button>
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </HStack>

          <HStack gap="sm" align="center">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-muted-foreground)' }}
            >
              <Typography variant="caption" weight="medium">
                {isDarkTheme ? '☀️ Light' : '🌙 Dark'}
              </Typography>
            </Button>

            {/* Zoom Controls */}
            <HStack
              gap="xs"
              align="center"
              className="px-2 py-1 rounded-lg"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                style={{ color: 'var(--color-muted-foreground)', padding: '4px' }}
                title="Zoom Out"
              >
                <Icon icon={ZoomOut} size="sm" />
              </Button>
              <Typography
                variant="caption"
                weight="medium"
                className="min-w-[3rem] text-center"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                {Math.round(zoom * 100)}%
              </Typography>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                style={{ color: 'var(--color-muted-foreground)', padding: '4px' }}
                title="Zoom In"
              >
                <Icon icon={ZoomIn} size="sm" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetZoom}
                style={{ color: 'var(--color-muted-foreground)', padding: '4px' }}
                title="Reset Zoom"
              >
                <Icon icon={RotateCcw} size="sm" />
              </Button>
            </HStack>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              style={{ color: 'var(--color-muted-foreground)' }}
              title="Close (Esc)"
            >
              <Icon icon={X} size="md" />
            </Button>
          </HStack>
        </HStack>

        {/* Content - Full remaining height */}
        <Box className="flex-1 overflow-auto" style={{ backgroundColor: 'var(--color-background)' }}>
          {traits.length === 0 ? (
            <VStack align="center" justify="center" className="h-full">
              <VStack gap="sm" align="center">
                <Typography variant="h6" className="mb-2" style={{ color: 'var(--color-muted-foreground)' }}>
                  No Traits Found
                </Typography>
                <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>
                  This schema doesn't contain any traits with state machines.
                </Typography>
              </VStack>
            </VStack>
          ) : !layoutData ? (
            <VStack align="center" justify="center" className="h-full">
              <LoadingState message="Loading diagram..." />
            </VStack>
          ) : (
            <Box
              ref={svgContainerRef as React.Ref<HTMLDivElement>}
              className="min-h-full min-w-full p-8"
              style={{
                zoom: zoom,
                transition: 'zoom 0.2s ease',
              }}
            >
              <DomStateMachineVisualizer
                layoutData={layoutData}
                className="inline-block"
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export { OrbitalVisualizerModal as OrbitalDetailModal };
export default OrbitalVisualizerModal;
