import { Component, OnInit } from '@angular/core';
import { NavService } from '../sidebar/nav-service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private navService: NavService) { }

  ngOnInit(): void {
  }

  openNav() {
    this.navService.openNav();
  }

}
