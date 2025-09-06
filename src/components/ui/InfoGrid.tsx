/**
 * ===========================================
 * INFO GRID COMPONENT
 * ===========================================
 * 
 * Generic component for displaying key-value information in a grid layout.
 * 
 * USAGE:
 * ```tsx
 * <InfoGrid 
 *   items={[
 *     { label: 'Release Year', value: '2023' },
 *     { label: 'Runtime', value: '120 min' }
 *   ]}
 *   title="Movie Details"
 * />
 * ```
 */

import React from 'react';

interface InfoGridItem {
  label: string;
  value: React.ReactNode;
  ariaLabel?: string;
}

interface InfoGridProps {
  items: InfoGridItem[];
  title?: string;
  className?: string;
  'aria-label'?: string;
}

export const InfoGrid: React.FC<InfoGridProps> = React.memo(({
  items,
  title,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  return (
    <section 
      className={`info-grid ${className}`.trim()}
      aria-labelledby={title ? 'info-grid-title' : undefined}
      {...props}
    >
      {title && (
        <h2 id="info-grid-title" className="visually-hidden">
          {title}
        </h2>
      )}
      
      <div 
        className="info-grid__container" 
        role="table" 
        aria-label={ariaLabel || 'Information details'}
      >
        {items.map((item, index) => (
          <div key={index} className="info-grid__item" role="row">
            <div className="info-grid__label" role="rowheader">
              {item.label}
            </div>
            <div 
              className="info-grid__value"
              role="cell"
              aria-label={item.ariaLabel}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

InfoGrid.displayName = 'InfoGrid';
