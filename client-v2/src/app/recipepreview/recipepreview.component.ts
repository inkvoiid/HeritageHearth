import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipepreview',
  templateUrl: './recipepreview.component.html',
  styleUrls: ['./recipepreview.component.css'],
})
export class RecipepreviewComponent {
  @Input() recipe: any;
}
