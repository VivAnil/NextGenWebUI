import { TestBed } from '@angular/core/testing';

import { ReadLocalStorageService } from './read-local-storage.service';

describe('ReadLocalStorageService', () => {
  let service: ReadLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
