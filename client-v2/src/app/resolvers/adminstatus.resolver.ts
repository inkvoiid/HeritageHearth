import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminstatusResolver: ResolveFn<boolean> = (route, state) => {
  const auth = inject(AuthService);
  return auth.getAdminStatus();
};
