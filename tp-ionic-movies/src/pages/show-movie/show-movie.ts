import { Component, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieComponent } from '../../components/movie/movie';
import { MoviesServiceProvider } from '../../providers/movies-service/movies-service';
import { DefaultKeyValueDiffer } from '@angular/core/src/change_detection/differs/default_keyvalue_differ';

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

  // the displayed movie
  public movie: MovieComponent;

  @ViewChild('imgParralaxContainer') parallaxContainer: ElementRef;

  /**
   * These to booleans manage the "favorite" state of the concerned movie
   * isAFavMovie is calculated when the page is opened, when the previous page was movie-list
   * addToFavoriteButtonIsDisabled is used when user click on the fav button 
   */
  public isAFavMovie: boolean;
  public addToFavoriteButtonIsDisabled: boolean = false;

  // string contains in the QR Code
  public createdCode: String;

  // Constructor
  constructor(public navCtrl: NavController, public navParams: NavParams, public moviesServiceProvider: MoviesServiceProvider, private renderer: Renderer2) {
    // get the movie from previous page
    this.movie = navParams.get('movie');
    
    /**
     * get the favorite movie state from previous page 
     * If the previous page is the favorite-movies page, then it will be true
     */
    
    this.isAFavMovie = navParams.get('isAFavMovie');

  }

  @HostListener('window:scroll', ['$event']) 
  dotheJob(event) {
    console.log(event)
    /**
     * MANAGE MOVIE POSTER PARALLAX
     */
    /*
    let previousScroll = 0;
    let scrollHeight = 0
    let difference = 0
    let parallax = this.parallaxContainer.nativeElement.children[0];
    console.log("#######")
    console.log(this.parallaxContainer.nativeElement.style);
    
    this.parallaxContainer.nativeElement.addEventListener('scroll', () => {
      console.log("test");
      let scroll = this.parallaxContainer.nativeElement.scrollTop;
      difference = previousScroll - scroll
      previousScroll = scroll;
      if(!parallax.style.top){
        parallax.style.top = "0px"
      }

      scrollHeight = parseInt(parallax.style.top.replace('px', '')) + difference / 3 ;
      if(scrollHeight >0 || scrollHeight*-1+ this.parallaxContainer.nativeElement['height'] >= parallax['height']){
        scrollHeight = 0;
      }

      parallax.style.top = scrollHeight.toString() + "px" ;
    
    })
    */
  }
  track(value: number): void {
    console.log("BONJOUR");
    console.log(value);
  }

  // Ionic Life Cycle Event - When page is show
  ionViewDidEnter(){
    // test if it's not a fav movie when user came from search movie list
    !this.isAFavMovie && this.testIfMovieIsAlreadyInFavorite(this.movie);
    this.createCode(this.movie);

    
  }

  // Function called by the favorite button on click
  switchFavorite(movie: MovieComponent){
    if(this.isAFavMovie){
      this.removeFromFavorite(movie);
    }else{
      this.addToFavorite(movie);
    }
  }

  // Call provider to add movie into sqlite database
  addToFavorite(movie: MovieComponent){
    console.log("Add to favorite movie : ",movie.title);
    this.moviesServiceProvider.create(movie);
    this.addToFavoriteButtonIsDisabled = true;
  }

  // Call provider to remove movie from sqlite database
  removeFromFavorite(movie: MovieComponent){
    // strangely, the id of the movie disappear from the start, so movie is delete by title
    this.moviesServiceProvider.delete(movie);
    this.isAFavMovie = false;
    this.navCtrl.pop();
  }

  // Function called when this page is shown after the movie list page. 
  // Disable the "add to favorite" button to prevent user to remove from fav this movie from movie list.
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

  // define the string contained in QR Code
  createCode(movie: MovieComponent) {
    this.createdCode = JSON.stringify(movie.imdbId);
  }




}
