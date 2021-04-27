import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }
  // get subFolders
  getSubFolders(requestPayload: object): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/fileupload/getSubFolders', requestPayload);
  }
  // folder creation
  createFolder(requestPayload: object): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/fileupload/createFolder', requestPayload);
  }
}
