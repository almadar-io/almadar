/**
 * DomainEditor Organism Component
 *
 * A text editor for domain language with syntax highlighting and validation.
 * Can be used for viewing and editing domain text.
 */

import React, { useState, useCallback, useRef } from 'react';
import { clsx as cn } from 'clsx';
import { Copy, Check, Download, Upload, RefreshCw, Eye, Edit3 } from 'lucide-react';
import { Box, HStack, VStack, Button, Typography, Icon, Textarea } from '@almadar/ui';
import { DomainValidationMessage, DomainValidationSummary, ValidationSummary } from '../../molecules/domain-editing';

export interface ValidationError {
  message: string;
  line?: number;
  column?: number;
  severity?: 'error' | 'warning' | 'info';
  suggestion?: string;
  sectionId?: string;
}

export interface DomainEditorProps {
  /**
   * The domain text content
   */
  value: string;

  /**
   * Callback when content changes
   */
  onChange?: (value: string) => void;

  /**
   * Whether the editor is read-only
   * @default false
   */
  readOnly?: boolean;

  /**
   * Validation errors to display
   */
  errors?: ValidationError[];

  /**
   * Height of the editor
   * @default '400px'
   */
  height?: string;

  /**
   * Placeholder text when empty
   */
  placeholder?: string;

  /**
   * Enable line numbers
   * @default true
   */
  showLineNumbers?: boolean;

  /**
   * Callback when sync button is clicked
   */
  onSync?: () => void;

  /**
   * Whether sync is in progress
   */
  syncing?: boolean;

  /**
   * Callback when copy is clicked
   */
  onCopy?: () => void;

  /**
   * Callback when download is clicked
   */
  onDownload?: () => void;

