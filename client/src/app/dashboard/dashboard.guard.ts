import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  CanMatch,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, catchError, filter, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import UniCookieService from '../services/unicookie.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private user: UserService,
    private cookie: UniCookieService,
    private authService: AuthService
  ) {
    // this.navigate = this.navigate.bind(this);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.user.currentUser.pipe(
      filter((user) => user !== undefined),
      map((user) => {
        if (!user) {
          this.router.navigate(['/auth/login'])
          return false;
        } else {
          return true
        }
      })
    );
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.user.currentUser.pipe(
      filter((user) => user != undefined),
      map((user) => {
        return user ? true : false;
      })
    );

    return true;
  }
}
