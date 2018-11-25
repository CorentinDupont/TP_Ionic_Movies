import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieGetterProvider} from '../../providers/movie-getter/movie-getter';

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
  

}
