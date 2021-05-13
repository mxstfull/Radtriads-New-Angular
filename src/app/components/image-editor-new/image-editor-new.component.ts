import { Component, OnInit, ViewChild } from '@angular/core';
import { PixieImageEditorComponent } from '../pixie-image-editor/pixie-image-editor.component';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor-new.component.html',
  styleUrls: ['./image-editor-new.component.css']
})
export class ImageEditorNewComponent implements OnInit {
  @ViewChild("imageEditor")
  imageEditor: PixieImageEditorComponent;
  constructor() { }

  ngOnInit(): void {
  }

  triggerSave(): void {
    this.imageEditor.saveTrigger();
  }

  onSave(data): void {
    console.log(data);
  }
}
