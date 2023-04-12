import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from 'src/app/config/app.config';
import { AppConfig } from 'src/app/interfaces';
import { UserService } from 'src/app/services/user.service';
import { LoginResponse, LogoutResponse } from '../interfaces';
import { User } from '../interfaces/User';
import UniCookieService from './unicookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private userService: UserService,
    private http: HttpClient, private cookie: UniCookieService) { }



  readonly startUrl = "http://localhost:3000/auth/";


  signup(email: string, password: string, contact: string, role?: string) {
    return this.http.post<User>(`${this.startUrl}signup`, {
      email,
      password,
      contact,
      role
    });
  }

  login(email: string, password: string) {
    const response = this.http.post<LoginResponse>(`${this.startUrl}signin`, {
      email, password
    })

    response.subscribe((response) => {
      this.cookie.storeAccessToken(response.accessToken);
      this.cookie.storeRefreshToken(response.refreshToken);
      this.cookie.store("uid", response.user.id);
      this.cookie.store("rid", response.refreshTokenId);
    })

    return response;
  }

  get isLoggedIn(): boolean {
    return !!this.cookie.retrieve('uid');
  }

  logout() {
    const reponse = this.http.delete<LogoutResponse>(`${this.startUrl}signout`, {
      body: {
        refreshTokenId: this.cookie.retrieve('rid')
      }
    })
    this.cookie.deleteAllCookie();
    return reponse;
  }
}
