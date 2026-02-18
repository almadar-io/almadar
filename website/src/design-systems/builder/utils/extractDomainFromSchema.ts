/**
 * extractDomainFromSchema — Extract domain data from OrbitalSchema
 *
 * Maps orbitals[].entity, .pages, .traits into the UI display types
 * used by DomainLogicView and HQ tabs (Story, Flow, Glossary).
 */

import type { OrbitalSchema } from "@almadar/core";
import type { EntityData } from "../organisms/domain/DomainEntitySection";
import type { PageData } from "../organisms/domain/DomainPageSection";
import type { BehaviorData } from "../organisms/domain/DomainBehaviorSection";
import type { GlossaryEntry } from "../molecules/domain/DomainGlossary";
import type {
  EntityField as DomainEntityField,
} from "../molecules/domain/DomainEntityCard";
import type { FlowTransition } from "../molecules/domain/DomainFlowView";

export interface DomainExtraction {
  entities: EntityData[];
  pages: PageData[];
  behaviors: BehaviorData[];
}

export interface StoryData {
  entityCards: Array<{
    name: string;
    description?: string;
    fields: DomainEntityField[];
    states: string[];
    initialState?: string;
  }>;
}

export interface FlowData {
  flows: Array<{
    name: string;
    states: string[];
    initialState?: string;
    transitions: FlowTransition[];
  }>;
}

export function extractDomainFromSchema(
  schema: OrbitalSchema
): DomainExtraction {
  const entities: EntityData[] = [];
  const pages: PageData[] = [];
  const behaviors: BehaviorData[] = [];

  for (const orbital of schema.orbitals || []) {
    const orb = orbital as unknown as Record<string, unknown>;

    // Extract entity
    const rawEntity = orb.entity;
    // Handle string entity references
    if (typeof rawEntity === "string") {
      entities.push({ name: rawEntity, description: "", fields: [], relationships: [] });
    }
    const entity = typeof rawEntity === "object" ? (rawEntity as Record<string, unknown>) : undefined;
    if (entity && entity.name) {
      const fields = (
        (entity.fields as Array<Record<string, unknown>>) || []
      ).map((f) => {
        const constraints: Array<{
          type: "required" | "unique" | "auto" | "default";
          value?: string | number | boolean;
        }> = [];
        if (f.required) constraints.push({ type: "required" });
        if (f.unique) constraints.push({ type: "unique" });
        if (f.auto) constraints.push({ type: "auto" });
        if (f.default !== undefined)
          constraints.push({
            type: "default",
            value: f.default as string | number | boolean,
          });
        return {
          name: f.name as string,
          fieldType: (f.type as string) || "string",
          constraints,
          enumValues: f.values as string[] | undefined,
          error: undefined,
        };
      });
      entities.push({
        name: entity.name as string,
        description: (entity.description as string) || "",
        fields,
        relationships: [],
        states: [],
      });
    }

    // Extract pages
    const orbPages = orb.pages as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(orbPages)) {
      for (const p of orbPages) {
        if (typeof p === "object" && p.name) {
          const traits = (p.traits as Array<Record<string, unknown>>) || [];
          pages.push({
            name: p.name as string,
            description: (p.title as string) || "",
            purpose: p.viewType as string | undefined,
            url: (p.path as string) || "",
            sections: traits.map((t) => ({
              description: (t.ref as string) || "",
            })),
            actions: [],
            onAccess: undefined,
          });
        }
      }
    }

    // Extract traits as behaviors
    const rawTraits = orb.traits;
    const traits = Array.isArray(rawTraits) ? rawTraits : [];
    if (traits.length > 0) {
      for (const trait of traits) {
        if (typeof trait !== "object" || !trait || !(trait as Record<string, unknown>).name) continue;
        const sm = trait.stateMachine as Record<string, unknown> | undefined;
        if (!sm) continue;

        const states = (sm.states as Array<Record<string, unknown>>) || [];
        const stateNames = states.map((s) => s.name as string);
        const initialState =
          (states.find((s) => s.isInitial)?.name as string) ||
          stateNames[0] ||
          "";

        const transitions = (
          (sm.transitions as Array<Record<string, unknown>>) || []
        ).map((t) => ({
          fromState: (t.from as string) || "",
          toState: (t.to as string) || "",
          event: (t.event as string) || "",
          guards: t.guard
            ? [
                {
                  type: "field_check" as const,
                  raw: JSON.stringify(t.guard),
                },
              ]
            : [],
          effects: ((t.effects as Array<unknown[]>) || []).map((e) => ({
            type: ((e[0] as string) || "api_call") as
              | "notify"
              | "update_field"
              | "navigate"
              | "emit_event"
              | "api_call",
            description: (e as unknown[]).slice(0, 3).join(" "),
          })),
        }));

        behaviors.push({
          name: trait.name as string,
          entityName:
            (trait.linkedEntity as string) ||
            (entity?.name as string) ||
            "",
          states: stateNames,
          initialState,
          transitions,
          ticks: [],
          rules: [],
        });
      }
    }
  }

  return { entities, pages, behaviors };
}

