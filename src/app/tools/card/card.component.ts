import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpUrlEncodingCodec } from '@angular/common/http';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrivacyModalComponent } from '../modals/privacy-modal/privacy-modal.component';
import { ShareModalComponent } from '../modals/share-modal/share-modal.component';
import { RenameModalComponent } from '../modals/rename-modal/rename-modal.component';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { CardItem } from '../../components/interfaces/CardItem';
import { AudioModalComponent } from '../modals/audio-modal/audio-modal.component';
import { VideoModalComponent } from '../modals/video-modal/video-modal.component';
import { Router, NavigationEnd } from '@angular/router';
import { AppSettings } from '../../shared/appSettings';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public item: CardItem;
  @Input() set SetItem(value: CardItem) {
    this.item = value;
  }
  @Input() selection_list;
  @Output() deleteItems: EventEmitter<any> = new EventEmitter();
  private dialogRef: any;
  public category;
  
  constructor(public dialog: MatDialog, 
    private router: Router,
  ) {
    this.category = localStorage.getItem("current_category");
  }
  openDialog(type: string) {
    if (type === "privacy") {
      this.dialogRef = this.dialog.open(PrivacyModalComponent, {
        data: this.item,
        width: '600px',
      });
      this.dialogRef.afterClosed().subscribe(
        result => {
          if(!result || result == undefined) return;
          this.item.is_protected = Number(result);
        });
    }
    else if (type === "share") {
      if(localStorage.getItem('show_direct_link') == "0" &&
        localStorage.getItem('show_forum_code') == "0" &&
        localStorage.getItem('show_html_code') == "0" &&
        localStorage.getItem('show_social_share') == "0")
      {
        this.dialog.open(AlertComponent, {
          data: {
            message: 'You need to toggle settings on account page!',
            buttonText: {
              cancel: 'Close'
            }
          },
        });
        return;
      }
      this.dialog.open(ShareModalComponent, {
        data: {
          data: this.item
        },
        width: '740px',
      });
    }
    else if (type === "rename") {
      this.dialogRef = this.dialog.open(RenameModalComponent, {
        data: {
          data: this.item,
          type: 'file'
        },
        width: '600px',
      });
    }
    else if (type === "delete") {
      this.dialogRef = this.dialog.open(DeleteModalComponent, {
        data: [this.item],
        width: '600px',
      });
      this.dialogRef.afterClosed().subscribe(
        result => {
          if(result != true) {
            this.deleteItems.emit(result);
          }
      }, error => {
      }, () => {
        
      })
    }
  }
  ngOnInit(): void {
  }
  jsEncode(param: string){
    if(param == null || param == "" ) return "";
    let re = /\//gi;
    param = param.replace(re, '>');
    return param;
  }
  viewImageThumbnail(item: CardItem) {
    let wellknownExtensions = ['flv','html','mov','mp3','mp4','rtf','swf','tif','txt','wav'];
    if(item.is_picture == 1)
      return AppSettings.backendURL+"files/"+this.jsEncode(item.thumb_url);
    else if(wellknownExtensions.includes(item.ext)) {
      return "assets/img/thumb-"+item.ext+".png";
    } else {
      return "assets/img/thumb-other.png";
    }
  }
  dispDate(m_date: string): string {
    let date = new Date(m_date);
    return date.toLocaleString('default', {day: 'numeric', month: 'short', year: 'numeric'});
  }
  viewMedia(item: CardItem) {
    let category = item.category;
    // localStorage.getItem('current_category');
    if(category == 0) {

    } else if(category == 1) {
      this.dialogRef = this.dialog.open(AudioModalComponent, {
        data: this.item,
        // width: '930px',
      });
    } else if(category == 2) {
      this.dialogRef = this.dialog.open(VideoModalComponent, {
        data: this.item,
        // width: '930px',
      });
    } else if(category == 3) {

    }
  }
  
  viewPreviewButton() {
    if(this.item.category == 0){
     return "";
    }
    else if(this.item.category == 1) {
      if(this.item.ext == "mp3")
        return "assets/img/music-icon.png";
      return "assets/img/music-icon1.png";
    }
    else if(this.item.category == 2) {
      return "assets/img/video-icon.png";
    }
  }
  imageView(item: CardItem) {
    if(item.category != 0) return;
    this.router.navigate(['/photo-details'], {queryParams:{id:item.unique_id}});
  }
}
