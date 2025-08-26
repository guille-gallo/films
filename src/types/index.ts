export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  adult: boolean;
  video: boolean;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieCategory {
  id: string;
  name: string;
  endpoint: string;
  theme: CategoryTheme;
}

export interface CategoryTheme {
  fontFamily: string;
  primaryColor: string;
  secondaryColor: string;
  buttonStyle: 'primary' | 'secondary' | 'accent';
  backgroundPattern?: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetails extends Movie {
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
}

export interface WishlistItem {
  movieId: number;
  title: string;
  poster_path: string | null;
  addedAt: string;
  category: string;
}

export interface CarouselProps {
  category: MovieCategory;
  movies: Movie[];
  loading: boolean;
  error: string | null;
  onMovieClick: (movieId: number, category: string) => void;
  onRetry?: () => void;
}

export interface MovieCardProps {
  movie: Movie;
  category: MovieCategory;
  onClick: () => void;
  showWishlistAction?: boolean;
  inWishlist?: boolean;
  onWishlistToggle?: () => void;
  variant?: 'default' | 'wishlist' | 'compact';
}

export interface MovieDetailPageProps {
  movieId: string;
  category: string;
}
