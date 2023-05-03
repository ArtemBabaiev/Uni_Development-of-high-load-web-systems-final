import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovieService} from "../../../services/movie.service";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {Movie} from "../../../models/movie";
import {User} from "../../../models/user";
import {AuthData} from "../../../models/auth-data";
import {find, first} from "rxjs";
import {map} from "rxjs/operators";
import {FavouriteService} from "../../../services/favourite.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-profile-favourites',
  templateUrl: './profile-favourites.component.html',
  styleUrls: ['./profile-favourites.component.scss']
})
export class ProfileFavouritesComponent implements OnInit, OnDestroy {
  movies: Movie[];
  user: User;
  authData: AuthData
  movieSubscription: any;
  userSubscription: any;

  constructor(private movieService: MovieService,
              private userService: UserService,
              public authService: AuthService,
              private favouriteService: FavouriteService,
              private notificator: NotificationService) {
  }

  ngOnInit(): void {
    this.authData = this.authService.getAuthData()
    this.userSubscription = this.userService.getAllUsers().pipe(map(users => users.find(user => user.username == this.authData.username))).subscribe(
      next => {
        this.user = next;
        this.movieSubscription = this.movieService.getAllMovies().pipe(map(ms => ms.filter(m => this.user.favourites.includes(m.id)))).subscribe(
          next => {
            this.movies = next;
          }
        )
      }
    )
  }

  ngOnDestroy() {
    this.movieSubscription.unsubscribe()
    this.userSubscription.unsubscribe()
  }

  onFavouriteClick(movie: Movie) {
    let action: boolean = true;
    if (this.user.favourites.findIndex(fav => fav == movie.id) > -1) {
      this.user.favourites = this.user.favourites.filter(movId => movId != movie.id);
      action = false
    } else {
      this.user.favourites.push(movie.id)
    }
    this.userService.updateUser(this.user).pipe(first())
    return action;
  }
}
