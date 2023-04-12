import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime } from 'rxjs';
import { User } from '../interfaces';
import { ROOT_ENDPOINT } from './RootURL';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootQuery = `${ROOT_ENDPOINT}/auth/`

  constructor(private http: HttpClient) {
    console.log(UserService.name, "Initialized");
  }

  getUsersByMail(query: string) {
    return this.http.post<{ email?: boolean, handle?: boolean }>(this.rootQuery + "exists", {
      email: query
    }).pipe(debounceTime(500));
  }
}
