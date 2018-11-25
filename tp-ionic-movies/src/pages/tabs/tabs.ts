import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { MovieListPage } from '../movie-list/movie-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MovieListPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
