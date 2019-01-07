import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from 'ionic-angular';
import { MovieComponent } from '../../components/movie/movie';

/*
  Generated class for the MovieGetterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieGetterProvider {

  public config;
  // movie list displayed in the movie-list page
  public moviesList=[];

  constructor(public httpClient : HttpClient, private toastController: ToastController) {
    // Make a first search, and initialise page number
    this.getMovies("red", 1);
  }

  // Empty the movie list, and call API with search parameters
  getMovies(searchString, page, infiniteScroll = null) {
    this.moviesList=[];
    this.addMovies(searchString, page, infiniteScroll = null);
  }

  // Search movie to fill the movie list, corresponding to a search string, and a page number, used with infinite scroll.
  addMovies(searchString, page, infiniteScroll = null){
    let requestText = 'http://www.omdbapi.com/?s='+searchString+'*&page='+page+'&apikey=69335388';
    var request = this.httpClient.get(requestText)
    console.log(requestText);

    // Subscribe to the omdbapi data
    request.subscribe(
      (data: any) => {  
        //console.log(data);

        // If some movies was found
        if(!!data.Search){
          data.Search.map((movieSimple) =>{

            // Make a request movie by movie, to get all their data
            let request = 'http://www.omdbapi.com/?i='+movieSimple.imdbID+'&plot=full&apikey=69335388';
            var movieRequest=this.httpClient.get(request);

            // Subscribe to the movie data
            movieRequest.subscribe(data => {  
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
              this.moviesList.push(movie);
            },
            err => console.error(err+" for "+movieSimple.Title),
            () => console.log('Movie' +movieSimple.Title +'Done')
          );
          })
        }
        if(infiniteScroll){
          // Stop the infinite scroll when needed.
          infiniteScroll.complete();
        }
      },
      err => console.error(err),
      () => console.log('Movie Done')
    );
  }

  // Search one movie by imdb Id. Used when a user scan a QR Code
  getOneMovie(imdbId:string){

    console.log("MOVIE GETTER - try to get one movie", imdbId);

    return new Promise<MovieComponent>((resolve, reject) => {
      console.log("MOVIE GETTER - enter in promise", imdbId);

      // Cause of qr code or something else, imdbId contains double qotes in the URL. first and last characters are removed.
      let request = `http://www.omdbapi.com/?i=${imdbId.substring(1).slice(0,-1)}&plot=full&apikey=69335388`;
      console.log("MOVIE GETTER - request : ", request);
      
      var movieRequest=this.httpClient.get(request);
  
      // Subscribe to the movie data
      movieRequest.subscribe((data:any) => {

        // prevent scan to other URL that one for the API
        if(data.Response === "False"){
          reject(data.Error);
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
        resolve(movie)
      },
      err => {
        reject(err);
        console.error(JSON.stringify(err))
      },
      () => {
        console.log('One Movie request Done')
      }
      );
    })
   
  }

}
