import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../../shared/upload.service';
import { TokenService } from '../../../shared/token.service';
import { SidebarBroadcastService } from '../../../shared/sidebar-broadcast.service';
import { FolderItem } from '../../interfaces/FolderItem';

@Component({
  selector: 'app-folder-creation',
  templateUrl: './folder-creation.component.html',
  styleUrls: ['./folder-creation.component.css']
})

export class FolderCreationComponent implements OnInit {
  
  currentAblum: string;
  newFolderTitle: string;
  errors = null;
  user_id: string;
  currentFolder: FolderItem;
  initialFolder: FolderItem = {
    id: -1,
    title: 'Home',
    is_protected: 0, // false.
    path: 'uploads/' + localStorage.getItem('unique_id') + '/' + localStorage.getItem("current_category") + "/"
  }
  public subFoldersOfCurrent: FolderItem[]; // 
  public rootFoldersOfCurrent: FolderItem[]; // also contains itself.

  constructor(public uploadService: UploadService, private token: TokenService, private broadcastService: SidebarBroadcastService) {
    // this.currentFolder = Object.assign({}, this.initialFolder);
    let current_path = localStorage.getItem("current_path");
    let loc_array = current_path.split("/");
    this.currentAblum = loc_array[loc_array.length - 1];
    let path_array = current_path.split("/");
    let title, path = 'uploads/' + localStorage.getItem('unique_id') + '/' + localStorage.getItem("current_category") + "/";
    if(path_array.length > 1) {
      title = path_array[path_array.length - 1];
      for(var i = 1; i < path_array.length; i++) {
        path += path_array[i] + '/';
      }
    }
    else {
      title = 'Home';
    }
    this.currentFolder = {
      id: -1,
      title: title,
      is_protected: 0, // false.
      path: path
    }
    this.user_id = localStorage.getItem('user_id');
    this.rootFoldersOfCurrent = [this.initialFolder];
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('current_path'));
    this.updateCurrentFolder(this.currentFolder);
  }

  updateCurrentFolder(p_currentFolder) {
    this.currentFolder = p_currentFolder;
    let requestPayload = {
      user_id: this.user_id,
      currentFolder: this.currentFolder
    };
    this.uploadService.getSubFolders(requestPayload).subscribe(
      result => {
        this.subFoldersOfCurrent = result;
      },
      error => {
        this.errors = error.error;
      }, () => {
        //
        this.updataFolderPathBar();
      }
    );
  }

  updataFolderPathBar() {
    let tmp_path = this.currentFolder.path.replace('uploads/' + localStorage.getItem('unique_id') + '/', '').split('/');
    this.rootFoldersOfCurrent = [this.initialFolder];
    let real_path = 'uploads/' + localStorage.getItem('unique_id') + '/';
    for (let item in tmp_path) {
      if(tmp_path[item] === "") continue;
      real_path += tmp_path[item] + '/';
      this.rootFoldersOfCurrent.push({
        id: -2, // I don't know.
        title: tmp_path[item],
        is_protected: -2, // I don't know.
        path: real_path
      });
    }
  }

  onFolderClicked(selectedFolder) {
    this.updateCurrentFolder(selectedFolder);
  }

  onCreateFolder() {
    
    if(this.newFolderTitle == undefined || this.newFolderTitle == "" ) return;
    let requestPayload = {
      user_id: this.user_id,
      newFolderTitle: this.newFolderTitle,
      currentFolder: this.currentFolder
    };
    this.uploadService.createFolder(requestPayload).subscribe(
      result => {
        this.addSubFolder(result);
      },
      error => {
        this.errors = error.error;
      }, () => {

      }
    );
  }

  addSubFolder(p_newSubFolder) {
    this.subFoldersOfCurrent.push(p_newSubFolder);
    this.newFolderTitle = "";
    this.broadcastService.boradcast("NAVITEMS_CHANGED", null);
  }
}
