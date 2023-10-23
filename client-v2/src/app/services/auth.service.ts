import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  Observable,
  BehaviorSubject,
  firstValueFrom,
  lastValueFrom,
} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SharedUserService } from './shareduser.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = '/api/auth';
  private _loggedInStatus$ = new BehaviorSubject<boolean>(false);
  loggedInStatus$ = this._loggedInStatus$.asObservable();

  private _adminStatus$ = new BehaviorSubject<boolean>(false);
  adminStatus$ = this._adminStatus$.asObservable();

  public loginEvent: EventEmitter<void> = new EventEmitter<void>();
  public logoutEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private jwtHelper: JwtHelperService,
    private sharedUserService: SharedUserService
  ) {
    const token = localStorage.getItem('ourkitchen_auth');
    // console.log('Is the JWT expired? ' + this.jwtHelper.isTokenExpired(token));
    this._loggedInStatus$.next(!!token);

    this.updateUsernameFromToken();
  }

  // Updates the current user's username from the JWT token
  updateUsernameFromToken() {
    const token = localStorage.getItem('ourkitchen_auth');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      this.setUsername(decodedToken.UserInfo.username);
    } else {
      this.setUsername(''); // Clear username if there's no token (logged out)
    }
  }

  // Get's the current user's first name
  getFirstName(): Observable<string> {
    const user = this.sharedUserService.getUser(this.getUsername(), true);
    return user.pipe(map((user: any) => user.firstName));
  }

  // Sets the current user's username
  setUsername(username: string) {
    this.sharedUserService.setUsername(username);
  }

  // Returns the current user's username
  getUsername() {
    return this.sharedUserService.getUsername();
  }

  // Logs the user in
  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };

    return this.http.post(this.apiURL, loginData).pipe(
      tap((response: any) => {
        if (response.accessToken != null) {
          this._loggedInStatus$.next(true);
          localStorage.setItem('ourkitchen_auth', response.accessToken);
          this.updateUsernameFromToken();
          this.toastr.success('Login successful');
          this.loginEvent.emit();
          this.router.navigate([`/profile/${username}`]);
        }
      })
    );
  }

  // Returns an error message if the login fails
  loginError(error: any): void {
    const errorMessage = (error as any)?.error?.message || 'An error occurred'; // Use type assertion

    if (errorMessage === 'Unauthorised') {
      this.toastr.error(
        'Please check your username or password and try again',
        'Invalid credentials'
      );
    } else {
      this.toastr.error(errorMessage, 'An error occurred');
    }

    console.error(error);
  }

  // Logs the user out
  logout(): void {
    this.setUsername('');

    // Check if the user has a valid token
    const token = localStorage.getItem('ourkitchen_auth');
    if (!token) {
      // No token found, consider the user already logged out
      this.toastr.warning('You are already logged out');
      this.logoutEvent.emit();
      this.router.navigate(['/']);
      return;
    }

    const logoutpath = `${this.apiURL}/logout`;

    // Send a request to log the user out
    this.http
      .post(logoutpath, null)
      .pipe(
        tap(() => {
          // Successfully logged out on the server
          this._loggedInStatus$.next(false);
          localStorage.removeItem('ourkitchen_auth');
          this.toastr.success('Logout successful');
          this.logoutEvent.emit();
          this.router.navigate(['/']);
        }),
        // Handle errors from the logout request
        catchError((error) => {
          // You can handle errors here, e.g., show an error toast
          this.toastr.error('Logout failed', 'An error occurred');
          console.error(error);
          return throwError(error); // Re-throw the error to propagate it further
        })
      )
      .subscribe();
  }

  // Set the admin status of the user
  setAdminStatus(status: boolean) {
    this._adminStatus$.next(status);
  }

  // Returns the admin status of the user
  getAdminStatus() {
    return this._adminStatus$.value;
  }
}