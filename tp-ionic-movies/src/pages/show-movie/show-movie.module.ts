import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowMoviePage } from './show-movie';

@NgModule({
  declarations: [
    ShowMoviePage,
  ],
  imports: [
    IonicPageModule.forChild(ShowMoviePage),
  ],
})
export class ShowMoviePageModule {}
