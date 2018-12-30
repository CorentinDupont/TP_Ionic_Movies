import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { MovieListPage } from '../movie-list/movie-list';
import { Pictures } from '../pictures/pictures';
import { FavoriteMoviesPage } from '../favorite-movies/favorite-movies';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = FavoriteMoviesPage;
  tab2Root = MovieListPage;
  tab3Root = Pictures;

  constructor(  ){

  }
}
