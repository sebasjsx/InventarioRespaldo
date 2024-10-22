import { TestBed } from '@angular/core/testing';

import { RestorePasswordService } from '../../forget-password/service/restore-password.service';

describe('RestorePasswordService', () => {
  let service: RestorePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestorePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
