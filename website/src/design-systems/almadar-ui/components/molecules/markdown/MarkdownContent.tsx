/**
 * MarkdownContent Molecule Component
 *
 * Renders markdown content with support for GFM (GitHub Flavored Markdown)
 * and math equations (KaTeX). Handles inline code only — fenced code blocks
 * should be parsed out and rendered with CodeBlock component.
 *
 * Event Contract:
 * - No events emitted (display-only component)
 * - entityAware: false
 *
 * NOTE: react-markdown's `components` override API requires native HTML
 * elements — this is the same library-boundary exception as `<iframe>` in
 * DocumentViewer and `<svg>` in JazariStateMachine/StateMachineView.
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Box } from '../../atoms/Box';
import { useTranslate } from '../../../hooks/useTranslate';
import { cn } from '../../../lib/cn';

export interface MarkdownContentProps {
  /** The markdown content to render */
  content: string;
  /** Text direction */
  direction?: 'rtl' | 'ltr';
  /** Additional CSS classes */
  className?: string;
}

export const MarkdownContent = React.memo<MarkdownContentProps>(
  ({ content, direction, className }) => {
    const { t: _t } = useTranslate();
    return (
      <Box
        className={cn('prose prose-slate dark:prose-invert max-w-none', className)}
        style={{ direction }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[
            [rehypeKatex, { strict: false, throwOnError: false }],
          ]}
          components={{
            // Handle inline code only — fenced code blocks are parsed out separately
            code({ className: codeClassName, children, ...props }) {
              return (
                <code
                  {...props}
                  className={codeClassName}
                  style={{
                    backgroundColor: '#1f2937',
                    color: '#e5e7eb',
                    padding: '0.125rem 0.375rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.875em',
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  {children}
                </code>
              );
            },
            // Style links
            a({ href, children, ...props }) {
              return (
                <a
                  href={href}
                  {...props}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              );
            },
            // Style tables
            table({ children, ...props }) {
              return (
                <div className="overflow-x-auto my-4">
                  <table
                    {...props}
                    className="min-w-full border-collapse border border-gray-300 dark:border-gray-600"
                  >
                    {children}
                  </table>
                </div>
              );
            },
            th({ children, ...props }) {
              return (
                <th
                  {...props}
                  className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left font-semibold"
                >
                  {children}
                </th>
              );
            },
            td({ children, ...props }) {
              return (
                <td
                  {...props}
                  className="border border-gray-300 dark:border-gray-600 px-4 py-2"
                >
                  {children}
                </td>
              );
            },
            // Style blockquotes
            blockquote({ children, ...props }) {
              return (
                <blockquote
                  {...props}
                  className="border-l-4 border-blue-500 pl-4 italic text-[var(--color-foreground)] my-4"
                >
                  {children}
                </blockquote>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </Box>
    );
  },
  (prev, next) =>
    prev.content === next.content &&
    prev.className === next.className &&
    prev.direction === next.direction,
);

MarkdownContent.displayName = 'MarkdownContent';
