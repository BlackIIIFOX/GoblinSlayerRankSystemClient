import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, ReplaySubject} from 'rxjs';
import {Role, User} from '../models';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {ApiService} from './api.service';
import {JwtService} from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSubject = new BehaviorSubject<User>(undefined);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private endpoint = '/users';

  // TODO: потом убрать
  private newUser: User = {
    user_address: 'Центральный город',
    user_is_blocked: false,
    user_name: 'BlackIIIFOX',
    user_id: 2,
    user_login: 'admin@gmail.com',
    user_role: Role.Admin,
    image: 'https://funpay.ru/img/layout/avatar.png'
  };

  // image: 'https://funpay.ru/img/layout/avatar.png'

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

      this.apiService.get('/account')
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
    this.jwtService.saveToken('any token');
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
