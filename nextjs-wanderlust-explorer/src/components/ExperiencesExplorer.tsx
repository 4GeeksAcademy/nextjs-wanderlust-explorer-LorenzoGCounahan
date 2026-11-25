'use client';

import { useExperiences } from '@/hooks/useExperiences';
import { useFavorites } from '@/context/FavoritesContext';
import ExperienceCard from '@/components/ExperienceCard';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';

export default function ExperiencesExplorer() {
  const { favorites, toggleFavorite } = useFavorites();
  const {
    experiences,
    filters,
    destinations,
    updateFilter,
    resetFilters,
  } = useExperiences();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
          Explorar experiencias
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {experiences.length} experiencia{experiences.length !== 1 ? 's' : ''}{' '}
          encontrada{experiences.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="mb-4">
        <SearchBar
          value={filters.search}
          onChange={(value) => updateFilter('search', value)}
        />
      </div>

      <div className="mb-8">
        <FilterBar
          filters={filters}
          destinations={destinations}
          onFilterChange={updateFilter}
          onReset={resetFilters}
        />
      </div>

      {experiences.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              isFavorite={favorites.includes(experience.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl" aria-hidden="true">🔍</span>
          <h2 className="mt-4 text-xl font-semibold text-zinc-900">
            No se encontraron resultados
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Intenta ajustar los filtros o realizar otra búsqueda.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}