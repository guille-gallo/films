/**
 * ===========================================
 * WISHLIST STORE
 * ===========================================
 * @returns Zustand store with wishlist operations
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Movie } from '@/types';
import { WISHLIST_STORE } from '@/constants';

/**
 * CROSS-TAB SYNCHRONIZATION SETUP
 * Listen for storage changes in other tabs and sync state
 */
const setupCrossTabSync = (store: { setState: (state: Partial<WishlistStore>) => void }) => {
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === WISHLIST_STORE.PERSISTENCE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          const wishlist = parsed.state.wishlist || [];
          
          // Only need to sync the wishlist array - computed values will be derived
          store.setState({ wishlist });
          
        } catch (error) {
          // Cross-tab sync error handling
        }
      }
    });
  }
};

/**
 * WISHLIST STORE INTERFACE
 * Defines the shape of our store state and actions
 */
export interface WishlistStore {
  wishlist: Movie[];
  addToWishlist: (movie: Movie) => void;
  removeFromWishlist: (movieId: number) => void;
  clearWishlist: () => void;
  isInWishlist: (movieId: number) => boolean;
  getMovieStatus: (movieId: number) => boolean;
}

/**
 * WISHLIST ZUSTAND STORE
 */
export const wishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      
      addToWishlist: (movie: Movie) => {
        const current = get();
        // Check if already exists using array method
        if (current.wishlist.some(m => m.id === movie.id)) {
          return;
        }
        
        set((state) => ({
          wishlist: [movie, ...state.wishlist]
        }));
      },
      
      removeFromWishlist: (movieId: number) => {
        const current = get();
        // Check if exists using array method
        if (!current.wishlist.some(m => m.id === movieId)) {
          return;
        }
        
        set((state) => ({
          wishlist: state.wishlist.filter(movie => movie.id !== movieId)
        }));
      },
      
      clearWishlist: () => {
        set({ wishlist: [] });
      },
      
      isInWishlist: (movieId: number) => {
        return get().wishlist.some(movie => movie.id === movieId);
      },
      
      getMovieStatus: (movieId: number) => {
        return get().wishlist.some(movie => movie.id === movieId);
      },
    }),
    {
      name: WISHLIST_STORE.PERSISTENCE_KEY,
      version: WISHLIST_STORE.VERSION,
      
      // Simplified storage - only persist wishlist array
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          
          // Only need to ensure wishlist array exists
          return {
            ...parsed,
            state: {
              ...parsed.state,
              wishlist: parsed.state.wishlist || []
            }
          };
        },
        setItem: (name, value) => {
          // Only persist the wishlist array, computed values will be derived
          const toStore = {
            ...value,
            state: {
              wishlist: value.state.wishlist
            }
          };
          localStorage.setItem(name, JSON.stringify(toStore));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

// Setup cross-tab synchronization after store creation
setupCrossTabSync(wishlistStore);

// Also listen for focus events to refresh state when user switches back to tab
if (typeof window !== 'undefined') {
  window.addEventListener('focus', () => {
    // Refresh state when user focuses this tab
    const stored = localStorage.getItem(WISHLIST_STORE.PERSISTENCE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const wishlist = parsed.state.wishlist || [];
        
        // Only need to sync the wishlist array - computed values will be derived
        wishlistStore.setState({ wishlist });
      } catch (error) {
        console.error('Error refreshing state on focus:', error);
      }
    }
  });
}
