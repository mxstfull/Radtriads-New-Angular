import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CardItem } from '../../../components/interfaces/CardItem';
import { FileviewService } from '../../../shared/fileview.service';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.css']
})

export class VideoModalComponent implements OnInit {
  name = 'Video events';
  videoSource;
  constructor(@Inject(MAT_DIALOG_DATA) public data: CardItem) { 
    this.videoSource = this.getVideoStream(this.data);
  }
  @ViewChild('videoPlayer') videoplayer: any;

  ngOnInit(): void {
  }
  public startedPlay:boolean = true;
  public show:boolean = false;
  pauseVideo(videoplayer)
  {
    videoplayer.nativeElement.play();
      setTimeout(() => 
      {
        videoplayer.nativeElement.pause();
        if(videoplayer.nativeElement.paused)
        {
          this.show = !this.show;       
        } 
      }, 5000);
  }
  getVideoStream(item: CardItem) {
    return "http://127.0.0.1:8000/files/"+this.jsEncode(item.url);
  }
  jsEncode(param: string) {
    if(param == null || param == "" ) return "";
    let re = /\//gi;
    param = param.replace(re, '>');
   
    return param;
  }
}
