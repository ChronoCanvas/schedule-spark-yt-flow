
import React from 'react';
import { GlowButton } from '@/components/ui/glow-button';
import { ProjectState } from '@/types/project';

interface StateFiltersProps {
  activeFilter: ProjectState | 'all';
  onFilterChange: (filter: ProjectState | 'all') => void;
}

const StateFilters: React.FC<StateFiltersProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { key: 'all' as const, label: 'All' },
    { key: 'planning' as const, label: 'Planning' },
    { key: 'production' as const, label: 'Production' },
    { key: 'scheduled' as const, label: 'Scheduled' },
    { key: 'uploaded' as const, label: 'Uploaded' }
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-400 mr-2">Filter:</span>
      {filters.map((filter) => (
        <GlowButton
          key={filter.key}
          glowColor={activeFilter === filter.key ? "red" : "blue"}
          onClick={() => onFilterChange(filter.key)}
          className={`px-3 py-1 text-xs ${
            activeFilter === filter.key
              ? 'bg-red-500/20 text-red-400 border-red-500/30'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          {filter.label}
        </GlowButton>
      ))}
    </div>
  );
};

export default StateFilters;
