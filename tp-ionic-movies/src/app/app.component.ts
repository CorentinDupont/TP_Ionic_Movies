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

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public sqlite: SQLite, public moviesServiceProvider: MoviesServiceProvider,) {
      console.log("Platfomr don't ready bu i don't care")

    this.platform.ready().then((readySource) => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log('Platform ready from', readySource);

      statusBar.styleDefault();
      
      this.createDatabase(splashScreen.hide());

      

    });

  }

  private createDatabase(callback){
    console.log("Creating database ...")
    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db) => {
      console.log("created database : ", db);
      this.moviesServiceProvider.setDatabase(db);
      this.moviesServiceProvider.createTable();
      callback();
    })
    .catch(error =>{
      console.error(JSON.stringify(error));
    });
  }
  
}
