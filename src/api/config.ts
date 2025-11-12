const API_KEY = "bc9e14057cbaacb02964c8c1d79475dc";
const BASE_URL = "https://api.themoviedb.org/3";

export const TRENDING_URL = `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=pt-BR`;

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const getMediaDetailsURL = (mediaType: string, id: string): string => {
  return `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=pt-BR`;
};
