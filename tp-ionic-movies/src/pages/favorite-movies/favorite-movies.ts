import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { MoviesServiceProvider } from '../../providers/movies-service/movies-service';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { MovieComponent } from '../../components/movie/movie';

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
  
  allFavoriteMovies = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public moviesServiceProvider: MoviesServiceProvider, public platform:Platform) {
    
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
      // console.log(JSON.stringify(data));
      this.allFavoriteMovies = data
    })
    .catch(error => {
      console.log(error);
      this.allFavoriteMovies = []
    });
  }


}
