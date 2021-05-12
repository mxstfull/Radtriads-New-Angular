import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, Output, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NavService } from './nav-service';
import { NavItem } from '../interfaces/nav-item';

import { SidebarBroadcastService } from '../../shared/sidebar-broadcast.service';
import { SidebarService } from '../../shared/sidebar.service';

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

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private navService: NavService,
    private broadcastService: SidebarBroadcastService,
    private sidebarService: SidebarService
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
  ngOnInit(): void {
    this.imgNavItems = ["../../../assets/img/Folder.png", 
    "../../../assets/img/photo.png", 
    "../../../assets/img/music.png", 
    "../../../assets/img/video.png", 
    "../../../assets/img/code.png",
    "../../../assets/img/trash.png"];
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
  setSidebarNavItems(result: any) {
    this.navItems = result;
    let label = ['Photo', 'Music', 'Video', 'Code'];
    this.navItems[0]['iconName'] = this.imgNavItems[0];
    for (let i = 1; i <= 4; i++) {
      // this.navItems[i] = Object.assign({}, result) ;
      this.navItems[i]['displayName'] = label[i - 1];
      this.navItems[i]['path'] = 'home';
      this.navItems[i]['iconName'] = this.imgNavItems[i];
      if (i == 1) {
        this.folderTree = Object.assign({}, this.navItems[i]);
        this.folderTree['displayName'] = 'Home';
      }
    }
    this.navItems[5] = {
      displayName: "Trash",
      iconName: this.imgNavItems[5],
      path: "",
      category: "deleted",
      children: null
    };
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

}
