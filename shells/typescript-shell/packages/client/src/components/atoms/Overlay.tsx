/**
 * Overlay Atom Component
 * 
 * A fixed backdrop for modals and drawers.
 */
import React from 'react';
import { cn } from '../../lib/cn';

export interface OverlayProps {
    isVisible?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
    blur?: boolean;
}

export const Overlay: React.FC<OverlayProps> = ({
    isVisible = true,
    onClick,
    className,
    blur = true,
}) => {
    if (!isVisible) return null;

    return (
        <div
            className={cn(
                'fixed inset-0 z-40 bg-white/80',
                blur && 'backdrop-blur-sm',
                className
            )}
            onClick={onClick}
            aria-hidden="true"
        />
    );
};

export default Overlay;
