import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipepreview',
  templateUrl: './recipepreview.component.html',
  styleUrls: ['./recipepreview.component.css'],
})
export class RecipepreviewComponent {
  @Input() recipe: any;
  recipeImageSrc: string =
    '../../assets/media/images/recipeimages/default-recipe-pic.png';

  constructor() {
    if (this.recipe != null) {
      this.recipeImageSrc = this.recipe.recipeImage;
    }
  }
}
