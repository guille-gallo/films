/**
 * ===========================================
 * IMAGE COMPONENT - UI PRIMITIVE
 * ===========================================
 * 
 * A simple, reusable image component with fallback handling.
 * This follows React best practices: single responsibility, composable, testable.
 * 
 * USAGE:
 * ```tsx
 * <Image 
 *   src={posterUrl}
 *   alt="Movie poster"
 *   fallback="🎬"
 *   className="movie-poster"
 * />
 * ```
 */

import React, { useState } from 'react';

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | null;
  alt: string;
  fallback?: React.ReactNode;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallback = '🖼️',
  className = '',
  onError,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    onError?.(e);
  };

  if (!src || hasError) {
    return (
      <div 
        className={`image-fallback ${className}`}
        role="img"
        aria-label={alt}
      >
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};
