import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, Output, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NavService } from './nav-service';
import { NavItem } from '../interfaces/nav-item';

import { SidebarBroadcastService } from '../../shared/sidebar-broadcast.service';
import { SidebarService } from '../../shared/sidebar.service';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  private ngUnsubscribe = new Subject();
  public currentActiveNav: string = "";
  @ViewChild('appDrawer') appDrawer: ElementRef;
  navItems: NavItem[] = [];
  folderTree: NavItem;
  imgNavItems: string[] = [];

  allRate: number = 0;
  usedRate: number;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private navService: NavService,
    private broadcastService: SidebarBroadcastService,
    private sidebarService: SidebarService,
    public AccountService: AccountService,
  ) {
    
    this.router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getActiveRoutes();
      }
    });
    this.navService.openNav();
    this.broadcastService.subscribe("NAVITEMS_CHANGED", () => { this.getSidebarNavItems(); });
    this.getSidebarNavItems();
  }
  closeNav() {
    this.navService.closeNav();
  }
  ngOnInit(): void {
    let requestPayload = {
      user_id: localStorage.getItem('user_id'),
    }
    this.AccountService.getDiskUsage(requestPayload).subscribe(
      result => {
        this.allRate = this.usedRate = 0;
        this.allRate = result['all'] ? result['all'] : 0;
        this.usedRate = parseInt(result['used_all']) ? parseInt(result['used_all']) : 0;
        localStorage.setItem('allRate', this.allRate + "");
        localStorage.setItem('usedRate', this.usedRate + "");
      },
    );
  }
  convertToBigUnit(byteSize) {
    if (byteSize < 1000) {
      return byteSize + "byte";
    } else if (byteSize < 1000 * 1000) {
      return Math.round(byteSize / 1000) + "KB";
    } else if (byteSize < 1000 * 1000 * 1000) {
      return Math.round(byteSize / 1000 / 1000) + "MB";
    } else if (byteSize < 1000 * 1000 * 1000 * 1000) {
      return Math.round(byteSize / 1000 / 1000 / 1000) + "GB";
    }
  }
  getSidebarNavItems() {
    let requestPayload = {
      user_id: localStorage.getItem('user_id'),
      unique_id: localStorage.getItem('unique_id')
    };
    this.sidebarService.getFolderTree(requestPayload).subscribe(
      result => {
        this.setSidebarNavItems(result);
      },
      error => {
        // this.errors = error.error;
      }, () => {

      }
    );
  }
  setSidebarNavItems(result: NavItem[]) {

    this.navItems = result;
    let imgNavItems = ["../../../assets/img/Folder.png",
      "../../../assets/img/photo.png",
      "../../../assets/img/music.png",
      "../../../assets/img/video.png",
      "../../../assets/img/code.png",
      "../../../assets/img/trash.png"];
    for (let i = 0; i < 6; i++) {
      this.navItems[i]['displayName'] = this.navItems[i]['displayName'] == '' ? this.navItems[i]['category'] : this.navItems[i]['displayName'];
      this.navItems[i]['path'] = 'home';
      this.navItems[i]['iconName'] = imgNavItems[i];
      if (i == 1) {
        this.folderTree = Object.assign({}, this.navItems[i]);
      }
      if (i == 5) {
        this.navItems[i]['children'] = null;
        this.navItems[i]['category'] = 'deleted';
      }
    }
    //if(this.currentActiveNav.indexOf(substring) !== -1)
    // if(this.currentActiveNav == '/trash'){
    //   this.navItems[5].selected = true;
    // }
  }
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  getActiveRoutes() {
    this.currentActiveNav = this.router.url;
    this.cdr.detectChanges();
  }

  getClass(path: string) {
    console.log(this.currentActiveNav.slice(1) === path);
    return (this.currentActiveNav.slice(1) === path) ? 'active' : '';
  }

  itemChanged(selectedItem: NavItem) {
    console.log(selectedItem);
  }

}
