/**
 * MockDataService - In-memory data store with faker-based mock generation
 *
 * Provides a stateful mock data layer that supports all CRUD operations.
 * Uses @faker-js/faker for realistic data generation based on field types.
 *
 * @packageDocumentation
 */

import { faker } from '@faker-js/faker';
import { env } from '@/lib/env';
import { logger } from '@/lib/logger';

// ============================================================================
// Types
// ============================================================================

export interface FieldSchema {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'enum' | 'relation' | 'array';
  required?: boolean;
  enumValues?: string[];
  min?: number;
  max?: number;
  fakerMethod?: string;
  relatedEntity?: string;
}

export interface EntitySchema {
  fields: FieldSchema[];
  seedCount?: number;
}

interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// MockDataService
// ============================================================================

/**
 * In-memory mock data store with CRUD operations and faker-based seeding.
 */
export class MockDataService {
  private stores: Map<string, Map<string, unknown>> = new Map();
  private schemas: Map<string, EntitySchema> = new Map();
  private idCounters: Map<string, number> = new Map();

  constructor() {
    // Set seed for deterministic generation if provided
    if (env.MOCK_SEED !== undefined) {
      faker.seed(env.MOCK_SEED);
      logger.info(`[Mock] Using seed: ${env.MOCK_SEED}`);
    }
  }

  // ============================================================================
  // Store Management
  // ============================================================================

  /**
   * Initialize store for an entity.
   */
  private getStore(entityName: string): Map<string, unknown> {
    const normalized = entityName.toLowerCase();
    if (!this.stores.has(normalized)) {
      this.stores.set(normalized, new Map());
      this.idCounters.set(normalized, 0);
    }
    return this.stores.get(normalized)!;
  }

  /**
   * Generate next ID for an entity.
   */
  private nextId(entityName: string): string {
    const normalized = entityName.toLowerCase();
    const counter = (this.idCounters.get(normalized) ?? 0) + 1;
    this.idCounters.set(normalized, counter);
    return `mock-${normalized}-${counter}`;
  }

  // ============================================================================
  // Schema & Seeding
  // ============================================================================

  /**
   * Register an entity schema.
   */
  registerSchema(entityName: string, schema: EntitySchema): void {
    this.schemas.set(entityName.toLowerCase(), schema);
  }

  /**
   * Seed an entity with mock data.
   */
  seed(entityName: string, fields: FieldSchema[], count: number = 10): void {
    const store = this.getStore(entityName);
    const normalized = entityName.toLowerCase();

    logger.info(`[Mock] Seeding ${count} ${entityName}...`);

    for (let i = 0; i < count; i++) {
      const item = this.generateMockItem(normalized, fields, i + 1);
      store.set(item.id, item);
    }
  }

  /**
   * Generate a single mock item based on field schemas.
   */
  private generateMockItem(entityName: string, fields: FieldSchema[], index: number): BaseEntity & Record<string, unknown> {
    const id = this.nextId(entityName);
    const now = new Date();
    const item: Record<string, unknown> = {
      id,
      createdAt: faker.date.past({ years: 1 }),
      updatedAt: now,
    };

    for (const field of fields) {
      if (field.name === 'id' || field.name === 'createdAt' || field.name === 'updatedAt') {
        continue;
      }
      item[field.name] = this.generateFieldValue(entityName, field, index);
    }

    return item as BaseEntity & Record<string, unknown>;
  }

  /**
   * Generate a mock value for a field based on its schema.
   */
  private generateFieldValue(entityName: string, field: FieldSchema, index: number): unknown {
    // Handle optional fields - 80% chance of having a value
    if (!field.required && Math.random() > 0.8) {
      return undefined;
    }

    switch (field.type) {
      case 'string':
        return this.generateStringValue(entityName, field, index);

      case 'number':
        return faker.number.int({
          min: field.min ?? 0,
          max: field.max ?? 1000,
        });

      case 'boolean':
        return faker.datatype.boolean();

      case 'date':
        return this.generateDateValue(field);

      case 'enum':
        if (field.enumValues && field.enumValues.length > 0) {
          return faker.helpers.arrayElement(field.enumValues);
        }
        return null;

      case 'relation':
        // For relations, generate a placeholder ID or null
        if (field.relatedEntity) {
          const relatedStore = this.stores.get(field.relatedEntity.toLowerCase());
          if (relatedStore && relatedStore.size > 0) {
            const ids = Array.from(relatedStore.keys());
            return faker.helpers.arrayElement(ids);
          }
        }
        return null;

      case 'array':
        // Generate an empty array for now
        return [];

      default:
        return null;
    }
  }

