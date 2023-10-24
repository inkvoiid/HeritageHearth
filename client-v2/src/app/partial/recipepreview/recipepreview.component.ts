import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipepreview',
  templateUrl: './recipepreview.component.html',
  styleUrls: ['./recipepreview.component.css'],
})
export class RecipepreviewComponent implements OnInit {
  @Input() recipe: any;
  recipeImageSrc: string =
    '../../assets/media/images/recipeimages/default-recipe-pic.png';

  ngOnInit(): void {
    if (this.recipe != null) {
      this.recipeImageSrc =
        '../../assets/media/images/recipeimages/' + this.recipe.recipeImage;
    }
  }

  loadPlaceholderImage(): void {
    this.recipeImageSrc =
      '../../assets/media/images/recipeimages/default-recipe-pic.png';
  }
}
