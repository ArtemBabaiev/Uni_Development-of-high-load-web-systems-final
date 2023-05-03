import {Injectable} from '@angular/core';
import {StorageService} from "./storage.service";
import {User} from "../models/user";
import {UserService} from "./user.service";
import {first, Observable, of, throwError} from "rxjs";
import {StorageKeys} from "../keys/storage-keys";
import {AuthData} from "../models/auth-data";
import {LoginData} from "../formModels/login-data";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: StorageService, private userService: UserService) {
  }

  login(username: string, password: string): Observable<boolean> {
    let user: User = null;
    let message: string = null;
    this.userService.getUserByUsername(username).pipe(first()).subscribe(
      data => {
        user = data;
      },
      (error) => {
        message = error.message;
      }
    );
    if (user != null) {
      if (user.password == password) {
        this.authenticate(user)
        return of(true);
      }
      return throwError(() => new Error("Password mismatch"))
    }
    return throwError(() => new Error(message))
  }

  logout() {
    this.storage.saveData(StorageKeys.AUTH_KEY, {username: "", role: "", isAuthenticated: false})
  }

  isAuth(): boolean {
    let authData: AuthData = JSON.parse(this.storage.getData(StorageKeys.AUTH_KEY))
    return authData.isAuthenticated;
  }

  getAuthData(){
    let authData: AuthData = JSON.parse(this.storage.getData(StorageKeys.AUTH_KEY))
    return authData;
  }

  signup(username: string, password: string){
    let user: User = null;
    let message: string = null;

    this.userService.createUser({id: null, role:'user',password: password,favourites: [], username:username}).pipe(first()).subscribe(
      data => {
        user = data;
      },
      (error) => {
        message = error.message;
      }
    );
    if (user != null) {
        this.authenticate(user)
        return of(true);
    }
    return throwError(() => new Error(message))
  }

  getAuthUser(){
    let user: User = null;
    let authData: AuthData = JSON.parse(this.storage.getData(StorageKeys.AUTH_KEY))
    this.userService.getUserByUsername(authData.username).pipe(first()).subscribe(
      next=>{
        user = next
      },
      error => {}
    )
    return user;
  }

  private authenticate(user: User) {
    let authData: AuthData = {username: user.username, role: user.role, isAuthenticated: true}
    this.storage.saveData(StorageKeys.AUTH_KEY, authData)
  }
}
