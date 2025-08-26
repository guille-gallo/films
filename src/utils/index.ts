/**
 * Utility functions for the Films Browser application
 */

import { APP_CONFIG, ERROR_MESSAGES, i18n } from '@/constants';

/**
 * Debounce function to limit how often a function can be called
 * 
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number = APP_CONFIG.DEFAULTS.DEBOUNCE_DELAY
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  
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
 * Generate unique ID for components
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
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

/**
 * Array shuffle function using Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Create intersection observer for lazy loading
 */
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: APP_CONFIG.DEFAULTS.INTERSECTION_ROOT_MARGIN,
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};
