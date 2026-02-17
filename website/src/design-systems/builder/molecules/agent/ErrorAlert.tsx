/**
 * ErrorAlert - Displays an error message with optional retry
 *
 * Event Contract:
 * - Emits: UI:DISMISS_ERROR - When error is dismissed
 * - Emits: UI:RETRY_ACTION - When retry is clicked
 * - Payload: void
 */

import React from "react";
import {
  Box,
  HStack,
  VStack,
  Typography,
  Button,
  Alert,
} from '@almadar/ui';

export interface ErrorAlertProps {
  /** Error message */
  message: string;
  /** Error code if available */
  code?: string;
  /** Retry callback */
  onRetry?: () => void;
  /** Dismiss callback */
  onDismiss?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function ErrorAlert({
  message,
  code,
  onRetry,
  onDismiss,
  className = "",
}: ErrorAlertProps) {
  return (
    <Alert
      variant="error"
      dismissible={!!onDismiss}
      onDismiss={onDismiss}
      className={className}
      actions={
        onRetry && (
          <Button variant="danger" size="sm" onClick={onRetry}>
            Retry
          </Button>
        )
      }
    >
      <VStack gap="xs">
        <Typography variant="body2" color="error">
          {message}
        </Typography>
        {code && (
          <Typography variant="caption" color="error" className="font-mono">
            Code: {code}
          </Typography>
        )}
      </VStack>
    </Alert>
  );
}

export default ErrorAlert;
