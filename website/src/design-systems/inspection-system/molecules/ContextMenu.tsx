import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { Box, VStack, Button, cn } from '@almadar/ui';

export interface ContextMenuProps {
    actions: string[];
    onAction: (action: string) => void;
    className?: string;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
    actions,
    onAction,
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    if (!actions || actions.length === 0) return null;

    return (
        <div className={cn("relative", className)} ref={menuRef}>
            <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
            >
                <MoreVertical className="h-4 w-4" />
            </Button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg z-50 border border-neutral-200 overflow-hidden">
                    <VStack gap="none" className="py-1">
                        {actions.map((action) => (
                            <button
                                key={action}
                                className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAction(action);
                                    setIsOpen(false);
                                }}
                            >
                                {action}
                            </button>
                        ))}
                    </VStack>
                </div>
            )}
        </div>
    );
};
