// src/components/FilterSortBar.tsx
import React from 'react';
import type { FilterOption, SortByOption, SortOrderOption } from '../types';

interface Props {
  filter: FilterOption;
  onFilterChange: (f: FilterOption) => void;
  sortBy: SortByOption;
  onSortByChange: (s: SortByOption) => void;
  sortOrder: SortOrderOption;
  onSortOrderChange: (o: SortOrderOption) => void;
}

const filterOptions: { label: string; value: FilterOption }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

const FilterSortBar: React.FC<Props> = React.memo(({
  filter,
  onFilterChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
}) => {

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {/* Filter buttons */}
      <div className="flex rounded-lg overflow-hidden border border-gray-200">
        {filterOptions.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`px-3 py-1 text-sm font-medium transition-colors ${
              filter === value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Sort by */}
      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as SortByOption)}
        className="text-sm border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="createdAt">Date</option>
        <option value="title">Title</option>
      </select>

      {/* Sort order */}
      <button
        onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
        className="text-sm border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
        title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      >
        {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
      </button>
    </div>
  );
});

FilterSortBar.displayName = 'FilterSortBar';
export default FilterSortBar;
