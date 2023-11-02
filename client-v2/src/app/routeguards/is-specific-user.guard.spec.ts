import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isSpecificUserGuard } from './is-specific-user.guard';

describe('isSpecificUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isSpecificUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
