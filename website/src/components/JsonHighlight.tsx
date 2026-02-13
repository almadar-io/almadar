/**
 * Custom JSON syntax highlighter — no Prism dependency.
 * Tokenizes JSON and wraps each token in a <span> with a data-token attribute
 * so styling is fully controlled via CSS.
 */
import type { ReactNode } from "react";
import styles from "./JsonHighlight.module.css";

type TokenType =
  | "property"
  | "string"
  | "binding"
  | "operator"
  | "number"
  | "boolean"
  | "null"
  | "punctuation";

interface Token {
  type: TokenType;
  value: string;
}

const OPERATORS = new Set([
  "set",
  "render-ui",
  "+",
  "-",
  "*",
  "/",
  "emit",
  "persist",
  "navigate",
  "call-service",
  "log",
  // Arabic operators
  "تعيين",
  "رسم_واجهة",
  // Slovenian operators
  "nastavi",
]);

function tokenize(json: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < json.length) {
    const ch = json[i];

    // Whitespace — emit as-is (plain text)
    if (/\s/.test(ch)) {
      let ws = "";
      while (i < json.length && /\s/.test(json[i])) {
        ws += json[i];
        i++;
      }
      tokens.push({ type: "punctuation", value: ws });
      continue;
    }

    // Strings
    if (ch === '"') {
      let str = '"';
      i++;
      while (i < json.length && json[i] !== '"') {
        if (json[i] === "\\") {
          str += json[i] + (json[i + 1] || "");
          i += 2;
        } else {
          str += json[i];
          i++;
        }
      }
      str += '"';
      i++; // skip closing quote

      // Determine string subtype by looking ahead for ':'
      const rest = json.slice(i);
      const isProperty = /^\s*:/.test(rest);
      const inner = str.slice(1, -1);

      if (isProperty) {
        tokens.push({ type: "property", value: str });
      } else if (inner.startsWith("@")) {
        tokens.push({ type: "binding", value: str });
      } else if (OPERATORS.has(inner)) {
        tokens.push({ type: "operator", value: str });
      } else {
        tokens.push({ type: "string", value: str });
      }
      continue;
    }

    // Numbers
    if (/[\d]/.test(ch) || (ch === "-" && i + 1 < json.length && /\d/.test(json[i + 1]))) {
      let num = "";
      if (ch === "-") {
        num += ch;
        i++;
      }
      while (i < json.length && /[\d.eE+\-]/.test(json[i])) {
        num += json[i];
        i++;
      }
      tokens.push({ type: "number", value: num });
      continue;
    }

    // Booleans
    if (json.slice(i, i + 4) === "true") {
      tokens.push({ type: "boolean", value: "true" });
      i += 4;
      continue;
    }
    if (json.slice(i, i + 5) === "false") {
      tokens.push({ type: "boolean", value: "false" });
      i += 5;
      continue;
    }

    // Null
    if (json.slice(i, i + 4) === "null") {
      tokens.push({ type: "null", value: "null" });
      i += 4;
      continue;
    }

    // Punctuation: { } [ ] , :
    if ("{}[],:".includes(ch)) {
      tokens.push({ type: "punctuation", value: ch });
      i++;
      continue;
    }

    // Fallback — shouldn't happen in valid JSON
    tokens.push({ type: "punctuation", value: ch });
    i++;
  }

  return tokens;
}

interface JsonHighlightProps {
  code: string;
  title?: string;
  className?: string;
}

export default function JsonHighlight({
  code,
  title,
  className,
}: JsonHighlightProps): ReactNode {
  const tokens = tokenize(code.trim());

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {title && (
        <div className={styles.header}>
          <span className={styles.headerTitle}>{title}</span>
        </div>
      )}
      <pre className={styles.pre}>
        <code className={styles.code}>
          {tokens.map((token, i) => (
            <span key={i} className={styles[token.type]}>
              {token.value}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
