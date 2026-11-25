import { Suspense } from 'react';
import ExperiencesExplorer from '@/components/ExperiencesExplorer';

export default function ExperiencesPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-8" aria-busy="true">
          Cargando experiencias...
        </div>
      }
    >
      <ExperiencesExplorer />
    </Suspense>
  );
}