import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '../src/components/layout/Header/Header';

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });
  
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        {component}
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('Header Component', () => {
  it('should render logo and navigation', () => {
    renderWithProviders(<Header />);
    
    expect(screen.getByText('🎬 Films')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Films homepage' })).toBeInTheDocument();
  });

  it('should display wishlist link', () => {
    renderWithProviders(<Header />);
    
    const wishlistLink = screen.getByRole('link', { name: /go to wishlist/i });
    expect(wishlistLink).toHaveAttribute('href', '/wishlist');
  });

  it('should show wishlist count', () => {
    renderWithProviders(<Header />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    renderWithProviders(<Header />);
    
    // Check navigation has proper ARIA label
    const navigation = screen.getByRole('navigation');
    expect(navigation).toHaveAttribute('aria-label', 'Primary navigation');
    expect(navigation).toHaveAttribute('id', 'navigation');
    
    // Check wishlist link has proper ARIA attributes
    const wishlistLink = screen.getByRole('link', { name: /go to wishlist/i });
    expect(wishlistLink).toHaveAttribute('aria-describedby', 'wishlist-count');
    
    // Check wishlist count has live region
    const wishlistCount = document.getElementById('wishlist-count');
    expect(wishlistCount).toHaveAttribute('aria-live', 'polite');
    expect(wishlistCount).toHaveAttribute('aria-atomic', 'true');
  });
});
