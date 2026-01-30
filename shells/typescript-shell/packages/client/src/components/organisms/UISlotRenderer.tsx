/**
 * UISlotRenderer Component
 *
 * Renders all UI slots. This is the central component that displays
 * content rendered by traits via render_ui effects.
 *
 * Slots are rendered as:
 * - Layout slots: Inline in the page flow (main, sidebar)
 * - Portal slots: Rendered via portals (modal, drawer, toast, etc.)
 * - HUD slots: Fixed position overlays (hud-top, hud-bottom)
 *
 * @packageDocumentation
 */

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useUISlots, type UISlot, type SlotContent } from '../../context/UISlotContext';
import { Modal } from '../molecules/Modal';
import { Drawer } from '../molecules/Drawer';
import { Toast } from '../molecules/Toast';
import { cn } from '../../lib/cn';

// Pattern component imports
import { PageHeader } from './PageHeader';
import { DataTable } from './DataTable';
import { CardGrid } from './CardGrid';
import { DetailPanel } from './DetailPanel';
import { MasterDetail } from './MasterDetail';
import { SearchInput } from '../molecules/SearchInput';
import { EmptyState } from '../molecules/EmptyState';
import { LoadingState } from '../molecules/LoadingState';
import { Breadcrumb } from '../molecules/Breadcrumb';
import { StatCard } from './StatCard';
import { Form } from './Form';
import { ButtonGroup } from '../molecules/ButtonGroup';

// Layout pattern imports
import {
  VStackPattern,
  HStackPattern,
  BoxPattern,
  GridPattern,
  CenterPattern,
  SpacerPattern,
  DividerPattern,
} from './LayoutPatterns';

// Component pattern imports
import {
  ButtonPattern,
  IconButtonPattern,
  LinkPattern,
  TextPattern,
  HeadingPattern,
  BadgePattern,
  AvatarPattern,
  IconPattern,
  ImagePattern,
  CardPattern,
  ProgressBarPattern,
  SpinnerPattern,
  InputPattern,
  TextareaPattern,
  SelectPattern,
  CheckboxPattern,
  RadioPattern,
  LabelPattern,
  AlertPattern,
  TooltipPattern,
  PopoverPattern,
  MenuPattern,
  AccordionPattern,
  ContainerPattern,
  SimpleGridPattern,
  FloatButtonPattern,
} from './ComponentPatterns';

// Custom pattern import
import { CustomPattern } from './CustomPattern';

// Patterns that support nested children
const PATTERNS_WITH_CHILDREN = new Set([
  'vstack',
  'hstack',
  'box',
  'grid',
  'center',
  'card',
  'tooltip',
  'popover',
  'container',
  'simple-grid',
  'custom', // Custom patterns support nested children
]);

// Pattern registry - maps pattern types to React components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PATTERN_REGISTRY: Record<string, React.ComponentType<any>> = {
  'page-header': PageHeader,
  'entity-table': DataTable,
  'entity-cards': CardGrid,
  'entity-detail': DetailPanel,
  'detail-panel': DetailPanel,
  'master-detail': MasterDetail,
  'search-bar': SearchInput,
  'empty-state': EmptyState,
  'loading-state': LoadingState,
  'breadcrumb': Breadcrumb,
  'stats': StatCard,
  'form-section': Form,
  'form-actions': ButtonGroup,
  'filter-group': ButtonGroup,
  'button-group': ButtonGroup,
  // Layout patterns
  'vstack': VStackPattern,
  'hstack': HStackPattern,
  'box': BoxPattern,
  'grid': GridPattern,
  'center': CenterPattern,
  'spacer': SpacerPattern,
  'divider': DividerPattern,
  // Component patterns - Interactive
  'button': ButtonPattern,
  'icon-button': IconButtonPattern,
  'link': LinkPattern,
  // Component patterns - Display
  'text': TextPattern,
  'heading': HeadingPattern,
  'badge': BadgePattern,
  'avatar': AvatarPattern,
  'icon': IconPattern,
  'image': ImagePattern,
  'card': CardPattern,
  'progress-bar': ProgressBarPattern,
  'spinner': SpinnerPattern,
  // Component patterns - Form inputs
  'input': InputPattern,
  'textarea': TextareaPattern,
  'select': SelectPattern,
  'checkbox': CheckboxPattern,
  'radio': RadioPattern,
  'label': LabelPattern,
  // Component patterns - Feedback
  'alert': AlertPattern,
  'tooltip': TooltipPattern,
  'popover': PopoverPattern,
  // Component patterns - Navigation
  'menu': MenuPattern,
  'accordion': AccordionPattern,
  // Component patterns - Layout
  'container': ContainerPattern,
  'simple-grid': SimpleGridPattern,
  'float-button': FloatButtonPattern,
  // Custom pattern for freeform design
  'custom': CustomPattern,
};

