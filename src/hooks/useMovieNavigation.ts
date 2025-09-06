/**
 * ===========================================
 * USE MOVIE NAVIGATION HOOK
 * ===========================================
 * 
 * Custom hook for handling movie navigation throughout the application.
 * Provides a standardized way to navigate to movie detail pages.
 * 
 * USAGE:
 * ```tsx
 * const handleMovieClick = useMovieNavigation();
 * 
 * // In a component
 * <MovieCard onMovieClick={handleMovieClick} />
 * ```
 * 
 * @returns {Function} handleMovieClick - Function to navigate to movie detail page
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

/**
 * Custom hook for movie navigation
 * @returns {Function} A memoized callback function that navigates to movie detail page
 */
export const useMovieNavigation = () => {
  const navigate = useNavigate();

  const handleMovieClick = useCallback((movieId: number, categoryId: string) => {
    navigate(ROUTES.MOVIE_DETAIL(movieId, categoryId));
  }, [navigate]);

  return handleMovieClick;
};
