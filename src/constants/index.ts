/**
 * Constants Index
 * 
 * Centralized export of all application constants for easy imports.
 * 
 * Usage:
 * ```typescript
 * import { i18n, ROUTES, APP_CONFIG } from '@/constants';
 * 
 * // Or import specific modules
 * import { i18n } from '@/constants/i18n';
 * import { ROUTES } from '@/constants/routes';
 * ```
 */

// API and service constants
export * from './api';

// Application configuration
export * from './config';

// HTTP status and error handling
export * from './http';

// Internationalization and UI copy
export * from './i18n';

// Navigation and routing
export * from './routes';

// User interface text and labels (deprecated - use i18n instead)
// ...existing code...

// Wishlist functionality
export * from './wishlist';
