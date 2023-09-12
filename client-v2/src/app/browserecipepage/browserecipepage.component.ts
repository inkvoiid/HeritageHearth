import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-browserecipepage',
  templateUrl: './browserecipepage.component.html',
  styleUrls: ['./browserecipepage.component.css'],
})
export class BrowserecipepageComponent {
  recipes = null;

  constructor(private recipeService: RecipeService) {
    this.recipeService.getAllRecipes().subscribe((response: any) => {
      this.recipes = response;
    });
  }

  // Populate the recipes array with the response from the getAllRecipes() method in the RecipeService
}
