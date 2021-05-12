import { Component, OnInit, HostListener } from '@angular/core';
import { AuthStateService } from '../../shared/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  public perioudOption = false;
  isSticky: boolean = false;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }
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
  register(param) {
    if(this.perioudOption)
      param = param + "_yearly";
    else param = param + "_monthly";
    this.router.navigate(['register'], {queryParams:{plan: param}});
  }
}
