/**
 * Route Constants
 * 
 * Centralized route paths and navigation constants for the application.
 * 
 * Usage:
 * ```typescript
 * import { ROUTES } from '@/constants/routes';
 * 
 * // In component
 * <Link to={ROUTES.HOME}>Home</Link>
 * navigate(ROUTES.MOVIE_DETAIL(movieId));
 * ```
 */

export const ROUTES = {
  /**
   * Application route paths
   */
  HOME: '/',
  WISHLIST: '/wishlist',
  MOVIE_DETAIL: (id: number | string, category?: string) => 
    `/movie/${id}${category ? `?category=${category}` : ''}`,
  
  /**
   * Route patterns (for React Router)
   */
  PATTERNS: {
    HOME: '/',
    WISHLIST: '/wishlist',
    MOVIE_DETAIL: '/movie/:id',
    MOVIE_DETAIL_WITH_PARAMS: '/movie/:movieId',
    NOT_FOUND: '*'
  }
} as const;

/**
 * Route parameter names
 */
export const ROUTE_PARAMS = {
  MOVIE_ID: 'movieId',
  ID: 'id',
  CATEGORY: 'category'
} as const;

/**
 * Query parameter names
 */
export const QUERY_PARAMS = {
  CATEGORY: 'category',
  PAGE: 'page'
} as const;
