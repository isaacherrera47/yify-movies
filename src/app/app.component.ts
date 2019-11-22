import {Component} from '@angular/core';
import {MoviesService} from './services/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Movies & tv shows';

  constructor(private svcMovies: MoviesService) {}
}
