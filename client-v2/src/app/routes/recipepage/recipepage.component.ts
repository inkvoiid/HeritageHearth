import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { formatTimeAgo } from '../../utils';
import { RejectrecipemodalComponent } from 'src/app/partial/modals/rejectrecipemodal/rejectrecipemodal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './recipepage.component.html',
  styleUrls: ['./recipepage.component.css'],
})
export class RecipepageComponent implements OnInit {
  recipeId: string = '';
  recipe: any;
  loading: boolean = true;
  recipeCreatorName: string = 'Retrieving recipe creator name...';
  recipeImageSrc: string =
    '../../assets/media/images/recipeimages/default-recipe-pic.png';
  timeSinceLastUpdated: string = '';
  timeSinceCreated: string = '';

  ingredientsLeft: string[] = [];
  ingredientsRight: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,
    protected auth: AuthService,
    private recipeService: RecipeService,
    private dialog: MatDialog
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
      return this.auth.getUsername() === this.recipe.creator;
    }
    return false;
  }

  getRecipeData(recipeId: string) {
    this.recipeService.getRecipe(recipeId).subscribe(
      (response: any) => {
        this.recipe = response.body;
        this.loading = false;
        this.userService.getUser(response.body.creator).subscribe(
          (userResponse: any) => {
            if (userResponse.status === 200) {
              this.recipeCreatorName =
                userResponse.body.firstName + ' ' + userResponse.body.lastName;
            } else {
              this.setUserNotFound();
            }
          },
          (error) => {
            this.setUserNotFound();
          }
        );
        if (this.recipe.recipeImage) {
          this.recipeImageSrc = this.recipe.recipeImage;
        }
        this.timeSinceLastUpdated = formatTimeAgo(this.recipe.updatedAt);
        this.timeSinceCreated = formatTimeAgo(this.recipe.createdAt);
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

  loadPlaceholderImage() {
    this.recipeImageSrc =
      '../../assets/media/images/recipeimages/default-recipe-pic.png';
  }

  setUserNotFound() {
    this.recipeCreatorName = 'Unknown User';
  }

  printPage(): void {
    window.print();
  }

  approveRecipe() {
    if (this.recipeService.approveRecipe(this.recipe.recipeId)) {
    }
  }

  rejectRecipe() {
    let dialogRef = this.dialog.open(RejectrecipemodalComponent, {
      data: { recipeIdToDelete: this.recipe.recipeId, redirect: true },
    });
  }
}
