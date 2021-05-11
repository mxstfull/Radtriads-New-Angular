import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PixieImageEditorComponent } from "./pixie-image-editor.component";

describe("ToastUiImageEditorComponent", () => {
  let component: PixieImageEditorComponent;
  let fixture: ComponentFixture<PixieImageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PixieImageEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixieImageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
