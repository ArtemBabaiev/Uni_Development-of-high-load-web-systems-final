import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkLogin(route, url);
  }

  checkLogin(route: ActivatedRouteSnapshot, url: string): true | UrlTree {
    let isAuth: boolean = this.authService.isAuth()
    if (isAuth) {
      if (url == "/login") {
        return this.router.parseUrl('/profile');
      } else {
        return true;
      }
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
