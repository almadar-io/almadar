/**
 * Asset Loader
 *
 * Loads and caches game assets (images, spritesheets, audio).
 * Provides tile extraction for tileset-based assets.
 */

// ============================================================================
// Types
// ============================================================================

export interface LoadedAsset {
    type: 'image' | 'spritesheet' | 'audio';
    src: string;
    data: HTMLImageElement | HTMLAudioElement;
    metadata?: SpritesheetMetadata;
}

export interface SpritesheetMetadata {
    tileSize: number;
    columns: number;
    rows: number;
    totalTiles: number;
}

export interface TileRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface AnimationConfig {
    frames: number[];
    fps: number;
    loop: boolean;
}

export interface AssetManifestEntry {
    key: string;
    entityName: string;
    basePath: string;
    path: string;
    tiles?: number[];
    tileSize?: number;
    files?: string[];
    animations?: Record<string, AnimationConfig>;
}

export interface AssetManifest {
    gameType: string;
    style: string;
    assets: Record<string, AssetManifestEntry>;
}

// ============================================================================
// Asset Loader Class
// ============================================================================

class AssetLoaderClass {
    private imageCache: Map<string, HTMLImageElement> = new Map();
    private audioCache: Map<string, HTMLAudioElement> = new Map();
    private metadataCache: Map<string, SpritesheetMetadata> = new Map();
    private loadingPromises: Map<string, Promise<HTMLImageElement | HTMLAudioElement>> = new Map();

