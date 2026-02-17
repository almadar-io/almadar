/**
 * Orbital Types for HeroSchemaAnimation
 * Copied/Adapted from @almadar/core to enable dynamic schema visualization.
 */

// ============================================================================
// State Machine
// ============================================================================

export interface State {
    name: string;
    isInitial?: boolean;
    isTerminal?: boolean;
    isFinal?: boolean; // Legacy alias
    description?: string;
}

export interface Event {
    key: string;
    name: string;
    description?: string;
}

export interface Transition {
    from: string;
    to: string;
    event: string;
    description?: string;
}

export interface StateMachine {
    states: State[];
    events: Event[];
    transitions: Transition[];
}

// ============================================================================
// Trait
// ============================================================================

export interface Trait {
    name: string;
    description?: string;
    category?: string;
    stateMachine?: StateMachine;
}

export type TraitRef = string | { ref: string; config?: Record<string, unknown> } | Trait;

// ============================================================================
// Page
// ============================================================================

export interface Page {
    name: string;
    path: string;
    title?: string;
}

export type PageRef = Page | string | { ref: string; path?: string };

// ============================================================================
// Entity
// ============================================================================

export interface Entity {
    name: string;
    fields: Array<{ name: string; type: string }>;
}

export type EntityRef = Entity | string;

// ============================================================================
// Orbital
// ============================================================================

export interface Orbital {
    name: string;
    entity: EntityRef;
    traits: TraitRef[];
    pages: PageRef[];
}

// ============================================================================
// Orbital Schema
// ============================================================================

export interface OrbitalSchema {
    name: string;
    orbitals: Orbital[];
}
