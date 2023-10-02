import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { RecipeService } from '../../../services/recipe.service';
import { UserService } from '../../../services/user.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleterecipemodalComponent } from '../../../partial/deleterecipemodal/deleterecipemodal.component';

@Component({
  selector: 'app-recipeform',
  templateUrl: './recipeform.component.html',
  styleUrls: ['./recipeform.component.css'],
})
export class RecipeformComponent implements OnInit {
  recipeId: string = '';
  editMode: boolean = false;
  editRecipeName: string = '';
  recipeForm: FormGroup;
  username: string = '';
  preserveOriginalImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.username = this.userService.getUsername();
    this.recipeForm = this.formBuilder.group({
      name: '',
      creator: this.username,
      servingSize: '',
      cookingTime: '',
      description: '',
      recipeImage: '',
      ingredients: this.formBuilder.array(['']),
      instructions: this.formBuilder.array(['']),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeId = params['recipeId'];
      this.getRecipeData(this.recipeId);
    });
  }

  getRecipeData(recipeId: string) {
    this.recipeService.getRecipe(recipeId).subscribe(
      (response: any) => {
        this.editMode = true;
        this.editRecipeName =
          response.body.name + ' by ' + response.body.creator;
        this.recipeForm = this.formBuilder.group({
          name: response.body.name,
          creator: response.body.creator,
          servingSize: response.body.servingSize,
          cookingTime: response.body.cookingTime,
          description: response.body.description,
          recipeImage: response.body.recipeImage,
          ingredients: this.formBuilder.array([]),
          instructions: this.formBuilder.array([]),
        });

        if (
          response.body.recipeImage === null ||
          response.body.recipeImage === ''
        ) {
          this.preserveOriginalImage = 'Not Sure';
        } else {
          this.preserveOriginalImage = response.body.recipeImage;
        }

        for (const ingredient of response.body.ingredients) {
          this.ingredients.push(this.formBuilder.control(ingredient));
        }

        for (const instruction of response.body.instructions) {
          this.instructions.push(this.formBuilder.control(instruction));
        }
      },
      (error) => {}
    );
  }

  shouldDisplayIngredientRemoveButton(): boolean {
    return this.ingredients.length > 1;
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.formBuilder.control(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  shouldDisplayinstructionRemoveButton(): boolean {
    return this.instructions.length > 1;
  }

  get instructions() {
    return this.recipeForm.get('instructions') as FormArray;
  }

  addinstruction() {
    this.instructions.push(this.formBuilder.control(''));
  }

  removeinstruction(index: number) {
    this.instructions.removeAt(index);
  }

  deleteRecipe() {
    let dialogRef = this.dialog.open(DeleterecipemodalComponent, {
      data: { recipeIdToDelete: this.recipeId },
    });
  }

  async onSubmit(form: any) {
    if (form.valid) {
      const recipe = form.value;

      // * If in edit mode, update the recipe
      if (this.editMode) {
        try {
          if (recipe.recipeImage === null || recipe.recipeImage === '') {
            recipe.recipeImage = this.preserveOriginalImage;
          }
          const response = await firstValueFrom(
            this.recipeService.updateRecipe(this.recipeId, recipe)
          );
        } catch (error) {
          this.recipeService.showError(error);
        }
      }
      // * If not in edit mode, create a new recipe
      else {
        try {
          const response = await firstValueFrom(
            this.recipeService.createNewRecipe(recipe.creator, recipe)
          );
        } catch (error) {
          this.recipeService.showError(error);
        }
      }
    }
  }
}
