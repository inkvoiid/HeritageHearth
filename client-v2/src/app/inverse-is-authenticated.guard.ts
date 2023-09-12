import { CanActivateFn, Router } from '@angular/router';
import { isAuthenticatedGuard } from './is-authenticated.guard';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs';

export const inverseIsAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  return inject(AuthService).loggedInStatus$.pipe(
    map((loggedIn) => {
      if (!loggedIn) {
        return true; // Allow access if the user is not logged in
      } else {
        router.navigate(['/']);
        return false; // Deny access if the user is logged in
      }
    }),
    tap((canActivate) => {
      if (!canActivate) {
        router.navigate(['/']);
      }
    })
  );
};
