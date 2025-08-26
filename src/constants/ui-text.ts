/**
 * UI Text Constants
 * 
 * Centralized UI labels, messages, and text content for consistent localization support.
 * 
 * Usage:
 * ```typescript
 * import { UI_TEXT } from '@/constants/ui-text';
 * 
 * // In component
 * <button>{UI_TEXT.BUTTONS.ADD_TO_WISHLIST}</button>
 * <h1>{UI_TEXT.PAGES.WISHLIST.TITLE}</h1>
 * ```
 */

export const UI_TEXT = {
  /**
   * Common button labels
   */
  BUTTONS: {
    ADD_TO_WISHLIST: 'Add to Wishlist',
    ADDED_TO_WISHLIST: 'Added to Wishlist',
    REMOVE_FROM_WISHLIST: 'Remove from wishlist',
    RETRY: 'Retry',
    TRY_AGAIN: 'Try Again',
    GO_HOME: 'Go Home',
    DISCOVER_MOVIES: 'Discover Movies',
    CLEAR_ALL: 'Clear All',
    LOADING: 'Loading...',
    PREVIOUS: 'Previous',
    NEXT: 'Next'
  },

  /**
   * Navigation and header text
   */
  NAVIGATION: {
    SITE_TITLE: 'Films',
    SITE_LOGO: '🎬 Films',
    WISHLIST_ARIA_LABEL: (count: number) => `Go to wishlist (${count} movies)`,
    PREVIOUS_MOVIES_ARIA: (categoryName: string) => `Previous ${categoryName} movies`,
    NEXT_MOVIES_ARIA: (categoryName: string) => `Next ${categoryName} movies`,
    CAROUSEL_ARIA_LABEL: (categoryName: string) => `${categoryName} movie carousel`,
    MOVIE_POSITION_ARIA: (index: number, total: number) => `Movie ${index + 1} of ${total}`
  },

  /**
   * Page-specific text content
   */
  PAGES: {
    WISHLIST: {
      TITLE: 'Wishlist',
      EMPTY: {
        ICON: '💔',
        TITLE: 'Your wishlist is empty',
        MESSAGE: `Start exploring movies and add your favorites to your wishlist. 
          You'll be able to keep track of movies you want to watch later.`
      },
      CLEAR_CONFIRMATION: 'Are you sure you want to clear your entire wishlist?'
    },
    NOT_FOUND: {
      TITLE: 'Page Not Found',
      MESSAGE: "The page you're looking for doesn't exist."
    }
  },

  /**
   * Error messages and types
   */
  ERRORS: {
    NOT_FOUND: {
      TITLE: "Movie Not Found",
      MESSAGE: "The movie you're looking for couldn't be found. It might have been removed or doesn't exist.",
      EMOJI: "🎬"
    },
    NETWORK: {
      TITLE: "Connection Error",
      MESSAGE: "Unable to connect to the movie database. Please check your internet connection and try again.",
      EMOJI: "🌐"
    },
    CATEGORY: {
      TITLE: "Invalid Category",
      MESSAGE: "The category you're looking for doesn't exist. Please try a different category.",
      EMOJI: "📂"
    },
    GENERAL: {
      TITLE: "Something Went Wrong",
      MESSAGE: "We encountered an unexpected error. Please try again in a moment.",
      EMOJI: "⚠️"
    },
    CAROUSEL_LOADING_FAILED: (categoryName: string) => `Failed to load ${categoryName} movies`
  },

  /**
   * Loading states
   */
  LOADING: {
    MOVIES: 'Loading movies...',
    MOVIE_DETAILS: 'Loading movie details...',
    GENERAL: 'Loading...'
  },

  /**
   * Utility text and formatting
   */
  UTILITY: {
    INVALID_DATE: 'Invalid Date',
    NOT_AVAILABLE: 'N/A',
    RUNTIME_SUFFIX: {
      HOURS: 'h',
      MINUTES: 'm'
    },
    CURRENCY_SUFFIX: {
      BILLION: 'B',
      MILLION: 'M',
      THOUSAND: 'K'
    },
    TRUNCATE_SUFFIX: '...'
  },

  /**
   * Accessibility labels
   */
  ACCESSIBILITY: {
    ERROR_ROLE: 'alert',
    ERROR_LIVE: 'polite',
    CAROUSEL_REGION: 'region',
    MOVIE_GROUP: 'group',
    SKIP_TO_MAIN: 'Skip to main content',
    SKIP_TO_NAVIGATION: 'Skip to navigation',
    MAIN_CONTENT_LABEL: 'Main content',
    NAVIGATION_LABEL: 'Primary navigation',
    MOVIE_CARD_BUTTON: 'Movie card, press Enter or Space to view details',
    LOADING_ANNOUNCED: 'Content is loading, please wait',
    ERROR_ANNOUNCED: 'An error has occurred',
    WISHLIST_SECTION: 'Wishlist section',
    HOMEPAGE_SECTION: 'Homepage movie categories',
    MOVIE_DETAIL_SECTION: 'Movie details',
    CAROUSEL_INSTRUCTIONS: 'Use arrow keys to navigate through movies, Enter to select',
    RATING_LABEL: (rating: string, votes: number) => `Rating ${rating} out of 10 based on ${votes} votes`,
    RUNTIME_LABEL: (runtime: string) => `Runtime ${runtime}`,
    RELEASE_YEAR_LABEL: (year: string) => `Released in ${year}`,
    GENRES_LABEL: (genres: string) => `Genres: ${genres}`,
    MOVIE_OVERVIEW_LABEL: 'Movie description',
    POSTER_ALT: (title: string) => `Movie poster for ${title}`,
    WISHLIST_COUNT_ANNOUNCED: (count: number) => `Wishlist has ${count} ${count === 1 ? 'movie' : 'movies'}`,
    CAROUSEL_SCROLL_LEFT: 'Scroll to previous movies',
    CAROUSEL_SCROLL_RIGHT: 'Scroll to next movies'
  }
} as const;
