import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoriteMoviesPage } from './favorite-movies';

@NgModule({
  declarations: [
    FavoriteMoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoriteMoviesPage),
  ],
})
export class FavoriteMoviesPageModule {}
