import { TestBed, inject } from '@angular/core/testing';

import { HeaderServiceService } from './header-service.service';

describe('HeaderServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderServiceService]
    });
  });

  it('should be created', inject([HeaderServiceService], (service: HeaderServiceService) => {
    expect(service).toBeTruthy();
  }));
});
