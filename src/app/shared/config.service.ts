import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './appSettings';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }
  getFolderTree(requestPayload: object): Observable<any> {
    return this.http.post(AppSettings.backendURL+'api/config/getLogoUrl', requestPayload);
  }
}
