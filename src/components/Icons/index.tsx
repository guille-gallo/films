/**
 * ===========================================
 * ICON COMPONENTS
 * ===========================================
 * 
 * Centralized icon library for the application
 * 
 * USAGE:
 * ```typescript
 * import { StarIcon, HeartIcon, BackIcon } from '@/components/Icons';
 * 
 * <StarIcon className="my-star-icon" />
 * <HeartIcon filled={true} />
 * ```
 */

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

interface HeartIconProps extends IconProps {
  filled?: boolean;
}

/**
 * Star Icon - Used for ratings and favorites
 */
export const StarIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 20, 
  color,
  'aria-hidden': ariaHidden = true
}) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="currentColor"
    width={size}
    height={size}
    aria-hidden={ariaHidden}
    style={{ 
      display: 'block',
      verticalAlign: 'middle',
      ...(color ? { color } : {})
    }}
  >
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
  </svg>
);

/**
 * Heart Icon - Used for wishlist functionality
 */
export const HeartIcon: React.FC<HeartIconProps> = ({ 
  filled = false, 
  className = '', 
  size = 20, 
  color,
  'aria-hidden': ariaHidden = true
}) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke={filled ? "none" : "currentColor"}
    strokeWidth={filled ? "0" : "2"}
    width={size}
    height={size}
    aria-hidden={ariaHidden}
    style={{ 
      display: 'block',
      verticalAlign: 'middle',
      ...(color ? { color } : {})
    }}
  >
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"/>
  </svg>
);

/**
 * Chevron Left Icon - Used for carousel navigation
 */
export const ChevronLeftIcon: React.FC<IconProps> = ({ 
  className = '', 
  size, 
  color,
  'aria-hidden': ariaHidden = true
}) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    width={size}
    height={size}
    aria-hidden={ariaHidden}
    style={color ? { color } : undefined}
  >
    <path d="M15 18L9 12L15 6"/>
  </svg>
);

/**
 * Chevron Right Icon - Used for carousel navigation
 */
export const ChevronRightIcon: React.FC<IconProps> = ({ 
  className = '', 
  size, 
  color,
  'aria-hidden': ariaHidden = true
}) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    width={size}
    height={size}
    aria-hidden={ariaHidden}
    style={color ? { color } : undefined}
  >
    <path d="M9 18L15 12L9 6"/>
  </svg>
);

/**
 * Trash Icon - Used for delete actions
 */
export const TrashIcon: React.FC<IconProps> = ({ 
  className = '', 
  size, 
  color,
  'aria-hidden': ariaHidden = true
}) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    width={size}
    height={size}
    aria-hidden={ariaHidden}
    style={color ? { color } : undefined}
  >
    <path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"/>
  </svg>
);