  /**
   * Callback when upload/import is clicked
   */
  onUpload?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Token types for domain language syntax highlighting
 */
interface HighlightToken {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Tokenize and highlight domain language text
 * Uses a proper tokenization approach instead of fragile regex replacement
 */
function highlightDomainText(text: string): React.ReactNode {
  const lines = text.split('\n');

  return lines.map((line, lineIndex) => {
    // Section headers
    if (line.startsWith('# ')) {
      return (
        <Typography
          as="span"
          key={lineIndex}
          variant="body1"
          className="text-[var(--color-muted-foreground)] font-bold"
        >
          {line}
          {'\n'}
        </Typography>
      );
    }

    // Separators
    if (line.trim() === '---') {
      return (
        <Typography as="span" key={lineIndex} variant="body2" className="text-[var(--color-border)]">
          {line}
          {'\n'}
        </Typography>
      );
    }

    // Tokenize the line for proper highlighting
    const tokens = tokenizeLine(line);

    return (
      <Typography as="span" key={lineIndex} variant="body2">
        {tokens.map((token, tokenIndex) => (
          (token.className || token.style) ? (
            <Typography
              as="span"
              key={tokenIndex}
              variant="body2"
              className={token.className}
              style={token.style}
            >
              {token.text}
            </Typography>
          ) : (
            <React.Fragment key={tokenIndex}>{token.text}</React.Fragment>
          )
        ))}
        {'\n'}
      </Typography>
    );
  });
}

/**
 * Tokenize a single line into highlighted segments
 */
function tokenizeLine(line: string): HighlightToken[] {
  const tokens: HighlightToken[] = [];
  let remaining = line;

  // Patterns ordered by priority (checked in order)
  const patterns: Array<{ regex: RegExp; className?: string; style?: React.CSSProperties }> = [
    // Comments (highest priority)
    { regex: /#.*$/, className: 'italic', style: { color: 'var(--color-muted-foreground)' } },
    // Quoted strings
    { regex: /"[^"]*"/, style: { color: 'var(--color-warning)' } },
    // Entity headers (A/An at start)
    { regex: /^(A|An)\s/, className: 'font-semibold', style: { color: 'var(--color-accent)' } },
    // Page headers (The at start)
    { regex: /^The\s/, className: 'font-semibold', style: { color: 'var(--color-info)' } },
    // Multi-word phrases first (to avoid partial matches)
    { regex: /\b(It has|It can be|It starts as|It belongs to|It displays|belongs to|has many|has one)\b/i, style: { color: 'var(--color-info)' } },
    // Page/URL keywords
    { regex: /\b(shows|Purpose|URL|Users can)\b/i, style: { color: 'var(--color-info)' } },
    // Behavior keywords
    { regex: /\b(States|Transitions|From|when|Every)\b/i, style: { color: 'var(--color-success)' } },
    // Conditional keywords
    { regex: /\b(if|then|AND|OR|NOT)\b/, style: { color: 'var(--color-error)' } },
    // Action keywords
    { regex: /\b(notify|update|emit|navigate|call|send_in_app)\b/i, style: { color: 'var(--color-warning)' } },
    // Type keywords
    { regex: /\b(text|number|currency|date|timestamp|yes\/no|required|unique|auto|list)\b/i, style: { color: 'var(--color-success)' } },
    // Simple keywords (is, has, to) - lower priority
    { regex: /\b(is|has|to)\b/i, style: { color: 'var(--color-info)' } },
  ];

  while (remaining.length > 0) {
    let matched = false;

    // Try each pattern
    for (const { regex, className, style } of patterns) {
      const match = remaining.match(regex);
      if (match && match.index !== undefined) {
        // Add any text before the match as plain text
        if (match.index > 0) {
          tokens.push({ text: remaining.slice(0, match.index) });
        }
        // Add the matched text with its class and style
        tokens.push({ text: match[0], className, style });
        // Continue with the rest
        remaining = remaining.slice(match.index + match[0].length);
        matched = true;
        break;
      }
    }

    // If no pattern matched, consume one character as plain text
    if (!matched) {
      // Find the next potential match point
      let nextMatchPos = remaining.length;
      for (const { regex } of patterns) {
        const match = remaining.slice(1).match(regex);
        if (match && match.index !== undefined) {
          nextMatchPos = Math.min(nextMatchPos, match.index + 1);
        }
      }
      tokens.push({ text: remaining.slice(0, nextMatchPos) });
      remaining = remaining.slice(nextMatchPos);
    }
  }

  return tokens;
}

export const DomainEditor: React.FC<DomainEditorProps> = ({
  value,
  onChange,
  readOnly = false,
  errors = [],
  height = '400px',
  placeholder = 'Enter domain language text...',
  showLineNumbers = true,
  onSync,
  syncing = false,
  onCopy,
  onDownload,
  onUpload,
  className,
}) => {
  const [mode, setMode] = useState<'view' | 'edit'>(readOnly ? 'view' : 'edit');
  const [copied, setCopied] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const errorCount = errors.filter((e) => e.severity !== 'warning' && e.severity !== 'info').length;
  const warningCount = errors.filter((e) => e.severity === 'warning').length;

  const validationSummary: ValidationSummary = {
    errors: errorCount,
    warnings: warningCount,
  };

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy?.();
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [value, onCopy]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  }, [onChange]);

  // Line count
  const lineCount = value.split('\n').length;