  /**
   * Generate a string value based on field name heuristics.
   * Generic name/title fields use entity-aware format (e.g., "Project Name 1").
   * Specific fields (email, phone, etc.) use faker.
   */
  private generateStringValue(entityName: string, field: FieldSchema, index: number): string {
    const name = field.name.toLowerCase();

    // If field has enumValues, use them (even if type is 'string')
    if (field.enumValues && field.enumValues.length > 0) {
      return faker.helpers.arrayElement(field.enumValues);
    }

    // Specific fields - use faker for realistic data
    if (name.includes('email')) return faker.internet.email();
    if (name.includes('phone')) return faker.phone.number();
    if (name.includes('address')) return faker.location.streetAddress();
    if (name.includes('city')) return faker.location.city();
    if (name.includes('country')) return faker.location.country();
    if (name.includes('url') || name.includes('website')) return faker.internet.url();
    if (name.includes('avatar') || name.includes('image')) return faker.image.avatar();
    if (name.includes('color')) return faker.color.human();
    if (name.includes('uuid')) return faker.string.uuid();

    // Generic name/title/text fields - use entity-aware readable format
    // Capitalize entity name and field name: "Project Name 1", "Task Title 1"
    const entityLabel = this.capitalizeFirst(entityName);
    const fieldLabel = this.capitalizeFirst(field.name);
    return `${entityLabel} ${fieldLabel} ${index}`;
  }

  /**
   * Capitalize first letter of a string.
   */
  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Generate a date value based on field name heuristics.
   */
  private generateDateValue(field: FieldSchema): Date {
    const name = field.name.toLowerCase();

    if (name.includes('created') || name.includes('start') || name.includes('birth')) {
      return faker.date.past({ years: 2 });
    }
    if (name.includes('updated') || name.includes('modified')) {
      return faker.date.recent({ days: 30 });
    }
    if (name.includes('deadline') || name.includes('due') || name.includes('end') || name.includes('expires')) {
      return faker.date.future({ years: 1 });
    }

    return faker.date.anytime();
  }

  // ============================================================================
  // CRUD Operations
  // ============================================================================

  /**
   * List all items of an entity.
   */
  list<T>(entityName: string): T[] {
    const store = this.getStore(entityName);
    return Array.from(store.values()) as T[];
  }

  /**
   * Get a single item by ID.
   */
  getById<T>(entityName: string, id: string): T | null {
    const store = this.getStore(entityName);
    const item = store.get(id);
    return (item as T) ?? null;
  }

  /**
   * Create a new item.
   */
  create<T extends BaseEntity>(entityName: string, data: Partial<T>): T {
    const store = this.getStore(entityName);
    const id = this.nextId(entityName);
    const now = new Date();

    const item = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    } as T;

    store.set(id, item);
    return item;
  }

  /**
   * Update an existing item.
   */
  update<T extends BaseEntity>(entityName: string, id: string, data: Partial<T>): T | null {
    const store = this.getStore(entityName);
    const existing = store.get(id);

    if (!existing) {
      return null;
    }

    const updated = {
      ...(existing as T),
      ...data,
      id, // Preserve original ID
      updatedAt: new Date(),
    } as T;

    store.set(id, updated);
    return updated;
  }

  /**
   * Delete an item.
   */
  delete(entityName: string, id: string): boolean {
    const store = this.getStore(entityName);
    if (!store.has(id)) {
      return false;
    }
    store.delete(id);
    return true;
  }

  // ============================================================================
  // Utilities
  // ============================================================================

  /**
   * Clear all data for an entity.
   */
  clear(entityName: string): void {
    const normalized = entityName.toLowerCase();
    this.stores.delete(normalized);
    this.idCounters.delete(normalized);
  }

  /**
   * Clear all data.
   */
  clearAll(): void {
    this.stores.clear();
    this.idCounters.clear();
  }

  /**
   * Get count of items for an entity.
   */
  count(entityName: string): number {
    const store = this.getStore(entityName);
    return store.size;
  }
}

// Singleton instance
export const mockDataService = new MockDataService();