// ============================================================================
// Slot Component
// ============================================================================

interface UISlotComponentProps {
  slot: UISlot;
  portal?: boolean;
  position?: 'left' | 'right' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
  draggable?: boolean;
}

/**
 * Individual slot renderer.
 *
 * Handles different slot types with appropriate wrappers.
 */
function UISlotComponent({
  slot,
  portal = false,
  position,
  className,
}: UISlotComponentProps): React.ReactElement | null {
  const { slots, clear } = useUISlots();
  const content = slots[slot];

  // Handle empty slot
  if (!content) {
    // For non-portal slots, render an empty placeholder
    if (!portal) {
      return <div id={`slot-${slot}`} className={cn('ui-slot', `ui-slot-${slot}`, className)} />;
    }
    return null;
  }

  // Render content based on slot type
  const handleDismiss = () => {
    clear(slot);
  };

  // Portal-based slots
  if (portal) {
    return <SlotPortal slot={slot} content={content} position={position} onDismiss={handleDismiss} />;
  }

  // Inline slots
  return (
    <div
      id={`slot-${slot}`}
      className={cn('ui-slot', `ui-slot-${slot}`, className)}
      data-pattern={content.pattern}
      data-source-trait={content.sourceTrait}
    >
      <SlotContentRenderer content={content} onDismiss={handleDismiss} />
    </div>
  );
}

// ============================================================================
// Portal Renderer
// ============================================================================

interface SlotPortalProps {
  slot: UISlot;
  content: SlotContent;
  position?: string;
  onDismiss: () => void;
}

function SlotPortal({ slot, content, position, onDismiss }: SlotPortalProps): React.ReactElement | null {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Find or create portal root
    let root = document.getElementById('ui-slot-portal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'ui-slot-portal-root';
      document.body.appendChild(root);
    }
    setPortalRoot(root);
  }, []);

  if (!portalRoot) return null;

  // Render slot-specific wrapper
  let wrapper: React.ReactElement;

  switch (slot) {
    case 'modal':
      wrapper = (
        <Modal
          isOpen={true}
          onClose={onDismiss}
          title={content.props.title as string | undefined}
          size={content.props.size as 'sm' | 'md' | 'lg' | 'xl' | 'full' | undefined}
        >
          <SlotContentRenderer content={content} onDismiss={onDismiss} />
        </Modal>
      );
      break;

    case 'drawer':
      wrapper = (
        <Drawer
          isOpen={true}
          onClose={onDismiss}
          title={content.props.title as string | undefined}
          position={(content.props.position as 'left' | 'right') ?? 'right'}
          width={content.props.width as string | undefined}
        >
          <SlotContentRenderer content={content} onDismiss={onDismiss} />
        </Drawer>
      );
      break;

    case 'toast':
      wrapper = (
        <div className={cn('fixed z-50', getToastPosition(position))}>
          <Toast
            variant={(content.props.variant as 'success' | 'error' | 'warning' | 'info') ?? 'info'}
            title={content.props.title as string | undefined}
            message={content.props.message as string ?? ''}
            onDismiss={onDismiss}
          />
        </div>
      );
      break;

    case 'overlay':
      wrapper = (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          onClick={onDismiss}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <SlotContentRenderer content={content} onDismiss={onDismiss} />
          </div>
        </div>
      );
      break;

    case 'center':
      wrapper = (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="pointer-events-auto">
            <SlotContentRenderer content={content} onDismiss={onDismiss} />
          </div>
        </div>
      );
      break;

    default:
      wrapper = <SlotContentRenderer content={content} onDismiss={onDismiss} />;
  }

  return createPortal(wrapper, portalRoot);
}

function getToastPosition(position?: string): string {
  switch (position) {
    case 'top-left':
      return 'top-4 left-4';
    case 'top-right':
      return 'top-4 right-4';
    case 'bottom-left':
      return 'bottom-4 left-4';
    case 'bottom-right':
      return 'bottom-4 right-4';
    default:
      return 'top-4 right-4';
  }
}

// ============================================================================
// Content Renderer
// ============================================================================

