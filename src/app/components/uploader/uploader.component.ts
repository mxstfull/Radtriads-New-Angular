import { Component, OnInit, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { TokenService } from '../../shared/token.service';
import { HttpHeaders } from '@angular/common/http';

const URL = 'http://127.0.0.1:8000/api/fileupload/upload';
// const URL = 'http://127.0.0.1:8000/api/auth/upload';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent  {
  
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  // private token_var: string;
  
  constructor(    private token: TokenService) {
    // this.token_var = this.token.getToken();
    this.uploader = new FileUploader({
      // url: URL,
      // disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      // formatDataFunctionIsAsync: true,
      // formatDataFunction: async (item) => {
      //   return new Promise((resolve, reject) => {
      //     resolve({
      //       name: item._file.name,
      //       length: item._file.size,
      //       contentType: item._file.type,
      //       date: new Date(),
      //     });
      //   });
      // },
      url: URL,
      disableMultipart : false,
      autoUpload: true,
      method: 'post',
      itemAlias: 'attachment',
      // allowedFileType: ['image', 'pdf']
  
      
    });
    // this.uploader.queue[0].method = 'POST';
    // this.uploader.queue[0].withCredentials = false;
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe(res => this.response = res);
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    console.log(file);
  }
}
