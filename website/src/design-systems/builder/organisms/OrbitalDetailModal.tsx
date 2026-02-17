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
import { Typography, LoadingState } from '@almadar/ui';
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
    <div className="fixed inset-0 z-50">
      {/* Full screen modal - no backdrop, direct full screen */}
      <div
        ref={containerRef}
        className="w-screen h-screen flex flex-col overflow-hidden"
        style={{ backgroundColor: 'var(--color-card)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center gap-4">
            <Typography variant="h5" style={{ color: 'var(--color-foreground)' }}>
              State Machine Visualizer
            </Typography>

            {/* Trait Selector Dropdown */}
            {traits.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 border rounded-lg transition-colors"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <span className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                    {currentTrait?.name || 'Select Trait'}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--color-muted-foreground)' }} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 border rounded-lg shadow-lg z-10 max-h-64 overflow-auto"
                    style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                    {traits.map((trait) => (
                      <button
                        key={`${trait.orbitalName}-${trait.name}`}
                        onClick={() => {
                          setSelectedTrait(trait.name);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 transition-colors"
                        style={selectedTrait === trait.name ? { backgroundColor: 'color-mix(in srgb, var(--color-info) 10%, transparent)' } : {}}
                      >
                        <div className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                          {trait.name}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                          {trait.orbitalName} • {trait.stateMachine.states?.length || 0} states
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-muted-foreground)' }}
            >
              {isDarkTheme ? '☀️ Light' : '🌙 Dark'}
            </button>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ backgroundColor: 'var(--color-surface)' }}>
              <button
                onClick={handleZoomOut}
                className="p-1"
                style={{ color: 'var(--color-muted-foreground)' }}
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-medium min-w-[3rem] text-center" style={{ color: 'var(--color-muted-foreground)' }}>
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1"
                style={{ color: 'var(--color-muted-foreground)' }}
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1"
                style={{ color: 'var(--color-muted-foreground)' }}
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--color-muted-foreground)' }}
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content - Full remaining height */}
        <div className="flex-1 overflow-auto" style={{ backgroundColor: 'var(--color-background)' }}>
          {traits.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Typography variant="h6" className="mb-2" style={{ color: 'var(--color-muted-foreground)' }}>
                  No Traits Found
                </Typography>
                <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>
                  This schema doesn't contain any traits with state machines.
                </Typography>
              </div>
            </div>
          ) : !layoutData ? (
            <div className="flex items-center justify-center h-full">
              <LoadingState message="Loading diagram..." />
            </div>
          ) : (
            <div
              ref={svgContainerRef}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { OrbitalVisualizerModal as OrbitalDetailModal };
export default OrbitalVisualizerModal;
