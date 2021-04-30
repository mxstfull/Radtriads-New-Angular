import { TestBed } from '@angular/core/testing';

import { FileviewService } from './fileview.service';

describe('FileviewService', () => {
  let service: FileviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
