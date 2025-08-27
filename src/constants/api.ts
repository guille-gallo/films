/**
 * API Constants
 * 
 * Centralized configuration for all API endpoints and URLs used throughout the application.
 * 
 * Usage:
 * ```typescript
 * import { TMDB_API } from '@/constants/api';
 * 
 * const apiUrl = `${TMDB_API.BASE_URL}/movie/popular`;
 * const imageUrl = `${TMDB_API.IMAGE_BASE_URL}/w500/path.jpg`;
 * ```
 */

export const TMDB_API = {
  /**
   * Base URL for TMDB API endpoints
   * Version 3 of the API provides comprehensive movie data
   */
  BASE_URL: 'https://api.themoviedb.org/3',

  /**
   * Base URL for TMDB image assets
   * Supports multiple image sizes for responsive design
   */
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',

  /**
   * Common endpoint paths for easy reference
   */
  ENDPOINTS: {
    POPULAR: '/movie/popular',
    TOP_RATED: '/movie/top_rated', 
    UPCOMING: '/movie/upcoming',
    MOVIE_DETAILS: (id: number) => `/movie/${id}`,
    SEARCH: '/search/movie',
  },
} as const;
