import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private ngUnsubscribe = new Subject();
  public currentActiveNav: string = "";

  public album: Object[] = [
    {
      nodeId: '01', nodeText: 'First Folder'
    },
    {
      nodeId: '02', nodeText: 'Second Folder'
    },
    {
      nodeId: '03', nodeText: 'Third Folder'
    },
    {
      nodeId: '04', nodeText: 'Fourth Folder',
      nodeChild: [
        { nodeId: '04-01', nodeText: 'Fourth-one', iconCss: 'icon-circle-thin icon' },
        { nodeId: '04-02', nodeText: 'Fourth-one', iconCss: 'icon-circle-thin icon' },
        { nodeId: '04-03', nodeText: 'Fourth-one', iconCss: 'icon-circle-thin icon' },
        { nodeId: '04-04', nodeText: 'Fourth-one', iconCss: 'icon-circle-thin icon' },
        { nodeId: '04-05', nodeText: 'Fourth-one', iconCss: 'icon-circle-thin icon' },
        { nodeId: '04-06', nodeText: 'Fourth-one', iconCss: 'icon-circle-thin icon' }
      ]
    },
  ];
  public field: Object = { dataSource: this.album, id: 'nodeId', text: 'nodeText', child: 'nodeChild' };

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getActiveRoutes();
      }
    });
  }
  getActiveRoutes() {
    this.currentActiveNav = this.router.url;
    this.cdr.detectChanges();
  }
  ngOnInit(): void {
  }

}
