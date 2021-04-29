import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditorNewComponent } from './image-editor-new.component';

describe('ImageEditorNewComponent', () => {
  let component: ImageEditorNewComponent;
  let fixture: ComponentFixture<ImageEditorNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageEditorNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageEditorNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
