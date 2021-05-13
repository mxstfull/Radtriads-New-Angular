import { Component, OnInit } from '@angular/core';
import { CardItem } from '../interfaces/CardItem';
import { FileviewService } from '../../shared/fileview.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DeleteModalComponent } from '../../tools/modals/delete-modal/delete-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShareModalComponent } from '../../tools/modals/share-modal/share-modal.component';
import { AppSettings } from '../../shared/appSettings';

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
    private router_normal: Router,
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
            this.currentItem = result;
            localStorage.setItem('currentItemForEditor', this.viewImageDetail(this.currentItem));
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
    return AppSettings.backendURL+"files/"+this.jsEncode(item.url);
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
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(result);
        a.href = objectUrl;
        if(urlArray.length == 1) {
          a.download = urlArray[0]['title'];
        } else {
          a.download = 'archive.zip';
        }
        a.click();
        URL.revokeObjectURL(objectUrl);
      },error => {
        // this.errors = error.error;
      }, () => {
        
      }
    );
  }
  openDialog(type: string) {
    if(type == "share") {
      if(localStorage.getItem('show_direct_link') == "0" &&
        localStorage.getItem('show_forum_code') == "0" &&
        localStorage.getItem('show_html_code') == "0" &&
        localStorage.getItem('show_social_share') == "0")
      {
        return;
      }
      this.dialog.open(ShareModalComponent, {
        data: {
          data: this.currentItem
        },
        width: '740px',
      });
    }
  }
  showEditWindow() {
    this.router_normal.navigate(['/image-editor'], {queryParams:{id:this.currentItem.unique_id}});
  }
}
