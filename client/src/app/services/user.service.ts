import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    console.log(UserService.name, "Initialized");
  }

  getUsersByMail(query: string) {
    return this.http.post<User[]>("http://localhost:3000/auth/exists", {
      body: {
        email: query
      }
    });
  }
}
