
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FileviewService } from '../../../shared/fileview.service';
import { CardItem } from '../../interfaces/CardItem';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrivacyModalComponent } from '../../../tools/modals/privacy-modal/privacy-modal.component';
import { ShareModalComponent } from '../../../tools/modals/share-modal/share-modal.component';
import { RenameModalComponent } from '../../../tools/modals/rename-modal/rename-modal.component';
import { DeleteModalComponent } from '../../../tools/modals/delete-modal/delete-modal.component';
import { MoveModalComponent } from '../../../tools/modals/move-modal/move-modal.component';

import { NavItem } from '../../interfaces/nav-item';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { Globals } from '../../../global';
import { NavService } from '../../sidebar/nav-service';
import { AppSettings } from '../../../shared/appSettings';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  // @ViewChild(SidebarComponent) child: SidebarComponent;
  breadcrumbList = [];
  sort_label = ["Date", "Name"];
  sort_mode = 0; //0:date, 1:name
  displayedColumns: string[] = ['select', 'title', 'date', 'privacy', 'action'];
  cardItems: CardItem[];
  dataSource: MatTableDataSource<CardItem>;
  selection_list = new SelectionModel<CardItem>(true, []);
  currentPath = "";
  category = 3; // this means we need codes.
  viewMode: number = 0; //this means now is GirdViewMode(when it's 1 it means ListViewMode).
  folderTree: NavItem;
  pageNumber: number = 0;

  private dialogRef: any;
  constructor(
    private router: ActivatedRoute,
    private fileviewService: FileviewService,
    private router_1: Router,
    public dialog: MatDialog,
    private globals: Globals,
    private navService: NavService

    // private dialogRef: MatDialogRef<MoveModalComponent>
  ) {
    this.router_1.events.subscribe((val) => {

      if (val instanceof NavigationEnd) {
        this.currentPath = this.router.snapshot.paramMap.get("path");
        this.globals.gl_currentPath = this.currentPath;
        localStorage.setItem("current_path", this.currentPath);
        localStorage.setItem("current_category", "Code");
        this.getItems();
        let tmpList = this.currentPath.split("/");
        this.breadcrumbList = [];
        let path = "";
        for(let i = 0; i< tmpList.length; i++) {
          let name;
          if(!i) {
            name = "Code";
            path = "home";

          }
          else {
            name = tmpList[i];
            path += "/" + tmpList[i];
          }
          this.breadcrumbList.push({"name": name, "category": "../../Code", "path": path});
          if(!i) path = "Code";
        }
      }
    });
  }
  getItems(searchText = "") {
    let requestPayload = {
      user_id: localStorage.getItem('user_id'),
      unique_id: localStorage.getItem('unique_id'),
      currentPath: this.currentPath,
      category: this.category,
      searchText: searchText
    };
    this.fileviewService.getFileByCategory(requestPayload).subscribe(
      result => {
        this.cardItems = result;
        this.dataSource = new MatTableDataSource<CardItem>(this.cardItems);
        this.onSortClicked(0); //this means no need to change method.
      },
      error => {

      }, () => {
        //

      }
    );
  }
  ngOnInit(): void {
    this.navService.folderTree.subscribe(folderTree => this.folderTree = folderTree);
  }
  onDownloadFiles() {
    let requestPayload = this.selection_list.selected;
    if (requestPayload.length == 0) return;
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
        
        if(urlArray.length == 1) {
          a.download = urlArray[0]['title'];
        } else {
          a.download = 'archive.zip';
        }
        a.click();
        URL.revokeObjectURL(objectUrl);
      }, error => {
        // this.errors = error.error;
      }, () => {
        this.selection_list.clear();
      }
    );
  }
  onDownloadAlbum() {
    let urlArray = this.cardItems;
    if(urlArray.length == 0) return;
    this.fileviewService.downloadFiles({ fileList: urlArray }).subscribe(
      result => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(result);
        a.href = objectUrl;
        if(urlArray.length == 1) {
          a.download = urlArray[0]['title'];
        } else {
          a.download = 'archive.zip';
        }
        a.click();
        URL.revokeObjectURL(objectUrl);
      }, error => {
        // this.errors = error.error;
      }, () => {
        this.selection_list.clear();
      }
    );
  }
  onRenameAlbum() {
    if(localStorage.getItem("current_path") == "home") return;
    this.dialogRef = this.dialog.open(RenameModalComponent, {
      data: {
        data: null,
        type: 'album'
      },
      width: '600px',
    });
  }
  onMoveOrCopyFiles(m_action: any) {
    let requestPayload = this.selection_list.selected;
    if (requestPayload.length == 0) return;

    let fileArray = [];
    for (let index in requestPayload) {
      fileArray.push({
        unique_id: requestPayload[index]['unique_id'],
        title: requestPayload[index]['title'],
        url: requestPayload[index]['url']
      });
    }
    let modalData = {
      folderTree: this.folderTree,
      fileList: fileArray,
      action: m_action
    };
    this.dialogRef = this.dialog.open(MoveModalComponent, {
      data: modalData,
      width: '600px',
    });
    this.dialogRef.afterClosed().subscribe(
      (result: any) => {
        if (m_action == 'Move') {
          this.cardItems = this.cardItems.filter(function (item) {
            return !requestPayload.includes(item);
          });
          this.dataSource = new MatTableDataSource<CardItem>(this.cardItems);
        }
        this.selection_list.clear();
      });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection_list.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection_list.clear() :
      this.dataSource.data.forEach((row: CardItem) => this.selection_list.select(row));
  }

  // arrayOne(n: number): any[] {
  //   return Array(n);
  // }
  setGridViewMode(): void {
    this.viewMode = 0;
  }
  setListViewMode(): void {
    this.viewMode = 1;
  }
  convertToPrivacyString(param: number) {
    if (param === 0) return "public";
    else return "private";
  }
  convertoToString(param: any) {
    return new Date(param).toLocaleDateString('en-us');
  }
  jsEncode(param: string) {
    if (param == null || param == "") return "";
    let re = /\//gi;
    param = param.replace(re, '~');
    return param;
  }
  viewImageThumbnail(item: CardItem) {
    let wellknownExtensions = ['flv','html','mov','mp3','mp4','rtf','swf','tif','txt','wav'];
    if(item.is_picture == 1)
      return AppSettings.backendURL+"files/"+this.jsEncode(item.thumb_url);
    else if(wellknownExtensions.includes(item.ext)) {
      return "assets/img/thumb-"+item.ext+".png";
    } else {
      return "assets/img/thumb-other.png";
    }
  }
  openDialog(type: string, item: CardItem) {

    if (type === "privacy") {
      this.dialogRef = this.dialog.open(PrivacyModalComponent, {
        data: item,
        width: '600px',
      });
      this.dialogRef.afterClosed().subscribe(
        (result: any) => {
          if(!result || result == undefined) return;
          item.is_protected = Number(result);
        });
    }
    else if (type === "share") {
      if(localStorage.getItem('show_direct_link') == "0" &&
        localStorage.getItem('show_forum_code') == "0" &&
        localStorage.getItem('show_html_code') == "0" &&
        localStorage.getItem('show_social_share') == "0")
      {
        return;
      }
      this.dialog.open(ShareModalComponent, {
        data: {
          data: item
        },
        width: '740px',
      });
    }
    else if (type === "rename") {
      this.dialogRef = this.dialog.open(RenameModalComponent, {
        data: {
          data: item,
          type: 'file'
        },
        width: '600px',
      });
    }
    else if (type === "delete") {
      this.dialogRef = this.dialog.open(DeleteModalComponent, {
        data: [item],
        width: '600px',
      });
      this.dialogRef.afterClosed().subscribe(
        (result: any) => {
          if (result != true) {
            this.deleteItems(result);
          }
        })
    }
  }
  deleteItems(deletedItems: [CardItem]) {
    this.cardItems = this.cardItems.filter(function (item) {
      return !deletedItems.includes(item);
    });
    this.dataSource = new MatTableDataSource<CardItem>(this.cardItems);
  }
  onDeleteFiles() {
    if (this.selection_list.selected.length == 0) return;
    this.dialogRef = this.dialog.open(DeleteModalComponent, {
      data: this.selection_list.selected,
      width: '600px',
    });
    this.dialogRef.afterClosed().subscribe(
      (result: any) => {
        this.deleteItems(result);
        this.selection_list.clear();
      })
  }
  onSortClicked(change_flag = 1) {
    if(change_flag)this.sort_mode = 1 - this.sort_mode;
    let sort_mode = this.sort_mode;
    if(sort_mode == 0)
      this.cardItems = this.cardItems.sort((a,b) => (a.created_at > b.created_at) ? -1 : ((b.created_at > a.created_at) ? 1 : 0));
    else if(sort_mode == 1)
      this.cardItems = this.cardItems.sort((a,b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : ((b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0));
    this.dataSource = new MatTableDataSource<CardItem>(this.cardItems);
  }
  searchThis(data) {
    this.getItems(data);
  }
}
