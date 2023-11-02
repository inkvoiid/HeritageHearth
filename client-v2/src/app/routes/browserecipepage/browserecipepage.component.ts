import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { itemAnimation } from 'src/app/animations';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-browserecipepage',
  templateUrl: './browserecipepage.component.html',
  styleUrls: ['./browserecipepage.component.css'],
  animations: [itemAnimation],
})
export class BrowserecipepageComponent implements OnInit {
  recipes: any = [];
  loading: boolean = true;
  filteredRecipes: any = [];
  searchTerm: string = '';

  constructor(
    private recipeService: RecipeService,
    protected auth: AuthService
  ) {
    this.recipeService.getAllRecipes().subscribe((response: any) => {
      this.recipes = response;
      this.filteredRecipes = this.recipes;
      this.loading = false;
    });
  }

  ngOnInit() {
    if (this.auth.getLoggedInStatus()) {
      // console.log(this.auth.getLoggedInStatus());
      this.auth.setSavedRecipes();
    }
  }

  search() {
    if (this.searchTerm.trim() === '') {
      // If the search term is empty, show all recipes
      this.filteredRecipes = this.recipes;
    } else {
      // Filter recipes based on the search term
      this.filteredRecipes = this.recipes.filter((recipe: any) =>
        recipe.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  clearSearch() {
    // Clear the search term and show all recipes
    this.searchTerm = '';
    this.filteredRecipes = this.recipes;
  }

  isRecipeSavedByUser(recipeId: string): boolean {
    return (
      this.auth.getLoggedInStatus() && this.auth.isRecipeSavedByUser(recipeId)
    );
  }
}
