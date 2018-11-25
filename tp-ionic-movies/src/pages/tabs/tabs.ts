import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { MovieListPage } from '../movie-list/movie-list';
import { Pictures } from '../pictures/pictures';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AboutPage;
  tab2Root = MovieListPage;
  tab3Root = Pictures;

  constructor() {

  }
}
