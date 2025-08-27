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
          
          // Reconstruct Set and movieStatuses from updated wishlist
          const wishlistSet = new Set<number>(wishlist.map((movie: Movie) => movie.id));
          const movieStatuses: Record<number, boolean> = {};
          wishlist.forEach((movie: Movie) => {
            movieStatuses[movie.id] = true;
          });
          
          // Update current tab's store with data from other tab
          store.setState({
            wishlist,
            wishlistSet,
            movieStatuses
          });
          
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
  wishlistSet: Set<number>;
  movieStatuses: Record<number, boolean>;
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
      wishlistSet: new Set<number>(),
      movieStatuses: {},
      
      addToWishlist: (movie: Movie) => {
        const { wishlistSet } = get();
        if (wishlistSet.has(movie.id)) {
          return;
        }
        
        set((state) => {
          const newWishlistSet = new Set(state.wishlistSet);
          newWishlistSet.add(movie.id);
          return {
            wishlist: [movie, ...state.wishlist],
            wishlistSet: newWishlistSet,
            movieStatuses: {
              ...state.movieStatuses,
              [movie.id]: true
            }
          };
        });
      },
      
      removeFromWishlist: (movieId: number) => {
        const { wishlistSet } = get();
        if (!wishlistSet.has(movieId)) {
          return;
        }
        
        set((state) => {
          const newWishlistSet = new Set(state.wishlistSet);
          newWishlistSet.delete(movieId);
          const newMovieStatuses = { ...state.movieStatuses };
          delete newMovieStatuses[movieId];
          
          return {
            wishlist: state.wishlist.filter(movie => movie.id !== movieId),
            wishlistSet: newWishlistSet,
            movieStatuses: newMovieStatuses
          };
        });
      },
      
      clearWishlist: () => {
        set({ 
          wishlist: [], 
          wishlistSet: new Set<number>(),
          movieStatuses: {}
        });
      },
      
      isInWishlist: (movieId: number) => 
        get().wishlistSet.has(movieId),
      
      getMovieStatus: (movieId: number) =>
        get().movieStatuses[movieId] ?? false,
    }),
    {
      name: WISHLIST_STORE.PERSISTENCE_KEY,
      version: WISHLIST_STORE.VERSION,
      
      // Custom storage for Set reconstruction
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          const wishlist = parsed.state.wishlist || [];
          
          // Reconstruct Set and movieStatuses from wishlist array
          const wishlistSet = new Set(wishlist.map((movie: Movie) => movie.id));
          const movieStatuses: Record<number, boolean> = {};
          wishlist.forEach((movie: Movie) => {
            movieStatuses[movie.id] = true;
          });
          
          return {
            ...parsed,
            state: {
              ...parsed.state,
              wishlistSet,
              movieStatuses
            }
          };
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
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
        
        const wishlistSet = new Set<number>(wishlist.map((movie: Movie) => movie.id));
        const movieStatuses: Record<number, boolean> = {};
        wishlist.forEach((movie: Movie) => {
          movieStatuses[movie.id] = true;
        });
        
        wishlistStore.setState({
          wishlist,
          wishlistSet,
          movieStatuses
        });
      } catch (error) {
        console.error('Error refreshing state on focus:', error);
      }
    }
  });
}
