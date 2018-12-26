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
    if(this.db === null){
      this.db = db;
    }
  }

  create(movie: MovieComponent){
    let sql = 'INSERT INTO movies('+Object.keys(movie).join(', ')+') VALUES(?,?)';
    return this.db.executeSql(sql, Object.keys(movie).map(key => movie[key]));

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
    
    let sql = 'CREATE TABLE IF NOT EXISTS movies(id INTEGER PRIMARY KEY AUTOINCREMENT,'+movieArguments.join(', ')+')';
    return this.db.executeSql(sql, []);
  }

  delete(movie: any){
    let sql = 'DELETE FROM movies WHERE id=?';
    return this.db.executeSql(sql, [movie.id]);
  }

  getAll(){
    let sql = 'SELECT * FROM movies';
    return this.db.executeSql(sql, [])
    .then(response => {
      const movies = response.rows.map((row)=>{
        return row.item();
      });
      return Promise.resolve( movies );
    })
    .catch(error => Promise.reject(error));
  }

  update(movie: MovieComponent){
    let updateArguments = Object.keys(movie).splice(Object.keys(movie).indexOf('id'), 1).join('=?, ')+'=? ';
    let sql = 'UPDATE movies SET'+updateArguments+'WHERE id=?';
    return this.db.executeSql(sql,Object.keys(movie).map(key => movie[key]));
  }

}
