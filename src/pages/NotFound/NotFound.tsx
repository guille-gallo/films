/**
 * ===========================================
 * NOT FOUND
 * ===========================================
 * 
 * 404 error page for invalid routes.
 * 
 * USAGE:
 * ```tsx
 * <NotFound />
 * ```
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { i18n, ROUTES } from '@/constants';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorMessage 
      type="not-found"
      title={i18n.pages.notFound.title}
      message={i18n.pages.notFound.message}
      onRetry={() => navigate(ROUTES.HOME)}
      retryLabel={i18n.buttons.goHome}
    />
  );
};
