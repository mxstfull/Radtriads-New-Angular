import { Component, OnInit, ViewChild } from '@angular/core';
import { PixieImageEditorComponent } from '../pixie-image-editor/pixie-image-editor.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FileviewService } from '../../shared/fileview.service';
import { CardItem } from '../interfaces/CardItem';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor-new.component.html',
  styleUrls: ['./image-editor-new.component.css']
})
export class ImageEditorNewComponent implements OnInit {
  @ViewChild("imageEditor")
  imageEditor: PixieImageEditorComponent;

  public currentItem: CardItem;
  source: string;

  constructor(
    private router: ActivatedRoute,
    private fileviewService: FileviewService,

  ) { 
    this.router.queryParams.subscribe(params => {
      let m_unique_id = params['id'];
      let requestPayload = {
        unique_id: m_unique_id
      };
      this.fileviewService.getItemByUniqueId(requestPayload).subscribe(
        result => {
          if(!result) {
            
          }
          else {
            this.source = "http://127.0.0.1:8000/files/"+this.jsEncode(result.url);
          }
        },error => {
          // this.errors = error.error;
          
        }, () => {
        }
      );  
    }); 
  }
  jsEncode(param: string){
    if(param == null || param == "" ) return "";
    let re = /\//gi;
    param = param.replace(re, '>');
    return param;
  }
  ngOnInit(): void {
    
  }
  AfterViewInit(): void {
  }
  triggerSave(): void {
    this.imageEditor.saveTrigger();
  }

  onSave(data): void {
    
    console.log(data);
  }
}
