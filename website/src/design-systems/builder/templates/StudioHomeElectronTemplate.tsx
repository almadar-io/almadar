/**
 * StudioHomeElectronTemplate - Thin wrapper for Electron home page
 *
 * Delegates all logic to StudioHomeElectronBoard organism.
 *
 * Event Contract:
 * - Emits: UI:OPEN_FILE - When opening a file via file picker
 * - Emits: UI:CREATE_NEW - When creating a new project
 * - Emits: UI:OPEN_RECENT - When opening a recent file
 * - Emits: UI:REMOVE_RECENT - When removing a file from recent list
 * - Emits: UI:CLEAR_RECENT - When clearing all recent files
 */

import React from "react";
import { StudioHomeElectronBoard } from '../organisms/StudioHomeElectronBoard';

export type { RecentFile, StudioHomeElectronEntity } from '../organisms/StudioHomeElectronBoard';

export interface StudioHomeElectronTemplateProps {
  /** Entity containing recent files and app metadata */
  entity: import('../organisms/StudioHomeElectronBoard').StudioHomeElectronEntity;
  /** Additional CSS classes */
  className?: string;
}

export const StudioHomeElectronTemplate: React.FC<StudioHomeElectronTemplateProps> = ({
  entity,
  className,
}) => (
  <StudioHomeElectronBoard
    entity={entity}
    className={className}
    openFileEvent="OPEN_FILE"
    createProjectEvent="CREATE_NEW"
    openRecentEvent="OPEN_RECENT"
    importEvent="IMPORT"
  />
);

StudioHomeElectronTemplate.displayName = "StudioHomeElectronTemplate";

export default StudioHomeElectronTemplate;
