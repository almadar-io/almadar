/**
 * DocumentPreview
 *
 * Preview component for inspection documents and reports.
 * Supports PDF preview with download and print actions.
 *
 * Event Contract:
 * - Emits: UI:DOWNLOAD { documentId, format }
 * - Emits: UI:PRINT { documentId }
 */

import React, { useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { useEventBus } from "../../../hooks/useEventBus";
import {
  FileText,
  Download,
  Printer,
  ExternalLink,
  Eye,
  Calendar,
  User,
} from "lucide-react";

export type DocumentStatus = "draft" | "final" | "signed" | "archived";

export interface DocumentPreviewProps {
  /** Document ID */
  id: string;
  /** Document title */
  title: string;
  /** Document type */
  type?: string;
  /** Preview URL */
  previewUrl?: string;
  /** Download URL */
  downloadUrl?: string;
  /** Document status */
  status?: DocumentStatus;
  /** Created date */
  createdAt?: string;
  /** Created by */
  createdBy?: string;
  /** File size */
  fileSize?: string;
  /** Show inline preview */
  showPreview?: boolean;
  /** Preview height */
  previewHeight?: string;
  /** Additional CSS classes */
  className?: string;
  /** Download handler */
  onDownload?: () => void;
  /** Print handler */
  onPrint?: () => void;
  /** View handler */
  onView?: () => void;
}

const statusConfig: Record<
  DocumentStatus,
  { color: string; label: string }
> = {
  draft: { color: "warning", label: "Draft" },
  final: { color: "success", label: "Final" },
  signed: { color: "primary", label: "Signed" },
  archived: { color: "neutral", label: "Archived" },
};

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  id,
  title,
  type = "PDF",
  previewUrl,
  downloadUrl,
  status = "draft",
  createdAt,
  createdBy,
  fileSize,
  showPreview = false,
  previewHeight = "400px",
  className,
  onDownload,
  onPrint,
  onView,
}) => {
  const eventBus = useEventBus();
  const statusStyle = statusConfig[status];

  const handleDownload = useCallback(() => {
    onDownload?.();
    eventBus.emit("UI:DOWNLOAD", { documentId: id, format: type });

    // If download URL provided, trigger download
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${title}.${type.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [id, title, type, downloadUrl, onDownload, eventBus]);

  const handlePrint = useCallback(() => {
    onPrint?.();
    eventBus.emit("UI:PRINT", { documentId: id });

    // If preview URL provided, open print dialog
    if (previewUrl) {
      const printWindow = window.open(previewUrl, "_blank");
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      }
    }
  }, [id, previewUrl, onPrint, eventBus]);

  const handleView = useCallback(() => {
    onView?.();
    if (previewUrl) {
      window.open(previewUrl, "_blank");
    }
  }, [previewUrl, onView]);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <VStack gap="none">
        {/* Header */}
        <Box padding="md" className="border-b">
          <HStack justify="between" align="start">
            <HStack gap="sm" align="start">
              <Box
                rounded="lg"
                padding="sm"
                className="bg-red-50 text-red-600"
              >
                <FileText className="h-6 w-6" />
              </Box>
              <VStack gap="xs">
                <Typography variant="body" className="font-medium text-neutral-800">
                  {title}
                </Typography>
                <HStack gap="sm" wrap>
                  <Badge variant="outline">{type}</Badge>
                  <Badge variant={statusStyle.color as any}>
                    {statusStyle.label}
                  </Badge>
                  {fileSize && (
                    <Typography variant="small" className="text-neutral-500">
                      {fileSize}
                    </Typography>
                  )}
                </HStack>
              </VStack>
            </HStack>

            {/* Actions */}
            <HStack gap="xs">
              {previewUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleView}
                  className="gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrint}
                className="gap-1"
              >
                <Printer className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDownload}
                className="gap-1"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </HStack>
          </HStack>
        </Box>

        {/* Metadata */}
        {(createdAt || createdBy) && (
          <Box padding="sm" className="bg-neutral-50 border-b">
            <HStack gap="md" wrap>
              {createdAt && (
                <HStack gap="xs" align="center" className="text-neutral-500">
                  <Calendar className="h-3 w-3" />
                  <Typography variant="small">
                    {new Date(createdAt).toLocaleDateString()}
                  </Typography>
                </HStack>
              )}
              {createdBy && (
                <HStack gap="xs" align="center" className="text-neutral-500">
                  <User className="h-3 w-3" />
                  <Typography variant="small">{createdBy}</Typography>
                </HStack>
              )}
            </HStack>
          </Box>
        )}

        {/* Preview */}
        {showPreview && previewUrl ? (
          <Box style={{ height: previewHeight }}>
            <iframe
              src={previewUrl}
              className="w-full h-full border-0"
              title={`Preview of ${title}`}
            />
          </Box>
        ) : showPreview ? (
          <Box
            padding="xl"
            className="bg-neutral-50 flex items-center justify-center"
            style={{ height: previewHeight }}
          >
            <VStack align="center" gap="sm" className="text-neutral-400">
              <Eye className="h-12 w-12" />
              <Typography variant="body">Preview not available</Typography>
              <Button variant="secondary" size="sm" onClick={handleDownload}>
                Download to view
              </Button>
            </VStack>
          </Box>
        ) : null}
      </VStack>
    </Card>
  );
};

DocumentPreview.displayName = "DocumentPreview";
