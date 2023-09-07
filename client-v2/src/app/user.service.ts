import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = 'http://localhost:5000/api/users';

  private _username: string = '';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    const token = localStorage.getItem('ourkitchen_auth');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      this._username = decodedToken.UserInfo.username;
    }
  }

  getUsername(): string {
    return this._username;
  }

  setUsername(username: string) {
    this._username = username;
  }

  getAllUsers() {
    return this.http.get(`${this.baseURL}`);
  }

  getUser(username: string) {
    return this.http.get(`${this.baseURL}/${username}`);
  }

  createNewUser(user: any) {
    return this.http
      .post(`${this.baseURL}`, user, { observe: 'response' })
      .pipe(
        tap((response: any) => {
          if (response.status === 201) {
            this.toastr.success('User account created successfully', 'Success');
            this.router.navigate(['/login']);
          } else {
            this.toastr.error(response.status, 'An error occurred');
          }
        })
      );
  }

  signupError(error: any): void {
    const errorMessage = (error as any)?.error?.message || 'An error occurred'; // Use type assertion

    this.toastr.error(errorMessage, 'An error occurred');

    console.error(error);
  }
}
