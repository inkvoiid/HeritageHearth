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

  saved: boolean = false;

  private currentUtterance: SpeechSynthesisUtterance;
  speechIngredientsParagraph: string = '';
  speechInstructionsParagraph: string = '';
  speakingIngredients: boolean = false;
  speakingInstructions: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,
    protected auth: AuthService,
    private recipeService: RecipeService,
    private dialog: MatDialog
  ) {
    this.currentUtterance = new SpeechSynthesisUtterance();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeId = params['recipeId'];
      this.getRecipeData(this.recipeId);
    });
    // Check if recipe is saved by user
    if (this.auth.getLoggedInStatus()) {
      this.auth.getSavedRecipes().subscribe((savedRecipes: any) => {
        if (savedRecipes.includes(this.recipeId)) {
          this.saved = true;
        } else {
          this.saved = false;
        }
      });
    }
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

        for (let i = 0; i < this.recipe.instructions.length; i++) {
          this.speechInstructionsParagraph +=
            'Step ' +
            (i + 1) +
            ': ' +
            this.checkForCommaOrPeriod(this.recipe.instructions[i]) +
            ' ';
        }

        for (let i = 0; i < this.recipe.ingredients.length; i++) {
          this.speechIngredientsParagraph +=
            this.checkForCommaOrPeriod(this.recipe.ingredients[i]) + ' ';
        }
      },
      (error) => {
        this.recipe = null;
        this.loading = false;
      }
    );
  }

  // Method that checks to see if a string ends with comma or period, if it's a comma, swap it with a period and if it has neither, add a period
  // This is to make the speech synthesis sound more natural
  // Written by: GitHub Copilot
  checkForCommaOrPeriod(sentence: string) {
    if (sentence.endsWith(',')) {
      sentence = sentence.replace(/.$/, '.');
    } else if (!sentence.endsWith('.')) {
      sentence += '.';
    }
    return sentence;
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
      this.recipe.approved = true;
    }
  }

  rejectRecipe() {
    let dialogRef = this.dialog.open(RejectrecipemodalComponent, {
      data: { recipeIdToDelete: this.recipe.recipeId, redirect: true },
    });
  }

  // Save recipe methods

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

  // Speech synthesis methods

  speakIngredients() {
    this.stopSpeaking();
    this.speakingIngredients = true;
    const utterance = new SpeechSynthesisUtterance(
      this.speechIngredientsParagraph
    );
    utterance.lang = 'en-US';

    this.currentUtterance = utterance;

    const endListener = (event: Event) => {
      this.speakingIngredients = false;
      this.currentUtterance.removeEventListener('end', endListener);
    };

    this.currentUtterance.addEventListener('end', endListener);
    speechSynthesis.speak(utterance);
  }

  speakInstructions() {
    this.stopSpeaking();
    this.speakingInstructions = true;
    const utterance = new SpeechSynthesisUtterance(
      this.speechInstructionsParagraph
    );
    utterance.lang = 'en-US';

    this.currentUtterance = utterance;

    const endListener = (event: Event) => {
      this.speakingInstructions = false;
      this.currentUtterance.removeEventListener('end', endListener);
    };

    this.currentUtterance.addEventListener('end', endListener);
    speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    speechSynthesis.cancel();
    this.speakingIngredients = false;
    this.speakingInstructions = false;

    this.currentUtterance.removeEventListener('end', () => {});
  }
}
