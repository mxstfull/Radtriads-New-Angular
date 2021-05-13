import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './appSettings';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }
  // get subFolders
  getSubFolders(requestPayload: object): Observable<any> {
    return this.http.post(AppSettings.backendURL+'api/fileupload/getSubFolders', requestPayload);
  }
  // folder creation
  createFolder(requestPayload: object): Observable<any> {
    return this.http.post(AppSettings.backendURL+'api/fileupload/createFolder', requestPayload);
  }

}
