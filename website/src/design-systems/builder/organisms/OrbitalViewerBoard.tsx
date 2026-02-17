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
    <div className={`flex flex-col rounded-lg border ${className}`} style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center gap-3">
          <Atom className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          <h3 className="font-medium" style={{ color: 'var(--color-foreground)' }}>{schema.name || 'Orbital Schema'}</h3>
          {orbitalCount > 0 && (
            <span
              className="px-2 py-0.5 text-xs rounded"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)',
                color: 'var(--color-primary)',
              }}
            >
              {orbitalCount} orbital{orbitalCount !== 1 ? 's' : ''}
            </span>
          )}
          {hasErrors ? (
            <AlertCircle className="w-4 h-4" style={{ color: 'var(--color-error)' }} />
          ) : (
            <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Tabs */}
          <div className="flex rounded-lg p-1" style={{ backgroundColor: 'var(--color-card)' }}>
            <button
              onClick={() => setViewMode('json')}
              className="flex items-center gap-1 px-3 py-1 text-sm rounded transition-colors"
              style={viewMode === 'json'
                ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-foreground)' }
                : { color: 'var(--color-muted-foreground)' }
              }
            >
              <Code className="w-4 h-4" />
              Orb
            </button>
            <button
              onClick={() => setViewMode('orbital')}
              className="flex items-center gap-1 px-3 py-1 text-sm rounded transition-colors"
              style={viewMode === 'orbital'
                ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-foreground)' }
                : { color: 'var(--color-muted-foreground)' }
              }
            >
              <Layers className="w-4 h-4" />
              Orbital
            </button>
            <button
              onClick={() => setViewMode('domain')}
              className="flex items-center gap-1 px-3 py-1 text-sm rounded transition-colors"
              style={viewMode === 'domain'
                ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-foreground)' }
                : { color: 'var(--color-muted-foreground)' }
              }
            >
              <BookOpen className="w-4 h-4" />
              Domain
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded transition-colors"
            style={{ backgroundColor: 'var(--color-card)', color: 'var(--color-foreground)' }}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto" style={{ maxHeight }}>
        {viewMode === 'orbital' && (
          <div className="p-4 space-y-4">
            {/* All Traits (collected from orbitals) */}
            {(() => {
              const allTraits = collectAllTraits(schema);
              return allTraits.length > 0 && (
                <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="px-4 py-3 border-b flex items-center gap-2" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                    <Layers className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                    <span className="font-medium" style={{ color: 'var(--color-foreground)' }}>App Traits</span>
                    <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>({allTraits.length})</span>
                  </div>
                  <div className="p-4 flex flex-wrap gap-2">
                    {allTraits.map((trait, i) => (
                      <div
                        key={i}
                        className="group relative rounded-lg px-3 py-2 border"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--color-accent) 30%, transparent)',
                          backgroundColor: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>{trait.name}</span>
                          {trait.description && (
                            <span className="text-xs" style={{ color: 'color-mix(in srgb, var(--color-accent) 70%, transparent)' }}>- {trait.description}</span>
                          )}
                        </div>
                        <div className="mt-1 flex gap-2 text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)' }}>
                          {trait.stateMachine && <span>State Machine</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
              <div className="flex flex-col items-center justify-center py-12" style={{ color: 'var(--color-muted-foreground)' }}>
                <Atom className="w-12 h-12 mb-4" />
                <p>No orbitals defined</p>
              </div>
            )}
          </div>
        )}

        {viewMode === 'domain' && (
          <div className="h-full">
            <DomainEditor
              value={domainLanguage}
              readOnly={true}
              height={maxHeight}
              showLineNumbers={true}
            />
          </div>
        )}

        {viewMode === 'json' && (
          <div className="h-full overflow-auto" style={{ maxHeight }}>
            <pre className="p-4 text-xs rounded-lg font-mono whitespace-pre-wrap" style={{ color: 'var(--color-foreground)', backgroundColor: 'var(--color-background)' }}>
              {JSON.stringify(schema, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Validation Errors (hidden in JSON mode since OrbitalJsonViewer shows them) */}
      {validationErrors.length > 0 && viewMode !== 'json' && (
        <div className="border-t p-4" style={{ borderColor: 'var(--color-border)' }}>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2" style={{ color: 'var(--color-error)' }}>
            <AlertCircle className="w-4 h-4" />
            Validation Errors ({validationErrors.length})
          </h4>
          <div className="space-y-1 max-h-32 overflow-auto">
            {validationErrors.map((error, index) => (
              <div key={index} className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                <span style={{ color: 'var(--color-error)' }}>{error.code}</span>: {error.message}
                {error.path && (
                  <span className="ml-2" style={{ color: 'var(--color-muted-foreground)' }}>({error.path})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
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
    <div
      className="border rounded-lg"
      style={{
        borderColor: hasErrors
          ? 'color-mix(in srgb, var(--color-error) 50%, transparent)'
          : 'var(--color-border)',
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 transition-colors"
      >
        {expanded ? (
          <ChevronDown className="w-4 h-4" style={{ color: 'var(--color-muted-foreground)' }} />
        ) : (
          <ChevronRight className="w-4 h-4" style={{ color: 'var(--color-muted-foreground)' }} />
        )}
        <Atom className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
        <span className="font-medium" style={{ color: 'var(--color-foreground)' }}>{orbital.name}</span>
        <div className="flex items-center gap-2 ml-auto text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          <span className="flex items-center gap-1">
            <Database className="w-3 h-3" />
            {entityFieldCount} fields
          </span>
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3" />
            {traitCount} traits
          </span>
          <span className="flex items-center gap-1">
            <FileText className="w-3 h-3" />
            {pageCount} pages
          </span>
        </div>
      </button>

      {/* Content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Entity */}
          {(orbital as any).entity && (
            <div>
              <h5 className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--color-muted-foreground)' }}>Entity</h5>
              <div className="rounded p-3" style={{ backgroundColor: 'var(--color-card)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-4 h-4" style={{ color: 'var(--color-info)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>{(orbital as any).entity.name}</span>
                  {(orbital as any).entity.collection && (
                    <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>({(orbital as any).entity.collection})</span>
                  )}
                </div>
                {(orbital as any).entity.fields && (orbital as any).entity.fields.length > 0 && (
                  <div className="space-y-1 ml-6">
                    {(orbital as any).entity.fields.map((field: any, i: number) => (
                      <div key={i} className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                        <span style={{ color: 'var(--color-foreground)' }}>{field.name}</span>
                        <span style={{ color: 'var(--color-muted-foreground)' }}>: {field.type}</span>
                        {field.required && <span className="ml-1" style={{ color: 'var(--color-error)' }}>*</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Traits */}
          {orbital.traits && orbital.traits.length > 0 && (
            <div>
              <h5 className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--color-muted-foreground)' }}>Traits</h5>
              <div className="flex flex-wrap gap-2">
                {orbital.traits.map((trait, i) => {
                  const traitName = typeof trait === 'string'
                    ? trait
                    : (trait as any).ref || (trait as any).name;
                  return (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      {traitName}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pages */}
          {(orbital as any).pages && (orbital as any).pages.length > 0 && (
            <div>
              <h5 className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--color-muted-foreground)' }}>Pages</h5>
              <div className="space-y-2">
                {(orbital as any).pages.map((page: any, i: number) => (
                  <div key={i} className="rounded p-2" style={{ backgroundColor: 'var(--color-card)' }}>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
                      <span className="text-sm" style={{ color: 'var(--color-foreground)' }}>{page.name}</span>
                      <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{page.path}</span>
                    </div>
                    {page.traits && page.traits.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1 ml-6">
                        {page.traits.map((t: any, j: number) => {
                          const name = typeof t === 'string' ? t : t.ref;
                          return (
                            <span
                              key={j}
                              className="px-1.5 py-0.5 text-xs rounded"
                              style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-foreground)' }}
                            >
                              {name}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrbitalViewer;
