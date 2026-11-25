import Link from 'next/link';
import type { Experience } from '@/types/Experience';

interface Props {
  experience: Experience;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const categoryColors: Record<Experience['category'], string> = {
  Adventure: 'bg-orange-100 text-orange-700',
  Culture: 'bg-blue-100 text-blue-700',
  Food: 'bg-red-100 text-red-700',
  Wellness: 'bg-green-100 text-green-700',
  Nature: 'bg-emerald-100 text-emerald-700',
};

const categoryLabels: Record<Experience['category'], string> = {
  Adventure: 'Aventura',
  Culture: 'Cultura',
  Food: 'Gastronomía',
  Wellness: 'Bienestar',
  Nature: 'Naturaleza',
};

export default function ExperienceCard({
  experience,
  isFavorite,
  onToggleFavorite,
}: Props) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-lg">
      {/* Imagen */}
      <Link href={`/experiences/${experience.id}`} className="block aspect-[4/3] overflow-hidden">
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Categoría y precio */}
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              categoryColors[experience.category]
            }`}
          >
            {categoryLabels[experience.category]}
          </span>
          <span className="text-sm font-semibold text-zinc-900">
            {experience.price} €
          </span>
        </div>

        {/* Título */}
        <Link href={`/experiences/${experience.id}`}>
          <h3 className="text-base font-semibold text-zinc-900 transition-colors group-hover:text-indigo-600">
            {experience.title}
          </h3>
        </Link>

        <p className="line-clamp-2 min-h-10 text-sm leading-5 text-zinc-600">
          {experience.description}
        </p>

        {/* Destino */}
        <p className="text-sm text-zinc-500">{experience.destination}</p>

        {/* Rating y favorito */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <span className="text-sm text-amber-500">★</span>
            <span className="text-sm font-medium text-zinc-700">
              {experience.rating.toFixed(1)}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(experience.id);
            }}
            className={`rounded-full p-1.5 transition-colors ${
              isFavorite
                ? 'text-red-500 hover:text-red-600'
                : 'text-zinc-300 hover:text-red-400'
            }`}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}