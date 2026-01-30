# Shell Integrators Development Guide

> Guide for implementing new service integrators in the KFlow shell.

---

## Overview

Integrators are the shell-side implementation of service traits. They handle external API calls and emit events back to the trait state machine via the event bus, completing the "closed circuit" pattern.

```
Trait (call_service) → Integrator (execute) → External API → EventBus (emit)
```

---

## Architecture

### The ServiceIntegrator Interface

Every integrator must implement the `ServiceIntegrator` interface:

```typescript
interface ServiceIntegrator {
  name: string;
  description: string;
  actions: IntegratorAction[];
  execute(
    action: string,
    params: Record<string, unknown>,
    eventBus: EventBus,
    callbacks: { onSuccess: string; onError: string }
  ): Promise<void>;
}
```

### The EventBus Interface

Integrators emit events back to the trait state machine:

```typescript
interface EventBus {
  emit(event: string, payload?: unknown): void;
}
```

---

## Creating a New Integrator

### Step 1: Add Metadata (Shared Package)

First, add your integrator to the metadata in `packages/shared/src/integrators/integrator-library.ts`:

```typescript
export const INTEGRATOR_METADATA: Record<string, IntegratorMeta> = {
  // ... existing integrators

  weather: {
    name: 'weather',
    description: 'Weather API - get forecasts and current conditions',
    category: 'custom',
    actions: [
      {
        name: 'getCurrentWeather',
        description: 'Get current weather for a location',
        params: [
          { name: 'location', type: 'string', required: true, description: 'City name or coordinates' },
        ],
        responseShape: { temp: 'number', conditions: 'string', humidity: 'number' },
      },
      {
        name: 'getForecast',
        description: 'Get 5-day forecast',
        params: [
          { name: 'location', type: 'string', required: true },
          { name: 'days', type: 'number', required: false },
        ],
        responseShape: { days: 'array' },
      },
    ],
  },
};
```

### Step 2: Add Compiler Mapping

Add the mapping in `packages/compiler/src/v2/generators/services/ServiceToIntegrator.ts`:

```typescript
export const SERVICE_TO_INTEGRATOR: Record<string, IntegratorMapping> = {
  // ... existing mappings

  weather: {
    integrator: 'weatherIntegrator',
    importPath: '@/integrators/weather',
  },
};
```

### Step 3: Implement the Integrator (Shell)

Create the implementation file in `shell/packages/server/src/integrators/`:

```typescript
// weather.ts
import { ServiceIntegrator, EventBus, IntegratorAction } from './types.js';

const API_BASE = 'https://api.weather.example.com/v1';
const API_KEY = process.env.WEATHER_API_KEY;

export const weatherIntegrator: ServiceIntegrator = {
  name: 'weather',
  description: 'Weather API - get forecasts and current conditions',

  actions: [
    {
      name: 'getCurrentWeather',
      description: 'Get current weather for a location',
      params: [
        { name: 'location', type: 'string', required: true },
      ],
    },
    {
      name: 'getForecast',
      description: 'Get 5-day forecast',
      params: [
        { name: 'location', type: 'string', required: true },
        { name: 'days', type: 'number', required: false },
      ],
    },
  ],

  async execute(
    action: string,
    params: Record<string, unknown>,
    eventBus: EventBus,
    callbacks: { onSuccess: string; onError: string }
  ): Promise<void> {
    try {
      let result: unknown;

      switch (action) {
        case 'getCurrentWeather':
          result = await getCurrentWeather(params.location as string);
          break;
        case 'getForecast':
          result = await getForecast(params.location as string, params.days as number);
          break;
        default:
          throw new Error(`Unknown action: ${action}`);
      }

      // Emit success event back to trait state machine
      eventBus.emit(callbacks.onSuccess, result);
    } catch (error) {
      // Emit error event back to trait state machine
      eventBus.emit(callbacks.onError, {
        code: 'WEATHER_API_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error',
        action,
      });
    }
  },
};

// Private helper functions
async function getCurrentWeather(location: string): Promise<object> {
  const response = await fetch(`${API_BASE}/current?q=${encodeURIComponent(location)}&key=${API_KEY}`);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

async function getForecast(location: string, days = 5): Promise<object> {
  const response = await fetch(`${API_BASE}/forecast?q=${encodeURIComponent(location)}&days=${days}&key=${API_KEY}`);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}
```

