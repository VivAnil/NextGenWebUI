import { TestBed } from '@angular/core/testing';

import { ApiServicepillar } from './api.servicepillar';

describe('ApiServicepillar', () => {
  let service: ApiServicepillar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServicepillar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
