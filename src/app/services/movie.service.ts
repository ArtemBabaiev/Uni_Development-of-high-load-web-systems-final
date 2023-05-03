import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {Movie} from "../models/movie";
import {StorageService} from "./storage.service";
import {StorageKeys} from "../keys/storage-keys";
import {MovieData} from "../formModels/movie-data";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[] = [];
  private subjects = new BehaviorSubject<Movie[]>([])

  constructor(private storage: StorageService) {
    this.movies = JSON.parse(this.storage.getData(StorageKeys.MOVIE_KEY));
  }

  saveAndSubmitChanges() {
    this.storage.saveData(StorageKeys.MOVIE_KEY, this.movies)
    this.movies = JSON.parse(this.storage.getData(StorageKeys.MOVIE_KEY));
    this.subjects.next(this.movies);
  }

  getAllMovies(): Observable<Movie[]> {
    let json = this.storage.getData(StorageKeys.MOVIE_KEY)
    this.movies = JSON.parse(json);
    this.subjects.next(this.movies)
    return this.subjects.asObservable();
  }

  getMovieById(id: number) {
    let movie = this.movies.find(movie => movie.id == id);
    if (movie == undefined) {
      return throwError(() => new Error(`Movie with id=${id} not found`))
    }
    return of(movie);
  }

  createMovie(movieData: MovieData, poster: any = null): Observable<Movie> {
    let newMovie = this.toModel(movieData)
    let isFound = this.movies.find(movie => movie.title == newMovie.title) != undefined
    if (isFound) {
      return throwError(() => new Error('Movie with such moviename already exists'))
    }

    newMovie.id = Date.now();
    if (poster != null){
      this.storage.uploadImage(poster, newMovie.id)
    }
    newMovie.createdAt = new Date();
    this.movies.push(newMovie)
    this.saveAndSubmitChanges();
    return of(newMovie);
  }

  updateMovie(id: number, movieData: MovieData, poster: any = null): Observable<Movie> {
    let updatedMovie = this.toModel(movieData);
    updatedMovie.id = id;
    let saved = this.movies.find(movie => movie.id == updatedMovie.id);
    if (saved == undefined) {
      return throwError(() => new Error('Movie with such id doesnt exist'))
    }
    if (poster != null){
      this.storage.uploadImage(poster, updatedMovie.id)
    }
    updatedMovie.createdAt = saved.createdAt
    for (let i = 0; i < this.movies.length; i++) {
      if (this.movies[i].id == updatedMovie.id) {
        this.movies[i] = updatedMovie
      }
    }
    this.saveAndSubmitChanges();
    return of(updatedMovie)
  }

  deleteMovie(id: number): Observable<any> {
    if (this.movies.find(movie => movie.id == id) == undefined) {
      return throwError(() => new Error(`No movie with id=${id} exists`))
    }
    this.movies = this.movies.filter(movie => movie.id != id)
    this.saveAndSubmitChanges()
    return of(true)
  }

  toModel = (input: MovieData): Movie => {
    return {
      id: null,
      title: input.title,
      description: input.description,
      releaseYear: input.releaseYear,
      boxOffice: input.boxOffice,
      createdAt: null
    }
  }
}
