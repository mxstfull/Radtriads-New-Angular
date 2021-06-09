import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './appSettings';

@Injectable({
  providedIn: 'root'
})
export class FileviewService {

  constructor(private http: HttpClient) {

  }
  
  getFileByCategory(requestPayload: object): Observable<any> {
    return this.http.post(AppSettings.backendURL+'api/fileview/getFileByCategory', requestPayload);
  }
  downloadFiles(requestPayload: object): Observable<any> {
    return this.http.post(AppSettings.backendURL+'api/fileview/downloadFiles', requestPayload, {responseType: 'blob' });
  }
  moveFiles(requestPayload: object): Observable<any> {
    return this.http.post(AppSettings.backendURL+'api/fileview/moveFiles', requestPayload);
  }
  editFilePrivacy(requestPayload: object): Observable<any> {
    return this.http.post(AppSettings.backendURL+'api/fileview/editFilePrivacy', requestPayload);
  }
  renameFile(requestPayload: object): Observable<any> {
    return this.http.post(AppSettings.backendURL+'api/fileview/renameFile', requestPayload);
  }
  deleteFile(requestPayload: object): Observable<any> {
    return this.http.post(AppSettings.backendURL+'api/fileview/deleteFile', requestPayload);
  }
  renameAlbum(requestPayload: object): Observable<any> {
    return this.http.post(AppSettings.backendURL+'api/fileview/renameAlbum', requestPayload);
  }
  recoverFiles(requestPayload: object): Observable<any> {
    return this.http.post(AppSettings.backendURL+'api/fileview/recoverFiles', requestPayload);
  }
  permanentlyDeleteFiles(requestPayload: object): Observable<any> {
    return this.http.post(AppSettings.backendURL+'api/fileview/permanentlyDeleteFiles', requestPayload);
  }
  getItemByUniqueId(requestPayload: object): Observable<any> {
    return this.http.post(AppSettings.backendURL+'api/fileview/getItemByUniqueId', requestPayload);
  }
  deleteAlbum(requestPayload: object): Observable<any> {
    return this.http.post(AppSettings.backendURL+'api/fileview/deleteAlbum', requestPayload);
  }
}
