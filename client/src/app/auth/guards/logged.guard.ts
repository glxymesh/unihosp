import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import UniCookieService from 'src/app/services/unicookie.service';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private user: UserService,
    private cookie: UniCookieService,
    private authService: AuthService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.cookie.getAccessToken() && this.cookie.getRefreshToken())
      this.authService.requestAccessToken().then((v) => {
        location.reload();
      });

    return this.user.currentUser.pipe(
      map((user) => {
        console.log('From LoggedInGuard', user);
        if (user && user.patient) {
          this.router.navigate(['/dashboard']);
        } else if (user) {
          this.router.navigate(['/createprofile']);
        }
        return user ? false : true;
      })
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
