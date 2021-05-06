import { isNgTemplate } from '@angular/compiler';
import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CardItem } from '../../../components/interfaces/CardItem';
import { FileviewService } from '../../../shared/fileview.service';

@Component({
  selector: 'app-rename-confirm-modal',
  templateUrl: './rename-confirm-modal.component.html',
  styleUrls: ['./rename-confirm-modal.component.css']
})
export class RenameConfirmModalComponent {

  public newFileName: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CardItem,
    private dialogRef: MatDialogRef<RenameConfirmModalComponent>,
    private fileviewService: FileviewService
    ) {
      this.newFileName = this.data.title.split('.')[0];
  }
  jsEncode(param: string){
    let re = /\//gi;
    param = param.replace(re, '>');
    return param;
    //return encodeURIComponent(param);
  }
  onRenameConfirm() {
    if(this.newFileName == this.data.title.split('.')[0])
      return;
    let requestPayload = {
      item: this.data,
      newFileName: this.newFileName
    }
    this.fileviewService.renameFile(requestPayload).subscribe(
      result => {
        this.data.title = result['newFileName'];
        this.dialogRef.close('refresh');
      },
      error => {
      }, () => {
        //
        
      }
    );
  }
}
