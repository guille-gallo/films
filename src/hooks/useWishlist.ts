/**
 * ===========================================
 * useWishlist HOOK
 * ===========================================
 * 
 * Custom hook for managing movie wishlist with persistent storage.
 * 
 * USAGE:
 * ```tsx
 * const { isInWishlist, toggleWishlist, count } = useWishlist();
 * ```
 */

import { useCallback } from 'react';
import type { Movie } from '@/types';
import { wishlistStore } from '@/stores';

export const useWishlist = () => {
  // Subscribe to store - only need the wishlist array
  const wishlist = wishlistStore((state) => state.wishlist);

  // Actions
  const addToWishlist = useCallback((movie: Movie) => {
    wishlistStore.getState().addToWishlist(movie);
  }, []);

  const removeFromWishlist = useCallback((movieId: number) => {
    wishlistStore.getState().removeFromWishlist(movieId);
  }, []);

  const clearWishlist = useCallback(() => {
    wishlistStore.getState().clearWishlist();
  }, []);

  // Utility functions - use the store's optimized methods
  const isInWishlist = useCallback((movieId: number): boolean => {
    return wishlistStore.getState().isInWishlist(movieId);
  }, []);

  const toggleWishlist = useCallback((movie: Movie) => {
    if (isInWishlist(movie.id)) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist]);

  return {
    wishlist,
    count: wishlist.length,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    toggleWishlist,
  };
};
