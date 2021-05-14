import { Component, ViewChild, OnInit } from '@angular/core';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { Subscription } from 'rxjs';
import { Globals } from '../../../global';
declare var nsfwjs: any;

@Component({
  selector: 'app-uploading',
  templateUrl: './uploading.component.html',
  styleUrls: ['./uploading.component.css']
})
export class UploadingComponent implements OnInit {
  currentPath = "home";
  public currentCategory;
  public allowedExtensions = {
    'photo': '.png, .jpg, .gif, .tif, .webp',
    'music': '.mp3, .wav',
    'video': '.mp4, .mov, .swf, .flv',
    'code': '.txt, .rtf, .html, .html5, .webm, .php, .css, .xml, .json, .pdf, .docx, .doc, .xls, .xlsx, .ppt, .pptx, .java'
  };
  constructor(private globals: Globals) {
    this.currentPath = localStorage.getItem("current_path");
    this.currentCategory = localStorage.getItem('current_category');
  }

  ngOnInit(): void {
  }

  @ViewChild('flowAdvanced')
  flow: FlowDirective;

  autoUploadSubscription: Subscription;
  public uploadFinished: boolean;
  autoupload = true;

  ngAfterViewInit() {
    this.flow.flowJs.opts.query = {
      user_id: localStorage.getItem('user_id'),
      unique_id: localStorage.getItem('unique_id'),
      currentPath: this.currentPath,
      currentCategory: this.currentCategory
    }
    
    this.autoUploadSubscription = this.flow.events$.subscribe(event => {

      this.flow.flowJs.files.forEach(item => {
        debugger
          nsfwjs.load().then((model) => {
            // Classify the image.
            model.classify(item).then((predictions) => {
              console.log("Predictions", predictions);
            });
          });
        if(!this.allowedExtensions[this.currentCategory].includes(item.getExtension())){          
          item.cancel();
        }         
      });
      if (this.autoupload && event.type === 'filesSubmitted') {
        this.uploadFinished = false;
        this.flow.upload();
      }
      if(event.type == "complete") {
        this.uploadFinished = true;
      }
    });
    
  }

  ngOnDestroy() {
    this.autoUploadSubscription.unsubscribe();
  }

  trackTransfer(transfer: Transfer) {
    return transfer.id;
  }

}
