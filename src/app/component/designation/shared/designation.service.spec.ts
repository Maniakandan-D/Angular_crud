import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DesignationService } from './designation.service';

fdescribe('DesignationService', () => {
  let service: DesignationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(DesignationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
