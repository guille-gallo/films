import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/components';
import { ROUTES, APP_CONFIG, i18n } from '@/constants';

const Homepage = React.lazy(() => import('@/pages/Homepage').then(module => ({ default: module.Homepage })));
const MovieDetail = React.lazy(() => import('@/pages/MovieDetail').then(module => ({ default: module.MovieDetail })));
const Wishlist = React.lazy(() => import('@/pages/Wishlist').then(module => ({ default: module.Wishlist })));
const NotFound = React.lazy(() => import('@/pages/NotFound').then(module => ({ default: module.NotFound })));

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <div className={APP_CONFIG.DOM.APP_CLASS}>
        {/* Skip Links for Screen Readers */}
        <div className="skip-links">
          <a href="#main-content" className="skip-link">
            {i18n.a11y.skipToMain}
          </a>
          <a href="#navigation" className="skip-link">
            {i18n.a11y.skipToNavigation}
          </a>
        </div>
        
        <Header />
        
        <main 
          id="main-content" 
          className="main-content"
          aria-label={i18n.a11y.mainContentLabel}
        >
          <Suspense fallback={null}>
            <Routes>
              <Route path={ROUTES.PATTERNS.HOME} element={<Homepage />} />
              <Route path={ROUTES.PATTERNS.MOVIE_DETAIL_WITH_PARAMS} element={<MovieDetail />} />
              <Route path={ROUTES.PATTERNS.WISHLIST} element={<Wishlist />} />
              <Route path={ROUTES.PATTERNS.NOT_FOUND} element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};
