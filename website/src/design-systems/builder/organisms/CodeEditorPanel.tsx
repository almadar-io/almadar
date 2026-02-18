/**
 * CodeEditorPanel Organism
 *
 * A Monaco Editor wrapper for code editing in the AI Builder workspace.
 * Provides syntax highlighting, IntelliSense, and other IDE features.
 */

import React, { useCallback, useRef } from 'react';
import Editor, { OnMount, OnChange } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { Box, VStack, LoadingState } from '@almadar/ui';

// =============================================================================
// Language Mapping
// =============================================================================

const EXTENSION_TO_LANGUAGE: Record<string, string> = {
  ts: 'typescript', tsx: 'typescript',
  js: 'javascript', jsx: 'javascript',
  json: 'json', css: 'css', scss: 'scss', less: 'less',
  html: 'html', md: 'markdown', yaml: 'yaml', yml: 'yaml',
  xml: 'xml', sql: 'sql', sh: 'shell', bash: 'shell',
  py: 'python', rb: 'ruby', go: 'go', rs: 'rust',
  java: 'java', kt: 'kotlin', swift: 'swift',
  c: 'c', cpp: 'cpp', h: 'c', hpp: 'cpp',
};

export function getLanguageFromPath(path: string): string {
  const extension = path.split('.').pop()?.toLowerCase() || '';
  return EXTENSION_TO_LANGUAGE[extension] || 'plaintext';
}

// =============================================================================
// Types
// =============================================================================

export interface CodeEditorPanelProps {
  path: string;
  content: string;
  language?: string;
  onChange?: (content: string) => void;
  readOnly?: boolean;
  className?: string;
  theme?: 'vs-dark' | 'light' | 'vs';
  showMinimap?: boolean;
  fontSize?: number;
  wordWrap?: 'on' | 'off' | 'wordWrapColumn' | 'bounded';
  tabSize?: number;
  onMount?: (editor: editor.IStandaloneCodeEditor) => void;
  showLineNumbers?: boolean;
}

// =============================================================================
// Main Component
// =============================================================================

export const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({
  path,
  content,
  language,
  onChange,
  readOnly = false,
  className = '',
  theme = 'vs-dark',
  showMinimap = false,
  fontSize = 14,
  wordWrap = 'on',
  tabSize = 2,
  onMount,
  showLineNumbers = true,
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const detectedLanguage = language || getLanguageFromPath(path);

  const handleEditorMount: OnMount = useCallback(
    (editor, monaco) => {
      editorRef.current = editor;

      if (detectedLanguage === 'typescript' || detectedLanguage === 'javascript') {
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
          target: monaco.languages.typescript.ScriptTarget.ESNext,
          module: monaco.languages.typescript.ModuleKind.ESNext,
          moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
          jsx: monaco.languages.typescript.JsxEmit.React,
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          allowSyntheticDefaultImports: true,
        });
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: true,
          noSyntaxValidation: false,
        });
      }

      onMount?.(editor);
    },
    [detectedLanguage, onMount]
  );

  const handleChange: OnChange = useCallback(
    (value) => {
      if (onChange && value !== undefined) onChange(value);
    },
    [onChange]
  );

  const editorOptions: editor.IStandaloneEditorConstructionOptions = {
    readOnly,
    minimap: { enabled: showMinimap },
    fontSize,
    wordWrap,
    tabSize,
    lineNumbers: showLineNumbers ? 'on' : 'off',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    padding: { top: 8, bottom: 8 },
    folding: true,
    foldingHighlight: true,
    bracketPairColorization: { enabled: true },
    guides: { bracketPairs: true, indentation: true },
    renderWhitespace: 'selection',
    smoothScrolling: true,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: 'on',
    formatOnPaste: true,
    formatOnType: true,
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    acceptSuggestionOnEnter: 'on',
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    autoIndent: 'full',
  };

  return (
    <Box className={`h-full w-full ${className}`}>
      <Editor
        height="100%"
        width="100%"
        language={detectedLanguage}
        value={content}
        theme={theme}
        onChange={handleChange}
        onMount={handleEditorMount}
        options={editorOptions}
        loading={
          <VStack
            align="center"
            justify="center"
            className="w-full h-full"
            style={{ backgroundColor: 'var(--color-card)' }}
          >
            <LoadingState message="Loading editor..." />
          </VStack>
        }
      />
    </Box>
  );
};

CodeEditorPanel.displayName = 'CodeEditorPanel';
export default CodeEditorPanel;
