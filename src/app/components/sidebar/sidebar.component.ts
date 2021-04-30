import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
    for(let i = 0; i < 4; i++) {
      // this.navItems[i] = Object.assign({}, result) ;
      this.navItems[i]['displayName'] = label[i];
      this.navItems[i]['path'] = 'home';
    }
  }
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  getActiveRoutes() {
    this.currentActiveNav = this.router.url;
    this.cdr.detectChanges();
  }

}
