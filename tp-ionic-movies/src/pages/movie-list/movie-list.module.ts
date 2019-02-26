import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieListPage } from './movie-list';
import { LoadingComponent } from '../../components/loading/loading';


@NgModule({
  declarations: [
    MovieListPage,
    LoadingComponent
  ],
  imports: [
    IonicPageModule.forChild(MovieListPage),
  ],
})
export class MovieListPageModule {}
