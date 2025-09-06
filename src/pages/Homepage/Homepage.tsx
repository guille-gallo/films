/**
 * ===========================================
 * HOMEPAGE
 * ===========================================
 * 
 * Main homepage displaying movie carousels for different categories.
 * 
 * USAGE:
 * ```tsx
 * <Homepage />
 * ```
 */

import React from 'react';
import { Carousel } from '@/components';
import { useMovies } from '@/hooks/useMovies';
import { useMovieNavigation } from '@/hooks/useMovieNavigation';
import { MOVIE_CATEGORIES } from '@/utils/movieUtils';
import { i18n } from '@/constants';
import './Homepage.scss';

export const Homepage: React.FC = () => {
  const handleMovieClick = useMovieNavigation();
  
  // Fetch movies for all categories
  const popularMovies = useMovies('popular');
  const topRatedMovies = useMovies('top_rated');
  const upcomingMovies = useMovies('upcoming');

  return (
    <div className="homepage">
      <main 
        className="homepage__content"
        aria-label={i18n.a11y.homepageSection}
      >
        <h1 className="visually-hidden">{i18n.pages.homepage.moviesByCategory}</h1>
        
        <div className="homepage__section">
          <Carousel
            category={MOVIE_CATEGORIES[0]} // Popular
            movies={popularMovies.data?.results || []}
            loading={popularMovies.isLoading}
            error={popularMovies.error?.message || null}
            onMovieClick={handleMovieClick}
            onRetry={() => popularMovies.refetch()}
          />
        </div>

        <div className="homepage__section">
          <Carousel
            category={MOVIE_CATEGORIES[1]} // Top Rated
            movies={topRatedMovies.data?.results || []}
            loading={topRatedMovies.isLoading}
            error={topRatedMovies.error?.message || null}
            onMovieClick={handleMovieClick}
            onRetry={() => topRatedMovies.refetch()}
          />
        </div>

        <div className="homepage__section">
          <Carousel
            category={MOVIE_CATEGORIES[2]} // Upcoming
            movies={upcomingMovies.data?.results || []}
            loading={upcomingMovies.isLoading}
            error={upcomingMovies.error?.message || null}
            onMovieClick={handleMovieClick}
            onRetry={() => upcomingMovies.refetch()}
          />
        </div>
      </main>
    </div>
  );
};
