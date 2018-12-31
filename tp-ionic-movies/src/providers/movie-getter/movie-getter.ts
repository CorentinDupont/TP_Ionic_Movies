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
  public moviesList=[];

  constructor(public httpClient : HttpClient, private toastController: ToastController) {
    this.getMovies("blue", 1);
  }

  getMovies(searchString, page, infiniteScroll = null) {
    this.moviesList=[];
    this.addMovies(searchString, page, infiniteScroll = null);
  }

  addMovies(searchString, page, infiniteScroll = null){
    let requestText = 'http://www.omdbapi.com/?s='+searchString+'*&page='+page+'&apikey=69335388';
    var request = this.httpClient.get(requestText)
    console.log(requestText);
    request.subscribe(
      (data: any) => {  

        //console.log(data);
        if(!!data.Search){
          data.Search.map((movieSimple) =>{
            let request = 'http://www.omdbapi.com/?i='+movieSimple.imdbID+'&plot=full&apikey=69335388';
            var movieRequest=this.httpClient.get(request);


            movieRequest.subscribe(data => {  
              console.log(data['Genre'])
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

              this.moviesList.push(movie);
              //console.log(data); 
            },
            err => console.error(err+" for "+movieSimple.Title),
            () => console.log('Movie' +movieSimple.Title +'Done')
          );
          })
        }
        if(infiniteScroll){
          infiniteScroll.complete();
        }
      },
      err => console.error(err),
      () => console.log('Movie Done')
    );
  }

  getOneMovie(imdbId:string){

    console.log("MOVIE GETTER - try to get one movie", imdbId);

    return new Promise<MovieComponent>((resolve, reject) => {
      console.log("MOVIE GETTER - enter in promise", imdbId);

      // Cause of qr code or something else, imdbId contains double qotes in the URL. first and last caracter are removed.
      let request = `http://www.omdbapi.com/?i=${imdbId.substring(1).slice(0,-1)}&plot=full&apikey=69335388`;
      console.log("MOVIE GETTER - request : ", request);
      
      var movieRequest=this.httpClient.get(request);
  
      movieRequest.subscribe(data => {
        console.log("MOVIE GETTER - one movie found !", JSON.stringify(data));

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
