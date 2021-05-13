import { EventEmitter, Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NavItem } from '../interfaces/nav-item';

@Injectable()
export class NavService {

    public appDrawer: any;
    public currentUrl = new BehaviorSubject<string>(undefined);
    private folderTreeSource = new BehaviorSubject<NavItem>(undefined);
    folderTree = this.folderTreeSource.asObservable();

    constructor(private router: Router) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                
                this.currentUrl.next(event.urlAfterRedirects);
            }
        });
    }

    public closeNav() {
        this.appDrawer.close();
    }

    public openNav() {
        if(this.appDrawer)
            this.appDrawer.open();
    }
    changeFolderTree(tree: NavItem) {
        this.folderTreeSource.next(tree);
    }
}
