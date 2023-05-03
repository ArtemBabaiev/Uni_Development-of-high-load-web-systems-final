import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(route);
  }

  checkLogin(route: ActivatedRouteSnapshot): true | UrlTree {
    let authData = this.authService.getAuthData();
    console.log(route.data['role'])
    if (authData.isAuthenticated && route.data['role'].includes(authData.role)) {
      return true
    } else {
      return this.router.parseUrl('/403');
    }
  }
}