/**
 * Extract story data (entity cards) from schema for the Story tab.
 */
export function extractStoryData(schema: OrbitalSchema): StoryData {
  const entityCards: StoryData["entityCards"] = [];

  for (const orbital of schema.orbitals || []) {
    const orb = orbital as unknown as Record<string, unknown>;
    const rawEntity = orb.entity;
    // Handle string entity references — create a minimal card
    if (typeof rawEntity === "string") {
      entityCards.push({ name: rawEntity, fields: [], states: [] });
      continue;
    }
    const entity = rawEntity as Record<string, unknown> | undefined;
    if (!entity || !entity.name) continue;

    const rawFields = (entity.fields as Array<Record<string, unknown>>) || [];
    const fields: DomainEntityField[] = rawFields.map((f) => ({
      name: f.name as string,
      type: (f.type as string) || "string",
      required: Boolean(f.required),
    }));

    // Find states from traits
    const traits = orb.traits as Array<Record<string, unknown>> | undefined;
    let stateNames: string[] = [];
    let initialState: string | undefined;
    if (Array.isArray(traits)) {
      for (const trait of traits) {
        const sm = (trait as Record<string, unknown>).stateMachine as
          | Record<string, unknown>
          | undefined;
        if (!sm) continue;
        const states = (sm.states as Array<Record<string, unknown>>) || [];
        stateNames = states.map((s) => s.name as string);
        initialState =
          (states.find((s) => s.isInitial)?.name as string) || stateNames[0];
        break;
      }
    }

    entityCards.push({
      name: entity.name as string,
      description: (entity.description as string) || undefined,
      fields,
      states: stateNames,
      initialState,
    });
  }

  return { entityCards };
}

/**
 * Extract flow data (state transitions) from schema for the Flow tab.
 */
export function extractFlowData(schema: OrbitalSchema): FlowData {
  const flows: FlowData["flows"] = [];

  for (const orbital of schema.orbitals || []) {
    const orb = orbital as unknown as Record<string, unknown>;
    const rawTraits = orb.traits;
    if (!Array.isArray(rawTraits)) continue;

    for (const trait of rawTraits) {
      if (typeof trait !== "object" || !trait || !(trait as Record<string, unknown>).name) continue;
      const sm = trait.stateMachine as Record<string, unknown> | undefined;
      if (!sm) continue;

      const states = (sm.states as Array<Record<string, unknown>>) || [];
      const stateNames = states.map((s) => s.name as string);
      const initialState =
        (states.find((s) => s.isInitial)?.name as string) || stateNames[0];

      const transitions: FlowTransition[] = (
        (sm.transitions as Array<Record<string, unknown>>) || []
      ).map((t) => ({
        from: (t.from as string) || "",
        to: (t.to as string) || "",
        event: (t.event as string) || "",
        guard: t.guard ? JSON.stringify(t.guard) : undefined,
        effects: ((t.effects as Array<unknown[]>) || []).map((e) =>
          (e as unknown[]).slice(0, 3).join(" ")
        ),
      }));

      flows.push({
        name: trait.name as string,
        states: stateNames,
        initialState,
        transitions,
      });
    }
  }

  return { flows };
}

/**
 * Extract glossary entries from schema for the Glossary tab.
 */
export function extractGlossaryEntries(
  schema: OrbitalSchema
): GlossaryEntry[] {
  const entries: GlossaryEntry[] = [];

  for (const orbital of schema.orbitals || []) {
    const orb = orbital as unknown as Record<string, unknown>;

    // Entity entries
    const rawEntity = orb.entity;
    if (typeof rawEntity === "string") {
      entries.push({ term: rawEntity, definition: `A ${rawEntity} entity`, category: "entity" });
    }
    const entity = typeof rawEntity === "object" ? (rawEntity as Record<string, unknown>) : undefined;
    if (entity && entity.name) {
      const fields = (entity.fields as Array<Record<string, unknown>>) || [];
      const fieldNames = fields.map((f) => f.name as string);

      entries.push({
        term: entity.name as string,
        definition: (entity.description as string) || `A ${entity.name} entity`,
        category: "entity",
        properties: fieldNames,
      });
    }

    // Trait / behavior entries
    const glossaryTraits = orb.traits;
    if (Array.isArray(glossaryTraits)) {
      for (const trait of glossaryTraits) {
        if (typeof trait !== "object" || !trait || !(trait as Record<string, unknown>).name) continue;
        const sm = trait.stateMachine as Record<string, unknown> | undefined;
        if (!sm) continue;

        const states = (sm.states as Array<Record<string, unknown>>) || [];
        const stateNames = states.map((s) => s.name as string);

        entries.push({
          term: trait.name as string,
          definition: `Behavior for ${(trait.linkedEntity as string) || "entity"}`,
          category: "behavior",
          states: stateNames,
        });

        // State entries
        for (const state of stateNames) {
          entries.push({
            term: state,
            definition: `State in ${trait.name as string}`,
            category: "state",
          });
        }
      }
    }
  }

  return entries;
}
