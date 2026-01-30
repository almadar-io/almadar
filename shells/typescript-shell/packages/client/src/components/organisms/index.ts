// Shell organisms - common UI patterns
export { DataTable, type DataTableProps, type Column, type RowAction } from './DataTable';
export { StatCard, type StatCardProps } from './StatCard';
export { PageHeader, type PageHeaderProps, type PageBreadcrumb } from './PageHeader';
export { DetailPanel, type DetailPanelProps, type DetailField, type DetailSection } from './DetailPanel';
export { FormSection, FormLayout, FormActions, type FormSectionProps, type FormLayoutProps, type FormActionsProps } from './FormSection';

// Migrated organisms
export { Form, type FormProps } from './Form';
export { Header, type HeaderProps } from './Header';
export { Navigation, type NavigationProps, type NavigationItem } from './Navigation';
export { Section, type SectionProps } from './Section';
export { Sidebar, type SidebarProps, type SidebarItem } from './Sidebar';
export { Split, type SplitProps } from './Split';
export { Table, type TableProps, type TableColumn, type SortDirection } from './Table';
export { List, type ListProps, type ListItem } from './List';
export { CardGrid, type CardGridProps, type CardGridGap } from './CardGrid';
export { MasterDetail, type MasterDetailProps } from './MasterDetail';

// Dialog organisms
export { ConfirmDialog, type ConfirmDialogProps, type ConfirmDialogVariant } from './ConfirmDialog';
export { WizardContainer, type WizardContainerProps, type WizardStep } from './WizardContainer';

// Almadar visualization
export { OrbitalVisualization, type OrbitalVisualizationProps } from './OrbitalVisualization';

// Layout organisms
export * from './layout';

// Game organisms
export * from './game';

// UI Slot system
export {
  UISlotRenderer,
  UISlotComponent,
  SlotContentRenderer,
  type UISlotRendererProps,
} from './UISlotRenderer';
export { ModalSlot, type ModalSlotProps } from './ModalSlot';
export { DrawerSlot, type DrawerSlotProps } from './DrawerSlot';
