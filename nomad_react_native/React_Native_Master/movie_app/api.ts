const API_KEY = "eb400500dfc44b019afb2686e4475988";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  fullData?: any;
}

export interface TV {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export interface TVResponse extends BaseResponse {
  results: TV[];
}

export const moviesApi = {
  trending: ({pageParam}) => fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${pageParam || 1}`).then((res) => res.json()),

  upcoming: ({pageParam}) => fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR&page=${pageParam}`).then((res) => res.json()),

  nowPlaying: () => fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then((res) => res.json()),

  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    console.log(query);
    return fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&region=KR&query=${query}`).then((res) => res.json());
  },

  detail: ({ queryKey }) => {
    const [_, id] = queryKey;
    return fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`).then((res) => res.json());
  },
};

export const tvApi = {
  trending: () => fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) => res.json()),
  airingToday: () => fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then((res) => res.json()),
  topRated: () => fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((res) => res.json()),
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&page=1&region=KR&query=${query}`).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey;
    return fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,images`).then((res) => res.json());
  },
};
