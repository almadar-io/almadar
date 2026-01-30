/**
 * ConfirmDialog Component
 * 
 * Confirmation dialog for destructive or important actions.
 * Composes Modal molecule with Button atoms.
 * 
 * Uses wireframe theme styling (high contrast, sharp edges).
 */
import React from 'react';
import { AlertTriangle, Trash2, Check } from 'lucide-react';
import { Modal, type ModalSize } from '../molecules/Modal';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { Typography } from '../atoms/Typography';
import { cn } from '../../lib/cn';

export type ConfirmDialogVariant = 'danger' | 'warning' | 'info';

export interface ConfirmDialogProps {
    /** Whether the dialog is open */
    isOpen: boolean;
    /** Callback when dialog is closed (cancel or close button) */
    onClose: () => void;
    /** Callback when action is confirmed */
    onConfirm: () => void;
    /** Dialog title */
    title: string;
    /** Dialog message/description */
    message: string | React.ReactNode;
    /** Confirm button text */
    confirmText?: string;
    /** Cancel button text */
    cancelText?: string;
    /** Dialog variant */
    variant?: ConfirmDialogVariant;
    /** Dialog size */
    size?: ModalSize;
    /** Loading state for confirm button */
    isLoading?: boolean;
    /** Additional CSS classes */
    className?: string;
}

const variantConfig = {
    danger: {
        icon: Trash2,
        iconBg: 'bg-black',
        iconColor: 'text-white',
        confirmVariant: 'primary' as const,
    },
    warning: {
        icon: AlertTriangle,
        iconBg: 'bg-black',
        iconColor: 'text-white',
        confirmVariant: 'primary' as const,
    },
    info: {
        icon: Check,
        iconBg: 'bg-black',
        iconColor: 'text-white',
        confirmVariant: 'primary' as const,
    },
};

/**
 * ConfirmDialog - Confirmation dialog for important actions
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
    size = 'sm',
    isLoading = false,
    className,
}) => {
    const config = variantConfig[variant];

    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
            showCloseButton={false}
            closeOnOverlayClick={!isLoading}
            closeOnEscape={!isLoading}
            className={className}
            footer={
                <div className="flex justify-end gap-3">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={config.confirmVariant}
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : confirmText}
                    </Button>
                </div>
            }
        >
            <div className="flex gap-4">
                {/* Icon */}
                <div className={cn(
                    'flex-shrink-0 w-12 h-12 flex items-center justify-center',
                    config.iconBg
                )}>
                    <Icon icon={config.icon} size="lg" className={config.iconColor} />
                </div>

                {/* Content */}
                <div className="flex-1">
                    <Typography variant="h5" className="mb-2">
                        {title}
                    </Typography>
                    {typeof message === 'string' ? (
                        <Typography variant="body2" className="text-neutral-600">
                            {message}
                        </Typography>
                    ) : (
                        message
                    )}
                </div>
            </div>
        </Modal>
    );
};

ConfirmDialog.displayName = 'ConfirmDialog';

export default ConfirmDialog;
