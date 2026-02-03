/**
 * ConnectionBlock Molecule Component
 *
 * Displays connections to prior knowledge, helping learners see how
 * new concepts relate to what they already know.
 *
 * Event Contract:
 * - No events emitted (display-only component)
 * - entityAware: false
 */

import React from "react";
import { Link2 } from "lucide-react";
import { Box } from "../../../../components/atoms/Box";
import { Typography } from "../../../../components/atoms/Typography";
import { Icon } from "../../../../components/atoms/Icon";
import { Card } from "../../../../components/atoms/Card";
import { HStack, VStack } from "../../../../components/atoms/Stack";
import { MarkdownContent } from "../markdown/MarkdownContent";

export interface ConnectionBlockProps {
  /** The connection content (supports markdown) */
  content: string;
  /** Additional CSS classes */
  className?: string;
}

export const ConnectionBlock: React.FC<ConnectionBlockProps> = ({
  content,
  className,
}) => {
  return (
    <Card
      className={`bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 ${className || ""}`}
    >
      <Box className="p-5">
        <HStack gap="md" align="start">
          <Icon
            icon={Link2}
            size="md"
            className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1"
          />
          <VStack gap="sm" className="flex-1">
            <Typography
              variant="h4"
              className="font-semibold text-emerald-900 dark:text-emerald-100"
            >
              Building On What You Know
            </Typography>
            <Box className="text-gray-700 dark:text-gray-300">
              <MarkdownContent content={content} />
            </Box>
          </VStack>
        </HStack>
      </Box>
    </Card>
  );
};

ConnectionBlock.displayName = "ConnectionBlock";
