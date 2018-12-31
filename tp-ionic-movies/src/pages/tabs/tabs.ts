import { Component } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { MovieListPage } from '../movie-list/movie-list';
import { Pictures } from '../pictures/pictures';
import { FavoriteMoviesPage } from '../favorite-movies/favorite-movies';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = FavoriteMoviesPage;
  tab2Root = MovieListPage;
  tab3Root = Pictures;

  constructor(private statusBar: StatusBar){
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#33000000');
  }

  
}
