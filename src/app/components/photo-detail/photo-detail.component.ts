import { Component, OnInit } from '@angular/core';
import { CardItem } from '../interfaces/CardItem';
import { FileviewService } from '../../shared/fileview.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DeleteModalComponent } from '../../tools/modals/delete-modal/delete-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShareModalComponent } from '../../tools/modals/share-modal/share-modal.component';
import { AppSettings } from '../../shared/appSettings';
import { ConfirmationComponent } from "../../shared/confirmation/confirmation.component";
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {

  private dialogRef: any;
  public currentItem: CardItem;
  public protected: number;
  public wrongPassword: boolean = false;
  public passwordInput: string;
  constructor(
    private fileviewService: FileviewService,
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private router_normal: Router,
    private meta: Meta
  ) {
    let meta_url = "";
    let meta_title = "";
    let meta_img = "";
    this.router.queryParams.subscribe(params => {
      let m_unique_id = params['id'];
      let requestPayload = {
        unique_id: m_unique_id,
      };
      this.fileviewService.getItemByUniqueId(requestPayload).subscribe(
        result => {
          if (!result) {
          }
          else {
            this.protected = result['is_protected'];
            if (result['user_id'] == localStorage.getItem('user_id')) this.protected = 0;
            this.currentItem = result;
            localStorage.setItem('currentItemForEditor', this.viewImageDetail(this.currentItem));

            meta_title = "RadTriads - File #" + m_unique_id;
            meta_url = AppSettings.frontendURL + "/photo-details?id=" + m_unique_id;
            meta_img = this.viewImageDetail(this.currentItem);
            this.meta.updateTag(
              { property: "og:url", content: meta_url },
              "name='og:url'"
            );
            this.meta.updateTag(
              { property: "og:title", content: meta_title },
              "name='og:title'"
            );
            this.meta.updateTag(
              { property: "og:image", content: meta_img },
              "name='og:image'"
            );
          }
        }, error => {
          // this.errors = error.error;

        }, () => {
        }
      );
    });

  }

  confirmPassword() {
    if (this.currentItem.password != this.passwordInput) this.wrongPassword = true;
    else this.protected = 0;
  }
  ngOnInit(): void {

  }
  viewImageDetail(item: CardItem) {
    if (item == null) return;
    return AppSettings.backendURL + "files/" + this.jsEncode(item.url);
  }
  jsEncode(param: string) {
    if (param == null || param == "") return "";
    let re = /\//gi;
    param = param.replace(re, '>');
    return param;
  }
  getCreatedDateAsString() {
    if (!this.currentItem) return;
    var d = new Date(this.currentItem.created_at);
    return d.toLocaleString();
  }
  onDeleteItem() {
    // let requestPayload = {
    //   item: [this.currentItem],
    // }
    // this.fileviewService.deleteFile(requestPayload).subscribe(
    //   result => {
    //     if(result) history.back();
    //   },
    //   error => {

    //   }, () => {
    //     //

    //   }
    // );
    this.dialogRef = this.dialog.open(DeleteModalComponent, {
      data: [this.currentItem],
      width: '600px',
    });
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result) history.back();
      }, error => {
      }, () => {

      })
  }
  onDownloadItem() {
    let requestPayload = [this.currentItem];
    let urlArray = [];
    for (let item in requestPayload) {
      urlArray.push({
        title: requestPayload[item].title,
        url: requestPayload[item].url
      });
    }
    this.fileviewService.downloadFiles({ fileList: urlArray }).subscribe(
      result => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(result);
        a.href = objectUrl;
        if (urlArray.length == 1) {
          a.download = urlArray[0]['title'];
        } else {
          a.download = 'archive.zip';
        }
        a.click();
        URL.revokeObjectURL(objectUrl);
      }, error => {
        // this.errors = error.error;
      }, () => {

      }
    );
  }
  openDialog(type: string) {
    if (type == "share") {
      if (localStorage.getItem('show_direct_link') == "0" &&
        localStorage.getItem('show_forum_code') == "0" &&
        localStorage.getItem('show_html_code') == "0" &&
        localStorage.getItem('show_social_share') == "0") {
        return;
      }
      this.dialog.open(ShareModalComponent, {
        data: {
          data: this.currentItem
        },
        width: '740px',
      });
    }
  }
  showEditWindow() {
    this.router_normal.navigate(['/image-editor'], { queryParams: { id: this.currentItem.unique_id } });
  }
}
