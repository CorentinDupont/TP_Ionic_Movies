import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { MovieComponent } from '../../components/movie/movie';
/*
  Generated class for the MoviesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoviesServiceProvider {

  /**
   * SINGLETON - "db" instance is created only one time, not each time we make a request to it
   */
  
  db: SQLiteObject = null;

  constructor() {}

  // method called at the launch of the app, to set the first instance of the db
  setDatabase(db: SQLiteObject){
    console.log("Try to set db")
    if(!this.db){
      console.log("SET DATABASE")
      this.db = db;
    }
  }

  //Add a movie object to the sqlite database
  create(movie: MovieComponent){
    console.log("Creating movie ...")

    // Construct sql query dynamically, getting the object keys' 
    let sql = 'INSERT INTO movies('+Object.keys(movie).join(', ')+') VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    let params = Object.keys(movie).map(key => movie[key]);

    console.log("PARAMS : ", JSON.stringify(params));

    // Execute query to insert
    this.db.executeSql(sql, params).then((result)=>{
      console.log("Movie successfully inserted ! ", JSON.stringify(result));
    })
    .catch(error => {
      console.log(JSON.stringify(error));
    });

  }

  // Create movies table, at the launch of the app
  createTable(){
    const movieArguments = [
      'imdbId TEXT',
      'title TEXT',
      'year NUMBER',
      'rated TEXT',
      'released TEXT',
      'runtime TEXT',
      'genre TEXT',
      'director TEXT',
      'language TEXT',
      'country TEXT',
      'awards TEXT',
      'production TEXT',
      'poster TEXT',
      'plot TEXT',
    ];
    
    let sql = 'CREATE TABLE IF NOT EXISTS movies(id INTEGER PRIMARY KEY AUTOINCREMENT, '+movieArguments.join(', ')+')';
    console.log("creating movies data table ...")

    /**
     * These commented lines are useful to reset the database, when any changements are made.
     * Be sure to execute them, otherwise your changement will not be used.
     */

    /*this.db.executeSql("DROP TABLE IF EXISTS movies", [])
    .then(() => {
      console.log('Suppression de la table pétée')
    }).catch(error => {
      console.log(error);
    });*/

    console.log(sql)

    // Execute create table request
    this.db.executeSql(sql, [])
    .then(() => {
      console.log('movies data table created !')
    }).catch(error => {
      console.log(error);
    });
  }

  // Select one movie from database by imdbId
  select(imdbId: string){
    let sql = 'SELECT * FROM movies WHERE imdbId=?'

    return new Promise<MovieComponent[]>((resolve, reject) => {
      console.log("MOVIES : select by imdbId : enter in promise", imdbId)
      this.db.executeSql(sql, [imdbId])
      .then((response) => {
        console.log("MOVIES : select : response !!", JSON.stringify(response))

        // Get movies array from response
        let movies:MovieComponent[] = [];
        for(let i=0; i<response.rows.length; i++) {
          const obj = response.rows.item(i);
          movies.push(this.makeMovie(obj, false));
        }
        console.log("GET ALL movies from service : ", movies);

        // Send movies array as success of the promise
        resolve(movies);

      })
      .catch(error => {
        console.error("MOVIES : select by title : ERROR", JSON.stringify(error));
        reject(error)
      })
    })
  }

  // Delete one movie from database
  delete(movie: MovieComponent){
    // Sql statement
    let sql = 'DELETE FROM movies WHERE imdbId=?';

    console.log('try to delete movie from database', JSON.stringify(movie))

    // Execute query
    this.db.executeSql(sql, [movie.imdbId]).then(result => {
      console.log("movie successfully deleted from database !", JSON.stringify(result))
    }).catch(error => {console.log("error : ", JSON.stringify(error))});
  }


  // Select all movies from database
  getAll(){
    let sql = 'SELECT * FROM movies';
      return new Promise((resolve, reject) => {
        console.log("enter in promise")

        this.db.executeSql(sql, [])
        .then(response => {
          console.log("response !!!", JSON.stringify(response))

          // Get movies array from response
          let movies = [];
          for(let i=0; i<response.rows.length; i++) {
            const obj = response.rows.item(i);
            movies.push(this.makeMovie(obj, false));
          }
          console.log("GET ALL movies from service : ", JSON.stringify(movies));
          resolve( movies );
        })
        .catch(error => reject(error));
      })
    
  }

  // Update a movie already in database. (Never used)
  update(movie: MovieComponent){
    let updateArguments = Object.keys(movie).splice(Object.keys(movie).indexOf('id'), 1).join('=?, ')+'=? ';
    let sql = 'UPDATE movies SET'+updateArguments+'WHERE id=?';
    return this.db.executeSql(sql,Object.keys(movie).map(key => movie[key]));
  }


  // Simple function to construct a movie object from a reliable 'any' object
  makeMovie(data, withoutId:boolean){
    let movie: MovieComponent = new MovieComponent();

    if(!withoutId){
      movie.id = data.id;
    }
    movie.imdbId = data.imdbId;
    movie.title = data.title;
    movie.year = data.year;
    movie.rated = data.rated;
    movie.released = data.released;
    movie.runtime = data.runtime;
    movie.genre = data.genre;
    movie.director = data.director;
    movie.language = data.language;
    movie.country = data.country;
    movie.awards = data.awards;
    movie.production = data.production;
    movie.poster = data.poster;
    movie.plot = data.plot;

    return movie;
  }



}
