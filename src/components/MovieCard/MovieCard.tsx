/**
 * ===========================================
 * MOVIE CARD COMPONENT
 * ===========================================
 * 
 * A reusable movie card component
 * 
 * USAGE:
 * ```tsx
 * <MovieCard 
 *   movie={movieData}
 *   category={categoryData}
 *   onClick={() => navigateToMovie(movie.id)}
 * />
 * ```
 */

import React, { useState, useCallback, useMemo } from 'react';
import type { MovieCardProps } from '@/types';
import { getImageUrl, getYearFromDate, formatRating } from '@/utils/movieUtils';
import { StarIcon, HeartIcon, TrashIcon } from '@/components';
import { i18n } from '@/constants';
import './MovieCard.scss';

export const MovieCard: React.FC<MovieCardProps> = React.memo(({ 
  movie, 
  category, 
  onClick,
  showWishlistAction = false,
  inWishlist = false,
  onWishlistToggle,
  variant = 'default'
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Memoize expensive computations
  const computedData = useMemo(() => ({
    posterUrl: getImageUrl(movie.poster_path, 'w400'),
    releaseYear: getYearFromDate(movie.release_date),
    rating: formatRating(movie.vote_average)
  }), [movie.poster_path, movie.release_date, movie.vote_average]);

  // Memoize dynamic class name
  const cardClassName = useMemo(() => 
    `movie-card movie-card--${category.id} ${variant !== 'default' ? `movie-card--${variant}` : ''}`,
    [category.id, variant]
  );

  // Memoize click handlers to prevent child re-renders
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  const handleWishlistAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onWishlistToggle?.();
  }, [onWishlistToggle]);

  return (
    <div 
      className={cardClassName}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${movie.title}. ${i18n.a11y.ratingLabel(computedData.rating, movie.vote_count)}. ${i18n.a11y.releaseYearLabel(computedData.releaseYear)}. Press Enter to view details.`}
      aria-describedby={`movie-${movie.id}-overview`}
    >
      <div className="movie-card__image-container">
        {computedData.posterUrl && !imageError ? (
          <img
            src={computedData.posterUrl}
            alt={i18n.a11y.posterAlt(movie.title)}
            className="movie-card__image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div 
            className="movie-card__fallback"
            role="img"
            aria-label={i18n.a11y.posterAlt(movie.title)}
          >
            🎬
          </div>
        )}
        
        <div className="movie-card__overlay" />
        
        {/* Wishlist Action Button */}
        {showWishlistAction && onWishlistToggle && (
          <button
            className={`movie-card__wishlist-btn ${inWishlist ? 'movie-card__wishlist-btn--active' : ''}`}
            onClick={handleWishlistAction}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                handleWishlistAction(e as any);
              }
            }}
            aria-label={inWishlist 
              ? `Remove ${movie.title} from wishlist` 
              : `Add ${movie.title} to wishlist`
            }
          >
            {variant === 'wishlist' ? (
              <TrashIcon size={18} />
            ) : (
              <HeartIcon filled={inWishlist} size={18} />
            )}
          </button>
        )}
        
        <div className="movie-card__content">
          <h3 className="movie-card__title" id={`movie-${movie.id}-title`}>
            {movie.title}
          </h3>
          <div className="movie-card__meta">
            <div className="movie-card__rating">
              <StarIcon 
                className="movie-card__rating__star"
                aria-hidden="true"
              />
              <span aria-label={i18n.a11y.ratingLabel(computedData.rating, movie.vote_count)}>
                {computedData.rating}
              </span>
            </div>
            <span 
              className="movie-card__year"
              aria-label={i18n.a11y.releaseYearLabel(computedData.releaseYear)}
            >
              {computedData.releaseYear}
            </span>
          </div>
          
          {/* Hidden overview for screen readers */}
          <div 
            id={`movie-${movie.id}-overview`} 
            className="visually-hidden"
            aria-label={i18n.a11y.movieOverviewLabel}
          >
            {movie.overview || 'No description available.'}
          </div>
        </div>
      </div>
    </div>
  );
});
