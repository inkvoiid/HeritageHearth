import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-addrecipebutton',
  templateUrl: './addrecipebutton.component.html',
  styleUrls: ['./addrecipebutton.component.css'],
})
export class AddrecipebuttonComponent {
  constructor(public auth: AuthService) {}
}
