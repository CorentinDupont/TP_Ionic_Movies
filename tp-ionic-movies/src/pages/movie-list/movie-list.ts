import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { MovieGetterProvider} from '../../providers/movie-getter/movie-getter';
import { MovieComponent } from '../../components/movie/movie';
import { ShowMoviePage } from '../show-movie/show-movie';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MoviesServiceProvider } from '../../providers/movies-service/movies-service'
// import { NetworkProvider } from '../../providers/network/network';
import { NetworkProvider } from '../../providers/network/network';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public movieGetter : MovieGetterProvider, private barcodeScanner: BarcodeScanner, private moviesServiceProvider: MoviesServiceProvider, public networkProvider:NetworkProvider, private events:Events) {
    
  }

  ionViewDidEnter(){
    if(!this.hasInternetConnection()){
      this.showNetworkAlert()
    }
  }

  onKey(event: any) { // without type info
    if(this.hasInternetConnection()){
      this.page = 1;
      this.value = event.target.value;
      this.movieGetter.getMovies(this.value, this.page);
    }else{
      this.showNetworkAlert();
    }
    
  }

  showMovie(movie: MovieComponent){
      //console.log('click on '+movie.title);
      this.navCtrl.push(ShowMoviePage, {movie, isAFavMovie:false});
  }

  doInfinite(infiniteScroll){
    if(this.hasInternetConnection()){
      this.page +=1;
      setTimeout(()=>{
        this.movieGetter.addMovies(this.value, this.page, infiniteScroll);
      }, 1000);
    }else{
      this.showNetworkAlert();
      infiniteScroll.complete();
    }

  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      if(this.hasInternetConnection()){
        console.log("QR CODE SCANNER : get some data");

        const scannedImdbId = barcodeData.text;
        console.log("QR CODE SCANNER : scannedImdbId", scannedImdbId);
  
        this.movieGetter.getOneMovie(scannedImdbId).then((movie:MovieComponent)=>{
          console.log("SCANNED MOVIE :", JSON.stringify(movie));
          this.navCtrl.push(ShowMoviePage, {movie, isAFavMovie:false});
        }).catch(error => {console.error(JSON.stringify(error))});
       
        // the following code is usefull for adding movie directly in favorite.
  
        //Test if this movie is a fav movie
        // this.isAFavMovie(scannedMovie).then((isAFavMovie) => {
        //   if(!isAFavMovie){
        //     // add movie in favorite (in db)
        //     this.moviesServiceProvider.create(scannedMovie);
        //   }else{
        //     //show user that this movie is already in his favorite
        //     console.log("this scanned movie is already is your favovrite !")
        //   }
        // }).catch(error => {console.log(error)});
      }else{
        this.showNetworkAlert();
      }
     

    }, (err) => {
        console.log('Error: ', err);
    });
  }

  isAFavMovie(movie: MovieComponent): Promise<boolean>{
    return new Promise<boolean>((resolve, reject)=>{
      this.moviesServiceProvider.select(movie.imdbId)
      .then((data) => {
        console.log(data);
        resolve(!!data.length);
      })
      .catch(error => {
        reject(error);
      });
    })
  }

  hasInternetConnection(){
    return this.networkProvider.hasInternetConnection();
  }

  showNetworkAlert(){
    this.networkProvider.doNetworkAlert();
  }
  

  
  

}
