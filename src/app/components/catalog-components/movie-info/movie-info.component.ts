import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../../services/movie.service";
import {NotificationService} from "../../../services/notification.service";
import {ActivatedRoute} from "@angular/router";
import {Movie} from "../../../models/movie";
import {first} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {FavouriteService} from "../../../services/favourite.service";

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit{
  movie: Movie;

  constructor(private movieService: MovieService,
              private notificator: NotificationService,
              private route: ActivatedRoute,
              public authService: AuthService,
              private favouriteService: FavouriteService) {
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    this.movieService.getMovieById(id).pipe(first()).subscribe(
      next=>{
        this.movie = next
      },
      error => {}
    )
  }

  onFavouriteClick(movie: Movie) {
    if (this.authService.isAuth()){
      let user = this.authService.getAuthUser()
      if (this.favouriteService.toggleFavouriteForUser(user.username, movie)){
        this.notificator.success("Movie added to favourites")
      }
      else{
        this.notificator.success("Movie removed from favourites")
      }
    }else {
      this.notificator.waring("Please login to add movie to favourites")
    }
  }
}
