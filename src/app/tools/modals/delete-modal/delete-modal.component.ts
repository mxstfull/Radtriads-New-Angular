import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CardItem } from '../../../components/interfaces/CardItem';
import { FileviewService } from '../../../shared/fileview.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public data: CardItem,
    private fileviewService: FileviewService,
    private dialogRef: MatDialogRef<DeleteModalComponent>
  ) {}
  onDeleteConfirm() {
    let requestPayload = {
      item: this.data,
    }
    this.fileviewService.deleteFile(requestPayload).subscribe(
      result => {
        this.dialogRef.close(this.data);
      },
      error => {
        console.log(error);
      }, () => {
        //
        
      }
    );
  }
}
