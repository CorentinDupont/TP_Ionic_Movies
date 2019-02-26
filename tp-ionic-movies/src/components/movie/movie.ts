import { Component } from '@angular/core';

/**
 * Generated class for the MovieComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'movie',
  templateUrl: 'movie.html'
})
export class MovieComponent {

  public id: number;
  public imdbId: string;
  public title: string;
  public year: number;
  public rated: string;
  public released: string;
  public runtime: string;
  public genre: string;
  public director: string;
  public language: string;
  public country: string;
  public awards: string;
  public production: string;
  public poster: string;
  public plot: string;

  constructor() {

  }

  public static isCorrect(jsonObj){
    // use after scanning qr code
      return(
        jsonObj.hasOwnProperty("title")
        && jsonObj.hasOwnProperty("year")
        && jsonObj.hasOwnProperty("runtime")
      )
  }
}