    /**
     * Load an image asset.
     * Returns cached image if already loaded.
     */
    async loadImage(src: string): Promise<HTMLImageElement> {
        // Return cached image
        const cached = this.imageCache.get(src);
        if (cached) return cached;

        // Return pending promise if already loading
        const pending = this.loadingPromises.get(src);
        if (pending) return pending as Promise<HTMLImageElement>;

        // Load image
        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';

            img.onload = () => {
                this.imageCache.set(src, img);
                this.loadingPromises.delete(src);
                resolve(img);
            };

            img.onerror = (e) => {
                this.loadingPromises.delete(src);
                reject(new Error(`Failed to load image: ${src}`));
            };

            img.src = src;
        });

        this.loadingPromises.set(src, promise);
        return promise;
    }

    /**
     * Load a tileset/spritesheet with metadata.
     */
    async loadTileset(
        src: string,
        config: { tileSize: number; tiles?: number[]; animations?: Record<string, AnimationConfig> }
    ): Promise<{ image: HTMLImageElement; metadata: SpritesheetMetadata }> {
        const image = await this.loadImage(src);

        // Calculate metadata
        const columns = Math.floor(image.width / config.tileSize);
        const rows = Math.floor(image.height / config.tileSize);
        const metadata: SpritesheetMetadata = {
            tileSize: config.tileSize,
            columns,
            rows,
            totalTiles: columns * rows,
        };

        this.metadataCache.set(src, metadata);

        return { image, metadata };
    }

    /**
     * Load an audio asset.
     */
    async loadAudio(src: string): Promise<HTMLAudioElement> {
        const cached = this.audioCache.get(src);
        if (cached) return cached;

        const pending = this.loadingPromises.get(src);
        if (pending) return pending as Promise<HTMLAudioElement>;

        const promise = new Promise<HTMLAudioElement>((resolve, reject) => {
            const audio = new Audio();

            audio.oncanplaythrough = () => {
                this.audioCache.set(src, audio);
                this.loadingPromises.delete(src);
                resolve(audio);
            };

            audio.onerror = () => {
                this.loadingPromises.delete(src);
                reject(new Error(`Failed to load audio: ${src}`));
            };

            audio.src = src;
            audio.load();
        });

        this.loadingPromises.set(src, promise);
        return promise;
    }

    /**
     * Get tile rectangle for a specific tile index.
     */
    getTileRect(src: string, tileIndex: number): TileRect | null {
        const metadata = this.metadataCache.get(src);
        if (!metadata) return null;

        const col = tileIndex % metadata.columns;
        const row = Math.floor(tileIndex / metadata.columns);

        return {
            x: col * metadata.tileSize,
            y: row * metadata.tileSize,
            width: metadata.tileSize,
            height: metadata.tileSize,
        };
    }

    /**
     * Get tile rectangle from metadata directly.
     */
    getTileRectFromMetadata(metadata: SpritesheetMetadata, tileIndex: number): TileRect {
        const col = tileIndex % metadata.columns;
        const row = Math.floor(tileIndex / metadata.columns);

        return {
            x: col * metadata.tileSize,
            y: row * metadata.tileSize,
            width: metadata.tileSize,
            height: metadata.tileSize,
        };
    }

    /**
     * Check if an image is already loaded.
     */
    isLoaded(src: string): boolean {
        return this.imageCache.has(src);
    }

    /**
     * Get cached image (synchronous, returns null if not loaded).
     */
    getCachedImage(src: string): HTMLImageElement | null {
        return this.imageCache.get(src) ?? null;
    }

    /**
     * Get cached metadata for a tileset.
     */
    getMetadata(src: string): SpritesheetMetadata | null {
        return this.metadataCache.get(src) ?? null;
    }

    /**
     * Preload multiple assets.
     */
    async preload(srcs: string[]): Promise<void> {
        await Promise.all(srcs.map((src) => this.loadImage(src)));
    }

    /**
     * Load all assets from a manifest.
     */
    async loadManifest(manifest: AssetManifest): Promise<Map<string, LoadedAsset>> {
        const loaded = new Map<string, LoadedAsset>();

        for (const [entityName, entry] of Object.entries(manifest.assets)) {
            const src = `${entry.basePath}/${entry.path}`;

            if (entry.tiles && entry.tileSize) {
                // Tileset-based asset
                const { image, metadata } = await this.loadTileset(src, {
                    tileSize: entry.tileSize,
                    tiles: entry.tiles,
                    animations: entry.animations,
                });

                loaded.set(entityName, {
                    type: 'spritesheet',
                    src,
                    data: image,
                    metadata,
                });
            } else if (entry.files) {
                // File-based asset - load first file as representative
                const firstFile = entry.files[0]?.replace('*', '1') ?? '';
                const fileSrc = `${entry.basePath}/${entry.path}/${firstFile}`;
                const image = await this.loadImage(fileSrc);

                loaded.set(entityName, {
                    type: 'image',
                    src: fileSrc,
                    data: image,
                });
            }
        }

        return loaded;
    }

    /**
     * Clear all caches.
     */
    clear(): void {
        this.imageCache.clear();
        this.audioCache.clear();
        this.metadataCache.clear();
        this.loadingPromises.clear();
    }

    /**
     * Clear specific asset from cache.
     */
    unload(src: string): void {
        this.imageCache.delete(src);
        this.audioCache.delete(src);
        this.metadataCache.delete(src);
    }

    /**
     * Get cache statistics.
     */
    getStats(): { images: number; audio: number; loading: number } {
        return {
            images: this.imageCache.size,
            audio: this.audioCache.size,
            loading: this.loadingPromises.size,
        };
    }
}

// ============================================================================
// Singleton Export
// ============================================================================

/**
 * Global asset loader instance.
 * Use this for all asset loading operations.
 */
export const AssetLoader = new AssetLoaderClass();

/**
 * Load an asset (convenience function).
 */
export async function loadAsset(src: string): Promise<HTMLImageElement> {
    return AssetLoader.loadImage(src);
}

/**
 * Load a tileset (convenience function).
 */
export async function loadTileset(
    src: string,
    config: { tileSize: number; tiles?: number[]; animations?: Record<string, AnimationConfig> }
): Promise<{ image: HTMLImageElement; metadata: SpritesheetMetadata }> {
    return AssetLoader.loadTileset(src, config);
}
