/**
 * MOVIE UTILITIES UNIT TESTS
 */

import { 
  MOVIE_CATEGORIES,
  getImageUrl,
  getCategoryById,
  formatRuntime,
  formatRating,
  getYearFromDate
} from '../src/utils/movieUtils';

describe('Movie Utilities', () => {
  describe('MOVIE_CATEGORIES Configuration', () => {
    it('should have all required categories', () => {
      expect(MOVIE_CATEGORIES).toBeDefined();
      expect(Array.isArray(MOVIE_CATEGORIES)).toBe(true);
      expect(MOVIE_CATEGORIES.length).toBeGreaterThan(0);
    });

    it('should have properly structured category objects', () => {
      const category = MOVIE_CATEGORIES[0];
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('name');
      expect(category).toHaveProperty('endpoint');
      expect(category).toHaveProperty('theme');
    });
  });

  describe('getCategoryById', () => {
    it('should find existing categories', () => {
      const category = getCategoryById('popular');
      expect(category).toBeDefined();
      expect(category?.id).toBe('popular');
      expect(category?.name).toBeDefined();
    });

    it('should return undefined for non-existent categories', () => {
      const category = getCategoryById('non-existent');
      expect(category).toBeUndefined();
    });

    it('should handle empty string', () => {
      const category = getCategoryById('');
      expect(category).toBeUndefined();
    });
  });

  describe('getImageUrl', () => {
    it('should generate correct image URLs', () => {
      const url = getImageUrl('/test-poster.jpg', 'w500');
      expect(url).toContain('test-poster.jpg');
      expect(url).toContain('w500');
      expect(url).toContain('image.tmdb.org');
    });

    it('should handle null image paths', () => {
      const url = getImageUrl(null, 'w500');
      expect(url).toBeNull();
    });

    it('should handle undefined image paths', () => {
      const url = getImageUrl(undefined as any, 'w500');
      expect(url).toBeNull();
    });

    it('should use different sizes correctly', () => {
      const smallUrl = getImageUrl('/test.jpg', 'w200');
      const largeUrl = getImageUrl('/test.jpg', 'w500');
      
      expect(smallUrl).toContain('w200');
      expect(largeUrl).toContain('w500');
      expect(smallUrl).not.toBe(largeUrl);
    });
  });

  describe('formatRating', () => {
    it('should format ratings to one decimal place', () => {
      expect(formatRating(8.7)).toBe('8.7');
      expect(formatRating(7)).toBe('7.0');
      expect(formatRating(10)).toBe('10.0');
    });

    it('should handle edge cases', () => {
      expect(formatRating(0)).toBe('0.0');
      expect(formatRating(0.1)).toBe('0.1');
      expect(formatRating(9.99)).toBe('10.0');
    });

    it('should handle invalid ratings', () => {
      expect(formatRating(-1)).toBe('-1.0');
      expect(formatRating(11)).toBe('11.0');
    });
  });

  describe('formatRuntime', () => {
    it('should format runtime correctly', () => {
      expect(formatRuntime(120)).toBe('2h');
      expect(formatRuntime(150)).toBe('2h 30m');
      expect(formatRuntime(90)).toBe('1h 30m');
    });

    it('should handle edge cases', () => {
      expect(formatRuntime(0)).toBe('0m');
      expect(formatRuntime(60)).toBe('1h');
      expect(formatRuntime(30)).toBe('30m');
    });

    it('should handle long runtimes', () => {
      expect(formatRuntime(300)).toBe('5h');
      expect(formatRuntime(185)).toBe('3h 5m');
    });
  });

  describe('getYearFromDate', () => {
    it('should extract year from valid dates', () => {
      expect(getYearFromDate('2023-08-15')).toBe('2023');
      expect(getYearFromDate('1999-12-31')).toBe('1999');
      expect(getYearFromDate('2025-01-01')).toBe('2025');
    });

    it('should handle invalid dates', () => {
      expect(getYearFromDate('invalid-date')).toBe('N/A');
      expect(getYearFromDate('')).toBe('N/A');
    });

    it('should handle null dates', () => {
      expect(getYearFromDate(null as any)).toBe('N/A');
    });
  });
});
