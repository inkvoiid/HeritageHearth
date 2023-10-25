import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipepreview',
  templateUrl: './recipepreview.component.html',
  styleUrls: ['./recipepreview.component.css'],
})
export class RecipepreviewComponent implements OnInit {
  @Input() recipe: any;

  // Optional input for if a recipe is saved by the user
  @Input() saved: boolean = false;

  recipeImageSrc: string =
    '../../assets/media/images/recipeimages/default-recipe-pic.png';

  constructor(
    protected auth: AuthService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    // If the recipe is a string
    if (typeof this.recipe === 'string') {
      // Get the recipe from the database
      this.recipeService.getRecipe(this.recipe).subscribe((response: any) => {
        this.recipe = response.body;
      });
    }

    if (this.recipe != null) {
      this.recipeImageSrc =
        '../../assets/media/images/recipeimages/' + this.recipe.recipeImage;
    }
  }

  loadPlaceholderImage(): void {
    this.recipeImageSrc =
      '../../assets/media/images/recipeimages/default-recipe-pic.png';
  }

  isRecipeSavedByUser(): boolean {
    return this.saved;
  }

  saveRecipe(): void {
    // Save the recipe to the user's saved recipes
    this.auth.saveRecipe(this.recipe.recipeId);
  }

  unsaveRecipe(): void {
    // Unsave the recipe from the user's saved recipes
    this.auth.unsaveRecipe(this.recipe.recipeId);
  }

  showSaveRecipeButton(): boolean {
    if (this.auth.getLoggedInStatus()) {
      if (this.recipe.approved) {
        if (!this.isRecipeSavedByUser()) {
          return true;
        }
      }
    }
    return false;
  }

  showUnsaveRecipeButton(): boolean {
    if (this.auth.getLoggedInStatus()) {
      if (this.recipe.approved) {
        if (this.isRecipeSavedByUser()) {
          return true;
        }
      }
    }
    return false;
  }
}
