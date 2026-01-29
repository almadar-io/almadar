/**
 * Data Management Behaviors
 *
 * Standard behaviors for data operations like pagination, selection,
 * sorting, filtering, and search.
 *
 * @packageDocumentation
 */

import type { StandardBehavior } from './types.js';

// ============================================================================
// std/Pagination - Page Navigation
// ============================================================================

/**
 * std/Pagination - Page navigation behavior for large data sets.
 */
export const PAGINATION_BEHAVIOR: StandardBehavior = {
  name: 'std/Pagination',
  category: 'data-management',
  description: 'Page-based navigation for large data sets',
  suggestedFor: [
    'Large lists',
    'Table pagination',
    'Infinite scroll alternative',
    'Data-heavy views',
  ],

  dataEntities: [
    {
      name: 'PaginationState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'page', type: 'number', default: 1 },
        { name: 'pageSize', type: 'number', default: 20 },
        { name: 'totalItems', type: 'number', default: 0 },
      ],
    },
  ],

  stateMachine: {
    initial: 'Active',
    states: [
      { name: 'Active', isInitial: true },
    ],
    events: [
      { key: 'INIT' },
      { key: 'NEXT_PAGE' },
      { key: 'PREV_PAGE' },
      { key: 'GO_TO_PAGE' },
      { key: 'SET_PAGE_SIZE' },
    ],
    transitions: [
      {
        from: '*',
        event: 'INIT',
        effects: [
          ['set', '@entity.page', 1],
          ['set', '@entity.pageSize', '@config.defaultPageSize'],
        ],
      },
      {
        event: 'NEXT_PAGE',
        guard: ['<', '@entity.page', ['math/ceil', ['/', '@entity.totalItems', '@entity.pageSize']]],
        effects: [
          ['set', '@entity.page', ['+', '@entity.page', 1]],
        ],
      },
      {
        event: 'PREV_PAGE',
        guard: ['>', '@entity.page', 1],
        effects: [
          ['set', '@entity.page', ['-', '@entity.page', 1]],
        ],
      },
      {
        event: 'GO_TO_PAGE',
        guard: ['and',
          ['>=', '@payload.page', 1],
          ['<=', '@payload.page', ['math/ceil', ['/', '@entity.totalItems', '@entity.pageSize']]]],
        effects: [
          ['set', '@entity.page', '@payload.page'],
        ],
      },
      {
        event: 'SET_PAGE_SIZE',
        effects: [
          ['set', '@entity.pageSize', '@payload.size'],
          ['set', '@entity.page', 1],
        ],
      },
    ],
  },

  configSchema: {
    required: [],
    optional: [
      { name: 'defaultPageSize', type: 'number', description: 'Default items per page', default: 20 },
      { name: 'pageSizeOptions', type: 'array', description: 'Available page sizes', default: [10, 20, 50, 100] },
    ],
  },
};

// ============================================================================
// std/Selection - Single/Multi Selection
// ============================================================================

export const SELECTION_BEHAVIOR: StandardBehavior = {
  name: 'std/Selection',
  category: 'data-management',
  description: 'Single or multi-selection management',
  suggestedFor: [
    'Multi-select lists',
    'Bulk operations',
    'Item picking',
    'Checkboxes in tables',
  ],

  dataEntities: [
    {
      name: 'SelectionState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'selected', type: 'array', default: [] },
        { name: 'lastSelected', type: 'string', default: null },
      ],
    },
  ],

  stateMachine: {
    initial: 'Active',
    states: [
      { name: 'Active', isInitial: true },
    ],
    events: [
      { key: 'INIT' },
      { key: 'SELECT' },
      { key: 'DESELECT' },
      { key: 'TOGGLE' },
      { key: 'SELECT_ALL' },
      { key: 'CLEAR' },
    ],
    transitions: [
      {
        from: '*',
        event: 'INIT',
        effects: [
          ['set', '@entity.selected', []],
          ['set', '@entity.lastSelected', null],
        ],
      },
      {
        event: 'SELECT',
        effects: [
          ['if', ['=', '@config.mode', 'single'],
            ['do',
              ['set', '@entity.selected', ['@payload.id']],
              ['set', '@entity.lastSelected', '@payload.id']],
            ['if', ['or',
              ['not', '@config.maxSelection'],
              ['<', ['array/len', '@entity.selected'], '@config.maxSelection']],
              ['do',
                ['set', '@entity.selected', ['array/append', '@entity.selected', '@payload.id']],
                ['set', '@entity.lastSelected', '@payload.id']],
              ['notify', { type: 'warning', message: 'Maximum selection reached' }]]],
        ],
      },
      {
        event: 'DESELECT',
        effects: [
          ['set', '@entity.selected', ['array/filter', '@entity.selected', ['fn', 'id', ['!=', '@id', '@payload.id']]]],
        ],
      },
      {
        event: 'TOGGLE',
        effects: [
          ['if', ['array/includes', '@entity.selected', '@payload.id'],
            ['set', '@entity.selected', ['array/filter', '@entity.selected', ['fn', 'id', ['!=', '@id', '@payload.id']]]],
            ['if', ['or', ['=', '@config.mode', 'single'], ['or',
              ['not', '@config.maxSelection'],
              ['<', ['array/len', '@entity.selected'], '@config.maxSelection']]],
              ['set', '@entity.selected',
                ['if', ['=', '@config.mode', 'single'],
                  ['@payload.id'],
                  ['array/append', '@entity.selected', '@payload.id']]],
              ['notify', { type: 'warning', message: 'Maximum selection reached' }]]],
        ],
      },
      {
        event: 'SELECT_ALL',
        guard: ['=', '@config.mode', 'multi'],
        effects: [
          ['set', '@entity.selected', '@payload.ids'],
        ],
      },
      {
        event: 'CLEAR',
        effects: [
          ['set', '@entity.selected', []],
          ['set', '@entity.lastSelected', null],
        ],
      },
    ],
  },

  configSchema: {
    required: [],
    optional: [
      { name: 'mode', type: 'string', description: 'Selection mode', default: 'single', enum: ['single', 'multi'] },
      { name: 'maxSelection', type: 'number', description: 'Maximum selections (multi mode)', default: null },
    ],
  },
};

