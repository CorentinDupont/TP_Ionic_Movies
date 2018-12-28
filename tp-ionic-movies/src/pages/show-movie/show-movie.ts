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
  public addToFavoriteButtonIsDisabled: boolean = false;
  public createdCode: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public moviesServiceProvider: MoviesServiceProvider) {
    this.movie = navParams.get('movie');
    this.isAFavMovie = navParams.get('isAFavMovie');
  }

  ionViewDidEnter(){
    // test if it's not a fav movie when user came from search movie list
    !this.isAFavMovie && this.testIfMovieIsAlreadyInFavorite(this.movie);
    this.createCode(this.movie);
  }

  addToFavorite(movie: MovieComponent){
    console.log("Add to favorite movie : ",movie.title);
    this.moviesServiceProvider.create(movie);
    this.addToFavoriteButtonIsDisabled = true;
  }

  removeFromFavorite(movie: MovieComponent){
    this.moviesServiceProvider.delete(movie);
    this.isAFavMovie = false;
    this.navCtrl.pop();
  }

  private testIfMovieIsAlreadyInFavorite(movie: MovieComponent){
    this.moviesServiceProvider.selectByTitle(movie.title)
    .then((data) => {
      console.log(data);
      if(data.length){
        this.addToFavoriteButtonIsDisabled = true;
      }
    })
    .catch(error => {console.log(error)});
  }

  createCode(movie: MovieComponent) {
    movie.id && delete movie.id
    this.createdCode = JSON.stringify(movie);
  }


}
