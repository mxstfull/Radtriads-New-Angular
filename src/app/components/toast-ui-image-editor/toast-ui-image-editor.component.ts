import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  ViewChild,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import ImageEditor from 'tui-image-editor';
import tuiImageEditor from 'tui-image-editor';

import 'tui-image-editor/dist/svg/icon-a.svg';
import 'tui-image-editor/dist/svg/icon-b.svg';
import 'tui-image-editor/dist/svg/icon-c.svg';
import 'tui-image-editor/dist/svg/icon-d.svg';

enum editorEvents {
  addText = 'addText',
  mousedown = 'mousedown',
  objectActivated = 'objectActivated',
  objectMoved = 'objectMoved',
  objectScaled = 'objectScaled',
  redoStackChanged = 'redoStackChanged',
  textEditing = 'textEditing',
  undoStackChanged = 'undoStackChanged',
}
const includeUIOptions = {
  includeUI: {
    loadImage: {
      path: '/assets/img/photo-image.png',
      name: 'main'
    },
    // theme: 'whiteTheme',
    menuBarPosition: 'left',
    initMenu: 'filter',
    theme: {
      'common.bi.image':
        'https://uicdn.toast.com/toastui/img/tui-image-editor-bi.png',
      'common.bisize.width': '251px',
      'common.bisize.height': '21px',
      'common.backgroundImage': './img/bg.png',
      'common.backgroundColor': '#fff',
      'common.border': '1px solid #c1c1c1',

      // header
      'header.backgroundImage': 'none',
      'header.backgroundColor': 'transparent',
      'header.border': '0px',

      // load button
      'loadButton.backgroundColor': '#fff',
      'loadButton.border': '1px solid #ddd',
      'loadButton.color': '#222',
      'loadButton.fontFamily': "'Noto Sans', sans-serif",
      'loadButton.fontSize': '12px',

      // download button
      'downloadButton.backgroundColor': '#fdba3b',
      'downloadButton.border': '1px solid #fdba3b',
      'downloadButton.color': '#fff',
      'downloadButton.fontFamily': "'Noto Sans', sans-serif",
      'downloadButton.fontSize': '12px',

      // main icons
      'menu.normalIcon.color': '#8a8a8a',
      'menu.activeIcon.color': '#555555',
      'menu.disabledIcon.color': '#434343',
      'menu.hoverIcon.color': '#e9e9e9',
      'menu.iconSize.width': '24px',
      'menu.iconSize.height': '24px',

      // submenu icons
      'submenu.normalIcon.color': '#8a8a8a',
      'submenu.activeIcon.color': '#555555',
      'submenu.iconSize.width': '32px',
      'submenu.iconSize.height': '32px',

      // submenu primary color
      'submenu.backgroundColor': 'transparent',
      'submenu.partition.color': '#e5e5e5',

      // submenu labels
      'submenu.normalLabel.color': '#858585',
      'submenu.normalLabel.fontWeight': 'normal',
      'submenu.activeLabel.color': '#000',
      'submenu.activeLabel.fontWeight': 'normal',

      // checkbox style
      'checkbox.border': '1px solid #ccc',
      'checkbox.backgroundColor': '#fff',

      // rango style
      'range.pointer.color': '#333',
      'range.bar.color': '#ccc',
      'range.subbar.color': '#606060',

      'range.disabledPointer.color': '#d3d3d3',
      'range.disabledBar.color': 'rgba(85,85,85,0.06)',
      'range.disabledSubbar.color': 'rgba(51,51,51,0.2)',

      'range.value.color': '#000',
      'range.value.fontWeight': 'normal',
      'range.value.fontSize': '11px',
      'range.value.border': '0',
      'range.value.backgroundColor': '#f5f5f5',
      'range.title.color': '#000',
      'range.title.fontWeight': 'lighter',

      // colorpicker style
      'colorpicker.button.border': '0px',
      'colorpicker.title.color': '#000',
    },
  },
};
const editorDefaultOptions: tuiImageEditor.IOptions = {
  cssMaxWidth: 700,
  cssMaxHeight: 500,
};

interface IImageEditor extends ImageEditor {
  off(eventName: string): void;
}

@Component({
  selector: 'tui-image-editor',
  templateUrl: `./toast-ui-image-editor.component.html`,
  styleUrls: [
    '../../../../node_modules/tui-color-picker/dist/tui-color-picker.css',
    '../../../../node_modules/tui-image-editor/dist/tui-image-editor.css',
    './toast-ui-image-editor.component.css'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ToastUiImageEditorComponent implements AfterViewInit, OnDestroy {
  @Input() includeUI = true;
  @Input() options: tuiImageEditor.IOptions;

  @Output() addText = new EventEmitter<any>();
  @Output() mousedown = new EventEmitter<any>();
  @Output() objectActivated = new EventEmitter<any>();
  @Output() objectMoved = new EventEmitter<any>();
  @Output() objectScaled = new EventEmitter<any>();
  @Output() redoStackChanged = new EventEmitter<number>();
  @Output() textEditing = new EventEmitter<void>();
  @Output() undoStackChanged = new EventEmitter<number>();

  @ViewChild('imageEditor', { static: true }) editorRef: ElementRef;

  editorInstance: ImageEditor;

  ngAfterViewInit() {
    let options = editorDefaultOptions;
    if (this.includeUI) {
      options = Object.assign(includeUIOptions, this.options);
    }
    this.editorInstance = new ImageEditor(
      this.editorRef.nativeElement,
      options
    );
    this.addEventListeners();
  }

  ngOnDestroy() {
    this.removeEventListeners();
    this.editorInstance.destroy();
  }

  private addEventListeners() {
    this.editorInstance.on(editorEvents.addText, (event) =>
      this.addText.emit(event)
    );
    this.editorInstance.on(editorEvents.mousedown, (event, originPointer) =>
      this.mousedown.emit({ event, originPointer })
    );
    this.editorInstance.on(editorEvents.objectActivated, (event) =>
      this.objectActivated.emit(event)
    );
    this.editorInstance.on(editorEvents.objectMoved, (event) =>
      this.objectMoved.emit(event)
    );
    this.editorInstance.on(editorEvents.objectScaled, (event) =>
      this.objectScaled.emit(event)
    );
    this.editorInstance.on(editorEvents.redoStackChanged, (event) =>
      this.redoStackChanged.emit(event)
    );
    this.editorInstance.on(editorEvents.textEditing, () =>
      this.textEditing.emit()
    );
    this.editorInstance.on(editorEvents.undoStackChanged, (event) =>
      this.undoStackChanged.emit(event)
    );
  }

  private removeEventListeners() {
    (<IImageEditor>this.editorInstance).off(editorEvents.addText);
    (<IImageEditor>this.editorInstance).off(editorEvents.mousedown);
    (<IImageEditor>this.editorInstance).off(editorEvents.objectActivated);
    (<IImageEditor>this.editorInstance).off(editorEvents.objectMoved);
    (<IImageEditor>this.editorInstance).off(editorEvents.objectScaled);
    (<IImageEditor>this.editorInstance).off(editorEvents.redoStackChanged);
    (<IImageEditor>this.editorInstance).off(editorEvents.textEditing);
    (<IImageEditor>this.editorInstance).off(editorEvents.undoStackChanged);
  }
}
