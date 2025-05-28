import React from 'react';
import { Plus } from 'lucide-react';
import SearchInput from '../SearchInput';
import { ReportFiltersProps, FilterState } from './types'; 


const ReportFilters: React.FC<ReportFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange
}) => {
  const filterOptions = [
    { key: 'showMaisRecente' as const, label: 'Mais recente' },
    { key: 'showMaisAntigo' as const, label: 'Mais antigo' },
    { key: 'showUltimoVisualizado' as const, label: 'Último visualizado' }
  ];

  return (
    <>
      <SearchInput
        value={searchTerm}
        onChange={onSearchChange}
        className="mb-6"
      />

      <div className="filter-section">
        <h3 className="section-title">Filtrar por</h3>
        {filterOptions.map(({ key, label }) => (
          <button 
            key={key}
            onClick={() => onFilterChange(key)} 
            className="filter-button"
          >
            <Plus className={`h-4 w-4 ${filters[key] ? 'transform rotate-45' : ''}`} />
            <span className="text-gray-700">{label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default ReportFilters;
