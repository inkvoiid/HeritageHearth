import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { adminstatusResolver } from '../resolvers/adminstatus.resolver';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const adminStatus = adminstatusResolver(route, state);
  const router = inject(Router);

  if (adminStatus) {
    console.log(1 + 'a');
    return true;
  } else {
    router.navigate(['/']);
    console.log(2 + 'a');
    return false;
  }
};
