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

  db: SQLiteObject = null;

  constructor() {}

  // public methods

  setDatabase(db: SQLiteObject){
    console.log("Try to set db")
    if(!this.db){
      console.log("SET DATABASE")
      this.db = db;
    }
  }

  create(movie: MovieComponent){
    console.log("Creating movie ...")
    let sql = 'INSERT INTO movies('+Object.keys(movie).join(', ')+') VALUES(?,?,?,?,?,?,?,?,?,?,?)';
    const params = Object.keys(movie).map(key => movie[key]);
    console.log(JSON.stringify(params));
    this.db.executeSql(sql, params).then((result)=>{
      console.log("Movie successfully inserted ! ", JSON.stringify(result));
    })
    .catch(error => {
      console.log(error);
    });

  }

  createTable(){
    const movieArguments = [
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
    ];
    
    let sql = 'CREATE TABLE IF NOT EXISTS movies(id INTEGER PRIMARY KEY AUTOINCREMENT, '+movieArguments.join(', ')+')';
    console.log("creating movies data table ...")
    this.db.executeSql(sql, [])
    .then(() => {
      console.log('movies data table created !')
    }).catch(error => {
      console.log(error);
    });
  }

  selectByTitle(title: String){
    let sql = 'SELECT * FROM movies WHERE title=?'

    return new Promise((resolve, reject) => {
      console.log("MOVIES : select by title : enter in promise")
      this.db.executeSql(sql, [title])
      .then((response) => {
        console.log("MOVIES : select by title : response !!", JSON.stringify(response))

        // Get movies array from response
        let movies:MovieComponent[] = [];
        for(let i=0; i<response.rows.length; i++) {
          const obj = response.rows.item(i);
          movies.push(this.makeMovie(obj));
        }
        console.log("GET ALL movies from service : ", movies);
        resolve(movies);

      })
      .catch(error => {
        console.log("MOVIES : select by title : ERROR", JSON.stringify(error));
        reject(error)
      })
    })
  }

  delete(movie: any){
    let sql = 'DELETE FROM movies WHERE id=?';
    return this.db.executeSql(sql, [movie.id]);
  }

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
            movies.push(this.makeMovie(obj));
          }
          console.log("GET ALL movies from service : ", movies);
          resolve( movies );
        })
        .catch(error => reject(error));
      })
    
  }

  update(movie: MovieComponent){
    let updateArguments = Object.keys(movie).splice(Object.keys(movie).indexOf('id'), 1).join('=?, ')+'=? ';
    let sql = 'UPDATE movies SET'+updateArguments+'WHERE id=?';
    return this.db.executeSql(sql,Object.keys(movie).map(key => movie[key]));
  }

  makeMovie(data){
    let movie: MovieComponent = new MovieComponent();

    movie.id = data.id;
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

    return movie;
  }



}
