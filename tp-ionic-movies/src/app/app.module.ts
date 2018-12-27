import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MovieListPage } from '../pages/movie-list/movie-list';
import { ShowMoviePage } from '../pages/show-movie/show-movie';
import { Pictures } from '../pages/pictures/pictures';

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



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MovieListPage,
    MovieComponent,
    ShowMoviePage,
    Pictures,
    FavoriteMoviesPage,
    FavMovieCardComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    QRCodeModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MovieListPage,
    ShowMoviePage,
    Pictures,
    FavoriteMoviesPage,
    FavMovieCardComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MovieGetterProvider,
    Camera,
    SQLite,
    MoviesServiceProvider
  ]
})
export class AppModule {}
