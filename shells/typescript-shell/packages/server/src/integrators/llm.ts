/**
 * LLM Service Integrator
 *
 * Implements ServiceIntegrator for LLM operations using LangChain.
 * Supports generate, classify, extract, and summarize actions.
 * Works with Anthropic Claude and OpenAI models.
 *
 * @packageDocumentation
 */

import type {
  ServiceIntegrator,
  EventBus,
  IntegratorCallbacks,
  IntegratorError,
  ExecutionContext,
} from './types.js';

// ============================================================================
// Configuration
// ============================================================================

const DEFAULT_MODEL = 'claude-sonnet-4-5-20250929';
const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_MAX_TOKENS = 1024;
const DEFAULT_TIMEOUT = 60000; // 60 seconds (LLM calls can be slow)

/**
 * Get API key from environment based on model provider.
 */
function getApiKey(model: string): { key: string; provider: 'anthropic' | 'openai' } | undefined {
  if (model.startsWith('claude') || model.startsWith('anthropic')) {
    const key = process.env.ANTHROPIC_API_KEY;
    if (key) return { key, provider: 'anthropic' };
  }

  if (model.startsWith('gpt') || model.startsWith('o1') || model.startsWith('openai')) {
    const key = process.env.OPENAI_API_KEY;
    if (key) return { key, provider: 'openai' };
  }

  // Fallback: try Anthropic first, then OpenAI
  if (process.env.ANTHROPIC_API_KEY) {
    return { key: process.env.ANTHROPIC_API_KEY, provider: 'anthropic' };
  }
  if (process.env.OPENAI_API_KEY) {
    return { key: process.env.OPENAI_API_KEY, provider: 'openai' };
  }

  return undefined;
}

// ============================================================================
// LLM Request Helpers
// ============================================================================

interface LLMResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * Call Anthropic Claude API directly (without LangChain for simplicity).
 */
