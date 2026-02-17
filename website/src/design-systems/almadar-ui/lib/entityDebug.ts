/**
 * Entity Debug - Provides entity state snapshots for debugging
 *
 * @packageDocumentation
 */

export interface EntityState {
  id: string;
  type: string;
  fields: Record<string, unknown>;
  lastUpdated: number;
}

export interface RuntimeEntity {
  id: string;
  type: string;
  data: Record<string, unknown>;
}

export interface PersistentEntityInfo {
  loaded: boolean;
  count: number;
}

export interface EntitySnapshot {
  entities: EntityState[];
  timestamp: number;
  totalCount: number;
  /** Singleton entities by name */
  singletons: Record<string, unknown>;
  /** Runtime entities (in-memory) */
  runtime: RuntimeEntity[];
  /** Persistent entities info by type */
  persistent: Record<string, PersistentEntityInfo>;
}

type EntityProvider = () => EntityState[];

let entityProvider: EntityProvider | null = null;

export function setEntityProvider(provider: EntityProvider): void {
  entityProvider = provider;
}

export function clearEntityProvider(): void {
  entityProvider = null;
}

export function getEntitySnapshot(): EntitySnapshot | null {
  if (!entityProvider) {
    return null;
  }

  const entities = entityProvider();
  return {
    entities,
    timestamp: Date.now(),
    totalCount: entities.length,
    singletons: {},
    runtime: entities.map((e) => ({ id: e.id, type: e.type, data: e.fields })),
    persistent: {},
  };
}

export function getEntityById(id: string): EntityState | undefined {
  if (!entityProvider) {
    return undefined;
  }

  return entityProvider().find((e) => e.id === id);
}

export function getEntitiesByType(type: string): EntityState[] {
  if (!entityProvider) {
    return [];
  }

  return entityProvider().filter((e) => e.type === type);
}
