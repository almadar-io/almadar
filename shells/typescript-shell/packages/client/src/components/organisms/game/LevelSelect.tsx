import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../lib/cn';

export interface LevelData {
  /** Unique level identifier */
  id: string;
  /** Level ID (alternative to id) */
  levelId?: string;
  /** Level number */
  number?: number;
  /** Level name/title */
  name?: string;
  /** Stars earned (0-3) */
  stars?: number;
  /** Difficulty level */
  difficulty?: 'easy' | 'medium' | 'hard' | string;
  /** Whether the level is locked */
  isLocked?: boolean;
  /** Best score on this level */
  bestScore?: number;
  /** Thumbnail image URL */
  thumbnail?: string;
  /** Allow additional properties from schema */
  [key: string]: unknown;
}

export interface LevelFieldDisplay {
  /** Field name */
  field?: string;
  /** Display type */
  display?: 'title' | 'number' | 'stars' | 'locked' | 'thumbnail' | string;
}

export interface LevelSelectProps {
  /** Level data */
  levels?: LevelData[];
  /** Entity name (schema config) */
  entity?: string;
  /** Layout variant */
  layout?: 'grid' | 'list' | 'carousel' | string;
  /** Fields to display per level */
  fields?: LevelFieldDisplay[];
  /** Event to emit on selection (schema config) */
  selectEvent?: string;
  /** Called when a level is selected */
  onSelect?: (level: LevelData) => void;
  /** Path to navigate to on selection. Supports :id, :levelId, :number placeholders */
  navigatesTo?: string;
  /** Currently selected level ID */
  selectedId?: string;
  /** Maximum stars possible per level */
  maxStars?: number;
  /** Additional CSS classes */
  className?: string;
  /** Title above the level grid */
  title?: string;
}

function StarRating({ stars, max = 3 }: { stars: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'text-lg transition-colors',
            i < stars ? 'text-yellow-400' : 'text-gray-600'
          )}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function LevelCard({
  level,
  fields,
  maxStars,
  selected,
  onSelect,
}: {
  level: LevelData;
  fields: LevelFieldDisplay[];
  maxStars: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const showNumber = fields.some((f) => f.display === 'number' || f.field === 'number');
  const showStars = fields.some((f) => f.display === 'stars' || f.field === 'stars' || f.field === 'difficulty');
  const showTitle = fields.some((f) => f.display === 'title' || f.field === 'name' || f.field === 'title');
  const showThumbnail = fields.some((f) => f.display === 'thumbnail' || f.field === 'thumbnail');

  return (
    <button
      onClick={onSelect}
      disabled={level.isLocked}
      className={cn(
        'relative flex flex-col items-center justify-center',
        'w-24 h-24 rounded-xl border-2',
        'transition-all duration-200',
        'focus:outline-none focus:ring-4 focus:ring-blue-500/50',
        level.isLocked
          ? 'bg-gray-800 border-gray-700 opacity-50 cursor-not-allowed'
          : selected
          ? 'bg-blue-600 border-blue-400 scale-110 shadow-lg shadow-blue-500/25'
          : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:scale-105'
      )}
    >
      {/* Lock Icon */}
      {level.isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
          <span className="text-3xl">🔒</span>
        </div>
      )}

      {/* Thumbnail Background */}
      {showThumbnail && level.thumbnail && (
        <div
          className="absolute inset-0 rounded-xl bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${level.thumbnail})` }}
        />
      )}

      {/* Level Number */}
      {showNumber && (
        <span className="text-3xl font-bold text-white z-10">
          {level.number}
        </span>
      )}

      {/* Level Name */}
      {showTitle && level.name && (
        <span className="text-xs text-gray-300 mt-1 truncate max-w-full px-2 z-10">
          {level.name}
        </span>
      )}

      {/* Stars */}
      {showStars && !level.isLocked && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
          <StarRating stars={level.stars ?? 0} max={maxStars} />
        </div>
      )}
    </button>
  );
}

export function LevelSelect({
  levels = [],
  entity: _entity,
  layout = 'grid',
  fields = [{ field: 'number', display: 'number' }],
  selectEvent: _selectEvent,
  onSelect = () => {},
  navigatesTo,
  selectedId,
  maxStars = 3,
  className,
  title,
}: LevelSelectProps) {
  const navigate = useNavigate();

  const handleLevelSelect = React.useCallback(
    (level: LevelData) => {
      // Call the onSelect callback first
      onSelect(level);

      // Handle navigation if navigatesTo is specified
      if (navigatesTo) {
        const levelId = level.id || level.levelId || String(level.number);
        const path = navigatesTo
          .replace(':id', levelId)
          .replace(':levelId', level.levelId || levelId)
          .replace(':number', String(level.number ?? ''));
        navigate(path);
      }
    },
    [onSelect, navigatesTo, navigate]
  );

  const layoutClasses: Record<string, string> = {
    grid: 'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4',
    list: 'flex flex-col gap-2',
    carousel: 'flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory',
  };

  return (
    <div
      className={cn(
        'min-h-screen w-full flex flex-col items-center p-8',
        'bg-gradient-to-b from-gray-900 to-gray-950',
        className
      )}
    >
      {/* Title */}
      {title && (
        <h1 className="text-4xl font-bold text-white mb-8 tracking-tight">
          {title}
        </h1>
      )}

      {/* Level Grid */}
      <div className={cn('w-full max-w-4xl', layoutClasses[layout] || layoutClasses.grid)}>
        {levels.map((level) => {
          const levelKey = level.id || level.levelId || String(level.number);
          return (
            <div
              key={levelKey}
              className={layout === 'carousel' ? 'snap-center flex-shrink-0' : ''}
            >
              <LevelCard
                level={level}
                fields={fields as LevelFieldDisplay[]}
                maxStars={maxStars}
                selected={selectedId === levelKey}
                onSelect={() => !level.isLocked && handleLevelSelect(level)}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation hint */}
      {layout === 'carousel' && (
        <p className="mt-4 text-gray-500 text-sm">
          Swipe to browse levels
        </p>
      )}
    </div>
  );
}

LevelSelect.displayName = 'LevelSelect';
