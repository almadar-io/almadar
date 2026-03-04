import React, { useState, useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import {
  PLAYGROUND_EXAMPLES,
  EXAMPLE_CATEGORIES,
  type PlaygroundExample,
} from "../data/playground-examples";
import styles from "./playground.module.css";

// ─── Types ────────────────────────────────────────────────────────────────

interface EvalResult {
  value: unknown;
  error: string | null;
  duration: number;
}

// ─── Evaluator (loaded lazily in browser) ─────────────────────────────────

async function evaluateExpression(code: string): Promise<EvalResult> {
  const start = performance.now();
  try {
    const input = code.trim();
    if (!input) {
      return { value: null, error: null, duration: 0 };
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(input);
    } catch {
      return {
        value: null,
        error: `JSON parse error: not a valid s-expression. Expressions must be JSON arrays like ["op", arg1, arg2]`,
        duration: 0,
      };
    }

    // Dynamic import of evaluator (browser-only)
    const { SExpressionEvaluator, createMinimalContext } = await import("@almadar/evaluator");
    const evaluator = new SExpressionEvaluator();
    const ctx = createMinimalContext({}, {}, 'initial');

    const result = evaluator.evaluate(parsed, ctx);
    const duration = performance.now() - start;
    return { value: result, error: null, duration };
  } catch (err: unknown) {
    const duration = performance.now() - start;
    const message = err instanceof Error ? err.message : String(err);
    return { value: null, error: message, duration };
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function formatResult(value: unknown): string {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  return JSON.stringify(value, null, 2);
}

function encodeToHash(code: string): string {
  try {
    return "#" + encodeURIComponent(btoa(code));
  } catch {
    return "#" + encodeURIComponent(code);
  }
}

function decodeFromHash(hash: string): string | null {
  try {
    const raw = hash.replace(/^#/, "");
    return atob(decodeURIComponent(raw));
  } catch {
    return null;
  }
}

// ─── Output Panel ─────────────────────────────────────────────────────────

function OutputPanel({ result, isRunning }: { result: EvalResult | null; isRunning: boolean }) {
  if (isRunning) {
    return (
      <div className={styles.outputPanel}>
        <div className={styles.outputHeader}>
          <span className={styles.outputLabel}>Output</span>
        </div>
        <div className={styles.outputSpinner}>
          <span className={styles.spinner} />
          <Translate id="playground.running">Running...</Translate>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={styles.outputPanel}>
        <div className={styles.outputHeader}>
          <span className={styles.outputLabel}>Output</span>
        </div>
        <div className={styles.outputEmpty}>
          <Translate id="playground.empty">
            Write an s-expression and press Run (or Ctrl+Enter)
          </Translate>
        </div>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className={styles.outputPanel}>
        <div className={styles.outputHeader}>
          <span className={styles.outputLabel}>Output</span>
          <span className={styles.outputError}>
            <Translate id="playground.error">Error</Translate>
          </span>
        </div>
        <pre className={styles.outputErrorText}>{result.error}</pre>
      </div>
    );
  }

  return (
    <div className={styles.outputPanel}>
      <div className={styles.outputHeader}>
        <span className={styles.outputLabel}>Output</span>
        <span className={styles.outputMeta}>
          {result.duration.toFixed(1)}ms
        </span>
      </div>
      <pre className={styles.outputValue}>{formatResult(result.value)}</pre>
    </div>
  );
}

// ─── Examples Dropdown ────────────────────────────────────────────────────

function ExamplesDropdown({
  onSelect,
}: {
  onSelect: (example: PlaygroundExample) => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(EXAMPLE_CATEGORIES[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const categoryExamples = PLAYGROUND_EXAMPLES.filter(
    (e) => e.category === activeCategory
  );

  return (
    <div className={styles.dropdown} ref={ref}>
      <button
        className={styles.dropdownTrigger}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <Translate id="playground.examples">Examples</Translate>
        <span className={styles.dropdownArrow}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className={styles.dropdownPanel}>
          <div className={styles.dropdownCategories}>
            {EXAMPLE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={
                  activeCategory === cat
                    ? styles.dropdownCategoryActive
                    : styles.dropdownCategory
                }
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className={styles.dropdownItems}>
            {categoryExamples.map((ex) => (
              <button
                key={ex.id}
                className={styles.dropdownItem}
                onClick={() => {
                  onSelect(ex);
                  setOpen(false);
                }}
              >
                <span className={styles.dropdownItemLabel}>{ex.label}</span>
                <span className={styles.dropdownItemDesc}>{ex.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Editor (Monaco, loaded only in browser) ──────────────────────────────

function PlaygroundEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  // Dynamic import to avoid SSR issues
  const [MonacoEditor, setMonacoEditor] = useState<React.ComponentType<{
    value: string;
    onChange: (v: string | undefined) => void;
    language: string;
    theme: string;
    height: string;
    options: Record<string, unknown>;
  }> | null>(null);

  useEffect(() => {
    import("@monaco-editor/react").then((mod) => {
      setMonacoEditor(() => mod.default);
    });
  }, []);

  if (!MonacoEditor) {
    return (
      <textarea
        className={styles.fallbackEditor}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        placeholder={`["op", arg1, arg2]`}
      />
    );
  }

  return (
    <MonacoEditor
      value={value}
      onChange={(v) => onChange(v ?? "")}
      language="json"
      theme="vs-dark"
      height="100%"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        wordWrap: "on",
        scrollBeyondLastLine: false,
        tabSize: 2,
        formatOnPaste: true,
        automaticLayout: true,
      }}
    />
  );
}

// ─── Main Playground ──────────────────────────────────────────────────────

export function PlaygroundCore() {
  const defaultCode = PLAYGROUND_EXAMPLES[0].code;
  const [code, setCode] = useState<string>(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      return decodeFromHash(window.location.hash) ?? defaultCode;
    }
    return defaultCode;
  });
  const [result, setResult] = useState<EvalResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const run = useCallback(async (src: string) => {
    setIsRunning(true);
    const r = await evaluateExpression(src);
    setResult(r);
    setIsRunning(false);
  }, []);

  // Run on first load
  useEffect(() => {
    if (code) run(code);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard shortcut: Ctrl/Cmd + Enter
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        run(code);
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [code, run]);

  function handleShare() {
    const url = window.location.origin + window.location.pathname + encodeToHash(code);
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleExampleSelect(example: PlaygroundExample) {
    setCode(example.code);
    run(example.code);
  }

  return (
    <div className={styles.playgroundLayout}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <ExamplesDropdown onSelect={handleExampleSelect} />
        <div className={styles.toolbarRight}>
          <button
            className={styles.shareBtn}
            onClick={handleShare}
            title="Copy shareable link"
          >
            {copied ? (
              <Translate id="playground.copied">Copied!</Translate>
            ) : (
              <Translate id="playground.share">Share</Translate>
            )}
          </button>
          <button
            className={styles.runBtn}
            onClick={() => run(code)}
            disabled={isRunning}
          >
            <Translate id="playground.run">Run</Translate>
            <span className={styles.shortcut}>Ctrl+↵</span>
          </button>
        </div>
      </div>

      {/* Split pane */}
      <div className={styles.splitPane}>
        <div className={styles.editorPane}>
          <PlaygroundEditor value={code} onChange={setCode} />
        </div>
        <div className={styles.outputPane}>
          <OutputPanel result={result} isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function Playground(): ReactNode {
  return (
    <Layout
      title={translate({
        id: "playground.meta.title",
        message: "Playground — Almadar",
      })}
      description={translate({
        id: "playground.meta.description",
        message:
          "Interactive Almadar s-expression playground. Write and run operators directly in the browser.",
      })}
    >
      <div className={styles.pageHeader}>
        <div className="container">
          <Heading as="h1" className={styles.pageTitle}>
            <Translate id="playground.title">Playground</Translate>
          </Heading>
          <p className={styles.pageSubtitle}>
            <Translate id="playground.subtitle">
              Run Almadar s-expressions in the browser. No installation needed.
            </Translate>
          </p>
        </div>
      </div>
      <main className={styles.playgroundMain}>
        <BrowserOnly
          fallback={
            <div className={styles.loadingFallback}>
              <Translate id="playground.loading">
                Loading playground...
              </Translate>
            </div>
          }
        >
          {() => <PlaygroundCore />}
        </BrowserOnly>
      </main>
    </Layout>
  );
}