interface SlotContentRendererProps {
  content: SlotContent;
  onDismiss: () => void;
}

/**
 * Recursively render nested pattern children.
 *
 * Takes an array of child pattern configurations and renders them recursively.
 */
function renderPatternChildren(
  children: Array<{ type: string; props?: Record<string, unknown> }> | undefined,
  onDismiss: () => void
): React.ReactNode {
  if (!children || !Array.isArray(children) || children.length === 0) {
    return null;
  }

  return children.map((child, index) => {
    if (!child || typeof child !== 'object') return null;

    const childContent: SlotContent = {
      id: `child-${index}`,
      pattern: child.type,
      props: child.props ?? {},
      priority: 0,
    };

    return (
      <SlotContentRenderer
        key={`child-${index}-${child.type}`}
        content={childContent}
        onDismiss={onDismiss}
      />
    );
  });
}

/**
 * Renders the actual content of a slot.
 *
 * Dynamically renders pattern components from the registry.
 * For layout patterns with `hasChildren`, recursively renders nested patterns.
 */
function SlotContentRenderer({ content, onDismiss }: SlotContentRendererProps): React.ReactElement {
  const PatternComponent = PATTERN_REGISTRY[content.pattern];

  // If we have a registered component, render it with props
  if (PatternComponent) {
    // Check if this pattern supports children and has children defined
    const supportsChildren = PATTERNS_WITH_CHILDREN.has(content.pattern);
    const childrenConfig = content.props.children as Array<{ type: string; props?: Record<string, unknown> }> | undefined;

    // Render children recursively for layout patterns
    const renderedChildren = supportsChildren
      ? renderPatternChildren(childrenConfig, onDismiss)
      : undefined;

    // Extract props without the children config (we pass rendered children instead)
    const { children: _childrenConfig, ...restProps } = content.props;

    return (
      <div
        className="slot-content"
        data-pattern={content.pattern}
        data-id={content.id}
      >
        <PatternComponent {...restProps} onDismiss={onDismiss}>
          {renderedChildren}
        </PatternComponent>
      </div>
    );
  }

  // Fallback for unknown patterns - show placeholder
  return (
    <div
      className="slot-content"
      data-pattern={content.pattern}
      data-id={content.id}
    >
      {content.props.children as React.ReactNode ?? (
        <div className="p-4 text-sm text-gray-500 border border-dashed border-gray-300 rounded">
          Unknown pattern: {content.pattern}
          {content.sourceTrait && <span className="ml-2">(from {content.sourceTrait})</span>}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export interface UISlotRendererProps {
  /** Include HUD slots */
  includeHud?: boolean;
  /** Include floating slot */
  includeFloating?: boolean;
  /** Additional class name for the container */
  className?: string;
}

/**
 * Main UI Slot Renderer component.
 *
 * Renders all slot containers. Place this in your page/layout component.
 *
 * @example
 * ```tsx
 * function PageLayout() {
 *   return (
 *     <div className="page-layout">
 *       <UISlotRenderer />
 *     </div>
 *   );
 * }
 * ```
 */
export function UISlotRenderer({
  includeHud = false,
  includeFloating = false,
  className,
}: UISlotRendererProps): React.ReactElement {
  return (
    <div className={cn('ui-slot-renderer', className)}>
      {/* Layout slots */}
      <UISlotComponent slot="sidebar" className="ui-slot-sidebar" />
      <UISlotComponent slot="main" className="ui-slot-main flex-1" />

      {/* Portal slots */}
      <UISlotComponent slot="modal" portal />
      <UISlotComponent slot="drawer" portal />
      <UISlotComponent slot="overlay" portal />
      <UISlotComponent slot="center" portal />
      <UISlotComponent slot="toast" portal position="top-right" />

      {/* HUD slots (optional, for games) */}
      {includeHud && (
        <>
          <UISlotComponent
            slot="hud-top"
            className="fixed top-0 inset-x-0 z-40"
          />
          <UISlotComponent
            slot="hud-bottom"
            className="fixed bottom-0 inset-x-0 z-40"
          />
        </>
      )}

      {/* Floating slot (optional) */}
      {includeFloating && (
        <UISlotComponent
          slot="floating"
          className="fixed z-50"
          draggable
        />
      )}
    </div>
  );
}

UISlotRenderer.displayName = 'UISlotRenderer';

// ============================================================================
// Exports
// ============================================================================

export { UISlotComponent, SlotContentRenderer };
