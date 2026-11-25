'use client';

import type { ExperienceCategory, Filters } from '@/hooks/useExperiences';

interface Props {
  filters: Filters;
  destinations: string[];
  onFilterChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  onReset: () => void;
}

const categories: { value: ExperienceCategory; label: string; icon: string }[] = [
  { value: 'All', label: 'Todas', icon: '🌍' },
  { value: 'Adventure', label: 'Aventura', icon: '🏔️' },
  { value: 'Culture', label: 'Cultura', icon: '🎭' },
  { value: 'Food', label: 'Gastronomía', icon: '🍷' },
  { value: 'Wellness', label: 'Bienestar', icon: '🧘' },
  { value: 'Nature', label: 'Naturaleza', icon: '🌲' },
];

export default function FilterBar({
  filters,
  destinations,
  onFilterChange,
  onReset,
}: Props) {
  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.search !== '' ||
    filters.destination !== '';

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Categorías */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => onFilterChange('category', cat.value)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              filters.category === cat.value
                ? 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-300'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            <span className="text-base">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm text-zinc-600">
        <label htmlFor="destination-filter" className="font-medium">
          Destino:
        </label>
        <select
          id="destination-filter"
          value={filters.destination}
          onChange={(event) => onFilterChange('destination', event.target.value)}
          className="max-w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="">Todos los destinos</option>
          {destinations.map((destination) => (
            <option key={destination} value={destination}>
              {destination}
            </option>
          ))}
        </select>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}