import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces';
import { UserService } from 'src/app/services/user.service';
import { AccessTokenResponse, LoginResponse, LogoutResponse } from '../auth/interfaces';
import UniCookieService from './unicookie.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient, private cookie: UniCookieService) { }


  signup(email: string, password: string, contact: string, role?: string) {
    return this.http.post<User>(`/auth/signup`, {
      email,
      password,
      contact,
      role
    });
  }


  async requestAccessToken() {
    const refreshToken = this.cookie.getRefreshToken();
    if (!refreshToken) return;
    const response = await fetch("https://unihosp.live/auth/accesstoken", {
      method: 'POST',
      headers: {
        refreshToken: `UNIHOSP ${refreshToken}`
      }
    });
    const data: AccessTokenResponse = await response.json();
    // console.log(data);
    this.cookie.storeAccessToken(data.accessToken, { expire: 2592000, path: "/" });
  }

  login(email: string, password: string) {
    const response = this.http.post<LoginResponse>(`/auth/login`, {
      email, password
    })

    response.subscribe((response) => {
      // console.log(response);
      this.cookie.storeAccessToken(response.accessToken, { expire: 2592000, path: '/' });
      this.cookie.storeRefreshToken(response.refreshToken, { path: '/' });
      this.cookie.store("uid", response.user.id, { path: "/" });
      this.cookie.store("rid", response.refreshTokenId, { path: "/" });
      this.userService.setCurrentUser(response.user);
      if (!response.user.patient) this.router.navigate(['/dashboard'])
      // console.log("Logged In redirecting")
      this.router.navigate(['/createprofile'])
    })

    return response;
  }

  get isLoggedIn(): boolean {
    return !!this.cookie.retrieve('uid');
  }

  logout() {
    const reponse = this.http.delete<LogoutResponse>(`/auth/logout`, {
      body: {
        refreshTokenId: this.cookie.retrieve('rid')
      }
    })

    return reponse.pipe(map((value) => {
      // console.log(value);
      this.cookie.deleteAllCookie();
    }));
  }
}
