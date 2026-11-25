import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
          Descubre experiencias
          <span className="block text-indigo-600">únicas alrededor del mundo</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 sm:text-xl">
          Explora, busca y guarda las experiencias más increíbles que el mundo tiene para ofrecerte.
          Tu próxima aventura comienza aquí.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/experiences"
            className="rounded-full bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 hover:shadow-md"
          >
            Explorar experiencias
          </Link>
        </div>
      </div>

      {/* Indicadores visuales de categorías */}
      <div className="mt-16 grid max-w-4xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
        {[
          { label: 'Aventura', icon: '🏔️', color: 'bg-orange-100 text-orange-700' },
          { label: 'Cultura', icon: '🎭', color: 'bg-blue-100 text-blue-700' },
          { label: 'Gastronomía', icon: '🍷', color: 'bg-red-100 text-red-700' },
          { label: 'Bienestar', icon: '🧘', color: 'bg-green-100 text-green-700' },
          { label: 'Naturaleza', icon: '🌲', color: 'bg-emerald-100 text-emerald-700' },
        ].map((cat) => (
          <div
            key={cat.label}
            className={`flex flex-col items-center gap-2 rounded-2xl px-4 py-6 text-center text-sm font-medium ${cat.color}`}
          >
            <span className="text-2xl">{cat.icon}</span>
            <span>{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
