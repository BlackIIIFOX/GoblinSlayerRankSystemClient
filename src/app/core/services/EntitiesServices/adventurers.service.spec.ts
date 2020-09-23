import { TestBed } from '@angular/core/testing';

import { AdventurersService } from './adventurers.service';

describe('AdventurersService', () => {
  let service: AdventurersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdventurersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
