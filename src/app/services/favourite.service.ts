import {Injectable} from '@angular/core';
import {StorageService} from "./storage.service";
import {User} from "../models/user";
import {Movie} from "../models/movie";
import {BehaviorSubject, first, Observable, throwError} from "rxjs";
import {StorageKeys} from "../keys/storage-keys";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {


  constructor(private storageService: StorageService, private userService: UserService) {
  }

  toggleFavouriteForUser(userName: string, movie: Movie) {
    let action: boolean = true;
    this.userService.getUserByUsername(userName).pipe(first()).subscribe(
      next => {
        if (next.favourites.findIndex(fav => fav == movie.id) > -1) {
          next.favourites = next.favourites.filter(movId => movId != movie.id);
          action = false
        } else {
          next.favourites.push(movie.id)
        }
        this.userService.updateUser(next).pipe(first())
      },
      error => {
      }
    )
    return action;
  }

}
