/**
 * TEST APP COMPONENT
 * 
 * Functional testing version of App without nested routers
 */

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';
import { Header } from '@/components';
import { Homepage } from '@/pages/Homepage/Homepage';
import { MovieDetail } from '@/pages/MovieDetail/MovieDetail';
import { Wishlist } from '@/pages/Wishlist/Wishlist';
import { NotFound } from '@/pages/NotFound/NotFound';
import '@/styles/global.scss';

// Create QueryClient for TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export const TestApp: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </QueryClientProvider>
  );
};
