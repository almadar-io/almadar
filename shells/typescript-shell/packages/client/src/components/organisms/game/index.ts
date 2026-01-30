/**
 * Game Organism Components
 *
 * Complex UI patterns for game interfaces.
 *
 * @packageDocumentation
 */

export { GameCanvas, type GameCanvasProps, type GameEntity, type EntityRenderer, type CollisionDef } from './GameCanvas';
export { GameHud, type GameHudProps, type GameHudStat, type GameHudElement } from './GameHud';
export { GameControls, type GameControlsProps, type GameControl } from './GameControls';
export { GameMenu, type GameMenuProps, type MenuOption } from './GameMenu';
export { GamePauseOverlay, type GamePauseOverlayProps, type PauseOption } from './GamePauseOverlay';
export { GameOverScreen, type GameOverScreenProps, type GameOverStat, type GameOverAction } from './GameOverScreen';
export { LevelSelect, type LevelSelectProps, type LevelData, type LevelFieldDisplay } from './LevelSelect';

// NOTE: GameProvider was REMOVED - game logic is now schema-driven.
// Each trait generates its own useEffect hooks for ticks.
// The game canvas just renders entity state from useEntities.

// New components for Phase 3
export { TilemapRenderer, type TilemapRendererProps, type TileLayer as TilemapTileLayer, type Tileset as TilemapTileset, type ParallaxConfig } from './TilemapRenderer';
export { InventoryPanel, type InventoryPanelProps, type InventoryItem } from './InventoryPanel';
export { DialogueBox, type DialogueBoxProps, type DialogueNode, type DialogueChoice } from './DialogueBox';

// System components (invisible, for render_ui pattern)
export { InputListener, type InputListenerProps, type InputBinding } from './InputListener';
export { CollisionDetector, type CollisionDetectorProps, type CollisionRule } from './CollisionDetector';
