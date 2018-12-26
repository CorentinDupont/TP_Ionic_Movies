import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoviesServiceProvider } from '../../providers/movies-service/movies-service';

/**
 * Generated class for the FavoriteMoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorite-movies',
  templateUrl: 'favorite-movies.html',
})
export class FavoriteMoviesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public moviesServiceProvider: MoviesServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteMoviesPage');

  }

  getAllFavoriteMovies(){
    return this.moviesServiceProvider.getAll();
  }


}
