import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RecipeService } from './recipe.service';
import { UserService } from './user.service';

export const isAuthorisedRecipeGuard: CanActivateFn = (route, state) => {
  const recipeId = route.params['recipeId'];

  const recipeService = inject(RecipeService);
  const userService = inject(UserService);
  const router = inject(Router);

  recipeService.getRecipe(recipeId).subscribe((response: any) => {
    if (response.body.creator) {
      return userService.getUsername() === response.body.creator;
    } else {
      router.navigate(['/recipes/' + recipeId]);
      return false;
    }
  });
  router.navigate(['/recipes/' + recipeId]);
  return false;
};
