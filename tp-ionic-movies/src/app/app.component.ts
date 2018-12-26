import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { TabsPage } from '../pages/tabs/tabs';
import { MoviesServiceProvider } from '../providers/movies-service/movies-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public sqlite: SQLite, public moviesServiceProvider: MoviesServiceProvider,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.createDatabase();
    });
  }

  private createDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db) => {
      console.log(db);
      this.moviesServiceProvider.setDatabase(db);
      return this.moviesServiceProvider.createTable();
    })
    .catch(error =>{
      console.error(error);
    });
  }
  
}
