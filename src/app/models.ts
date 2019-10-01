export interface Movie {
  id: string;
  imdb_code: string;
  title_long: string;
  title: string;
  year: number;
  rating: number;
  runtime: number;
  download_count: number;
  description_full: string;
  yt_trailer_code: string;
  mpa_rating: string;
  background_image: string;
  background_image_original: string;
  small_cover_image: string;
  medium_cover_image: string;
  large_cover_image: string;
  torrents: Array<Torrent>;
  genres: Array<string>;
  summary?: string;
  cast?: Array<Actor>;
  like_count?: number;
  description_intro?: string;
  medium_screenshot_image1?: string;
  medium_screenshot_image2?: string;
  medium_screenshot_image3?: string;
  large_screenshot_image1?: string;
  large_screenshot_image2?: string;
  large_screenshot_image3?: string;
}

export interface YifyResponse {
  data: YifyDataResponse;
  status: string;
  status_message: string;
}

export interface YifyDataResponse {
  limit: number;
  movie_count: number;
  movies: Array<Movie>;
  page_number: number;
}

export interface Torrent {
  peers: number;
  quality: string;
  seeds: number;
  type: string;
  size: string;
  url: string;
}

export interface Actor {
  character_name: string;
  imdb_code: string;
  name: string;
  url_small_image: string;
}
