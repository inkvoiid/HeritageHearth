import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { UserService } from '../services/user.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const isAuthorisedRecipeGuard: CanActivateFn = (route, state) => {
  const recipeId = route.params['recipeId'];

  const recipeService = inject(RecipeService);
  const userService = inject(UserService);
  const router = inject(Router);

  return recipeService.getRecipe(recipeId).pipe(
    map((response: any) => {
      if (response.body.creator) {
        return userService.getUsername() === response.body.creator;
      } else {
        router.navigate(['/recipes/' + recipeId]);
        return false;
      }
    })
  );
};
