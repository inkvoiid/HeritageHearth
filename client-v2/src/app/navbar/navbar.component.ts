import { Component, Renderer2 } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Router } from '@angular/router';
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

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2,
    public auth: AuthService,
    protected userService: UserService,
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
    const theme = this.themeService.getCurrentTheme();
    this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
    this.username = this.userService.getUsername();
  }
}
