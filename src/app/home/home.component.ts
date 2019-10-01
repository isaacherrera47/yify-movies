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
  constructor(private svcMovies: MoviesService) {
  }

  ngOnInit() {
    this.getMovies();
    this.svcMovies.search.subscribe((queryTerm) => {
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
    this.moviesSubscription = this.svcMovies.getMovies(params).subscribe((res: YifyResponse) => {
      if (res.status === 'ok') {
        this.movies = res.data.movies;
      }
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

}
