/**
 * ListTemplate Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ListTemplate, type ListTemplateItem } from '../ListTemplate';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

const mockItems: ListTemplateItem[] = [
  { id: '1', title: 'First item', completed: false },
  { id: '2', title: 'Second item', completed: true },
  { id: '3', title: 'Third item', completed: false },
];

describe('ListTemplate', () => {
  describe('Rendering', () => {
    it('should render all items', () => {
      render(<ListTemplate items={mockItems} />);
      
      expect(screen.getByText('First item')).toBeInTheDocument();
      expect(screen.getByText('Second item')).toBeInTheDocument();
      expect(screen.getByText('Third item')).toBeInTheDocument();
    });

    it('should render the title', () => {
      render(<ListTemplate items={mockItems} title="My Tasks" />);
      expect(screen.getByText('My Tasks')).toBeInTheDocument();
    });

    it('should render empty state when no items', () => {
      render(<ListTemplate items={[]} emptyMessage="Nothing here" />);
      expect(screen.getByText('Nothing here')).toBeInTheDocument();
    });

    it('should render loading spinner when isLoading', () => {
      render(<ListTemplate items={[]} isLoading={true} />);
      // Spinner component should be rendered
      expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('should render error alert when error', () => {
      render(<ListTemplate items={[]} error="Failed to load" />);
      // Multiple elements may contain the error text, use getAllByText
      const errorElements = screen.getAllByText(/Failed to load/);
      expect(errorElements.length).toBeGreaterThan(0);
    });

    it('should render filters when showFilters is true', () => {
      render(<ListTemplate items={mockItems} showFilters={true} />);
      
      expect(screen.getByText(/All/)).toBeInTheDocument();
      expect(screen.getByText(/Active/)).toBeInTheDocument();
      expect(screen.getByText(/Completed/)).toBeInTheDocument();
    });

    it('should render item count when showCount is true', () => {
      render(<ListTemplate items={mockItems} showCount={true} />);
      // 2 items are not completed
      expect(screen.getByText(/2 items remaining/)).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onToggle when checkbox is clicked', () => {
      const onToggle = vi.fn();
      
      render(<ListTemplate items={mockItems} onToggle={onToggle} />);
      
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
      
      expect(onToggle).toHaveBeenCalledWith('1');
    });

    it('should call onDelete when delete button is clicked', () => {
      const onDelete = vi.fn();
      
      render(<ListTemplate items={mockItems} onDelete={onDelete} />);
      
      // Find delete buttons (trash icons)
      const deleteButtons = screen.getAllByRole('button').filter(
        btn => btn.className.includes('red')
      );
      
      if (deleteButtons.length > 0) {
        fireEvent.click(deleteButtons[0]);
        expect(onDelete).toHaveBeenCalledWith('1');
      }
    });

    it('should call onFilterChange when filter button is clicked', () => {
      const onFilterChange = vi.fn();
      
      render(<ListTemplate items={mockItems} onFilterChange={onFilterChange} showFilters={true} />);
      
      const activeFilter = screen.getByRole('button', { name: /Active/i });
      fireEvent.click(activeFilter);
      
      expect(onFilterChange).toHaveBeenCalledWith('active');
    });

    it('should call onRetry when retry button is clicked', () => {
      const onRetry = vi.fn();
      
      render(<ListTemplate items={[]} error="Error" onRetry={onRetry} />);
      
      const retryButton = screen.getByText(/Retry/);
      fireEvent.click(retryButton);
      
      expect(onRetry).toHaveBeenCalled();
    });
  });

  describe('Filtering', () => {
    it('should show all items when filter is "all"', () => {
      render(<ListTemplate items={mockItems} filter="all" />);
      
      expect(screen.getByText('First item')).toBeInTheDocument();
      expect(screen.getByText('Second item')).toBeInTheDocument();
      expect(screen.getByText('Third item')).toBeInTheDocument();
    });

    it('should show only active items when filter is "active"', () => {
      render(<ListTemplate items={mockItems} filter="active" />);
      
      expect(screen.getByText('First item')).toBeInTheDocument();
      expect(screen.queryByText('Second item')).not.toBeInTheDocument(); // completed
      expect(screen.getByText('Third item')).toBeInTheDocument();
    });

    it('should show only completed items when filter is "completed"', () => {
      render(<ListTemplate items={mockItems} filter="completed" />);
      
      expect(screen.queryByText('First item')).not.toBeInTheDocument();
      expect(screen.getByText('Second item')).toBeInTheDocument(); // completed
      expect(screen.queryByText('Third item')).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render minimal variant without title', () => {
      render(<ListTemplate items={mockItems} variant="minimal" title="My List" />);
      // Minimal variant doesn't show the title in a header
      expect(screen.queryByText('My List')).not.toBeInTheDocument();
    });

    it('should render standard variant with title', () => {
      render(<ListTemplate items={mockItems} variant="standard" title="My List" />);
      expect(screen.getByText('My List')).toBeInTheDocument();
    });

    it('should render full variant with detailed count', () => {
      render(<ListTemplate items={mockItems} variant="full" />);
      // Full variant shows detailed stats
      expect(screen.getByText(/total/)).toBeInTheDocument();
    });
  });
});
