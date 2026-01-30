/**
 * DataService - Unified data access abstraction
 *
 * Provides a common interface for data operations that can be backed by
 * either MockDataService (for development) or Firebase (for production).
 *
 * @packageDocumentation
 */

import { db } from '@/lib/db';
import { env } from '@/lib/env';
import { logger } from '@/lib/logger';
import { mockDataService, type FieldSchema } from './MockDataService.js';
import {
  parseQueryFilters,
  applyFiltersToQuery,
  type ParsedFilter,
} from '../utils/queryFilters.js';

// ============================================================================
// Types
// ============================================================================

interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Pagination options for list queries
 */
export interface PaginationOptions {
  /** Page number (1-indexed) */
  page?: number;
  /** Number of items per page */
  pageSize?: number;
  /** Search term to filter results */
  search?: string;
  /** Fields to search in (defaults to all string fields) */
  searchFields?: string[];
  /** Sort field */
  sortBy?: string;
  /** Sort direction */
  sortOrder?: 'asc' | 'desc';
  /** Filters parsed from query params */
  filters?: ParsedFilter[];
}

/**
 * Paginated response structure
 */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DataService {
  list<T>(collection: string): Promise<T[]>;
  listPaginated<T>(collection: string, options?: PaginationOptions): Promise<PaginatedResult<T>>;
  getById<T>(collection: string, id: string): Promise<T | null>;
  create<T extends BaseEntity>(collection: string, data: Partial<T>): Promise<T>;
  update<T extends BaseEntity>(collection: string, id: string, data: Partial<T>): Promise<T | null>;
  delete(collection: string, id: string): Promise<boolean>;
}

/**
 * Apply filter condition for in-memory filtering.
 * Used by MockDataServiceAdapter for all operators and
 * FirebaseDataService for operators not supported by Firestore.
 */
function applyFilterCondition(value: unknown, operator: string, filterValue: unknown): boolean {
  if (value === null || value === undefined) {
    return operator === '!=' ? filterValue !== null : false;
  }

  switch (operator) {
    case '==':
      return value === filterValue;
    case '!=':
      return value !== filterValue;
    case '>':
      return (value as number) > (filterValue as number);
    case '>=':
      return (value as number) >= (filterValue as number);
    case '<':
      return (value as number) < (filterValue as number);
    case '<=':
      return (value as number) <= (filterValue as number);
    case 'array-contains':
      return Array.isArray(value) && value.includes(filterValue);
    case 'array-contains-any':
      return (
        Array.isArray(value) &&
        Array.isArray(filterValue) &&
        filterValue.some((v: unknown) => value.includes(v))
      );
    case 'in':
      return Array.isArray(filterValue) && filterValue.includes(value);
    case 'not-in':
      return Array.isArray(filterValue) && !filterValue.includes(value);
    default:
      return true;
  }
}

// ============================================================================
// MockDataServiceAdapter
// ============================================================================

/**
 * Adapter that wraps MockDataService with async interface.
 */
class MockDataServiceAdapter implements DataService {
  async list<T>(collection: string): Promise<T[]> {
    return mockDataService.list<T>(collection);
  }

