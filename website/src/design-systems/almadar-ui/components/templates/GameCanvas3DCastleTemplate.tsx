/**
 * GameCanvas3DCastleTemplate
 *
 * Pure declarative template wrapper for 3D castle/settlement view.
 * Shows castle layout with buildings and garrisoned units.
 *
 * Page: Castle3DPage, Settlement3DPage
 * Entity: Castle3D, Settlement3D
 * ViewType: detail
 *
 * Events Emitted:
 * - BUILDING_SELECTED - When a building is clicked
 * - UNIT_SELECTED - When a garrison unit is clicked
 * - BUILD - When building/upgrading
 * - RECRUIT - When recruiting units
 * - EXIT - When exiting castle view
 *
 * @packageDocumentation
 */

import React from 'react';
import { GameCanvas3D, type GameCanvas3DProps } from '../organisms/game/GameCanvas3D';
import type { IsometricTile, IsometricUnit, IsometricFeature } from '../organisms/game/types/isometric';

export interface Castle3DEntity {
    /** Castle grounds tiles */
    tiles: IsometricTile[];
    /** Garrisoned units */
    units: IsometricUnit[];
    /** Buildings and structures */
    features: IsometricFeature[];
    /** Castle name */
    name?: string;
    /** Castle level */
    level?: number;
    /** Owner faction */
    owner?: string;
    /** Entity ID */
    id?: string;
}

export interface GameCanvas3DCastleTemplateProps {
    /** Castle entity data */
    entity: Castle3DEntity;
    /** 3D camera mode */
    cameraMode?: 'isometric' | 'perspective' | 'top-down';
    /** Show grid helper */
    showGrid?: boolean;
    /** Enable shadows */
    shadows?: boolean;
    /** Background color */
    backgroundColor?: string;
    /** Event name for building clicks */
    buildingClickEvent?: string;
    /** Event name for unit clicks */
    unitClickEvent?: string;
    /** Event name for build action */
    buildEvent?: string;
    /** Event name for recruit action */
    recruitEvent?: string;
    /** Event name for exit */
    exitEvent?: string;
    /** Currently selected building ID */
    selectedBuildingId?: string | null;
    /** Available build positions */
    availableBuildSites?: Array<{ x: number; z: number }>;
    /** Show castle name header */
    showHeader?: boolean;
    /** Additional CSS classes */
    className?: string;
}

/**
 * GameCanvas3DCastleTemplate Component
 *
 * Template for 3D castle/settlement management view.
 *
 * @example
 * ```tsx
 * <GameCanvas3DCastleTemplate
 *     entity={castleEntity}
 *     cameraMode="isometric"
 *     showHeader={true}
 *     buildingClickEvent="SELECT_BUILDING"
 *     buildEvent="BUILD_STRUCTURE"
 * />
 * ```
 */
export function GameCanvas3DCastleTemplate({
    entity,
    cameraMode = 'isometric',
    showGrid = true,
    shadows = true,
    backgroundColor = '#1e1e2e',
    buildingClickEvent,
    unitClickEvent,
    buildEvent,
    recruitEvent,
    exitEvent,
    selectedBuildingId,
    availableBuildSites,
    showHeader = true,
    className,
}: GameCanvas3DCastleTemplateProps): JSX.Element {
    return (
        <div className={`game-canvas-3d-castle-template ${className || ''}`}>
            {/* Castle header */}
            {showHeader && entity.name && (
                <div className="castle-template__header">
                    <h2 className="header__name">{entity.name}</h2>
                    {entity.level && (
                        <span className="header__level">Level {entity.level}</span>
                    )}
                    {entity.owner && (
                        <span className="header__owner">{entity.owner}</span>
                    )}
                </div>
            )}

            <GameCanvas3D
                tiles={entity.tiles}
                units={entity.units}
                features={entity.features}
                cameraMode={cameraMode}
                showGrid={showGrid}
                showCoordinates={false}
                showTileInfo={false}
                shadows={shadows}
                backgroundColor={backgroundColor}
                featureClickEvent={buildingClickEvent}
                unitClickEvent={unitClickEvent}
                selectedTileIds={selectedBuildingId ? [selectedBuildingId] : []}
                validMoves={availableBuildSites}
                className="game-canvas-3d-castle-template__canvas"
            />

            {/* Garrison info overlay */}
            {entity.units.length > 0 && (
                <div className="castle-template__garrison-info">
                    <span className="garrison-info__label">Garrison:</span>
                    <span className="garrison-info__count">{entity.units.length} units</span>
                </div>
            )}
        </div>
    );
}

GameCanvas3DCastleTemplate.displayName = 'GameCanvas3DCastleTemplate';

export default GameCanvas3DCastleTemplate;
