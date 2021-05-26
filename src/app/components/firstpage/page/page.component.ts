import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CustomPageService } from '../../../shared/custom-page.service';
import { AppSettings } from '../../../shared/appSettings';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  public title;
  public content;
  constructor(    
    private router: ActivatedRoute,
    private customPageService: CustomPageService
  ) { 
    this.router.queryParams.subscribe(params => {
      let requestPayload = {
        page_id: params['id']
      };
      this.customPageService.getFolderTree(requestPayload).subscribe(
        result => {
          this.title = result['title'];
          this.content = result['content'];
        }
      );
    }); 
  }

  ngOnInit(): void {
  }

}
