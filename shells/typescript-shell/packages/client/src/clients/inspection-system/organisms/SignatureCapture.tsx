/**
 * SignatureCapture
 *
 * Canvas-based signature capture component.
 * Used for collecting digital signatures from participants.
 *
 * Event Contract:
 * - Emits: UI:SIGNATURE_CAPTURED { signatureData, participantId, context }
 */

import React, { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { useEventBus } from "../../../hooks/useEventBus";
import { Eraser, Check, RotateCcw, Pen } from "lucide-react";

export interface SignatureCaptureProps {
  /** Participant ID */
  participantId?: string;
  /** Participant name for display */
  participantName?: string;
  /** Title */
  title?: string;
  /** Instructions text */
  instructions?: string;
  /** Canvas width */
  width?: number;
  /** Canvas height */
  height?: number;
  /** Stroke color */
  strokeColor?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Required signature */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Signature captured handler */
  onCapture?: (signatureData: string) => void;
  /** Clear handler */
  onClear?: () => void;
}

export const SignatureCapture: React.FC<SignatureCaptureProps> = ({
  participantId,
  participantName,
  title = "Signature",
  instructions = "Please sign in the box below",
  width = 400,
  height = 200,
  strokeColor = "#1e293b",
  strokeWidth = 2,
  required = false,
  disabled = false,
  className,
  onCapture,
  onClear,
}) => {
  const eventBus = useEventBus();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set up canvas
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Fill with white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }, [width, height, strokeColor, strokeWidth]);

  const getPos = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      if ("touches" in e) {
        const touch = e.touches[0];
        return {
          x: (touch.clientX - rect.left) * scaleX,
          y: (touch.clientY - rect.top) * scaleY,
        };
      }

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    []
  );

  const startDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (disabled) return;
      e.preventDefault();
      const pos = getPos(e);
      setIsDrawing(true);
      setLastPos(pos);
    },
    [disabled, getPos]
  );

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!isDrawing || disabled) return;
      e.preventDefault();

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx) return;

      const pos = getPos(e);

      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();

      setLastPos(pos);
      setHasSignature(true);
    },
    [isDrawing, disabled, getPos, lastPos]
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const handleClear = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    setHasSignature(false);
    onClear?.();
  }, [width, height, onClear]);

  const handleCapture = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature) return;

    const signatureData = canvas.toDataURL("image/png");
    onCapture?.(signatureData);
    eventBus.emit("UI:SIGNATURE_CAPTURED", {
      signatureData,
      participantId,
      context: { participantName },
    });
  }, [hasSignature, participantId, participantName, onCapture, eventBus]);

  return (
    <Card className={cn("p-4", className)}>
      <VStack gap="md">
        {/* Header */}
        <VStack gap="xs">
          <HStack justify="between" align="center">
            <Typography variant="h4" className="text-neutral-800">
              {title}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Typography>
            {participantName && (
              <Typography variant="small" className="text-neutral-500">
                {participantName}
              </Typography>
            )}
          </HStack>
          <Typography variant="small" className="text-neutral-500">
            {instructions}
          </Typography>
        </VStack>

        {/* Canvas */}
        <Box
          border
          rounded="lg"
          className={cn(
            "relative overflow-hidden bg-white",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="w-full touch-none"
            style={{ maxWidth: width }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />

          {/* Signature line */}
          <Box
            className="absolute bottom-8 left-4 right-4 border-b border-dashed border-neutral-300"
          />

          {/* Empty state indicator */}
          {!hasSignature && !disabled && (
            <Box className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <HStack gap="xs" align="center" className="text-neutral-300">
                <Pen className="h-5 w-5" />
                <Typography variant="small">Sign here</Typography>
              </HStack>
            </Box>
          )}
        </Box>

        {/* Actions */}
        <HStack justify="between" align="center">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleClear}
            disabled={disabled || !hasSignature}
            className="gap-1"
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleCapture}
            disabled={disabled || !hasSignature}
            className="gap-1"
          >
            <Check className="h-4 w-4" />
            Confirm Signature
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

SignatureCapture.displayName = "SignatureCapture";
