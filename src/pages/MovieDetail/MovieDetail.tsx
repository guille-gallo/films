/**
 * ===========================================
 * MOVIE DETAIL
 * ===========================================
 * 
 * Detailed movie view page with full information and wishlist functionality.
 * 
 * USAGE:
 * ```tsx
 * <MovieDetail />
 * ```
 */

import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import { getCategoryById, getImageUrl, formatRating, formatRuntime, getYearFromDate } from '@/utils/movieUtils';
import { Image, Description, InfoGrid, ActionArea, WishlistButton, ErrorMessage, StarIcon } from '@/components';
import { ROUTES, QUERY_PARAMS, i18n } from '@/constants';
import './MovieDetail.scss';

export const MovieDetail: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const categoryId = searchParams.get(QUERY_PARAMS.CATEGORY) || 'popular';
  const category = getCategoryById(categoryId);
  
  const { data: movie, isLoading, error, refetch: retry } = useMovieDetails(Number(movieId));

  if (!movieId) {
    navigate(ROUTES.HOME);
    return null;
  }

  if (!category) {
    return (
      <ErrorMessage 
        type="category"
        onRetry={() => navigate(ROUTES.HOME)}
        retryLabel={i18n.buttons.goHome}
      />
    );
  }

  if (isLoading) {
    return (
      <div className={`movie-detail movie-detail--${categoryId}`}>
        <div 
          className="movie-detail__loading"
          role="status"
          aria-live="polite"
          aria-label={i18n.a11y.loadingAnnounced}
        >
          <div className="loading__spinner" aria-hidden="true" />
          <span className="visually-hidden">
            {i18n.loading.movieDetails}
          </span>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    const errorType = error?.message?.includes('404') || error?.message?.includes('not found') 
      ? 'not-found' 
      : 'network';
    
    return (
      <ErrorMessage 
        type={errorType}
        onRetry={() => retry()}
      />
    );
  }

  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const rating = formatRating(movie.vote_average);
  const releaseYear = getYearFromDate(movie.release_date);
  const runtime = movie.runtime ? formatRuntime(movie.runtime) : 'N/A';

  const infoItems = [
    { 
      label: 'Release Year', 
      value: releaseYear,
      ariaLabel: i18n.a11y.releaseYearLabel(releaseYear)
    },
    { 
      label: 'Runtime', 
      value: runtime,
      ariaLabel: i18n.a11y.runtimeLabel(runtime)
    },
    { 
      label: 'Rating', 
      value: (
        <div className="rating-display">
          <StarIcon />
          <span>{rating}</span>
        </div>
      ),
      ariaLabel: i18n.a11y.ratingLabel(rating, movie.vote_count)
    }
  ];

  return (
    <div className={`movie-detail movie-detail--${categoryId}`}>
      <main 
        className="movie-detail__main"
        aria-labelledby="movie-title"
        aria-describedby="movie-overview"
      >
        <h1 id="movie-title" className="visually-hidden">
          {movie.title}
        </h1>
        
        <Image 
          src={posterUrl}
          alt={`${movie.title} poster`}
          fallback="🎬"
          className="movie-image-area__poster"
        />

        <section 
          aria-labelledby="movie-actions-title"
          className={`movie-detail__actions-section movie-button-description movie-button-description--${categoryId}`}
        >
          <h2 id="movie-actions-title" className="visually-hidden">
            {i18n.a11y.movieActionsSection}
          </h2>
          
          <ActionArea className="movie-button-description__button-area">
            <WishlistButton
              movie={movie}
              category={category}
              className="movie-button-description__wishlist-btn"
            />
          </ActionArea>
          
          <div className="movie-button-description__description">
            <Description 
              text={movie.overview}
              fallback="No overview available for this movie."
              title="Movie Description"
              aria-label={i18n.a11y.movieOverviewLabel}
              className="movie-button-description__overview"
            />
          </div>
        </section>
      </main>

      <aside 
        aria-labelledby="additional-info-title"
        className="movie-detail__aside"
      >
        <InfoGrid 
          items={infoItems}
          title="Movie Information Details"
          aria-label="Movie details"
          className="movie-additional-info"
        />
      </aside>
    </div>
  );
};
