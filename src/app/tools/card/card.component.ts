import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PrivacyModalComponent} from '../modals/privacy-modal/privacy-modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(PrivacyModalComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

  ngOnInit(): void {
  }

}
