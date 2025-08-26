/**
 * ===========================================
 * TMDB SERVICE
 * ===========================================
 * 
 * API service for TheMovieDB integration
 */

import type { MovieDetails, MoviesResponse } from '@/types';
import { MOVIE_CATEGORIES } from '@/utils/movieUtils';
import { TMDB_API, APP_CONFIG, HTTP_STATUS, ERROR_MESSAGES, ERROR_TYPES } from '@/constants';

// Environment variable for API key - secure configuration
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || APP_CONFIG.DEFAULTS.API_KEY_FALLBACK;

class TMDBService {
  /**
   * Generic fetch method with enhanced error handling
   * 
   * @param url - API endpoint (relative to base URL)
   * @returns Promise with typed response data
   */
  private async fetchAPI<T>(url: string): Promise<T> {
    try {
      const response = await fetch(`${TMDB_API.BASE_URL}${url}${url.includes('?') ? '&' : '?'}api_key=${API_KEY}`);
      
      if (!response.ok) {
        // Enhanced error handling with specific status codes
        switch (response.status) {
          case HTTP_STATUS.NOT_FOUND:
            throw new Error(ERROR_MESSAGES.RESOURCE_NOT_FOUND(url));
          case HTTP_STATUS.UNAUTHORIZED:
            throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
          case HTTP_STATUS.RATE_LIMITED:
            throw new Error(ERROR_MESSAGES.RATE_LIMITED);
          case HTTP_STATUS.INTERNAL_SERVER_ERROR:
            throw new Error(ERROR_MESSAGES.SERVER_ERROR);
          default:
            throw new Error(ERROR_MESSAGES.HTTP_ERROR(response.status));
        }
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('TMDB API Error:', error);
      
      // Network error detection
      if (error instanceof TypeError && error.message.includes(ERROR_TYPES.FETCH_ERROR)) {
        throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
      }
      
      throw new Error(error instanceof Error ? error.message : ERROR_MESSAGES.FETCH_FAILED);
    }
  }

  /**
   * Fetch movies by category
   * 
   * @param categoryId - Category identifier (popular, top_rated, upcoming)
   * @returns Promise with movies response containing results
   */
  async getMoviesByCategory(categoryId: string): Promise<MoviesResponse> {
    const category = MOVIE_CATEGORIES.find(cat => cat.id === categoryId);
    if (!category) {
      throw new Error(ERROR_MESSAGES.UNKNOWN_CATEGORY(categoryId));
    }
    
    return this.fetchAPI<MoviesResponse>(`${category.endpoint}`);
  }

  /**
   * Fetch detailed information for a specific movie
   * 
   * @param movieId - The TMDB movie ID
   * @returns Promise with complete movie details
   */
  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.fetchAPI<MovieDetails>(APP_CONFIG.URL_PATTERNS.MOVIE_ENDPOINT(movieId));
  }
}

/**
 * SINGLETON EXPORT
 * 
 * Example:
 * ```typescript
 * const useMovies = (categoryId: string) => {
 *   return useQuery({
 *     queryKey: ['movies', categoryId],
 *     queryFn: () => tmdbService.getMoviesByCategory(categoryId)
 *   });
 * }
 * ```
 */
export const tmdbService = new TMDBService();
