import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, map, of } from 'rxjs';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new Subject<User | null>();

  get currentUser() {
    return this.user;
  }

  setCurrentUser(user: User) {
    this.user.next(user);
  }

  constructor(private http: HttpClient) {
    this.http.get<User>('/auth/user').subscribe({
      next: (user) => {
        this.user.next(user);
      },
      error: (err) => {
        console.error(err.message);
        this.user.next(null)
        of(null);
      }
    });
  }

  getUsersByMail(query: string) {
    return this.http.post<{ email?: boolean, handle?: boolean }>("/auth/exists", {
      email: query
    });
  }
}
