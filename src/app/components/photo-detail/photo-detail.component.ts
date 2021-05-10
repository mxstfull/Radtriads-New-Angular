import { Component, OnInit } from '@angular/core';
import { CardItem } from '../interfaces/CardItem';
import { FileviewService } from '../../shared/fileview.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DeleteModalComponent } from '../../tools/modals/delete-modal/delete-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {

  private dialogRef: any;
  public currentItem: CardItem;
  constructor(
    private fileviewService: FileviewService,
    private router: ActivatedRoute,
    public dialog: MatDialog, 
  ) { 
    this.router.queryParams.subscribe(params => {
      let m_unique_id = params['id'];
      let requestPayload = {
        unique_id: m_unique_id
      };
      this.fileviewService.getItemByUniqueId(requestPayload).subscribe(
        result => {
          if(!result) {
            alert("error");
          }
          else {
            this.currentItem = result;
          }
        },error => {
          // this.errors = error.error;
          
        }, () => {
        }
      );  
    });
  }

  ngOnInit(): void {
    
  }
  viewImageDetail(item: CardItem) {
    if(item == null) return;
    return "http://127.0.0.1:8000/files/"+this.jsEncode(item.url);
  }
  jsEncode(param: string){
    if(param == null || param == "" ) return "";
    let re = /\//gi;
    param = param.replace(re, '>');
    return param;
  }
  getCreatedDateAsString() {
    var d = new Date(this.currentItem.created_at);
    return d.toLocaleString();
  }
  onDeleteItem() {
    // let requestPayload = {
    //   item: [this.currentItem],
    // }
    // this.fileviewService.deleteFile(requestPayload).subscribe(
    //   result => {
    //     if(result) history.back();
    //   },
    //   error => {
        
    //   }, () => {
    //     //
        
    //   }
    // );
    this.dialogRef = this.dialog.open(DeleteModalComponent, {
      data: [this.currentItem],
      width: '600px',
    });
    this.dialogRef.afterClosed().subscribe(
      result => {
        if(result) history.back();
    }, error => {
    }, () => {
      
    })
  }
  onDownloadItem() {
    let requestPayload = [this.currentItem];
    let urlArray = [];
    for (let item in requestPayload) {
      urlArray.push({
        title: requestPayload[item].title,
        url: requestPayload[item].url
      });
    }
    this.fileviewService.downloadFiles({ fileList: urlArray }).subscribe(
      result => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(result)
        a.href = objectUrl
        a.download = urlArray[0]['title'];
        a.click();
        URL.revokeObjectURL(objectUrl);
      },error => {
        // this.errors = error.error;
      }, () => {
        
      }
    );
  }
}
