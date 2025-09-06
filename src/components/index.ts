/**
 * ===========================================
 * CENTRALIZED COMPONENT EXPORTS
 * ===========================================
 * 
 * This file serves as the main entry point for all components in the application.
 * 
 * USAGE:
 * ```tsx
 * import { Header, Carousel, MovieCard } from '@/components';
 * 
 * // Instead of:
 * import { Header } from '@/components/Header';
 * import { Carousel } from '@/components/Carousel';
 * import { MovieCard } from '@/components/MovieCard';
 * ```
 */

// Layout Components (navigation, structure, layout)
export * from './layout';

// UI Primitives (simple, reusable components including icons)
export * from './ui';

// Feature Components (domain-specific functionality)
export * from './features';
