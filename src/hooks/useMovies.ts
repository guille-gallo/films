/**
 * ===========================================
 * useMovies HOOK
 * ===========================================
 * 
 * @param categoryId - Movie category to fetch ('popular', 'top_rated', 'upcoming')
 * @returns TanStack Query result with data, loading, error states
 */

import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '@/services/tmdb';
import { APP_CONFIG } from '@/constants';

export const useMovies = (categoryId: string) => {
  return useQuery({
    queryKey: [APP_CONFIG.QUERY.KEYS.MOVIES, categoryId],
    queryFn: () => tmdbService.getMoviesByCategory(categoryId),
    staleTime: 5 * 60 * 1000,
    retry: 2
  });
};
