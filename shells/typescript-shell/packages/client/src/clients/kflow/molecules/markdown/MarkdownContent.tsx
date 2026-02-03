/**
 * MarkdownContent Molecule Component
 *
 * Renders markdown content with support for GFM (GitHub Flavored Markdown),
 * math equations (KaTeX), and raw HTML. Handles inline code only - fenced
 * code blocks should be parsed out and rendered with CodeBlock component.
 *
 * Event Contract:
 * - No events emitted (display-only component)
 * - entityAware: false
 */

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";

export interface MarkdownContentProps {
  /** The markdown content to render */
  content: string;
  /** Additional CSS classes */
  className?: string;
}

export const MarkdownContent = React.memo<MarkdownContentProps>(
  ({ content, className }) => {
    return (
      <div
        className={`prose prose-slate dark:prose-invert max-w-none ${className || ""}`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[
            [rehypeRaw, {}],
            [rehypeKatex, { strict: false, throwOnError: false }],
          ]}
          components={{
            // Handle inline code only - fenced code blocks are parsed out separately
            code({ className: codeClassName, children, ...props }) {
              return (
                <code
                  {...props}
                  className={codeClassName}
                  style={{
                    backgroundColor: "#1f2937",
                    color: "#e5e7eb",
                    padding: "0.125rem 0.375rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.875em",
                    fontFamily: "ui-monospace, monospace",
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
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href?.startsWith("http") ? "noopener noreferrer" : undefined
                  }
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
                  className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300 my-4"
                >
                  {children}
                </blockquote>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  },
  (prev, next) =>
    prev.content === next.content && prev.className === next.className,
);

MarkdownContent.displayName = "MarkdownContent";
