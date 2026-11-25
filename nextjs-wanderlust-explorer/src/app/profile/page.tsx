'use client';

import Link from 'next/link';
import { experiences } from '@/data/experiences';
import { useFavorites } from '@/context/FavoritesContext';

export default function ProfilePage() {
  const { favorites } = useFavorites();
  const totalFavorites = favorites.length;
  const totalExperiences = experiences.length;

  // Calcular categorías más gustadas
  const categoryCount = experiences
    .filter((exp) => favorites.includes(exp.id))
    .reduce<Record<string, number>>((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + 1;
      return acc;
    }, {});

  const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0];

  const categoryLabels: Record<string, string> = {
    Adventure: 'Aventura',
    Culture: 'Cultura',
    Food: 'Gastronomía',
    Wellness: 'Bienestar',
    Nature: 'Naturaleza',
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Encabezado del perfil */}
      <div className="flex flex-col items-center gap-4 pb-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-3xl">
          🧑‍✈️
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
            Viajero Wanderlust
          </h1>
          <p className="text-sm text-zinc-500">Descubriendo el mundo, una experiencia a la vez</p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-center">
          <p className="text-3xl font-bold text-indigo-600">{totalExperiences}</p>
          <p className="mt-1 text-sm text-zinc-500">Experiencias totales</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-center">
          <p className="text-3xl font-bold text-red-500">{totalFavorites}</p>
          <p className="mt-1 text-sm text-zinc-500">Favoritas</p>
        </div>
        <div className="col-span-2 rounded-2xl border border-zinc-200 bg-white p-6 text-center sm:col-span-1">
          <p className="text-3xl font-bold text-emerald-600">
            {topCategory ? categoryLabels[topCategory[0]] || topCategory[0] : '—'}
          </p>
          <p className="mt-1 text-sm text-zinc-500">Categoría favorita</p>
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/experiences"
          className="rounded-full bg-indigo-600 px-6 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          Explorar experiencias
        </Link>
        <Link
          href="/favorites"
          className="rounded-full border border-zinc-300 bg-white px-6 py-2.5 text-center text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          Ver favoritos
        </Link>
      </div>
    </div>
  );
}