  return (
    <Box
      className={cn(
        'rounded-lg border border-[var(--color-border)]',
        'bg-[var(--color-card)]',
        'overflow-hidden',
        className
      )}
    >
      {/* Toolbar */}
      <HStack
        justify="between"
        align="center"
        className="px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-secondary)]"
      >
        <HStack gap="sm" align="center">
          <Typography variant="body2" className="font-medium text-[var(--color-muted-foreground)]">
            Domain Language
          </Typography>
          {!readOnly && (
            <Box className="flex items-center rounded-md border border-[var(--color-border)] overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMode('view')}
                className={cn(
                  'px-2 py-1 text-xs flex items-center gap-1',
                  mode === 'view'
                    ? 'bg-[var(--color-secondary)] text-[var(--color-foreground)]'
                    : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)]'
                )}
              >
                <Icon icon={Eye} size="xs" />
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMode('edit')}
                className={cn(
                  'px-2 py-1 text-xs flex items-center gap-1',
                  mode === 'edit'
                    ? 'bg-[var(--color-secondary)] text-[var(--color-foreground)]'
                    : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)]'
                )}
              >
                <Icon icon={Edit3} size="xs" />
                Edit
              </Button>
            </Box>
          )}
        </HStack>

        <HStack gap="xs" align="center">
          {onSync && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSync}
              disabled={syncing}
              className={cn(
                'p-1.5 rounded hover:bg-[var(--color-secondary)]',
                'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]',
                syncing && 'animate-spin'
              )}
              title="Sync with schema"
            >
              <Icon icon={RefreshCw} size="sm" />
            </Button>
          )}
          {onUpload && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onUpload}
              className="p-1.5 rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              title="Import"
            >
              <Icon icon={Upload} size="sm" />
            </Button>
          )}
          {onDownload && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDownload}
              className="p-1.5 rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              title="Export"
            >
              <Icon icon={Download} size="sm" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            title={copied ? 'Copied!' : 'Copy'}
          >
            {copied
              ? <Icon icon={Check} size="sm" style={{ color: 'var(--color-success)' }} />
              : <Icon icon={Copy} size="sm" />
            }
          </Button>
        </HStack>
      </HStack>

      {/* Validation summary */}
      {errors.length > 0 && (
        <Box className="px-4 py-2 border-b border-[var(--color-border)]">
          <DomainValidationSummary
            summary={validationSummary}
            onClick={() => setShowErrors(!showErrors)}
          />
        </Box>
      )}

      {/* Error details */}
      {showErrors && errors.length > 0 && (
        <VStack
          gap="sm"
          className="px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-secondary)] max-h-40 overflow-y-auto"
        >
          {errors.map((error, index) => (
            <DomainValidationMessage
              key={index}
              message={error.message}
              severity={error.severity}
              suggestion={error.suggestion}
              compact
            />
          ))}
        </VStack>
      )}

      {/* Editor content */}
      <HStack gap="none" style={{ height }}>
        {/* Line numbers */}
        {showLineNumbers && (
          <Box className="flex-shrink-0 w-12 px-2 py-3 text-right font-mono text-xs text-[var(--color-muted-foreground)] bg-[var(--color-secondary)] border-r border-[var(--color-border)] select-none overflow-hidden">
            {Array.from({ length: lineCount }, (_, i) => (
              <Box key={i + 1} className="leading-6">
                <Typography variant="caption" className="font-mono text-[var(--color-muted-foreground)]">
                  {i + 1}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Content area */}
        <Box className="flex-1 relative overflow-auto">
          {mode === 'edit' ? (
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              readOnly={readOnly}
              className={cn(
                'w-full h-full resize-none p-3',
                'font-mono text-sm leading-6',
                'bg-transparent',
                'text-[var(--color-foreground)]',
                'focus:outline-none',
                'placeholder:text-[var(--color-muted-foreground)]'
              )}
              spellCheck={false}
            />
          ) : (
            <Box
              as="pre"
              className="p-3 font-mono text-sm leading-6 whitespace-pre-wrap"
            >
              {highlightDomainText(value)}
            </Box>
          )}
        </Box>
      </HStack>

      {/* Footer */}
      <HStack
        justify="between"
        align="center"
        className="px-4 py-1.5 border-t border-[var(--color-border)] bg-[var(--color-secondary)]"
      >
        <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
          {lineCount} line{lineCount !== 1 ? 's' : ''} • {value.length} characters
        </Typography>
        <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
          Domain Language v1
        </Typography>
      </HStack>
    </Box>
  );
};

DomainEditor.displayName = 'DomainEditor';
