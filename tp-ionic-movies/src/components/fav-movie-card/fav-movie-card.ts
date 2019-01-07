import { Component, Input } from '@angular/core';
import { MovieComponent } from '../movie/movie';
import { ActionSheetController } from 'ionic-angular';
import { MoviesServiceProvider } from '../../providers/movies-service/movies-service'
import { Events } from 'ionic-angular';

/**
 * Generated class for the FavMovieCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fav-movie-card',
  templateUrl: 'fav-movie-card.html'
})
export class FavMovieCardComponent {

  // movie as Input permit to generate the component from the template with a props name "movie"
  @Input() movie: MovieComponent;

  constructor(public actionSheetCtrl: ActionSheetController, public moviesServiceProvider: MoviesServiceProvider, public events: Events) {
    console.log('Hello FavMovieCardComponent Component');
  }

  // Show action sheet
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Actions pour votre film favoris',
      buttons: [
        {
          text: 'Retirer de ma liste',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Destructive clicked');
            this.callRemoveFavMovie(this.movie);
          }
        }
      ]
    });
    actionSheet.present();
  }

  // Call refresh favorite movies method from an event created with the associate method in the favorite movies controller
  callRemoveFavMovie(movie: MovieComponent){

    this.moviesServiceProvider.delete(movie);
    this.events.publish('movies:refreshFavoriteMovies');
  }

  // Call show movie from the favorite movies controller
  callShowMovie(movie: MovieComponent){
    this.events.publish('movies:showMovie', movie);
  }
}
