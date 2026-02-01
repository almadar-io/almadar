import { describe, it, expect } from 'vitest';
import type { GameState, GameStateInput } from '../../types/entities';
import { gameStateSchema, gameStateInputSchema } from '../../schemas/entities';

describe('GameState Entity', () => {
  describe('gameStateSchema', () => {
    it('should validate a complete entity', () => {
      const validGameState: GameState = {
        id: 'test-id',
        score: 42,
        lives: 42,
        level: 42,
        isPaused: false,
        isGameOver: false,
      };
      const result = gameStateSchema.safeParse(validGameState);
      expect(result.success).toBe(true);
    });

    it('should reject invalid entity (missing id)', () => {
      const invalid = { } as unknown as GameState;
      const result = gameStateSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('gameStateInputSchema', () => {
    it('should validate input for creation', () => {
      const input: GameStateInput = {
        score: 42,
        lives: 42,
        level: 42,
        isPaused: false,
        isGameOver: false,
      };
      const result = gameStateInputSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('type structure', () => {
    it('should have id field in schema', () => {
      expect(gameStateSchema.shape).toHaveProperty('id');
    });

    it('should have score field in schema', () => {
      expect(gameStateSchema.shape).toHaveProperty('score');
    });

    it('should have lives field in schema', () => {
      expect(gameStateSchema.shape).toHaveProperty('lives');
    });

    it('should have level field in schema', () => {
      expect(gameStateSchema.shape).toHaveProperty('level');
    });

    it('should have isPaused field in schema', () => {
      expect(gameStateSchema.shape).toHaveProperty('isPaused');
    });

    it('should have isGameOver field in schema', () => {
      expect(gameStateSchema.shape).toHaveProperty('isGameOver');
    });

  });
});
