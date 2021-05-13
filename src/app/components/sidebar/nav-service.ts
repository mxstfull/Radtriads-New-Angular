import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NavService {
    public appDrawer: any;
    public currentUrl = new BehaviorSubject<string>(undefined);

    constructor(private router: Router) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl.next(event.urlAfterRedirects);
            }
        });
    }

    public closeNav() {
        if (this.appDrawer) {
            //this.appDrawer.close();
            let el = this.appDrawer.nativeElement;
            el.setAttribute('style', 'width: 0px');
        }
    }

    public openNav() {
        if (this.appDrawer) {
            //this.appDrawer.open();
            let el = this.appDrawer.nativeElement;
            el.setAttribute('style', 'width: 250px');
        }
    }
}
