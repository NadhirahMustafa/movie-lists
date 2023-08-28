export interface movieInterface {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetailsInterface {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {};
  budget: number;
  genres: [];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [];
  production_countries: [];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface searchProps {
  init: movieInterface[];
  onSearch: (searchTerm: movieInterface[]) => void;
  resetList: () => void;
}

export interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  detailsData: MovieDetailsInterface;
}

export interface movieListProps {
  list: movieInterface[];
  viewType: number;
}

export interface genresInterface {
  id: number;
  name: string;
}

export interface languageInterface {
  english_name: string;
  iso_639_1: string;
  name: string;
}
