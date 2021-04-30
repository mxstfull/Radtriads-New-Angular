import { TestBed } from '@angular/core/testing';

import { SidebarBroadcastService } from './sidebar-broadcast.service';

describe('SidebarBroadcastService', () => {
  let service: SidebarBroadcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarBroadcastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
