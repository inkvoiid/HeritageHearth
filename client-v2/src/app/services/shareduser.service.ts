import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SharedUserService {
  private _username: string = '';
  private userURL = '/api/users';

  constructor(private http: HttpClient) {}

  getUser(username: string, minimal: boolean = false) {
    var url = `${this.userURL}/${username}`;

    if (minimal) {
      url += '?minimal=true';
    }

    return this.http.get(url, {
      observe: 'response',
    });
  }

  setUsername(username: string) {
    this._username = username;
  }

  getUsername(): string {
    return this._username;
  }
}
