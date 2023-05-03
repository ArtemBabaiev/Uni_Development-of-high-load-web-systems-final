import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {BehaviorSubject, find, Observable, of, throwError} from "rxjs";
import {StorageService} from "./storage.service";
import {StorageKeys} from "../keys/storage-keys";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];
  private subjects = new BehaviorSubject<User[]>([])

  constructor(private storage: StorageService) {
    this.users = JSON.parse(this.storage.getData(StorageKeys.USER_KEY));
  }

  saveAndSubmitChanges() {
    this.storage.saveData(StorageKeys.USER_KEY, this.users)
    this.users = JSON.parse(this.storage.getData(StorageKeys.USER_KEY));
    this.subjects.next(this.users);
  }

  getAllUsers(): Observable<User[]> {
    let json = this.storage.getData(StorageKeys.USER_KEY)
    this.users = JSON.parse(json);
    this.subjects.next(this.users)
    console.log(this.users)
    return this.subjects.asObservable();
  }

  getUserById(id: number) {
    let user = this.users.find(user => user.id == id);
    if(user == undefined){
      throw throwError(() => new Error(`User with id=${id} not found`))
    }
    return of(user);
  }

  getUserByUsername(username: string): Observable<User> {
    let user = this.users.find(user => user.username == username);
    if(user == undefined){
      return  throwError(() => new Error(`User with username=${username} not found`))
    }
    return of(user);
  }

  createUser(newUser: User): Observable<any> {
    if (this.users.find(user => user.username == newUser.username) != undefined) {
      return throwError(() => new Error('User with such username already exists'))
    }
    newUser.id = Date.now();
    newUser.favourites = [];
    this.users.push(newUser)
    this.saveAndSubmitChanges();
    return of(newUser);
  }

  updateUser(updatedUser: User): Observable<any> {
    if (this.users.find(user => user.id == updatedUser.id) == undefined) {
      throw throwError(() => new Error('User with such id doesnt exist'))
    }
    if (this.users.find(user => user.username == updatedUser.username && user.id != updatedUser.id) != undefined) {
      throw throwError(() => new Error('User with such username already exists'))
    }
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == updatedUser.id) {
        this.users[i] = updatedUser
      }
    }
    this.saveAndSubmitChanges();
    return of(updatedUser)
  }

  deleteUser(id: number): Observable<any> {
    if (this.users.find(user => user.id == id) == undefined) {
      throw throwError(() => new Error(`No user with id=${id} exists`))
    }
    this.users = this.users.filter(user => user.id == id)
    return of(true)
  }

}
