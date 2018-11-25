import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieGetterProvider} from '../../providers/movie-getter/movie-getter';
import { MovieComponent } from '../../components/movie/movie';
import { ShowMoviePage } from '../show-movie/show-movie';

/**
 * Generated class for the MovieListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-list',
  templateUrl: 'movie-list.html',
})
export class MovieListPage {
  private value = "";
  movieTitle = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public movieGetter : MovieGetterProvider) {
  }

  onKey(event: any) { // without type info
    this.value = event.target.value;
    this.movieGetter.getMovies(this.value);
  }

  showMovie(movie: MovieComponent){
      //console.log('click on '+movie.title);
      this.navCtrl.push(ShowMoviePage, {movie:movie});
  }
  

}
