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
import { MoveModalComponent } from '../../tools/modals/move-modal/move-modal.component';
import { NavItem } from '../interfaces/nav-item';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Globals } from '../../global';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit {
  @ViewChild(SidebarComponent) child: SidebarComponent;
  hideButtons = true;
  displayedColumns: string[] = ['select', 'title', 'date', 'privacy', 'action'];
  cardItems: CardItem[];
  cardItems_recent: CardItem[];
  dataSource: MatTableDataSource<CardItem>;
  selection_list = new SelectionModel<CardItem>(true, []);
  currentPath = "";
  category = -1; // this means we need photos.
  viewMode: number = 0; //this means now is GirdViewMode(when it's 1 it means ListViewMode).
  rangeMode: number = 0; //this means now is for all medias(when it's 1 it means to be for recent uploaded medias).
  //These are for media percentage.
  allRate: number;
  photoRate: number;
  musicRate: number;
  videoRate: number;
  codeRate: number;
  trashRate: number;

  private dialogRef: any;

  constructor(
    private router: ActivatedRoute,
    private fileviewService: FileviewService,
    private router_1: Router,
    public dialog: MatDialog, 
    private globals: Globals,
    public AccountService: AccountService,

    // private dialogRef: MatDialogRef<MoveModalComponent>
  ) {
    this.router_1.events.subscribe((val) => {

      if (val instanceof NavigationEnd) {
        this.currentPath = this.router.snapshot.paramMap.get("path");
        this.globals.gl_currentPath = this.currentPath;
        localStorage.setItem("current_path", this.currentPath);
        localStorage.setItem("current_category", "photo");
        
      }
    });
  }
  getDiskUsage() {
    let requestPayload = {
      user_id: localStorage.getItem('user_id'),
    }
    this.AccountService.getDiskUsage(requestPayload).subscribe(
      result => {
        this.drawPercentBar(result);
      },
    );
    this.getMedias();
  }
  drawPercentBar(result: any) {
    if(result) {
      
      this.allRate = result['all'];
      this.photoRate = this.musicRate = this.videoRate = this.codeRate = this.trashRate = 0;
      this.trashRate = result['deleted'];
      result['category'].forEach (
        element => {
          switch(element['category']) {
            case 0: this.photoRate = element['diskspace']; break;
            case 1: this.musicRate = element['diskspace']; break;
            case 2: this.videoRate = element['diskspace']; break;
            case 3: this.codeRate = element['diskspace']; break;
          }
        }
      );
    }
  }
  convertToBigUnit(byteSize) {
    if(byteSize < 1000) {
      return byteSize + "byte";
    } else if(byteSize < 1000 * 1000) {
      return Math.round(byteSize / 1000) + "KB";
    } else if(byteSize < 1000 * 1000 * 1000) {
      return Math.round(byteSize / 1000 / 1000) + "MB";
    } else if(byteSize < 1000 * 1000 * 1000 * 1000) {
      return Math.round(byteSize / 1000 / 1000 / 1000) + "GB";
    }
  }
  getMedias() {
    let requestPayload = {
      user_id: localStorage.getItem('user_id'),
      unique_id: localStorage.getItem('unique_id'),
      currentPath: this.currentPath,
      category: this.category
    };
    this.fileviewService.getFileByCategory(requestPayload).subscribe(
      result => {
        this.cardItems = result['total'];
        this.cardItems_recent = result['recent'];
        this.dataSource = new MatTableDataSource<CardItem>(this.cardItems);
        
      },
      error => {

      }, () => {
        //
        
      }
    );
  }
  ngOnInit(): void {
    this.getDiskUsage();
  }
  onTabClick(event) {
    this.selection_list.clear();
    if(event.tab.textLabel == "Home") {
      this.rangeMode = 0;
    } else if(event.tab.textLabel == "Recent uploads") {
      this.rangeMode = 1;
    }
    if(this.rangeMode == 0) {
      this.dataSource = new MatTableDataSource<CardItem>(this.cardItems);
    } else if(this.rangeMode == 1) {
      this.dataSource = new MatTableDataSource<CardItem>(this.cardItems_recent);
    }
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
      },error => {
        // this.errors = error.error;
      }, () => {
        this.selection_list.clear();
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
    window.location.reload();
    // this.cardItems = this.cardItems.filter(function(item) {
    //   return !deletedItems.includes(item);
      
    // });
    // this.dataSource = new MatTableDataSource<CardItem>(this.cardItems);
  
    // this.cardItems_recent = this.cardItems_recent.filter(function(item) {
    //   return !deletedItems.includes(item);
    // });
    // this.dataSource = new MatTableDataSource<CardItem>(this.cardItems_recent);
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
    if(this.rangeMode == 0) {
      this.cardItems = this.cardItems.reverse();
      this.dataSource = new MatTableDataSource<CardItem>(this.cardItems);
    } else if(this.rangeMode == 1) {
      this.cardItems_recent = this.cardItems_recent.reverse();
      this.dataSource = new MatTableDataSource<CardItem>(this.cardItems_recent);
    }
  }

}
