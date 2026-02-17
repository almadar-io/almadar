/**
 * ExpansionSummaryBoard Organism
 *
 * Displays statistics about what the Builder Agent added to the schema.
 * Shows domain vs system counts for states, events, transitions.
 */

import React, { useMemo } from 'react';
import { Card, Typography } from '@almadar/ui';

// =============================================================================
// Types
// =============================================================================

interface SchemaState {
  name: string;
  classification?: 'domain' | 'system';
}

interface SchemaEvent {
  key: string;
  name: string;
  classification?: 'domain' | 'system';
}

interface SchemaTransition {
  from: string;
  to: string;
  event: string;
  effects?: Array<{ type: string }>;
}

interface SchemaComponent {
  type: string;
  props?: Record<string, unknown>;
  children?: SchemaComponent[] | string;
}

interface SchemaPage {
  name: string;
  path: string;
  components?: SchemaComponent[];
}

export interface SummarySchema {
  name?: string;
  stateMachine?: {
    states?: SchemaState[];
    events?: SchemaEvent[];
    transitions?: SchemaTransition[];
  };
  ui?: {
    pages?: SchemaPage[];
  };
  [key: string]: unknown;
}

export interface ExpansionSummaryBoardProps {
  schema: SummarySchema;
  className?: string;
}

// =============================================================================
// Stats Calculation
// =============================================================================

interface ExpansionStats {
  states: { domain: number; system: number; total: number };
  events: { domain: number; system: number; total: number };
  transitions: { domain: number; system: number; total: number };
  effects: { total: number; byType: Record<string, number> };
  pages: { total: number };
  components: { total: number; byType: Record<string, number> };
}

function calculateStats(schema: SummarySchema): ExpansionStats {
  const sm = schema.stateMachine || {};
  const ui = schema.ui || {};
  const states = sm.states || [];
  const events = sm.events || [];
  const transitions = sm.transitions || [];
  const pages = ui.pages || [];

  const countClassified = <T extends { classification?: string }>(items: T[]) =>
    items.reduce(
      (acc, item) => {
        if (item.classification === 'system') acc.system++;
        else acc.domain++;
        return acc;
      },
      { domain: 0, system: 0, total: items.length }
    );

  const stateStats = countClassified(states);
  const eventStats = countClassified(events);

  const transitionStats = transitions.reduce(
    (acc, t) => {
      const fromState = states.find(s => s.name === t.from);
      const toState = states.find(s => s.name === t.to);
      if (fromState?.classification === 'system' || toState?.classification === 'system') acc.system++;
      else acc.domain++;
      return acc;
    },
    { domain: 0, system: 0, total: transitions.length }
  );

  const effectsByType: Record<string, number> = {};
  let totalEffects = 0;
  transitions.forEach(t => {
    (t.effects || []).forEach(e => {
      effectsByType[e.type || 'unknown'] = (effectsByType[e.type || 'unknown'] || 0) + 1;
      totalEffects++;
    });
  });

  const componentsByType: Record<string, number> = {};
  let totalComponents = 0;
  const countComponents = (components: SchemaComponent[] | undefined) => {
    if (!components) return;
    for (const c of components) {
      componentsByType[c.type || 'unknown'] = (componentsByType[c.type || 'unknown'] || 0) + 1;
      totalComponents++;
      if (Array.isArray(c.children)) countComponents(c.children as SchemaComponent[]);
    }
  };
  pages.forEach(p => countComponents(p.components));

  return {
    states: stateStats,
    events: eventStats,
    transitions: transitionStats,
    effects: { total: totalEffects, byType: effectsByType },
    pages: { total: pages.length },
    components: { total: totalComponents, byType: componentsByType },
  };
}

// =============================================================================
// Sub-Components
// =============================================================================

const DomainSystemBar: React.FC<{
  label: string;
  domain: number;
  system: number;
  total: number;
}> = ({ label, domain, system, total }) => {
  const domainPct = total > 0 ? (domain / total) * 100 : 0;
  const systemPct = total > 0 ? (system / total) * 100 : 0;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span style={{ color: 'var(--color-muted-foreground)' }}>{label}</span>
        <span style={{ color: 'var(--color-foreground)' }}>{total}</span>
      </div>
      <div className="h-3 rounded-full overflow-hidden flex" style={{ backgroundColor: 'var(--color-secondary)' }}>
        {domainPct > 0 && <div className="h-full transition-all duration-300" style={{ width: `${domainPct}%`, backgroundColor: 'var(--color-primary)' }} title={`Domain: ${domain}`} />}
        {systemPct > 0 && <div className="h-full transition-all duration-300" style={{ width: `${systemPct}%`, backgroundColor: 'var(--color-accent)' }} title={`System: ${system}`} />}
      </div>
      <div className="flex justify-between text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
        <span>Domain: {domain}</span>
        <span>System: {system}</span>
      </div>
    </div>
  );
};

