import { NavbarService } from './../navbar.service';
import { Component, Renderer2 } from '@angular/core';
import { ThemeService } from '../theme.service';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  username: string = '';
  userFirstName: string = '';
  navbarVisible = false;

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2,
    public auth: AuthService,
    protected userService: UserService,
    private navbarService: NavbarService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get currentTheme(): string {
    return this.themeService.getCurrentTheme();
  }

  logout(): void {
    this.auth.logout();
  }

  ngOnInit(): void {
    this.navbarService.navbarVisible$.subscribe((visible) => {
      this.navbarVisible = visible;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateFirstName();
      }
    });

    const theme = this.themeService.getCurrentTheme();
    this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
    this.username = this.userService.getUsername();

    this.updateFirstName();
  }

  toggleNavbar(): void {
    this.navbarService.toggleNavbarVisibility();
    console.log('navbarVisible: ' + this.navbarVisible);
  }

  updateFirstName() {
    if (this.auth.loggedInStatus$) {
      this.userService
        .getUser(this.userService.getUsername())
        .subscribe((response: any) => {
          this.userFirstName = response.body.firstName;
        });
    } else {
      this.userFirstName = '';
    }
  }
}
