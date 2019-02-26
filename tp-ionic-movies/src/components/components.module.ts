import { NgModule } from '@angular/core';
import { MovieComponent } from './movie/movie';
import { FavMovieCardComponent } from './fav-movie-card/fav-movie-card';
import { LoadingComponent } from './loading/loading';
//import { PicturesComponent } from './pictures/pictures';
@NgModule({
	declarations: [MovieComponent,
    FavMovieCardComponent,
    LoadingComponent],
	imports: [],
	exports: [MovieComponent,
    FavMovieCardComponent,
    LoadingComponent]
})
export class ComponentsModule {}
