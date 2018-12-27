import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieComponent } from '../../components/movie/movie';
import { MoviesServiceProvider } from '../../providers/movies-service/movies-service';

/**
 * Generated class for the ShowMoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-movie',
  templateUrl: 'show-movie.html',
})
export class ShowMoviePage {

  public movie: MovieComponent;
  public isAFavMovie: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public moviesServiceProvider: MoviesServiceProvider) {
    this.movie = navParams.get('movie');
    this.isAFavMovie = navParams.get('isAFavMovie');
  }

  addToFavorite(movie: MovieComponent){
    console.log("Add to favorite movie : ",movie.title);
    this.moviesServiceProvider.create(movie);
  }

  removeFromFavorite(movie: MovieComponent){
    this.moviesServiceProvider.delete(movie);
    this.navCtrl.pop();
  }


}
