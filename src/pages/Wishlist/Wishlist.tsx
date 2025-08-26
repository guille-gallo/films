/**
 * ===========================================
 * WISHLIST
 * ===========================================
 * 
 * User's movie wishlist page with management functionality.
 * 
 * USAGE:
 * ```tsx
 * <Wishlist />
 * ```
 */

import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '@/hooks/useWishlist';
import { MovieCard } from '@/components/MovieCard/MovieCard';
import { HeartIcon } from '@/components/Icons';
import { getCategoryById, MOVIE_CATEGORIES } from '@/utils/movieUtils';
import { ROUTES, i18n } from '@/constants';
import './Wishlist.scss';

export const Wishlist: React.FC = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  const handleItemClick = useCallback((movieId: number, category: string) => {
    navigate(ROUTES.MOVIE_DETAIL(movieId, category));
  }, [navigate]);

  const handleClearWishlist = useCallback(() => {
    if (window.confirm(i18n.pages.wishlist.clearConfirmation)) {
      clearWishlist();
    }
  }, [clearWishlist]);

  if (wishlist.length === 0) {
    return (
      <div className="wishlist">
        <div className="wishlist__container">
          <div 
            className="wishlist__empty"
            role="main"
            aria-labelledby="empty-wishlist-title"
          >
            <div 
              className="wishlist__empty__icon"
              role="img"
              aria-label="Empty wishlist"
            >
              {i18n.pages.wishlist.empty.icon}
            </div>
            <h1 
              id="empty-wishlist-title"
              className="wishlist__empty__title"
            >
              {i18n.pages.wishlist.empty.title}
            </h1>
            <p className="wishlist__empty__message">
              {i18n.pages.wishlist.empty.message}
            </p>
            <Link 
              to={ROUTES.HOME} 
              className="wishlist__empty__cta"
              aria-describedby="empty-wishlist-title"
            >
              {i18n.buttons.discoverMovies}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <div className="wishlist__container">
        <header 
          className="wishlist__header"
          aria-labelledby="wishlist-title"
        >
          <h1 
            id="wishlist-title"
            className="wishlist__header__title"
          >
            {i18n.pages.wishlist.title}
          </h1>
          <div 
            className="wishlist__header__heart"
            role="img"
            aria-label={`Wishlist contains ${wishlist.length} movies`}
          >
            <HeartIcon filled={true} size={24} aria-hidden="true" />
            <span 
              className="wishlist__header__count"
              aria-live="polite"
            >
              {wishlist.length}
            </span>
          </div>
        </header>

        <main 
          className="wishlist__grid"
          role="grid"
          aria-label={`Your wishlist with ${wishlist.length} movies`}
          aria-rowcount={Math.ceil(wishlist.length / 4)} // Assuming 4 columns on desktop
        >
          {wishlist.map((movie, index) => {
            // Use popular as fallback category for wishlist display
            const category = getCategoryById('popular') || MOVIE_CATEGORIES[0];
            
            return (
              <div 
                key={movie.id}
                role="gridcell"
                aria-rowindex={Math.floor(index / 4) + 1}
                aria-colindex={(index % 4) + 1}
              >
                <MovieCard
                  movie={movie}
                  category={category}
                  variant="wishlist"
                  showWishlistAction={true}
                  inWishlist={true}
                  onClick={() => handleItemClick(movie.id, 'popular')}
                  onWishlistToggle={() => removeFromWishlist(movie.id)}
                />
              </div>
            );
          })}
        </main>

        {wishlist.length > 3 && (
          <div className="wishlist__clear-all">
            <button 
              className="wishlist__clear-all__btn"
              onClick={handleClearWishlist}
              aria-label={`Clear all ${wishlist.length} movies from wishlist`}
              aria-describedby="clear-warning"
            >
              {i18n.buttons.clearAll}
              <span id="clear-warning" className="visually-hidden">
                This will remove all movies from your wishlist and cannot be undone
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
