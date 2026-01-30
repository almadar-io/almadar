/**
 * TilemapRenderer Component
 *
 * Canvas-based tilemap renderer with culling and parallax support.
 */

import React, { useEffect, useRef, useCallback } from 'react';

export interface TileLayer {
  name: string;
  data: number[];
  width: number;
  height: number;
  visible?: boolean;
}

export interface Tileset {
  url: string;
  tileWidth: number;
  tileHeight: number;
  columns: number;
}

export interface ParallaxConfig {
  layer: string;
  factor: number; // 0.5 = half speed, 1 = normal, 2 = double speed
}

export interface TilemapRendererProps {
  /** Tile layers to render */
  layers: TileLayer[];
  /** Tileset configuration */
  tileset: Tileset;
  /** Camera position */
  camera: { x: number; y: number };
  /** Viewport width in pixels */
  viewportWidth: number;
  /** Viewport height in pixels */
  viewportHeight: number;
  /** Enable pixel art rendering (no smoothing) */
  pixelArt?: boolean;
  /** Parallax configuration per layer */
  parallaxLayers?: ParallaxConfig[];
  /** Optional className */
  className?: string;
  /** Scale factor for rendering */
  scale?: number;
  /** Show debug grid */
  debug?: boolean;
}

/**
 * Tilemap renderer component with efficient canvas-based rendering
 *
 * @example
 * ```tsx
 * <TilemapRenderer
 *   layers={levelData.layers}
 *   tileset={{
 *     url: '/tilesets/terrain.png',
 *     tileWidth: 16,
 *     tileHeight: 16,
 *     columns: 16
 *   }}
 *   camera={{ x: playerX - 160, y: playerY - 120 }}
 *   viewportWidth={320}
 *   viewportHeight={240}
 *   pixelArt
 *   scale={2}
 * />
 * ```
 */
export function TilemapRenderer({
  layers,
  tileset,
  camera,
  viewportWidth,
  viewportHeight,
  pixelArt = true,
  parallaxLayers = [],
  className,
  scale = 1,
  debug = false,
}: TilemapRendererProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tilesetImageRef = useRef<HTMLImageElement | null>(null);
  const tilesetLoadedRef = useRef(false);

  // Load tileset image
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      tilesetImageRef.current = img;
      tilesetLoadedRef.current = true;
    };
    img.onerror = () => {
      console.error(`Failed to load tileset: ${tileset.url}`);
    };
    img.src = tileset.url;

    return () => {
      tilesetImageRef.current = null;
      tilesetLoadedRef.current = false;
    };
  }, [tileset.url]);

  // Get parallax factor for a layer
  const getParallaxFactor = useCallback((layerName: string): number => {
    const config = parallaxLayers.find(p => p.layer === layerName);
    return config?.factor ?? 1;
  }, [parallaxLayers]);

  // Render tilemap
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const tilesetImage = tilesetImageRef.current;
    if (!canvas || !tilesetImage || !tilesetLoadedRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configure rendering
    ctx.imageSmoothingEnabled = !pixelArt;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply scale
    ctx.save();
    ctx.scale(scale, scale);

    // Render each visible layer
    for (const layer of layers) {
      if (layer.visible === false) continue;

      const parallaxFactor = getParallaxFactor(layer.name);
      const offsetX = camera.x * parallaxFactor;
      const offsetY = camera.y * parallaxFactor;

      // Calculate visible tile range (with some padding for smooth scrolling)
      const startTileX = Math.max(0, Math.floor(offsetX / tileset.tileWidth) - 1);
      const startTileY = Math.max(0, Math.floor(offsetY / tileset.tileHeight) - 1);
      const endTileX = Math.min(
        layer.width,
        Math.ceil((offsetX + viewportWidth / scale) / tileset.tileWidth) + 1
      );
      const endTileY = Math.min(
        layer.height,
        Math.ceil((offsetY + viewportHeight / scale) / tileset.tileHeight) + 1
      );

      // Render visible tiles
      for (let y = startTileY; y < endTileY; y++) {
        for (let x = startTileX; x < endTileX; x++) {
          const tileIndex = y * layer.width + x;
          const tileId = layer.data[tileIndex];

          // Skip empty tiles (ID 0)
          if (tileId === 0) continue;

          // Calculate source position in tileset (tileId is 1-based in Tiled)
          const adjustedTileId = tileId - 1;
          const srcX = (adjustedTileId % tileset.columns) * tileset.tileWidth;
          const srcY = Math.floor(adjustedTileId / tileset.columns) * tileset.tileHeight;

          // Calculate destination position
          const destX = x * tileset.tileWidth - offsetX;
          const destY = y * tileset.tileHeight - offsetY;

          // Draw tile
          ctx.drawImage(
            tilesetImage,
            srcX,
            srcY,
            tileset.tileWidth,
            tileset.tileHeight,
            destX,
            destY,
            tileset.tileWidth,
            tileset.tileHeight
          );
        }
      }

      // Debug: draw grid
      if (debug) {
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.lineWidth = 1 / scale;

        for (let y = startTileY; y <= endTileY; y++) {
          for (let x = startTileX; x <= endTileX; x++) {
            const destX = x * tileset.tileWidth - offsetX;
            const destY = y * tileset.tileHeight - offsetY;
            ctx.strokeRect(destX, destY, tileset.tileWidth, tileset.tileHeight);
          }
        }
      }
    }

    ctx.restore();
  }, [layers, tileset, camera, viewportWidth, viewportHeight, pixelArt, scale, debug, getParallaxFactor]);

  // Re-render when dependencies change
  useEffect(() => {
    render();
  }, [render]);

  // Also re-render when tileset loads
  useEffect(() => {
    const checkAndRender = () => {
      if (tilesetLoadedRef.current) {
        render();
      } else {
        requestAnimationFrame(checkAndRender);
      }
    };
    checkAndRender();
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      width={viewportWidth}
      height={viewportHeight}
      className={className}
      style={{
        imageRendering: pixelArt ? 'pixelated' : 'auto',
      }}
    />
  );
}

export default TilemapRenderer;
