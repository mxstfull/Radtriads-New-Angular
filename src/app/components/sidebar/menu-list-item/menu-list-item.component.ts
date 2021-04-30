import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { NavItem } from '../../interfaces/nav-item';
import { Router } from '@angular/router';
import { NavService } from '../nav-service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Globals } from '../../../global';
@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {

  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;

  constructor(public navService: NavService,
    public router: Router, private globals: Globals) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.path && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`${this.item.path}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }

  onItemSelected(item: NavItem) {
    this.globals.gl_currentPath = item.path;
    this.router.navigate([item.category, item.path]);
    // if (!item.children || !item.children.length) {
    //   this.router.navigate([item.route]);
    //   this.navService.closeNav();
    // }
  }

  onIconSelected(item: NavItem) {
    // if (!item.children || !item.children.length) {
    //   this.router.navigate([item.route]);
    //   this.navService.closeNav();
    // }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

}
