import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  templateUrl: './recipepage.component.html',
  styleUrls: ['./recipepage.component.css'],
})
export class RecipepageComponent implements OnInit {
  recipeId: string = '';
  recipe: any;
  loading: boolean = true;
  recipeCreatorName: string = 'Retrieving recipe creator name...';

  ingredientsLeft: string[] = [];
  ingredientsRight: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.recipeId = params['recipeId'];
        this.getRecipeData(this.recipeId);
      }
      // this.recipeService.getUserRecipes(userId).subscribe((recipes) => {
      // this.recipes = recipes;
    );
  }

  doesUserOwnRecipe(): boolean {
    if (this.recipe) {
      return this.userService.getUsername() === this.recipe.creator;
    }
    return false;
  }

  getRecipeData(recipeId: string) {
    this.recipeService.getRecipe(recipeId).subscribe(
      (response: any) => {
        this.recipe = response.body;
        this.loading = false;
        this.userService
          .getUser(response.body.creator)
          .subscribe((userResponse: any) => {
            this.recipeCreatorName =
              userResponse.body.firstName + ' ' + userResponse.body.lastName;
          });
        const ingredientsLength = this.recipe.ingredients.length;
        const halfIngredientsLength = Math.ceil(ingredientsLength / 2);
        this.ingredientsLeft = this.recipe.ingredients.slice(
          0,
          halfIngredientsLength
        );
        this.ingredientsRight = this.recipe.ingredients.slice(
          halfIngredientsLength
        );
      },
      (error) => {
        this.recipe = null;
        this.loading = false;
      }
    );
  }
}
