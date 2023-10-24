import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-browserecipepage',
  templateUrl: './browserecipepage.component.html',
  styleUrls: ['./browserecipepage.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger('60ms', animate('600ms ease-out', style({ opacity: 1 }))),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class BrowserecipepageComponent implements OnInit {
  recipes: any = [];
  loading: boolean = true;
  filteredRecipes: any = [];
  searchTerm: string = '';

  constructor(private recipeService: RecipeService) {
    this.recipeService.getAllRecipes().subscribe((response: any) => {
      this.recipes = response;
      this.filteredRecipes = this.recipes;
      this.loading = false;
    });
  }

  ngOnInit() {
    // Initialize filteredRecipes with all recipes
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

  // Populate the recipes array with the response from the getAllRecipes() method in the RecipeService
}
