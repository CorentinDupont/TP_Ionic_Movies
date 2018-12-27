import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoriteMoviesPage } from './favorite-movies';
import { FavMovieCardComponent } from '../../components/fav-movie-card/fav-movie-card'

@NgModule({
  declarations: [
    FavoriteMoviesPage,
    FavMovieCardComponent
  ],
  imports: [
    IonicPageModule.forChild(FavoriteMoviesPage),
  ],
})
export class FavoriteMoviesPageModule {}
