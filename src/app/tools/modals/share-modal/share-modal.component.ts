import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardItem } from '../../../components/interfaces/CardItem';
import { AppSettings } from '../../../shared/appSettings';


@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.css']
})
export class ShareModalComponent {
  show_direct_link: number;
  show_forum_code: number;
  show_html_code: number;
  show_social_share: number;

  direct_link: string;
  forum_code: string;
  html_code: string;
  social_share: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.show_direct_link = parseInt(localStorage.getItem('show_direct_link'));
    this.show_forum_code = parseInt(localStorage.getItem('show_forum_code'));
    this.show_html_code = parseInt(localStorage.getItem('show_html_code'));
    this.show_social_share = parseInt(localStorage.getItem('show_social_share'));

    this.direct_link = AppSettings.backendURL+"files/" + this.jsEncode(data.data.url);
    this.forum_code = "[IMG]"+AppSettings.backendURL+"files/" + this.jsEncode(data.data.url) + "[/IMG]";
    this.html_code = "<a href='"+AppSettings.frontendURL+"/photo-details?id=" + data.data.unique_id + "'><img src='" + AppSettings.backendURL+"files/" + this.jsEncode(data.data.url) + "' /></a>";

  }
  jsEncode(param: string) {
    if (param == null || param == "") return "";
    let re = /\//gi;
    param = param.replace(re, '~');
    return param;
  }
  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  setFacebookSharingParam() {
    return "https://facebook.com/sharer/sharer.php?u="+AppSettings.frontendURL+"/photo-details?id="+this.data.data.unique_id;
  }
  setTwitterSharingParam() {
    return "https://twitter.com/share?url="+AppSettings.frontendURL+"/photo-details?id="+this.data.data.unique_id+"&amp;text=User friendly image and video hosting & sharing on web and mobile. Privacy controlled by you. Dynamic resizing, cropping on site. Social Media sharing. Made by users for users.";
  }
  setPinterestSharingParam() {
    return "https://pinterest.com/pin/create/bookmarklet/?&amp;url="+AppSettings.frontendURL+"/photo-details?id="+this.data.data.unique_id+"&amp;description=User friendly image and video hosting & sharing on web and mobile. Privacy controlled by you. Dynamic resizing, cropping on site. Social Media sharing. Made by users for users.";
  }
  setWhatsappSharingParam() {
    return "whatsapp://send?text="+AppSettings.frontendURL+"/photo-details?id="+this.data.data.unique_id+"User friendly image and video hosting & sharing on web and mobile. Privacy controlled by you. Dynamic resizing, cropping on site. Social Media sharing. Made by users for users.";
  }
  setEmailSharingParam() {
    return "mailto:?subject=User friendly image and video hosting & sharing on web and mobile. Privacy controlled by you. Dynamic resizing, cropping on site. Social Media sharing. Made by users for users.&amp;body="+AppSettings.frontendURL+"/photo-details?id="+this.data.data.unique_id;
  }

}