async function callAnthropic(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    timeout?: number;
  }
): Promise<LLMResponse> {
  const model = options.model || DEFAULT_MODEL;
  const temperature = options.temperature ?? DEFAULT_TEMPERATURE;
  const maxTokens = options.maxTokens ?? DEFAULT_MAX_TOKENS;
  const timeout = options.timeout ?? DEFAULT_TIMEOUT;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        temperature,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || '';

    return {
      content,
      usage: data.usage
        ? {
            promptTokens: data.usage.input_tokens,
            completionTokens: data.usage.output_tokens,
            totalTokens: data.usage.input_tokens + data.usage.output_tokens,
          }
        : undefined,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Call OpenAI API directly.
 */
async function callOpenAI(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    timeout?: number;
  }
): Promise<LLMResponse> {
  const model = options.model || 'gpt-4o';
  const temperature = options.temperature ?? DEFAULT_TEMPERATURE;
  const maxTokens = options.maxTokens ?? DEFAULT_MAX_TOKENS;
  const timeout = options.timeout ?? DEFAULT_TIMEOUT;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        temperature,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    return {
      content,
      usage: data.usage
        ? {
            promptTokens: data.usage.prompt_tokens,
            completionTokens: data.usage.completion_tokens,
            totalTokens: data.usage.total_tokens,
          }
        : undefined,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Unified LLM call that routes to appropriate provider.
 */
async function callLLM(
  systemPrompt: string,
  userPrompt: string,
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    timeout?: number;
  } = {}
): Promise<LLMResponse> {
  const model = options.model || DEFAULT_MODEL;
  const credentials = getApiKey(model);

  if (!credentials) {
    throw new Error('No LLM API key configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY.');
  }

  if (credentials.provider === 'anthropic') {
    return callAnthropic(credentials.key, systemPrompt, userPrompt, options);
  } else {
    return callOpenAI(credentials.key, systemPrompt, userPrompt, options);
  }
}

// ============================================================================
// Action Implementations
// ============================================================================

/**
 * Generate content from a prompt.
 */
async function handleGenerate(
  params: Record<string, unknown>,
  eventBus: EventBus,
  callbacks: IntegratorCallbacks,
  context?: ExecutionContext
): Promise<void> {
  const systemPrompt = (params.systemPrompt as string) || 'You are a helpful assistant.';
  const userPrompt = params.userPrompt as string;

  if (!userPrompt) {
    const error: IntegratorError = {
      code: 'INVALID_PARAMS',
      message: 'userPrompt is required',
    };
    eventBus.emit(callbacks.onError, error);
    return;
  }

  try {
    const result = await callLLM(systemPrompt, userPrompt, {
      model: params.model as string | undefined,
      temperature: params.temperature as number | undefined,
      maxTokens: params.maxTokens as number | undefined,
      timeout: context?.timeout,
    });

    eventBus.emit(callbacks.onSuccess, {
      content: result.content,
      usage: result.usage,
    });
  } catch (error) {
    const llmError: IntegratorError = {
      code: 'LLM_ERROR',
      message: error instanceof Error ? error.message : 'Unknown LLM error',
      details: error,
    };
    eventBus.emit(callbacks.onError, llmError);
  }
}

/**
 * Classify text into predefined categories.
 */
async function handleClassify(
  params: Record<string, unknown>,
  eventBus: EventBus,
  callbacks: IntegratorCallbacks,
  context?: ExecutionContext
): Promise<void> {
  const text = params.text as string;
  const categories = params.categories as string[];

  if (!text || !categories || categories.length === 0) {
    const error: IntegratorError = {
      code: 'INVALID_PARAMS',
      message: 'text and categories are required',
    };
    eventBus.emit(callbacks.onError, error);
    return;
  }

  const systemPrompt = `You are a text classifier. Classify the given text into exactly one of these categories: ${categories.join(', ')}.

Respond with a JSON object containing:
- category: the chosen category (must be one of the listed categories)
- confidence: a number between 0 and 1 indicating your confidence
- reasoning: a brief explanation of why you chose this category

Respond with ONLY the JSON object, no other text.`;

  const userPrompt = `Classify this text:\n\n${text}`;

  try {
    const result = await callLLM(systemPrompt, userPrompt, {
      model: params.model as string | undefined,
      temperature: 0.3, // Lower temperature for classification
      timeout: context?.timeout,
    });

    // Parse JSON response
    const parsed = JSON.parse(result.content.trim());

    eventBus.emit(callbacks.onSuccess, {
      category: parsed.category,
      confidence: parsed.confidence,
      reasoning: parsed.reasoning,
      usage: result.usage,
    });
  } catch (error) {
    const llmError: IntegratorError = {
      code: 'CLASSIFICATION_ERROR',
      message: error instanceof Error ? error.message : 'Classification failed',
      details: error,
    };
    eventBus.emit(callbacks.onError, llmError);
  }
}

/**
 * Extract structured data from text using a schema.
 */
async function handleExtract(
  params: Record<string, unknown>,
  eventBus: EventBus,
  callbacks: IntegratorCallbacks,
  context?: ExecutionContext
): Promise<void> {
  const text = params.text as string;
  const schema = params.schema as Record<string, unknown>;

  if (!text || !schema) {
    const error: IntegratorError = {
      code: 'INVALID_PARAMS',
      message: 'text and schema are required',
    };
    eventBus.emit(callbacks.onError, error);
    return;
  }

  const systemPrompt = `You are a data extractor. Extract structured data from the given text according to this JSON schema:

${JSON.stringify(schema, null, 2)}

Respond with a JSON object containing:
- data: the extracted data matching the schema
- confidence: a number between 0 and 1 indicating extraction confidence

Respond with ONLY the JSON object, no other text.`;

  const userPrompt = `Extract data from this text:\n\n${text}`;

  try {
    const result = await callLLM(systemPrompt, userPrompt, {
      model: params.model as string | undefined,
      temperature: 0.2, // Very low temperature for extraction
      timeout: context?.timeout,
    });

    // Parse JSON response
    const parsed = JSON.parse(result.content.trim());

    eventBus.emit(callbacks.onSuccess, {
      data: parsed.data,
      confidence: parsed.confidence,
      usage: result.usage,
    });
  } catch (error) {
    const llmError: IntegratorError = {
      code: 'EXTRACTION_ERROR',
      message: error instanceof Error ? error.message : 'Extraction failed',
      details: error,
    };
    eventBus.emit(callbacks.onError, llmError);
  }
}

/**
 * Summarize long text content.
 */
async function handleSummarize(
  params: Record<string, unknown>,
  eventBus: EventBus,
  callbacks: IntegratorCallbacks,
  context?: ExecutionContext
): Promise<void> {
  const text = params.text as string;
  const maxLength = (params.maxLength as number) || 100;
  const style = (params.style as string) || 'brief';

  if (!text) {
    const error: IntegratorError = {
      code: 'INVALID_PARAMS',
      message: 'text is required',
    };
    eventBus.emit(callbacks.onError, error);
    return;
  }

  const styleInstructions: Record<string, string> = {
    brief: `Write a concise summary in ${maxLength} words or less.`,
    detailed: `Write a detailed summary covering all key points in approximately ${maxLength} words.`,
    bullet: `Write a bullet-point summary with up to ${Math.ceil(maxLength / 20)} key points.`,
  };

  const systemPrompt = `You are a text summarizer. ${styleInstructions[style] || styleInstructions.brief}

Respond with a JSON object containing:
- summary: the summary text
- keyPoints: an array of 3-5 key points from the text

Respond with ONLY the JSON object, no other text.`;

  const userPrompt = `Summarize this text:\n\n${text}`;

  try {
    const result = await callLLM(systemPrompt, userPrompt, {
      model: params.model as string | undefined,
      temperature: 0.5,
      timeout: context?.timeout,
    });

    // Parse JSON response
    const parsed = JSON.parse(result.content.trim());

    eventBus.emit(callbacks.onSuccess, {
      summary: parsed.summary,
      keyPoints: parsed.keyPoints,
      usage: result.usage,
    });
  } catch (error) {
    const llmError: IntegratorError = {
      code: 'SUMMARIZATION_ERROR',
      message: error instanceof Error ? error.message : 'Summarization failed',
      details: error,
    };
    eventBus.emit(callbacks.onError, llmError);
  }
}

// ============================================================================
// LLM Integrator Definition
// ============================================================================

/**
 * LLM Service Integrator.
 *
 * Provides access to LLM capabilities:
 * - generate: Generate content from prompts
 * - classify: Classify text into categories
 * - extract: Extract structured data from text
 * - summarize: Summarize long text
 */
export const llmIntegrator: ServiceIntegrator = {
  name: 'llm',
  description: 'LLM service for generation, classification, extraction, and summarization',
  category: 'ai',

  actions: [
    {
      name: 'generate',
      description: 'Generate content from a prompt',
      params: [
        { name: 'systemPrompt', type: 'string', required: false, description: 'System instructions' },
        { name: 'userPrompt', type: 'string', required: true, description: 'User prompt' },
        { name: 'model', type: 'string', required: false, description: 'Model ID' },
        { name: 'temperature', type: 'number', required: false, description: 'Sampling temperature (0-1)' },
        { name: 'maxTokens', type: 'number', required: false, description: 'Max response tokens' },
      ],
      responseShape: { content: 'string', usage: 'object' },
    },
    {
      name: 'classify',
      description: 'Classify text into predefined categories',
      params: [
        { name: 'text', type: 'string', required: true, description: 'Text to classify' },
        { name: 'categories', type: 'array', required: true, description: 'Category labels' },
        { name: 'model', type: 'string', required: false, description: 'Model ID' },
      ],
      responseShape: { category: 'string', confidence: 'number', reasoning: 'string' },
    },
    {
      name: 'extract',
      description: 'Extract structured data from text',
      params: [
        { name: 'text', type: 'string', required: true, description: 'Text to extract from' },
        { name: 'schema', type: 'object', required: true, description: 'JSON schema for extraction' },
        { name: 'model', type: 'string', required: false, description: 'Model ID' },
      ],
      responseShape: { data: 'object', confidence: 'number' },
    },
    {
      name: 'summarize',
      description: 'Summarize long text content',
      params: [
        { name: 'text', type: 'string', required: true, description: 'Text to summarize' },
        { name: 'maxLength', type: 'number', required: false, description: 'Target length in words' },
        { name: 'style', type: 'string', required: false, description: 'Style: brief, detailed, bullet' },
        { name: 'model', type: 'string', required: false, description: 'Model ID' },
      ],
      responseShape: { summary: 'string', keyPoints: 'array' },
    },
  ],

  async execute(
    action: string,
    params: Record<string, unknown>,
    eventBus: EventBus,
    callbacks: IntegratorCallbacks,
    context?: ExecutionContext
  ): Promise<void> {
    switch (action) {
      case 'generate':
        await handleGenerate(params, eventBus, callbacks, context);
        break;
      case 'classify':
        await handleClassify(params, eventBus, callbacks, context);
        break;
      case 'extract':
        await handleExtract(params, eventBus, callbacks, context);
        break;
      case 'summarize':
        await handleSummarize(params, eventBus, callbacks, context);
        break;
      default: {
        const error: IntegratorError = {
          code: 'UNKNOWN_ACTION',
          message: `Unknown action: ${action}. Available: generate, classify, extract, summarize`,
        };
        eventBus.emit(callbacks.onError, error);
      }
    }
  },

  validateParams(action: string, params: Record<string, unknown>): { valid: boolean; errors?: string[] } {
    const errors: string[] = [];

    switch (action) {
      case 'generate':
        if (!params.userPrompt) errors.push('userPrompt is required');
        break;
      case 'classify':
        if (!params.text) errors.push('text is required');
        if (!params.categories || !Array.isArray(params.categories)) {
          errors.push('categories array is required');
        }
        break;
      case 'extract':
        if (!params.text) errors.push('text is required');
        if (!params.schema) errors.push('schema is required');
        break;
      case 'summarize':
        if (!params.text) errors.push('text is required');
        break;
      default:
        errors.push(`Unknown action: ${action}`);
    }

    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
  },

  isConfigured(): boolean {
    return !!(process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY);
  },
};

/**
 * Register the LLM integrator.
 */
export function registerLLMIntegrator(): void {
  import('./registry.js').then(({ registerIntegrator, hasIntegrator }) => {
    if (!hasIntegrator('llm')) {
      registerIntegrator(llmIntegrator, true);
    }
  });
}
