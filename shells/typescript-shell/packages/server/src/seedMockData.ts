/**
 * Mock Data Seeding
 *
 * Initializes mock data for development/testing.
 *
 * @packageDocumentation
 */

import { mockDataService, type EntitySchema } from './services/MockDataService.js';
import { logger } from './lib/logger.js';

const entitySchemas: Record<string, EntitySchema> = {
  'products': {
    fields: [
      { name: 'name', type: 'string', required: true },
      { name: 'description', type: 'string', required: false },
      { name: 'price', type: 'number', required: true },
      { name: 'category', type: 'string', required: false },
      { name: 'sku', type: 'string', required: true },
      { name: 'inStock', type: 'boolean', required: false },
      { name: 'imageUrl', type: 'string', required: false }
    ],
    seedCount: 10,
  },
  'orders': {
    fields: [
      { name: 'orderNumber', type: 'string', required: true },
      { name: 'customerId', type: 'string', required: true },
      { name: 'status', type: 'string', required: false },
      { name: 'total', type: 'number', required: true },
      { name: 'items', type: 'array', required: false },
      { name: 'shippingAddress', type: 'string', required: false },
      { name: 'createdAt', type: 'date', required: false }
    ],
    seedCount: 10,
  },
  'customers': {
    fields: [
      { name: 'name', type: 'string', required: true },
      { name: 'email', type: 'string', required: true },
      { name: 'phone', type: 'string', required: false },
      { name: 'address', type: 'string', required: false },
      { name: 'memberSince', type: 'date', required: false },
      { name: 'totalOrders', type: 'number', required: false },
      { name: 'totalSpent', type: 'number', required: false }
    ],
    seedCount: 10,
  },
  'inventory': {
    fields: [
      { name: 'productId', type: 'string', required: true },
      { name: 'quantity', type: 'number', required: true },
      { name: 'warehouse', type: 'string', required: false },
      { name: 'reorderLevel', type: 'number', required: false },
      { name: 'lastRestocked', type: 'date', required: false }
    ],
    seedCount: 10,
  }
};

/**
 * Initialize mock data for all entities
 */
export async function initializeMockData(): Promise<void> {
  for (const [entityName, schema] of Object.entries(entitySchemas)) {
    mockDataService.registerSchema(entityName, schema);
    mockDataService.seed(entityName, schema.fields, schema.seedCount || 10);
    logger.info(`Seeded ${schema.seedCount || 10} ${entityName}`);
  }
}
