import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RenameConfirmModalComponent } from '../rename-confirm-modal/rename-confirm-modal.component';
import { ShareModalComponent } from '../share-modal/share-modal.component';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-rename-modal',
  templateUrl: './rename-modal.component.html',
  styleUrls: ['./rename-modal.component.css']
})
export class RenameModalComponent  {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {}
  openDialog(type: string) {
    if (type === "rename-confirm") {
      this.dialog.open(RenameConfirmModalComponent, {
        data: {
          animal: 'panda'
        },
        width: '600px',
      });
    }
  }
  
}
