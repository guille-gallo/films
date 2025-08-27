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

// Core UI Components
export { Header } from './Header';
export { Carousel } from './Carousel';
export { MovieCard } from './MovieCard';
export { default as ErrorMessage } from './ErrorMessage';

// Movie Detail Components
export { MovieImageArea } from './MovieImageArea';
export { MovieButtonAndDescription } from './MovieButtonAndDescription';
export { MovieAdditionalInfo } from './MovieAdditionalInfo';
export { WishlistButton } from './WishlistButton';

// Icon Components
export * from './Icons';
