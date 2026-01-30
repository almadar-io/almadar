import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock Firebase before any imports that might use it
vi.mock('@/config/firebase', () => ({
  app: {},
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn((callback) => {
      callback(null);
      return vi.fn();
    }),
    signInWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
  },
  db: {},
  default: {},
  // Preview mode flag - true in tests to use mock data
  isPreviewMode: true,
}));

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserverMock;

// Mock HTMLCanvasElement.prototype.getContext for game/canvas tests
// jsdom doesn't implement canvas context, so we provide a mock
// We use vi.spyOn to ensure the mock is applied even with jsdom's class hierarchy
const mockGetContext = vi.fn(function (
  this: HTMLCanvasElement,
  contextId: string
) {
  if (contextId === '2d') {
    return {
      // Canvas 2D context mock - covers common methods used in games
      canvas: this,
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 1,
      font: '10px sans-serif',
      textAlign: 'start',
      textBaseline: 'alphabetic',
      globalAlpha: 1,
      globalCompositeOperation: 'source-over',
      imageSmoothingEnabled: true,

      // Drawing methods (no-op for tests)
      fillRect: vi.fn(),
      strokeRect: vi.fn(),
      clearRect: vi.fn(),
      fillText: vi.fn(),
      strokeText: vi.fn(),
      measureText: vi.fn((text: string) => ({ width: text.length * 8 })),

      // Path methods
      beginPath: vi.fn(),
      closePath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      arc: vi.fn(),
      arcTo: vi.fn(),
      rect: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      clip: vi.fn(),

      // Transformation methods
      save: vi.fn(),
      restore: vi.fn(),
      scale: vi.fn(),
      rotate: vi.fn(),
      translate: vi.fn(),
      transform: vi.fn(),
      setTransform: vi.fn(),
      resetTransform: vi.fn(),

      // Image methods
      drawImage: vi.fn(),
      createImageData: vi.fn(() => ({ width: 0, height: 0, data: new Uint8ClampedArray() })),
      getImageData: vi.fn(() => ({ width: 0, height: 0, data: new Uint8ClampedArray() })),
      putImageData: vi.fn(),

      // Gradient and pattern
      createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
      createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
      createPattern: vi.fn(() => null),

      // Other
      isPointInPath: vi.fn(() => false),
      isPointInStroke: vi.fn(() => false),
    } as unknown as CanvasRenderingContext2D;
  }
  return null;
});

// Apply mock using multiple strategies to ensure it works with jsdom
// Strategy 1: Direct prototype assignment
HTMLCanvasElement.prototype.getContext = mockGetContext as typeof HTMLCanvasElement.prototype.getContext;

// Strategy 2: Use spyOn if available (more robust for jsdom)
vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(mockGetContext);
