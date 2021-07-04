import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CardItem } from '../../../components/interfaces/CardItem';
import { FileviewService } from '../../../shared/fileview.service';
import { AppSettings } from '../../../shared/appSettings';

@Component({
  selector: 'app-audio-modal',
  templateUrl: './audio-modal.component.html',
  styleUrls: ['./audio-modal.component.css']
})
export class AudioModalComponent {
  audioList;
  constructor(@Inject(MAT_DIALOG_DATA) public data: CardItem,
    private fileviewService: FileviewService,
    private dialogRef: MatDialogRef<AudioModalComponent>
  ) {
    let m_url = this.getAudioStream(this.data);
    this.audioList = [
      {
        url: m_url,
        title: this.data.title,
        cover: "assets/img/audio-img.png"
      }
    ];
  }
  
  getAudioStream(item: CardItem) {
    return AppSettings.backendURL+"files/"+this.jsEncode(item.url);
  }
  jsEncode(param: string) {
    if(param == null || param == "" ) return "";
    let re = /\//gi;
    param = param.replace(re, '~');
   
    return param;
  }
}
