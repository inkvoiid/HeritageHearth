import { NavbarService } from '../../services/navbar.service';
import { Component, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  username: string = '';
  userFirstName: string = '';
  userImage: string = 'default-profile-pic.jpg';
  isAdmin: boolean = false;
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

    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.updateDisplayedUser();
    //   }
    // });

    this.auth.loginEvent.subscribe(() => {
      this.updateDisplayedUser();
    });

    this.auth.logoutEvent.subscribe(() => {
      this.userFirstName = '';
      this.userImage = 'default-profile-pic.jpg';
      this.isAdmin = false;
      this.auth.setAdminStatus(false);
    });

    const theme = this.themeService.getCurrentTheme();
    this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
    this.username = this.auth.getUsername();

    this.updateDisplayedUser();
  }

  toggleNavbar(): void {
    this.navbarService.toggleNavbarVisibility();
  }

  updateDisplayedUser() {
    if (this.auth.loggedInStatus$) {
      this.userService
        .getUser(this.auth.getUsername(), true)
        .subscribe((response: any) => {
          this.userFirstName = response.body.firstName;
          this.userImage = response.body.profilePic;
          if (response.body.roles !== undefined) {
            if (response.body.roles.includes('admin')) {
              console.log(1);
              this.auth.setAdminStatus(true);
              this.isAdmin = true;
            } else {
              console.log(2);
              this.auth.setAdminStatus(false);
              this.isAdmin = false;
            }
          } else {
            console.log(3);
            this.auth.setAdminStatus(false);
            this.isAdmin = false;
          }
        });
    } else {
      this.userFirstName = '';
    }
  }
}
