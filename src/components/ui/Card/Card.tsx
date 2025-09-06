/**
 * ===========================================
 * CARD COMPONENT - UI PRIMITIVE
 * ===========================================
 * 
 * A flexible card container for displaying content.
 * 
 * USAGE:
 * ```tsx
 * <Card variant="elevated">
 *   Content goes here
 * </Card>
 * ```
 */

import React from 'react';
import './Card.scss';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = React.memo(({
  children,
  className = '',
  variant = 'default',
  padding = 'medium'
}) => {
  const cardClasses = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';
