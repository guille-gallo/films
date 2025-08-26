/**
 * WISHLIST STORE TESTS
 */

import { wishlistStore } from '../src/stores/wishlistStore';

// Mock movie data for testing
const createTestMovie = (id = 123, overrides = {}) => ({
  id,
  title: `Test Movie ${id}`,
  overview: 'A test movie for unit testing purposes',
  poster_path: `/test-poster-${id}.jpg`,
  backdrop_path: `/test-backdrop-${id}.jpg`,
  release_date: '2023-08-15',
  vote_average: 8.5,
  vote_count: 1000,
  genre_ids: [28, 12],
  original_language: 'en',
  original_title: `Test Movie ${id}`,
  popularity: 95.0,
  adult: false,
  video: false,
  ...overrides
});

describe('WishlistStore - Core Functionality', () => {
  beforeEach(() => {
    // Reset store to clean state
    wishlistStore.setState({
      wishlist: [],
      wishlistSet: new Set(),
      movieStatuses: {}
    });
  });

  describe('Initial State', () => {
    it('should start with empty state', () => {
      const state = wishlistStore.getState();
      expect(state.wishlist).toEqual([]);
      expect(state.wishlistSet.size).toBe(0);
      expect(state.movieStatuses).toEqual({});
    });
  });

  describe('Adding Movies', () => {
    it('should add movie to wishlist', () => {
      const movie = createTestMovie(123);
      const { addToWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      
      const state = wishlistStore.getState();
      expect(state.wishlist).toHaveLength(1);
      expect(state.wishlist[0]).toEqual(movie);
    });

    it('should update wishlistSet for fast lookups', () => {
      const movie = createTestMovie(123);
      const { addToWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      
      const state = wishlistStore.getState();
      expect(state.wishlistSet.has(123)).toBe(true);
      expect(state.wishlistSet.size).toBe(1);
    });

    it('should update movieStatuses for performance', () => {
      const movie = createTestMovie(123);
      const { addToWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      
      const state = wishlistStore.getState();
      expect(state.movieStatuses[123]).toBe(true);
    });

    it('should not add duplicate movies', () => {
      const movie = createTestMovie(123);
      const { addToWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      addToWishlist(movie); // Try to add again
      
      const state = wishlistStore.getState();
      expect(state.wishlist).toHaveLength(1);
      expect(state.wishlistSet.size).toBe(1);
    });

    it('should add multiple different movies', () => {
      const movie1 = createTestMovie(123);
      const movie2 = createTestMovie(456);
      const { addToWishlist } = wishlistStore.getState();
      
      addToWishlist(movie1);
      addToWishlist(movie2);
      
      const state = wishlistStore.getState();
      expect(state.wishlist).toHaveLength(2);
      expect(state.wishlistSet.size).toBe(2);
      expect(state.wishlistSet.has(123)).toBe(true);
      expect(state.wishlistSet.has(456)).toBe(true);
    });
  });

  describe('Removing Movies', () => {
    it('should remove movie from wishlist', () => {
      const movie1 = createTestMovie(123);
      const movie2 = createTestMovie(456);
      const { addToWishlist, removeFromWishlist } = wishlistStore.getState();
      
      addToWishlist(movie1);
      addToWishlist(movie2);
      
      removeFromWishlist(123);
      
      const state = wishlistStore.getState();
      expect(state.wishlist).toHaveLength(1);
      expect(state.wishlist[0].id).toBe(456);
    });

    it('should update wishlistSet when removing', () => {
      const movie = createTestMovie(123);
      const { addToWishlist, removeFromWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      removeFromWishlist(123);
      
      const state = wishlistStore.getState();
      expect(state.wishlistSet.has(123)).toBe(false);
      expect(state.wishlistSet.size).toBe(0);
    });

    it('should remove from movieStatuses', () => {
      const movie = createTestMovie(123);
      const { addToWishlist, removeFromWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      expect(wishlistStore.getState().movieStatuses[123]).toBe(true);
      
      removeFromWishlist(123);
      expect(wishlistStore.getState().movieStatuses[123]).toBeUndefined();
    });

    it('should handle removing non-existent movie', () => {
      const movie = createTestMovie(123);
      const { addToWishlist, removeFromWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      const stateBefore = wishlistStore.getState();
      
      removeFromWishlist(999); // doesn't exist
      
      const stateAfter = wishlistStore.getState();
      expect(stateAfter.wishlist).toEqual(stateBefore.wishlist);
      expect(stateAfter.wishlistSet.size).toBe(stateBefore.wishlistSet.size);
    });
  });

  describe('Utility Methods', () => {
    it('should correctly identify movies in wishlist', () => {
      const movie = createTestMovie(123);
      const { addToWishlist, isInWishlist } = wishlistStore.getState();
      
      expect(isInWishlist(123)).toBe(false);
      
      addToWishlist(movie);
      expect(isInWishlist(123)).toBe(true);
    });

    it('should return correct movie status', () => {
      const movie = createTestMovie(123);
      const { addToWishlist, getMovieStatus } = wishlistStore.getState();
      
      expect(getMovieStatus(123)).toBe(false);
      
      addToWishlist(movie);
      expect(getMovieStatus(123)).toBe(true);
    });

    it('should clear entire wishlist', () => {
      const movie1 = createTestMovie(123);
      const movie2 = createTestMovie(456);
      const { addToWishlist, clearWishlist } = wishlistStore.getState();
      
      addToWishlist(movie1);
      addToWishlist(movie2);
      
      clearWishlist();
      
      const state = wishlistStore.getState();
      expect(state.wishlist).toEqual([]);
      expect(state.wishlistSet.size).toBe(0);
      expect(state.movieStatuses).toEqual({});
    });
  });

  describe('Performance Optimizations', () => {
    it('should use Set for O(1) lookups', () => {
      const movie = createTestMovie(123);
      const { addToWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      
      const state = wishlistStore.getState();
      // Spy on Set.has to ensure O(1) lookup is used
      const setSpy = jest.spyOn(state.wishlistSet, 'has');
      
      state.isInWishlist(123);
      expect(setSpy).toHaveBeenCalledWith(123);
      
      setSpy.mockRestore();
    });

    it('should maintain data structure consistency', () => {
      const movie = createTestMovie(123);
      const { addToWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      
      const state = wishlistStore.getState();
      
      // All data structures should be consistent
      expect(state.wishlist).toHaveLength(1);
      expect(state.wishlistSet.size).toBe(1);
      expect(Object.keys(state.movieStatuses)).toHaveLength(1);
      
      expect(state.wishlist[0].id).toBe(123);
      expect(state.wishlistSet.has(123)).toBe(true);
      expect(state.movieStatuses[123]).toBe(true);
    });
  });
});
