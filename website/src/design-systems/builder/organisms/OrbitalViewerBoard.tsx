/**
 * OrbitalViewer Component
 *
 * Unified schema viewer for OrbitalSchema.
 * Displays orbitals with their entities, traits, and pages.
 * Supports validation display and domain logic view.
 */

import React, { useState, useMemo } from 'react';
import {
  Copy,
  Check,
  Atom,
  Database,
  Layers,
  FileText,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Code,
  BookOpen,
} from 'lucide-react';
import type { OrbitalSchema, Orbital, Trait, TraitRef } from '@almadar/core';
import { isOrbitalDefinition, isInlineTrait } from '@almadar/core';
import {
  Box,
  VStack,
  HStack,
  Typography,
  Badge,
  Button,
  Icon,
} from '@almadar/ui';
// OrbitalJsonViewer is a code viewer — will be wired as a slot from the page
// DomainEditor is now part of the DS domain organisms
import { DomainEditor } from './domain/DomainEditor';

/**
 * Collect all traits from orbitals (traits are now inside orbitals, not at schema level)
 */
function collectAllTraits(schema: OrbitalSchema): Trait[] {
  const traits: Trait[] = [];
  for (const orbital of schema.orbitals || []) {
    if (isOrbitalDefinition(orbital)) {
      for (const traitRef of orbital.traits || []) {
        if (isInlineTrait(traitRef)) {
          traits.push(traitRef);
        }
      }
    }
  }
  return traits;
}

export interface OrbitalViewerProps {
  /** The OrbitalSchema to display */
  schema: OrbitalSchema;
  /** Called when schema is changed (for editing) */
  onSchemaChange?: (schema: OrbitalSchema) => void;
  /** Validation errors to display */
  validationErrors?: Array<{ code: string; message: string; path: string }>;
  /** Maximum height of the viewer */
  maxHeight?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether the viewer is read-only */
  readOnly?: boolean;
  /** Domain text to display (optional - if not provided, will be derived from schema) */
  domainText?: string;
}

type ViewMode = 'orbital' | 'json' | 'domain';

