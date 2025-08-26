/**
 * FUNCTIONAL TESTS: COMPONENT INTEGRATION
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { Homepage } from '@/pages/Homepage/Homepage'
import { Wishlist } from '@/pages/Wishlist/Wishlist'
import { wishlistStore } from '@/stores'

// Mock the TMDB service
vi.mock('@/services/tmdb', () => ({
  tmdbService: {
    getMoviesByCategory: vi.fn((categoryId: string) => {
      // Return different data based on category for more realistic testing
      if (categoryId === 'popular') {
        return Promise.resolve({
          results: [
            {
              id: 1,
              title: 'Component Test Movie',
              overview: 'Testing component integration',
              poster_path: '/component-test.jpg',
              release_date: '2023-01-01',
              vote_average: 8.2,
              genre_ids: [28, 12]
            }
          ],
          total_pages: 1,
          total_results: 1
        })
      }
      // Return empty results for other categories
      return Promise.resolve({
        results: [],
        total_pages: 1,
        total_results: 0
      })
    })
  }
}))

function TestWrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  )
}

// Helper function to properly set up store state for tests
const setupWishlistForTest = (movies: any[]) => {
  // Clear the store first
  wishlistStore.getState().clearWishlist()
  
  // Add movies to the store
  movies.forEach(movie => {
    wishlistStore.getState().addToWishlist(movie)
  })
}

describe('Functional Tests: Component Integration', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should render Homepage with movies and handle movie interactions', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    )

    // Wait for movie to load
    await waitFor(() => {
      expect(screen.getByText('Component Test Movie')).toBeInTheDocument()
    })

    // Verify movie card is interactive
    const movieCard = screen.getByText('Component Test Movie')
    expect(movieCard.closest('[role="button"]')).toBeInTheDocument()

    // Click on movie (would navigate in real app)
    await user.click(movieCard)

    // Movie should still be visible after interaction
    expect(screen.getByText('Component Test Movie')).toBeInTheDocument()
  })

  it('should handle Wishlist page when empty', async () => {
    render(
      <TestWrapper>
        <Wishlist />
      </TestWrapper>
    )

    // Should show empty state
    await waitFor(() => {
      expect(screen.getByText(/your wishlist is empty/i)).toBeInTheDocument()
    })
  })

  it('should handle Wishlist page with movies', async () => {
    // Pre-populate wishlist with a movie
    const mockMovie = {
      id: 1,
      title: 'Wishlist Test Movie',
      overview: 'Testing wishlist display',
      poster_path: '/wishlist-test.jpg',
      release_date: '2023-01-01',
      vote_average: 7.8,
      genre_ids: [35]
    }

    // Use the helper function to properly setup the wishlist
    setupWishlistForTest([mockMovie])

    render(
      <TestWrapper>
        <Wishlist />
      </TestWrapper>
    )

    // Should show the movie
    await waitFor(() => {
      expect(screen.getByText('Wishlist Test Movie')).toBeInTheDocument()
    })
  })

  it('should handle component loading correctly', async () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    )

    // Content should load from our mocked API
    await waitFor(() => {
      expect(screen.getByText('Component Test Movie')).toBeInTheDocument()
    })
  })

  it('should handle component mounting and unmounting cleanly', async () => {
    const { unmount } = render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    )

    // Wait for content to load
    await waitFor(() => {
      expect(screen.getByText('Component Test Movie')).toBeInTheDocument()
    })

    // Should unmount without errors
    expect(() => unmount()).not.toThrow()
  })

  it('should maintain movie display across component re-renders', async () => {
    const { rerender } = render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    )

    // Wait for movie to load
    await waitFor(() => {
      expect(screen.getByText('Component Test Movie')).toBeInTheDocument()
    })

    // Verify movie card is interactive
    const movieCard = screen.getByText('Component Test Movie')
    expect(movieCard.closest('[role="button"]')).toBeInTheDocument()

    // Re-render component
    rerender(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    )

    // Movie should still be displayed after re-render
    await waitFor(() => {
      const rerenderedMovieCard = screen.getByText('Component Test Movie')
      expect(rerenderedMovieCard).toBeInTheDocument()
      expect(rerenderedMovieCard.closest('[role="button"]')).toBeInTheDocument()
    })
  })
})
