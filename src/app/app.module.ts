import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MovieAllComponent} from './components/catalog-components/movie-all/movie-all.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {HomeComponent} from './components/static-components/home/home.component';
import {Page404Component} from './components/static-components/page404/page404.component';
import {MatLineModule, MatRippleModule} from "@angular/material/core";
import {MovieInfoComponent} from './components/catalog-components/movie-info/movie-info.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/auth-components/login/login.component';
import {CustomSnackbarComponent} from './components/static-components/custom-snackbar/custom-snackbar.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {UserService} from "./services/user.service";
import {MovieService} from "./services/movie.service";
import {NavigationComponent} from './components/static-components/navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {LogoutComponent} from './components/auth-components/logout/logout.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatInputModule} from "@angular/material/input";
import {MovieSearchPipe} from './pipes/movie-search.pipe';
import {SortPipe} from './pipes/sort.pipe';
import {
  ProfileFavouritesComponent
} from './components/profile-components/profile-favourites/profile-favourites.component';
import {ProfileInfoComponent} from './components/profile-components/profile-info/profile-info.component';
import {MatTabsModule} from "@angular/material/tabs";
import { MovieCreateComponent } from './components/mod-components/movie-create/movie-create.component';
import { MovieControlComponent } from './components/mod-components/movie-control/movie-control.component';
import { UserControlComponent } from './components/admin-components/user-control/user-control.component';
import { MovieEditComponent } from './components/mod-components/movie-edit/movie-edit.component';
import { Page403Component } from './components/static-components/page403/page403.component';
import { RoundPipe } from './pipes/round.pipe';
import {MatTableModule} from "@angular/material/table";
import { CdkColumnDef } from '@angular/cdk/table';
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    MovieAllComponent,
    HomeComponent,
    Page404Component,
    MovieInfoComponent,
    LoginComponent,
    CustomSnackbarComponent,
    NavigationComponent,
    LogoutComponent,
    MovieSearchPipe,
    SortPipe,
    ProfileFavouritesComponent,
    ProfileInfoComponent,
    MovieCreateComponent,
    MovieControlComponent,
    UserControlComponent,
    MovieEditComponent,
    Page403Component,
    RoundPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatRippleModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatInputModule,
    MatTabsModule,
    MatLineModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [
    UserService,
    MovieService,
    CdkColumnDef
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