### Step 4: Register the Integrator

Add the integrator to `shell/packages/server/src/integrators/index.ts`:

```typescript
export { youtubeIntegrator } from './youtube.js';
export { weatherIntegrator } from './weather.js';
// Export new integrators here
```

And register it in `registry.ts`:

```typescript
import { weatherIntegrator } from './weather.js';

// In the registration section:
registry.register(weatherIntegrator);
```

### Step 5: Add Environment Variable

Add the required API key to `.env.example`:

```bash
WEATHER_API_KEY=your-api-key-here
```

---

## Best Practices

### Error Handling

Always emit error events with structured payloads:

```typescript
eventBus.emit(callbacks.onError, {
  code: 'SPECIFIC_ERROR_CODE',    // Machine-readable code
  message: 'Human-readable message',  // User-friendly message
  action,                         // Which action failed
  details: { ... },               // Optional debugging info
});
```

### Retry Logic

For transient failures, implement retry with exponential backoff:

```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  baseDelay = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      await sleep(baseDelay * Math.pow(2, attempt - 1));
    }
  }
  throw new Error('Unreachable');
}
```

### Timeout Handling

Always set timeouts for external API calls:

```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

try {
  const response = await fetch(url, { signal: controller.signal });
  // ...
} finally {
  clearTimeout(timeout);
}
```

### Validation

Validate required parameters before making API calls:

```typescript
if (!params.location) {
  eventBus.emit(callbacks.onError, {
    code: 'MISSING_PARAMETER',
    message: 'Location is required',
    action,
  });
  return;
}
```

---

## Testing

### Unit Tests

Create `__tests__/{integrator}.test.ts` with mocked API responses:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { weatherIntegrator } from '../weather.js';

describe('weatherIntegrator', () => {
  it('should emit success on valid response', async () => {
    const mockEventBus = { emit: vi.fn() };
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ temp: 72 }),
    });
    global.fetch = mockFetch;

    await weatherIntegrator.execute(
      'getCurrentWeather',
      { location: 'San Francisco' },
      mockEventBus,
      { onSuccess: 'WEATHER_LOADED', onError: 'WEATHER_FAILED' }
    );

    expect(mockEventBus.emit).toHaveBeenCalledWith('WEATHER_LOADED', { temp: 72 });
  });
});
```

### Closed-Circuit Tests

Test the event flow pattern:

```typescript
describe('closed-circuit pattern', () => {
  it('should complete the circuit on success', async () => {
    const events: string[] = [];
    const eventBus = { emit: (e: string) => events.push(e) };

    await weatherIntegrator.execute(
      'getCurrentWeather',
      { location: 'NYC' },
      eventBus,
      { onSuccess: 'WEATHER_LOADED', onError: 'WEATHER_FAILED' }
    );

    expect(events).toContain('WEATHER_LOADED');
    expect(events).not.toContain('WEATHER_FAILED');
  });
});
```

---

## Existing Integrators

| Integrator | File | Actions |
|------------|------|---------|
| YouTube | `youtube.ts` | `search`, `getVideo`, `getChannel` |

---

## File Structure

```
shell/packages/server/src/integrators/
├── INTEGRATORS.md          # This guide
├── types.ts                # ServiceIntegrator, EventBus interfaces
├── registry.ts             # Integrator registration and lookup
├── index.ts                # Exports
├── youtube.ts              # YouTube Data API integrator
├── __tests__/
│   ├── types.test.ts
│   ├── registry.test.ts
│   └── youtube.test.ts
```
