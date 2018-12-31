import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

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

  constructor( public alertCtrl : AlertController ){

  }

  doAlert() {
    let alert = this.alertCtrl.create({
      title: 'Network Error',
      subTitle: "je n'ai accès à aucun réseau wifi, mon fonctionnement en est donc très dégradé ",
      buttons: ['Ok']
    });

    alert.present();
  }
}
