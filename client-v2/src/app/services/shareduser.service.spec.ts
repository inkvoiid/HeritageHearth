import { TestBed } from '@angular/core/testing';

import { ShareduserService } from './shareduser.service';

describe('ShareduserService', () => {
  let service: ShareduserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareduserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
