import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {StorageService} from "./services/storage.service";
import {StorageKeys} from "./keys/storage-keys";
import UsersData from "./data/usersData.json";
import MoviesData from "./data/moviesData.json";
import {DOCUMENT} from "@angular/common";
import {ThemeKeys} from "./keys/theme-keys";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AngularFinalLab';
  constructor(private storage: StorageService,
              @Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2) {}
  ngOnInit(){
    this.populateStorage()
    let savedMode: string= JSON.parse(this.storage.getData(StorageKeys.MODE_KEY))
    this.renderer.setAttribute(this.document.body, 'class', savedMode)
  }

  switchMode(isDarkMode: boolean) {
    const hostClass = isDarkMode ? ThemeKeys.DARK: ThemeKeys.LIGHT;
    this.storage.saveData(StorageKeys.MODE_KEY, hostClass)
    this.renderer.setAttribute(this.document.body, 'class', hostClass)
  }

  populateStorage(){
    let json = this.storage.getData(StorageKeys.USER_KEY)
    if (json == null) {
      this.storage.saveData(StorageKeys.USER_KEY, UsersData)
    }

    json = this.storage.getData(StorageKeys.MOVIE_KEY)
    if (json == null) {
      this.storage.saveData(StorageKeys.MOVIE_KEY, MoviesData)
    }

    json = this.storage.getData(StorageKeys.AUTH_KEY);
    if (json == null){
      this.storage.saveData(StorageKeys.AUTH_KEY, {username : "", role: "", isAuthenticated: false})
    }

    json = this.storage.getData(StorageKeys.MODE_KEY)
    if (json == null || json == ""){
      this.storage.saveData(StorageKeys.MODE_KEY, ThemeKeys.LIGHT)
    }
  }
}
