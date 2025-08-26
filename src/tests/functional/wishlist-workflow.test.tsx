/**
 * FUNCTIONAL TESTS: WISHLIST WORKFLOWS
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
      if (categoryId === 'popular') {
        return Promise.resolve({
          results: [
            {
              id: 1,
              title: 'Functional Test Movie 1',
              overview: 'First movie for functional testing',
              poster_path: '/functional1.jpg',
              release_date: '2023-01-01',
              vote_average: 8.5,
              genre_ids: [28, 12]
            },
            {
              id: 2,
              title: 'Functional Test Movie 2',
              overview: 'Second movie for functional testing',
              poster_path: '/functional2.jpg',
              release_date: '2023-02-01',
              vote_average: 7.8,
              genre_ids: [35, 18]
            }
          ],
          total_pages: 1,
          total_results: 2
        })
      }
      // Return empty results for other categories to avoid duplicate elements
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

describe('Functional Tests: Wishlist Workflow Components', () => {
  beforeEach(() => {
    localStorage.clear()
    wishlistStore.getState().clearWishlist()
    vi.clearAllMocks()
  })

  it('should handle movie interaction and display on Homepage', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    )

    // Wait for movies to load
    await waitFor(() => {
      expect(screen.getByText('Functional Test Movie 1')).toBeInTheDocument()
      expect(screen.getByText('Functional Test Movie 2')).toBeInTheDocument()
    })

    // Verify movies are clickable (they should be interactive for navigation)
    const movieCard1 = screen.getByText('Functional Test Movie 1')
    const movieCard2 = screen.getByText('Functional Test Movie 2')
    
    expect(movieCard1.closest('[role="button"]')).toBeInTheDocument()
    expect(movieCard2.closest('[role="button"]')).toBeInTheDocument()

    // Click interaction should work (navigation would happen in real app)
    await user.click(movieCard1)
    
    // Both movies should still be visible after click
    expect(screen.getByText('Functional Test Movie 1')).toBeInTheDocument()
    expect(screen.getByText('Functional Test Movie 2')).toBeInTheDocument()
  })

  it('should display empty wishlist correctly', async () => {
    render(
      <TestWrapper>
        <Wishlist />
      </TestWrapper>
    )

    // Should show empty state message
    await waitFor(() => {
      expect(screen.getByText(/your wishlist is empty/i)).toBeInTheDocument()
    })
  })

  it('should display wishlist with pre-existing movies', async () => {
    // Pre-populate store with movies
    const mockMovies = [
      {
        id: 1,
        title: 'Pre-existing Movie 1',
        overview: 'Movie that was already in wishlist',
        poster_path: '/pre1.jpg',
        release_date: '2023-01-01',
        vote_average: 8.2,
        genre_ids: [28]
      },
      {
        id: 2,
        title: 'Pre-existing Movie 2',
        overview: 'Another movie in wishlist',
        poster_path: '/pre2.jpg',
        release_date: '2023-02-01',
        vote_average: 7.5,
        genre_ids: [35]
      }
    ]

    setupWishlistForTest(mockMovies)

    render(
      <TestWrapper>
        <Wishlist />
      </TestWrapper>
    )

    // Should show both movies
    await waitFor(() => {
      expect(screen.getByText('Pre-existing Movie 1')).toBeInTheDocument()
      expect(screen.getByText('Pre-existing Movie 2')).toBeInTheDocument()
    })
  })

  it('should handle homepage movie rendering after state changes', async () => {
    const { unmount } = render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Functional Test Movie 1')).toBeInTheDocument()
    })

    // Verify movie cards are interactive
    const movieCard = screen.getByText('Functional Test Movie 1')
    expect(movieCard.closest('[role="button"]')).toBeInTheDocument()

    // Unmount and re-mount to test component stability
    unmount()

    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    )

    // Movies should still load correctly after remount
    await waitFor(() => {
      const movieCard = screen.getByText('Functional Test Movie 1')
      expect(movieCard).toBeInTheDocument()
      expect(movieCard.closest('[role="button"]')).toBeInTheDocument()
    })
  })

  it('should handle removing movies from wishlist page', async () => {
    const user = userEvent.setup()
    
    // Pre-populate with one movie
    const mockMovie = {
      id: 1,
      title: 'Remove Test Movie',
      overview: 'Movie to be removed from wishlist',
      poster_path: '/remove-test.jpg',
      release_date: '2023-01-01',
      vote_average: 8.0,
      genre_ids: [18]
    }

    setupWishlistForTest([mockMovie])

    render(
      <TestWrapper>
        <Wishlist />
      </TestWrapper>
    )

    // Should show the movie
    await waitFor(() => {
      expect(screen.getByText('Remove Test Movie')).toBeInTheDocument()
    })

    // Remove from wishlist
    const removeButton = screen.getByLabelText(/remove remove test movie from wishlist/i)
    await user.click(removeButton)

    // Should show empty state
    await waitFor(() => {
      expect(screen.getByText(/your wishlist is empty/i)).toBeInTheDocument()
    })

    // Movie should be gone
    expect(screen.queryByText('Remove Test Movie')).not.toBeInTheDocument()
  })
})
