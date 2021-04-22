import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';
import { TokenService } from './shared/token.service';
import { AuthStateService } from './shared/auth-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isSignedIn: boolean;
  event$;
  isLoginRegisterUrl: boolean = true;
  noHeaderUrls: string[] = [
    '/login',
    '/register',
    '/photo-detail',
    '/image-editor',
    '/account',
    '/code',
    '/folder-creation',
    '/music',
    '/photos',
    '/total',
    '/uploading',
    '/video'
  ];

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService
  ) {
    this.event$ = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.isLoginRegisterUrl = this.noHeaderUrls.includes(event.url);
      }
    });
  }

  ngOnInit() {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
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
