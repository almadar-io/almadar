import React from 'react';
import { MindMapHeaderProps } from '../types/mindMapTypes';

const MindMapHeader: React.FC<MindMapHeaderProps> = ({
  zoom,
  layoutType,
  onZoomIn,
  onZoomOut,
  onToggleLayout
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 sm:p-4">
      <div className="flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button 
              className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded transition-all duration-200 font-medium" 
              onClick={onZoomOut}
              title="Zoom Out"
            >
              -
            </button>
            <span className="px-2 text-sm font-medium text-gray-700 dark:text-gray-200 min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button 
              className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded transition-all duration-200 font-medium" 
              onClick={onZoomIn}
              title="Zoom In"
            >
              +
            </button>
          </div>
          <button 
            className="px-2 sm:px-3 py-2 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg transition-all duration-200 font-medium text-xs sm:text-sm whitespace-nowrap"
            onClick={onToggleLayout}
            title={`Switch to ${layoutType === 'horizontal' ? 'vertical' : 'horizontal'} layout`}
          >
            {layoutType === 'horizontal' ? '↔️ Horizontal' : '↕️ Vertical'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MindMapHeader;
