/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ZenithService } from './zenith.service';

describe('ZenithService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZenithService]
    });
  });

  it('should ...', inject([ZenithService], (service: ZenithService) => {
    expect(service).toBeTruthy();
  }));
});
