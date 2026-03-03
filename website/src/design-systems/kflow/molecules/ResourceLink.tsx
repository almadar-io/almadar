/**
 * ResourceLink — Styled external resource link with domain tag.
 *
 * Events Emitted:
 * - UI:OPEN_RESOURCE — When the link is clicked (trait handles navigation)
 *
 * entityAware: false
 */

import React from "react";
import {
  Box,
  HStack,
  Typography,
  Icon,
  useEventBus,
} from "@almadar/ui";
import { ExternalLink } from "lucide-react";
import { DomainBadge } from "../atoms/DomainBadge";
import type { KnowledgeDomainType } from "../types/knowledge";

export interface ResourceLinkProps {
  url: string;
  title?: string;
  domain?: KnowledgeDomainType;
  className?: string;
}

/** Extract a display title from a URL */
function urlToTitle(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return hostname;
  } catch {
    return url;
  }
}

export const ResourceLink: React.FC<ResourceLinkProps> = ({
  url,
  title,
  domain,
  className,
}) => {
  const { emit } = useEventBus();
  const displayTitle = title || urlToTitle(url);

  const handleClick = () => {
    emit("UI:OPEN_RESOURCE", { url, title: displayTitle });
  };

  return (
    <HStack gap="sm" align="center" className={className}>
      <Icon icon={ExternalLink} size="sm" color="muted" />
      <Box className="cursor-pointer hover:underline" onClick={handleClick}>
        <Typography
          variant="body"
          size="sm"
          color="primary"
          truncate
        >
          {displayTitle}
        </Typography>
      </Box>
      {domain && <DomainBadge domain={domain} size="sm" />}
    </HStack>
  );
};

ResourceLink.displayName = "ResourceLink";
