import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  return inject(AuthService).loggedInStatus$.pipe(
    tap((loggedIn) => !loggedIn && router.navigate(['/login']))
  );
};
