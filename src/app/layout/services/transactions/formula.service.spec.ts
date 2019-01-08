import { TestBed, inject } from '@angular/core/testing';

import { Layout\services\transactions\formulaService } from './layout\services\transactions\formula.service';

describe('Layout\services\transactions\formulaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Layout\services\transactions\formulaService]
    });
  });

  it('should be created', inject([Layout\services\transactions\formulaService], (service: Layout\services\transactions\formulaService) => {
    expect(service).toBeTruthy();
  }));
});
