import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { MoviesServiceProvider } from '../../providers/movies-service/movies-service';
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

    // Create events to give access to some methods to favorite movie cards component
    events.subscribe('movies:refreshFavoriteMovies', () => {
      this.getAllFavoriteMovies();
    })
    events.subscribe('movies:showMovie', (movie: MovieComponent) => {
      this.showMovie(movie);
    })
  }

  //Ionic Life Cycle Event - When the page is load (here, at the launch of the app)
  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteMoviesPage');
  }

  //Ionic Life Cycle Event - When page is shown
  ionViewDidEnter(){
    console.log('ionViewDidEnter FavoriteMoviesPage');    
    this.getAllFavoriteMovies();
  }

  // call method from movie service provider to get all favorite movies in sqlite database
  getAllFavoriteMovies(){
    console.log("try to get all favorite movies ...")
    this.moviesServiceProvider.getAll()
    .then((data) => {
      console.log(JSON.stringify(data))
      this.allFavoriteMovies = data
    })
    .catch(error => {
      console.log(error);
      this.allFavoriteMovies = []
    });
  }

  // Method to open the page "show-movie" with the clicked movie
  showMovie(movie: MovieComponent){
    console.log('click on '+ JSON.stringify(movie));
    this.navCtrl.push(ShowMoviePage, {movie, isAFavMovie:true});
  } 

}
