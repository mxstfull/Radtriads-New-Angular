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

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  @ViewChild(SidebarComponent) child: SidebarComponent;

  displayedColumns: string[] = ['select', 'title', 'date', 'privacy', 'action'];
  cardItems: CardItem[];
  dataSource: MatTableDataSource<CardItem>;
  selection_list = new SelectionModel<CardItem>(true, []);
  currentPath = "";
  category = 0; // this means we need photos.
  viewMode: number = 0; //this means now is GirdViewMode(when it's 1 it means ListViewMode).
  // folderTree: NavItem;
  private dialogRef: any;
  constructor(
    private router: ActivatedRoute,
    private fileviewService: FileviewService,
    private router_1: Router,
    public dialog: MatDialog, 
    private globals: Globals,
    // private dialogRef: MatDialogRef<MoveModalComponent>
  ) {
    this.router_1.events.subscribe((val) => {

      if (val instanceof NavigationEnd) {
        this.currentPath = this.router.snapshot.paramMap.get("path");
        this.globals.gl_currentPath = this.currentPath;
        localStorage.setItem("current_path", this.currentPath);
        localStorage.setItem("current_category", "photo");

        let requestPayload = {
          user_id: localStorage.getItem('user_id'),
          unique_id: localStorage.getItem('unique_id'),
          currentPath: this.currentPath,
          category: this.category
        };
        this.fileviewService.getFileByCategory(requestPayload).subscribe(
          result => {
            this.cardItems = result;
            this.dataSource = new MatTableDataSource<CardItem>(this.cardItems);
          },
          error => {
    
          }, () => {
            //
    
          }
        );
      }
    });
  }

  ngOnInit(): void {
    
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
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(result)
        a.href = objectUrl
        a.download = 'archive.zip';
        a.click();
        URL.revokeObjectURL(objectUrl);
      },error => {
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
      },error => {
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

    let fileArray =[];
    for(let index in requestPayload) {
      fileArray.push ({
        unique_id: requestPayload[index]['unique_id'],
        title: requestPayload[index]['title'],
        url: requestPayload[index]['url']
      });
    }
    let modalData ={
      folderTree: this.child.folderTree,
      fileList: fileArray, 
      action: m_action
    };
    this.dialogRef = this.dialog.open(MoveModalComponent, {
      data: modalData,
      width: '600px',
    });
    this.dialogRef.afterClosed().subscribe(
      (result: any) => {
        if(m_action == 'Move') {
          this.cardItems = this.cardItems.filter(function(item) {
            return !requestPayload.includes(item);
          });
          this.dataSource = new MatTableDataSource<CardItem>(this.cardItems);
        }
        this.selection_list.clear() ;
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
  jsEncode(param: string){
    if(param == null || param == "" ) return "";
    let re = /\//gi;
    param = param.replace(re, '>');
    return param;
  }
  viewImageThumbnail(item: CardItem) {
    if(item.is_picture == 1)
      return "http://127.0.0.1:8000/files/"+this.jsEncode(item.thumb_url);
    else return "assets/img/thumb-"+item.ext+".png";
  }
  openDialog(type: string, item: CardItem) {
    
    if (type === "privacy") {
      this.dialogRef = this.dialog.open(PrivacyModalComponent, {
        data: item,
        width: '600px',
      });
      this.dialogRef.afterClosed().subscribe(
        (        result: any) => {
          item.is_protected = Number(result);
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
          if(result != true) {
            this.deleteItems(result);
          }
      })
    }
  }
  deleteItems(deletedItems: CardItem[]) {
    this.cardItems = this.cardItems.filter(function(item) {
      return !deletedItems.includes(item);
    });
    this.dataSource = new MatTableDataSource<CardItem>(this.cardItems);
  }
  onDeleteFiles() {
    if(this.selection_list.selected.length == 0) return;
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
  onSortClicked() {
    this.cardItems = this.cardItems.reverse();
    this.dataSource = new MatTableDataSource<CardItem>(this.cardItems);
  }
}
