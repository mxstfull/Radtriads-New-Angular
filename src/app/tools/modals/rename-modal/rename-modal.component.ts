import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RenameConfirmModalComponent } from '../rename-confirm-modal/rename-confirm-modal.component';
import { ShareModalComponent } from '../share-modal/share-modal.component';
import { CardItem } from '../../../components/interfaces/CardItem';


@Component({
  selector: 'app-rename-modal',
  templateUrl: './rename-modal.component.html',
  styleUrls: ['./rename-modal.component.css']
})
export class RenameModalComponent  {

  public titleText = "Rename selected file?";
  private dialogRef: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
    private selfDialogRef: MatDialogRef<RenameModalComponent>
  ) {
    if(this.data.type === "album") {
      this.titleText = "Rename Album?";
    }
    else {
      this.titleText = "Rename selected file?";
    }
  }
  openDialog(type: string) {
    if (type === "rename-confirm") {
      this.dialogRef = this.dialog.open(RenameConfirmModalComponent, {
        data: this.data,
        width: '600px',
      });
      this.dialogRef.afterClosed().subscribe(
        result => {
          // this.data.is_protected = Number(result);
          if(result == 'refresh')
            this.selfDialogRef.close('refresh');
        });
    }
  }
  
}
