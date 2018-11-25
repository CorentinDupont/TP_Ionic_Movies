import { NgModule } from '@angular/core';
import { MovieComponent } from './movie/movie';
import { PicturesComponent } from './pictures/pictures';
@NgModule({
	declarations: [MovieComponent,
    PicturesComponent],
	imports: [],
	exports: [MovieComponent,
    PicturesComponent]
})
export class ComponentsModule {}
