import { TestBed, inject } from '@angular/core/testing';

import { SaveFirebaseService } from './save-firebase.service';

describe('SaveFirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveFirebaseService]
    });
  });

  it('should be created', inject([SaveFirebaseService], (service: SaveFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
