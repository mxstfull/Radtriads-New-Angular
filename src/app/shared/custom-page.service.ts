import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './appSettings';

@Injectable({
  providedIn: 'root'
})
export class CustomPageService {

  constructor(private http: HttpClient) { }
  getFolderTree(requestPayload: object): Observable<any> {
    return this.http.post(AppSettings.backendURL+'api/customPage/getPageById', requestPayload);
  }
}
