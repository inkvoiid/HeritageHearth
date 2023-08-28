import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "/api/users";
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(`${this.baseURL}`);
  }

  getUser(username: string) {
    return this.http.get(`${this.baseURL}/${username}`);
  }
}
