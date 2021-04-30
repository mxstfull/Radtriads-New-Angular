import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private http: HttpClient) { }
  getFolderTree(requestPayload: object): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/fileupload/getFolderTree', requestPayload);
  }
}
