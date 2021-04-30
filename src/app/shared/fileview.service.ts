import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileviewService {

  constructor(private http: HttpClient) {

  }
  
  getFileByCategory(requestPayload: object): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/fileview/getFileByCategory', requestPayload);
  }
  // download files.
  downloadFiles(requestPayload: object): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/downloadFiles', requestPayload);
  }
}
