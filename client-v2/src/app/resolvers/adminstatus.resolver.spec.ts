import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { adminstatusResolver } from './adminstatus.resolver';

describe('adminstatusResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => adminstatusResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
