import { 
  debounce, 
  formatDate, 
  formatCurrency, 
  truncateText,
  isValidImageUrl,
  storage
} from '../src/utils';

describe('Utility Functions', () => {
  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should delay function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('test');
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledWith('test');
    });

    it('should cancel previous calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('first');
      debouncedFn('second');
      
      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('second');
    });
  });

  describe('formatDate', () => {
    it('should format valid date string', () => {
      const result = formatDate('2023-12-25');
      expect(result).toContain('December');
      expect(result).toContain('25');
      expect(result).toContain('2023');
    });

    it('should handle invalid date', () => {
      const result = formatDate('invalid-date');
      expect(result).toBe('Invalid Date');
    });
  });

  describe('formatCurrency', () => {
    it('should format large amounts correctly', () => {
      expect(formatCurrency(1500000000)).toBe('$1.5B');
      expect(formatCurrency(150000000)).toBe('$150.0M');
      expect(formatCurrency(15000)).toBe('$15K');
      expect(formatCurrency(500)).toBe('$500');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'This is a very long text that should be truncated';
      expect(truncateText(longText, 20)).toBe('This is a very long...');
    });

    it('should not truncate short text', () => {
      const shortText = 'Short text';
      expect(truncateText(shortText, 20)).toBe('Short text');
    });
  });

  describe('isValidImageUrl', () => {
    it('should validate image URLs correctly', () => {
      expect(isValidImageUrl('/valid-path.jpg')).toBe(true);
      expect(isValidImageUrl(null)).toBe(false);
      expect(isValidImageUrl('')).toBe(false);
      expect(isValidImageUrl('/null')).toBe(false);
    });
  });

  describe('storage', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should store and retrieve data', () => {
      const testData = { test: 'value' };
      storage.set('test-key', testData);
      const retrieved = storage.get('test-key', {});
      expect(retrieved).toEqual(testData);
    });

    it('should return default value when key does not exist', () => {
      const defaultValue = { default: true };
      const result = storage.get('non-existent', defaultValue);
      expect(result).toEqual(defaultValue);
    });

    it('should handle storage errors gracefully', () => {
      // Mock localStorage to throw error
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = jest.fn(() => {
        throw new Error('Storage full');
      });

      expect(() => storage.set('test', 'value')).not.toThrow();
      
      localStorage.setItem = originalSetItem;
    });
  });
});
