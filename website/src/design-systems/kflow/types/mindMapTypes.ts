/**
 * Mind map related types for kflow design-system client
 */

export type LayoutType = 'horizontal' | 'vertical';

export interface MindMapHeaderProps {
  zoom: number;
  layoutType: LayoutType;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleLayout: () => void;
}
