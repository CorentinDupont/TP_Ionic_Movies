import { NgModule } from '@angular/core';
import { MovieComponent } from './movie/movie';
import { FavMovieCardComponent } from './fav-movie-card/fav-movie-card';
//import { PicturesComponent } from './pictures/pictures';
@NgModule({
	declarations: [MovieComponent,
    FavMovieCardComponent],
	imports: [],
	exports: [MovieComponent,
    FavMovieCardComponent]
})
export class ComponentsModule {}
