import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicMediaBoardComponent } from './public-media-board.component';

describe('PublicMediaBoardComponent', () => {
  let component: PublicMediaBoardComponent;
  let fixture: ComponentFixture<PublicMediaBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicMediaBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicMediaBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
