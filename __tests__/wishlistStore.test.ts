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
      wishlist: []
    });
  });

  describe('Initial State', () => {
    it('should start with empty state', () => {
      const state = wishlistStore.getState();
      expect(state.wishlist).toEqual([]);
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

    it('should update movie status for fast lookups', () => {
      const movie = createTestMovie(123);
      const { addToWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      
      const state = wishlistStore.getState();
      expect(state.getMovieStatus(123)).toBe(true);
    });

    it('should update isInWishlist for performance', () => {
      const movie = createTestMovie(123);
      const { addToWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      
      const state = wishlistStore.getState();
      expect(state.isInWishlist(123)).toBe(true);
    });

    it('should not add duplicate movies', () => {
      const movie = createTestMovie(123);
      const { addToWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      addToWishlist(movie); // Try to add again
      
      const state = wishlistStore.getState();
      expect(state.wishlist).toHaveLength(1);
    });

    it('should add multiple different movies', () => {
      const movie1 = createTestMovie(123);
      const movie2 = createTestMovie(456);
      const { addToWishlist } = wishlistStore.getState();
      
      addToWishlist(movie1);
      addToWishlist(movie2);
      
      const state = wishlistStore.getState();
      expect(state.wishlist).toHaveLength(2);
      expect(state.isInWishlist(123)).toBe(true);
      expect(state.isInWishlist(456)).toBe(true);
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

    it('should update movie status when removing', () => {
      const movie = createTestMovie(123);
      const { addToWishlist, removeFromWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      removeFromWishlist(123);
      
      const state = wishlistStore.getState();
      expect(state.isInWishlist(123)).toBe(false);
      expect(state.wishlist).toHaveLength(0);
    });

    it('should remove from movie statuses', () => {
      const movie = createTestMovie(123);
      const { addToWishlist, removeFromWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      expect(wishlistStore.getState().getMovieStatus(123)).toBe(true);
      
      removeFromWishlist(123);
      expect(wishlistStore.getState().getMovieStatus(123)).toBe(false);
    });

    it('should handle removing non-existent movie', () => {
      const movie = createTestMovie(123);
      const { addToWishlist, removeFromWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      const stateBefore = wishlistStore.getState();
      
      removeFromWishlist(999); // doesn't exist
      
      const stateAfter = wishlistStore.getState();
      expect(stateAfter.wishlist).toEqual(stateBefore.wishlist);
      expect(stateAfter.wishlist.length).toBe(stateBefore.wishlist.length);
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
    });
  });

  describe('Performance Optimizations', () => {
    it('should use array-based lookups efficiently', () => {
      const movie = createTestMovie(123);
      const { addToWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      
      const state = wishlistStore.getState();
      // Verify that lookups work correctly
      expect(state.isInWishlist(123)).toBe(true);
      expect(state.isInWishlist(999)).toBe(false);
    });

    it('should maintain data structure consistency', () => {
      const movie = createTestMovie(123);
      const { addToWishlist } = wishlistStore.getState();
      
      addToWishlist(movie);
      
      const state = wishlistStore.getState();
      
      // All data structures should be consistent
      expect(state.wishlist).toHaveLength(1);
      expect(state.wishlist[0].id).toBe(123);
      expect(state.isInWishlist(123)).toBe(true);
      expect(state.getMovieStatus(123)).toBe(true);
    });
  });
});
