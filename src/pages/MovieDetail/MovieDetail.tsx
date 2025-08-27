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
import { getCategoryById } from '@/utils/movieUtils';
import { MovieImageArea } from '@/components/MovieImageArea/MovieImageArea';
import { MovieButtonAndDescription } from '@/components/MovieButtonAndDescription/MovieButtonAndDescription';
import { MovieAdditionalInfo } from '@/components/MovieAdditionalInfo/MovieAdditionalInfo';
import { WishlistButton } from '@/components/WishlistButton/WishlistButton';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
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
        
        <MovieImageArea 
          posterPath={movie.poster_path}
          title={movie.title}
        />

        <section 
          aria-labelledby="movie-actions-title"
          className="movie-detail__actions-section"
        >
          <h2 id="movie-actions-title" className="visually-hidden">
            {i18n.a11y.movieActionsSection}
          </h2>
          
          <MovieButtonAndDescription 
            movie={movie}
            category={category}
          >
            <WishlistButton
              movie={movie}
              category={category}
              className="movie-button-description__wishlist-btn"
            />
          </MovieButtonAndDescription>
        </section>
      </main>

      <aside 
        aria-labelledby="additional-info-title"
        className="movie-detail__aside"
      >
        <MovieAdditionalInfo movie={movie} />
      </aside>
    </div>
  );
};
