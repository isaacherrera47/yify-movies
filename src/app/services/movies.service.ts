import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private MOVIES_URL = 'https://yts.mx/api/v2/list_movies.json';
  private MOVIE_DETAIL_URL = 'https://yts.mx/api/v2/list_movies.json';
  private SUBS_API = 'https://yukarf10.api.stdlib.com/yify-subs@1.0.0/';

  @Output() search: EventEmitter<string> = new EventEmitter();
  searchTerm = '';
  private defaultParams = {
    limit: 48,
    sort_by: 'year'
  };

  constructor(private http: HttpClient) {
  }

  getMovies<YifyResponse>(params = {}) {
    params = {...this.defaultParams, ...params};
    return this.http.get<YifyResponse>(this.MOVIES_URL, {params});
  }

  getMovie(id) {
    const params = new HttpParams({
      fromObject: {
        movie_id: id,
        with_images: 'true',
        with_cast: 'true'
      }
    });
    return this.http.get(this.MOVIE_DETAIL_URL, {params});
  }

  getSubtitle(imdbId: string, lang: string) {
    const params = new HttpParams({
      fromObject: {
        imdbId,
        lang
      }
    });
    return this.http.get(this.SUBS_API, {params});
  }

  doSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.search.emit(this.searchTerm);
  }
}
