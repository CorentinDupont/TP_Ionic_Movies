import { Component } from '@angular/core';

import { MovieListPage } from '../movie-list/movie-list';
import { FavoriteMoviesPage } from '../favorite-movies/favorite-movies';
import { StatusBar } from '@ionic-native/status-bar';
import { DeuxMille48Page } from '../deux-mille48/deux-mille48';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = FavoriteMoviesPage;
  tab2Root = MovieListPage;
  //tab3Root = Pictures;
  tab3Root = DeuxMille48Page;

  constructor(private statusBar: StatusBar){
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#33000000');
  }

  
}
