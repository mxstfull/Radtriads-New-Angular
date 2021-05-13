import { isNgTemplate } from '@angular/compiler';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardItem } from '../../../components/interfaces/CardItem';
import { FileviewService } from '../../../shared/fileview.service';
import { AppSettings } from '../../../shared/appSettings';

@Component({
  selector: 'app-rename-confirm-modal',
  templateUrl: './rename-confirm-modal.component.html',
  styleUrls: ['./rename-confirm-modal.component.css']
})
export class RenameConfirmModalComponent {

  public newFileName: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RenameConfirmModalComponent>,
    private fileviewService: FileviewService
  ) {
    if (this.data.type == "album") {
      this.newFileName = localStorage.getItem('current_album_title');
    }
    if (this.data.type == "file") {
      this.newFileName = this.data.data.title.split('.')[0];
    }
  }
  viewImageThumbnail(data: any) {
    if (data.type == "album") {
      return "assets/img/thumb-album.png";
    }
    else if (data.type == "file") {
      if (data.data.is_picture == 1)
        return AppSettings.backendURL+"files/" + this.jsEncode(data.data.thumb_url);
      else return "assets/img/thumb-" + data.data.ext + ".png";
    }
  }
  jsEncode(param: string) {
    let re = /\//gi;
    param = param.replace(re, '>');
    return param;
    //return encodeURIComponent(param);
  }
  onRenameConfirm() {
    if (this.data.type == "album") {
      if (this.newFileName == localStorage.getItem('current_album_title'))
        return;
      let requestPayload = {
        user_id: localStorage.getItem('user_id'),
        unique_id: localStorage.getItem('unique_id'),
        current_path: localStorage.getItem('current_path'),
        newAlbumName: this.newFileName
      }

      this.fileviewService.renameAlbum(requestPayload).subscribe(
        result => {
          if (result == true) {
            localStorage.setItem("current_album_title", this.newFileName);
            window.location.reload();
          }
        },
        error => {
        }, () => {
          //

        }
      );
    }
    else if (this.data.type == "file") {
      if (this.newFileName == this.data.data.title.split('.')[0])
        return;
      let requestPayload = {
        item: this.data.data,
        newFileName: this.newFileName
      }
      this.fileviewService.renameFile(requestPayload).subscribe(
        result => {
          this.data.data.title = result['newFileName'];
          this.dialogRef.close('refresh');
        },
        error => {
        }, () => {
          //

        }
      );
    }
  }
}
