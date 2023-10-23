import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { AuthService } from '../services/auth.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const isAuthorisedRecipeGuard: CanActivateFn = (route, state) => {
  const recipeId = route.params['recipeId'];

  const recipeService = inject(RecipeService);
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.getAdminStatus()) {
    return true;
  }

  return recipeService.getRecipe(recipeId).pipe(
    map((response: any) => {
      if (response.body.creator) {
        return auth.getUsername() === response.body.creator;
      } else {
        router.navigate(['/recipes/' + recipeId]);
        return false;
      }
    })
  );
};
