/**
 * SidePanel Molecule Component
 * 
 * A side panel that slides in from the right (or left) with header and content.
 * Uses Button, Typography atoms.
 */

import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import { cn } from '../../lib/cn';

export interface SidePanelProps {
  /**
   * Panel title
   */
  title: string;

  /**
   * Panel content
   */
  children: React.ReactNode;

  /**
   * Is panel open
   */
  isOpen: boolean;

  /**
   * On close handler
   */
  onClose: () => void;

  /**
   * Panel width
   * @default 'w-96'
   */
  width?: string;

  /**
   * Panel position
   * @default 'right'
   */
  position?: 'left' | 'right';

  /**
   * Show overlay on mobile
   * @default true
   */
  showOverlay?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  title,
  children,
  isOpen,
  onClose,
  width = 'w-96',
  position = 'right',
  showOverlay = true,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      {showOverlay && (
        <div
          className="fixed inset-0 bg-white/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Side Panel */}
      <aside
        className={cn(
          'fixed top-16 lg:top-0 bottom-0 z-[60]',
          'bg-white',
          'border-l-2 border-black',
          position === 'left' && 'border-l-0 border-r-2',
          'flex flex-col',
          'transition-transform duration-300 ease-in-out',
          width,
          position === 'right' ? 'right-0' : 'left-0',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-black sticky top-0 bg-white z-10">
          <Typography variant="h6">{title}</Typography>
          <Button
            variant="ghost"
            size="sm"
            icon={X}
            onClick={onClose}
            aria-label="Close panel"
          >
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto">
          {children}
        </div>
      </aside>
    </>
  );
};

SidePanel.displayName = 'SidePanel';

