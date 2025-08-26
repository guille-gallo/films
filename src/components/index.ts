/**
 * ===========================================
 * CENTRALIZED COMPONENT EXPORTS
 * ===========================================
 * 
 * This file serves as the main entry point for all components in the application.
 * 
 * USAGE:
 * ```typescript
 * // ✅ Clean, centralized imports
 * import { Header, Carousel, MovieCard } from '@/components';
 * 
 * // ❌ Instead of scattered imports
 * import { Header } from '@/components/Header/Header';
 * import { Carousel } from '@/components/Carousel/Carousel';
 * import { MovieCard } from '@/components/MovieCard/MovieCard';
 * ```
 * 
 * * Component Categories:
 * 🏗️  LAYOUT & NAVIGATION
 * - Header: Main application header with navigation
 * - Carousel: Horizontal movie carousel with navigation
 * 
 * 🎬 MOVIE COMPONENTS
 * - MovieCard: Individual movie card for lists/carousels
 * - MovieImageArea: Movie poster display component
 * - MovieAdditionalInfo: Movie metadata (rating, year, runtime, etc.)
 * - MovieButtonAndDescription: Wishlist button and movie description
 * 
 * 🎨 UI COMPONENTS
 * - Icons: Centralized icon library (StarIcon, HeartIcon, etc.)
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
