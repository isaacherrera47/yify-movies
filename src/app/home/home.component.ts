import {Component, OnDestroy, OnInit} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {Movie, Torrent, YifyResponse} from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  moviesSubscription: any;
  subsSubscription: any;
  movies: Array<Movie>;
  loadingData = false;
  searchTerm = '';

  constructor(private svcMovies: MoviesService) {
  }

  ngOnInit() {
    this.getMovies({minimum_rating: 7});
    this.svcMovies.search.subscribe((queryTerm) => {
      this.searchTerm = queryTerm.trim();
      const params = queryTerm.trim().length > 0 ? {query_term: queryTerm} : {};
      this.getMovies(params);
    });
  }

  ngOnDestroy() {
    this.moviesSubscription.unsubscribe();
    if (this.subsSubscription) {
      this.subsSubscription.unsubscribe();
    }
  }

  getMovies(params = {}) {
    this.loadingData = true;
    this.movies = null;
    this.moviesSubscription = this.svcMovies.getMovies(params).subscribe((res: YifyResponse) => {
      if (res.status === 'ok') {
        this.movies = res.data.movies;
      }
      this.loadingData = false;
    });
  }

  onTorrentDownloadClick(torrent: Torrent) {
    location.replace(torrent.url);
  }

  onSubDownloadClick(imdbId: string, lang: string) {
    this.subsSubscription = this.svcMovies.getSubtitle(imdbId, lang).subscribe((subs) => {
      if (subs) {
        location.replace(subs[0].url);
      }
    });
  }

  onGenreClick(genre: string) {
    this.searchTerm = genre;
    this.getMovies({genre});
  }
}
