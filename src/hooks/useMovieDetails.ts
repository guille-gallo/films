/**
 * ===========================================
 * useMovieDetails HOOK
 * ===========================================
 * 
 * @param movieId - The TMDB movie ID to fetch details for
 * @returns TanStack Query result with movie details, loading, error states
 */

import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '@/services/tmdb';
import { APP_CONFIG } from '@/constants';

export const useMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: [APP_CONFIG.QUERY.KEYS.MOVIE, movieId],
    queryFn: () => tmdbService.getMovieDetails(movieId),
    staleTime: 15 * 60 * 1000,  // 15 minutes - movie details rarely change
    gcTime: 30 * 60 * 1000,     // 30 minutes - keep in cache longer
    retry: (failureCount, error) => {
      // Don't retry 404 errors - they won't resolve
      if (error?.message?.includes('not found (404)')) {
        return false;
      }
      // Retry network errors and server errors up to 3 times
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false, // Don't refetch on window focus
    enabled: !!movieId && movieId > 0, // Only run if valid movieId
  });
};
