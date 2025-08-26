/**
 * Wishlist Store Constants
 * 
 * Centralized constants for wishlist store configuration and persistence.
 * 
 * Usage:
 * ```typescript
 * import { WISHLIST_STORE } from '@/constants/wishlist';
 * 
 * // In store
 * name: WISHLIST_STORE.PERSISTENCE_KEY
 * version: WISHLIST_STORE.VERSION
 * ```
 */

export const WISHLIST_STORE = {
  /**
   * Store persistence configuration
   */
  PERSISTENCE_KEY: 'films-wishlist',
  VERSION: 1,

  /**
   * Store state structure keys
   */
  STATE_KEYS: {
    WISHLIST: 'wishlist',
    WISHLIST_SET: 'wishlistSet',
    MOVIE_STATUSES: 'movieStatuses'
  }
} as const;
