/**
 * ===========================================
 * INTERNATIONALIZATION CONSTANTS (i18n)
 * ===========================================
 * 
 * Centralized text content and UI copy for consistent localization support.
 * Following industry best practices for internationalization structure.
 * 
 * Usage:
 * ```typescript
 * import { i18n } from '@/constants/i18n';
 * 
 * // In component
 * <button>{i18n.buttons.addToWishlist}</button>
 * <h1>{i18n.pages.wishlist.title}</h1>
 * ```
 */

export const i18n = {
  /**
   * Common button labels and actions
   */
  buttons: {
    addToWishlist: 'Add to Wishlist',
    addedToWishlist: 'Added to Wishlist',
    removeFromWishlist: 'Remove from wishlist',
    retry: 'Retry',
    tryAgain: 'Try Again',
    goHome: 'Go Home',
    discoverMovies: 'Discover Movies',
    clearAll: 'Clear All',
    loading: 'Loading...',
    previous: 'Previous',
    next: 'Next'
  },

  /**
   * Navigation and header text
   */
  navigation: {
    siteTitle: 'Films',
    siteLogo: '🎬 Films',
    wishlistAriaLabel: (count: number) => `Go to wishlist (${count} movies)`,
    previousMoviesAria: (categoryName: string) => `Previous ${categoryName} movies`,
    nextMoviesAria: (categoryName: string) => `Next ${categoryName} movies`,
    carouselAriaLabel: (categoryName: string) => `${categoryName} movie carousel`,
    moviePositionAria: (index: number, total: number) => `Movie ${index + 1} of ${total}`
  },

  /**
   * Page-specific content and copy
   */
  pages: {
    wishlist: {
      title: 'Wishlist',
      empty: {
        icon: '💔',
        title: 'Your wishlist is empty',
        message: `Start exploring movies and add your favorites to your wishlist. 
          You'll be able to keep track of movies you want to watch later.`
      },
      clearConfirmation: 'Are you sure you want to clear your entire wishlist?'
    },
    notFound: {
      title: 'Page Not Found',
      message: "The page you're looking for doesn't exist."
    }
  },

  /**
   * Error messages and error handling
   */
  errors: {
    notFound: {
      title: "Movie Not Found",
      message: "The movie you're looking for couldn't be found. It might have been removed or doesn't exist.",
      emoji: "🎬"
    },
    network: {
      title: "Connection Error",
      message: "Unable to connect to the movie database. Please check your internet connection and try again.",
      emoji: "🌐"
    },
    category: {
      title: "Invalid Category",
      message: "The category you're looking for doesn't exist. Please try a different category.",
      emoji: "📂"
    },
    general: {
      title: "Something Went Wrong",
      message: "We encountered an unexpected error. Please try again in a moment.",
      emoji: "⚠️"
    },
    carouselLoadingFailed: (categoryName: string) => `Failed to load ${categoryName} movies`
  },

  /**
   * Loading states and progress indicators
   */
  loading: {
    movies: 'Loading movies...',
    movieDetails: 'Loading movie details...',
    general: 'Loading...'
  },

  /**
   * Utility text and data formatting
   */
  format: {
    invalidDate: 'Invalid Date',
    notAvailable: 'N/A',
    runtime: {
      hours: 'h',
      minutes: 'm'
    },
    currency: {
      billion: 'B',
      million: 'M',
      thousand: 'K'
    },
    truncateSuffix: '...'
  },

  /**
   * Accessibility labels and screen reader content
   */
  a11y: {
    skipToMain: 'Skip to main content',
    skipToNavigation: 'Skip to navigation',
    mainContentLabel: 'Main content',
    navigationLabel: 'Primary navigation',
    movieCardButton: 'Movie card, press Enter or Space to view details',
    loadingAnnounced: 'Content is loading, please wait',
    errorAnnounced: 'An error has occurred',
    wishlistSection: 'Wishlist section',
    homepageSection: 'Homepage movie categories',
    movieDetailSection: 'Movie details',
    carouselInstructions: 'Use arrow keys to navigate through movies, Enter to select',
    ratingLabel: (rating: string, votes: number) => `Rating ${rating} out of 10 based on ${votes} votes`,
    runtimeLabel: (runtime: string) => `Runtime ${runtime}`,
    releaseYearLabel: (year: string) => `Released in ${year}`,
    genresLabel: (genres: string) => `Genres: ${genres}`,
    movieOverviewLabel: 'Movie description',
    posterAlt: (title: string) => `Movie poster for ${title}`,
    wishlistCountAnnounced: (count: number) => `Wishlist has ${count} ${count === 1 ? 'movie' : 'movies'}`,
    carouselScrollLeft: 'Scroll to previous movies',
    carouselScrollRight: 'Scroll to next movies',
    roles: {
      alert: 'alert',
      polite: 'polite',
      region: 'region',
      group: 'group'
    }
  }
} as const;

// Export type for TypeScript intellisense
export type I18nKeys = typeof i18n;
