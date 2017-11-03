import { TestBed, inject } from '@angular/core/testing';

import { RowService } from './row.service';

describe('RowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RowService]
    });
  });

  it('should be created', inject([RowService], (service: RowService) => {
    expect(service).toBeTruthy();
  }));
});
