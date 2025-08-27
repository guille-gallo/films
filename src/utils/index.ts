/**
 * ===========================================
 * GENERAL UTILITY FUNCTIONS
 * ===========================================
 * 
 * Collection of reusable utility functions for common operations across
 * the Films Browser application.
 * 
 * USAGE:
 * ```typescript
 * import { debounce, formatDate, formatCurrency, storage } from '@/utils';
 * 
 * // Debounce a search function
 * const debouncedSearch = debounce(searchMovies, 300);
 * 
 * // Format currency values
 * const budget = formatCurrency(50000000); // "$50.0M"
 * 
 * // Safe localStorage operations
 * const preferences = storage.get('user-prefs', {});
 * ```
 */

import { APP_CONFIG, ERROR_MESSAGES, i18n } from '@/constants';

/**
 * Debounce function to limit how often a function can be called
 * 
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number = APP_CONFIG.DEFAULTS.DEBOUNCE_DELAY
): (...args: Parameters<T>) => void => {
  // Use ReturnType<typeof setTimeout> for environment-agnostic timeout handle (avoids requiring NodeJS types)
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Format a date string to a localized format
 * 
 * @param dateString - ISO date string
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted date string or 'Invalid Date'
 */
export const formatDate = (dateString: string, locale: string = APP_CONFIG.DEFAULTS.LOCALE): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
  return i18n.format.invalidDate;
  }
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format large numbers (budget, revenue) to readable format
 */
export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(1)}${i18n.format.currency.billion}`;
  } else if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}${i18n.format.currency.million}`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}${i18n.format.currency.thousand}`;
  } else {
    return `$${amount}`;
  }
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + i18n.format.truncateSuffix;
};

/**
 * Check if an image URL is valid
 */
export const isValidImageUrl = (url: string | null): boolean => {
  return url !== null && url.length > 0 && !url.includes('null');
};

/**
 * Local storage helpers with error handling
 */
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(ERROR_MESSAGES.FAILED_TO_SAVE_STORAGE, error);
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(ERROR_MESSAGES.FAILED_TO_REMOVE_STORAGE, error);
    }
  }
};
