import { describe, it, expect } from 'vitest';
import type { WizardData, WizardDataInput } from '../../types/entities';
import { wizardDataSchema, wizardDataInputSchema } from '../../schemas/entities';

describe('WizardData Entity', () => {
  describe('wizardDataSchema', () => {
    it('should validate a complete entity', () => {
      const validWizardData: WizardData = {
        id: 'test-id',
        step1Data: 'test-value',
        step2Data: 'test-value',
        step3Data: 'test-value',
        currentStep: 42,
      };
      const result = wizardDataSchema.safeParse(validWizardData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid entity (missing id)', () => {
      const invalid = { } as unknown as WizardData;
      const result = wizardDataSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('wizardDataInputSchema', () => {
    it('should validate input for creation', () => {
      const input: WizardDataInput = {
        step1Data: 'test-value',
        step2Data: 'test-value',
        step3Data: 'test-value',
        currentStep: 42,
      };
      const result = wizardDataInputSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('type structure', () => {
    it('should have id field in schema', () => {
      expect(wizardDataSchema.shape).toHaveProperty('id');
    });

    it('should have step1Data field in schema', () => {
      expect(wizardDataSchema.shape).toHaveProperty('step1Data');
    });

    it('should have step2Data field in schema', () => {
      expect(wizardDataSchema.shape).toHaveProperty('step2Data');
    });

    it('should have step3Data field in schema', () => {
      expect(wizardDataSchema.shape).toHaveProperty('step3Data');
    });

    it('should have currentStep field in schema', () => {
      expect(wizardDataSchema.shape).toHaveProperty('currentStep');
    });

  });
});
