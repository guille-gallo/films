/**
 * HTTP Status and Error Constants
 * 
 * Centralized HTTP status codes and error handling constants.
 * 
 * Usage:
 * ```typescript
 * import { HTTP_STATUS, ERROR_MESSAGES } from '@/constants/http';
 * 
 * // In service
 * if (response.status === HTTP_STATUS.NOT_FOUND) {
 *   throw new Error(ERROR_MESSAGES.RESOURCE_NOT_FOUND(url));
 * }
 * ```
 */

export const HTTP_STATUS = {
  OK: 200,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  RATE_LIMITED: 429,
  INTERNAL_SERVER_ERROR: 500
} as const;

export const ERROR_MESSAGES = {
  RESOURCE_NOT_FOUND: (url: string) => `Resource not found (404): ${url}`,
  UNAUTHORIZED: 'Unauthorized: Invalid API key',
  RATE_LIMITED: 'Rate limit exceeded. Please try again later',
  SERVER_ERROR: 'Server error. Please try again later',
  HTTP_ERROR: (status: number) => `HTTP error! status: ${status}`,
  NETWORK_ERROR: 'Network error: Unable to connect to movie database',
  FETCH_FAILED: 'Failed to fetch data',
  UNKNOWN_CATEGORY: (categoryId: string) => `Unknown category: ${categoryId}`,
  ROOT_ELEMENT_NOT_FOUND: 'Root element not found',
  FAILED_TO_SAVE_STORAGE: 'Failed to save to localStorage:',
  FAILED_TO_REMOVE_STORAGE: 'Failed to remove from localStorage:'
} as const;

export const ERROR_TYPES = {
  TYPE_ERROR: 'TypeError',
  FETCH_ERROR: 'fetch'
} as const;
