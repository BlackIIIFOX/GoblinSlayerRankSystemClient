import { TestBed } from '@angular/core/testing';

import { InMemUserDataService } from './in-mem-user-data.service';

describe('InMemUserService', () => {
  let service: InMemUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemUserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
