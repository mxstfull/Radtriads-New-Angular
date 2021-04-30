import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FileviewService } from '../../shared/fileview.service';
import { CardItem } from '../interfaces/CardItem';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  displayedColumns: string[] = ['select', 'title', 'date', 'privacy', 'action'];
  cardItems: CardItem[];
  dataSource;
  selection_list = new SelectionModel<CardItem>(true, []);
  currentPath = "";
  category = 0; // this means we need photos.
  viewMode: number = 0; //this means now is GirdViewMode(when it's 1 it means ListViewMode).
  

  constructor(
    private router: ActivatedRoute ,
    private fileviewService: FileviewService, 
    private router_1: Router
    ) { 
    this.router_1.events.subscribe((val) => {
      
      if(val instanceof NavigationEnd) {
        this.currentPath = this.router.snapshot.paramMap.get("path");
        let requestPayload = {
          user_id: localStorage.getItem('user_id'),
          unique_id: localStorage.getItem('unique_id'),
          currentPath: this.currentPath,
          category: this.category
        };
        this.fileviewService.getFileByCategory(requestPayload).subscribe(
          result => {
            this.cardItems = result;
            this.dataSource = new MatTableDataSource<CardItem>(this.cardItems);
          },
          error => {
            
          }, () => {
            //
            
          }
        );
      }
    });    
  }
 
  ngOnInit(): void {
    
  }
  onDownloadFiles() {
    let requestPayload = {

    };
    this.fileviewService.downloadFiles(requestPayload).subscribe(
      result => {
        console.log(result);
      },
      error => {
        
      }, () => {
        //
        
      }
    );
  }
  onMoveFiles() {
    console.log("download");
  }
  onCopyFiles() {
    console.log("download");
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection_list.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection_list.clear() :
      this.dataSource.data.forEach(row => this.selection_list.select(row));
  }
  
  // arrayOne(n: number): any[] {
  //   return Array(n);
  // }
  setGridViewMode(): void {
    this.viewMode = 0;
  }
  setListViewMode(): void {
    this.viewMode = 1;
  }
  convertToPrivacyString(param: number) {
    if(param === 0) return "public";
    else return "private";
  }
  convertoToString(param: any)
  {
    return new Date(param).toLocaleDateString('en-us');
  }
  jsEncode(param: string){
    let re = /\//gi;
    param = param.replace(re, '>');
    return param;
    //return encodeURIComponent(param);
  }
}
