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

  @Input() movie: MovieComponent;

  constructor(public actionSheetCtrl: ActionSheetController, public moviesServiceProvider: MoviesServiceProvider, public events: Events) {
    console.log('Hello FavMovieCardComponent Component');
  }

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

  callRemoveFavMovie(movie: MovieComponent){

    this.moviesServiceProvider.delete(movie);
    this.events.publish('movies:refreshFavoriteMovies');
  }

}
