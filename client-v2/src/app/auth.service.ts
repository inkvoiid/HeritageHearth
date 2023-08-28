import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = "http://localhost:5000/api/auth";
  private loggedInStatus = false;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = {username, password};
    return this.http.post(this.apiURL, loginData)
    .pipe(
      tap((response: any) => {
        if(response.accessToken != null){
          this.loggedInStatus = true;
          }
          }
          )
    )
  }

  logout(): void {
    if(this.loggedInStatus){
      this.loggedInStatus = false;
    }
  }

  isAuthenticated(): boolean {
    return this.loggedInStatus;
  }
}
