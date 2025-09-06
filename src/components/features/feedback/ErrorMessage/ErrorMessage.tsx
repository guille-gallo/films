/**
 * ===========================================
 * ERROR MESSAGE COMPONENT
 * ===========================================
 * 
 * A reusable error display component for consistent error handling across the app.
 * 
 * USAGE:
 * ```tsx
 * <ErrorMessage
 *   type="not-found"
 *   onRetry={() => refetchMovie()}
 * />
 * ```
 */

import React from 'react';
import { i18n } from '@/constants';
import './ErrorMessage.scss';

interface ErrorMessageProps {
  type?: 'network' | 'not-found' | 'category' | 'general';
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  isLoading?: boolean;
  className?: string;
}

const DEFAULT_MESSAGES = {
  'not-found': i18n.errors.notFound,
  network: i18n.errors.network,
  category: i18n.errors.category,
  general: i18n.errors.general
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  type = "general",
  title,
  message,
  onRetry,
  retryLabel = i18n.buttons.tryAgain,
  isLoading = false,
  className = "",
}) => {
  const defaults = DEFAULT_MESSAGES[type];
  const showRetry = type !== 'not-found' && onRetry;
  
  return (
    <div className={`error-message ${className}`} role={i18n.a11y.roles.alert} aria-live={i18n.a11y.roles.polite}>
      <div className="error-message__container">
        <span className="error-message__icon" role="img" aria-label="Error">
          {defaults.emoji}
        </span>
        
        <h2 className="error-message__title">
          {title || defaults.title}
        </h2>
        
        <p className="error-message__text">
          {message || defaults.message}
        </p>
        
        {showRetry && onRetry && (
          <button
            className={`error-message__retry ${isLoading ? 'error-message__retry--loading' : ''}`}
            onClick={onRetry}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="error-message__retry__spinner" />
                {i18n.loading.general}
              </>
            ) : (
              retryLabel
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
