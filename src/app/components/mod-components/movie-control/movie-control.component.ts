import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Movie} from "../../../models/movie";
import {MovieService} from "../../../services/movie.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-movie-control',
  templateUrl: './movie-control.component.html',
  styleUrls: ['./movie-control.component.scss']
})
export class MovieControlComponent implements OnInit, OnDestroy{
  subscription: Subscription;
  movies: Movie[] = [];
  search: string;

  constructor(private movieService: MovieService,
              private notificator: NotificationService) {
  }

  ngOnInit(): void {
    this.subscription = this.movieService.getAllMovies().subscribe(
      next =>{
        this.movies = next;
      },
      error => {}
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onClickDelete(id: number){
    this.movieService.deleteMovie(id).pipe().subscribe(
      next=>{
        this.notificator.success("Movie deleted")
      },
      error => {
        this.notificator.error(error.message)
      }
    )
  }

}
