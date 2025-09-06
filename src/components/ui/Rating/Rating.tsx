/**
 * ===========================================
 * RATING COMPONENT - UI PRIMITIVE
 * ===========================================
 * 
 * A star rating display component.
 * 
 * USAGE:
 * ```tsx
 * <Rating value={4.5} maxRating={5} />
 * <Rating value={8.2} maxRating={10} showValue />
 * ```
 */

import React from 'react';
import { StarIcon } from '../Icons';
import './Rating.scss';

export interface RatingProps {
  value: number;
  maxRating?: number;
  showValue?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  'aria-label'?: string;
}

export const Rating: React.FC<RatingProps> = React.memo(({
  value,
  maxRating = 5,
  showValue = false,
  className = '',
  size = 'medium',
  'aria-label': ariaLabel
}) => {
  const normalizedValue = Math.max(0, Math.min(value, maxRating));
  
  const ratingClasses = [
    'rating',
    `rating--${size}`,
    className
  ].filter(Boolean).join(' ');

  const starSize = size === 'small' ? 14 : size === 'large' ? 24 : 18;

  return (
    <div 
      className={ratingClasses}
      aria-label={ariaLabel || `Rating: ${value} out of ${maxRating}`}
      role="img"
    >
      <div className="rating__stars">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= normalizedValue;
          const isPartial = starValue > normalizedValue && starValue - 1 < normalizedValue;
          
          return (
            <div key={index} className="rating__star-container">
              <StarIcon 
                size={starSize}
                className={`rating__star ${isFilled ? 'rating__star--filled' : 'rating__star--empty'}`}
                aria-hidden="true"
              />
              {isPartial && (
                <div 
                  className="rating__star-partial"
                  style={{ width: `${(normalizedValue - (starValue - 1)) * 100}%` }}
                >
                  <StarIcon 
                    size={starSize}
                    className="rating__star rating__star--filled"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {showValue && (
        <span className="rating__value" aria-hidden="true">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
});

Rating.displayName = 'Rating';
