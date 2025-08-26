/**
 * ===========================================
 * useWishlist HOOK - SENIOR LEVEL DESIGN
 * ===========================================
 * 
 */

import { useCallback } from 'react';
import type { Movie } from '@/types';
import { wishlistStore } from '@/stores';

export const useWishlist = () => {
  // Subscribe to the full wishlist state
  const wishlist = wishlistStore((state) => state.wishlist);
  const movieStatuses = wishlistStore((state) => state.movieStatuses);

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

  // Utility functions
  const isInWishlist = useCallback((movieId: number): boolean => {
    return movieStatuses[movieId] ?? false;
  }, [movieStatuses]);

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
