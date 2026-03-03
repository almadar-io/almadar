/**
 * ShareableLinkGenerator
 *
 * Generate and copy shareable links for meal plans, workouts, etc.
 * Trainers often share content with trainees via links.
 *
 * Event Contract:
 * - Emits: UI:LINK_GENERATED - when a new link is generated
 * - Emits: UI:LINK_COPIED - when link is copied to clipboard
 * - Payload: { resourceType, resourceId, link }
 */

import React, { useCallback, useState } from "react";
import { Link, Copy, Check, RefreshCw } from "lucide-react";
import {
  cn,
  Box,
  HStack,
  Typography,
  Button,
  useEventBus,
} from '@almadar/ui';

export interface ShareableLinkGeneratorProps {
  /** Type of resource to share */
  resourceType: string;
  /** ID of resource */
  resourceId: string;
  /** Existing share link (if already generated) */
  existingLink?: string;
  /** Link expiration in days */
  expiresInDays?: number;
  /** Compact mode */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const ShareableLinkGenerator: React.FC<ShareableLinkGeneratorProps> = ({
  resourceType,
  resourceId,
  existingLink,
  expiresInDays,
  compact = false,
  className,
}) => {
  const eventBus = useEventBus();
  const [link, setLink] = useState<string | undefined>(existingLink);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Generate a shareable link
  const handleGenerate = useCallback(() => {
    setGenerating(true);

    // Emit event for backend to generate actual link
    eventBus.emit("UI:LINK_GENERATED", {
      resourceType,
      resourceId,
      expiresInDays,
    });

    // Simulate link generation (in real app, this would come from backend)
    setTimeout(() => {
      const generatedLink = `${window.location.origin}/share/${resourceType}/${resourceId}`;
      setLink(generatedLink);
      setGenerating(false);
    }, 500);
  }, [eventBus, resourceType, resourceId, expiresInDays]);

  // Copy link to clipboard
  const handleCopy = useCallback(async () => {
    if (!link) return;

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);

      eventBus.emit("UI:LINK_COPIED", {
        resourceType,
        resourceId,
        link,
      });

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  }, [eventBus, link, resourceType, resourceId]);

  if (compact) {
    return (
      <HStack gap="xs" align="center" className={cn(className)}>
        {link ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className={cn(copied && "text-emerald-600")}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGenerate}
            disabled={generating}
          >
            {generating ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Link className="h-4 w-4" />
            )}
          </Button>
        )}
      </HStack>
    );
  }

  return (
    <Box
      rounded="lg"
      border
      padding="sm"
      className={cn("bg-[var(--color-muted)]", className)}
    >
      <HStack gap="sm" align="center">
        <Box
          display="flex"
          rounded="full"
          padding="xs"
          className="items-center justify-center bg-[var(--color-card)] border"
        >
          <Link className="h-4 w-4 text-[var(--color-foreground)]" />
        </Box>

        {link ? (
          <>
            <Box className="flex-1 min-w-0">
              <Typography
                variant="small"
                className="text-[var(--color-foreground)] truncate font-mono"
              >
                {link}
              </Typography>
            </Box>
            <Button
              variant={copied ? "primary" : "secondary"}
              size="sm"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <Typography variant="small" className="text-[var(--color-muted-foreground)] flex-1">
              Generate a shareable link
            </Typography>
            <Button
              variant="primary"
              size="sm"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Link className="h-4 w-4 mr-1" />
                  Generate
                </>
              )}
            </Button>
          </>
        )}
      </HStack>

      {expiresInDays && link && (
        <Typography variant="small" className="text-[var(--color-muted-foreground)] mt-2">
          Link expires in {expiresInDays} days
        </Typography>
      )}
    </Box>
  );
};

ShareableLinkGenerator.displayName = "ShareableLinkGenerator";
