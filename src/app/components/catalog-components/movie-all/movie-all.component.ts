import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from "../../../models/movie";
import {MovieService} from "../../../services/movie.service";
import {FavouriteService} from "../../../services/favourite.service";
import {StorageService} from "../../../services/storage.service";
import {StorageKeys} from "../../../keys/storage-keys";
import {AuthService} from "../../../services/auth.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-movie-all',
  templateUrl: './movie-all.component.html',
  styleUrls: ['./movie-all.component.scss']
})
export class MovieAllComponent implements OnInit, OnDestroy {
  movies: Movie[] = []
  private moviesSubscription: any;
  search: string;
  viewType: string;

  constructor(private movieService: MovieService,
              private favouriteService: FavouriteService,
              private storageService: StorageService,
              public authService: AuthService,
              private notificator: NotificationService) {
  }

  ngOnInit(): void {
    this.moviesSubscription = this.movieService.getAllMovies().subscribe(
      data => {
        this.movies = data
      },
      error => {
      }
    )
    let json = JSON.parse(this.storageService.getData(StorageKeys.VIEW_KEY))
    this.viewType = json == null || json == "" ? 'grid' : json;

  }

  ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe()
  }

  onViewChange(value: any){
    this.storageService.saveData(StorageKeys.VIEW_KEY, value);
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
