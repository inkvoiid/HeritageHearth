import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/styles/profilethemes.css'],
})
export class AppComponent {
  title = 'client-v2';

  constructor(public authService: AuthService) {}
}