// ============================================================================
// std/Sort - Sorting
// ============================================================================

export const SORT_BEHAVIOR: StandardBehavior = {
  name: 'std/Sort',
  category: 'data-management',
  description: 'Sorting by field with direction toggle',
  suggestedFor: [
    'Sortable tables',
    'List ordering',
    'Column headers',
  ],

  dataEntities: [
    {
      name: 'SortState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'sortField', type: 'string', default: null },
        { name: 'sortDirection', type: 'string', default: 'asc' },
      ],
    },
  ],

  stateMachine: {
    initial: 'Active',
    states: [
      { name: 'Active', isInitial: true },
    ],
    events: [
      { key: 'INIT' },
      { key: 'SORT' },
      { key: 'TOGGLE_DIRECTION' },
      { key: 'CLEAR_SORT' },
    ],
    transitions: [
      {
        from: '*',
        event: 'INIT',
        effects: [
          ['set', '@entity.sortField', '@config.defaultField'],
          ['set', '@entity.sortDirection', '@config.defaultDirection'],
        ],
      },
      {
        event: 'SORT',
        effects: [
          ['if', ['=', '@entity.sortField', '@payload.field'],
            ['set', '@entity.sortDirection', ['if', ['=', '@entity.sortDirection', 'asc'], 'desc', 'asc']],
            ['do',
              ['set', '@entity.sortField', '@payload.field'],
              ['set', '@entity.sortDirection', 'asc']]],
        ],
      },
      {
        event: 'TOGGLE_DIRECTION',
        guard: ['!=', '@entity.sortField', null],
        effects: [
          ['set', '@entity.sortDirection', ['if', ['=', '@entity.sortDirection', 'asc'], 'desc', 'asc']],
        ],
      },
      {
        event: 'CLEAR_SORT',
        effects: [
          ['set', '@entity.sortField', null],
          ['set', '@entity.sortDirection', 'asc'],
        ],
      },
    ],
  },

  configSchema: {
    required: [],
    optional: [
      { name: 'defaultField', type: 'string', description: 'Default sort field' },
      { name: 'defaultDirection', type: 'string', description: 'Default direction', default: 'asc', enum: ['asc', 'desc'] },
    ],
  },
};

// ============================================================================
// std/Filter - Query Singleton Pattern for Filtering
// ============================================================================

/**
 * std/Filter - Query Singleton pattern for explicit filtering.
 *
 * This behavior uses a singleton entity to hold filter state, making filtering
 * explicit in the schema rather than implicit in component behavior.
 *
 * The query singleton is referenced by patterns via the `query` prop:
 * ```json
 * { "type": "entity-table", "entity": "Task", "query": "@TaskQuery" }
 * ```
 */
