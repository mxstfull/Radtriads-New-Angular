import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from './appSettings';

// User interface
// export class MyInfo {
//   Username: string;
//   email: string;
//   old_password: string;
//   new_password: string;
//   new_password_confirmation: string;
// }

// export class ASetting{
//   check_direct: string;
//   check_html: string;
//   check_bulletin: string;
//   check_button: string;
// }

export class Uniq {
  unique_id: string;
}

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  constructor(private http: HttpClient) { }

  GetUserData(value: object): Observable<any> {
    return this.http.post(AppSettings.backendURL + 'api/account/GetUserData', value);
  }

  // User registration
  MyInfo(value: object, val: object): Observable<any> {
    return this.http.post(AppSettings.backendURL + 'api/account/MyInfo', { value, val });
  }

  // Login
  Settings(value: object, val: object): Observable<any> {
    return this.http.post<any>(AppSettings.backendURL + 'api/account/Settings', { value, val });
  }

  // Login
  Privacy(value: object, val: object): Observable<any> {
    return this.http.post<any>(AppSettings.backendURL + 'api/account/Privacy', { value, val });
  }
  //delete Account
  delete(val: object): Observable<any> {
    return this.http.post<any>(AppSettings.backendURL + 'api/account/delete', val);
  }
  //get disk usage.
  getDiskUsage(requestPayload: object): Observable<any> {
    return this.http.post<any>(AppSettings.backendURL + 'api/account/getDiskUsage', requestPayload);
  }
  //upload avatar.
  uploadAvatar(requestPayload: object): Observable<any> {

    var myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    myFormData.append('image', requestPayload['fileToUpload']);
    myFormData.append('unique_id', requestPayload['unique_id']);
 
    return this.http.post<any>(AppSettings.backendURL + 'api/account/uploadAvatar', myFormData, { headers: headers });
  }
}
