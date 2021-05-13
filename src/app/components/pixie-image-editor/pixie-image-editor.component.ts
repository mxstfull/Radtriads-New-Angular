import { AfterViewInit, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import './pixie/scripts.min.js';

/**
 * pixie-image-editor
 * Username: alexisd22
 * Password:  8hQhE#m**U124*bHQPY6gE
 * https://support.vebto.com/
 */


declare var Pixie: any;

let Iu = (function (t: any) {
  return (t.INLINE = 'inline'), (t.OVERLAY = 'overlay'), t;
})({});

const Pu = (function (t: any) {
  return (t.DARK = 'dark'), (t.LIGHT = 'light'), t;
})({});

const Du = (function (t: any) {
  return (t.TOP = 'top'), (t.BOTTOM = 'bottom'), (t.NONE = 'none'), t;
})({});

const Ru = (function (t: any) {
  return (
    (t.NAVIGATION = 'navigation'),
    (t.FILTER = 'filter'),
    (t.RESIZE = 'resize'),
    (t.CROP = 'crop'),
    (t.TRANSFORM = 'transform'),
    (t.DRAW = 'draw'),
    (t.TEXT = 'text'),
    (t.SHAPES = 'shapes'),
    (t.STICKERS = 'stickers'),
    (t.FRAME = 'frame'),
    (t.CORNERS = 'corners'),
    (t.BACKGROUND = 'background'),
    (t.MERGE = 'merge'),
    (t.OBJECT_SETTINGS = 'objectSettings'),
    t
  );
})({});

@Component({
  selector: 'pixie-image-editor',
  templateUrl: './pixie-image-editor.component.html',
  styleUrls: ['./pixie-image-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PixieImageEditorComponent implements AfterViewInit {
  pixie: any;
  @Output() save = new EventEmitter<any>();

  getData() {
    debugger;
    return this.pixie.getDataUrl();
  }

  ngAfterViewInit() {
    this.pixie = new Pixie({
      // ENTER CONFIGURATION HERE
      // ENTER CONFIGURATION HERE
      image: '/assets/img/photo-image.png',
      baseUrl: '/assets/img/pixie_editor',
      maxHeight: '800',
      ui: {
        visible: !0,
        mode: Iu.INLINE,
        defaultTheme: Pu.LIGHT,
        ignoreMobileKeyboard: !0,
        allowEditorClose: !0,
        toolbar: {
          leftItems: [
            {
              type: 'undoWidget'
            },
            {
              type: 'button',
              icon: 'layers',
              action: 'toggleObjects',
            },
            {
              type: "button",
              icon: "file-download",
              text: "Save",
              action: "exportImage"
            }
          ],
          rightItems: [
            {
              type: 'zoomWidget',
              condition: {
                'tools.zoom.allowUserZoom': !0,
              },
            },
            {
              type: 'panelNameWidget',
              compactModeOnly: !0,
            },
          ],
        },
        nav: {
          position: Du.BOTTOM,
          replaceDefault: 1,
          items: [
            {
              name: 'filter',
              icon: 'filter-custom',
              action: Ru.FILTER,
            },
            {
              name: 'resize',
              icon: 'resize-custom',
              action: Ru.RESIZE,
            },
            {
              name: 'crop',
              icon: 'crop-custom',
              action: Ru.CROP,
            },
            {
              name: 'transform',
              icon: 'transform-custom',
              action: Ru.TRANSFORM,
            },
            {
              name: 'draw',
              icon: 'pencil-custom',
              action: Ru.DRAW,
            },
            {
              name: 'text',
              icon: 'text-box-custom',
              action: Ru.TEXT,
            },
            {
              name: 'shapes',
              icon: 'polygon-custom',
              action: Ru.SHAPES,
            },
            {
              name: 'stickers',
              icon: 'sticker-custom',
              action: Ru.STICKERS,
            },
            {
              name: 'frame',
              icon: 'frame-custom',
              action: Ru.FRAME,
            },
            {
              name: 'corners',
              icon: 'rounded-corner-custom',
              action: Ru.CORNERS,
            },
            {
              name: 'background',
              icon: 'background-custom',
              action: Ru.BACKGROUND,
            },
            {
              name: 'merge',
              icon: 'merge-custom',
              action: Ru.MERGE,
            },
          ],
        },
        openImageDialog: {
          show: !0,
          sampleImages: [
            {
              url: 'images/samples/sample1.jpg',
              thumbnail: 'images/samples/sample1_thumbnail.jpg',
            },
            {
              url: 'images/samples/sample2.jpg',
              thumbnail: 'images/samples/sample2_thumbnail.jpg',
            },
            {
              url: 'images/samples/sample3.jpg',
              thumbnail: 'images/samples/sample3_thumbnail.jpg',
            },
          ],
        },
        colorPresets: {
          replaceDefault: !1,
          items: [
            'rgb(0,0,0)',
            'rgb(255, 255, 255)',
            'rgb(242, 38, 19)',
            'rgb(249, 105, 14)',
            'rgb(253, 227, 167)',
            'rgb(4, 147, 114)',
            'rgb(30, 139, 195)',
            'rgb(142, 68, 173)',
          ],
        },
      },
      tools: {
        zoom: {
          allowUserZoom: true,
        },
      },
      onSave: (data, name) => {
        this.save.emit({
          data: data,
          name: name
        });
      }
    });
  }
  
  saveTrigger() {
    var ele = (<HTMLElement>document.querySelector("image-editor toolbar .left toolbar-item:last-child button"));
    ele.click();
  }
  
}
