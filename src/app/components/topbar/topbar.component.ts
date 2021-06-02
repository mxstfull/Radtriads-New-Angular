import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import { AccountService } from 'src/app/shared/account.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';
import { Router } from '@angular/router';
import { AppSettings } from '../../shared/appSettings';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
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

  constructor(    
    public AccountService: AccountService,
    private token: TokenService,
    public router: Router,
    public authService: AuthService
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
        console.log(result);
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
}
