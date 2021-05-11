import { Component, OnInit } from '@angular/core';
import { AuthStateService } from '../../shared/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private authState: AuthStateService,
    public router: Router,
  ) {
    if(this.authState.getAuthState()) {
      this.router.navigate(['total']);
    }
  }

  ngOnInit(): void {
  }

}
