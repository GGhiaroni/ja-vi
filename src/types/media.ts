export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type: "movie" | "tv";
}

export interface MediaResponse {
  page: number;
  results: MediaItem[];
  total_pages: number;
  total_results: number;
}
