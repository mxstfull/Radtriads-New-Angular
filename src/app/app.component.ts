import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';
import { TokenService } from './shared/token.service';
import { AuthStateService } from './shared/auth-state.service';
import { SidebarBroadcastService } from './shared/sidebar-broadcast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isSignedIn: boolean;
  event$;
  isLoginRegisterUrl: boolean = true;
  // yesHeaderUrls: string[] = [
  //   '/landing',
  //   '/public-mdeia-board',
  //   '/photo-detail'
  // ];

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    private broadcastService: SidebarBroadcastService
  ) {
    // this.event$ = this.router.events.subscribe((event: NavigationEvent) => {
    //   if (event instanceof NavigationStart) {
    //     this.isLoginRegisterUrl = !this.yesHeaderUrls.includes(event.url);
    //   }
    // });
  }

  ngOnInit() {    
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
    this.broadcastService.boradcast("NAVITEMS_CHANGED", null);
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }

  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }
}
