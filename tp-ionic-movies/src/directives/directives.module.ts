import { NgModule } from '@angular/core';
import { ElasticDirective } from './elastic/elastic';
import { ScrollDirective } from './scroll/scroll';
@NgModule({
	declarations: [ElasticDirective, ScrollDirective],
	imports: [],
	exports: [ElasticDirective, ScrollDirective]
})
export class DirectivesModule {}
