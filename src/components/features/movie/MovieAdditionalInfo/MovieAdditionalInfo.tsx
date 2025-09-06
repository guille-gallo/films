/**
 * ===========================================
 * MOVIE ADDITIONAL INFO COMPONENT
 * ===========================================
 * 
 * Displays detailed movie information including rating, runtime, and release year.
 * 
 * USAGE:
 * ```tsx
 * <MovieAdditionalInfo 
 *   movie={movieData}
 * />
 * ```
 */

import React from 'react';
import { StarIcon } from '@/components';
import type { MovieDetails } from '@/types';
import { formatRating, formatRuntime, getYearFromDate } from '@/utils/movieUtils';
import { i18n } from '@/constants';
import './MovieAdditionalInfo.scss';

interface MovieAdditionalInfoProps {
  movie: MovieDetails;
}

export const MovieAdditionalInfo: React.FC<MovieAdditionalInfoProps> = React.memo(({
  movie
}) => {
  const rating = formatRating(movie.vote_average);
  const releaseYear = getYearFromDate(movie.release_date);
  const runtime = movie.runtime ? formatRuntime(movie.runtime) : 'N/A';

  return (
    <section 
      className="movie-additional-info"
      aria-labelledby="additional-info-title"
    >
      <h2 id="additional-info-title" className="visually-hidden">
        Movie Information Details
      </h2>
      
      <div className="movie-additional-info__grid" role="table" aria-label="Movie details">
        <div className="movie-additional-info__item" role="row">
          <div className="movie-additional-info__label" role="rowheader">Release Year</div>
          <div 
            className="movie-additional-info__value"
            role="cell"
            aria-label={i18n.a11y.releaseYearLabel(releaseYear)}
          >
            {releaseYear}
          </div>
        </div>
        
        <div className="movie-additional-info__item" role="row">
          <div className="movie-additional-info__label" role="rowheader">Genres</div>
          <div 
            className="movie-additional-info__value"
            role="cell"
            aria-label={i18n.a11y.genresLabel(movie.genres?.map(genre => genre.name).join(', ') || 'N/A')}
          >
            {movie.genres?.map(genre => genre.name).join(', ') || 'N/A'}
          </div>
        </div>
        
        <div className="movie-additional-info__item" role="row">
          <div className="movie-additional-info__label" role="rowheader">Runtime</div>
          <div 
            className="movie-additional-info__value"
            role="cell"
            aria-label={i18n.a11y.runtimeLabel(runtime)}
          >
            {runtime}
          </div>
        </div>
        
        <div className="movie-additional-info__item" role="row">
          <div className="movie-additional-info__label" role="rowheader">Rating</div>
          <div 
            className="movie-additional-info__value"
            role="cell"
          >
            <div className="movie-additional-info__rating">
              <StarIcon aria-hidden="true" />
              <span aria-label={i18n.a11y.ratingLabel(rating, movie.vote_count)}>
                {rating}
              </span>
              <span className="movie-additional-info__votes" aria-hidden="true">
                ({movie.vote_count} votes)
              </span>
            </div>
          </div>
        </div>
        
        <div className="movie-additional-info__item" role="row">
          <div className="movie-additional-info__label" role="rowheader">Language</div>
          <div 
            className="movie-additional-info__value"
            role="cell"
            aria-label={`Original language: ${movie.original_language?.toUpperCase() || 'N/A'}`}
          >
            {movie.original_language?.toUpperCase() || 'N/A'}
          </div>
        </div>
        
        <div className="movie-additional-info__item" role="row">
          <div className="movie-additional-info__label" role="rowheader">Status</div>
          <div 
            className="movie-additional-info__value"
            role="cell"
            aria-label={`Production status: ${movie.status || 'N/A'}`}
          >
            {movie.status || 'N/A'}
          </div>
        </div>
        
        {movie.budget > 0 && (
          <div className="movie-additional-info__item" role="row">
            <div className="movie-additional-info__label" role="rowheader">Budget</div>
            <div 
              className="movie-additional-info__value"
              role="cell"
              aria-label={`Production budget: $${movie.budget.toLocaleString()}`}
            >
              ${movie.budget.toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

MovieAdditionalInfo.displayName = 'MovieAdditionalInfo';