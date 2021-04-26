import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameConfirmModalComponent } from './rename-confirm-modal.component';

describe('RenameConfirmModalComponent', () => {
  let component: RenameConfirmModalComponent;
  let fixture: ComponentFixture<RenameConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenameConfirmModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
