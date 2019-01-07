import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
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

  // Constructor
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public movieGetter : MovieGetterProvider, 
    private barcodeScanner: BarcodeScanner, 
    private moviesServiceProvider: MoviesServiceProvider, 
    public networkProvider:NetworkProvider, 
    private alertController: AlertController) {
    
  }

  // Ionic Life Cycle Event - When page is show
  ionViewDidEnter(){
    if(!this.hasInternetConnection()){
      this.showNetworkAlert()
    }
  }

  // Search Bar Event - When new key is pressed
  onKey(event: any) {
    if(this.hasInternetConnection()){
      // Modifiy search paramaters and call movie provider to get new
      this.page = 1;
      this.value = event.target.value;
      this.movieGetter.getMovies(this.value, this.page);
    }else{
      this.showNetworkAlert();
    }
    
  }

  // Open Show Movie Page, with clicked movie
  showMovie(movie: MovieComponent){
      this.navCtrl.push(ShowMoviePage, {movie, isAFavMovie:false});
  }

  // Infinite Scroll Management
  doInfinite(infiniteScroll){
    if(this.hasInternetConnection()){
      // Change page parameter to load more movies in the grid.
      this.page +=1;
      setTimeout(()=>{
        this.movieGetter.addMovies(this.value, this.page, infiniteScroll);
      }, 1000);
    }else{
      this.showNetworkAlert();
      infiniteScroll.complete();
    }

  }

  // QR Code Scanner Management
  scanCode() {
    // Open the camera screen and wait for QR Code
    this.barcodeScanner.scan().then(barcodeData => {
      if(this.hasInternetConnection()){
        // Prevent scanner to open show movie page when user press android back button
        if(barcodeData.text){
          console.log("QR CODE SCANNER : get some data");

          // get imdbId from scanned text (this can be something else)
          const scannedImdbId = barcodeData.text;
          console.log("QR CODE SCANNER : scannedImdbId", scannedImdbId);
    
          // try to find one movie by imdbId from the API
          this.movieGetter.getOneMovie(scannedImdbId).then((movie:MovieComponent)=>{
            console.log("SCANNED MOVIE :", JSON.stringify(movie));
            this.showMovie(movie);
          }).catch(error => {
            // If an error occur during http process, then show a scan failed alert
            console.error(JSON.stringify(error))
            this.showScanFailAlert();
          });

        }else{
          // There was nothing in the scanned data
          this.showScanFailAlert();
        }
        
      }else{
        this.showNetworkAlert();
      }
     

    }, (err) => {
        console.log('Error: ', err);
    });
  }

  // use network provider to test internet access
  hasInternetConnection(){
    return this.networkProvider.hasInternetConnection();
  }

  // is called to show an alert when device has no internet access
  showNetworkAlert(){
    this.networkProvider.doNetworkAlert();
  }

  // Scan failed alert
  showScanFailAlert(){
    let alert = this.alertController.create({
      title: 'Echec du scan',
      subTitle: "Aucun film n'a été trouvé suite au scan. Vérifier que vous scannez bien un QR Code venant de l'application.",
      buttons: [{
        text: 'Ok',
        role: 'Cancel',
        handler: () => {

        }
      }]
    });
    alert.present();
  }
  

  
  

}
