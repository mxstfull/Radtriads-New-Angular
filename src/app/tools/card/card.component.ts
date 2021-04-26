import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrivacyModalComponent } from '../modals/privacy-modal/privacy-modal.component';
import { ShareModalComponent } from '../modals/share-modal/share-modal.component';
import { RenameModalComponent } from '../modals/rename-modal/rename-modal.component';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog(type: string) {
    if (type === "privacy") {
      this.dialog.open(PrivacyModalComponent, {
        data: {
          animal: 'panda'
        },
        width: '600px',
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
      this.dialog.open(RenameModalComponent, {
        data: {
          animal: 'panda'
        },
        width: '600px',
      });
    }
    else if (type === "delete") {
      this.dialog.open(DeleteModalComponent, {
        data: {
          animal: 'panda'
        },
        width: '600px',
      });
    }

  }

  ngOnInit(): void {
  }

}
