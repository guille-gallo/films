/**
 * ===========================================
 * CAROUSEL COMPONENT
 * ===========================================
 * 
 * Horizontal scrollable carousel for displaying movies with navigation controls.
 * Supports different movie categories with category-specific styling.
 * 
 * USAGE:
 * ```tsx
 * <Carousel 
 *   category={movieCategory}
 *   movies={movieList}
 *   loading={isLoading}
 *   error={errorMessage}
 *   onMovieClick={(movieId, category) => navigate(`/movie/${movieId}`)}
 * />
 * ```
 */

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import type { CarouselProps } from '@/types';
import { MovieCard } from '@/components/features/movie/MovieCard/MovieCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components';
import { i18n } from '@/constants';
import './Carousel.scss';

export const Carousel: React.FC<CarouselProps> = ({ 
  category, 
  movies, 
  loading, 
  error, 
  onMovieClick,
  onRetry 
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Update scroll button states
  const updateScrollState = useCallback(() => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  // Update scroll state when dependencies change
  useEffect(() => {
    updateScrollState();
    if (trackRef.current) {
      trackRef.current.addEventListener('scroll', updateScrollState);
      return () => trackRef.current?.removeEventListener('scroll', updateScrollState);
    }
  }, [updateScrollState, movies]);

  // Update scroll state when movies load
  useEffect(() => {
    if (movies.length > 0) {
      const timeout = setTimeout(updateScrollState, 100);
      return () => clearTimeout(timeout);
    }
  }, [movies.length, updateScrollState]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = trackRef.current.clientWidth * 0.75;
      const newScrollLeft = direction === 'left' 
        ? trackRef.current.scrollLeft - scrollAmount
        : trackRef.current.scrollLeft + scrollAmount;
      
      trackRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  }, []);

  // Memoize computed class names to avoid unnecessary string concatenation
  const titleClassName = useMemo(() => 
    `carousel__title carousel__title--${category.id}`, 
    [category.id]
  );

  const spinnerClassName = useMemo(() => 
    `carousel__loading__spinner carousel__loading__spinner--${category.id}`, 
    [category.id]
  );

  const prevNavClassName = useMemo(() => 
    `carousel__nav carousel__nav--prev carousel__nav--${category.id}`, 
    [category.id]
  );

  const nextNavClassName = useMemo(() => 
    `carousel__nav carousel__nav--next carousel__nav--${category.id}`, 
    [category.id]
  );

  // Memoize ARIA labels to avoid unnecessary function calls
  const ariaLabels = useMemo(() => ({
    previousMovies: i18n.navigation.previousMoviesAria(category.name),
    nextMovies: i18n.navigation.nextMoviesAria(category.name),
    carouselRegion: i18n.navigation.carouselAriaLabel(category.name),
    carouselErrorTitle: i18n.errors.carouselLoadingFailed(category.name)
  }), [category.name]);

  // Memoize the click handler factory to avoid creating new functions for each movie
  const handleMovieClick = useCallback((movieId: number) => {
    onMovieClick(movieId, category.id);
  }, [onMovieClick, category.id]);

  if (loading && movies.length === 0) {
    return (
      <section className="carousel">
        <div className="carousel__header">
          <h2 className={titleClassName}>
            {category.name}
          </h2>
        </div>
        <div className="carousel__loading">
          <div className={spinnerClassName} />
        </div>
      </section>
    );
  }

  if (error && movies.length === 0) {
    return (
      <section className="carousel">
        <div className="carousel__header">
          <h2 className={titleClassName}>
            {category.name}
          </h2>
        </div>
        <div className="carousel__error">
          <h3 className="carousel__error__title">{ariaLabels.carouselErrorTitle}</h3>
          <p className="carousel__error__message">{error}</p>
          {onRetry && (
            <button className="carousel__error__retry" onClick={onRetry}>
              {i18n.buttons.retry}
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="carousel" aria-labelledby={`carousel-title-${category.id}`}>
      <div className="carousel__header">
        <h2 
          id={`carousel-title-${category.id}`}
          className={titleClassName}
        >
          {category.name}
        </h2>
      </div>
      
      <div className="carousel__container">
        <button
          className={prevNavClassName}
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label={ariaLabels.previousMovies}
          title={i18n.a11y.carouselScrollLeft}
        >
          <ChevronLeftIcon size={20} />
        </button>
        
        <div 
          ref={trackRef}
          className="carousel__track"
          role={i18n.a11y.roles.region}
          aria-label={ariaLabels.carouselRegion}
          aria-describedby={`carousel-instructions-${category.id}`}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              scroll('left');
            } else if (e.key === 'ArrowRight') {
              e.preventDefault();
              scroll('right');
            }
          }}
          tabIndex={0}
        >
          <div 
            id={`carousel-instructions-${category.id}`}
            className="visually-hidden"
          >
            {i18n.a11y.carouselInstructions}
          </div>
          
          {movies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="carousel__item"
              role={i18n.a11y.roles.group}
              aria-label={i18n.navigation.moviePositionAria(index, movies.length)}
            >
              <MovieCard
                movie={movie}
                category={category}
                onClick={() => handleMovieClick(movie.id)}
              />
            </div>
          ))}
        </div>
        
        <button
          className={nextNavClassName}
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label={ariaLabels.nextMovies}
          title={i18n.a11y.carouselScrollRight}
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>
      
      {/* Live region for announcing scroll actions */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="visually-hidden"
        id={`carousel-announcements-${category.id}`}
      />
    </section>
  );
};
