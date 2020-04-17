import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:3450/api/users/';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public getTestUser(): Observable<User> {
    return this.http.get<User>(this.usersUrl + 'test');
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }
}
