import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MovieListPage } from '../pages/movie-list/movie-list';
import { ShowMoviePage } from '../pages/show-movie/show-movie';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MovieGetterProvider } from '../providers/movie-getter/movie-getter';
import { MovieComponent } from '../components/movie/movie'; 
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { SQLite } from '@ionic-native/sqlite';
import { MoviesServiceProvider } from '../providers/movies-service/movies-service';
import { FavoriteMoviesPage } from '../pages/favorite-movies/favorite-movies';
import { FavMovieCardComponent } from '../components/fav-movie-card/fav-movie-card'
import { LoadingComponent } from '../components/loading/loading'

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Network } from '@ionic-native/network';



import { GetFirstGenrePipe } from '../pipes/get-first-genre'
import { NetworkProvider } from '../providers/network/network';
import { DeuxMille48Page } from '../pages/deux-mille48/deux-mille48';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser'; // for gesture

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      // override hammerjs default configuration
      'pan': {threshold: 5},
      'swipe': {
           velocity: 0.4,
           threshold: 20,
           direction: 31 // /!\ ugly hack to allow swipe in all direction
      }
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    MovieListPage,
    MovieComponent,
    ShowMoviePage,
    FavoriteMoviesPage,
    FavMovieCardComponent,
    LoadingComponent,
    GetFirstGenrePipe,
    DeuxMille48Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    NgxQRCodeModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    MovieListPage,
    ShowMoviePage,
    FavoriteMoviesPage,
    FavMovieCardComponent,
    LoadingComponent,
    DeuxMille48Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MovieGetterProvider,
    Camera,
    SQLite,
    MoviesServiceProvider,
    BarcodeScanner,
    NetworkProvider,
    Network,
    { 
      provide: HAMMER_GESTURE_CONFIG, 
      useClass: MyHammerConfig 
    }
  ]
})
export class AppModule {}
