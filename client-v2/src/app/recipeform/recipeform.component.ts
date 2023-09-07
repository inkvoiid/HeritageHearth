import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { UserService } from '../user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-recipeform',
  templateUrl: './recipeform.component.html',
  styleUrls: ['./recipeform.component.css'],
})
export class RecipeformComponent {
  recipeForm: FormGroup;
  username: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private userService: UserService
  ) {
    this.username = this.userService.getUsername();
    this.recipeForm = this.formBuilder.group({
      name: '',
      creator: this.username,
      servingSize: '',
      cookingTime: '',
      description: '',
      image: '',
      ingredients: this.formBuilder.array(['']),
      instructions: this.formBuilder.array(['']),
    });
  }

  ngOnInit(): void {}

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

  async onSubmit(form: any) {
    if (form.valid) {
      const recipe = form.value;

      try {
        const response = await firstValueFrom(
          this.recipeService.createNewRecipe(recipe)
        );
      } catch (error) {
        this.recipeService.createRecipeError(error);
      }
    }
  }
}
