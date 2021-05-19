import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PlanStateService {

  constructor(private http: HttpClient) { }

  getPlan(): any {
    return JSON.parse(localStorage.getItem('user_plan'));
  }

  isAvaliable(): boolean {
    return this.getPlan().user_should_renew == null;
  }

  // Ask Stripe
  request_url(data): Observable<any> {
    return this.http.post('http://127.0.0.1:8001/api/stripe/request_url', data);
  }
}