import {Injectable, NgModule} from '@angular/core';
import {RouterModule, RouterStateSnapshot, Routes, TitleStrategy} from '@angular/router';
import {HomeComponent} from "./components/static-components/home/home.component";
import {Title} from "@angular/platform-browser";
import {MovieAllComponent} from "./components/catalog-components/movie-all/movie-all.component";
import {Page404Component} from "./components/static-components/page404/page404.component";
import {LoginComponent} from "./components/auth-components/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {LogoutComponent} from "./components/auth-components/logout/logout.component";
import {ProfileInfoComponent} from "./components/profile-components/profile-info/profile-info.component";
import {
  ProfileFavouritesComponent
} from "./components/profile-components/profile-favourites/profile-favourites.component";
import {UserControlComponent} from "./components/admin-components/user-control/user-control.component";
import {MovieCreateComponent} from "./components/mod-components/movie-create/movie-create.component";
import {MovieEditComponent} from "./components/mod-components/movie-edit/movie-edit.component";
import {MovieControlComponent} from "./components/mod-components/movie-control/movie-control.component";
import {RoleGuard} from "./guards/role.guard";
import {Page403Component} from "./components/static-components/page403/page403.component";
import {MovieInfoComponent} from "./components/catalog-components/movie-info/movie-info.component";

const routes: Routes = [
  {path: "home", component: HomeComponent, title: "Home Page"},
  {path: "movies", component: MovieAllComponent, title: "Movies"},
  {path: "movie/:id", component: MovieInfoComponent, title: "Movie"},
  {path: "login", component: LoginComponent, title: "Login"},
  {path: "logout", component: LogoutComponent, title: "Logout"},
  {path: "profile/info", component: ProfileInfoComponent, title: "Personal profile", canActivate: [AuthGuard]},
  {path: "profile/favourites", component: ProfileFavouritesComponent, title: "Personal profile", canActivate: [AuthGuard]},
  {path: "user-control", component: UserControlComponent, title: "User Control", canActivate: [AuthGuard, RoleGuard], data: {role: ["admin"]}},
  {path: "movie-control", component: MovieControlComponent, title: "Movie Control", canActivate: [AuthGuard, RoleGuard], data: {role: ["admin", "moderator"]}},
  {path: "movie-edit/:id", component: MovieEditComponent, title: "Movie Edit", canActivate: [AuthGuard, RoleGuard], data: {role: ["admin", "moderator"]}},
  {path: "movie-create", component: MovieCreateComponent, title: "Movie Create", canActivate: [AuthGuard, RoleGuard], data: {role: ["admin", "moderator"]}},
  {path: "403", component: Page403Component, title: "403 Page"},
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "**", component: Page404Component, title: "404 Page"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

@Injectable({providedIn: 'root'})
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`My Application | ${title}`);
    }
  }
}
