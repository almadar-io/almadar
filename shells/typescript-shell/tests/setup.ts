/**
 * Vitest test setup
 */

import '@testing-library/jest-dom';

// Mock window.crypto for UUID generation
if (typeof window !== 'undefined' && !window.crypto) {
  Object.defineProperty(window, 'crypto', {
    value: {
      randomUUID: () => `test-uuid-${Math.random().toString(36).slice(2)}`,
    },
  });
}

// Mock fetch
global.fetch = vi.fn();

// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks();
});
