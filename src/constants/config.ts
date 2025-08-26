/**
 * Application Configuration Constants
 * 
 * Centralized application settings, IDs, and configuration values.
 * 
 * Usage:
 * ```typescript
 * import { APP_CONFIG } from '@/constants/config';
 * 
 * // In component
 * document.getElementById(APP_CONFIG.DOM.ROOT_ID)
 * localStorage.getItem(APP_CONFIG.STORAGE.WISHLIST_KEY)
 * ```
 */

export const APP_CONFIG = {
  /**
   * DOM element identifiers
   */
  DOM: {
    ROOT_ID: 'root',
    APP_CLASS: 'app'
  },

  /**
   * Local storage keys
   */
  STORAGE: {
    WISHLIST_KEY: 'films-wishlist'
  },

  /**
   * React Query configuration
   */
  QUERY: {
    KEYS: {
      MOVIES: 'movies',
      MOVIE: 'movie'
    }
  },

  /**
   * Default values and fallbacks
   */
  DEFAULTS: {
    API_KEY_FALLBACK: 'YOUR_API_KEY_HERE',
    IMAGE_SIZE: 'w500',
    LOCALE: 'en-US',
    DEBOUNCE_DELAY: 300,
    INTERSECTION_ROOT_MARGIN: '50px'
  },

  /**
   * CSS class name patterns
   */
  CSS_CLASSES: {
    EMPTY_WISHLIST_COUNT: 'header__wishlist-btn__count--empty',
    WISHLIST_ADDED: 'movie-button-description__wishlist-btn--added',
    LOADING_RETRY: 'error-message__retry--loading'
  },

  /**
   * Component variants and types
   */
  COMPONENT_VARIANTS: {
    MOVIE_CARD: {
      WISHLIST: 'wishlist'
    },
    ERROR_TYPES: ['network', 'not-found', 'category', 'general'] as const
  },

  /**
   * URL and path patterns
   */
  URL_PATTERNS: {
    MOVIE_ENDPOINT: (id: number) => `/movie/${id}`
  }
} as const;
