import { TestBed } from '@angular/core/testing';

import { SimpleFormsService } from './simple-forms.service';

describe('SimpleFormsService', () => {
  let service: SimpleFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
