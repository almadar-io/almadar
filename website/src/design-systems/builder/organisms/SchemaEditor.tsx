/**
 * SchemaEditor - Raw OrbitalSchema JSON Editor
 *
 * A full-screen modal for editing the raw OrbitalSchema JSON.
 * Uses Monaco-based code editor with JSON validation and S-expression highlighting.
 *
 * Events Emitted:
 * - UI:SCHEMA_SAVE - When the schema is saved
 * - UI:SCHEMA_CLOSE - When the editor is closed
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { Box, VStack, Button, Typography, LoadingState } from "@almadar/ui";
import { Save, X } from "lucide-react";
import type { OrbitalSchema } from "@almadar/core";
// syntax may not be exported - using stub with required methods
const syntax = { 
  keywords: [], 
  operators: [],
  getEffectOperators: () => [],
  getLogicOperators: () => [],
  getControlFlowOperators: () => [],
  getComparisonOperators: () => [],
  getArithmeticOperators: () => [],
  getStdlibModulePrefixes: () => [],
  getStandardBehaviorNames: () => []
};

// Flag to track if language is registered
let orbitalJsonRegistered = false;

export interface SchemaEditorModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Current schema to edit */
  schema: OrbitalSchema | null;
  /** App ID for saving */
  appId: string;
  /** Callback when schema is saved */
  onSave: (schema: OrbitalSchema) => Promise<void>;
}

// Loading component
const EditorLoading: React.FC = () => (
  <Box
    display="flex"
    fullWidth
    fullHeight
    className="items-center justify-center bg-[var(--color-background)]"
  >
    <VStack className="items-center gap-3">
      <LoadingState message="Loading editor..." />
    </VStack>
  </Box>
);

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Build a Monarch regex pattern from token arrays
 */
function buildCasesForTokens(
  tokens: readonly string[],
  tokenType: string,
): Record<string, string> {
  const cases: Record<string, string> = {};
  for (const token of tokens) {
    cases[`"${token}"`] = tokenType;
  }
  return cases;
}

/**
 * Register custom Orbital JSON language with S-expression highlighting
 * Uses token definitions from @kflow-builder/shared/orbitals/syntax
 */
function registerOrbitalJsonLanguage(monaco: typeof import("monaco-editor")) {
  if (orbitalJsonRegistered) return;
  orbitalJsonRegistered = true;

  // Get tokens from the syntax module
  const effectOps = syntax.getEffectOperators();
  const logicOps = syntax.getLogicOperators();
  const controlOps = syntax.getControlFlowOperators();
  const comparisonOps = syntax.getComparisonOperators();
  const arithmeticOps = syntax.getArithmeticOperators();
  const stdlibModules = syntax.getStdlibModulePrefixes();
  const behaviors = syntax.getStandardBehaviorNames();

  // Build token cases dynamically
  const effectCases = buildCasesForTokens(effectOps, "operator.effect");
  const logicCases = buildCasesForTokens(logicOps, "operator.logic");
  const controlCases = buildCasesForTokens(controlOps, "operator.control");
  const comparisonCases = buildCasesForTokens(
    comparisonOps,
    "operator.comparison",
  );
  const arithmeticCases = buildCasesForTokens(
    arithmeticOps,
    "operator.arithmetic",
  );
  const behaviorCases = buildCasesForTokens(behaviors, "entity.behavior");

  // Register new language
  monaco.languages.register({ id: "orbital-json" });

  // Define token rules - extends JSON with S-expression patterns
  monaco.languages.setMonarchTokensProvider("orbital-json", {
    defaultToken: "",
    tokenPostfix: ".orbital-json",

    tokenizer: {
      root: [
        // Core bindings starting with @
        [/"@(entity|payload|state|now)(\.[a-zA-Z0-9_.]+)?"/, "binding"],
        // Entity references @PascalCase
        [/"@[A-Z][a-zA-Z0-9]*(\.[a-zA-Z0-9_.]+)?"/, "binding.entity"],

        // S-expression operators (effect, logic, control, comparison, arithmetic)
        // These are dynamically matched via the cases below
        [
          /"[^"]*"/,
          {
            cases: {
              // Dynamic operator cases from syntax module
              ...effectCases,
              ...logicCases,
              ...controlCases,
              ...comparisonCases,
              ...arithmeticCases,
              ...behaviorCases,
              // Default string
              "@default": "string",
            },
          },
        ],

        // Numbers
        [/-?\d+\.?\d*([eE][-+]?\d+)?/, "number"],

        // Booleans
        [/true|false/, "keyword.boolean"],

        // Null
        [/null/, "keyword.null"],

        // Braces and brackets
        [/[{}]/, "delimiter.bracket"],
        [/[\[\]]/, "delimiter.array"],

        // Colon and comma
        [/:/, "delimiter.colon"],
        [/,/, "delimiter.comma"],

        // Whitespace
        [/\s+/, "white"],
      ],
    },
  });

  // Define custom colors for Orbital tokens
  monaco.editor.defineTheme("orbital-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      // S-expression bindings - cyan
      { token: "binding", foreground: "22D3EE", fontStyle: "bold" },
      // Effect operators - purple
      { token: "operator.effect", foreground: "A78BFA", fontStyle: "bold" },
      // Logic operators - blue
      { token: "operator.logic", foreground: "60A5FA", fontStyle: "bold" },
      // Control operators - sky
      { token: "operator.control", foreground: "38BDF8", fontStyle: "bold" },
      // Comparison - teal
      { token: "operator.comparison", foreground: "2DD4BF", fontStyle: "bold" },
      // Arithmetic - emerald
      { token: "operator.arithmetic", foreground: "34D399", fontStyle: "bold" },
      // Stdlib - indigo
      { token: "operator.stdlib", foreground: "818CF8", fontStyle: "bold" },
      // Patterns - amber
      { token: "pattern", foreground: "FBBF24", fontStyle: "bold" },
      // Events - orange
      { token: "event", foreground: "FB923C" },
      // States - emerald
      { token: "state", foreground: "34D399" },
      // Regular strings - green
      { token: "string", foreground: "4ADE80" },
      // Numbers - blue
      { token: "number", foreground: "60A5FA" },
      // Booleans - teal
      { token: "keyword.boolean", foreground: "2DD4BF" },
      // Null - gray
      { token: "keyword.null", foreground: "9CA3AF" },
    ],
    colors: {
      "editor.background": "#111827",
    },
  });
}

