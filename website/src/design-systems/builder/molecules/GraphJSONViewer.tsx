/**
 * GraphJSONViewer Molecule
 *
 * Modal to display graph JSON with copy-to-clipboard support.
 * Accepts data as prop instead of fetching internally.
 */

import React, { useState } from 'react';
import { X, Copy, Check, Code } from 'lucide-react';
import { Typography, Button, LoadingState, HStack, VStack, Box } from '@almadar/ui';

export interface GraphJSONViewerProps {
  data: unknown | null;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  error?: string | null;
  title?: string;
  className?: string;
}

export const GraphJSONViewer: React.FC<GraphJSONViewerProps> = ({
  data, isOpen, onClose, isLoading = false, error = null, title = 'Graph Inspector', className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      className={`inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${className}`}
    >
      <VStack
        gap="none"
        className="rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] m-4 border"
        style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
      >
        <HStack
          gap="md"
          align="center"
          justify="between"
          className="p-4 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <HStack gap="md" align="center">
            <Typography variant="h6" style={{ color: 'var(--color-foreground)' }}>
              {title}
            </Typography>
            <HStack
              gap="xs"
              align="center"
              className="px-3 py-1 rounded-lg"
              style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-muted-foreground)' }}
            >
              <Code className="w-4 h-4" />
              <Typography variant="small" as="span">JSON</Typography>
            </HStack>
          </HStack>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 transition-colors hover:opacity-80"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            <X className="w-4 h-4" />
          </Button>
        </HStack>

        <Box className="flex-1 overflow-auto p-4">
          {isLoading && (
            <Box className="flex items-center justify-center py-8">
              <LoadingState message="Loading..." />
            </Box>
          )}
          {error && (
            <Typography variant="body2" align="center" className="py-8" style={{ color: 'var(--color-error)' }}>
              {error}
            </Typography>
          )}
          {!isLoading && !error && data != null && (
            <Box position="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(JSON.stringify(data, null, 2))}
                className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded hover:opacity-80"
                style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-foreground)' }}
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <Typography variant="caption" as="span">
                  {copied ? 'Copied!' : 'Copy'}
                </Typography>
              </Button>
              <Box
                as="pre"
                className="text-xs font-mono p-4 rounded-lg overflow-x-auto whitespace-pre-wrap"
                style={{ backgroundColor: 'var(--color-card)', color: 'var(--color-foreground)' }}
              >
                {JSON.stringify(data, null, 2)}
              </Box>
            </Box>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

GraphJSONViewer.displayName = 'GraphJSONViewer';
export default GraphJSONViewer;
