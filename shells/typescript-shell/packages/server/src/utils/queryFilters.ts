/**
 * Query Filter Utilities
 *
 * Parses URL query parameters into Firestore-compatible filter objects.
 * Supports operator encoding in parameter names: field__operator=value
 *
 * @example
 * // URL: /api/tasks?status=active&date__gte=2025-01-01&tags__contains=urgent
 * const filters = parseQueryFilters(req.query);
 * // Returns:
 * // [
 * //   { field: 'status', operator: '==', value: 'active' },
 * //   { field: 'date', operator: '>=', value: '2025-01-01' },
 * //   { field: 'tags', operator: 'array-contains', value: 'urgent' }
 * // ]
 *
 * @packageDocumentation
 */

/**
 * Parsed filter ready for Firestore query
 */
export interface ParsedFilter {
  field: string;
  operator: FirestoreWhereFilterOp;
  value: unknown;
}

/**
 * Firestore where filter operators
 */
export type FirestoreWhereFilterOp =
  | '=='
  | '!='
  | '>'
  | '>='
  | '<'
  | '<='
  | 'array-contains'
  | 'array-contains-any'
  | 'in'
  | 'not-in';

/**
 * Map of URL operator suffixes to Firestore operators
 */
const OPERATOR_MAP: Record<string, FirestoreWhereFilterOp> = {
  'eq': '==',
  'neq': '!=',
  'gt': '>',
  'gte': '>=',
  'lt': '<',
  'lte': '<=',
  'contains': 'array-contains',
  'contains_any': 'array-contains-any',
  'in': 'in',
  'not_in': 'not-in',
  // Date operators map to same comparison operators
  'date_eq': '==',
  'date_gte': '>=',
  'date_lte': '<=',
};

/**
 * Reserved query parameters that should not be treated as filters
 */
const RESERVED_PARAMS = new Set([
  'page',
  'pageSize',
  'limit',
  'offset',
  'search',
  'q',
  'sortBy',
  'sortOrder',
  'orderBy',
  'orderDirection',
]);

/**
 * Parse query parameters into Firestore-compatible filters.
 *
 * Supports operator encoding: field__operator=value
 *
 * @param query - Express req.query object
 * @returns Array of parsed filters ready for Firestore .where() calls
 *
 * @example
 * ```typescript
 * // In Express route handler:
 * const filters = parseQueryFilters(req.query);
 *
 * let query = db.collection('tasks');
 * for (const filter of filters) {
 *   query = query.where(filter.field, filter.operator, filter.value);
 * }
 * ```
 */
export function parseQueryFilters(
  query: Record<string, unknown>
): ParsedFilter[] {
  const filters: ParsedFilter[] = [];

  for (const [key, value] of Object.entries(query)) {
    // Skip reserved pagination/sort params
    if (RESERVED_PARAMS.has(key)) continue;

    // Skip empty values
    if (value === undefined || value === null || value === '') continue;

    // Parse operator from key: field__operator → { field, operator }
    const match = key.match(/^(.+)__(\w+)$/);

    if (match) {
      const [, field, op] = match;
      const firestoreOp = OPERATOR_MAP[op];

      if (firestoreOp) {
        filters.push({
          field,
          operator: firestoreOp,
          value: parseValue(value, op),
        });
      } else {
        // Unknown operator - treat as field name with double underscore
        filters.push({
          field: key,
          operator: '==',
          value: parseValue(value, 'eq'),
        });
      }
    } else {
      // No operator suffix → equals
      filters.push({
        field: key,
        operator: '==',
        value: parseValue(value, 'eq'),
      });
    }
  }

  return filters;
}

/**
 * Parse and coerce value based on operator type
 */
function parseValue(value: unknown, operator: string): unknown {
  // Handle array values for 'in' operator
  if (operator === 'in' || operator === 'not_in' || operator === 'contains_any') {
    if (typeof value === 'string') {
      // Parse comma-separated values: "a,b,c" → ['a', 'b', 'c']
      return value.split(',').map(v => v.trim());
    }
    if (Array.isArray(value)) {
      return value;
    }
    return [value];
  }

  // Handle numeric values
  if (typeof value === 'string') {
    // Try to parse as number if it looks like one
    if (/^-?\d+(\.\d+)?$/.test(value)) {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        return num;
      }
    }

    // Handle boolean strings
    if (value === 'true') return true;
    if (value === 'false') return false;
  }

  return value;
}

/**
 * Build a Firestore query with filters applied.
 *
 * @param collection - Base Firestore collection reference or query
 * @param filters - Parsed filters from parseQueryFilters
 * @returns Query with all filters applied
 *
 * @example
 * ```typescript
 * const filters = parseQueryFilters(req.query);
 * const baseQuery = db.collection('tasks');
 * const filteredQuery = applyFiltersToQuery(baseQuery, filters);
 * const snapshot = await filteredQuery.get();
 * ```
 */
export function applyFiltersToQuery<T>(
  collection: FirebaseFirestore.Query<T>,
  filters: ParsedFilter[]
): FirebaseFirestore.Query<T> {
  let query = collection;

  for (const filter of filters) {
    query = query.where(
      filter.field,
      filter.operator as FirebaseFirestore.WhereFilterOp,
      filter.value
    );
  }

  return query;
}

/**
 * Extract pagination parameters from query
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder: 'asc' | 'desc';
}

export function extractPaginationParams(
  query: Record<string, unknown>,
  defaults: Partial<PaginationParams> = {}
): PaginationParams {
  return {
    page: parseInt(query.page as string, 10) || defaults.page || 1,
    pageSize: parseInt(query.pageSize as string, 10) || parseInt(query.limit as string, 10) || defaults.pageSize || 20,
    sortBy: (query.sortBy || query.orderBy) as string | undefined,
    sortOrder: ((query.sortOrder || query.orderDirection) as 'asc' | 'desc') || defaults.sortOrder || 'asc',
  };
}
