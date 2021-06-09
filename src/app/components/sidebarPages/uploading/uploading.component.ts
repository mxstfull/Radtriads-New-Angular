import { Component, ViewChild, OnInit } from '@angular/core';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { Subscription } from 'rxjs';
import { Globals } from '../../../global';
import { AppSettings } from '../../../shared/appSettings';

@Component({
  selector: 'app-uploading',
  templateUrl: './uploading.component.html',
  styleUrls: ['./uploading.component.css']
})
export class UploadingComponent implements OnInit {

  currentPath = "home";
  public currentCategory;
  public allowedExtensions = {
    'Photo': '.png, .jpg, .gif, .tif, .webp',
    'Music': '.mp3, .wav',
    'Video': '.mp4, .mov, .swf, .flv',
    'Code': '.txt, .rtf, .html, .html5, .webm, .php, .css, .xml, .json, .pdf, .docx, .doc, .xls, .xlsx, .ppt, .pptx, .java'
  };
  backendURL;
  constructor(private globals: Globals) {
    this.currentPath = localStorage.getItem("current_path");
    this.currentCategory = localStorage.getItem('current_category');
    console.log(this.currentPath);
    this.backendURL = AppSettings.backendURL;
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
