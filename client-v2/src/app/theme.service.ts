import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme: string = "light";

  constructor() {
    const theme = localStorage.getItem("theme");
    if (theme) {
      this.theme = theme;
    }
   }

  toggleTheme(): void {
    if (this.theme == "light") {
      this.theme = "dark";
    } else {
      this.theme = "light";
    }

    document.documentElement.setAttribute("data-theme", this.theme);
    localStorage.setItem("theme", this.theme);
  }

  getCurrentTheme(): string {
    return this.theme;
  }
}
