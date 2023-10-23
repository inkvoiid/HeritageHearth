import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { formatTimeAgo } from '../../utils';

@Component({
  templateUrl: './admindashpage.component.html',
  styleUrls: ['./admindashpage.component.css'],
})
export class AdmindashpageComponent implements OnInit {
  pendingRecipes: any = [];

  constructor(private recipeService: RecipeService) {
    this.recipeService.getAllPendingRecipes().subscribe((response: any) => {
      this.pendingRecipes = response;
    });
  }

  ngOnInit(): void {
    for (let recipe of this.pendingRecipes) {
      recipe.createdAt = formatTimeAgo(recipe.createdAt);
      recipe.updatedAt = formatTimeAgo(recipe.updatedAt);
    }
  }
}
