import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, ReplaySubject} from 'rxjs';
import {AccountPasswordUpdate, AccountUpdate, Role, User} from '../models';
import {distinctUntilChanged, flatMap, map, tap} from 'rxjs/operators';
import {ApiService} from './api.service';
import {JwtService} from './jwt.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSubject = new BehaviorSubject<User>(undefined);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private endpoint = '/users';

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router
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
    return this.apiService.post(`/auth/`, credentials)
      .pipe(flatMap(
        data => {
          this.setAuth(data.token, null);
          return this.apiService.get('/account/').pipe(
            map(user => {
              if (user.blocked) {
                this.purgeAuth();
                throw new Error('You are blocked');
              } else {
                this.setAuth(data.token, user);
              }

              return user;
            })
          );
        }
      ));
  }

  /**
   * Logout from system.
   */
  logOut() {
    this.purgeAuth();
    this.router.navigateByUrl('/content/login');
  }

  public updateAccountInfo(updateInfo: AccountUpdate): Observable<User> {
    return this.apiService.put('/account/', updateInfo).pipe(
      tap(user => this.setUser(user))
    );
  }

  public updatePassword(updatePasswordInfo: AccountPasswordUpdate): Observable<void> {
    return this.apiService.put('/account/password/', updatePasswordInfo).pipe(
      tap(() => {
        this.logOut();
      })
    );
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {

      this.apiService.get('/account/')
        .subscribe(
          user => {
            if (!user.blocked) {
              this.setAuth(this.jwtService.getToken(), user);
            }
          },
          err => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  // Sett current user and isAuth flag.
  private setAuth(token: string, user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(token);
    this.setUser(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
    console.log('User login');
  }

  private setUser(user: User) {
    // Set current user data into observable
    this.currentUserSubject.next(user);
  }

  // Purge current user and drop isAuth flag.
  private purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(undefined);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    console.log('User logon');
  }
}
