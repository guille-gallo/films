/**
 * ===========================================
 * USE MOVIE NAVIGATION HOOK TESTS
 * ===========================================
 */

import { renderHook } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useMovieNavigation } from '../src/hooks/useMovieNavigation';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mock constants
jest.mock('@/constants', () => ({
  ROUTES: {
    MOVIE_DETAIL: (movieId: number, categoryId: string) => `/movie/${movieId}?category=${categoryId}`,
  },
}));

const mockNavigate = jest.fn();

describe('useMovieNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should return a function that navigates to movie detail page', () => {
    const { result } = renderHook(() => useMovieNavigation());
    
    expect(typeof result.current).toBe('function');
  });

  it('should navigate to correct movie detail route when called', () => {
    const { result } = renderHook(() => useMovieNavigation());
    const handleMovieClick = result.current;

    const movieId = 123;
    const categoryId = 'popular';

    handleMovieClick(movieId, categoryId);

    expect(mockNavigate).toHaveBeenCalledWith('/movie/123?category=popular');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it('should handle different movie IDs and categories', () => {
    const { result } = renderHook(() => useMovieNavigation());
    const handleMovieClick = result.current;

    // Test first navigation
    handleMovieClick(456, 'top_rated');
    expect(mockNavigate).toHaveBeenCalledWith('/movie/456?category=top_rated');

    // Test second navigation
    handleMovieClick(789, 'upcoming');
    expect(mockNavigate).toHaveBeenCalledWith('/movie/789?category=upcoming');

    expect(mockNavigate).toHaveBeenCalledTimes(2);
  });

  it('should return the same function reference on re-renders', () => {
    const { result, rerender } = renderHook(() => useMovieNavigation());
    const firstFunction = result.current;

    rerender();
    const secondFunction = result.current;

    expect(firstFunction).toBe(secondFunction);
  });
});
