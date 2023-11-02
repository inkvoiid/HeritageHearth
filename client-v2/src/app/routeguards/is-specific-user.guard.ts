import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const isSpecificUserGuard: CanActivateFn = (route, state) => {
  const username = route.params['username'];
  const auth = inject(AuthService);
  const router = inject(Router);
  const loggedInUsername = auth.getUsername();

  // if the user is logged in and the username in the url matches the logged in user's username, return true

  if (auth.getLoggedInStatus() && username === loggedInUsername) {
    return true;
  } else {
    router.navigate(['/profile/' + username]);
    return false;
  }
};
