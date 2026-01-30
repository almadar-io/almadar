/**
 * Event Contracts Types Tests
 *
 * Tests for the type-safe event contract system in shell components.
 *
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest';
import {
  createTypedDispatch,
  FORM_EVENT_CONTRACT,
  DATA_TABLE_EVENT_CONTRACT,
  CARD_GRID_EVENT_CONTRACT,
  SEARCH_INPUT_EVENT_CONTRACT,
  MODAL_SLOT_EVENT_CONTRACT,
  DRAWER_SLOT_EVENT_CONTRACT,
  type ComponentEventContract,
  type TypedDispatch,
  type UIEventPayloads,
} from '../event-contracts';

describe('Event Contract Types', () => {
  describe('Component Event Contracts', () => {
    it('FORM_EVENT_CONTRACT should require SAVE and CANCEL', () => {
      expect(FORM_EVENT_CONTRACT.requires).toContain('SAVE');
      expect(FORM_EVENT_CONTRACT.requires).toContain('CANCEL');
      expect(FORM_EVENT_CONTRACT.entityAware).toBe(true);
    });

    it('FORM_EVENT_CONTRACT should emit SAVE and CANCEL events', () => {
      const emittedEvents = FORM_EVENT_CONTRACT.emits.map(e => e.event);
      expect(emittedEvents).toContain('SAVE');
      expect(emittedEvents).toContain('CANCEL');
    });

    it('DATA_TABLE_EVENT_CONTRACT should be config-driven', () => {
      expect(DATA_TABLE_EVENT_CONTRACT.configDriven).toBe(true);
      expect(DATA_TABLE_EVENT_CONTRACT.entityAware).toBe(true);
      // Should not require any events (events come from itemActions)
      expect(DATA_TABLE_EVENT_CONTRACT.requires).toHaveLength(0);
    });

    it('DATA_TABLE_EVENT_CONTRACT should emit optional VIEW/SELECT/EDIT/DELETE', () => {
      const emits = DATA_TABLE_EVENT_CONTRACT.emits;
      expect(emits.every(e => e.optional)).toBe(true);

      const emittedEvents = emits.map(e => e.event);
      expect(emittedEvents).toContain('VIEW');
      expect(emittedEvents).toContain('SELECT');
      expect(emittedEvents).toContain('EDIT');
      expect(emittedEvents).toContain('DELETE');
    });

    it('CARD_GRID_EVENT_CONTRACT should be entity-aware', () => {
      expect(CARD_GRID_EVENT_CONTRACT.entityAware).toBe(true);
      expect(CARD_GRID_EVENT_CONTRACT.configDriven).toBe(true);
    });

    it('SEARCH_INPUT_EVENT_CONTRACT should not require trait handling', () => {
      expect(SEARCH_INPUT_EVENT_CONTRACT.requires).toHaveLength(0);

      const emittedEvents = SEARCH_INPUT_EVENT_CONTRACT.emits.map(e => e.event);
      expect(emittedEvents).toContain('SEARCH');
      expect(emittedEvents).toContain('CLEAR_SEARCH');
    });

    it('MODAL_SLOT_EVENT_CONTRACT should require CLOSE', () => {
      expect(MODAL_SLOT_EVENT_CONTRACT.requires).toContain('CLOSE');
    });

    it('DRAWER_SLOT_EVENT_CONTRACT should require CLOSE', () => {
      expect(DRAWER_SLOT_EVENT_CONTRACT.requires).toContain('CLOSE');
    });
  });

  describe('createTypedDispatch', () => {
    it('should create a typed dispatch function', () => {
      type TestEvents = 'SAVE' | 'CANCEL' | 'VIEW';
      const events: readonly TestEvents[] = ['SAVE', 'CANCEL', 'VIEW'];
      const mockRawDispatch = vi.fn();

      const dispatch: TypedDispatch<TestEvents> = createTypedDispatch(events, mockRawDispatch);

      dispatch('SAVE', { data: {} });
      expect(mockRawDispatch).toHaveBeenCalledWith('SAVE', { data: {} });

      dispatch('CANCEL');
      expect(mockRawDispatch).toHaveBeenCalledWith('CANCEL', undefined);

      dispatch('VIEW', { row: { id: 1 } });
      expect(mockRawDispatch).toHaveBeenCalledWith('VIEW', { row: { id: 1 } });
    });

    it('should warn on unknown events in development', () => {
      type TestEvents = 'SAVE' | 'CANCEL';
      const events: readonly TestEvents[] = ['SAVE', 'CANCEL'];
      const mockRawDispatch = vi.fn();
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Save original NODE_ENV
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const dispatch = createTypedDispatch(events, mockRawDispatch);

      // Dispatch unknown event (type casting to bypass TypeScript)
      (dispatch as (event: string, payload?: Record<string, unknown>) => void)('UNKNOWN');

      // Should not call raw dispatch
      expect(mockRawDispatch).not.toHaveBeenCalled();

      // Should warn in development
      expect(consoleWarnSpy).toHaveBeenCalled();

      // Restore
      process.env.NODE_ENV = originalEnv;
      consoleWarnSpy.mockRestore();
    });

    it('should not call raw dispatch for unknown events', () => {
      type TestEvents = 'SAVE';
      const events: readonly TestEvents[] = ['SAVE'];
      const mockRawDispatch = vi.fn();
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const dispatch = createTypedDispatch(events, mockRawDispatch);

      // Type cast to bypass TypeScript for testing
      (dispatch as (event: string, payload?: Record<string, unknown>) => void)('INVALID');

      expect(mockRawDispatch).not.toHaveBeenCalled();
      consoleWarnSpy.mockRestore();
    });
  });

  describe('UIEventPayloads type safety', () => {
    it('should have correct payload types for form events', () => {
      // These are type-level checks - if they compile, the types are correct
      const savePayload: UIEventPayloads['UI:SAVE'] = { data: {}, entity: 'Test' };
      const submitPayload: UIEventPayloads['UI:SUBMIT'] = { data: { name: 'test' } };

      expect(savePayload.data).toBeDefined();
      expect(submitPayload.data).toBeDefined();
    });

    it('should have correct payload types for entity events', () => {
      const viewPayload: UIEventPayloads['UI:VIEW'] = { row: { id: 1 }, entity: 'User' };
      const selectPayload: UIEventPayloads['UI:SELECT'] = { row: { id: 2 } };
      const editPayload: UIEventPayloads['UI:EDIT'] = { row: { id: 3 }, entity: 'Order' };
      const deletePayload: UIEventPayloads['UI:DELETE'] = { row: { id: 4 } };

      expect(viewPayload.row).toBeDefined();
      expect(selectPayload.row).toBeDefined();
      expect(editPayload.row).toBeDefined();
      expect(deletePayload.row).toBeDefined();
    });

    it('should have correct payload types for search events', () => {
      const searchPayload: UIEventPayloads['UI:SEARCH'] = { searchTerm: 'test' };
      expect(searchPayload.searchTerm).toBe('test');
    });

    it('should have correct payload type for status events', () => {
      const statusPayload: UIEventPayloads['UI:UPDATE_STATUS'] = {
        row: { id: 1 },
        status: 'completed',
        entity: 'Order',
      };
      expect(statusPayload.status).toBe('completed');
    });
  });

  describe('ComponentEventContract interface', () => {
    it('should allow creating custom contracts', () => {
      const customContract: ComponentEventContract = {
        emits: [
          { event: 'CUSTOM_ACTION', trigger: 'click', payload: { type: 'void' } },
        ],
        requires: ['CUSTOM_ACTION'],
        entityAware: false,
        configDriven: false,
      };

      expect(customContract.emits).toHaveLength(1);
      expect(customContract.requires).toContain('CUSTOM_ACTION');
    });

    it('should support optional events', () => {
      const contractWithOptional: ComponentEventContract = {
        emits: [
          { event: 'REQUIRED', trigger: 'click', payload: { type: 'void' } },
          { event: 'OPTIONAL', trigger: 'click', payload: { type: 'void' }, optional: true },
        ],
        requires: ['REQUIRED'],
      };

      const requiredEvent = contractWithOptional.emits.find(e => e.event === 'REQUIRED');
      const optionalEvent = contractWithOptional.emits.find(e => e.event === 'OPTIONAL');

      expect(requiredEvent?.optional).toBeUndefined();
      expect(optionalEvent?.optional).toBe(true);
    });
  });
});
