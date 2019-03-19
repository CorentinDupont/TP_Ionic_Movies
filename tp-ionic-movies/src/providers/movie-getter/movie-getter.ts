import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from 'ionic-angular';
import { MovieComponent } from '../../components/movie/movie';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/first';
import settings from '../../config/settings';

/*
  Generated class for the MovieGetterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieGetterProvider {


  private apiUrl:string = settings.movieApiUrl;
  private apiKey:string = settings.movieApiKey;

  // movie list displayed in the movie-list page
  public moviesList=[];

  public isLoading: boolean = false;

  constructor(public httpClient : HttpClient) {
    // Make a first search, and initialise page number
    this.getMovies("red", 1);
  }

  // Empty the movie list, and call API with search parameters
  getMovies(searchString, page, infiniteScroll = null) {
    this.isLoading = true;
    this.moviesList = [];
    this.addMovies(searchString, page, infiniteScroll = null);
  }

  // Search movie to fill the movie list, corresponding to a search string, and a page number, used with infinite scroll.
  addMovies(searchString, page, infiniteScroll = null){
    let requestText = `${this.apiUrl}/?s=${searchString}*&page=${page}&apikey=${this.apiKey}`;
    var request$ = this.httpClient.get(requestText)
    console.log(requestText);


    // Subscribe to the omdbapi data
    const combinedRequest$ = request$.pipe(switchMap((data: any, index: number)=>{
        let combine$: Observable<any> = of(null);
        if(!!data.Search){
          //get all observable into array
          let subRequests$: Observable<any>[];
          subRequests$ = data.Search.map((movieSimple) =>{
            // Make a request movie by movie, to get all their data
            let request = `${this.apiUrl}/?i=${movieSimple.imdbID}&plot=full&apikey=${this.apiKey}`;
            return this.httpClient.get(request);
          });

          combine$ = combineLatest(subRequests$);

        }
        return combine$;
    }));

    combinedRequest$ && combinedRequest$.subscribe((movies: any) => {
      this.moviesList = [];
      
      movies && movies.map(data => {  
        console.log(data['Genre'])

        // Make a movie object
        var movie = new MovieComponent();
        movie.imdbId = data["imdbID"];
        movie.poster = data['Poster'];
        movie.title = data['Title'];
        movie.year = data['Year'];
        movie.rated = data['Rated'];
        movie.released = data['Released'];
        movie.runtime = data['Runtime'];
        movie.director = data['Director'];
        movie.language = data['Language'];
        movie.country = data['Country'];
        movie.awards = data['Awards'];
        movie.production = data['Production'];
        movie.genre = data['Genre']; 
        movie.plot = data['Plot']; 

        // Push the new constructed movie into the movie list
        console.log('Ajout du film : ', movie.title)
        this.moviesList.push(movie);
      });
      infiniteScroll && infiniteScroll.complete();
      this.isLoading = false;
    });
  }

  // Search one movie by imdb Id. Used when a user scan a QR Code
  getOneMovie(imdbId:string){

    console.log("MOVIE GETTER - try to get one movie", imdbId);

    console.log("MOVIE GETTER - enter in promise", imdbId);

    // Cause of qr code or something else, imdbId contains double qotes in the URL. first and last characters are removed.
    let request = `${this.apiUrl}/?i=${imdbId.substring(1).slice(0,-1)}&plot=full&apikey=${this.apiKey}`;
    console.log("MOVIE GETTER - request : ", request);
    
    let movieRequest$=this.httpClient.get(request);

    // Subscribe to the movie data
    return movieRequest$.first().toPromise()
    .then((data:any) => {

      // prevent scan to other URL that one for the API
      if(data.Response === "False"){
        return Promise.reject(data.Error);
      }

      console.log("MOVIE GETTER - one movie found !", JSON.stringify(data));

      // Make a movie object
      let movie = new MovieComponent();
      movie.imdbId = data["imdbID"];
      movie.poster = data['Poster'];
      movie.title = data['Title'];
      movie.year = data['Year'];
      movie.rated = data['Rated'];
      movie.released = data['Released'];
      movie.runtime = data['Runtime'];
      movie.director = data['Director'];
      movie.language = data['Language'];
      movie.country = data['Country'];
      movie.awards = data['Awards'];
      movie.production = data['Production'];
      movie.genre = data['Genre'];
      movie.plot = data['Plot'];

      // return it as a good response for the promise
      return Promise.resolve(movie);
    })
    .catch(
      err => Promise.reject(err)
    );   
  }
}
