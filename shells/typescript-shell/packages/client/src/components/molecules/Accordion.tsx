/**
 * Accordion Molecule Component
 * 
 * A collapsible content component with single or multiple open items.
 * Uses Button, Icon, Typography, and Divider atoms.
 */

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { Icon } from '../atoms/Icon';
import { Typography } from '../atoms/Typography';

import { cn } from '../../lib/cn';

export interface AccordionItem {
  /**
   * Item ID (auto-generated from header/title if not provided)
   */
  id?: string;

  /**
   * Item header/title
   */
  header?: React.ReactNode;

  /**
   * Alias for header (pattern compatibility)
   */
  title?: React.ReactNode;

  /**
   * Item content
   */
  content: React.ReactNode;

  /**
   * Disable item
   */
  disabled?: boolean;

  /**
   * Default open state
   */
  defaultOpen?: boolean;
}

export interface AccordionProps {
  /**
   * Accordion items
   */
  items: AccordionItem[];

  /**
   * Allow multiple items open at once
   * @default false
   */
  multiple?: boolean;

  /**
   * Default open items (IDs)
   */
  defaultOpenItems?: string[];

  /**
   * Default open items by index (pattern compatibility)
   */
  defaultOpen?: number[];

  /**
   * Controlled open items (IDs)
   */
  openItems?: string[];

  /**
   * Callback when item opens/closes
   */
  onItemToggle?: (itemId: string, isOpen: boolean) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

// Helper to generate ID from header/title content
function generateItemId(item: AccordionItem, index: number): string {
  if (item.id) return item.id;
  const headerText = item.header ?? item.title;
  if (typeof headerText === 'string') {
    return `accordion-${headerText.toLowerCase().replace(/\s+/g, '-')}-${index}`;
  }
  return `accordion-item-${index}`;
}

// Normalize item to ensure id and header are set
function normalizeItem(item: AccordionItem, index: number): AccordionItem & { id: string; header: React.ReactNode } {
  return {
    ...item,
    id: generateItemId(item, index),
    header: item.header ?? item.title ?? '',
  };
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  multiple = false,
  defaultOpenItems,
  defaultOpen,
  openItems: controlledOpenItems,
  onItemToggle,
  className,
}) => {
  // Normalize items to ensure id and header are always present
  const normalizedItems = items.map((item, index) => normalizeItem(item, index));

  // Resolve default open items - prefer defaultOpenItems (string IDs), fall back to defaultOpen (indices)
  const resolveDefaultOpen = (): string[] => {
    if (defaultOpenItems) return defaultOpenItems;
    if (defaultOpen) {
      return defaultOpen
        .filter(index => index >= 0 && index < normalizedItems.length)
        .map(index => normalizedItems[index].id);
    }
    return normalizedItems.filter(item => item.defaultOpen).map(item => item.id);
  };

  const [internalOpenItems, setInternalOpenItems] = useState<Set<string>>(
    new Set(resolveDefaultOpen())
  );

  const openItemsSet = controlledOpenItems
    ? new Set(controlledOpenItems)
    : internalOpenItems;

  const handleToggle = (itemId: string) => {
    const isOpen = openItemsSet.has(itemId);
    const newOpenItems = new Set(openItemsSet);

    if (isOpen) {
      newOpenItems.delete(itemId);
    } else {
      if (!multiple) {
        newOpenItems.clear();
      }
      newOpenItems.add(itemId);
    }

    if (controlledOpenItems === undefined) {
      setInternalOpenItems(newOpenItems);
    }

    onItemToggle?.(itemId, !isOpen);
  };

  return (
    <div className={cn('w-full', className)}>
      {normalizedItems.map((item, index) => {
        const isOpen = openItemsSet.has(item.id);
        const isDisabled = item.disabled;

        return (
          <div key={item.id} className={index > 0 ? 'mt-2' : ''}>
            <div className="border-2 border-black overflow-hidden">
              <button
                type="button"
                onClick={() => !isDisabled && handleToggle(item.id)}
                disabled={isDisabled}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-3',
                  'bg-white',
                  'hover:bg-neutral-100',
                  'transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  isOpen && 'bg-neutral-100 font-bold'
                )}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${item.id}`}
              >
                <div className="flex-1 text-left">
                  {typeof item.header === 'string' ? (
                    <Typography variant="body" weight="medium">
                      {item.header}
                    </Typography>
                  ) : (
                    item.header
                  )}
                </div>
                <Icon
                  icon={ChevronDown}
                  size="sm"
                  className={cn(
                    'transition-transform duration-200',
                    isOpen && 'transform rotate-180'
                  )}
                />
              </button>

              {isOpen && (
                <div
                  id={`accordion-content-${item.id}`}
                  className="px-4 py-3 bg-white border-t-2 border-black"
                >
                  {item.content}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

Accordion.displayName = 'Accordion';

