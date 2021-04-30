import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/filter'
// import 'rxjs/add/operator/map'


export interface Message {
  type: string;
  payload: any;
}

@Injectable({
  providedIn: 'root'
})
export class SidebarBroadcastService {

  constructor() { }
  private _handler: Subject<Message> = new Subject<Message>();

  boradcast(type: string, payload: any = null) {
    this._handler.next({ type, payload });
  }

  subscribe(type: string, callback: (payload: any) => void): Subscription {
    return this._handler.pipe(
      filter(message => message.type === type)
      ,map(message => message.payload))
      .subscribe(callback);
  } 
}
