import { TestBed, inject } from '@angular/core/testing';

import { Cpl2ManualProductionService } from './cpl2-manual-production.service';

describe('Cpl2ManualProductionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Cpl2ManualProductionService]
    });
  });

  it('should be created', inject([Cpl2ManualProductionService], (service: Cpl2ManualProductionService) => {
    expect(service).toBeTruthy();
  }));
});
