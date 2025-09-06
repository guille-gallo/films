/**
 * ===========================================
 * ACTION AREA COMPONENT
 * ===========================================
 * 
 * Generic container for action buttons and interactive elements.
 * 
 * USAGE:
 * ```tsx
 * <ActionArea className="custom-styles">
 *   <button>Add to Wishlist</button>
 *   <button>Share</button>
 * </ActionArea>
 * ```
 */

import React from 'react';

interface ActionAreaProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

export const ActionArea: React.FC<ActionAreaProps> = React.memo(({
  children,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  return (
    <div 
      className={`action-area ${className}`.trim()}
      aria-label={ariaLabel}
      role="group"
      {...props}
    >
      {children}
    </div>
  );
});

ActionArea.displayName = 'ActionArea';
