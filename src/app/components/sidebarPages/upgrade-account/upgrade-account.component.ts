import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upgrade-account',
  templateUrl: './upgrade-account.component.html',
  styleUrls: ['./upgrade-account.component.css']
})
export class UpgradeAccountComponent implements OnInit {

  hideButtons:boolean = true;
  public perioudOption: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }
  register(param: string) {
    if(this.perioudOption)
      param = param + "_yearly";
    else param = param + "_monthly";
    
  }

}
