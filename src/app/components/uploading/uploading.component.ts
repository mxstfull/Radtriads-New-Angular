import { Component, ViewChild, OnInit } from '@angular/core';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { Subscription } from 'rxjs';

const URL = 'http://127.0.0.1:8000/api/fileupload/upload';
@Component({
  selector: 'app-uploading',
  templateUrl: './uploading.component.html',
  styleUrls: ['./uploading.component.css']
})
export class UploadingComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

  @ViewChild('flowAdvanced')
  flow: FlowDirective;

  autoUploadSubscription: Subscription;

  autoupload = false;

  ngAfterViewInit() {
    this.autoUploadSubscription = this.flow.events$.subscribe(event => {
      // to get rid of incorrect `event.type` type you need Typescript 2.8+
      if (this.autoupload && event.type === 'filesSubmitted') {
        this.flow.upload();
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
