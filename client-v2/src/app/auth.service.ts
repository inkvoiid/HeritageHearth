import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  Observable,
  BehaviorSubject,
  firstValueFrom,
  lastValueFrom,
} from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:5000/api/auth';
  private _loggedInStatus$ = new BehaviorSubject<boolean>(false);
  loggedInStatus$ = this._loggedInStatus$.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private jwtHelper: JwtHelperService,
    private userService: UserService
  ) {
    const token = localStorage.getItem('ourkitchen_auth');
    console.log('Is the JWT expired? ' + this.jwtHelper.isTokenExpired(token));
    this._loggedInStatus$.next(!!token);
  }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };

    return this.http.post(this.apiURL, loginData).pipe(
      tap((response: any) => {
        if (response.accessToken != null) {
          this._loggedInStatus$.next(true);
          localStorage.setItem('ourkitchen_auth', response.accessToken);
          this.userService.setUsername(username);
          this.toastr.success('Login successful');
          this.router.navigate([`/profile/${username}`]);
        }
      })
    );
  }

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

  logout(): void {
    // Check if the user has a valid token
    const token = localStorage.getItem('ourkitchen_auth');
    if (!token) {
      // No token found, consider the user already logged out
      this.toastr.warning('You are already logged out');
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
}
