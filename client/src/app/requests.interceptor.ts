import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import UniCookieService from './services/unicookie.service';


@Injectable()
export class RequestsInterceptor implements HttpInterceptor {

  private readonly rootEndPoint = `https://unihosp.live/api/v1`;

  constructor(private unicookieService: UniCookieService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let accessToken = this.unicookieService.getAccessToken();
    // if (!accessToken) { this.router.navigate(['/auth/login']); }
    const newRequest = request.clone({
      url: `${this.rootEndPoint}${request.url}`,
      headers: accessToken ? new HttpHeaders({ 'authorization': `UNIHOSP ${accessToken}` }) : undefined
    })
    return next.handle(newRequest);
  }
}
