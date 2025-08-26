/**
 * ===========================================
 * MOVIE IMAGE AREA COMPONENT
 * ===========================================
 * 
 * Displays movie poster with fallback handling.
 * 
 * USAGE:
 * ```tsx
 * <MovieImageArea 
 *   posterPath={movie.poster_path}
 *   title={movie.title}
 * />
 * ```
 */

import React from 'react';
import { getImageUrl } from '@/utils/movieUtils';
import './MovieImageArea.scss';

interface MovieImageAreaProps {
  posterPath: string | null;
  title: string;
}

export const MovieImageArea: React.FC<MovieImageAreaProps> = React.memo(({
  posterPath,
  title
}) => {
  const posterUrl = posterPath ? getImageUrl(posterPath, 'w500') : null;

  return (
    <div className="movie-image-area">
      {posterUrl ? (
        <img 
          src={posterUrl} 
          alt={title}
          className="movie-image-area__poster"
        />
      ) : (
        <div className="movie-image-area__fallback">
          🎬
        </div>
      )}
    </div>
  );
});
