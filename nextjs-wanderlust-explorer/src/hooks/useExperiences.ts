'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { experiences } from '@/data/experiences';
import type { Experience } from '@/types/Experience';

export type ExperienceCategory = Experience['category'] | 'All';

export interface Filters {
  category: ExperienceCategory;
  search: string;
  destination: string;
}

const categories: Experience['category'][] = [
  'Adventure',
  'Culture',
  'Food',
  'Wellness',
  'Nature',
];

const destinationOptions = Array.from(
  new Set(
    experiences.flatMap((experience) =>
      experience.destination.split(',').map((part) => part.trim())
    )
  )
).sort((a, b) => a.localeCompare(b));

export function useExperiences() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const categoryParam = searchParams.get('category')?.toLowerCase();
  const category =
    categories.find((item) => item.toLowerCase() === categoryParam) ?? 'All';
  const filters: Filters = {
    category,
    search: searchParams.get('search') ?? '',
    destination: searchParams.get('destination') ?? '',
  };

  let titlePattern: RegExp | null = null;
  if (filters.search.trim()) {
    try {
      titlePattern = new RegExp(filters.search, 'i');
    } catch {
      const literalSearch = filters.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      titlePattern = new RegExp(literalSearch, 'i');
    }
  }

  const filteredExperiences = experiences.filter((experience) => {
    const matchesCategory =
      filters.category === 'All' || experience.category === filters.category;
    const matchesTitle = !titlePattern || titlePattern.test(experience.title);
    const matchesDestination =
      !filters.destination ||
      experience.destination
        .toLowerCase()
        .includes(filters.destination.toLowerCase());

    return matchesCategory && matchesTitle && matchesDestination;
  });

  const updateFilter = <K extends keyof Filters>(
    key: K,
    value: Filters[K]
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === 'category') {
      if (value === 'All') {
        params.delete('category');
      } else {
        params.set('category', value.toLowerCase());
      }
    } else if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const resetFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  return {
    experiences: filteredExperiences,
    filters,
    destinations:
      filters.destination && !destinationOptions.includes(filters.destination)
        ? [...destinationOptions, filters.destination].sort((a, b) =>
            a.localeCompare(b)
          )
        : destinationOptions,
    updateFilter,
    resetFilters,
  };
}