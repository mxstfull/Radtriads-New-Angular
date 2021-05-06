import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpUrlEncodingCodec } from '@angular/common/http';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrivacyModalComponent } from '../modals/privacy-modal/privacy-modal.component';
import { ShareModalComponent } from '../modals/share-modal/share-modal.component';
import { RenameModalComponent } from '../modals/rename-modal/rename-modal.component';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { CardItem } from '../../components/interfaces/CardItem';

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
  constructor(public dialog: MatDialog, 
    
    ) {
  }

  openDialog(type: string) {
    if (type === "privacy") {
      this.dialogRef = this.dialog.open(PrivacyModalComponent, {
        data: this.item,
        width: '600px',
      });
      this.dialogRef.afterClosed().subscribe(
        result => {
          this.item.is_protected = Number(result);
        });
    }
    else if (type === "share") {
      this.dialog.open(ShareModalComponent, {
        data: {
          animal: 'panda'
        },
        width: '740px',
      });
    }
    else if (type === "rename") {
      this.dialogRef = this.dialog.open(RenameModalComponent, {
        data: this.item,
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
  dispDate(m_date: string): string {
    let date = new Date(m_date);
    return date.toLocaleString('default', {day: 'numeric', month: 'short', year: 'numeric'});
  }
  viewImageThumbnail(item: CardItem) {
    if(item.is_picture == 1)
      return "http://127.0.0.1:8000/files/"+this.jsEncode(item.thumb_url);
    else return "assets/img/thumb-"+item.ext+".png";
  }
}
