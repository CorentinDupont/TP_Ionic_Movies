import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieComponent } from '../../components/movie/movie';
import { MoviesServiceProvider } from '../../providers/movies-service/movies-service';
import { StatusBar } from '@ionic-native/status-bar';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public moviesServiceProvider: MoviesServiceProvider, private statusBar: StatusBar) {
    // here, get the movie with id
    this.movie = navParams.get('movie');
    this.isAFavMovie = navParams.get('isAFavMovie');
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#33000000');

  }

  ionViewDidEnter(){
    // test if it's not a fav movie when user came from search movie list
    !this.isAFavMovie && this.testIfMovieIsAlreadyInFavorite(this.movie);
    this.createCode(this.movie);

    let previousScroll = 0;
    let scrollHeight = 0
    let difference = 0

    let parallax = document.getElementById('parallax-image');
    let parallaxContainer = document.getElementById('img-parralax-container');
  
    console.log(parallaxContainer.style.height)
    
    console.log("loaded")
    document.getElementsByClassName('scroll-content')[1].addEventListener('scroll', function(){
      let scroll = document.getElementsByClassName('scroll-content')[1].scrollTop;
      difference = previousScroll - scroll
      previousScroll = scroll;
      if(!parallax.style.top){
        parallax.style.top = "0px"
      }

      scrollHeight = parseInt(parallax.style.top.replace('px', '')) + difference / 3 ;
      if(scrollHeight >0 || scrollHeight*-1+parallaxContainer['height'] >= parallax['height']){
        scrollHeight = 0;
      }

      parallax.style.top = scrollHeight.toString() + "px" ;
    
    })
  }

  ionViewDidLoad(){
    
  }
  addToFavorite(movie: MovieComponent){
    console.log("Add to favorite movie : ",movie.title);
    this.moviesServiceProvider.create(movie);
    this.addToFavoriteButtonIsDisabled = true;
  }

  removeFromFavorite(movie: MovieComponent){
    // strangely, the id of the movie disappear from the start, so movie is delete by title
    this.moviesServiceProvider.delete(movie);
    this.isAFavMovie = false;
    this.navCtrl.pop();
  }

  private testIfMovieIsAlreadyInFavorite(movie: MovieComponent){
    this.moviesServiceProvider.select(movie.imdbId)
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
