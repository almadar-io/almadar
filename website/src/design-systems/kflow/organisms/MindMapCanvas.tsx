/**
 * MindMapCanvas Organism Component
 *
 * SVG canvas container for mindmap visualization with pan and zoom support.
 *
 * Event Contract:
 * - Emits: UI:MINDMAP_PAN { x, y }
 * - Emits: UI:MINDMAP_ZOOM { zoom }
 * - Emits: UI:MINDMAP_FOCUS
 * - Emits: UI:MINDMAP_BLUR
 * - entityAware: false
 */

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Box, useEventBus } from '@almadar/ui';

export interface MindMapCanvasProps {
  /** Width of the canvas */
  width?: number;
  /** Height of the canvas */
  height?: number;
  /** Initial zoom level */
  initialZoom?: number;
  /** Minimum zoom level */
  minZoom?: number;
  /** Maximum zoom level */
  maxZoom?: number;
  /** Enable pan interaction */
  enablePan?: boolean;
  /** Enable zoom interaction */
  enableZoom?: boolean;
  /** Children to render in the SVG */
  children?: React.ReactNode;
  /** Callback when zoom changes */
  onZoomChange?: (zoom: number) => void;
  /** Callback when pan changes */
  onPanChange?: (pan: { x: number; y: number }) => void;
  /** Additional CSS classes */
  className?: string;
  // Entity-aware props (for schema compatibility)
  /** Entity type */
  entity?: string;
  /** Data to display */
  data?: Record<string, unknown> | unknown;
  /** Actions available */
  actions?: Array<{ label: string; event: string }>;
  /** Fields to display */
  displayFields?: string[];
  /** Show learning goals */
  showLearningGoals?: boolean;
}

export const MindMapCanvas: React.FC<MindMapCanvasProps> = ({
  width,
  height,
  initialZoom = 1,
  minZoom = 0.25,
  maxZoom = 2,
  enablePan = true,
  enableZoom = true,
  children,
  onZoomChange,
  onPanChange,
  className,
}) => {
  const eventBus = useEventBus();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: width || 800,
    height: height || 600,
  });
  const [isFocused, setIsFocused] = useState(false);
  const [zoom, setZoom] = useState(initialZoom);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Auto-size to container
  useEffect(() => {
    if (width && height) {
      return;
    }

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || 800,
          height: containerRef.current.clientHeight || 600,
        });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [width, height]);

  // Handle wheel zoom
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!enableZoom) return;
      e.preventDefault();

      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = Math.max(minZoom, Math.min(maxZoom, zoom * delta));

      setZoom(newZoom);
      eventBus.emit("UI:MINDMAP_ZOOM", { zoom: newZoom });
      onZoomChange?.(newZoom);
    },
    [enableZoom, zoom, minZoom, maxZoom, eventBus, onZoomChange],
  );

  // Handle pan start
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!enablePan || e.button !== 0) return;
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    },
    [enablePan, pan],
  );

  // Handle pan move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning) return;
      const newPan = { x: e.clientX - panStart.x, y: e.clientY - panStart.y };
      setPan(newPan);
      eventBus.emit("UI:MINDMAP_PAN", newPan);
      onPanChange?.(newPan);
    },
    [isPanning, panStart, eventBus, onPanChange],
  );

  // Handle pan end
  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Handle focus
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    eventBus.emit("UI:MINDMAP_FOCUS", {});
  }, [eventBus]);

  // Handle blur
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    eventBus.emit("UI:MINDMAP_BLUR", {});
  }, [eventBus]);

  return (
    <Box
      ref={containerRef}
      className={`flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all duration-200 ${
        isFocused
          ? "border-2 border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-800"
          : "border border-gray-200 dark:border-gray-700"
      } ${className || ""}`}
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          cursor: isPanning ? "grabbing" : enablePan ? "grab" : "default",
        }}
      >
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          {children}
        </g>
      </svg>
    </Box>
  );
};

MindMapCanvas.displayName = "MindMapCanvas";
