import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { inverseIsAuthenticatedGuard } from './inverse-is-authenticated.guard';

describe('inverseIsAuthenticatedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => inverseIsAuthenticatedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