export const OrbitalViewer: React.FC<OrbitalViewerProps> = ({
  schema,
  onSchemaChange,
  validationErrors = [],
  maxHeight = '600px',
  className = '',
  readOnly = true,
  domainText: externalDomainText,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('json');
  const [copied, setCopied] = useState(false);
  const [expandedOrbitals, setExpandedOrbitals] = useState<Set<string>>(
    new Set(schema.orbitals?.map((_, i) => `orbital-${i}`) || [])
  );

  // Count orbitals
  const orbitalCount = schema.orbitals?.length || 0;
  const hasErrors = validationErrors.length > 0;

  // Handle copy
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Toggle orbital expansion
  const toggleOrbital = (key: string) => {
    const newExpanded = new Set(expandedOrbitals);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedOrbitals(newExpanded);
  };

  // Domain language view - use external domain text if provided, otherwise generate
  const domainLanguage = useMemo(() => {
    // Use external domain text if provided (same source as Domain Logic tab)
    if (externalDomainText) return externalDomainText;

    // Fallback: generate from schema
    if (!schema.orbitals) return '';

    const lines: string[] = [];

    // App header
    lines.push(`# ${schema.name || 'Application'}`);
    if (schema.description) {
      lines.push(`# ${schema.description}`);
    }
    lines.push('');
    lines.push('---');
    lines.push('');

    for (const orbital of schema.orbitals) {
      // Entity section
      const entity = (orbital as any).entity;
      if (entity) {
        lines.push(`# Entity: ${entity.name}`);
        lines.push('');
        lines.push(`A ${entity.name} is a ${entity.description || 'data object'}.`);

        if (entity.fields && entity.fields.length > 0) {
          lines.push('');
          for (const field of entity.fields) {
            const required = field.required ? ' (required)' : '';
            const typeDesc = field.type || 'text';
            lines.push(`It has ${field.name}${required}: ${typeDesc}`);
          }
        }

        // States if present
        if (entity.states && entity.states.length > 0) {
          lines.push('');
          lines.push(`It can be ${entity.states.join(', ')}. It starts as ${entity.states[0]}.`);
        }

        lines.push('');
        lines.push('---');
        lines.push('');
      }

      // Traits as behaviors
      if (orbital.traits && orbital.traits.length > 0) {
        lines.push(`# Behaviors for ${orbital.name}`);
        lines.push('');
        for (const trait of orbital.traits) {
          const traitRef = typeof trait === 'string'
            ? trait
            : (trait as any).ref || (trait as any).name;

          if (typeof trait !== 'string' && (trait as any).stateMachine) {
            const sm = (trait as any).stateMachine;
            lines.push(`A ${traitRef} behavior:`);
            if (sm.states) {
              lines.push(`States: ${sm.states.map((s: any) => typeof s === 'string' ? s : s.name).join(', ')}`);
            }
            if (sm.transitions) {
              lines.push('Transitions:');
              for (const t of sm.transitions) {
                const from = t.from || '*';
                const to = t.to || from;
                lines.push(`  From ${from} when ${t.event} then ${to}`);
              }
            }
            lines.push('');
          } else {
            lines.push(`Uses ${traitRef} behavior`);
          }
        }
        lines.push('');
        lines.push('---');
        lines.push('');
      }

      // Pages section
      const pages = (orbital as any).pages;
      if (pages && pages.length > 0) {
        lines.push(`# Pages for ${orbital.name}`);
        lines.push('');
        for (const page of pages) {
          lines.push(`The ${page.name} Page`);
          lines.push(`URL: ${page.path}`);
          if (page.layout) {
            lines.push(`Purpose: ${page.layout}`);
          }
          if (page.traits && page.traits.length > 0) {
            const pageTraits = page.traits.map((t: any) => typeof t === 'string' ? t : t.ref);
            lines.push(`It displays ${pageTraits.join(', ')}`);
          }
          lines.push('');
        }
        lines.push('---');
        lines.push('');
      }
    }

    return lines.join('\n');
  }, [schema, externalDomainText]);

  return (
    <VStack
      gap="none"
      className={`rounded-lg border ${className}`}
      style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)' }}
    >
      {/* Header */}
      <HStack
        justify="between"
        align="center"
        className="px-4 py-3 border-b"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <HStack align="center" gap="sm">
          <Icon icon={Atom} size="md" style={{ color: 'var(--color-primary)' }} />
          <Typography variant="label" weight="medium" style={{ color: 'var(--color-foreground)' }}>
            {schema.name || 'Orbital Schema'}
          </Typography>
          {orbitalCount > 0 && (
            <Badge
              className="px-2 py-0.5 text-xs rounded"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)',
                color: 'var(--color-primary)',
              }}
            >
              {orbitalCount} orbital{orbitalCount !== 1 ? 's' : ''}
            </Badge>
          )}
          {hasErrors ? (
            <Icon icon={AlertCircle} size="sm" style={{ color: 'var(--color-error)' }} />
          ) : (
            <Icon icon={CheckCircle2} size="sm" style={{ color: 'var(--color-success)' }} />
          )}
        </HStack>

        <HStack align="center" gap="sm">
          {/* View Mode Tabs */}
          <HStack
            gap="none"
            className="rounded-lg p-1"
            style={{ backgroundColor: 'var(--color-card)' }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('json')}
              className="flex items-center gap-1 px-3 py-1 text-sm rounded transition-colors"
              style={viewMode === 'json'
                ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-foreground)' }
                : { color: 'var(--color-muted-foreground)' }
              }
            >
              <Icon icon={Code} size="sm" />
              Orb
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('orbital')}
              className="flex items-center gap-1 px-3 py-1 text-sm rounded transition-colors"
              style={viewMode === 'orbital'
                ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-foreground)' }
                : { color: 'var(--color-muted-foreground)' }
              }
            >
              <Icon icon={Layers} size="sm" />
              Orbital
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('domain')}
              className="flex items-center gap-1 px-3 py-1 text-sm rounded transition-colors"
              style={viewMode === 'domain'
                ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-foreground)' }
                : { color: 'var(--color-muted-foreground)' }
              }
            >
              <Icon icon={BookOpen} size="sm" />
              Domain
            </Button>
          </HStack>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded transition-colors"
            style={{ backgroundColor: 'var(--color-card)', color: 'var(--color-foreground)' }}
          >
            {copied ? <Icon icon={Check} size="sm" /> : <Icon icon={Copy} size="sm" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </HStack>
      </HStack>

      {/* Content */}
      <Box className="flex-1 overflow-auto" style={{ maxHeight }}>
        {viewMode === 'orbital' && (
          <VStack gap="md" className="p-4">
            {/* All Traits (collected from orbitals) */}
            {(() => {
              const allTraits = collectAllTraits(schema);
              return allTraits.length > 0 && (
                <Box
                  className="border rounded-lg overflow-hidden"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <HStack
                    align="center"
                    gap="sm"
                    className="px-4 py-3 border-b"
                    style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
                  >
                    <Icon icon={Layers} size="sm" style={{ color: 'var(--color-accent)' }} />
                    <Typography variant="label" weight="medium" style={{ color: 'var(--color-foreground)' }}>
                      App Traits
                    </Typography>
                    <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                      ({allTraits.length})
                    </Typography>
                  </HStack>
                  <HStack wrap gap="sm" className="p-4">
                    {allTraits.map((trait, i) => (
                      <Box
                        key={i}
                        className="group relative rounded-lg px-3 py-2 border"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--color-accent) 30%, transparent)',
                          backgroundColor: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                        }}
                      >
                        <HStack align="center" gap="sm">
                          <Typography
                            variant="small"
                            weight="medium"
                            style={{ color: 'var(--color-accent)' }}
                          >
                            {trait.name}
                          </Typography>
                          {trait.description && (
                            <Typography
                              variant="caption"
                              style={{ color: 'color-mix(in srgb, var(--color-accent) 70%, transparent)' }}
                            >
                              - {trait.description}
                            </Typography>
                          )}
                        </HStack>
                        <HStack gap="sm" className="mt-1 text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)' }}>
                          {trait.stateMachine && (
                            <Typography variant="caption" as="span" style={{ color: 'var(--color-muted-foreground)' }}>
                              State Machine
                            </Typography>
                          )}
                        </HStack>
                      </Box>
                    ))}
                  </HStack>
                </Box>
              );
            })()}

            {schema.orbitals?.map((orbital, index) => (
              <OrbitalCard
                key={`orbital-${index}`}
                orbital={orbital}
                index={index}
                expanded={expandedOrbitals.has(`orbital-${index}`)}
                onToggle={() => toggleOrbital(`orbital-${index}`)}
                errors={validationErrors.filter(e => e.path.includes(`orbitals[${index}]`))}
              />
            ))}
            {(!schema.orbitals || schema.orbitals.length === 0) && (
              <VStack align="center" justify="center" className="py-12" style={{ color: 'var(--color-muted-foreground)' }}>
                <Icon icon={Atom} size="xl" className="mb-4" />
                <Typography variant="body2">No orbitals defined</Typography>
              </VStack>
            )}
          </VStack>
        )}

        {viewMode === 'domain' && (
          <Box className="h-full">
            <DomainEditor
              value={domainLanguage}
              readOnly={true}
              height={maxHeight}
              showLineNumbers={true}
            />
          </Box>
        )}

        {viewMode === 'json' && (
          <Box className="h-full overflow-auto" style={{ maxHeight }}>
            <Box
              as="pre"
              className="p-4 text-xs rounded-lg font-mono whitespace-pre-wrap"
              style={{ color: 'var(--color-foreground)', backgroundColor: 'var(--color-background)' }}
            >
              {JSON.stringify(schema, null, 2)}
            </Box>
          </Box>
        )}
      </Box>

      {/* Validation Errors (hidden in JSON mode since OrbitalJsonViewer shows them) */}
      {validationErrors.length > 0 && viewMode !== 'json' && (
        <Box className="border-t p-4" style={{ borderColor: 'var(--color-border)' }}>
          <HStack align="center" gap="sm" className="mb-2">
            <Icon icon={AlertCircle} size="sm" style={{ color: 'var(--color-error)' }} />
            <Typography variant="small" weight="medium" style={{ color: 'var(--color-error)' }}>
              Validation Errors ({validationErrors.length})
            </Typography>
          </HStack>
          <VStack gap="xs" className="max-h-32 overflow-auto">
            {validationErrors.map((error, index) => (
              <Box key={index} className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                <Typography variant="caption" as="span" style={{ color: 'var(--color-error)' }}>
                  {error.code}
                </Typography>
                <Typography variant="caption" as="span">: {error.message}</Typography>
                {error.path && (
                  <Typography variant="caption" as="span" className="ml-2" style={{ color: 'var(--color-muted-foreground)' }}>
                    ({error.path})
                  </Typography>
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </VStack>
  );
};

// Orbital Card Component
interface OrbitalCardProps {
  orbital: Orbital;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  errors: Array<{ code: string; message: string; path: string }>;
}

const OrbitalCard: React.FC<OrbitalCardProps> = ({
  orbital,
  index,
  expanded,
  onToggle,
  errors,
}) => {
  const hasErrors = errors.length > 0;
  const entityFieldCount = (orbital as any).entity?.fields?.length || 0;
  const traitCount = orbital.traits?.length || 0;
  const pageCount = (orbital as any).pages?.length || 0;

  return (
    <Box
      className="border rounded-lg"
      style={{
        borderColor: hasErrors
          ? 'color-mix(in srgb, var(--color-error) 50%, transparent)'
          : 'var(--color-border)',
      }}
    >
      {/* Header */}
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 transition-colors"
      >
        {expanded ? (
          <Icon icon={ChevronDown} size="sm" style={{ color: 'var(--color-muted-foreground)' }} />
        ) : (
          <Icon icon={ChevronRight} size="sm" style={{ color: 'var(--color-muted-foreground)' }} />
        )}
        <Icon icon={Atom} size="sm" style={{ color: 'var(--color-primary)' }} />
        <Typography variant="label" weight="medium" style={{ color: 'var(--color-foreground)' }}>
          {orbital.name}
        </Typography>
        <HStack align="center" gap="sm" className="ml-auto text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          <HStack align="center" gap="xs">
            <Icon icon={Database} size="xs" />
            <Typography variant="caption">{entityFieldCount} fields</Typography>
          </HStack>
          <HStack align="center" gap="xs">
            <Icon icon={Layers} size="xs" />
            <Typography variant="caption">{traitCount} traits</Typography>
          </HStack>
          <HStack align="center" gap="xs">
            <Icon icon={FileText} size="xs" />
            <Typography variant="caption">{pageCount} pages</Typography>
          </HStack>
        </HStack>
      </Button>

      {/* Content */}
      {expanded && (
        <VStack gap="md" className="px-4 pb-4">
          {/* Entity */}
          {(orbital as any).entity && (
            <VStack gap="xs">
              <Typography
                variant="overline"
                className="text-xs font-medium uppercase mb-2"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                Entity
              </Typography>
              <Box className="rounded p-3" style={{ backgroundColor: 'var(--color-card)' }}>
                <HStack align="center" gap="sm" className="mb-2">
                  <Icon icon={Database} size="sm" style={{ color: 'var(--color-info)' }} />
                  <Typography variant="small" weight="medium" style={{ color: 'var(--color-foreground)' }}>
                    {(orbital as any).entity.name}
                  </Typography>
                  {(orbital as any).entity.collection && (
                    <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                      ({(orbital as any).entity.collection})
                    </Typography>
                  )}
                </HStack>
                {(orbital as any).entity.fields && (orbital as any).entity.fields.length > 0 && (
                  <VStack gap="xs" className="ml-6">
                    {(orbital as any).entity.fields.map((field: any, i: number) => (
                      <Box key={i} className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                        <Typography variant="caption" as="span" style={{ color: 'var(--color-foreground)' }}>
                          {field.name}
                        </Typography>
                        <Typography variant="caption" as="span" style={{ color: 'var(--color-muted-foreground)' }}>
                          : {field.type}
                        </Typography>
                        {field.required && (
                          <Typography variant="caption" as="span" className="ml-1" style={{ color: 'var(--color-error)' }}>
                            *
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </VStack>
                )}
              </Box>
            </VStack>
          )}

          {/* Traits */}
          {orbital.traits && orbital.traits.length > 0 && (
            <VStack gap="xs">
              <Typography
                variant="overline"
                className="text-xs font-medium uppercase mb-2"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                Traits
              </Typography>
              <HStack wrap gap="sm">
                {orbital.traits.map((trait, i) => {
                  const traitName = typeof trait === 'string'
                    ? trait
                    : (trait as any).ref || (trait as any).name;
                  return (
                    <Badge
                      key={i}
                      className="px-2 py-1 text-xs rounded"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      {traitName}
                    </Badge>
                  );
                })}
              </HStack>
            </VStack>
          )}

          {/* Pages */}
          {(orbital as any).pages && (orbital as any).pages.length > 0 && (
            <VStack gap="xs">
              <Typography
                variant="overline"
                className="text-xs font-medium uppercase mb-2"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                Pages
              </Typography>
              <VStack gap="sm">
                {(orbital as any).pages.map((page: any, i: number) => (
                  <Box key={i} className="rounded p-2" style={{ backgroundColor: 'var(--color-card)' }}>
                    <HStack align="center" gap="sm">
                      <Icon icon={FileText} size="sm" style={{ color: 'var(--color-success)' }} />
                      <Typography variant="small" style={{ color: 'var(--color-foreground)' }}>
                        {page.name}
                      </Typography>
                      <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                        {page.path}
                      </Typography>
                    </HStack>
                    {page.traits && page.traits.length > 0 && (
                      <HStack wrap gap="xs" className="mt-1 ml-6">
                        {page.traits.map((t: any, j: number) => {
                          const name = typeof t === 'string' ? t : t.ref;
                          return (
                            <Badge
                              key={j}
                              className="px-1.5 py-0.5 text-xs rounded"
                              style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-foreground)' }}
                            >
                              {name}
                            </Badge>
                          );
                        })}
                      </HStack>
                    )}
                  </Box>
                ))}
              </VStack>
            </VStack>
          )}
        </VStack>
      )}
    </Box>
  );
};

OrbitalViewer.displayName = 'OrbitalViewer';

export default OrbitalViewer;
