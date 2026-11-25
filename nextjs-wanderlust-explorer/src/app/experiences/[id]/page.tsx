'use client';

import { useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { experiences } from '@/data/experiences';
import { useFavorites } from '@/context/FavoritesContext';

const categoryLabels: Record<string, string> = {
  Adventure: 'Aventura',
  Culture: 'Cultura',
  Food: 'Gastronomía',
  Wellness: 'Bienestar',
  Nature: 'Naturaleza',
};

export default function ExperienceDetailPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const params = useParams<{ id: string }>();
  const experience = experiences.find((exp) => exp.id === params.id);

  useEffect(() => {
    if (!experience) return;

    const previousTitle = document.title;
    document.title = `${experience.title} | Wanderlust Explorer`;

    return () => {
      document.title = previousTitle;
    };
  }, [experience]);

  if (!experience) {
    notFound();
  }

  const isFavorite = favorites.includes(experience.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-700">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <Link href="/experiences" className="hover:text-zinc-700">
          Experiencias
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-900">{experience.title}</span>
      </nav>

      {/* Imagen grande */}
      <div className="aspect-[16/9] overflow-hidden rounded-2xl">
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Info principal */}
      <div className="mt-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
              {experience.title}
            </h1>
            <p className="mt-1 text-lg text-zinc-500">{experience.destination}</p>
          </div>

          <button
            onClick={() => toggleFavorite(experience.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isFavorite
                ? 'bg-red-50 text-red-600 ring-1 ring-red-200'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {isFavorite ? 'Guardado' : 'Guardar'}
          </button>
        </div>

        {/* Meta tags */}
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
            {categoryLabels[experience.category] || experience.category}
          </span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            {experience.price} €
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
            ★ {experience.rating.toFixed(1)}
          </span>
        </div>

        {/* Descripción */}
        <p className="mt-8 text-base leading-7 text-zinc-600 sm:text-lg">
          {experience.description}
        </p>
      </div>

      {/* Volver */}
      <div className="mt-12 border-t border-zinc-200 pt-6">
        <Link
          href="/experiences"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7-7 7 7 7" />
          </svg>
          Volver a experiencias
        </Link>
      </div>
    </div>
  );
}