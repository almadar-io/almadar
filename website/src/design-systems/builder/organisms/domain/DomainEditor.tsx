/**
 * DomainEditor Organism Component
 *
 * A text editor for domain language with syntax highlighting and validation.
 * Can be used for viewing and editing domain text.
 */

import React, { useState, useCallback, useRef } from 'react';
import { clsx as cn } from 'clsx';
import { Copy, Check, Download, Upload, RefreshCw, Eye, Edit3 } from 'lucide-react';
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
        <span key={lineIndex} className="text-[var(--color-muted-foreground)] font-bold text-lg">
          {line}
          {'\n'}
        </span>
      );
    }

    // Separators
    if (line.trim() === '---') {
      return (
        <span key={lineIndex} className="text-[var(--color-border)]">
          {line}
          {'\n'}
        </span>
      );
    }

    // Tokenize the line for proper highlighting
    const tokens = tokenizeLine(line);

    return (
      <span key={lineIndex}>
        {tokens.map((token, tokenIndex) => (
          (token.className || token.style) ? (
            <span key={tokenIndex} className={token.className} style={token.style}>{token.text}</span>
          ) : (
            <React.Fragment key={tokenIndex}>{token.text}</React.Fragment>
          )
        ))}
        {'\n'}
      </span>
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
    <div
      className={cn(
        'rounded-lg border border-[var(--color-border)]',
        'bg-[var(--color-card)]',
        'overflow-hidden',
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-secondary)]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
            Domain Language
          </span>
          {!readOnly && (
            <div className="flex items-center rounded-md border border-[var(--color-border)] overflow-hidden">
              <button
                type="button"
                onClick={() => setMode('view')}
                className={cn(
                  'px-2 py-1 text-xs flex items-center gap-1',
                  mode === 'view'
                    ? 'bg-[var(--color-secondary)] text-[var(--color-foreground)]'
                    : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)]'
                )}
              >
                <Eye className="w-3 h-3" />
                View
              </button>
              <button
                type="button"
                onClick={() => setMode('edit')}
                className={cn(
                  'px-2 py-1 text-xs flex items-center gap-1',
                  mode === 'edit'
                    ? 'bg-[var(--color-secondary)] text-[var(--color-foreground)]'
                    : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)]'
                )}
              >
                <Edit3 className="w-3 h-3" />
                Edit
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {onSync && (
            <button
              type="button"
              onClick={onSync}
              disabled={syncing}
              className={cn(
                'p-1.5 rounded hover:bg-[var(--color-secondary)]',
                'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]',
                syncing && 'animate-spin'
              )}
              title="Sync with schema"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
          {onUpload && (
            <button
              type="button"
              onClick={onUpload}
              className="p-1.5 rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              title="Import"
            >
              <Upload className="w-4 h-4" />
            </button>
          )}
          {onDownload && (
            <button
              type="button"
              onClick={onDownload}
              className="p-1.5 rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              title="Export"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            title={copied ? 'Copied!' : 'Copy'}
          >
            {copied ? <Check className="w-4 h-4" style={{ color: 'var(--color-success)' }} /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Validation summary */}
      {errors.length > 0 && (
        <div className="px-4 py-2 border-b border-[var(--color-border)]">
          <DomainValidationSummary
            summary={validationSummary}
            onClick={() => setShowErrors(!showErrors)}
          />
        </div>
      )}

      {/* Error details */}
      {showErrors && errors.length > 0 && (
        <div className="px-4 py-2 space-y-2 border-b border-[var(--color-border)] bg-[var(--color-secondary)] max-h-40 overflow-y-auto">
          {errors.map((error, index) => (
            <DomainValidationMessage
              key={index}
              message={error.message}
              severity={error.severity}
              suggestion={error.suggestion}
              compact
            />
          ))}
        </div>
      )}

      {/* Editor content */}
      <div className="flex" style={{ height }}>
        {/* Line numbers */}
        {showLineNumbers && (
          <div className="flex-shrink-0 w-12 px-2 py-3 text-right font-mono text-xs text-[var(--color-muted-foreground)] bg-[var(--color-secondary)] border-r border-[var(--color-border)] select-none overflow-hidden">
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i + 1} className="leading-6">
                {i + 1}
              </div>
            ))}
          </div>
        )}

        {/* Content area */}
        <div className="flex-1 relative overflow-auto">
          {mode === 'edit' ? (
            <textarea
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
            <pre className="p-3 font-mono text-sm leading-6 whitespace-pre-wrap">
              {highlightDomainText(value)}
            </pre>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-1.5 border-t border-[var(--color-border)] bg-[var(--color-secondary)] text-xs text-[var(--color-muted-foreground)]">
        <span>
          {lineCount} line{lineCount !== 1 ? 's' : ''} • {value.length} characters
        </span>
        <span>
          Domain Language v1
        </span>
      </div>
    </div>
  );
};

DomainEditor.displayName = 'DomainEditor';
