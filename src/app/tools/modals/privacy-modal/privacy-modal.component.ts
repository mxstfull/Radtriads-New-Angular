import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardItem } from '../../../components/interfaces/CardItem';
import { FileviewService } from '../../../shared/fileview.service';

@Component({
  selector: 'app-privacy-modal',
  templateUrl: './privacy-modal.component.html',
  styleUrls: ['./privacy-modal.component.css']
})

export class PrivacyModalComponent {

  privacy_select = "";
  password = "";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CardItem,
    private fileviewService: FileviewService
  ) { 
    this.privacy_select = data.is_protected.toString();
  }
  onPrivacyConfirm() {
    let item = this.data;
    if(item['is_protected'].toString() == this.privacy_select) return;
    if(this.privacy_select != '2') this.password = "";
    let requestPayload = {
      unique_id: item['unique_id'],
      is_protected: Number(this.privacy_select), 
      password: this.password
    };
    this.fileviewService.editFilePrivacy(requestPayload).subscribe(
      result => {
        console.log(result);
      },
      error => {

      }, () => {
        //
        
      }
    );
  }
}