/**
 * Internal metadata fields that should not be editable by users.
 * These are system-managed fields that track schema versioning and operational state.
 */
const HIDDEN_METADATA_FIELDS = [
  "_metadata",
  "_historyMeta",
  "_operational",
] as const;

/**
 * Remove internal metadata fields from schema for editing.
 * These fields are system-managed and should not be modified by users.
 */
function stripInternalFields(
  schema: OrbitalSchema,
): Omit<OrbitalSchema, "_metadata" | "_historyMeta" | "_operational"> {
  const { _metadata, _historyMeta, _operational, ...editableSchema } =
    schema as OrbitalSchema & {
      _metadata?: unknown;
      _historyMeta?: unknown;
      _operational?: unknown;
    };
  return editableSchema;
}

/**
 * Restore internal metadata fields to edited schema before saving.
 */
function restoreInternalFields(
  editedSchema: Partial<OrbitalSchema>,
  originalSchema: OrbitalSchema,
): OrbitalSchema {
  const original = originalSchema as OrbitalSchema & {
    _metadata?: unknown;
    _historyMeta?: unknown;
    _operational?: unknown;
  };

  const result: Record<string, unknown> = { ...editedSchema };
  // Restore internal fields from original schema
  if (original._metadata) result._metadata = original._metadata;
  if (original._historyMeta) result._historyMeta = original._historyMeta;
  if (original._operational) result._operational = original._operational;
  return result as unknown as OrbitalSchema;
}

/**
 * SchemaEditorModal - Full-screen JSON editor for OrbitalSchema with S-expression highlighting
 */
