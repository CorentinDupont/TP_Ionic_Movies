import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { MoviesServiceProvider } from '../../providers/movies-service/movies-service';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { MovieComponent } from '../../components/movie/movie';
import { Events } from 'ionic-angular';
import { ShowMoviePage } from '../show-movie/show-movie';


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
  
  allFavoriteMovies = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public moviesServiceProvider: MoviesServiceProvider, public platform:Platform, public events: Events) {
    events.subscribe('movies:refreshFavoriteMovies', () => {
      this.getAllFavoriteMovies();
    })
    events.subscribe('movies:showMovie', (movie: MovieComponent) => {
      this.showMovie(movie);
    })
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteMoviesPage');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter FavoriteMoviesPage');    
    this.getAllFavoriteMovies();

  }

  getAllFavoriteMovies(){
    console.log("try to get all favorite movies ...")
    this.moviesServiceProvider.getAll()
    .then((data) => {
      console.log("WTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
      console.log(JSON.stringify(data))
      this.allFavoriteMovies = data
    })
    .catch(error => {
      console.log(error);
      this.allFavoriteMovies = []
    });
  }

  showMovie(movie: MovieComponent){
    console.log('click on '+ JSON.stringify(movie));
    this.navCtrl.push(ShowMoviePage, {movie, isAFavMovie:true});
}


}
