/**
 * Lesson Segment Parsing Utilities
 *
 * Parses lesson content with learning science tags and code blocks
 * into structured segments for rendering.
 */

// Bloom's Taxonomy cognitive levels
export type BloomLevel =
  | "remember"
  | "understand"
  | "apply"
  | "analyze"
  | "evaluate"
  | "create";

// Segment types for lesson content
export type Segment =
  | { type: "markdown"; content: string }
  | { type: "code"; language: string; content: string }
  | { type: "quiz"; question: string; answer: string }
  | { type: "activate"; question: string }
  | { type: "connect"; content: string }
  | { type: "reflect"; prompt: string }
  | { type: "bloom"; level: BloomLevel; question: string; answer: string };

/**
 * Parse markdown content to extract code blocks
 *
 * Splits markdown into segments of plain markdown and fenced code blocks
 */
export const parseMarkdownWithCodeBlocks = (
  content: string | undefined | null,
): Array<
  | { type: "markdown"; content: string }
  | { type: "code"; language: string; content: string }
> => {
  // Guard against undefined/null content
  if (!content) {
    return [];
  }

  const segments: Array<
    | { type: "markdown"; content: string }
    | { type: "code"; language: string; content: string }
  > = [];

  // Regex to match fenced code blocks: ```language\ncode\n``` or ```\ncode\n```
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add markdown before the code block
    const before = content.slice(lastIndex, match.index);
    if (before.trim()) {
      segments.push({ type: "markdown" as const, content: before });
    }

    // Add the code block (ensure language is always a string)
    const language = match[1] || "text";
    segments.push({
      type: "code" as const,
      language,
      content: match[2].trim(),
    });

    lastIndex = codeBlockRegex.lastIndex;
  }

  // Add remaining markdown
  const remaining = content.slice(lastIndex);
  if (remaining.trim()) {
    segments.push({ type: "markdown" as const, content: remaining });
  }

  return segments;
};

/**
 * Parse lesson content to extract all segments including learning science tags
 *
 * Supported tags:
 * - <activate>question</activate> - Prior knowledge activation
 * - <connect>content</connect> - Connection to existing knowledge
 * - <reflect>prompt</reflect> - Reflection prompts
 * - <bloom level="level"><question>q</question><answer>a</answer></bloom> - Bloom's taxonomy questions
 * - <question>q</question><answer>a</answer> - Regular quiz questions
 *
 * Also handles fenced code blocks (```language...```)
 */
export const parseLessonSegments = (lesson: string | undefined): Segment[] => {
  if (!lesson) {
    return [];
  }

  // Remove <prq> tags from lesson content since we display prerequisites separately
  let content = lesson.replace(/<prq>[\s\S]*?<\/prq>/gi, "").trim();

  const segments: Segment[] = [];

  // 1. Extract <activate> tag (should be first)
  const activateMatch = content.match(/<activate>([\s\S]*?)<\/activate>/i);
  if (activateMatch) {
    segments.push({
      type: "activate",
      question: activateMatch[1].trim(),
    });
    content = content.replace(activateMatch[0], "").trim();
  }

  // 2. Extract <connect> tag (should be after activate)
  const connectMatch = content.match(/<connect>([\s\S]*?)<\/connect>/i);
  if (connectMatch) {
    segments.push({
      type: "connect",
      content: connectMatch[1].trim(),
    });
    content = content.replace(connectMatch[0], "").trim();
  }

  // 3. Parse the rest: markdown, code, reflect, bloom, and regular quiz tags
  const tagRegex = new RegExp(
    "(" +
      // Reflect tags
      "<reflect>([\\s\\S]*?)<\\/reflect>|" +
      // Bloom tags (with nested question/answer)
      '<bloom\\s+level="(remember|understand|apply|analyze|evaluate|create)">([\\s\\S]*?)<\\/bloom>|' +
      // Regular quiz tags (backward compatibility)
      "<question>([\\s\\S]*?)<\\/question>\\s*<answer>([\\s\\S]*?)<\\/answer>" +
      ")",
    "gi",
  );

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(content)) !== null) {
    // Add markdown/code before this match
    const before = content.slice(lastIndex, match.index);
    if (before.trim()) {
      const parsedSegments = parseMarkdownWithCodeBlocks(before);
      segments.push(...parsedSegments);
    }

    // Determine which tag was matched
    if (match[0].startsWith("<reflect>")) {
      // Reflect tag
      segments.push({
        type: "reflect",
        prompt: match[2].trim(),
      });
    } else if (match[0].startsWith("<bloom")) {
      // Bloom tag - extract level and nested question/answer
      const level = match[3] as BloomLevel;
      const bloomContent = match[4];

      const questionMatch = bloomContent.match(
        /<question>([\s\S]*?)<\/question>/i,
      );
      const answerMatch = bloomContent.match(/<answer>([\s\S]*?)<\/answer>/i);

      if (questionMatch && answerMatch) {
        segments.push({
          type: "bloom",
          level,
          question: questionMatch[1].trim(),
          answer: answerMatch[1].trim(),
        });
      }
    } else {
      // Regular quiz tag (backward compatibility)
      segments.push({
        type: "quiz",
        question: match[5].trim(),
        answer: match[6].trim(),
      });
    }

    lastIndex = tagRegex.lastIndex;
  }

  // Parse remaining content (markdown and code blocks)
  const remaining = content.slice(lastIndex);
  if (remaining.trim()) {
    const parsedSegments = parseMarkdownWithCodeBlocks(remaining);
    segments.push(...parsedSegments);
  }

  return segments;
};
