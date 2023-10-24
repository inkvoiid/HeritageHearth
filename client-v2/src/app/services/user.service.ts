import { SharedUserService } from './shareduser.service';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, lastValueFrom, of } from 'rxjs';
import { last, map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = '/api/users';
  public updateUserEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private sharedUserService: SharedUserService
  ) {}

  getAllUsers(minimal: boolean = false) {
    var url = this.baseURL;

    if (minimal) {
      url += '?minimal=true';
    }

    return this.http.get(url, {
      observe: 'response',
    });
  }

  getUser(username: string, minimal: boolean = false) {
    return this.sharedUserService.getUser(username, minimal);
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

  updateUser(username: string, user: any) {
    return this.http
      .put(`${this.baseURL}/${username}`, user, { observe: 'response' })
      .pipe(
        tap((response: any) => {
          if (response.status === 200) {
            this.sharedUserService.setUsername(user.username);
            this.toastr.success('User account updated successfully', 'Success');
            this.router.navigate(['/profile/' + user.username]);
          } else {
            this.toastr.error(response.status, 'Error');
          }
        })
      );
  }

  deleteUserAsAdmin(username: string) {
    return this.http
      .delete(`${this.baseURL}/${username}`, {
        observe: 'response',
      })
      .pipe(
        tap((response: any) => {
          if (response.status === 200) {
            this.toastr.success('User account deleted successfully', 'Success');
            this.router.navigate(['/recipes']);
          } else {
            this.toastr.error(response.status, 'Error');
          }
        })
      );
  }

  deleteUser(username: string, password: string) {
    const deleteData = { username: username, password: password };
    return this.http
      .delete(`${this.baseURL}/${username}`, {
        body: deleteData,
        observe: 'response',
      })
      .pipe(
        tap((response: any) => {
          if (response.status === 200) {
            this.toastr.success('User account deleted successfully', 'Success');
            this.router.navigate(['/recipes']);
          } else {
            this.toastr.error(response.status, 'Error');
          }
        })
      );
  }

  isUserAdmin(username: string): Observable<boolean> {
    const response = this.getUser(username, true).subscribe((response: any) => {
      const user = response.body;
      console.log(user);
      if (user && user.roles) {
        console.log(user.roles);
        return user.roles.includes('admin');
      }
      console.log('No roles found');
      return false;
    });

    return of(false);
  }

  showError(error: any): void {
    const errorMessage = (error as any)?.error?.message || 'An error occurred'; // Use type assertion

    this.toastr.error(errorMessage, 'An error occurred');

    console.error(error);
  }
}
