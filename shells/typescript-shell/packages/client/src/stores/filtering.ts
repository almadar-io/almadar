/**
 * Entity Filtering Utilities
 *
 * Provides filter types and utility functions for filtering entity records.
 * Used by EntityStore and can be imported by runtime preview.
 */

// ============================================================================
// Types
// ============================================================================

/** Filter value for a single field (entity filtering) */
export interface EntityFilterValue {
    /** The field key (may include suffix like _from, _to for date ranges) */
    field: string;
    /** The actual record field to compare against (defaults to field if not specified) */
    targetField?: string;
    value: unknown;
    /** Comparison operator for filtering
     * - eq: exact match (default)
     * - contains: substring match for strings
     * - in: value is in array
     * - date_eq: same date (ignoring time)
     * - date_gte: on or after date
     * - date_lte: on or before date
     */
    operator?: FilterOperator;
}

/** Operator type for filter */
export type FilterOperator = 'eq' | 'contains' | 'in' | 'date_eq' | 'date_gte' | 'date_lte' | 'search';

/** Filter state for an entity - Map of field key to filter value */
export type EntityFilters = Map<string, EntityFilterValue>;

/** Record type that can be filtered */
export interface FilterableRecord {
    id: string;
    [key: string]: unknown;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Extract date part from ISO string or Date object.
 * Returns format: "YYYY-MM-DD"
 */
export function getDateString(value: unknown): string | null {
    if (!value) return null;
    if (typeof value === 'string') {
        // Handle ISO dates "2024-01-15T00:00:00.000Z" -> "2024-01-15"
        // Also handle plain date strings "2024-01-15"
        const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
        return match ? match[1] : null;
    }
    if (value instanceof Date) {
        return value.toISOString().split('T')[0];
    }
    return null;
}

/**
 * Apply a single filter to check if a record matches.
 * Returns true if the record passes the filter.
 */
export function matchesFilter(record: FilterableRecord, filter: EntityFilterValue): boolean {
    // Use targetField if specified, otherwise fall back to field
    const fieldToCompare = filter.targetField || filter.field;
    const recordValue = record[fieldToCompare];
    const filterValue = filter.value;
    const operator = filter.operator || 'eq';

    // Skip if filter value is null/undefined/empty (means "all")
    if (filterValue === null || filterValue === undefined || filterValue === '') {
        return true;
    }

    switch (operator) {
        case 'eq':
            // Case-insensitive comparison for strings
            if (typeof recordValue === 'string' && typeof filterValue === 'string') {
                return recordValue.toLowerCase() === filterValue.toLowerCase();
            }
            return recordValue === filterValue;

        case 'contains':
            if (typeof recordValue !== 'string') return false;
            return recordValue.toLowerCase().includes(String(filterValue).toLowerCase());

        case 'in':
            if (Array.isArray(filterValue)) {
                // Case-insensitive for string arrays
                const normalizedFilterValues = filterValue.map(v =>
                    typeof v === 'string' ? v.toLowerCase() : v
                );
                const normalizedRecordValue = typeof recordValue === 'string'
                    ? recordValue.toLowerCase()
                    : recordValue;
                return normalizedFilterValues.includes(normalizedRecordValue);
            }
            return false;

        case 'date_eq': {
            // Compare dates ignoring time
            const recordDate = getDateString(recordValue);
            const filterDate = getDateString(filterValue);
            return Boolean(recordDate && filterDate && recordDate === filterDate);
        }

        case 'date_gte': {
            // Record date >= filter date
            const recordDate = getDateString(recordValue);
            const filterDate = getDateString(filterValue);
            return Boolean(recordDate && filterDate && recordDate >= filterDate);
        }

        case 'date_lte': {
            // Record date <= filter date
            const recordDate = getDateString(recordValue);
            const filterDate = getDateString(filterValue);
            return Boolean(recordDate && filterDate && recordDate <= filterDate);
        }

        case 'search': {
            // Search across ALL string/number fields in the record
            // The filterValue is the search term, recordValue is ignored
            // We search all fields, not just the targetField
            if (typeof filterValue !== 'string' || !filterValue.trim()) {
                return true; // Empty search matches all
            }
            const searchTerm = filterValue.toLowerCase();
            return Object.values(record).some((value) => {
                if (value === null || value === undefined) return false;
                return String(value).toLowerCase().includes(searchTerm);
            });
        }

        default:
            return true;
    }
}

/**
 * Apply all filters to a list of records.
 * Returns only records that match ALL filters.
 */
export function applyFilters<T extends FilterableRecord>(
    records: T[],
    entityFilters: EntityFilters
): T[] {
    if (entityFilters.size === 0) return records;

    return records.filter(record => {
        for (const [, filter] of entityFilters) {
            if (!matchesFilter(record, filter)) {
                return false;
            }
        }
        return true;
    });
}

/**
 * Create a filter value with proper defaults.
 */
export function createFilter(
    field: string,
    value: unknown,
    operator: FilterOperator = 'eq',
    targetField?: string
): EntityFilterValue {
    return {
        field,
        value,
        operator,
        targetField: targetField || field
    };
}
