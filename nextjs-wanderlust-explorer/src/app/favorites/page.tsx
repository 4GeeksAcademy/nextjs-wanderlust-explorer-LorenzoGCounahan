'use client';

import Link from 'next/link';
import { experiences } from '@/data/experiences';
import { useFavorites } from '@/context/FavoritesContext';
import ExperienceCard from '@/components/ExperienceCard';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const favoriteExperiences = experiences.filter((exp) =>
    favorites.includes(exp.id)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
          Mis favoritos
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {favoriteExperiences.length} experiencia
          {favoriteExperiences.length !== 1 ? 's' : ''} guardada
          {favoriteExperiences.length !== 1 ? 's' : ''}
        </p>
      </div>

      {favoriteExperiences.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoriteExperiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl">💔</span>
          <h2 className="mt-4 text-xl font-semibold text-zinc-900">
            No tienes favoritos aún
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Explora experiencias y guarda tus favoritas para verlas aquí.
          </p>
          <Link
            href="/experiences"
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Explorar experiencias
          </Link>
        </div>
      )}
    </div>
  );
}