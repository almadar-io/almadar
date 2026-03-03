/**
 * Content Segment Parsing Utilities
 *
 * Parses rich content with code blocks and quiz tags into structured
 * segments for rendering. Detects orbital schemas in JSON code blocks
 * and marks them for JazariStateMachine rendering.
 */

/** Segment types for content rendering */
export type ContentSegment =
  | { type: 'markdown'; content: string }
  | { type: 'code'; language: string; content: string }
  | { type: 'orbital'; language: string; content: string; schema: unknown }
  | { type: 'quiz'; question: string; answer: string };

/**
 * Attempt to detect if a JSON code block contains an orbital schema.
 * Returns the parsed object if it looks like a trait (has states+transitions)
 * or a full schema (has orbitals array), otherwise null.
 */
function tryParseOrbitalSchema(code: string): unknown | null {
  try {
    const parsed = JSON.parse(code) as Record<string, unknown>;
    if (
      (parsed.states && parsed.transitions) ||
      (Array.isArray(parsed.orbitals))
    ) {
      return parsed;
    }
  } catch {
    // Not valid JSON — not orbital
  }
  return null;
}

/**
 * Parse markdown content to extract code blocks.
 *
 * Splits markdown into segments of plain markdown and fenced code blocks.
 * JSON/orb code blocks containing orbital schemas are tagged as 'orbital'.
 */
export function parseMarkdownWithCodeBlocks(
  content: string | undefined | null,
): ContentSegment[] {
  if (!content) return [];

  const segments: ContentSegment[] = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const before = content.slice(lastIndex, match.index);
    if (before.trim()) {
      segments.push({ type: 'markdown', content: before });
    }

    const language = match[1] || 'text';
    const code = match[2].trim();

    // Detect orbital schemas in json/orb code blocks
    if (language === 'json' || language === 'orb') {
      const schema = tryParseOrbitalSchema(code);
      if (schema) {
        segments.push({ type: 'orbital', language, content: code, schema });
        lastIndex = codeBlockRegex.lastIndex;
        continue;
      }
    }

    segments.push({ type: 'code', language, content: code });
    lastIndex = codeBlockRegex.lastIndex;
  }

  const remaining = content.slice(lastIndex);
  if (remaining.trim()) {
    segments.push({ type: 'markdown', content: remaining });
  }

  return segments;
}

/**
 * Parse content to extract all segments including quiz tags and code blocks.
 *
 * Supported tags:
 * - <question>q</question><answer>a</answer> — Quiz Q&A
 *
 * Also handles fenced code blocks (```language...```) with orbital detection.
 */
export function parseContentSegments(
  content: string | undefined | null,
): ContentSegment[] {
  if (!content) return [];

  const segments: ContentSegment[] = [];
  const tagRegex =
    /<question>([\s\S]*?)<\/question>\s*<answer>([\s\S]*?)<\/answer>/gi;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(content)) !== null) {
    const before = content.slice(lastIndex, match.index);
    if (before.trim()) {
      segments.push(...parseMarkdownWithCodeBlocks(before));
    }

    segments.push({
      type: 'quiz',
      question: match[1].trim(),
      answer: match[2].trim(),
    });

    lastIndex = tagRegex.lastIndex;
  }

  const remaining = content.slice(lastIndex);
  if (remaining.trim()) {
    segments.push(...parseMarkdownWithCodeBlocks(remaining));
  }

  return segments;
}