const EffectBadge: React.FC<{ type: string; count: number }> = ({ type, count }) => {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    persist: { bg: 'color-mix(in srgb, var(--color-info) 20%, transparent)', text: 'var(--color-info)', border: 'color-mix(in srgb, var(--color-info) 30%, transparent)' },
    notify: { bg: 'color-mix(in srgb, var(--color-success) 20%, transparent)', text: 'var(--color-success)', border: 'color-mix(in srgb, var(--color-success) 30%, transparent)' },
    send_email: { bg: 'color-mix(in srgb, var(--color-warning) 20%, transparent)', text: 'var(--color-warning)', border: 'color-mix(in srgb, var(--color-warning) 30%, transparent)' },
    navigate: { bg: 'color-mix(in srgb, var(--color-info) 20%, transparent)', text: 'var(--color-info)', border: 'color-mix(in srgb, var(--color-info) 30%, transparent)' },
    update_field: { bg: 'color-mix(in srgb, var(--color-accent) 20%, transparent)', text: 'var(--color-accent)', border: 'color-mix(in srgb, var(--color-accent) 30%, transparent)' },
    schedule: { bg: 'color-mix(in srgb, var(--color-accent) 20%, transparent)', text: 'var(--color-accent)', border: 'color-mix(in srgb, var(--color-accent) 30%, transparent)' },
    call_webhook: { bg: 'color-mix(in srgb, var(--color-error) 20%, transparent)', text: 'var(--color-error)', border: 'color-mix(in srgb, var(--color-error) 30%, transparent)' },
  };
  const colors = colorMap[type];
  if (colors) {
    return (
      <span
        className="px-2 py-1 text-xs rounded border"
        style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}
      >
        {type}: {count}
      </span>
    );
  }
  return (
    <span
      className="px-2 py-1 text-xs rounded border"
      style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-muted-foreground)', borderColor: 'var(--color-border)' }}
    >
      {type}: {count}
    </span>
  );
};

const StatBox: React.FC<{ label: string; value: number; systemCount?: number }> = ({ label, value, systemCount }) => (
  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--color-background)' }}>
    <Typography variant="h4" style={{ color: 'var(--color-foreground)' }}>{value}</Typography>
    <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>{label}</Typography>
    {systemCount !== undefined && systemCount > 0 && (
      <div className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>+{systemCount} system</div>
    )}
  </div>
);

// =============================================================================
// Main Component
// =============================================================================

export const ExpansionSummaryBoard: React.FC<ExpansionSummaryBoardProps> = ({
  schema,
  className = '',
}) => {
  const stats = useMemo(() => calculateStats(schema), [schema]);

  const systemAdditions = stats.states.system + stats.events.system + stats.transitions.system;
  const totalElements = stats.states.total + stats.events.total + stats.transitions.total;
  const expansionPercent = totalElements > 0 ? Math.round((systemAdditions / totalElements) * 100) : 0;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Summary Header */}
      <Card style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h5" style={{ color: 'var(--color-foreground)' }}>Builder Expansion Summary</Typography>
            <div className="text-right">
              <Typography variant="h4" style={{ color: 'var(--color-primary)' }}>+{systemAdditions}</Typography>
              <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>system elements added</Typography>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <StatBox label="States" value={stats.states.total} systemCount={stats.states.system} />
            <StatBox label="Events" value={stats.events.total} systemCount={stats.events.system} />
            <StatBox label="Transitions" value={stats.transitions.total} systemCount={stats.transitions.system} />
            <StatBox label="Effects" value={stats.effects.total} />
          </div>

          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'var(--color-primary)' }} />
            <span>Domain (Requirements)</span>
            <div className="w-3 h-3 rounded ml-4" style={{ backgroundColor: 'var(--color-accent)' }} />
            <span>System (Builder)</span>
            <span className="ml-auto" style={{ color: 'var(--color-muted-foreground)' }}>{expansionPercent}% expansion</span>
          </div>
        </div>
      </Card>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <div className="p-4">
            <Typography variant="h6" className="mb-4" style={{ color: 'var(--color-foreground)' }}>State Machine</Typography>
            <div className="space-y-4">
              <DomainSystemBar label="States" domain={stats.states.domain} system={stats.states.system} total={stats.states.total} />
              <DomainSystemBar label="Events" domain={stats.events.domain} system={stats.events.system} total={stats.events.total} />
              <DomainSystemBar label="Transitions" domain={stats.transitions.domain} system={stats.transitions.system} total={stats.transitions.total} />
            </div>
          </div>
        </Card>

        <Card style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <div className="p-4">
            <Typography variant="h6" className="mb-4" style={{ color: 'var(--color-foreground)' }}>Effects ({stats.effects.total})</Typography>
            {stats.effects.total > 0 ? (
              <div className="flex flex-wrap gap-2">
                {Object.entries(stats.effects.byType).map(([type, count]) => (
                  <EffectBadge key={type} type={type} count={count} />
                ))}
              </div>
            ) : (
              <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>No effects defined yet</Typography>
            )}

            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex justify-between items-center mb-2">
                <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>Pages: {stats.pages.total}</Typography>
                <Typography variant="caption" style={{ color: 'var(--color-primary)' }}>Components: {stats.components.total}</Typography>
              </div>
              {stats.components.total > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {Object.entries(stats.components.byType)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 8)
                    .map(([type, count]) => (
                      <span key={type} className="px-1.5 py-0.5 text-xs rounded" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-muted-foreground)' }}>{type}: {count}</span>
                    ))}
                  {Object.keys(stats.components.byType).length > 8 && (
                    <span className="px-1.5 py-0.5 text-xs" style={{ color: 'var(--color-muted-foreground)' }}>+{Object.keys(stats.components.byType).length - 8} more</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

ExpansionSummaryBoard.displayName = 'ExpansionSummaryBoard';
export default ExpansionSummaryBoard;
