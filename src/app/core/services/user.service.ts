import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject, ReplaySubject, of} from 'rxjs';
import {User} from '../models';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {ApiService} from './api.service';
import {JwtService} from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(undefined);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private endpoint = '/users';

  // TODO: потом убрать
  private newUser: User = {
    id: 2,
    email: 'admin@gmail.com',
    token: 'token213213',
    bio: 'bio admin',
    name: 'Admin',
    image: 'data:image/jpeg;base64,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'
  };

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private jwtService: JwtService
  ) {
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Authentication user.
   * @param credentials login and password.
   * @return user data.
   */
  logIn(credentials): Observable<User> {
    // TODO: убрать когда будет сервер.
    this.setAuth(this.newUser);
    return of(this.newUser);

    return this.apiService.post(`${this.endpoint}/login`, credentials)
      .pipe(map(
        data => {
          this.setAuth(data.user);
          return data;
        }
      ));
  }

  /**
   * Logout from system.
   */
  logOut() {
    this.purgeAuth();
  }

  /**
   * Create new user.
   * @param credentials login and password for registration.
   * @return new user data.
   */
  create(credentials): Observable<User> {
    // TODO: убрать когда будет сервер.
    this.setAuth(this.newUser);
    return of(this.newUser);

    return this.apiService.post(`${this.endpoint}`, credentials)
      .pipe(map(
        data => {
          this.setAuth(data.user);
          return data;
        }
      ));
  }


  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
      .put(this.endpoint, {user})
      .pipe(map(data => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      }));
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      // TODO: потом убрать
      this.setAuth(this.newUser);
      return;

      this.apiService.get('/user')
        .subscribe(
          data => this.setAuth(data.user),
          err => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  // Sett current user and isAuth flag.
  private setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  // Purge current user and drop isAuth flag.
  private purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(undefined);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  // TODO: перенести в UsersService.
  /*
  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }*/
}
