import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FileviewService } from '../../shared/fileview.service';
import { CardItem } from '../interfaces/CardItem';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrivacyModalComponent } from '../../tools/modals/privacy-modal/privacy-modal.component';
import { ShareModalComponent } from '../../tools/modals/share-modal/share-modal.component';
import { RenameModalComponent } from '../../tools/modals/rename-modal/rename-modal.component';
import { DeleteModalComponent } from '../../tools/modals/delete-modal/delete-modal.component';

import { NavItem } from '../interfaces/nav-item';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Globals } from '../../global';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  @ViewChild(SidebarComponent) child: SidebarComponent;
  hideButtons = true;
  displayedColumns: string[] = ['select', 'title', 'date', 'privacy'];
  cardItems: CardItem[];
  dataSource: MatTableDataSource<CardItem>;
  selection_list = new SelectionModel<CardItem>(true, []);
  currentPath = "";
  category = -2; // this means we need deleted medias.
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
        localStorage.setItem("current_category", "deleted");
        
      }
    });
  }

  ngOnInit(): void {
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
    param = param.replace(re, '>');
    return param;
  }
  viewImageThumbnail(item: CardItem) {
    if (item.is_picture == 1)
      return "http://127.0.0.1:8000/files/" + this.jsEncode(item.thumb_url);
    else return "assets/img/thumb-" + item.ext + ".png";
  }
  openDialog(type: string, item: CardItem) {

    if (type === "privacy") {
      this.dialogRef = this.dialog.open(PrivacyModalComponent, {
        data: item,
        width: '600px',
      });
      this.dialogRef.afterClosed().subscribe(
        (result: any) => {
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
          if (result != true) {
            this.deleteItems(result);
          }
        })
    }
  }
  deleteItems(deletedItems: CardItem[]) {
    this.cardItems = this.cardItems.filter(function (item) {
      return !deletedItems.includes(item);
    });
    this.dataSource = new MatTableDataSource<CardItem>(this.cardItems);
  }

  onSortClicked() {
    this.cardItems = this.cardItems.reverse();
    this.dataSource = new MatTableDataSource<CardItem>(this.cardItems);
  }
  onRecoverFiles() {
    if(this.selection_list.selected.length == 0) return;
    if (!window.confirm("Are you sure you want to recover these files?")) return;
    let requestPayload = {
      item: this.selection_list.selected,
    };
    this.fileviewService.recoverFiles(requestPayload).subscribe(
      result => {
        this.deleteItems(this.selection_list.selected);
        this.selection_list.clear();
      },
      error => {
        console.log(error);
      }, () => {
        //
      }
    );
    
  }
  onDeleteFiles() {
    if(this.selection_list.selected.length == 0) return;
    if (!window.confirm("Are you sure you want to delete these files forever?")) return;
    let requestPayload = {
      item: this.selection_list.selected,
    };

    this.fileviewService.permanentlyDeleteFiles(requestPayload).subscribe(
      result => {
        this.deleteItems(this.selection_list.selected);
        this.selection_list.clear();
      },
      error => {
        console.log(error);
      }, () => {
        //
      }
    );
  }
}
