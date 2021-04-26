import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-rename-confirm-modal',
  templateUrl: './rename-confirm-modal.component.html',
  styleUrls: ['./rename-confirm-modal.component.css']
})
export class RenameConfirmModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