export const FILTER_BEHAVIOR: StandardBehavior = {
  name: 'std/Filter',
  category: 'data-management',
  description: 'Query Singleton pattern for explicit filtering - use with entity-table query prop',
  suggestedFor: [
    'Filterable lists',
    'Advanced search',
    'Filter panels',
    'Faceted search',
    'Entity tables with filters',
  ],

  dataEntities: [
    {
      name: 'QueryState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'status', type: 'string', default: null, description: 'Filter by status field' },
        { name: 'priority', type: 'string', default: null, description: 'Filter by priority field' },
        { name: 'search', type: 'string', default: '', description: 'Search term' },
        { name: 'sortBy', type: 'string', default: 'createdAt', description: 'Sort field' },
        { name: 'sortOrder', type: 'string', default: 'desc', description: 'Sort direction: asc or desc' },
      ],
    },
  ],

  stateMachine: {
    initial: 'Active',
    states: [
      { name: 'Active', isInitial: true },
    ],
    events: [
      { key: 'INIT' },
      { key: 'FILTER' },
      { key: 'SEARCH' },
      { key: 'SORT' },
      { key: 'CLEAR_FILTERS' },
    ],
    transitions: [
      {
        from: '*',
        event: 'INIT',
        effects: [
          // Render filter UI with query reference
          ['render-ui', 'sidebar', {
            type: 'filter-group',
            query: '@QueryState',
            filters: '@config.filters',
          }],
          // Render entity table with query reference
          ['render-ui', 'main', {
            type: 'entity-table',
            entity: '@config.entity',
            query: '@QueryState',
            columns: '@config.columns',
          }],
        ],
      },
      {
        event: 'FILTER',
        effects: [
          ['set', '@QueryState.status', '@payload.status'],
          ['set', '@QueryState.priority', '@payload.priority'],
        ],
      },
      {
        event: 'SEARCH',
        effects: [
          ['set', '@QueryState.search', '@payload.searchTerm'],
        ],
      },
      {
        event: 'SORT',
        effects: [
          ['set', '@QueryState.sortBy', '@payload.field'],
          ['set', '@QueryState.sortOrder', '@payload.order'],
        ],
      },
      {
        event: 'CLEAR_FILTERS',
        effects: [
          ['set', '@QueryState.status', null],
          ['set', '@QueryState.priority', null],
          ['set', '@QueryState.search', ''],
        ],
      },
    ],
  },

  configSchema: {
    required: [
      { name: 'entity', type: 'string', description: 'Entity to filter' },
    ],
    optional: [
      { name: 'filters', type: 'array', description: 'Filter field definitions', default: [] },
      { name: 'columns', type: 'array', description: 'Table columns to display', default: [] },
    ],
  },
};

// ============================================================================
// std/Search - Search with Debounce
// ============================================================================

/**
 * std/Search - Search with debounce.
 *
 * Uses a singleton to hold search state. Can be combined with std/Filter
 * for full query singleton functionality, or used standalone.
 */
export const SEARCH_BEHAVIOR: StandardBehavior = {
  name: 'std/Search',
  category: 'data-management',
  description: 'Search with debounce - updates QueryState.search field',
  suggestedFor: [
    'Search inputs',
    'Quick filters',
    'Global search',
    'Type-ahead',
  ],

  dataEntities: [
    {
      name: 'SearchState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'search', type: 'string', default: '' },
        { name: 'isSearching', type: 'boolean', default: false },
      ],
    },
  ],

  stateMachine: {
    initial: 'Idle',
    states: [
      { name: 'Idle', isInitial: true },
      { name: 'Searching' },
    ],
    events: [
      { key: 'INIT' },
      { key: 'SEARCH' },
      { key: 'CLEAR_SEARCH' },
      { key: 'SEARCH_COMPLETE' },
    ],
    transitions: [
      {
        from: '*',
        event: 'INIT',
        effects: [
          ['set', '@entity.search', ''],
          ['set', '@entity.isSearching', false],
          ['render-ui', 'main', {
            type: 'search-bar',
            query: '@SearchState',
            placeholder: '@config.placeholder',
          }],
        ],
      },
      {
        from: 'Idle',
        to: 'Searching',
        event: 'SEARCH',
        guard: ['>=', ['str/len', '@payload.term'], '@config.minLength'],
        effects: [
          ['set', '@entity.search', '@payload.term'],
          ['set', '@entity.isSearching', true],
          ['async/debounce', '@config.debounceMs', ['emit', 'SEARCH_COMPLETE']],
        ],
      },
      {
        from: 'Idle',
        event: 'SEARCH',
        guard: ['<', ['str/len', '@payload.term'], '@config.minLength'],
        effects: [
          ['set', '@entity.search', '@payload.term'],
        ],
      },
      {
        from: 'Searching',
        to: 'Idle',
        event: 'SEARCH_COMPLETE',
        effects: [
          ['set', '@entity.isSearching', false],
        ],
      },
      {
        event: 'CLEAR_SEARCH',
        effects: [
          ['set', '@entity.search', ''],
          ['set', '@entity.isSearching', false],
        ],
      },
    ],
  },

  configSchema: {
    required: [],
    optional: [
      { name: 'debounceMs', type: 'number', description: 'Debounce delay in ms', default: 300 },
      { name: 'minLength', type: 'number', description: 'Minimum search length', default: 1 },
      { name: 'placeholder', type: 'string', description: 'Input placeholder', default: 'Search...' },
    ],
  },
};

// ============================================================================
// Export All Data Management Behaviors
// ============================================================================

export const DATA_MANAGEMENT_BEHAVIORS: StandardBehavior[] = [
  PAGINATION_BEHAVIOR,
  SELECTION_BEHAVIOR,
  SORT_BEHAVIOR,
  FILTER_BEHAVIOR,
  SEARCH_BEHAVIOR,
];
