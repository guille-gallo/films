/**
 * ===========================================
 * HEADER COMPONENT
 * ===========================================
 * 
 * Main application header with navigation and wishlist counter.
 * 
 * USAGE:
 * ```tsx
 * <Header />
 * ```
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/hooks/useWishlist';
import { HeartIcon } from '@/components/Icons';
import { ROUTES, i18n } from '@/constants';
import './Header.scss';

export const Header: React.FC = React.memo(() => {
  const { count } = useWishlist();
  const countClassName = `header__wishlist-btn__count${count === 0 ? ' header__wishlist-btn__count--empty' : ''}`;
  const wishlistAriaLabel = i18n.navigation.wishlistAriaLabel(count);

  return (
    <header className="header">
      <div className="header__container">
        <Link 
          to={ROUTES.HOME} 
          className="header__logo"
          aria-label="Films homepage"
        >
          {i18n.navigation.siteLogo}
        </Link>
        
        <nav 
          id="navigation"
          className="header__nav" 
          aria-label={i18n.a11y.navigationLabel}
        >
          <Link 
            to={ROUTES.WISHLIST} 
            className="header__wishlist-btn"
            aria-label={wishlistAriaLabel}
            aria-describedby="wishlist-count"
          >
            <HeartIcon 
              className="header__wishlist-btn__icon" 
              filled={true} 
              size={18} 
            />
            <div 
              id="wishlist-count"
              className={countClassName}
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="visually-hidden">
                {i18n.a11y.wishlistCountAnnounced(count)}
              </span>
              <span aria-hidden="true">{count}</span>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
