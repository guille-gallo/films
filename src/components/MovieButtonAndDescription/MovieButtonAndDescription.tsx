/**
 * ===========================================
 * MOVIE BUTTON AND DESCRIPTION COMPONENT
 * ===========================================
 * 
 * Container for movie button actions and description text.
 * 
 * USAGE:
 * ```tsx
 * <MovieButtonAndDescription 
 *   movie={movieData}
 *   category={categoryData}
 * >
 *   <WishlistButton movie={movieData} category={categoryData} />
 * </MovieButtonAndDescription>
 * ```
 */

import React from 'react';
import type { MovieDetails, MovieCategory } from '@/types';
import { i18n } from '@/constants';
import './MovieButtonAndDescription.scss';

interface MovieButtonAndDescriptionProps {
  movie: MovieDetails;
  category: MovieCategory | undefined;
  children?: React.ReactNode;
}

export const MovieButtonAndDescription: React.FC<MovieButtonAndDescriptionProps> = React.memo(({
  movie,
  category,
  children
}) => {
  return (
    <div className={`movie-button-description movie-button-description--${category?.id}`}>
      {/* Wishlist button area - passed as children */}
      <div className="movie-button-description__button-area">
        {children}
      </div>

      {/* Description area */}
      <div className="movie-button-description__description">
        <div 
          className="movie-button-description__overview"
          aria-label={i18n.a11y.movieOverviewLabel}
          role="article"
        >
          <h3 className="visually-hidden">Movie Description</h3>
          {movie.overview || 'No overview available for this movie.'}
        </div>
      </div>
    </div>
  );
});

MovieButtonAndDescription.displayName = 'MovieButtonAndDescription';