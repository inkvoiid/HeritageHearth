import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
  username: string = "";
  user: any;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.getUserData(this.username);
    });
  }

  getUserData(username: string) {
    this.http.get(`/api/users/${username}`).subscribe(
      (response: any) => {
      if(response === `Error 404: User ${username} not found`)
      {
        this.user = null;
        this.loading = false;
      }
      else
      {
        this.user = response;
        this.loading = false;
      }
    });
  }
}