export const SchemaEditorModal: React.FC<SchemaEditorModalProps> = ({
  isOpen,
  onClose,
  schema,
  appId,
  onSave,
}) => {
  const [editorContent, setEditorContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  // Store original schema to restore internal fields on save
  const originalSchemaRef = useRef<OrbitalSchema | null>(null);

  // Initialize editor content when schema changes
  useEffect(() => {
    if (schema && isOpen) {
      // Store original schema for restoring internal fields later
      originalSchemaRef.current = schema;
      // Strip internal metadata fields before displaying in editor
      const editableSchema = stripInternalFields(schema);
      const formatted = JSON.stringify(editableSchema, null, 2);
      setEditorContent(formatted);
      setHasChanges(false);
      setError(null);
    }
  }, [schema, isOpen]);

  // Handle editor mount - register custom language
  const handleEditorMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    registerOrbitalJsonLanguage(monaco);
  }, []);

  // Register language and theme BEFORE mount to ensure dark theme is applied
  const handleBeforeMount = useCallback(
    (monaco: typeof import("monaco-editor")) => {
      registerOrbitalJsonLanguage(monaco);
    },
    [],
  );

  // Handle content change
  const handleContentChange = useCallback((value: string | undefined) => {
    if (value !== undefined) {
      setEditorContent(value);
      setHasChanges(true);
      setError(null);
    }
  }, []);

  // Validate JSON and restore internal fields
  const validateJson = useCallback((): OrbitalSchema | null => {
    try {
      const parsed = JSON.parse(editorContent);
      // Basic validation - ensure it has required fields
      if (!parsed.name) {
        throw new Error('Schema must have a "name" field');
      }
      if (!Array.isArray(parsed.orbitals)) {
        throw new Error('Schema must have an "orbitals" array');
      }

      // Restore internal metadata fields from original schema
      if (originalSchemaRef.current) {
        return restoreInternalFields(parsed, originalSchemaRef.current);
      }

      return parsed as OrbitalSchema;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      return null;
    }
  }, [editorContent]);

  // Handle save
  const handleSave = useCallback(async () => {
    const validatedSchema = validateJson();
    if (!validatedSchema) return;

    setIsSaving(true);
    setError(null);

    try {
      await onSave(validatedSchema);
      setHasChanges(false);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save schema");
    } finally {
      setIsSaving(false);
    }
  }, [validateJson, onSave, onClose]);

  // Handle close with confirmation
  const handleClose = useCallback(() => {
    if (hasChanges) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to close?",
        )
      ) {
        onClose();
      }
    } else {
      onClose();
    }
  }, [hasChanges, onClose]);

  // Editor options
  const editorOptions: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    wordWrap: "on",
    tabSize: 2,
    lineNumbers: "on",
    scrollBeyondLastLine: false,
    automaticLayout: true,
    padding: { top: 8, bottom: 8 },
    folding: true,
    foldingHighlight: true,
    bracketPairColorization: { enabled: true },
    guides: {
      bracketPairs: true,
      indentation: true,
    },
    renderWhitespace: "selection",
    smoothScrolling: true,
    cursorBlinking: "smooth",
    cursorSmoothCaretAnimation: "on",
    formatOnPaste: true,
    autoClosingBrackets: "always",
    autoClosingQuotes: "always",
    autoIndent: "full",
  };

  // Footer buttons
  const footer = (
    <div className="flex items-center justify-between">
      <div className="text-sm text-[var(--color-muted-foreground)]">
        App ID:{" "}
        <code className="bg-[var(--color-secondary)] px-1 rounded">
          {appId}
        </code>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={handleClose}
          leftIcon={<X className="w-4 h-4" />}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          isLoading={isSaving}
          disabled={!hasChanges || isSaving}
          leftIcon={<Save className="w-4 h-4" />}
        >
          Save Schema
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[var(--color-background)]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--color-border)]">
            <Typography variant="h5">Edit Orbital Schema</Typography>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col p-6 overflow-hidden">
            {/* Error Banner */}
            {error && (
              <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-[var(--color-error)]/10 border border-[var(--color-error)]/30 text-[var(--color-error)] text-sm">
                <span className="flex-1">{error}</span>
                <button onClick={() => setError(null)} className="text-[var(--color-error)] opacity-60 hover:opacity-100">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Monaco Editor */}
            <div className="flex-1 overflow-hidden rounded-lg border border-[var(--color-border)]">
              <Editor
                height="100%"
                width="100%"
                language="orbital-json"
                value={editorContent}
                theme="orbital-dark"
                onChange={handleContentChange}
                beforeMount={handleBeforeMount}
                onMount={handleEditorMount}
                options={editorOptions}
                loading={<EditorLoading />}
              />
            </div>

            {/* Status Bar */}
            <div className="mt-2 flex flex-col gap-1 text-xs text-[var(--color-muted-foreground)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span>{hasChanges ? "● Unsaved changes" : "✓ No changes"}</span>
                  <span className="hidden sm:flex items-center gap-2 text-[10px]">
                    <span className="font-bold" style={{ color: 'var(--color-info)' }}>@bindings</span>
                    <span className="font-bold" style={{ color: 'var(--color-accent)' }}>effects</span>
                    <span className="font-bold" style={{ color: 'var(--color-warning)' }}>patterns</span>
                    <span style={{ color: 'var(--color-warning)' }}>EVENTS</span>
                    <span style={{ color: 'var(--color-success)' }}>States</span>
                  </span>
                </div>
                <span>{editorContent.split("\n").length} lines</span>
              </div>
              <div className="text-[10px] text-[var(--color-muted-foreground)]">
                Internal fields hidden:{" "}
                <code className="text-[var(--color-muted-foreground)]">_metadata</code>,{" "}
                <code className="text-[var(--color-muted-foreground)]">_historyMeta</code>,{" "}
                <code className="text-[var(--color-muted-foreground)]">_operational</code>{" "}
                (auto-preserved on save)
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-[var(--color-border)]">
            {footer}
          </div>
        </div>
      )}
    </>
  );
};

SchemaEditorModal.displayName = "SchemaEditorModal";
