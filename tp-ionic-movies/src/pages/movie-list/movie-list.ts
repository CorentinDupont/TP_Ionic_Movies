import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieGetterProvider} from '../../providers/movie-getter/movie-getter';
import { MovieComponent } from '../../components/movie/movie';
import { ShowMoviePage } from '../show-movie/show-movie';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MoviesServiceProvider } from '../../providers/movies-service/movies-service'

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
  private page = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public movieGetter : MovieGetterProvider, private barcodeScanner: BarcodeScanner, private moviesServiceProvider: MoviesServiceProvider) {
  
  }

  onKey(event: any) { // without type info
    this.page = 1;
    this.value = event.target.value;
    this.movieGetter.getMovies(this.value, this.page);
  }

  showMovie(movie: MovieComponent){
      //console.log('click on '+movie.title);
      this.navCtrl.push(ShowMoviePage, {movie, isAFavMovie:false});
  }

  doInfinite(infiniteScroll){
    this.page +=1;
    setTimeout(()=>{
      this.movieGetter.addMovies(this.value, this.page, infiniteScroll);
    }, 1000);
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      const scannedMovie = this.moviesServiceProvider.makeMovie(JSON.parse(barcodeData.text), true);

      console.log("SCANNED MOVIE :", JSON.stringify(scannedMovie));

        this.navCtrl.push(ShowMoviePage, {movie:scannedMovie, isAFavMovie:false});

      //Test if this movie is 
      // this.isAFavMovie(scannedMovie).then((isAFavMovie) => {
      //   if(!isAFavMovie){
      //     // add movie in favorite (in db)
      //     this.moviesServiceProvider.create(scannedMovie);
      //   }else{
      //     //show user that this movie is already in his favorite
      //     console.log("this scanned movie is already is your favovrite !")
      //   }
      // }).catch(error => {console.log(error)});
    }, (err) => {
        console.log('Error: ', err);
    });
  }

  isAFavMovie(movie: MovieComponent): Promise<boolean>{
    return new Promise<boolean>((resolve, reject)=>{
      this.moviesServiceProvider.selectByTitle(movie.title)
      .then((data) => {
        console.log(data);
        resolve(!!data.length);
      })
      .catch(error => {
        reject(error);
      });
    })
  }
  

  
  

}