  async listPaginated<T>(
    collection: string,
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<T>> {
    const {
      page = 1,
      pageSize = 20,
      search,
      searchFields,
      sortBy,
      sortOrder = 'asc',
      filters,
    } = options;

    let items = mockDataService.list<T>(collection);

    // Apply field filters (server-side filtering)
    if (filters && filters.length > 0) {
      items = items.filter((item) => {
        const record = item as Record<string, unknown>;
        return filters.every((filter) => {
          const value = record[filter.field];
          return applyFilterCondition(value, filter.operator, filter.value);
        });
      });
    }

    // Apply search filter
    if (search && search.trim()) {
      const searchLower = search.toLowerCase();
      items = items.filter((item) => {
        const record = item as Record<string, unknown>;
        const fieldsToSearch = searchFields || Object.keys(record);
        return fieldsToSearch.some((field) => {
          const value = record[field];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchLower);
        });
      });
    }

    // Apply sorting
    if (sortBy) {
      items = [...items].sort((a, b) => {
        const aVal = (a as Record<string, unknown>)[sortBy];
        const bVal = (b as Record<string, unknown>)[sortBy];
        if (aVal === bVal) return 0;
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        const comparison = aVal < bVal ? -1 : 1;
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    const total = items.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const data = items.slice(startIndex, startIndex + pageSize);

    return { data, total, page, pageSize, totalPages };
  }

  async getById<T>(collection: string, id: string): Promise<T | null> {
    return mockDataService.getById<T>(collection, id);
  }

  async create<T extends BaseEntity>(collection: string, data: Partial<T>): Promise<T> {
    return mockDataService.create<T>(collection, data);
  }

  async update<T extends BaseEntity>(
    collection: string,
    id: string,
    data: Partial<T>
  ): Promise<T | null> {
    return mockDataService.update<T>(collection, id, data);
  }

  async delete(collection: string, id: string): Promise<boolean> {
    return mockDataService.delete(collection, id);
  }
}

// ============================================================================
// FirebaseDataService
// ============================================================================

/**
 * Firebase/Firestore implementation of DataService.
 */
class FirebaseDataService implements DataService {
  async list<T>(collection: string): Promise<T[]> {
    const snapshot = await db.collection(collection).get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  }

  async listPaginated<T>(
    collection: string,
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<T>> {
    const {
      page = 1,
      pageSize = 20,
      search,
      searchFields,
      sortBy,
      sortOrder = 'asc',
      filters,
    } = options;

    // For Firebase, we apply filters using Firestore's .where() for supported operators
    // Note: For large datasets, consider using Algolia or Elasticsearch for search
    let query: FirebaseFirestore.Query = db.collection(collection);

    // Apply field filters using Firestore's where() clauses
    if (filters && filters.length > 0) {
      query = applyFiltersToQuery(query, filters);
    }

    // Apply sorting if no search (Firestore can sort natively)
    if (sortBy && !search) {
      query = query.orderBy(sortBy, sortOrder);
    }

    const snapshot = await query.get();
    let items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];

    // Apply search filter (in-memory for Firebase)
    if (search && search.trim()) {
      const searchLower = search.toLowerCase();
      items = items.filter((item) => {
        const record = item as Record<string, unknown>;
        const fieldsToSearch = searchFields || Object.keys(record);
        return fieldsToSearch.some((field) => {
          const value = record[field];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchLower);
        });
      });
    }

    // Apply sorting (in-memory if search was applied)
    if (sortBy && search) {
      items = [...items].sort((a, b) => {
        const aVal = (a as Record<string, unknown>)[sortBy];
        const bVal = (b as Record<string, unknown>)[sortBy];
        if (aVal === bVal) return 0;
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        const comparison = aVal < bVal ? -1 : 1;
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    const total = items.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const data = items.slice(startIndex, startIndex + pageSize);

    return { data, total, page, pageSize, totalPages };
  }

  async getById<T>(collection: string, id: string): Promise<T | null> {
    const doc = await db.collection(collection).doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() } as T;
  }

  async create<T extends BaseEntity>(collection: string, data: Partial<T>): Promise<T> {
    const now = new Date();
    const docRef = await db.collection(collection).add({
      ...data,
      createdAt: now,
      updatedAt: now,
    });

    return {
      ...data,
      id: docRef.id,
      createdAt: now,
      updatedAt: now,
    } as T;
  }

  async update<T extends BaseEntity>(
    collection: string,
    id: string,
    data: Partial<T>
  ): Promise<T | null> {
    const docRef = db.collection(collection).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return null;
    }

    const now = new Date();
    await docRef.update({
      ...data,
      updatedAt: now,
    });

    return {
      ...doc.data(),
      ...data,
      id,
      updatedAt: now,
    } as T;
  }

  async delete(collection: string, id: string): Promise<boolean> {
    const docRef = db.collection(collection).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return false;
    }

    await docRef.delete();
    return true;
  }
}

// ============================================================================
// Factory & Export
// ============================================================================

/**
 * Create the appropriate data service based on environment configuration.
 */
function createDataService(): DataService {
  if (env.USE_MOCK_DATA) {
    logger.info('[DataService] Using MockDataService');
    return new MockDataServiceAdapter();
  }
  logger.info('[DataService] Using FirebaseDataService');
  return new FirebaseDataService();
}

/**
 * Singleton data service instance.
 * Use this in handlers for all data operations.
 */
export const dataService = createDataService();

// ============================================================================
// Seeding Helper
// ============================================================================

export interface EntitySeedConfig {
  name: string;
  fields: FieldSchema[];
  seedCount: number;
}

/**
 * Seed mock data for multiple entities.
 * Only works when USE_MOCK_DATA is enabled.
 */
export function seedMockData(entities: EntitySeedConfig[]): void {
  if (!env.USE_MOCK_DATA) {
    logger.info('[DataService] Mock mode disabled, skipping seed');
    return;
  }

  logger.info('[DataService] Seeding mock data...');

  for (const entity of entities) {
    mockDataService.seed(entity.name, entity.fields, entity.seedCount);
  }

  logger.info('[DataService] Mock data seeding complete');
}
