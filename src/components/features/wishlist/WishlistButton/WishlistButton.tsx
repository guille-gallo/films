/**
 * ===========================================
 * WISHLIST BUTTON COMPONENT
 * ===========================================
 * 
 * A button component for adding/removing movies from the wishlist.
 * 
 * USAGE:
 * ```tsx
 * <WishlistButton 
 *   movie={movieData}
 *   category={categoryData}
 *   className="custom-class"
 * />
 * ```
 */

import React from 'react';
import { HeartIcon } from '@/components';
import type { MovieDetails, MovieCategory } from '@/types';
import { useWishlist } from '@/hooks/useWishlist';
import { i18n } from '@/constants';

interface WishlistButtonProps {
  movie: MovieDetails;
  category: MovieCategory | undefined;
  className?: string;
}

export const WishlistButton: React.FC<WishlistButtonProps> = React.memo(({
  movie,
  category,
  className = ''
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const movieIsInWishlist = isInWishlist(movie.id);

  const handleClick = () => {
    toggleWishlist(movie);
  };

  return (
    <button
      className={`${className} movie-button-description__wishlist-btn movie-button-description__wishlist-btn--${category?.theme.buttonStyle} ${movieIsInWishlist ? 'movie-button-description__wishlist-btn--added' : ''}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={movieIsInWishlist 
        ? `Remove ${movie.title} from wishlist` 
        : `Add ${movie.title} to wishlist`
      }
      aria-pressed={movieIsInWishlist}
      aria-describedby={`wishlist-status-${movie.id}`}
    >
      <HeartIcon 
        filled={movieIsInWishlist} 
        size={20} 
        className="wishlist-btn__icon"
        aria-hidden="true"
      />
      <span>
        {movieIsInWishlist
          ? i18n.buttons.addedToWishlist
          : i18n.buttons.addToWishlist
        }
      </span>
      
      {/* Hidden status announcement for screen readers */}
      <span 
        id={`wishlist-status-${movie.id}`}
        className="visually-hidden"
        aria-live="polite"
        aria-atomic="true"
      >
        {movieIsInWishlist 
          ? `${movie.title} is in your wishlist`
          : `${movie.title} is not in your wishlist`
        }
      </span>
    </button>
  );
});

WishlistButton.displayName = 'WishlistButton';
