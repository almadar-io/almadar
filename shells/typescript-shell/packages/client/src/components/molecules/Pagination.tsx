/**
 * Pagination Molecule Component
 * 
 * A pagination component with page numbers, previous/next buttons, and ellipsis.
 * Uses Button, Icon, Typography, and Input atoms.
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import { Input } from '../atoms/Input';
import { cn } from '../../lib/cn';

export interface PaginationProps {
  /**
   * Current page (1-indexed)
   */
  currentPage: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;

  /**
   * Show page size selector
   * @default false
   */
  showPageSize?: boolean;

  /**
   * Page size options
   */
  pageSizeOptions?: number[];

  /**
   * Current page size
   */
  pageSize?: number;

  /**
   * Callback when page size changes
   */
  onPageSizeChange?: (size: number) => void;

  /**
   * Show jump to page input
   * @default false
   */
  showJumpToPage?: boolean;

  /**
   * Show total count
   * @default false
   */
  showTotal?: boolean;

  /**
   * Total items count
   */
  totalItems?: number;

  /**
   * Maximum number of page buttons to show
   * @default 7
   */
  maxVisiblePages?: number;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageSize = false,
  pageSizeOptions = [10, 20, 50, 100],
  pageSize,
  onPageSizeChange,
  showJumpToPage = false,
  showTotal = false,
  totalItems,
  maxVisiblePages = 7,
  className,
}) => {
  const [jumpToPage, setJumpToPage] = useState('');

  const handleJumpToPage = () => {
    const page = parseInt(jumpToPage, 10);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setJumpToPage('');
    }
  };

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= halfVisible + 1) {
        for (let i = 1; i <= maxVisiblePages - 2; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - halfVisible) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - maxVisiblePages + 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - halfVisible + 2; i <= currentPage + halfVisible - 2; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <div className="flex items-center gap-2">
        {showTotal && totalItems !== undefined && (
          <Typography variant="small" color="secondary">
            Total: {totalItems}
          </Typography>
        )}

        {showPageSize && pageSize && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <Typography variant="small" color="secondary">
              Show:
            </Typography>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-2 py-1 text-sm border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          icon={ChevronLeft}
        >
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <Typography key={`ellipsis-${index}`} variant="small" color="muted" className="px-2">
                  ...
                </Typography>
              );
            }

            const isActive = page === currentPage;

            return (
              <Button
                key={page}
                variant={isActive ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onPageChange(page)}
                className="min-w-[2.5rem]"
              >
                {page}
              </Button>
            );
          })}
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          iconRight={ChevronRight}
        >
          Next
        </Button>
      </div>

      {showJumpToPage && (
        <div className="flex items-center gap-2">
          <Typography variant="small" color="secondary">
            Go to:
          </Typography>
          <Input
            type="number"
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            placeholder="Page"
            className="w-20"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleJumpToPage();
              }
            }}
          />
          <Button variant="ghost" size="sm" onClick={handleJumpToPage}>
            Go
          </Button>
        </div>
      )}
    </div>
  );
};

Pagination.displayName = 'Pagination';

