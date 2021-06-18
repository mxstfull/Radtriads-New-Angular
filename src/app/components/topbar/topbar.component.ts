import { Component, OnInit, Output,Input, EventEmitter, HostListener } from '@angular/core';
import { AccountService } from 'src/app/shared/account.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';
import { AppSettings } from '../../shared/appSettings';
import { ConfirmationComponent } from "../../shared/confirmation/confirmation.component";
import { AlertComponent } from '../../shared/alert/alert.component';
import { MatDialog } from "@angular/material/dialog";
import { FileviewService } from '../../shared/fileview.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  isSticky: boolean = false;
  @Output()
  onDownloadAlbum = new EventEmitter<string>();
  @Output()
  onRenameAlbum = new EventEmitter<string>();
  @Input()
  hideButtons: boolean = false;
  public isAdmin: boolean = false;
  public adminURL: string;
  searchText: string;

  @Output() searchcriteria = new EventEmitter<String>();
  searchThis() {
    this.searchcriteria.emit(this.searchText)
  }
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 150;
  }
  constructor(    
    public AccountService: AccountService,
    private token: TokenService,
    public router: Router,
    public authService: AuthService,
    public dialog: MatDialog,
    public fileviewService: FileviewService,
    ) { 
    this.isAdmin = localStorage.getItem('rank') == "1";
    this.adminURL = AppSettings.backendURL+"admin";

  }
  allRate: number = 0;
  usedRate: number;
  ngOnInit(): void {
    this.allRate = Number(localStorage.getItem('allRate'));
    this.usedRate = Number(localStorage.getItem('usedRate'));
    if(this.allRate == 0 && this.usedRate == 0) 
      this.allRate = 1;
    else if(this.allRate < this.usedRate)
      this.usedRate = this.allRate;
  }
  downloadAlbum() {
    this.onDownloadAlbum.emit();
  }
  renameAlbum() {
    this.onRenameAlbum.emit();
  }
  logout() {
    let requestPayload = null
    this.authService.logout(requestPayload).subscribe(
      result => {
      },
      error => {

      },() => {
        this.token.removeToken();
        localStorage.clear();
        this.router.navigate(['landing']);
      }
    );
    
  }
  getPercent() {
    return Math.round(this.usedRate * 100 / this.allRate);
  }
  // search_changed()
  // {
  //   console.log(this.searchText);
  // }
  deleteAlbum() {
    if(localStorage.getItem("current_path") == "home") {
      this.dialog.open(AlertComponent, {
        data: {
          message: 'This album can not be removed!',
          buttonText: {
            cancel: 'Close'
          }
        },
      });
      return;
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        let requestPayload = {
          user_id: localStorage.getItem('user_id'),
          unique_id: localStorage.getItem('unique_id'),
          currentPath: localStorage.getItem('current_path'),
          category: localStorage.getItem('current_category')
        };
        this.fileviewService.deleteAlbum(requestPayload).subscribe(
          result => {
            let urlArray = localStorage.getItem("current_path").split("/");
            if(urlArray.length == 0) this.router.navigate(['total']);
            else {
              let newPath = "";
              for(var i = 0; i < urlArray.length - 1; i++) {
                if(i) newPath += "/";
                newPath += urlArray[i];
              }
              if(newPath == requestPayload.category) newPath = "home";
              this.router.navigate([requestPayload.category, newPath]);
              window.location.reload();
            }
          },
          error => {
    
          }, () => {
            //
          }
        );
      }
    });

    
  }
}
