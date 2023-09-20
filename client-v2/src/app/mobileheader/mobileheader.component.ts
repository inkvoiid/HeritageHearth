import { Component } from '@angular/core';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-mobileheader',
  templateUrl: './mobileheader.component.html',
  styleUrls: ['./mobileheader.component.css'],
})
export class MobileheaderComponent {
  constructor(private navbarService: NavbarService) {}

  toggleNavbar(): void {
    this.navbarService.toggleNavbarVisibility();
  }
}
