/**
 * ===========================================
 * DESCRIPTION COMPONENT
 * ===========================================
 * 
 * Generic text description component with proper semantic markup.
 * 
 * USAGE:
 * ```tsx
 * <Description 
 *   text="Movie overview text..." 
 *   fallback="No description available."
 *   className="custom-styles"
 * />
 * ```
 */

import React from 'react';

interface DescriptionProps {
  text?: string | null;
  fallback?: string;
  className?: string;
  title?: string;
  'aria-label'?: string;
}

export const Description: React.FC<DescriptionProps> = React.memo(({
  text,
  fallback = 'No description available.',
  className = '',
  title,
  'aria-label': ariaLabel,
  ...props
}) => {
  const content = text || fallback;
  
  return (
    <div 
      className={`description ${className}`.trim()}
      aria-label={ariaLabel}
      role="article"
      {...props}
    >
      {title && <h3 className="visually-hidden">{title}</h3>}
      {content}
    </div>
  );
});

Description.displayName = 'Description';
