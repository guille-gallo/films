/**
 * ===========================================
 * MOVIE UTILITIES
 * ===========================================
 * MOVIE CATEGORIES CONFIGURATION
 * 
 * Centralized configuration for all movie categories
 */

import type { MovieCategory } from '@/types';
import { TMDB_API, i18n } from '@/constants';

export const MOVIE_CATEGORIES: MovieCategory[] = [
  {
    id: 'popular',
    name: 'Popular',
    endpoint: TMDB_API.ENDPOINTS.POPULAR,
    theme: {
      fontFamily: 'Inter',
      primaryColor: '#3b82f6',
      secondaryColor: '#60a5fa',
      buttonStyle: 'primary'
    }
  },
  {
    id: 'top_rated',
    name: 'Top Rated',
    endpoint: TMDB_API.ENDPOINTS.TOP_RATED,
    theme: {
      fontFamily: 'Playfair Display',
      primaryColor: '#8b5cf6',
      secondaryColor: '#a78bfa',
      buttonStyle: 'secondary'
    }
  },
  {
    id: 'upcoming',
    name: 'Upcoming',
    endpoint: TMDB_API.ENDPOINTS.UPCOMING,
    theme: {
      fontFamily: 'Roboto Mono',
      primaryColor: '#10b981',
      secondaryColor: '#34d399',
      buttonStyle: 'accent'
    }
  }
];

/**
 * Builds a TMDB image URL from a path and size
 * @param path - The image path from TMDB API
 * @param size - The desired image size
 * @returns The complete image URL or null if no path
 */
export const getImageUrl = (
  path: string | null, 
  size: 'w200' | 'w300' | 'w400' | 'w500' | 'w780' | 'original' = 'w500'
): string | null => {
  if (!path) return null;
  return `${TMDB_API.IMAGE_BASE_URL}/${size}${path}`;
};

/**
 * Gets a movie category by its ID
 * @param categoryId - The category ID to search for
 * @returns The category object or undefined if not found
 */
export const getCategoryById = (categoryId: string): MovieCategory | undefined => {
  return MOVIE_CATEGORIES.find(cat => cat.id === categoryId);
};

/**
 * Formats a runtime in minutes to a human-readable string
 * @param minutes - Runtime in minutes
 * @returns Formatted runtime string (e.g., "2h 30m")
 */
export const formatRuntime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

/**
 * Formats a rating to display with one decimal place
 * @param rating - The rating value
 * @returns Formatted rating string
 */
export const formatRating = (rating: number): string => {
  return (Math.round(rating * 10) / 10).toFixed(1);
};

/**
 * Get year from release date string
 * 
 * @param releaseDate - ISO date string
 * @returns The year or 'N/A' if no date
 */
export const getYearFromDate = (releaseDate: string): string => {
  if (!releaseDate) return i18n.format.notAvailable;
  
  const year = new Date(releaseDate).getFullYear();
  return isNaN(year) ? i18n.format.notAvailable : year.toString();
};
