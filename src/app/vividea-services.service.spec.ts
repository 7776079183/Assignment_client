import { TestBed } from '@angular/core/testing';

import { VivideaServicesService } from './vividea-services.service';

describe('VivideaServicesService', () => {
  let service: VivideaServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VivideaServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
