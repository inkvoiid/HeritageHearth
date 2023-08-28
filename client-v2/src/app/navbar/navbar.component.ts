import { Component, Renderer2 } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
    ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get currentTheme(): string {
    return this.themeService.getCurrentTheme();
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  logout(): void {
    this.auth.logout();
    this.toastr.success("Logged Out");
    this.router.navigate(["/"]);
  }

  ngOnInit(): void {
    const theme = this.themeService.getCurrentTheme();
    this.renderer.setAttribute(document.documentElement, "data-theme", theme);
  }
}
