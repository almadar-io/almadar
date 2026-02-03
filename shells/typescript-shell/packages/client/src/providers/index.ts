/**
 * Providers barrel export
 *
 * Unified providers for Almadar applications.
 * Use OrbitalProvider for most cases - it combines all required providers.
 */

// Main unified provider
export { OrbitalProvider, type OrbitalProviderProps } from './OrbitalProvider';

// Individual providers (for advanced use cases)
export { EventBusProvider, EventBusContext } from './EventBusProvider';
export { SelectionProvider, SelectionContext, useSelection, useSelectionOptional } from './SelectionProvider';
export type { SelectionContextType } from './SelectionProvider';

export {
  FetchedDataProvider,
  FetchedDataContext,
  useFetchedDataContext,
  useFetchedData,
  useFetchedEntity,
} from './FetchedDataProvider';
export type {
  FetchedDataProviderProps,
  FetchedDataContextValue,
  FetchedDataState,
  EntityRecord,
} from './FetchedDataProvider';

// Note: EventBusContextType is exported from hooks/event-bus-types to avoid duplicate exports
// Note: ThemeProvider and UISlotProvider are exported from context/ directory
