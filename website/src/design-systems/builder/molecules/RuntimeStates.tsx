/**
 * RuntimeStates - Reusable loading, error, and empty state molecules
 *
 * Used by the runtime preview system (OrbitalRuntime, OrbitalPreview,
 * PatternRenderer, ShadowPreviewContainer) and page-level loading/error states.
 *
 * All styling via CSS variables — zero Tailwind gray classes.
 */

import React from 'react';
import { Spinner, VStack, Typography, Card, CardContent, Box } from '@almadar/ui';

// ============================================================================
// RuntimeLoading
// ============================================================================

export interface RuntimeLoadingProps {
  /** Loading message */
  message?: string;
  /** Whether to fill the full screen */
  fullScreen?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * RuntimeLoading - Centered spinner with optional message.
 * Replaces inline loading divs across the runtime.
 */
export const RuntimeLoading: React.FC<RuntimeLoadingProps> = ({
  message,
  fullScreen = false,
  className,
}) => {
  return (
    <VStack
      align="center"
      justify="center"
      className={className}
      style={{
        minHeight: fullScreen ? '100vh' : '100%',
        padding: '1rem',
        backgroundColor: fullScreen ? 'var(--color-background)' : undefined,
      }}
    >
      <Spinner size="lg" />
      {message && (
        <Typography
          variant="body"
          style={{ color: 'var(--color-muted-foreground)', marginTop: '0.5rem' }}
        >
          {message}
        </Typography>
      )}
    </VStack>
  );
};

RuntimeLoading.displayName = 'RuntimeLoading';

// ============================================================================
// RuntimeError
// ============================================================================

export interface RuntimeErrorProps {
  /** Error title */
  title?: string;
  /** Error message */
  message: string;
  /** Optional detail (e.g. URL that failed) */
  detail?: string;
  /** Error variant: 'error' (red) or 'warning' (yellow) */
  variant?: 'error' | 'warning';
  /** Additional class name */
  className?: string;
}

/**
 * RuntimeError - Error card with title, message, and optional detail.
 * Replaces inline error divs across the runtime.
 */
export const RuntimeError: React.FC<RuntimeErrorProps> = ({
  title,
  message,
  detail,
  variant = 'error',
  className,
}) => {
  const borderColor = variant === 'error'
    ? 'var(--color-error)'
    : 'var(--color-warning)';
  const titleColor = borderColor;
  const textColor = variant === 'error'
    ? 'var(--color-error)'
    : 'var(--color-warning)';

  return (
    <Box className={className} style={{ padding: '1rem' }}>
      <Card
        style={{
          borderColor,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <CardContent style={{ padding: '1rem' }}>
          {title && (
            <Typography
              variant="body"
              style={{ color: titleColor, fontWeight: 500, marginBottom: '0.25rem' }}
            >
              {title}
            </Typography>
          )}
          <Typography
            variant="body"
            style={{ color: textColor, fontSize: '0.875rem' }}
          >
            {message}
          </Typography>
          {detail && (
            <Typography
              variant="body"
              style={{ color: textColor, fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.8 }}
            >
              {detail}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

RuntimeError.displayName = 'RuntimeError';

// ============================================================================
// RuntimeEmpty
// ============================================================================

export interface RuntimeEmptyProps {
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Additional class name */
  className?: string;
  /** Children for additional content */
  children?: React.ReactNode;
}

/**
 * RuntimeEmpty - Dashed border empty/unknown state.
 * Used for "no traits", "unknown pattern", "no pages" states.
 */
export const RuntimeEmpty: React.FC<RuntimeEmptyProps> = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <Box className={className} style={{ padding: '1rem' }}>
      <VStack
        gap="sm"
        style={{
          padding: '1.5rem',
          border: '1px dashed var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        {title && (
          <Typography
            variant="body"
            style={{
              fontSize: '1.125rem',
              fontWeight: 500,
              color: 'var(--color-foreground)',
            }}
          >
            {title}
          </Typography>
        )}
        {description && (
          <Typography
            variant="body"
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-muted-foreground)',
            }}
          >
            {description}
          </Typography>
        )}
        {children}
      </VStack>
    </Box>
  );
};

RuntimeEmpty.displayName = 'RuntimeEmpty';
