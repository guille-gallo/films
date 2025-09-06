import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Carousel } from '@/components';

const mockCategory = {
  id: 'fail',
  name: 'Fail Category',
  endpoint: '/fail',
  theme: {
    fontFamily: 'Arial',
    primaryColor: '#000',
    secondaryColor: '#fff',
    buttonStyle: 'primary' as 'primary'
  }
};

describe('Network Failure Handling', () => {
  it('shows error message on network failure', async () => {
    // Simulate fetch failure
    global.fetch = vi.fn(() => Promise.reject(new Error('Network Error')));

    render(
      <Carousel
        category={mockCategory}
        movies={[]}
        loading={false}
        error={"Network Error"}
        onMovieClick={() => {}}
        onRetry={() => {}}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });

  it('shows retry button on error', async () => {
    render(
      <Carousel
        category={mockCategory}
        movies={[]}
        loading={false}
        error={"Network Error"}
        onMovieClick={() => {}}
        onRetry={() => {}}
      />
    );

    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });
});
