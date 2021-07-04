import { Component, OnInit, HostListener } from '@angular/core';
import { AuthStateService } from '../../shared/auth-state.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../shared/config.service';
import { AppSettings } from '../../shared/appSettings';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  public perioudOption = false;
  isSticky: boolean = false;
  logoUrl: string = null;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }
  constructor(
    private authState: AuthStateService,
    public router: Router,
    public configService: ConfigService
  ) {
    if(this.authState.getAuthState()) {
      this.router.navigate(['total']);    
    }
    let payLoad = null;
    this.configService.getFolderTree(payLoad).subscribe(
      result => {
        this.logoUrl = result['config_value'];
      }
    );
  }

  ngOnInit(): void {
  }
  register(param) {
    if(this.perioudOption)
      param = param + "_yearly";
    else param = param + "_monthly";
    this.router.navigate(['register'], {queryParams:{plan: param}});
  }
  viewLogo() {
    if(!this.logoUrl) return;
    return AppSettings.backendURL+"files/"+this.jsEncode(this.logoUrl);
  }
  jsEncode(param: string){
    if(param == null || param == "" ) return "";
    let re = /\//gi;
    param = param.replace(re, '~');
    return param;
  }
}
